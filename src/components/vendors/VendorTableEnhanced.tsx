import { useState, useMemo } from "react";
import { MoreHorizontal, TrendingUp, TrendingDown, ArrowUpDown, Check } from "lucide-react";
import { AIScore, PriorityBadge } from "@/components/AIScore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useVendors } from "@/context/VendorContext";
import { calculatePriorityScore, getPriority, formatCurrency } from "@/lib/vendorData";
import { VendorFilters } from "./VendorFilters";
import { cn } from "@/lib/utils";

type SortKey = "name" | "spend" | "score" | "quality" | "deliveryReliability" | "costEfficiency";
type SortDirection = "asc" | "desc";

export const VendorTableEnhanced = () => {
  const { vendors, selectedVendors, toggleVendorSelection } = useVendors();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedVendors = useMemo(() => {
    let result = [...vendors];

    // Filter
    if (search) {
      result = result.filter((v) => 
        v.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "all") {
      result = result.filter((v) => v.category === category);
    }
    if (region !== "all") {
      result = result.filter((v) => v.region === region);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: number;
      let bVal: number;

      switch (sortKey) {
        case "name":
          return sortDirection === "asc" 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "spend":
          aVal = a.spend;
          bVal = b.spend;
          break;
        case "score":
          aVal = calculatePriorityScore(a);
          bVal = calculatePriorityScore(b);
          break;
        case "quality":
          aVal = a.quality;
          bVal = b.quality;
          break;
        case "deliveryReliability":
          aVal = a.deliveryReliability;
          bVal = b.deliveryReliability;
          break;
        case "costEfficiency":
          aVal = a.costEfficiency;
          bVal = b.costEfficiency;
          break;
        default:
          return 0;
      }

      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [vendors, search, category, region, sortKey, sortDirection]);

  const SortableHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <button
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      onClick={() => handleSort(sortKeyName)}
    >
      {label}
      <ArrowUpDown className={cn(
        "h-3 w-3",
        sortKey === sortKeyName && "text-primary"
      )} />
    </button>
  );

  return (
    <div className="space-y-4">
      <VendorFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        region={region}
        onRegionChange={setRegion}
        onClear={() => {
          setSearch("");
          setCategory("all");
          setRegion("all");
        }}
      />

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-4 py-3 w-10">
                  <span className="sr-only">Select</span>
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <SortableHeader label="Vendor" sortKeyName="name" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <SortableHeader label="Spend" sortKeyName="spend" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <SortableHeader label="Quality" sortKeyName="quality" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <SortableHeader label="Delivery" sortKeyName="deliveryReliability" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <SortableHeader label="Cost Eff." sortKeyName="costEfficiency" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <SortableHeader label="AI Score" sortKeyName="score" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Priority
                </th>
                <th className="text-right px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAndSortedVendors.map((vendor) => {
                const score = calculatePriorityScore(vendor);
                const priority = getPriority(score);
                const isSelected = selectedVendors.includes(vendor.id);

                return (
                  <tr
                    key={vendor.id}
                    className={cn(
                      "hover:bg-muted/30 transition-colors duration-150",
                      isSelected && "bg-primary/5"
                    )}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleVendorSelection(vendor.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-semibold">
                          {vendor.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <span className="font-medium text-sm">{vendor.name}</span>
                          <p className="text-xs text-muted-foreground">{vendor.region}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">{vendor.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{formatCurrency(vendor.spend)}</span>
                        {vendor.spendTrend > 0 ? (
                          <TrendingUp className="h-3.5 w-3.5 text-destructive" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{vendor.quality}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{vendor.deliveryReliability}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{vendor.costEfficiency}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <AIScore score={score} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <PriorityBadge priority={priority} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredAndSortedVendors.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No vendors found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
