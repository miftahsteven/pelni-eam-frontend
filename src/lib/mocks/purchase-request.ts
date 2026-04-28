export type PRStatus =
  | "Draft"
  | "In Preparation"
  | "Waiting Budget Confirmation"
  | "Waiting Review"
  | "Revision Required"
  | "Waiting Approval"
  | "Approved"
  | "Rejected"
  | "Sent to Procurement"
  | "Cancelled"

export interface PRItem {
  id: string
  itemNo: string
  sourceBoQItemNo: string
  name: string
  description: string
  quantity: number
  uom: string
  unitPrice: number
  subtotal: number
  specRef?: string
}

export interface PurchaseRequest {
  id: string
  prNo: string
  prDate: string
  boqNo: string
  planningNo: string
  packageTitle: string
  requestingUnit: string
  requesterName: string
  totalItems: number
  totalEstimate: number
  status: PRStatus
  requiredDate: string
  location: string
  fiscalYear: string
}

export const dummyPRs: PurchaseRequest[] = [
  {
    id: "pr-1",
    prNo: "PR-PELNI-2026-0015",
    prDate: "2026-04-22",
    boqNo: "BOQ-PELNI-2026-0008",
    planningNo: "PLN-PLAN-2026-0012",
    packageTitle: "Replacement Main Engine Cooling Pump Package",
    requestingUnit: "Fleet Engineering",
    requesterName: "Aris Setiawan",
    totalItems: 6,
    totalEstimate: 450000000,
    status: "Waiting Approval",
    requiredDate: "2026-06-15",
    location: "KM Kelud",
    fiscalYear: "2026"
  },
  {
    id: "pr-2",
    prNo: "PR-PELNI-2026-0016",
    prDate: "2026-04-22",
    boqNo: "BOQ-PELNI-2026-0009",
    planningNo: "PLN-PLAN-2026-0013",
    packageTitle: "Distribution Panel Upgrade Package",
    requestingUnit: "Electrical Maintenance",
    requesterName: "Budi Santoso",
    totalItems: 4,
    totalEstimate: 245000000,
    status: "Sent to Procurement",
    requiredDate: "2026-07-20",
    location: "KM Bukit Siguntang",
    fiscalYear: "2026"
  }
]

export const prItems: Record<string, PRItem[]> = {
  "pr-1": [
    {
      id: "pri-1",
      itemNo: "1",
      sourceBoQItemNo: "1.1",
      name: "Centrifugal Pump Unit (SS316)",
      description: "Complete with baseplate and coupling",
      quantity: 1,
      uom: "unit",
      unitPrice: 350000000,
      subtotal: 350000000,
      specRef: "SPEC-ME-001"
    },
    {
      id: "pri-2",
      itemNo: "2",
      sourceBoQItemNo: "1.2",
      name: "Pipe Connection Kit",
      description: "Standard ANSI flange and gaskets",
      quantity: 2,
      uom: "set",
      unitPrice: 15000000,
      subtotal: 30000000,
      specRef: "DWG-P-004"
    },
    {
      id: "pri-3",
      itemNo: "3",
      sourceBoQItemNo: "2.1",
      name: "Installation & Alignment Service",
      description: "Laser alignment and commissioning",
      quantity: 1,
      uom: "job",
      unitPrice: 45000000,
      subtotal: 45000000,
      specRef: "SOP-INST-01"
    }
  ]
}
