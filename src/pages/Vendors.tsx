import { VendorTableEnhanced } from "@/components/vendors/VendorTableEnhanced";
import { VendorComparison } from "@/components/vendors/VendorComparison";
import { AddVendorModal } from "@/components/vendors/AddVendorModal";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Vendors = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Vendor Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View, filter, and manage all your vendors in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <AddVendorModal />
        </div>
      </div>

      {/* Vendor Table */}
      <VendorTableEnhanced />

      {/* Comparison Section */}
      <VendorComparison />
    </div>
  );
};

export default Vendors;
