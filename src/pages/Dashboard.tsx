import { StatsGrid } from "@/components/StatsGrid";
import { SpendTrendChart } from "@/components/charts/SpendTrendChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { AIRecommendations } from "@/components/AIRecommendations";
import { VendorTableEnhanced } from "@/components/vendors/VendorTableEnhanced";
import { VendorComparison } from "@/components/vendors/VendorComparison";
import { AddVendorModal } from "@/components/vendors/AddVendorModal";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Vendor Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered vendor prioritization and spend optimization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <AddVendorModal />
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendTrendChart />
        </div>
        <div>
          <CategoryPieChart />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <VendorTableEnhanced />
          <VendorComparison />
        </div>
        <div className="xl:col-span-1">
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
