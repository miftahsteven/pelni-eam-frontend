export type MovementStatus = 
  | 'Draft' 
  | 'Submitted' 
  | 'Under Review' 
  | 'Approved' 
  | 'Rejected' 
  | 'In Transit' 
  | 'Completed' 
  | 'Cancelled';

export interface DummyAssetContext {
  id: string;
  assetCode: string;
  assetName: string;
  serialNumber: string;
  category: string;
  currentLocation: string;
  currentDepartment: string;
  currentPic: string;
  status: string;
  lastTrackingLocation: string;
  lastTrackingDate: string;
  lastMaintenanceStatus: string;
  lastOpnameFinding: string;
  acquisitionDate: string;
  bookValue: number;
}

export interface MovementRequest {
  id: string;
  requestNo: string;
  assetCode: string;
  assetName: string;
  serialNumber: string;
  category: string;
  currentLocation: string;
  destinationLocation: string;
  currentDepartment: string;
  destinationDepartment: string;
  currentPic: string;
  destinationPic: string;
  movementType: string;
  movementDate: string;
  expectedArrivalDate?: string;
  reason: string;
  notes?: string;
  relatedModule?: string;
  referenceNumber?: string;
  status: MovementStatus;
  requester: string;
  createdAt: string;
  updatedAt: string;
}

export const assets: DummyAssetContext[] = [
  {
    id: 'AST-ENG-00032',
    assetCode: 'AST-ENG-00032',
    assetName: 'Main Engine Pump',
    serialNumber: 'MEP-PEL-2024-032',
    category: 'Engine Equipment',
    currentLocation: 'KM Dobonsolo - Engine Room',
    currentDepartment: 'Marine Engineering',
    currentPic: 'Budi Santoso',
    status: 'Active',
    lastTrackingLocation: 'KM Dobonsolo - Engine Room',
    lastTrackingDate: '2026-04-28',
    lastMaintenanceStatus: 'Completed',
    lastOpnameFinding: 'Matched',
    acquisitionDate: '2024-01-15',
    bookValue: 150000000
  },
  {
    id: 'AST-IT-00105',
    assetCode: 'AST-IT-00105',
    assetName: 'Server Rack Unit A',
    serialNumber: 'SRV-RCA-9981',
    category: 'IT Equipment',
    currentLocation: 'Central Warehouse Jakarta',
    currentDepartment: 'IT Operations',
    currentPic: 'Ahmad Fachrudin',
    status: 'Pending Disposal',
    lastTrackingLocation: 'Central Warehouse Jakarta',
    lastTrackingDate: '2026-05-01',
    lastMaintenanceStatus: 'Beyond Repair',
    lastOpnameFinding: 'Matched',
    acquisitionDate: '2019-06-10',
    bookValue: 2000000
  },
  {
    id: 'AST-SAF-00041',
    assetCode: 'AST-SAF-00041',
    assetName: 'Lifeboat Station #4',
    serialNumber: 'LFB-004-KMK',
    category: 'Safety Equipment',
    currentLocation: 'KM Kelud - Deck 4',
    currentDepartment: 'Safety & Security',
    currentPic: 'Kapten Kapal',
    status: 'In Maintenance',
    lastTrackingLocation: 'Maintenance Workshop Jakarta',
    lastTrackingDate: '2026-05-02',
    lastMaintenanceStatus: 'In Progress',
    lastOpnameFinding: 'Location Mismatch',
    acquisitionDate: '2022-11-20',
    bookValue: 350000000
  },
  {
    id: 'AST-NAV-00012',
    assetCode: 'AST-NAV-00012',
    assetName: 'Radar System Primary',
    serialNumber: 'RAD-PRI-774',
    category: 'Navigation',
    currentLocation: 'KM Bukit Raya - Navigation Room',
    currentDepartment: 'Bridge Operations',
    currentPic: 'First Officer',
    status: 'Waiting Replacement',
    lastTrackingLocation: 'KM Bukit Raya',
    lastTrackingDate: '2026-04-30',
    lastMaintenanceStatus: 'End of Life',
    lastOpnameFinding: 'Matched',
    acquisitionDate: '2015-02-18',
    bookValue: 0
  },
  {
    id: 'AST-FNC-00088',
    assetCode: 'AST-FNC-00088',
    assetName: 'Office Desk Executive',
    serialNumber: 'DSK-EXC-088',
    category: 'Furniture',
    currentLocation: 'Kantor Pusat - Lt. 5',
    currentDepartment: 'Finance',
    currentPic: 'Direktur Keuangan',
    status: 'Active',
    lastTrackingLocation: 'Kantor Pusat - Lt. 5',
    lastTrackingDate: '2026-04-15',
    lastMaintenanceStatus: 'N/A',
    lastOpnameFinding: 'Matched',
    acquisitionDate: '2023-08-01',
    bookValue: 5000000
  }
];

export const movementRequests: MovementRequest[] = [
  {
    id: 'req-001',
    requestNo: 'MOV-2026-0001',
    assetCode: 'AST-ENG-00032',
    assetName: 'Main Engine Pump',
    serialNumber: 'MEP-PEL-2024-032',
    category: 'Engine Equipment',
    currentLocation: 'KM Dobonsolo - Engine Room',
    destinationLocation: 'Central Warehouse Jakarta',
    currentDepartment: 'Marine Engineering',
    destinationDepartment: 'Logistic',
    currentPic: 'Budi Santoso',
    destinationPic: 'Admin Gudang',
    movementType: 'Maintenance Transfer',
    movementDate: '2026-05-03',
    expectedArrivalDate: '2026-05-05',
    reason: 'Sent for major overhaul and calibration at central workshop.',
    notes: 'Please ensure proper crating before transport.',
    relatedModule: 'Maintenance',
    referenceNumber: 'WO-2026-0491',
    status: 'Approved',
    requester: 'Budi Santoso',
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-02T14:30:00Z'
  },
  {
    id: 'req-002',
    requestNo: 'MOV-2026-0002',
    assetCode: 'AST-IT-00105',
    assetName: 'Server Rack Unit A',
    serialNumber: 'SRV-RCA-9981',
    category: 'IT Equipment',
    currentLocation: 'Central Warehouse Jakarta',
    destinationLocation: 'Disposal Holding Area',
    currentDepartment: 'IT Operations',
    destinationDepartment: 'Asset Management',
    currentPic: 'Ahmad Fachrudin',
    destinationPic: 'Tim Penghapusan',
    movementType: 'Disposal Preparation',
    movementDate: '2026-05-04',
    expectedArrivalDate: '2026-05-04',
    reason: 'Moving to disposal area as asset is marked for write-off.',
    status: 'Submitted',
    requester: 'Ahmad Fachrudin',
    createdAt: '2026-05-02T09:15:00Z',
    updatedAt: '2026-05-02T09:15:00Z'
  },
  {
    id: 'req-003',
    requestNo: 'MOV-2026-0003',
    assetCode: 'AST-SAF-00041',
    assetName: 'Lifeboat Station #4',
    serialNumber: 'LFB-004-KMK',
    category: 'Safety Equipment',
    currentLocation: 'Maintenance Workshop Jakarta',
    destinationLocation: 'KM Kelud - Deck 4',
    currentDepartment: 'Safety & Security',
    destinationDepartment: 'Safety & Security',
    currentPic: 'Kepala Bengkel',
    destinationPic: 'Kapten Kapal',
    movementType: 'Operational Transfer',
    movementDate: '2026-05-01',
    expectedArrivalDate: '2026-05-03',
    reason: 'Return to ship after fiberglass repair.',
    relatedModule: 'Maintenance',
    referenceNumber: 'WO-2026-0388',
    status: 'In Transit',
    requester: 'Kepala Bengkel',
    createdAt: '2026-04-28T10:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z'
  },
  {
    id: 'req-004',
    requestNo: 'MOV-2026-0004',
    assetCode: 'AST-NAV-00012',
    assetName: 'Radar System Primary',
    serialNumber: 'RAD-PRI-774',
    category: 'Navigation',
    currentLocation: 'KM Bukit Raya - Navigation Room',
    destinationLocation: 'Asset Transit Area',
    currentDepartment: 'Bridge Operations',
    destinationDepartment: 'Logistic',
    currentPic: 'First Officer',
    destinationPic: 'Admin Gudang',
    movementType: 'Replacement Preparation',
    movementDate: '2026-05-06',
    expectedArrivalDate: '2026-05-08',
    reason: 'Dismantling old radar for replacement project.',
    relatedModule: 'Replacement',
    status: 'Draft',
    requester: 'First Officer',
    createdAt: '2026-05-03T07:30:00Z',
    updatedAt: '2026-05-03T07:30:00Z'
  },
  {
    id: 'req-005',
    requestNo: 'MOV-2026-0005',
    assetCode: 'AST-FNC-00088',
    assetName: 'Office Desk Executive',
    serialNumber: 'DSK-EXC-088',
    category: 'Furniture',
    currentLocation: 'Kantor Pusat - Lt. 5',
    destinationLocation: 'Kantor Pusat - Lt. 3',
    currentDepartment: 'Finance',
    destinationDepartment: 'HRD',
    currentPic: 'Direktur Keuangan',
    destinationPic: 'Manajer HRD',
    movementType: 'Operational Transfer',
    movementDate: '2026-04-25',
    expectedArrivalDate: '2026-04-25',
    reason: 'Internal office relocation.',
    status: 'Completed',
    requester: 'Tim GA',
    createdAt: '2026-04-24T11:20:00Z',
    updatedAt: '2026-04-25T16:00:00Z'
  },
  {
    id: 'req-006',
    requestNo: 'MOV-2026-0006',
    assetCode: 'AST-GEN-00212',
    assetName: 'Portable Generator 5KVA',
    serialNumber: 'GEN-PT-500',
    category: 'Equipment',
    currentLocation: 'Surabaya Branch Warehouse',
    destinationLocation: 'KM Sinabung',
    currentDepartment: 'Logistic',
    destinationDepartment: 'Marine Engineering',
    currentPic: 'Admin Surabaya',
    destinationPic: 'Chief Engineer',
    movementType: 'Warehouse Transfer',
    movementDate: '2026-05-05',
    reason: 'Requested by ship for backup power during docking.',
    status: 'Under Review',
    requester: 'Chief Engineer',
    createdAt: '2026-05-02T13:45:00Z',
    updatedAt: '2026-05-02T15:00:00Z'
  },
  {
    id: 'req-007',
    requestNo: 'MOV-2026-0007',
    assetCode: 'AST-VEH-00015',
    assetName: 'Forklift 3-Ton',
    serialNumber: 'FL-3T-882',
    category: 'Heavy Equipment',
    currentLocation: 'Makassar Branch Warehouse',
    destinationLocation: 'Central Warehouse Jakarta',
    currentDepartment: 'Logistic',
    destinationDepartment: 'Logistic',
    currentPic: 'Admin Makassar',
    destinationPic: 'Manager Gudang Pusat',
    movementType: 'Operational Transfer',
    movementDate: '2026-04-20',
    expectedArrivalDate: '2026-04-28',
    reason: 'Reallocation of heavy equipment to high-demand area.',
    status: 'Completed',
    requester: 'Manager Gudang Pusat',
    createdAt: '2026-04-18T09:00:00Z',
    updatedAt: '2026-04-28T10:30:00Z'
  },
  {
    id: 'req-008',
    requestNo: 'MOV-2026-0008',
    assetCode: 'AST-IT-00441',
    assetName: 'Cisco Core Switch',
    serialNumber: 'CS-SW-229',
    category: 'IT Equipment',
    currentLocation: 'Kantor Pusat - Server Room',
    destinationLocation: 'Disposal Holding Area',
    currentDepartment: 'IT Operations',
    destinationDepartment: 'Asset Management',
    currentPic: 'Ahmad Fachrudin',
    destinationPic: 'Tim Penghapusan',
    movementType: 'Disposal Preparation',
    movementDate: '2026-05-08',
    reason: 'Obsolete network equipment.',
    status: 'Draft',
    requester: 'Ahmad Fachrudin',
    createdAt: '2026-05-03T08:15:00Z',
    updatedAt: '2026-05-03T08:15:00Z'
  },
  {
    id: 'req-009',
    requestNo: 'MOV-2026-0009',
    assetCode: 'AST-MED-00022',
    assetName: 'Defibrillator Unit',
    serialNumber: 'DEF-MED-01',
    category: 'Medical Equipment',
    currentLocation: 'KM Ciremai - Clinic',
    destinationLocation: 'Maintenance Workshop Jakarta',
    currentDepartment: 'Medical Facility',
    destinationDepartment: 'Maintenance Dept',
    currentPic: 'Ship Doctor',
    destinationPic: 'Kepala Bengkel',
    movementType: 'Maintenance Transfer',
    movementDate: '2026-05-02',
    reason: 'Annual calibration and battery replacement.',
    status: 'In Transit',
    requester: 'Ship Doctor',
    createdAt: '2026-04-30T14:20:00Z',
    updatedAt: '2026-05-02T08:00:00Z'
  },
  {
    id: 'req-010',
    requestNo: 'MOV-2026-0010',
    assetCode: 'AST-HVA-00076',
    assetName: 'AC Central Compressor',
    serialNumber: 'ACC-HV-99',
    category: 'HVAC Equipment',
    currentLocation: 'KM Nggapulu',
    destinationLocation: 'Surabaya Branch Warehouse',
    currentDepartment: 'Marine Engineering',
    destinationDepartment: 'Logistic',
    currentPic: 'Chief Engineer',
    destinationPic: 'Admin Surabaya',
    movementType: 'Replacement Preparation',
    movementDate: '2026-05-01',
    reason: 'Compressor burnt, moving out to prepare for new unit installation.',
    status: 'Completed',
    requester: 'Chief Engineer',
    createdAt: '2026-04-28T11:00:00Z',
    updatedAt: '2026-05-01T16:45:00Z'
  },
  {
    id: 'req-011',
    requestNo: 'MOV-2026-0011',
    assetCode: 'AST-OFF-00112',
    assetName: 'Photocopier Machine',
    serialNumber: 'CPY-OFF-12',
    category: 'Office Equipment',
    currentLocation: 'Kantor Pusat - Lt. 2',
    destinationLocation: 'Asset Transit Area',
    currentDepartment: 'Operations',
    destinationDepartment: 'Logistic',
    currentPic: 'Admin Ops',
    destinationPic: 'Tim Gudang',
    movementType: 'Warehouse Transfer',
    movementDate: '2026-05-04',
    reason: 'Lease expired, returning to holding area.',
    status: 'Submitted',
    requester: 'Tim GA',
    createdAt: '2026-05-03T09:30:00Z',
    updatedAt: '2026-05-03T09:30:00Z'
  },
  {
    id: 'req-012',
    requestNo: 'MOV-2026-0012',
    assetCode: 'AST-SAF-00089',
    assetName: 'Fire Extinguisher CO2 5kg',
    serialNumber: 'FE-CO2-05',
    category: 'Safety Equipment',
    currentLocation: 'KM Labobar - Deck 3',
    destinationLocation: 'KM Labobar - Engine Room',
    currentDepartment: 'Safety & Security',
    destinationDepartment: 'Marine Engineering',
    currentPic: 'Safety Officer',
    destinationPic: 'Chief Engineer',
    movementType: 'Stock Opname Adjustment',
    movementDate: '2026-05-02',
    reason: 'Adjusting system location based on physical stock opname findings.',
    relatedModule: 'Stock Opname',
    referenceNumber: 'SO-2026-0122',
    status: 'Approved',
    requester: 'Asset Auditor',
    createdAt: '2026-05-01T15:00:00Z',
    updatedAt: '2026-05-02T10:00:00Z'
  },
  {
    id: 'req-013',
    requestNo: 'MOV-2026-0013',
    assetCode: 'AST-COM-00034',
    assetName: 'Satellite Phone',
    serialNumber: 'SAT-PH-34',
    category: 'Communication',
    currentLocation: 'KM Awu - Bridge',
    destinationLocation: 'Central Warehouse Jakarta',
    currentDepartment: 'Bridge Operations',
    destinationDepartment: 'IT Operations',
    currentPic: 'Captain',
    destinationPic: 'IT Staff',
    movementType: 'Maintenance Transfer',
    movementDate: '2026-05-07',
    reason: 'Signal issues, returning to HQ for inspection.',
    status: 'Rejected',
    requester: 'Captain',
    createdAt: '2026-05-03T11:00:00Z',
    updatedAt: '2026-05-03T12:30:00Z'
  },
  {
    id: 'req-014',
    requestNo: 'MOV-2026-0014',
    assetCode: 'AST-KIT-00055',
    assetName: 'Industrial Oven',
    serialNumber: 'OVEN-IND-55',
    category: 'Kitchen Equipment',
    currentLocation: 'KM Kelud - Galley',
    destinationLocation: 'Disposal Holding Area',
    currentDepartment: 'Catering',
    destinationDepartment: 'Asset Management',
    currentPic: 'Chief Cook',
    destinationPic: 'Tim Penghapusan',
    movementType: 'Disposal Preparation',
    movementDate: '2026-05-05',
    reason: 'Heater coils broken permanently.',
    status: 'Under Review',
    requester: 'Chief Cook',
    createdAt: '2026-05-03T08:45:00Z',
    updatedAt: '2026-05-03T09:00:00Z'
  },
  {
    id: 'req-015',
    requestNo: 'MOV-2026-0015',
    assetCode: 'AST-TOOL-00091',
    assetName: 'Hydraulic Press Tool',
    serialNumber: 'HYD-PR-91',
    category: 'Tools',
    currentLocation: 'Maintenance Workshop Jakarta',
    destinationLocation: 'Surabaya Branch Warehouse',
    currentDepartment: 'Maintenance Dept',
    destinationDepartment: 'Logistic',
    currentPic: 'Kepala Bengkel',
    destinationPic: 'Admin Surabaya',
    movementType: 'Inter-Ship Transfer',
    movementDate: '2026-04-10',
    reason: 'Temporary loan to Surabaya branch for special project.',
    status: 'Completed',
    requester: 'Kepala Bengkel',
    createdAt: '2026-04-05T10:10:00Z',
    updatedAt: '2026-04-15T14:20:00Z'
  }
];

export const summaryStats = {
  total: 128,
  draft: 12,
  pendingApproval: 18,
  inTransit: 7,
  completedThisMonth: 34
};
