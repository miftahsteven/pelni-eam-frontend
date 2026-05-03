export interface DummyAsset {
  assetId: string;
  assetName: string;
  systemLocation: string;
  actualLocation: string;
  systemCondition: string;
  actualCondition: string;
  foundStatus: 'Found' | 'Not Found' | 'Pending';
  varianceType: 'None' | 'Missing' | 'Location' | 'Condition' | 'Serial';
  notes: string;
}

export interface DummyStockOpname {
  id: string;
  period: string;
  location: string;
  category: string;
  totalAsset: number;
  checked: number;
  variance: number;
  status: string;
  officer: string;
  supervisor: string;
}

export const stockOpnameDocuments: DummyStockOpname[] = [
  {
    id: 'SO-2026-0001',
    period: 'May 2026',
    location: 'Kapal KM Kelud',
    category: 'Navigation Equipment',
    totalAsset: 42,
    checked: 42,
    variance: 3,
    status: 'In Progress',
    officer: 'Petugas Aset 01',
    supervisor: 'Supervisor Teknik',
  },
  {
    id: 'SO-2026-0002',
    period: 'May 2026',
    location: 'Kapal KM Labobar',
    category: 'Mechanical',
    totalAsset: 120,
    checked: 45,
    variance: 0,
    status: 'Assigned',
    officer: 'Budi Santoso',
    supervisor: 'Manager Fleet',
  },
  {
    id: 'SO-2026-0003',
    period: 'April 2026',
    location: 'Gudang Pusat Tj. Priok',
    category: 'All Categories',
    totalAsset: 550,
    checked: 550,
    variance: 12,
    status: 'Review',
    officer: 'Admin Gudang',
    supervisor: 'Manager Logistik',
  },
  {
    id: 'SO-2026-0004',
    period: 'March 2026',
    location: 'Kapal KM Dobonsolo',
    category: 'Electrical',
    totalAsset: 85,
    checked: 85,
    variance: 1,
    status: 'Approved',
    officer: 'Petugas Aset 02',
    supervisor: 'Supervisor Teknik',
  },
  {
    id: 'SO-2026-0005',
    period: 'March 2026',
    location: 'Kantor Pusat',
    category: 'IT Equipment',
    totalAsset: 320,
    checked: 320,
    variance: 5,
    status: 'Closed',
    officer: 'IT Support',
    supervisor: 'IT Manager',
  },
  {
    id: 'SO-2026-0006',
    period: 'June 2026',
    location: 'Kapal KM Sinabung',
    category: 'Safety Equipment',
    totalAsset: 200,
    checked: 0,
    variance: 0,
    status: 'Draft',
    officer: '-',
    supervisor: 'Supervisor Safety',
  },
  {
    id: 'SO-2026-0007',
    period: 'May 2026',
    location: 'Cabang Surabaya',
    category: 'Office Furniture',
    totalAsset: 150,
    checked: 150,
    variance: 8,
    status: 'Revision Required',
    officer: 'Admin Cabang',
    supervisor: 'Kepala Cabang',
  },
  {
    id: 'SO-2026-0008',
    period: 'April 2026',
    location: 'Kapal KM Gunung Dempo',
    category: 'Catering Equipment',
    totalAsset: 300,
    checked: 300,
    variance: 25,
    status: 'Closed',
    officer: 'Petugas Catering',
    supervisor: 'Hotel Manager',
  }
];

export const stockOpnameAssets: DummyAsset[] = [
  {
    assetId: 'AST-PELNI-0001',
    assetName: 'Radar Navigation Unit',
    systemLocation: 'Bridge Deck',
    actualLocation: 'Bridge Deck',
    systemCondition: 'Good',
    actualCondition: 'Good',
    foundStatus: 'Found',
    varianceType: 'None',
    notes: 'Asset found and condition matched',
  },
  {
    assetId: 'AST-PELNI-0002',
    assetName: 'Main Engine Pump A',
    systemLocation: 'Engine Room',
    actualLocation: 'Engine Room',
    systemCondition: 'Good',
    actualCondition: 'Warning',
    foundStatus: 'Found',
    varianceType: 'Condition',
    notes: 'Seal is slightly worn out, needs monitoring',
  },
  {
    assetId: 'AST-PELNI-0003',
    assetName: 'Lifeboat #4',
    systemLocation: 'Port Side Deck',
    actualLocation: 'Starboard Side Deck',
    systemCondition: 'Good',
    actualCondition: 'Good',
    foundStatus: 'Found',
    varianceType: 'Location',
    notes: 'Found on opposite side',
  },
  {
    assetId: 'AST-PELNI-0004',
    assetName: 'Portable Generator X',
    systemLocation: 'Storage Room B',
    actualLocation: '',
    systemCondition: 'Good',
    actualCondition: '',
    foundStatus: 'Not Found',
    varianceType: 'Missing',
    notes: 'Not found during inspection',
  },
  {
    assetId: 'AST-PELNI-0005',
    assetName: 'Communication Radio VHF',
    systemLocation: 'Bridge Deck',
    actualLocation: 'Bridge Deck',
    systemCondition: 'Need Replacement',
    actualCondition: 'Need Replacement',
    foundStatus: 'Found',
    varianceType: 'None',
    notes: 'Still broken as recorded',
  },
  {
    assetId: 'AST-PELNI-0006',
    assetName: 'Fire Extinguisher FE-01',
    systemLocation: 'Corridor Deck 5',
    actualLocation: 'Corridor Deck 5',
    systemCondition: 'Good',
    actualCondition: 'Good',
    foundStatus: 'Found',
    varianceType: 'None',
    notes: 'Expired next month, marked for maintenance',
  },
];

export const varianceSummary = {
  total: 6,
  missing: 2,
  location: 3,
  condition: 1,
};

export const officers = [
  'Petugas Aset 01',
  'Petugas Aset 02',
  'Budi Santoso',
  'Admin Gudang',
  'IT Support'
];

export const supervisors = [
  'Supervisor Teknik',
  'Manager Fleet',
  'Manager Logistik',
  'IT Manager',
  'Kepala Cabang'
];
