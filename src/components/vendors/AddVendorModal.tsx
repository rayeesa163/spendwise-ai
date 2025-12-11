import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus } from "lucide-react";
import { categories, regions, Vendor } from "@/lib/vendorData";
import { useVendors } from "@/context/VendorContext";
import { useToast } from "@/hooks/use-toast";

export const AddVendorModal = () => {
  const { addVendor } = useVendors();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    region: "",
    spend: "",
    quality: 75,
    deliveryReliability: 75,
    costEfficiency: 75,
    contract: "",
    contactEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.region) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newVendor: Omit<Vendor, "id"> = {
      name: formData.name,
      category: formData.category,
      region: formData.region,
      spend: parseFloat(formData.spend) || 0,
      spendTrend: 0,
      quality: formData.quality,
      deliveryReliability: formData.deliveryReliability,
      costEfficiency: formData.costEfficiency,
      contract: formData.contract || "TBD",
      contactEmail: formData.contactEmail,
    };

    addVendor(newVendor);
    toast({
      title: "Vendor added",
      description: `${formData.name} has been added successfully.`,
    });
    setOpen(false);
    setFormData({
      name: "",
      category: "",
      region: "",
      spend: "",
      quality: 75,
      deliveryReliability: 75,
      costEfficiency: 75,
      contract: "",
      contactEmail: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Vendor Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Acme Technologies"
                className="mt-1.5 bg-background"
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger className="mt-1.5 bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="region">Region *</Label>
              <Select value={formData.region} onValueChange={(v) => setFormData({ ...formData, region: v })}>
                <SelectTrigger className="mt-1.5 bg-background">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="spend">Annual Spend ($)</Label>
              <Input
                id="spend"
                type="number"
                value={formData.spend}
                onChange={(e) => setFormData({ ...formData, spend: e.target.value })}
                placeholder="e.g., 100000"
                className="mt-1.5 bg-background"
              />
            </div>
            <div>
              <Label htmlFor="contract">Contract End</Label>
              <Input
                id="contract"
                value={formData.contract}
                onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                placeholder="e.g., Dec 2025"
                className="mt-1.5 bg-background"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="vendor@company.com"
                className="mt-1.5 bg-background"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-medium">Performance Scores</h4>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Quality Score</Label>
                <span className="text-sm text-muted-foreground">{formData.quality}%</span>
              </div>
              <Slider
                value={[formData.quality]}
                onValueChange={(v) => setFormData({ ...formData, quality: v[0] })}
                max={100}
                step={1}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Delivery Reliability</Label>
                <span className="text-sm text-muted-foreground">{formData.deliveryReliability}%</span>
              </div>
              <Slider
                value={[formData.deliveryReliability]}
                onValueChange={(v) => setFormData({ ...formData, deliveryReliability: v[0] })}
                max={100}
                step={1}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Cost Efficiency</Label>
                <span className="text-sm text-muted-foreground">{formData.costEfficiency}%</span>
              </div>
              <Slider
                value={[formData.costEfficiency]}
                onValueChange={(v) => setFormData({ ...formData, costEfficiency: v[0] })}
                max={100}
                step={1}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Add Vendor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
