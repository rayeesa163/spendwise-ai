import { Header } from "@/components/Header";
import { StatsGrid } from "@/components/StatsGrid";
import { VendorTable } from "@/components/VendorTable";
import { AIInsights } from "@/components/AIInsights";
import { Button } from "@/components/ui/button";
import { Download, Filter, Plus, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Vendor Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered vendor prioritization and spend optimization
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vendors..."
                className="h-10 w-full md:w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
            <Button variant="outline" size="default">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="default">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="hero" size="default">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Vendor</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <StatsGrid />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <VendorTable />
          </div>
          <div className="xl:col-span-1">
            <AIInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
