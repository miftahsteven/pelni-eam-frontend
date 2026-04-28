import { PlanningStatus } from "./planning"

export type BoQStatus =
  | "Draft"
  | "In Progress"
  | "Waiting Technical Review"
  | "Waiting Cost Review"
  | "Revision Required"
  | "Waiting Approval"
  | "Approved"
  | "Rejected"
  | "Ready for PR"
  | "Cancelled"

export interface BoQLineItem {
  id: string
  itemNo: string
  group: string
  name: string
  description: string
  quantity: number
  uom: string
  unitPrice: number
  subtotal: number
  techRef?: string
  critical: boolean
}

export interface BoQPackage {
  id: string
  boqNo: string
  planningNo: string
  packageTitle: string
  packageType: string
  costCategory: "Capex" | "Opex"
  fiscalYear: string
  status: BoQStatus
  assetName: string
  assetCode: string
  location: string
  category: string
  totalEstimate: number
  itemCount: number
  planner: string
}

export const dummyBoQs: BoQPackage[] = [
  {
    id: "boq-1",
    boqNo: "BOQ-PELNI-2026-0008",
    planningNo: "PLN-PLAN-2026-0012",
    packageTitle: "Replacement Main Engine Cooling Pump Package",
    packageType: "Mixed Package",
    costCategory: "Capex",
    fiscalYear: "2026",
    status: "In Progress",
    assetName: "Main Engine Cooling Pump",
    assetCode: "AST-KPL-MESIN-001",
    location: "KM Kelud",
    category: "Mechanical",
    totalEstimate: 450000000,
    itemCount: 6,
    planner: "Aris Setiawan"
  },
  {
    id: "boq-2",
    boqNo: "BOQ-PELNI-2026-0009",
    planningNo: "PLN-PLAN-2026-0013",
    packageTitle: "Distribution Panel Upgrade Package",
    packageType: "Service-heavy",
    costCategory: "Capex",
    fiscalYear: "2026",
    status: "Ready for PR",
    assetName: "Distribution Panel Deck B",
    assetCode: "AST-KPL-ELC-014",
    location: "KM Bukit Siguntang",
    category: "Electrical",
    totalEstimate: 245000000,
    itemCount: 4,
    planner: "Budi Santoso"
  }
]

export const boqLineItems: Record<string, BoQLineItem[]> = {
  "boq-1": [
    {
      id: "li-1",
      itemNo: "1.1",
      group: "Main Material",
      name: "Centrifugal Pump Unit (SS316)",
      description: "Complete with baseplate and coupling",
      quantity: 1,
      uom: "unit",
      unitPrice: 350000000,
      subtotal: 350000000,
      techRef: "SPEC-ME-001",
      critical: true
    },
    {
      id: "li-2",
      itemNo: "1.2",
      group: "Main Material",
      name: "Pipe Connection Kit",
      description: "Standard ANSI flange and gaskets",
      quantity: 2,
      uom: "set",
      unitPrice: 15000000,
      subtotal: 30000000,
      techRef: "DWG-P-004",
      critical: false
    },
    {
      id: "li-3",
      itemNo: "2.1",
      group: "Service",
      name: "Installation & Alignment Service",
      description: "Laser alignment and commissioning",
      quantity: 1,
      uom: "job",
      unitPrice: 45000000,
      subtotal: 45000000,
      techRef: "SOP-INST-01",
      critical: true
    },
    {
      id: "li-4",
      itemNo: "3.1",
      group: "Logistics",
      name: "Shipping KM Kelud Site",
      description: "Including insurance and handling",
      quantity: 1,
      uom: "lot",
      unitPrice: 25000000,
      subtotal: 25000000,
      critical: false
    }
  ]
}
