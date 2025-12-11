export interface Vendor {
  id: string;
  name: string;
  category: string;
  region: string;
  spend: number;
  spendTrend: number;
  quality: number;
  deliveryReliability: number;
  costEfficiency: number;
  contract: string;
  contactEmail: string;
}

// Priority Score = 0.4×Quality + 0.3×DeliveryReliability + 0.2×CostEfficiency + 0.1×SpendTrend
export const calculatePriorityScore = (vendor: Vendor): number => {
  const normalizedSpendTrend = Math.max(0, Math.min(100, 50 - vendor.spendTrend));
  return Math.round(
    0.4 * vendor.quality +
    0.3 * vendor.deliveryReliability +
    0.2 * vendor.costEfficiency +
    0.1 * normalizedSpendTrend
  );
};

export const getPriority = (score: number): "high" | "medium" | "low" => {
  if (score >= 75) return "high";
  if (score >= 50) return "medium";
  return "low";
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const categories = [
  "Cloud Infrastructure",
  "Data Analytics",
  "Security",
  "Development Tools",
  "Customer Support",
  "Marketing",
  "HR Services",
  "Finance Tools",
];

export const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East",
];

export const initialVendors: Vendor[] = [
  {
    id: "1",
    name: "CloudScale Technologies",
    category: "Cloud Infrastructure",
    region: "North America",
    spend: 485200,
    spendTrend: 12,
    quality: 95,
    deliveryReliability: 92,
    costEfficiency: 85,
    contract: "Dec 2025",
    contactEmail: "contact@cloudscale.io",
  },
  {
    id: "2",
    name: "DataFlow Systems",
    category: "Data Analytics",
    region: "Europe",
    spend: 312800,
    spendTrend: -5,
    quality: 88,
    deliveryReliability: 90,
    costEfficiency: 82,
    contract: "Mar 2025",
    contactEmail: "hello@dataflow.com",
  },
  {
    id: "3",
    name: "SecureNet Solutions",
    category: "Security",
    region: "North America",
    spend: 198400,
    spendTrend: 8,
    quality: 78,
    deliveryReliability: 85,
    costEfficiency: 70,
    contract: "Jun 2025",
    contactEmail: "info@securenet.io",
  },
  {
    id: "4",
    name: "DevOps Pro",
    category: "Development Tools",
    region: "Asia Pacific",
    spend: 156000,
    spendTrend: -3,
    quality: 72,
    deliveryReliability: 80,
    costEfficiency: 88,
    contract: "Sep 2025",
    contactEmail: "support@devopspro.dev",
  },
  {
    id: "5",
    name: "SupportHub Inc",
    category: "Customer Support",
    region: "North America",
    spend: 89600,
    spendTrend: 15,
    quality: 65,
    deliveryReliability: 70,
    costEfficiency: 60,
    contract: "Jan 2026",
    contactEmail: "sales@supporthub.com",
  },
  {
    id: "6",
    name: "MarketingCloud",
    category: "Marketing",
    region: "Europe",
    spend: 234500,
    spendTrend: 4,
    quality: 85,
    deliveryReliability: 88,
    costEfficiency: 75,
    contract: "Apr 2025",
    contactEmail: "team@marketingcloud.io",
  },
  {
    id: "7",
    name: "TalentForce HR",
    category: "HR Services",
    region: "North America",
    spend: 127300,
    spendTrend: 2,
    quality: 80,
    deliveryReliability: 85,
    costEfficiency: 78,
    contract: "Jul 2025",
    contactEmail: "contact@talentforce.com",
  },
  {
    id: "8",
    name: "FinanceAI",
    category: "Finance Tools",
    region: "Asia Pacific",
    spend: 178900,
    spendTrend: -8,
    quality: 90,
    deliveryReliability: 94,
    costEfficiency: 80,
    contract: "Nov 2025",
    contactEmail: "hello@financeai.io",
  },
];

export const monthlySpendData = [
  { month: "Jan", spend: 180000, savings: 12000 },
  { month: "Feb", spend: 195000, savings: 15000 },
  { month: "Mar", spend: 210000, savings: 18000 },
  { month: "Apr", spend: 188000, savings: 22000 },
  { month: "May", spend: 225000, savings: 25000 },
  { month: "Jun", spend: 240000, savings: 28000 },
  { month: "Jul", spend: 235000, savings: 30000 },
  { month: "Aug", spend: 250000, savings: 32000 },
  { month: "Sep", spend: 245000, savings: 35000 },
  { month: "Oct", spend: 260000, savings: 38000 },
  { month: "Nov", spend: 275000, savings: 40000 },
  { month: "Dec", spend: 290000, savings: 42000 },
];

export const categorySpendData = [
  { name: "Cloud Infrastructure", value: 485200, fill: "hsl(var(--chart-1))" },
  { name: "Data Analytics", value: 312800, fill: "hsl(var(--chart-2))" },
  { name: "Marketing", value: 234500, fill: "hsl(var(--chart-3))" },
  { name: "Security", value: 198400, fill: "hsl(var(--chart-4))" },
  { name: "Finance Tools", value: 178900, fill: "hsl(var(--chart-5))" },
  { name: "Other", value: 373200, fill: "hsl(var(--muted-foreground))" },
];
