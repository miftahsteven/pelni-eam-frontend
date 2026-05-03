export type DisposalStatus =
  | 'Draft'
  | 'Submitted'
  | 'Technical Review'
  | 'Asset Manager Review'
  | 'Finance Review'
  | 'Management Approval'
  | 'Approved'
  | 'Rejected'
  | 'Need Revision'
  | 'Dismantling'
  | 'Ready for Disposal'
  | 'Disposed'
  | 'Written Off'
  | 'Sold'
  | 'Scrapped'
  | 'Donated'
  | 'Lost'
  | 'Destroyed'
  | 'Cancelled';

export type DisposalType =
  | 'Scrap'
  | 'Sale'
  | 'Donation'
  | 'Write-off'
  | 'Lost Asset'
  | 'Destroyed'
  | 'Returned to Vendor'
  | 'Dismantle Only';

export interface DisposalRequest {
  id: string;
  requestNo: string;
  assetCode: string;
  assetName: string;
  category: string;
  serialNumber?: string;
  currentLocation: string;
  currentPIC: string;
  assetStatus: string;
  disposalType: DisposalType;
  condition: string;
  sourceModule?: string;
  movementRef?: string;
  maintenanceRef?: string;
  stockOpnameRef?: string;
  replacementRef?: string;
  bookValue?: number;
  estimatedScrapValue?: number;
  requestDate: string;
  requester: string;
  status: DisposalStatus;
  updatedAt: string;
}

export const summaryStats = {
  total: 24,
  pendingApproval: 6,
  dismantling: 3,
  disposedThisMonth: 8,
  writtenOff: 2
};

export const disposalRequests: DisposalRequest[] = [
  {
    id: '1',
    requestNo: 'DIS-2026-0001',
    assetCode: 'AST-NAV-00021',
    assetName: 'Radar Navigasi Lama',
    category: 'Navigation Equipment',
    serialNumber: 'SN-RAD-991',
    currentLocation: 'KM Kelud - Bridge Deck',
    currentPIC: 'Officer Navigasi',
    assetStatus: 'Active',
    disposalType: 'Scrap',
    condition: 'Heavy Damage',
    sourceModule: 'Maintenance',
    maintenanceRef: 'MTN-2026-0041',
    stockOpnameRef: 'SO-2026-0012',
    replacementRef: 'REP-2026-0004',
    bookValue: 12000000,
    requestDate: '2026-05-03',
    updatedAt: '2026-05-03T09:00:00Z',
    requester: 'Technical Unit',
    status: 'Finance Review'
  },
  {
    id: '2',
    requestNo: 'DIS-2026-0002',
    assetCode: 'AST-IT-00087',
    assetName: 'Server Rack Lama',
    category: 'IT Equipment',
    serialNumber: 'SRV-881-A',
    currentLocation: 'Gudang Pusat',
    currentPIC: 'IT Asset PIC',
    assetStatus: 'In Use',
    disposalType: 'Sale',
    condition: 'Obsolete',
    sourceModule: 'Replacement',
    maintenanceRef: 'MTN-2026-0032',
    stockOpnameRef: 'SO-2026-0009',
    replacementRef: 'REP-2026-0002',
    bookValue: 8500000,
    requestDate: '2026-05-01',
    updatedAt: '2026-05-02T14:00:00Z',
    requester: 'IT Department',
    status: 'Approved'
  },
  {
    id: '3',
    requestNo: 'DIS-2026-0003',
    assetCode: 'AST-MCH-00102',
    assetName: 'Pompa Air Mesin Lama',
    category: 'Machinery',
    currentLocation: 'Disposal Area Surabaya',
    currentPIC: 'Warehouse Surabaya',
    assetStatus: 'Dismantling',
    disposalType: 'Write-off',
    condition: 'Damaged',
    sourceModule: 'Movement',
    movementRef: 'MOV-2026-0018',
    maintenanceRef: 'MTN-2026-0055',
    bookValue: 0,
    requestDate: '2026-04-28',
    updatedAt: '2026-04-30T10:00:00Z',
    requester: 'Engineering Unit',
    status: 'Dismantling'
  },
  {
    id: '4',
    requestNo: 'DIS-2026-0004',
    assetCode: 'AST-OFF-0044',
    assetName: 'Office Workstation L-Shape',
    category: 'Office Furniture',
    currentLocation: 'Head Office - JKT',
    currentPIC: 'General Affairs',
    assetStatus: 'Available',
    disposalType: 'Donation',
    condition: 'Fair',
    requestDate: '2026-04-15',
    updatedAt: '2026-04-18T11:00:00Z',
    requester: 'GA Unit',
    status: 'Donated'
  },
  {
    id: '5',
    requestNo: 'DIS-2026-0005',
    assetCode: 'AST-NAV-0012',
    assetName: 'GPS Receiver Module',
    category: 'Navigation Equipment',
    currentLocation: 'KM Ciremai',
    currentPIC: 'Radio Officer',
    assetStatus: 'Missing',
    disposalType: 'Lost Asset',
    condition: 'Missing',
    sourceModule: 'Stock Opname',
    stockOpnameRef: 'SO-2026-0044',
    bookValue: 5000000,
    requestDate: '2026-05-02',
    updatedAt: '2026-05-03T08:00:00Z',
    requester: 'Technical Unit',
    status: 'Management Approval'
  }
];

export const mockLifecycle = [
  { date: '2025-10-12', module: 'Asset Registration', ref: 'REG-2025-0120', note: 'Asset registered after acceptance test' },
  { date: '2026-01-15', module: 'Maintenance', ref: 'MTN-2026-0041', note: 'Heavy damage found during corrective maintenance' },
  { date: '2026-03-20', module: 'Replacement', ref: 'REP-2026-0004', note: 'Asset replaced by new navigation radar' },
  { date: '2026-04-02', module: 'Movement', ref: 'MOV-2026-0015', note: 'Moved to disposal warehouse' },
  { date: '2026-05-03', module: 'Disposal', ref: 'DIS-2026-0001', note: 'Disposal request submitted' }
];

export const mockApprovalSteps = [
  { level: 1, role: 'Technical Review', status: 'Approved', approver: 'Agus Setiawan (Sr. Technician)', date: '2026-05-03 09:00' },
  { level: 2, role: 'Asset Manager Review', status: 'Approved', approver: 'Ratna Sari (Manager)', date: '2026-05-03 11:30' },
  { level: 3, role: 'Finance Review', status: 'Pending', approver: 'Finance Officer', date: '-' },
  { level: 4, role: 'Management Approval', status: 'Waiting', approver: 'General Manager', date: '-' }
];
