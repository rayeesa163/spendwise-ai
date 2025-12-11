import React, { createContext, useContext, useState, ReactNode } from "react";
import { Vendor, initialVendors } from "@/lib/vendorData";

interface VendorContextType {
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, "id">) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  selectedVendors: string[];
  setSelectedVendors: (ids: string[]) => void;
  toggleVendorSelection: (id: string) => void;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider = ({ children }: { children: ReactNode }) => {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const addVendor = (vendor: Omit<Vendor, "id">) => {
    const newVendor: Vendor = {
      ...vendor,
      id: Date.now().toString(),
    };
    setVendors((prev) => [...prev, newVendor]);
  };

  const updateVendor = (id: string, updates: Partial<Vendor>) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const deleteVendor = (id: string) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
    setSelectedVendors((prev) => prev.filter((vid) => vid !== id));
  };

  const toggleVendorSelection = (id: string) => {
    setSelectedVendors((prev) => {
      if (prev.includes(id)) {
        return prev.filter((vid) => vid !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        addVendor,
        updateVendor,
        deleteVendor,
        selectedVendors,
        setSelectedVendors,
        toggleVendorSelection,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendors = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error("useVendors must be used within a VendorProvider");
  }
  return context;
};
