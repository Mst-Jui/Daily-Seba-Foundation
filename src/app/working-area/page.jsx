"use client";
import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { dealersByDivision } from "../../../data/dealerData";
import WorkingAreaHero from "@/components/working-area/WorkingAreaHero";
import WorkingAreaSearchFilter from "@/components/working-area/WorkingAreaSearchFilter";
import WorkingAreaDealerList from "@/components/working-area/WorkingAreaDealerList";
import WorkingAreaJoinCTA from "@/components/working-area/WorkingAreaJoinCTA";

const totalDealers = dealersByDivision.reduce((s, d) => s + d.dealers.length, 0);
const totalDistricts = dealersByDivision.reduce((s, d) => {
  const districts = new Set(d.dealers.map((dl) => dl.district));
  return s + districts.size;
}, 0);

export default function WorkingAreaPage() {
  useApp();
  const [query, setQuery] = useState("");
  const [activeDiv, setActiveDiv] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q && !activeDiv) return dealersByDivision;
    return dealersByDivision
      .map((div) => ({
        ...div,
        dealers: div.dealers.filter(
          (d) =>
            (!q ||
              d.name.toLowerCase().includes(q) ||
              d.area.toLowerCase().includes(q) ||
              d.district.toLowerCase().includes(q)) &&
            (!activeDiv || div.id === activeDiv)
        ),
      }))
      .filter((div) => div.dealers.length > 0);
  }, [query, activeDiv]);

  const totalFiltered = filtered.reduce((s, d) => s + d.dealers.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <WorkingAreaHero totalDealers={totalDealers} totalDistricts={totalDistricts} 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <WorkingAreaSearchFilter
          query={query}
          setQuery={setQuery}
          activeDiv={activeDiv}
          setActiveDiv={setActiveDiv}
          divisions={dealersByDivision}
          totalFiltered={totalFiltered}
        />
        <WorkingAreaDealerList filtered={filtered} />
      </div>

      <WorkingAreaJoinCTA />
    </div>
  );
}