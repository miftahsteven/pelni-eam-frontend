export type AssetTrackingStatus =
  | 'Active'
  | 'In Use'
  | 'Under Maintenance'
  | 'Location Mismatch'
  | 'Missing'
  | 'Inactive';

export type AssetMovement = {
  id: string;
  movementDate: string;
  movementType: 'Check-in' | 'Check-out' | 'Transfer' | 'Relocation' | 'Inspection';
  fromLocation: string;
  toLocation: string;
  updatedBy: string;
  notes?: string;
};

export type AssetTrackingItem = {
  id: string;
  assetCode: string;
  assetName: string;
  category: string;
  serialNumber: string;
  registeredLocation: string;
  currentLocation: string;
  pic: string;
  trackingMethod: 'Manual' | 'QR Scan' | 'Barcode' | 'GPS Dummy';
  lastUpdate: string;
  lastUpdatedBy: string;
  status: AssetTrackingStatus;
  movementHistory: AssetMovement[];
};

export const assetTrackingData: AssetTrackingItem[] = [
  {
    id: 'TRK-001',
    assetCode: 'AST-PELNI-0001',
    assetName: 'Generator Kapal Utama',
    category: 'Mesin Utama',
    serialNumber: 'GEN-2023-XYZ123',
    registeredLocation: 'Engine Room KM Kelud',
    currentLocation: 'Engine Room KM Kelud',
    pic: 'Budi Santoso',
    trackingMethod: 'QR Scan',
    lastUpdate: '2026-05-01T08:30:00Z',
    lastUpdatedBy: 'Petugas Aset 01',
    status: 'Active',
    movementHistory: [
      {
        id: 'MOV-001',
        movementDate: '2026-05-01T08:30:00Z',
        movementType: 'Inspection',
        fromLocation: 'Engine Room KM Kelud',
        toLocation: 'Engine Room KM Kelud',
        updatedBy: 'Petugas Aset 01',
        notes: 'Monthly routine check.'
      }
    ]
  },
  {
    id: 'TRK-002',
    assetCode: 'AST-PELNI-0002',
    assetName: 'Pompa Air Cadangan',
    category: 'Peralatan Tambahan',
    serialNumber: 'PMP-2021-ABC987',
    registeredLocation: 'Gudang Utama Surabaya',
    currentLocation: 'Engine Room KM Labobar',
    pic: 'Dimas Anggara',
    trackingMethod: 'Manual',
    lastUpdate: '2026-05-02T14:15:00Z',
    lastUpdatedBy: 'Supervisor Teknik',
    status: 'Location Mismatch',
    movementHistory: [
      {
        id: 'MOV-002',
        movementDate: '2026-05-02T14:15:00Z',
        movementType: 'Transfer',
        fromLocation: 'Gudang Utama Surabaya',
        toLocation: 'Engine Room KM Labobar',
        updatedBy: 'Supervisor Teknik',
        notes: 'Emergency transfer for temporary use.'
      }
    ]
  },
  {
    id: 'TRK-003',
    assetCode: 'AST-PELNI-0003',
    assetName: 'Laptop Operasional Lenovo Thinkpad',
    category: 'Perangkat IT',
    serialNumber: 'LTP-TP-2024-001',
    registeredLocation: 'Kantor Pusat - Lt. 3 IT Dept',
    currentLocation: 'Kantor Pusat - Lt. 3 IT Dept',
    pic: 'Ahmad Fauzi',
    trackingMethod: 'QR Scan',
    lastUpdate: '2026-05-03T09:00:00Z',
    lastUpdatedBy: 'Ahmad Fauzi',
    status: 'In Use',
    movementHistory: [
      {
        id: 'MOV-003',
        movementDate: '2026-05-03T09:00:00Z',
        movementType: 'Check-in',
        fromLocation: '-',
        toLocation: 'Kantor Pusat - Lt. 3 IT Dept',
        updatedBy: 'Ahmad Fauzi',
        notes: 'Checked in for daily use.'
      }
    ]
  },
  {
    id: 'TRK-004',
    assetCode: 'AST-PELNI-0004',
    assetName: 'Radio Komunikasi VHF',
    category: 'Perangkat Komunikasi',
    serialNumber: 'RAD-VHF-099',
    registeredLocation: 'Bridge Deck KM Dorolonda',
    currentLocation: 'Unknown',
    pic: 'Kapten Kapal',
    trackingMethod: 'Manual',
    lastUpdate: '2026-04-28T16:45:00Z',
    lastUpdatedBy: 'Petugas Aset 02',
    status: 'Missing',
    movementHistory: [
      {
        id: 'MOV-004',
        movementDate: '2026-04-28T16:45:00Z',
        movementType: 'Inspection',
        fromLocation: 'Bridge Deck KM Dorolonda',
        toLocation: 'Unknown',
        updatedBy: 'Petugas Aset 02',
        notes: 'Not found during weekly audit.'
      }
    ]
  },
  {
    id: 'TRK-005',
    assetCode: 'AST-PELNI-0005',
    assetName: 'Panel Listrik Sub-Station B',
    category: 'Perangkat Listrik',
    serialNumber: 'PNL-ELC-554',
    registeredLocation: 'Pelabuhan Makassar',
    currentLocation: 'Pelabuhan Makassar',
    pic: 'Tim Maintenance',
    trackingMethod: 'QR Scan',
    lastUpdate: '2026-05-02T10:20:00Z',
    lastUpdatedBy: 'Andry Siswanto',
    status: 'Under Maintenance',
    movementHistory: [
      {
        id: 'MOV-005',
        movementDate: '2026-05-02T10:20:00Z',
        movementType: 'Inspection',
        fromLocation: 'Pelabuhan Makassar',
        toLocation: 'Pelabuhan Makassar',
        updatedBy: 'Andry Siswanto',
        notes: 'Routine maintenance WO-2026-0035 initiated.'
      }
    ]
  },
  {
    id: 'TRK-006',
    assetCode: 'AST-PELNI-0006',
    assetName: 'Kursi Penumpang Ekonomi',
    category: 'Furniture',
    serialNumber: 'FNR-CHR-901',
    registeredLocation: 'Deck 4 KM Sinabung',
    currentLocation: 'Gudang Perbaikan Jakarta',
    pic: 'Tim Interior',
    trackingMethod: 'Barcode',
    lastUpdate: '2026-04-30T11:00:00Z',
    lastUpdatedBy: 'Admin Gudang',
    status: 'Inactive',
    movementHistory: [
      {
        id: 'MOV-006',
        movementDate: '2026-04-30T11:00:00Z',
        movementType: 'Relocation',
        fromLocation: 'Deck 4 KM Sinabung',
        toLocation: 'Gudang Perbaikan Jakarta',
        updatedBy: 'Admin Gudang',
        notes: 'Sent for reupholstering.'
      }
    ]
  },
  {
    id: 'TRK-007',
    assetCode: 'AST-PELNI-0007',
    assetName: 'Mesin Kopi Espresso',
    category: 'Peralatan Dapur',
    serialNumber: 'KTC-ESP-112',
    registeredLocation: 'Pantry VIP KM Kelud',
    currentLocation: 'Kafetaria Crew KM Kelud',
    pic: 'Chef Utama',
    trackingMethod: 'Manual',
    lastUpdate: '2026-05-03T07:15:00Z',
    lastUpdatedBy: 'Staf Catering',
    status: 'Location Mismatch',
    movementHistory: [
      {
        id: 'MOV-007',
        movementDate: '2026-05-03T07:15:00Z',
        movementType: 'Relocation',
        fromLocation: 'Pantry VIP KM Kelud',
        toLocation: 'Kafetaria Crew KM Kelud',
        updatedBy: 'Staf Catering',
        notes: 'Moved temporarily due to VIP pantry renovation.'
      }
    ]
  },
  {
    id: 'TRK-008',
    assetCode: 'AST-PELNI-0008',
    assetName: 'Lifeboat #2',
    category: 'Peralatan Keselamatan',
    serialNumber: 'SAF-LB-002',
    registeredLocation: 'Port Side Deck KM Dobonsolo',
    currentLocation: 'Port Side Deck KM Dobonsolo',
    pic: 'First Officer',
    trackingMethod: 'QR Scan',
    lastUpdate: '2026-05-01T06:00:00Z',
    lastUpdatedBy: 'Safety Officer',
    status: 'Active',
    movementHistory: [
      {
        id: 'MOV-008',
        movementDate: '2026-05-01T06:00:00Z',
        movementType: 'Inspection',
        fromLocation: 'Port Side Deck KM Dobonsolo',
        toLocation: 'Port Side Deck KM Dobonsolo',
        updatedBy: 'Safety Officer',
        notes: 'Monthly safety drill check. All clear.'
      }
    ]
  },
  {
    id: 'TRK-009',
    assetCode: 'AST-PELNI-0009',
    assetName: 'Proyektor Ruang Meeting',
    category: 'Perangkat IT',
    serialNumber: 'LTP-PRJ-334',
    registeredLocation: 'Ruang Rapat Utama Lt 4',
    currentLocation: 'Ruang Rapat Utama Lt 4',
    pic: 'Tim GA',
    trackingMethod: 'QR Scan',
    lastUpdate: '2026-04-29T13:30:00Z',
    lastUpdatedBy: 'Admin GA',
    status: 'Active',
    movementHistory: []
  },
  {
    id: 'TRK-010',
    assetCode: 'AST-PELNI-0010',
    assetName: 'Forklift 3 Ton',
    category: 'Alat Berat',
    serialNumber: 'HVY-FL-03',
    registeredLocation: 'Gudang Tj. Priok',
    currentLocation: 'Gudang Tj. Priok',
    pic: 'Operator Gudang',
    trackingMethod: 'GPS Dummy',
    lastUpdate: '2026-05-03T10:05:00Z',
    lastUpdatedBy: 'Sistem',
    status: 'In Use',
    movementHistory: [
      {
        id: 'MOV-010',
        movementDate: '2026-05-03T08:00:00Z',
        movementType: 'Check-out',
        fromLocation: 'Gudang Tj. Priok (Parkir)',
        toLocation: 'Gudang Tj. Priok (Loading Dock)',
        updatedBy: 'Operator Gudang',
        notes: 'Daily operations.'
      }
    ]
  },
  {
    id: 'TRK-011',
    assetCode: 'AST-PELNI-0011',
    assetName: 'Mesin Las Portable',
    category: 'Perkakas',
    serialNumber: 'TLS-WLD-01',
    registeredLocation: 'Workshop Teknik',
    currentLocation: 'Unknown',
    pic: 'Kepala Bengkel',
    trackingMethod: 'Manual',
    lastUpdate: '2026-04-25T09:00:00Z',
    lastUpdatedBy: 'Mandor',
    status: 'Missing',
    movementHistory: []
  },
  {
    id: 'TRK-012',
    assetCode: 'AST-PELNI-0012',
    assetName: 'Kompresor Udara A',
    category: 'Mesin Utama',
    serialNumber: 'MEC-CMP-A1',
    registeredLocation: 'Engine Room KM Ciremai',
    currentLocation: 'Engine Room KM Ciremai',
    pic: 'Chief Engineer',
    trackingMethod: 'QR Scan',
    lastUpdate: '2026-05-02T15:30:00Z',
    lastUpdatedBy: 'Mechanic',
    status: 'Under Maintenance',
    movementHistory: []
  }
];

export const trackingSummary = {
  totalAssets: 240,
  trackedAssets: 218,
  locationMismatch: assetTrackingData.filter(a => a.status === 'Location Mismatch').length,
  missingAssets: assetTrackingData.filter(a => a.status === 'Missing').length,
  underMaintenance: assetTrackingData.filter(a => a.status === 'Under Maintenance').length,
};
