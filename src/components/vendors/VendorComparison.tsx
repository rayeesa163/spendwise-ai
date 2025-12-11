import { useVendors } from "@/context/VendorContext";
import { calculatePriorityScore, formatCurrency } from "@/lib/vendorData";
import { X, TrendingUp, TrendingDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const VendorComparison = () => {
  const { vendors, selectedVendors, setSelectedVendors } = useVendors();

  const selectedVendorData = vendors.filter((v) => selectedVendors.includes(v.id));

  if (selectedVendorData.length < 2) {
    return (
      <div className="glass-card p-6 text-center animate-fade-in">
        <Award className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-semibold mb-1">Compare Vendors</h3>
        <p className="text-sm text-muted-foreground">
          Select 2-3 vendors from the table to compare their performance side by side.
        </p>
      </div>
    );
  }

  const metrics = [
    { key: "quality", label: "Quality Score" },
    { key: "deliveryReliability", label: "Delivery Reliability" },
    { key: "costEfficiency", label: "Cost Efficiency" },
  ] as const;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Vendor Comparison</h3>
          <p className="text-sm text-muted-foreground">{selectedVendorData.length} vendors selected</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setSelectedVendors([])}>
          Clear All
        </Button>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedVendorData.length}, 1fr)` }}>
        {selectedVendorData.map((vendor) => {
          const score = calculatePriorityScore(vendor);
          return (
            <div key={vendor.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-sm">{vendor.name}</h4>
                  <p className="text-xs text-muted-foreground">{vendor.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setSelectedVendors(selectedVendors.filter((id) => id !== vendor.id))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Priority Score</span>
                  <span className="text-lg font-bold text-primary">{score}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Annual Spend</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{formatCurrency(vendor.spend)}</span>
                    {vendor.spendTrend > 0 ? (
                      <TrendingUp className="h-3 w-3 text-destructive" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-emerald-500" />
                    )}
                  </div>
                </div>

                {metrics.map((metric) => (
                  <div key={metric.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      <span className="text-xs font-medium">{vendor[metric.key]}%</span>
                    </div>
                    <Progress value={vendor[metric.key]} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
