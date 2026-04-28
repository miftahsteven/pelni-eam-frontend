export type PlanningStatus =
  | "Draft"
  | "Submitted"
  | "Under Screening"
  | "Screening Approved"
  | "Under Technical Assessment"
  | "Under Planning & Design"
  | "Under Review"
  | "Revision Required"
  | "Under Budget Check"
  | "Pending Approval"
  | "Approved for BoQ"
  | "Rejected"
  | "Cancelled";

export interface PlanningRequest {
  id: string;
  requestNo: string;
  requestDate: string;
  assetCode: string;
  assetName: string;
  category: string;
  location: string;
  requestType: "Replacement" | "Upgrade" | "Rehabilitation" | "New Requirement";
  priority: "Low" | "Medium" | "High" | "Critical";
  status: PlanningStatus;
  picPlanner: string;
  targetDate: string;
  amount: string;
  requesterUnit: string;
  requesterName: string;
}

export const dummyRequests: PlanningRequest[] = [
  {
    id: "1",
    requestNo: "PLN-PLAN-2026-0012",
    requestDate: "2026-04-10",
    assetCode: "AST-KPL-MESIN-001",
    assetName: "Main Engine Cooling Pump",
    category: "Mechanical",
    location: "KM Kelud",
    requestType: "Replacement",
    priority: "High",
    status: "Under Planning & Design",
    picPlanner: "Aris Setiawan",
    targetDate: "2026-05-15",
    amount: "Rp 450.000.000",
    requesterUnit: "Technical Fleet I",
    requesterName: "Bambang Sudjatmiko",
  },
  {
    id: "2",
    requestNo: "PLN-PLAN-2026-0013",
    requestDate: "2026-04-12",
    assetCode: "AST-KPL-ELC-014",
    assetName: "Distribution Panel Deck B",
    category: "Electrical",
    location: "KM Bukit Siguntang",
    requestType: "Upgrade",
    priority: "Medium",
    status: "Under Review",
    picPlanner: "Indra Wijaya",
    targetDate: "2026-05-20",
    amount: "Rp 120.000.000",
    requesterUnit: "Technical Fleet II",
    requesterName: "Siti Aminah",
  },
  {
    id: "3",
    requestNo: "PLN-PLAN-2026-0014",
    requestDate: "2026-04-14",
    assetCode: "AST-PRT-HVAC-020",
    assetName: "HVAC Passenger Deck",
    category: "Facility",
    location: "Terminal Penumpang Makassar",
    requestType: "Rehabilitation",
    priority: "Medium",
    status: "Approved for BoQ",
    picPlanner: "Dani Ramadhan",
    targetDate: "2026-06-01",
    amount: "Rp 850.000.000",
    requesterUnit: "Port Facility Unit",
    requesterName: "Hendra Kurnia",
  },
  {
    id: "4",
    requestNo: "PLN-PLAN-2026-0015",
    requestDate: "2026-04-15",
    assetCode: "AST-KPL-NAV-005",
    assetName: "Gyro Compass KM Labobar",
    category: "Navigation",
    location: "KM Labobar",
    requestType: "Replacement",
    priority: "Critical",
    status: "Under Technical Assessment",
    picPlanner: "Yusuf Hakim",
    targetDate: "2026-04-30",
    amount: "Rp 320.000.000",
    requesterUnit: "Technical Fleet III",
    requesterName: "Fajar Nugraha",
  },
  {
    id: "5",
    requestNo: "PLN-PLAN-2026-0016",
    requestDate: "2026-04-18",
    assetCode: "AST-KPL-SFT-002",
    assetName: "Lifeboat Engine #2",
    category: "Safety",
    location: "KM Ciremai",
    requestType: "Rehabilitation",
    priority: "High",
    status: "Draft",
    picPlanner: "Taufik Hidayat",
    targetDate: "2026-05-10",
    amount: "Rp 75.000.000",
    requesterUnit: "Safety Unit",
    requesterName: "Rina Sari",
  },
];
