export type InvoiceStatus =
  | 'Draft'
  | 'Submitted'
  | 'Waiting Matching'
  | 'Matched'
  | 'Mismatch'
  | 'Technical Verification'
  | 'Finance Verification'
  | 'Waiting Approval'
  | 'Approved'
  | 'Rejected'
  | 'Ready for Payment'
  | 'Partially Paid'
  | 'Paid'
  | 'Cancelled'
  | 'Hold';

export type InvoiceType = 
  | 'Procurement' 
  | 'Maintenance' 
  | 'Installation' 
  | 'Replacement' 
  | 'Disposal';

export interface InvoiceLineItem {
  id: string;
  itemCode: string;
  description: string;
  sourceQty: number;
  invoiceQty: number;
  unitPrice: number;
  tax: number;
  total: number;
  status: 'Matched' | 'Mismatch' | 'Adjusted';
}

export interface MatchingCheckpoint {
  id: string;
  checkpoint: string;
  sourceValue: string | number;
  invoiceValue: string | number;
  result: 'Match' | 'Mismatch';
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  invoiceType: InvoiceType;
  vendorId: string;
  vendorName: string;
  sourceDocType: 'PO' | 'WO' | 'DO' | 'Acceptance' | 'Disposal Report';
  sourceDocNo: string;
  poNo?: string;
  doNo?: string;
  woNo?: string;
  wbsCode: string;
  costCenter: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: InvoiceStatus;
  paymentTerm: string;
  matchingStatus: 'Matched' | 'Mismatch' | 'Pending';
  createdAt: string;
  updatedAt: string;
}

export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNo: 'INV-STN-2026-0001',
    invoiceType: 'Procurement',
    vendorId: 'VEN-001',
    vendorName: 'PT Samudera Teknik Nusantara',
    sourceDocType: 'PO',
    sourceDocNo: 'PO-EAM-2026-0004',
    poNo: 'PO-EAM-2026-0004',
    doNo: 'DO-STN-2026-0007',
    wbsCode: 'WBS-NAV-2026-001',
    costCenter: 'OPS-MARINE',
    invoiceDate: '2026-05-07',
    dueDate: '2026-06-06',
    currency: 'IDR',
    totalAmount: 2025750000,
    paidAmount: 0,
    remainingAmount: 2025750000,
    status: 'Ready for Payment',
    paymentTerm: 'Net 30',
    matchingStatus: 'Matched',
    createdAt: '2026-05-07T09:00:00Z',
    updatedAt: '2026-05-08T10:00:00Z'
  },
  {
    id: '2',
    invoiceNo: 'INV-BAH-2026-0003',
    invoiceType: 'Maintenance',
    vendorId: 'VEN-002',
    vendorName: 'PT Bahari Maintenance Indonesia',
    sourceDocType: 'WO',
    sourceDocNo: 'WO-MNT-2026-014',
    woNo: 'WO-MNT-2026-014',
    wbsCode: 'WBS-MNT-2026-014',
    costCenter: 'ENG-FLEET',
    invoiceDate: '2026-05-03',
    dueDate: '2026-05-30',
    currency: 'IDR',
    totalAmount: 420000000,
    paidAmount: 200000000,
    remainingAmount: 220000000,
    status: 'Partially Paid',
    paymentTerm: 'Term 1 (50%)',
    matchingStatus: 'Matched',
    createdAt: '2026-05-03T08:00:00Z',
    updatedAt: '2026-05-10T14:00:00Z'
  },
  {
    id: '3',
    invoiceNo: 'INV-EKM-2026-0004',
    invoiceType: 'Replacement',
    vendorId: 'VEN-003',
    vendorName: 'PT Elektrika Kapal Mandiri',
    sourceDocType: 'PO',
    sourceDocNo: 'PO-EAM-2026-0009',
    poNo: 'PO-EAM-2026-0009',
    wbsCode: 'WBS-RPL-2026-009',
    costCenter: 'ENG-ELECT',
    invoiceDate: '2026-05-11',
    dueDate: '2026-06-11',
    currency: 'IDR',
    totalAmount: 680000000,
    paidAmount: 0,
    remainingAmount: 680000000,
    status: 'Waiting Approval',
    paymentTerm: 'Net 30',
    matchingStatus: 'Matched',
    createdAt: '2026-05-11T10:00:00Z',
    updatedAt: '2026-05-12T09:00:00Z'
  },
  {
    id: '4',
    invoiceNo: 'INV-ITM-2026-0005',
    invoiceType: 'Installation',
    vendorId: 'VEN-005',
    vendorName: 'PT Integrasi Teknologi Maritim',
    sourceDocType: 'PO',
    sourceDocNo: 'PO-EAM-2026-0011',
    poNo: 'PO-EAM-2026-0011',
    doNo: 'DO-ITM-2026-0005',
    wbsCode: 'WBS-INS-2026-006',
    costCenter: 'IT-DEPT',
    invoiceDate: '2026-05-12',
    dueDate: '2026-06-12',
    currency: 'IDR',
    totalAmount: 795000000,
    paidAmount: 0,
    remainingAmount: 795000000,
    status: 'Mismatch',
    paymentTerm: 'Net 30',
    matchingStatus: 'Mismatch',
    createdAt: '2026-05-12T11:00:00Z',
    updatedAt: '2026-05-12T15:00:00Z'
  }
];

export const invoiceStats = {
  totalCount: 42,
  totalAmount: 12875000000,
  waitingApproval: 5,
  mismatchCount: 2,
  readyForPayment: 8,
  overdueCount: 3
};

export const lineItems: Record<string, InvoiceLineItem[]> = {
  '1': [
    { id: 'l1', itemCode: 'AST-NAV-001', description: 'Radar Navigation Unit', sourceQty: 2, invoiceQty: 2, unitPrice: 850000000, tax: 187000000, total: 1887000000, status: 'Matched' },
    { id: 'l2', itemCode: 'SRV-INS-001', description: 'Installation Service', sourceQty: 1, invoiceQty: 1, unitPrice: 125000000, tax: 13750000, total: 138750000, status: 'Matched' }
  ],
  '4': [
    { id: 'l3', itemCode: 'CAB-SPD-001', description: 'High Speed Data Cable', sourceQty: 100, invoiceQty: 120, unitPrice: 50000, tax: 600000, total: 6600000, status: 'Mismatch' }
  ]
};

export const matchingCheckpoints: Record<string, MatchingCheckpoint[]> = {
  '1': [
    { id: 'c1', checkpoint: 'Vendor Identity', sourceValue: 'PT Samudera Teknik Nusantara', invoiceValue: 'PT Samudera Teknik Nusantara', result: 'Match' },
    { id: 'c2', checkpoint: 'PO Total Amount', sourceValue: 2025750000, invoiceValue: 2025750000, result: 'Match' },
    { id: 'c3', checkpoint: 'DO Quantity', sourceValue: '2 Units', invoiceValue: '2 Units', result: 'Match' },
    { id: 'c4', checkpoint: 'Technical Acceptance', sourceValue: 'Passed', invoiceValue: 'Passed', result: 'Match' }
  ],
  '4': [
    { id: 'c5', checkpoint: 'Item Quantity', sourceValue: '100 Units', invoiceValue: '120 Units', result: 'Mismatch', notes: 'Invoice quantity exceeds PO quantity' }
  ]
};
