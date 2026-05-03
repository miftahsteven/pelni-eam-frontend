export type ReplacementStatus = 
  | 'Draft' 
  | 'Submitted' 
  | 'Technical Review' 
  | 'Asset Manager Review' 
  | 'Finance Review' 
  | 'Management Approval' 
  | 'Approved' 
  | 'Rejected' 
  | 'Waiting Procurement' 
  | 'Waiting Delivery' 
  | 'Waiting Installation' 
  | 'Ready to Complete' 
  | 'Completed' 
  | 'Pending Disposal';

export type ReplacementType = 'Existing Asset' | 'New Procurement';

export interface ReplacementRequest {
  id: string;
  requestNo: string;
  oldAssetCode: string;
  oldAssetName: string;
  category: string;
  location: string;
  pic: string;
  condition: string;
  replacementType: ReplacementType;
  reason: string;
  maintenanceRef?: string;
  stockOpnameRef?: string;
  trackingRef?: string;
  prRef?: string;
  poRef?: string;
  doRef?: string;
  installationRef?: string;
  newAssetCode?: string;
  status: ReplacementStatus;
  requester: string;
  requestDate: string;
  updatedAt: string;
  notes?: string;
}

export const summaryStats = {
  total: 12,
  pendingApproval: 4,
  waitingProcurement: 3,
  completedThisMonth: 5
};

export const replacementRequests: ReplacementRequest[] = [
  {
    id: '1',
    requestNo: 'REP-2026-0001',
    oldAssetCode: 'AST-NAV-001',
    oldAssetName: 'Marine GPS Navigator',
    category: 'Navigation Equipment',
    location: 'KM Kelud - Bridge Deck',
    pic: 'Chief Officer',
    condition: 'Heavy Damage',
    replacementType: 'New Procurement',
    reason: 'Obsolete and vendor support ended',
    maintenanceRef: 'MNT-2026-0031',
    stockOpnameRef: 'SO-2026-0018',
    trackingRef: 'TRK-2026-0022',
    prRef: 'PR-2026-0021',
    poRef: 'PO-2026-0088',
    doRef: 'DO-2026-0043',
    installationRef: 'INST-2026-0041',
    newAssetCode: 'AST-NAV-009',
    status: 'Waiting Installation',
    requester: 'Marine Operation Unit',
    requestDate: '2026-05-03',
    updatedAt: '2026-05-03T10:00:00Z'
  },
  {
    id: '2',
    requestNo: 'REP-2026-0002',
    oldAssetCode: 'AST-ENG-017',
    oldAssetName: 'Auxiliary Pump Unit',
    category: 'Engine Equipment',
    location: 'KM Dobonsolo - Engine Room',
    pic: 'Chief Engineer',
    condition: 'High Repair Cost',
    replacementType: 'Existing Asset',
    reason: 'Repair cost exceeds economic value',
    maintenanceRef: 'MNT-2026-0044',
    stockOpnameRef: 'SO-2026-0020',
    trackingRef: 'TRK-2026-0030',
    newAssetCode: 'AST-ENG-051',
    status: 'Technical Review',
    requester: 'Engineering Unit',
    requestDate: '2026-05-01',
    updatedAt: '2026-05-01T14:30:00Z'
  },
  {
    id: '3',
    requestNo: 'REP-2026-0003',
    oldAssetCode: 'AST-IT-0012',
    oldAssetName: 'Server Rack Module A',
    category: 'IT Infrastructure',
    location: 'Central Data Center JKT',
    pic: 'IT Admin',
    condition: 'Obsolete',
    replacementType: 'New Procurement',
    reason: 'Upgrade requirement for new system',
    prRef: 'PR-2026-0045',
    status: 'Waiting Procurement',
    requester: 'IT Department',
    requestDate: '2026-04-28',
    updatedAt: '2026-04-28T09:15:00Z'
  },
  {
    id: '4',
    requestNo: 'REP-2026-0004',
    oldAssetCode: 'AST-COM-098',
    oldAssetName: 'Satellite Antenna',
    category: 'Communication',
    location: 'KM Ciremai - Top Deck',
    pic: 'Radio Officer',
    condition: 'Heavy Damage',
    replacementType: 'New Procurement',
    reason: 'Lightning strike damage',
    maintenanceRef: 'MNT-2026-0102',
    status: 'Management Approval',
    requester: 'Communication Dept',
    requestDate: '2026-05-02',
    updatedAt: '2026-05-03T08:00:00Z'
  },
  {
    id: '5',
    requestNo: 'REP-2026-0005',
    oldAssetCode: 'AST-OFF-005',
    oldAssetName: 'Workstation Unit 05',
    category: 'Office Equipment',
    location: 'Head Office - Finance',
    pic: 'Finance Staff',
    condition: 'End of Useful Life',
    replacementType: 'Existing Asset',
    reason: 'Asset age exceeds 5 years',
    newAssetCode: 'AST-OFF-088',
    status: 'Completed',
    requester: 'General Affairs',
    requestDate: '2026-04-15',
    updatedAt: '2026-04-20T16:00:00Z'
  },
  {
    id: '6',
    requestNo: 'REP-2026-0006',
    oldAssetCode: 'AST-ENG-042',
    oldAssetName: 'Fuel Filter Housing',
    category: 'Engine Equipment',
    location: 'KM Kelud - Engine Room',
    pic: 'Second Engineer',
    condition: 'Broken',
    replacementType: 'Existing Asset',
    reason: 'Cracked housing causing leaks',
    maintenanceRef: 'MNT-2026-0155',
    newAssetCode: 'AST-ENG-092',
    status: 'Draft',
    requester: 'Engineering Unit',
    requestDate: '2026-05-03',
    updatedAt: '2026-05-03T11:00:00Z'
  }
];

export const mockAssets = [
  { code: 'AST-NAV-001', name: 'Marine GPS Navigator', category: 'Navigation Equipment', location: 'KM Kelud - Bridge Deck', status: 'Active', condition: 'Heavy Damage' },
  { code: 'AST-NAV-009', name: 'Next-Gen GPS Unit', category: 'Navigation Equipment', location: 'Central Warehouse JKT', status: 'Ready', condition: 'New' },
  { code: 'AST-ENG-017', name: 'Auxiliary Pump Unit', category: 'Engine Equipment', location: 'KM Dobonsolo - Engine Room', status: 'Active', condition: 'Fair' },
  { code: 'AST-ENG-051', name: 'Spare Pump Unit B', category: 'Engine Equipment', location: 'Surabaya Branch', status: 'Available', condition: 'Refurbished' },
  { code: 'AST-OFF-088', name: 'Dell Precision 3660', category: 'Office Equipment', location: 'Central Warehouse JKT', status: 'Available', condition: 'New' },
];
