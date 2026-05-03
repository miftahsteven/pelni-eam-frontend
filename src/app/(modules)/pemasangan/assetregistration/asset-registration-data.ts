export interface AcceptanceTestItem {
  itemCode: string;
  itemName: string;
  specification: string;
  serialNumber: string;
  qtyAccepted: number;
  installationPoint: string;
  testResult: "Pass" | "Accepted with Notes" | "Fail";
  registrationStatus: "Not Registered" | "Registered";
  generatedAssetCode?: string;
  vendor: string;
  poReference: string;
  location: string;
  vessel: string;
}

export interface AssetRegistration {
  id: string;
  registrationNo: string;
  acceptanceTestNo: string;
  installationNo: string;
  wbsCode: string;
  registrationDate: string;
  registeredBy: string;
  ownerDepartment: string;
  location: string;
  vessel: string;
  status: "Draft" | "Registered" | "Cancelled";
  notes?: string;
  items: AcceptanceTestItem[];
}

export const dummyAcceptanceTests = [
  {
    id: "AT-2026-0001",
    installationNo: "INS-2026-0001",
    wbsCode: "WBS-ENG-001",
    doNo: "DO-2026-0019",
    poNo: "PO-2026-0005",
    prNo: "PR-2026-0002",
    location: "Engine Room",
    vessel: "KM Kelud",
    items: [
      {
        itemCode: "MCH-PMP-001",
        itemName: "Cooling Water Pump #1",
        specification: "Centrifugal Pump, 50m3/h",
        serialNumber: "SN-PMP-2026-001",
        qtyAccepted: 1,
        installationPoint: "Main Deck A",
        testResult: "Pass",
        registrationStatus: "Not Registered",
        vendor: "Wärtsilä Indonesia",
        poReference: "PO-2026-0005",
        location: "Engine Room",
        vessel: "KM Kelud",
      },
      {
        itemCode: "MCH-PMP-002",
        itemName: "Cooling Water Pump #2",
        specification: "Centrifugal Pump, 50m3/h",
        serialNumber: "SN-PMP-2026-002",
        qtyAccepted: 1,
        installationPoint: "Main Deck A",
        testResult: "Accepted with Notes",
        registrationStatus: "Not Registered",
        vendor: "Wärtsilä Indonesia",
        poReference: "PO-2026-0005",
        location: "Engine Room",
        vessel: "KM Kelud",
      }
    ]
  },
  {
    id: "AT-2026-0002",
    installationNo: "INS-2026-0002",
    wbsCode: "WBS-NAV-002",
    doNo: "DO-2026-0021",
    poNo: "PO-2026-0008",
    prNo: "PR-2026-0004",
    location: "Bridge",
    vessel: "KM Labobar",
    items: [
      {
        itemCode: "NAV-GPS-001",
        itemName: "GPS Navigation System",
        specification: "Dual Channel GPS, +/- 1m accuracy",
        serialNumber: "SN-GPS-X99",
        qtyAccepted: 1,
        installationPoint: "Chart Room",
        testResult: "Pass",
        registrationStatus: "Not Registered",
        vendor: "Furuno Electric",
        poReference: "PO-2026-0008",
        location: "Bridge",
        vessel: "KM Labobar",
      }
    ]
  }
];

export const dummyAssetRegistrations: AssetRegistration[] = [
  {
    id: "1",
    registrationNo: "AR-2026-0001",
    acceptanceTestNo: "AT-2026-0010",
    installationNo: "INS-2026-0010",
    wbsCode: "WBS-ENG-010",
    registrationDate: "2026-04-25",
    registeredBy: "Admin EAM",
    ownerDepartment: "Marine Engineering",
    location: "Engine Room",
    vessel: "KM Kelud",
    status: "Registered",
    items: [
      {
        itemCode: "MCH-GEN-001",
        itemName: "Auxiliary Generator #3",
        specification: "500kVA, Diesel",
        serialNumber: "SN-GEN-500-001",
        qtyAccepted: 1,
        installationPoint: "Gen Deck",
        testResult: "Pass",
        registrationStatus: "Registered",
        generatedAssetCode: "AST-2026-MCH-0001",
        vendor: "Caterpillar",
        poReference: "PO-2026-0001",
        location: "Engine Room",
        vessel: "KM Kelud",
      }
    ]
  }
];

export const assetCategories = [
  "Machinery",
  "Navigation Equipment",
  "Electrical Equipment",
  "Safety Equipment",
  "IT Equipment",
  "Vessel Component",
  "Building Facility",
  "Supporting Equipment"
];

export const criticalityLevels = ["Low", "Medium", "High", "Critical"];

export const assetStatuses = [
  "Active",
  "Standby",
  "Under Warranty",
  "Pending Operational",
  "Inactive"
];

export const departments = [
  "Marine Engineering",
  "Nautical",
  "IT Support",
  "Safety & Quality",
  "Procurement",
  "Finance"
];
