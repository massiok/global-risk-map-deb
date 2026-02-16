
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { RiskLevel, LayerVisibility } from '../types';
import { RISK_COLORS, MOCK_BASES } from '../constants';

interface WorldMapProps {
  onCountrySelect: (countryId: string, countryName: string) => void;
  selectedCountryId: string | null;
  riskData: Record<string, { score: number; level: RiskLevel }>;
  visibleLayers: LayerVisibility;
  viewCommand: { type: 'COORDS', lat: number, lng: number } | null;
}

const WorldMap: React.FC<WorldMapProps> = ({ 
  onCountrySelect, 
  riskData, 
  visibleLayers, 
  viewCommand
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<any>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [tooltip, setTooltip] = useState<{ x: number, y: number, name: string, level: string } | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current || !containerRef.current) return;

    const width = 800; 
    const height = 600;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const defs = svg.append("defs");
    defs.append("pattern")
      .attr("id", "tactical-grid")
      .attr("width", 20).attr("height", 20)
      .attr("patternUnits", "userSpaceOnUse")
      .append("path").attr("d", "M 20 0 L 0 0 0 20")
      .attr("fill", "none").attr("stroke", "#ffffff06").attr("stroke-width", 0.5);

    const projection = d3.geoMercator().scale(135).translate([width / 2, height / 1.55]);
    const path = d3.geoPath().projection(projection);

    svg.append("rect")
      .attr("width", "100%").attr("height", "100%")
      .attr("fill", "url(#tactical-grid)").style("pointer-events", "none")
      .style("opacity", visibleLayers.hud ? 1 : 0);

    const mainGroup = svg.append("g").attr("class", "map-layers");
    const countriesGroup = mainGroup.append("g").attr("class", "countries");
    const basesGroup = mainGroup.append("g").attr("class", "bases").style("opacity", visibleLayers.bases ? 1 : 0);

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .on("zoom", (event) => mainGroup.attr("transform", event.transform));
    zoomRef.current = zoom;
    svg.call(zoom);

    countriesGroup.selectAll("path")
      .data(geoData.features).enter().append("path")
      .attr("d", path as any)
      .attr("id", (d: any) => `country-${d.id}`)
      .attr("fill", (d: any) => {
        if (!visibleLayers.risk) return "#0f172a";
        const country = riskData[d.id];
        return country ? RISK_COLORS[country.level] : RISK_COLORS[RiskLevel.UNKNOWN];
      })
      .attr("stroke", "#020617").attr("stroke-width", 0.5)
      .attr("class", "country cursor-pointer transition-all duration-300")
      .on("mouseenter", function(event, d: any) {
        const country = riskData[d.id];
        d3.select(this).attr("stroke-width", 1).attr("stroke", "#60a5fa");
        setTooltip({ x: event.clientX, y: event.clientY, name: d.properties.name, level: country?.level || RiskLevel.UNKNOWN });
      })
      .on("mousemove", (event) => setTooltip(prev => prev ? { ...prev, x: event.clientX, y: event.clientY } : null))
      .on("mouseleave", function() {
        d3.select(this).attr("stroke-width", 0.5).attr("stroke", "#020617");
        setTooltip(null);
      })
      .on("click", (event, d: any) => {
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        event.stopPropagation();
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity.translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );
        onCountrySelect(d.id, d.properties.name);
      });

    const baseMarkers = basesGroup.selectAll(".base-marker")
      .data(MOCK_BASES).enter().append("g")
      .attr("class", "base-marker")
      .attr("transform", (d: any) => {
        const pos = projection(d.coordinates);
        return pos ? `translate(${pos[0]}, ${pos[1]})` : null;
      });

    baseMarkers.append("circle").attr("r", 1.8).attr("fill", "#3b82f6");

    svg.on("click", (event) => {
        if (event.target.tagName === 'svg') svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    });

  }, [geoData]);

  useEffect(() => {
    if (!viewCommand || !svgRef.current || !zoomRef.current) return;
    if (viewCommand.type === 'COORDS') {
      const width = 800; const height = 600;
      const projection = d3.geoMercator().scale(135).translate([width / 2, height / 1.55]);
      const [x, y] = projection([viewCommand.lng, viewCommand.lat]) || [width/2, height/2];
      d3.select(svgRef.current).transition().duration(1000).call(
        zoomRef.current.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(6).translate(-x, -y)
      );
    }
  }, [viewCommand]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#010409]" onMouseMove={handleMouseMove}>
      {visibleLayers.hud && (
        <div className="absolute inset-0 pointer-events-none z-0">
           <div className="absolute w-px h-full bg-blue-500/5" style={{ left: cursorPos.x }} />
           <div className="absolute h-px w-full bg-blue-500/5" style={{ top: cursorPos.y }} />
        </div>
      )}
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" className="touch-none" />
      {tooltip && (
        <div className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-6 px-4 py-3 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-xl shadow-2xl flex flex-col gap-1 ring-1 ring-white/5" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="flex justify-between items-center gap-6 border-b border-slate-800/80 pb-1.5 mb-1.5">
             <span className="text-[9px] mono font-black uppercase tracking-[0.2em] text-blue-500/80">Telemetry Node</span>
             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white whitespace-nowrap uppercase tracking-tight">{tooltip.name}</span>
            <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: RISK_COLORS[tooltip.level as RiskLevel] || '#3b82f6' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
