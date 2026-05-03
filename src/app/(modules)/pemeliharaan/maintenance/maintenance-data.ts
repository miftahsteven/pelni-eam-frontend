export interface DummyAsset {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  condition: string;
  vessel: string;
}

export type MaintenanceStatus = "Open" | "Assigned" | "In Progress" | "Completed" | "Closed" | "Cancelled";

export interface DummyWorkOrder {
  id: string;
  assetCode: string;
  assetName: string;
  type: string;
  priority: string;
  technician: string[];
  scheduleDate: string;
  status: MaintenanceStatus;
  location: string;
  vessel: string;
  description: string;
  estimatedDuration: number;
}

export const assets: DummyAsset[] = [
  {
    id: 'AST-001',
    code: 'AST-PELNI-001',
    name: 'Main Engine Pump',
    category: 'Mechanical',
    location: 'Engine Room',
    vessel: 'KM Kelud',
    condition: 'Good',
  },
  {
    id: 'AST-002',
    code: 'AST-PELNI-002',
    name: 'Generator Set',
    category: 'Electrical',
    location: 'Power Room',
    vessel: 'KM Dobonsolo',
    condition: 'Warning',
  },
  {
    id: 'AST-003',
    code: 'AST-PELNI-003',
    name: 'Navigation Radar',
    category: 'Navigation',
    location: 'Bridge Deck',
    vessel: 'KM Labobar',
    condition: 'Critical',
  },
  {
    id: 'AST-004',
    code: 'AST-PELNI-004',
    name: 'HVAC System',
    category: 'Mechanical',
    location: 'Passenger Deck 5',
    vessel: 'KM Kelud',
    condition: 'Need Replacement',
  }
];

export const workOrders: DummyWorkOrder[] = [
  {
    id: 'WO-2026-0001',
    assetCode: 'AST-PELNI-001',
    assetName: 'Main Engine Pump',
    type: 'Preventive',
    priority: 'High',
    technician: ['Ahmad Fauzi'],
    scheduleDate: '2026-05-05',
    status: 'In Progress',
    location: 'Engine Room',
    vessel: 'KM Kelud',
    description: 'Routine 6-month check and lubrication of the main engine pump.',
    estimatedDuration: 4
  },
  {
    id: 'WO-2026-0002',
    assetCode: 'AST-PELNI-002',
    assetName: 'Generator Set',
    type: 'Corrective',
    priority: 'Critical',
    technician: ['Budi Santoso', 'Dimas Anggara'],
    scheduleDate: '2026-05-06',
    status: 'Open',
    location: 'Power Room',
    vessel: 'KM Dobonsolo',
    description: 'Abnormal vibration detected. Immediate inspection required.',
    estimatedDuration: 8
  },
  {
    id: 'WO-2026-0003',
    assetCode: 'AST-PELNI-003',
    assetName: 'Navigation Radar',
    type: 'Preventive',
    priority: 'Medium',
    technician: ['Rizky Pratama'],
    scheduleDate: '2026-05-07',
    status: 'Assigned',
    location: 'Bridge Deck',
    vessel: 'KM Labobar',
    description: 'Software update and calibration of the radar system.',
    estimatedDuration: 2
  },
  {
    id: 'WO-2026-0004',
    assetCode: 'AST-PELNI-001',
    assetName: 'Main Engine Pump',
    type: 'Corrective',
    priority: 'Low',
    technician: ['Ahmad Fauzi'],
    scheduleDate: '2026-05-01',
    status: 'Completed',
    location: 'Engine Room',
    vessel: 'KM Kelud',
    description: 'Replace worn out seals identified during last inspection.',
    estimatedDuration: 3
  },
  {
    id: 'WO-2026-0005',
    assetCode: 'AST-PELNI-004',
    assetName: 'HVAC System',
    type: 'Corrective',
    priority: 'High',
    technician: ['Siti Nurbaya'],
    scheduleDate: '2026-05-08',
    status: 'Closed',
    location: 'Passenger Deck 5',
    vessel: 'KM Kelud',
    description: 'AC not cooling in zone B. Compressor replacement done.',
    estimatedDuration: 12
  }
];

export const technicians = [
  'Ahmad Fauzi',
  'Budi Santoso',
  'Dimas Anggara',
  'Rizky Pratama',
  'Siti Nurbaya',
  'Joko Anwar'
];

export const spareParts = [
  { code: 'SP-001', name: 'Pump Seal Kit', unit: 'Set' },
  { code: 'SP-002', name: 'Lubricating Oil', unit: 'Liter' },
  { code: 'SP-003', name: 'Compressor Unit', unit: 'Pcs' },
  { code: 'SP-004', name: 'Filter Assembly', unit: 'Set' },
];

export const maintenanceSummary = {
  totalWorkOrders: 42,
  open: 8,
  assigned: 10,
  inProgress: 12,
  completed: 9,
  critical: 3,
};
