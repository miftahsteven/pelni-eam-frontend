export interface WBSMaster {
  id: string;
  code: string;
  name: string;
  parentPackage: string;
  vesselScope: string;
  budgetOwner: string;
  status: "Active" | "Inactive";
}

export interface WBSAssignmentPR {
  id: string;
  prNo: string;
  prDate: string;
  requestingUnit: string;
  vessel: string;
  planningRef: string;
  totalItems: number;
  totalEstimate: number;
  assignmentStatus: "Waiting Assignment" | "Partially Assigned" | "Fully Assigned" | "Submitted" | "Approved" | "Ready for PO";
  priority: "HIGH" | "MEDIUM" | "LOW";
}

export interface PRItemWithWBS {
  id: string;
  itemNo: string;
  name: string;
  specification: string;
  qty: number;
  uom: string;
  estimatedPrice: number;
  subtotal: number;
  suggestedWBSId?: string;
  selectedWBSId?: string;
  validationStatus: "Not Assigned" | "Valid" | "Warning" | "Error";
}

export const wbsMasterData: WBSMaster[] = [
  {
    id: "wbs-1",
    code: "WBS-DOCK-KLD-001",
    name: "Docking KM Kelud 2026 - Main Deck",
    parentPackage: "Docking Annual 2026",
    vesselScope: "KM Kelud",
    budgetOwner: "Technical Division",
    status: "Active",
  },
  {
    id: "wbs-2",
    code: "WBS-MNT-KLD-014",
    name: "Preventive Maintenance Cooling System",
    parentPackage: "Fleet Maintenance Q2",
    vesselScope: "KM Kelud",
    budgetOwner: "Fleet Management",
    status: "Active",
  },
  {
    id: "wbs-3",
    code: "WBS-ENG-KLD-003",
    name: "Engineering Repair Main Engine",
    parentPackage: "Emergency Repair 2026",
    vesselScope: "KM Kelud",
    budgetOwner: "Technical Division",
    status: "Active",
  },
  {
    id: "wbs-4",
    code: "WBS-GEN-MISC-099",
    name: "General Miscellaneous Operational",
    parentPackage: "Operational 2026",
    vesselScope: "All Vessels",
    budgetOwner: "General Affairs",
    status: "Active",
  }
];

export const dummyAssignmentPRs: WBSAssignmentPR[] = [
  {
    id: "asgn-1",
    prNo: "PR-PELNI-2026-0042",
    prDate: "2026-04-18",
    requestingUnit: "Technical Fleet Division",
    vessel: "KM Kelud",
    planningRef: "PLN-KM-KLD-2026-018",
    totalItems: 3,
    totalEstimate: 285000000,
    assignmentStatus: "Waiting Assignment",
    priority: "HIGH",
  },
  {
    id: "asgn-2",
    prNo: "PR-PELNI-2026-0055",
    prDate: "2026-04-20",
    requestingUnit: "Logistic Division",
    vessel: "KM Labobar",
    planningRef: "PLN-LB-2026-005",
    totalItems: 5,
    totalEstimate: 125000000,
    assignmentStatus: "Partially Assigned",
    priority: "MEDIUM",
  },
  {
    id: "asgn-3",
    prNo: "PR-PELNI-2026-0031",
    prDate: "2026-04-15",
    requestingUnit: "Operation Division",
    vessel: "KM Ciremai",
    planningRef: "PLN-CR-2026-012",
    totalItems: 2,
    totalEstimate: 450000000,
    assignmentStatus: "Ready for PO",
    priority: "HIGH",
  }
];

export const prItemsForAssignment: Record<string, PRItemWithWBS[]> = {
  "asgn-1": [
    {
      id: "item-1",
      itemNo: "0010",
      name: "Impeller Cooling Pump",
      specification: "Material: Bronze, Diameter: 250mm",
      qty: 2,
      uom: "PCS",
      estimatedPrice: 22500000,
      subtotal: 45000000,
      suggestedWBSId: "wbs-2",
      validationStatus: "Not Assigned",
    },
    {
      id: "item-2",
      itemNo: "0020",
      name: "Bearing Set Main Engine",
      specification: "SKF Heavy Duty 33022",
      qty: 4,
      uom: "SET",
      estimatedPrice: 15000000,
      subtotal: 60000000,
      suggestedWBSId: "wbs-3",
      validationStatus: "Not Assigned",
    },
    {
      id: "item-3",
      itemNo: "0030",
      name: "Jasa Overhaul Cooling Line",
      specification: "Include pressure test and certificate",
      qty: 1,
      uom: "LS",
      estimatedPrice: 180000000,
      subtotal: 180000000,
      suggestedWBSId: "wbs-2",
      validationStatus: "Not Assigned",
    }
  ]
};
