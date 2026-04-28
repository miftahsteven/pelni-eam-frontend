export interface Vendor {
  id: string;
  name: string;
  code: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
}

export interface PurchaseOrder {
  id: string;
  poNo: string;
  poDate: string;
  vendorId: string;
  vendorName: string;
  totalAmount: number;
  currency: string;
  paymentTerm: string;
  deliveryTerm: string;
  receivingLocation: string;
  status: "Draft" | "Waiting Approval" | "Approved" | "Released" | "Sent to Vendor" | "Partially Fulfilled" | "Fully Fulfilled" | "Closed" | "Rejected";
  prReference: string;
  wbsReference: string;
  vessel: string;
  createdBy: string;
}

export interface POItem {
  id: string;
  poId: string;
  lineNo: string;
  prNo: string;
  prItemNo: string;
  wbsCode: string;
  itemCode: string;
  itemName: string;
  description: string;
  qtyOrdered: number;
  uom: string;
  unitPrice: number;
  taxCode: string;
  deliveryDate: string;
  subtotal: number;
  status: "Open" | "Ordered" | "Partially Delivered" | "Delivered" | "Closed";
}

export const vendors: Vendor[] = [
  {
    id: "v-1",
    name: "PT. Samudra Teknik",
    code: "VND-001",
    contact: "Bpk. Hendra",
    phone: "+62 812 3456 7890",
    email: "sales@samudrateknik.co.id",
    address: "Kawasan Industri Marunda, Jakarta Utara",
    rating: 4.5,
  },
  {
    id: "v-2",
    name: "PT. Bahari Sparepart Indonesia",
    code: "VND-002",
    contact: "Ibu Maya",
    phone: "+62 811 9876 5432",
    email: "info@baharisparepart.com",
    address: "Jl. Pelabuhan No. 42, Surabaya",
    rating: 4.8,
  },
  {
    id: "v-3",
    name: "PT. Docking Nusantara",
    code: "VND-003",
    contact: "Bpk. Yusuf",
    phone: "+62 813 1122 3344",
    email: "project@dockingnusantara.id",
    address: "Tanjung Priok, Jakarta",
    rating: 4.2,
  },
  {
    id: "v-4",
    name: "PT. Sinar Marine Services",
    code: "VND-004",
    contact: "Bpk. Agus",
    phone: "+62 815 4455 6677",
    email: "service@sinarmarine.com",
    address: "Batam Centre, Kepulauan Riau",
    rating: 4.6,
  }
];

export const readyForPOItems = [
  {
    id: "rpo-1",
    prNo: "PR-2026-0041",
    itemNo: "001",
    name: "Spare Part Main Pump",
    qty: 4,
    uom: "EA",
    wbs: "WBS-DOCK-001",
    vessel: "KM Kelud",
    suggestedVendor: "PT. Bahari Sparepart Indonesia",
    estPrice: 15000000,
  },
  {
    id: "rpo-2",
    prNo: "PR-2026-0041",
    itemNo: "002",
    name: "Gasket Set Engine Room",
    qty: 10,
    uom: "EA",
    wbs: "WBS-DOCK-001",
    vessel: "KM Kelud",
    suggestedVendor: "PT. Samudra Teknik",
    estPrice: 2500000,
  },
  {
    id: "rpo-3",
    prNo: "PR-2026-0057",
    itemNo: "001",
    name: "Jasa Overhaul Pompa",
    qty: 1,
    uom: "AU",
    wbs: "WBS-MTN-014",
    vessel: "KM Umsini",
    suggestedVendor: "PT. Sinar Marine Services",
    estPrice: 45000000,
  }
];

export const dummyPOs: PurchaseOrder[] = [
  {
    id: "po-1",
    poNo: "PO-PELNI-2026-088",
    poDate: "2026-04-20",
    vendorId: "v-1",
    vendorName: "PT. Samudra Teknik",
    totalAmount: 1250000000,
    currency: "IDR",
    paymentTerm: "Net 30",
    deliveryTerm: "DDP",
    receivingLocation: "Gudang Pusat Jakarta",
    status: "Released",
    prReference: "PR-2026-003",
    wbsReference: "WBS-DOCK-KLD-01",
    vessel: "KM Kelud",
    createdBy: "Aris Setiawan",
  },
  {
    id: "po-2",
    poNo: "PO-PELNI-2026-092",
    poDate: "2026-04-21",
    vendorId: "v-2",
    vendorName: "PT. Bahari Sparepart Indonesia",
    totalAmount: 450000000,
    currency: "IDR",
    paymentTerm: "Net 15",
    deliveryTerm: "FOB",
    receivingLocation: "KM Labobar (On-Board)",
    status: "Waiting Approval",
    prReference: "PR-2026-012",
    wbsReference: "WBS-MNT-LB-05",
    vessel: "KM Labobar",
    createdBy: "Fitri Amalia",
  },
  {
    id: "po-3",
    poNo: "PO-PELNI-2026-075",
    poDate: "2026-04-15",
    vendorId: "v-4",
    vendorName: "PT. Sinar Marine Services",
    totalAmount: 180000000,
    currency: "IDR",
    paymentTerm: "Net 30",
    deliveryTerm: "CIF",
    receivingLocation: "Gudang Cabang Surabaya",
    status: "Partially Fulfilled",
    prReference: "PR-2026-008",
    wbsReference: "WBS-ENG-UMS-03",
    vessel: "KM Umsini",
    createdBy: "Aris Setiawan",
  }
];

export const poItems: Record<string, POItem[]> = {
  "po-1": [
    {
      id: "poi-1",
      poId: "po-1",
      lineNo: "10",
      prNo: "PR-2026-003",
      prItemNo: "001",
      wbsCode: "WBS-DOCK-KLD-01",
      itemCode: "MAT-ENG-001",
      itemName: "Main Engine Piston Ring",
      description: "Standard size for Wartsila 9L32",
      qtyOrdered: 18,
      uom: "PCS",
      unitPrice: 45000000,
      taxCode: "PPN 11%",
      deliveryDate: "2026-05-15",
      subtotal: 810000000,
      status: "Ordered",
    },
    {
      id: "poi-2",
      poId: "po-1",
      lineNo: "20",
      prNo: "PR-2026-003",
      prItemNo: "002",
      wbsCode: "WBS-DOCK-KLD-01",
      itemCode: "MAT-ENG-005",
      itemName: "Cylinder Head Gasket",
      description: "Non-asbestos high temp",
      qtyOrdered: 9,
      uom: "PCS",
      unitPrice: 12000000,
      taxCode: "PPN 11%",
      deliveryDate: "2026-05-15",
      subtotal: 108000000,
      status: "Ordered",
    }
  ]
};
