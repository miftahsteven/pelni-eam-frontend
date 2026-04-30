import { PurchaseOrder, POItem, dummyPOs, poItems } from "./purchase-order";

export type DeliveryOrderStatus = "Draft" | "Waiting Arrival" | "Arrived" | "Under Verification" | "Verified" | "Partial Accepted" | "Rejected" | "Closed";

export interface DeliveryOrder {
  id: string;
  doNo: string;
  doDate: string;
  poId: string;
  poNo: string;
  vendorId: string;
  vendorName: string;
  shipmentDate: string;
  expectedArrivalDate: string;
  actualArrivalDate?: string;
  vendorDoNo: string;
  packingListNo: string;
  expedition: string;
  vehicleNo: string;
  driverName: string;
  receivingLocation: string;
  receiverPIC: string;
  status: DeliveryOrderStatus;
  discrepancyFlag: boolean;
  notes: string;
  createdBy: string;
}

export type DOItemStatus = "Open" | "Delivered" | "Partially Accepted" | "Accepted" | "Short Delivered" | "Short Delivery" | "Damaged" | "Rejected" | "Ready for GR" | "Ready for Service Confirmation";

export interface DOItem {
  id: string;
  doId: string;
  lineNo: string;
  poItemNo: string;
  itemCode: string;
  itemName: string;
  itemType: "Material" | "Service";
  uom: string;
  qtyOrdered: number;
  qtyDeliveredBefore: number;
  qtyDeliveredNow: number;
  qtyAccepted: number;
  qtyRejected: number;
  qtyRemaining: number;
  condition: "Good" | "Damaged" | "Wrong Item";
  status: DOItemStatus;
  remarks: string;
}

export const dummyDOs: DeliveryOrder[] = [
  {
    id: "do-1",
    doNo: "DO-PELNI-2026-0012",
    doDate: "2026-04-20",
    poId: "po-1",
    poNo: "PO-PELNI-2026-088",
    vendorId: "v-1",
    vendorName: "PT. Samudra Teknik",
    shipmentDate: "2026-04-19",
    expectedArrivalDate: "2026-04-21",
    actualArrivalDate: "2026-04-21",
    vendorDoNo: "SJ/2026/04/991",
    packingListNo: "PL-00912",
    expedition: "JNE Logistics",
    vehicleNo: "B 1234 ABC",
    driverName: "Budi Santoso",
    receivingLocation: "Gudang Pusat Jakarta",
    receiverPIC: "Aris Setiawan",
    status: "Verified",
    discrepancyFlag: false,
    notes: "Barang diterima sesuai pesanan",
    createdBy: "System",
  },
  {
    id: "do-2",
    doNo: "DO-PELNI-2026-0015",
    doDate: "2026-04-22",
    poId: "po-3",
    poNo: "PO-PELNI-2026-075",
    vendorId: "v-4",
    vendorName: "PT. Sinar Marine Services",
    shipmentDate: "2026-04-21",
    expectedArrivalDate: "2026-04-23",
    vendorDoNo: "SJ-SINAR-1002",
    packingListNo: "PK-1002",
    expedition: "Self Pick-up",
    vehicleNo: "L 9876 XYZ",
    driverName: "Anton",
    receivingLocation: "Gudang Cabang Surabaya",
    receiverPIC: "Agus Prasetyo",
    status: "Waiting Arrival",
    discrepancyFlag: false,
    notes: "Pengiriman via jalur darat",
    createdBy: "System",
  }
];

export const doItems: Record<string, DOItem[]> = {
  "do-1": [
    {
      id: "doi-1",
      doId: "do-1",
      lineNo: "10",
      poItemNo: "10",
      itemCode: "MAT-ENG-001",
      itemName: "Main Engine Piston Ring",
      itemType: "Material",
      uom: "PCS",
      qtyOrdered: 18,
      qtyDeliveredBefore: 0,
      qtyDeliveredNow: 18,
      qtyAccepted: 18,
      qtyRejected: 0,
      qtyRemaining: 0,
      condition: "Good",
      status: "Accepted",
      remarks: "Batch 2026",
    },
    {
      id: "doi-2",
      doId: "do-1",
      lineNo: "20",
      poItemNo: "20",
      itemCode: "MAT-ENG-005",
      itemName: "Cylinder Head Gasket",
      itemType: "Material",
      uom: "PCS",
      qtyOrdered: 9,
      qtyDeliveredBefore: 0,
      qtyDeliveredNow: 9,
      qtyAccepted: 9,
      qtyRejected: 0,
      qtyRemaining: 0,
      condition: "Good",
      status: "Accepted",
      remarks: "Standard Type",
    }
  ]
};
