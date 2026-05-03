# PRD UI/UX – Modul 2.5.1 Maintenance / Pemeliharaan

## 1. Module Information

- **Module Name:** Maintenance / Pemeliharaan
- **Parent Module:** 2.5 Pemeliharaan
- **Submodule Code:** 2.5.1
- **Application Type:** Enterprise Asset Management (EAM)
- **Development Phase:** Tahap 1 – UI Frontend Demo dengan Dummy Data
- **Design Reference:** SAP Business One
- **Target Implementation:** Google Antigravity
- **Recommended Stack:**
  - Frontend: Next.js
  - Styling: Tailwind CSS
  - UI Style: Clean enterprise dashboard, grid-based, SAP B1-like layout

---

## 2. Objective

Submodul Maintenance / Pemeliharaan digunakan untuk mengelola seluruh aktivitas pemeliharaan aset, baik preventive maintenance maupun corrective maintenance.

Tujuan utama submodul ini adalah:

1. Menampilkan daftar Work Order Maintenance.
2. Membuat dan mengelola Work Order pemeliharaan aset.
3. Mengatur assignment teknisi.
4. Melakukan monitoring status pekerjaan maintenance.
5. Menyimpan histori maintenance aset.
6. Menyediakan tampilan UI yang konsisten dengan modul EAM lainnya.

---

## 3. Business Context

Submodul ini merupakan bagian dari parent module **2.5 Pemeliharaan** yang terdiri dari:

1. **2.5.1 Maintenance / Pemeliharaan**
2. **2.5.2 Stock Opname**
3. **2.5.3 Asset Tracking**

Submodul Maintenance berhubungan langsung dengan data aset yang sebelumnya sudah diregistrasikan melalui modul **2.4.3 Asset Registration**.

Data maintenance juga akan menjadi dasar untuk:

- Riwayat kondisi aset
- Evaluasi downtime
- Perencanaan penggantian aset
- Monitoring biaya pemeliharaan
- Audit operasional aset

---

## 4. Foldering Requirement

Semua submodul di bawah modul Pemeliharaan wajib berada dalam folder parent `pemeliharaan`.

Struktur folder yang direkomendasikan:

```txt
/modules
  /pemeliharaan
    /maintenance
      /components
      /data
      /services
      page.tsx
      maintenance.prd.md
    /stock-opname
    /asset-tracking
```

Untuk routing Next.js App Router, struktur yang disarankan:

```txt
/app
  /pemeliharaan
    /maintenance
      page.tsx
    /stock-opname
      page.tsx
    /asset-tracking
      page.tsx
```

---

## 5. Navigation Requirement

Submodul ini harus muncul sebagai menu di parent module **Pemeliharaan**.

### Sidebar Menu

```txt
Pemeliharaan
├── Maintenance
├── Stock Opname
└── Asset Tracking
```

### Route

```txt
/pemeliharaan/maintenance
```

### Menu Behavior

- Parent menu **Pemeliharaan** dapat di-expand/collapse.
- Submenu **Maintenance** aktif saat user berada di route `/pemeliharaan/maintenance`.
- Tampilan sidebar mengikuti gaya SAP Business One:
  - Compact
  - Clean
  - Left navigation
  - Icon sederhana
  - Active state jelas

---

## 6. User Roles

### 6.1 Admin

Hak akses:

- Melihat seluruh data maintenance
- Membuat Work Order
- Mengubah Work Order
- Menghapus dummy data pada tahap demo
- Melihat dashboard maintenance

### 6.2 Supervisor Maintenance

Hak akses:

- Membuat Work Order
- Assign teknisi
- Approve hasil pekerjaan
- Close Work Order

### 6.3 Technician

Hak akses:

- Melihat daftar pekerjaan yang ditugaskan
- Mengubah status pekerjaan
- Mengisi checklist
- Mengisi hasil pekerjaan
- Upload dokumentasi pekerjaan

---

## 7. Business Flow Analysis

### 7.1 Preventive Maintenance Flow

```txt
Asset Registered
      ↓
Maintenance Schedule Created
      ↓
System/User Creates Work Order
      ↓
Supervisor Assigns Technician
      ↓
Technician Executes Maintenance
      ↓
Technician Fills Checklist & Result
      ↓
Supervisor Reviews Result
      ↓
Work Order Completed
      ↓
Asset Maintenance History Updated
```

### 7.2 Corrective Maintenance Flow

```txt
Asset Issue Reported
      ↓
Corrective Work Order Created
      ↓
Priority Assigned
      ↓
Technician Assigned
      ↓
Repair Activity Executed
      ↓
Sparepart Usage Recorded
      ↓
Result Submitted
      ↓
Supervisor Validation
      ↓
Work Order Closed
      ↓
Asset Condition Updated
```

---

## 8. Input Process Output Analysis

### 8.1 Input

Data input yang dibutuhkan:

| Input | Description |
|---|---|
| Asset Data | Data aset dari modul Asset Registration |
| Work Order Number | Nomor WO, auto generated |
| Maintenance Type | Preventive atau Corrective |
| Schedule Date | Tanggal rencana pekerjaan |
| Priority | Low, Medium, High, Critical |
| Technician | Petugas/teknisi yang ditugaskan |
| Checklist | Daftar pekerjaan maintenance |
| Sparepart Usage | Sparepart yang digunakan |
| Work Notes | Catatan pekerjaan |
| Photo Evidence | Dokumentasi hasil pekerjaan |
| Asset Condition | Kondisi aset setelah maintenance |

---

### 8.2 Process

Proses utama dalam submodul:

1. User membuka menu **Pemeliharaan > Maintenance**.
2. Sistem menampilkan dashboard ringkas maintenance.
3. User melihat daftar Work Order.
4. User membuat Work Order baru.
5. User memilih asset yang akan dilakukan pemeliharaan.
6. User menentukan jenis maintenance.
7. Supervisor melakukan assignment teknisi.
8. Teknisi mengisi progress pekerjaan.
9. Teknisi mengisi checklist dan hasil pekerjaan.
10. Supervisor melakukan validasi.
11. Sistem mengubah status Work Order.
12. Sistem menyimpan histori maintenance aset.

---

### 8.3 Output

Output yang dihasilkan:

| Output | Description |
|---|---|
| Work Order List | Daftar WO maintenance |
| Work Order Detail | Detail pekerjaan maintenance |
| Maintenance History | Riwayat pemeliharaan per aset |
| Updated Asset Condition | Status kondisi aset terbaru |
| Maintenance Report | Laporan pemeliharaan |
| Downtime Summary | Ringkasan downtime aset |
| Sparepart Usage Summary | Ringkasan penggunaan sparepart |
| Technician Performance | Data pekerjaan per teknisi |

---

## 9. Work Order Status Lifecycle

Status Work Order:

```txt
Open → Assigned → In Progress → Completed → Closed
```

### Status Description

| Status | Description |
|---|---|
| Open | Work Order baru dibuat |
| Assigned | Teknisi sudah ditugaskan |
| In Progress | Pekerjaan sedang berjalan |
| Completed | Teknisi sudah menyelesaikan pekerjaan |
| Closed | Supervisor sudah melakukan validasi akhir |

---

## 10. UI/UX Design Reference

Desain harus mengacu pada gaya SAP Business One.

### 10.1 Visual Style

- Clean enterprise layout
- Dominan warna putih, abu-abu muda, biru enterprise
- Sidebar kiri
- Header atas sederhana
- Tabel padat dan informatif
- Form 2 kolom
- Banyak menggunakan panel/card ringan
- Font modern dan mudah dibaca

### 10.2 SAP B1 Style Characteristics

- Dense data grid
- Toolbar action di atas tabel
- Filter panel sederhana
- Tab detail dalam form
- Status badge kecil
- Layout tidak terlalu dekoratif
- Fokus pada kecepatan kerja user operasional

---

## 11. Main UI Screens

## 11.1 Screen 1 – Maintenance Dashboard

### Purpose

Memberikan ringkasan kondisi aktivitas maintenance.

### Layout

```txt
--------------------------------------------------
Header: Maintenance Dashboard
--------------------------------------------------
Summary Cards
[Total WO] [Open] [In Progress] [Completed] [Critical]
--------------------------------------------------
Left: Maintenance Calendar
Right: Recent Work Orders
--------------------------------------------------
Bottom: Maintenance Trend / Activity Log
--------------------------------------------------
```

### Components

1. Summary Card: Total Work Order
2. Summary Card: Open Work Order
3. Summary Card: In Progress
4. Summary Card: Completed
5. Summary Card: Critical Priority
6. Maintenance Calendar
7. Recent Work Order Table
8. Activity Log

### Dummy Data Example

```ts
const maintenanceSummary = {
  totalWorkOrders: 42,
  open: 8,
  assigned: 10,
  inProgress: 12,
  completed: 9,
  critical: 3,
};
```

---

## 11.2 Screen 2 – Work Order List

### Purpose

Menampilkan daftar Work Order Maintenance.

### Header

Title:

```txt
Work Order Maintenance
```

Primary Action:

```txt
+ Create Work Order
```

### Filter Section

Filter yang tersedia:

- Search by WO Number / Asset Name
- Asset Category
- Maintenance Type
- Status
- Priority
- Technician
- Date Range

### Table Columns

| Column | Description |
|---|---|
| WO Number | Nomor Work Order |
| Asset Code | Kode aset |
| Asset Name | Nama aset |
| Maintenance Type | Preventive / Corrective |
| Priority | Low / Medium / High / Critical |
| Technician | Nama teknisi |
| Schedule Date | Tanggal pekerjaan |
| Status | Status WO |
| Action | View / Edit |

### Table Behavior

- Pagination
- Sorting by date/status/priority
- Search instant
- Row click opens Work Order Detail
- Badge warna untuk status

---

## 11.3 Screen 3 – Create Work Order

### Purpose

Form untuk membuat Work Order baru.

### Layout Style

SAP B1-like form:

```txt
--------------------------------------------------
Create Work Order
--------------------------------------------------
General Information
[WO Number]        [Maintenance Type]
[Asset]            [Priority]
[Schedule Date]    [Technician]
[Location]         [Estimated Duration]
--------------------------------------------------
Description
[ Textarea ]
--------------------------------------------------
Checklist Template
[ ] Inspection
[ ] Cleaning
[ ] Lubrication
[ ] Calibration
--------------------------------------------------
Action Button
[Cancel] [Save Draft] [Submit Work Order]
--------------------------------------------------
```

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| WO Number | Text | Yes | Auto generated |
| Asset | Dropdown | Yes | From dummy asset data |
| Maintenance Type | Select | Yes | Preventive / Corrective |
| Priority | Select | Yes | Low / Medium / High / Critical |
| Schedule Date | Date picker | Yes | Rencana pekerjaan |
| Technician | Multi-select | Yes | Bisa lebih dari satu teknisi |
| Location | Text | Auto | Dari asset location |
| Estimated Duration | Number | No | Dalam jam |
| Description | Textarea | Yes | Deskripsi pekerjaan |
| Checklist Template | Checkbox | No | Template checklist |

---

## 11.4 Screen 4 – Work Order Detail

### Purpose

Menampilkan detail Work Order dan progress maintenance.

### Layout

Gunakan detail page dengan tab:

```txt
Work Order Detail: WO-2026-0001
Status: In Progress

Tabs:
[General Info] [Checklist] [Sparepart Usage] [Work Log] [History]
```

---

### Tab 1 – General Info

Fields:

- WO Number
- Asset Code
- Asset Name
- Asset Category
- Location
- Maintenance Type
- Priority
- Schedule Date
- Technician
- Current Status
- Created By
- Created Date

---

### Tab 2 – Checklist

Checklist example:

| Checklist Item | Status | Notes |
|---|---|---|
| Visual inspection | Checked / Unchecked | Text |
| Cleaning component | Checked / Unchecked | Text |
| Lubrication | Checked / Unchecked | Text |
| Calibration | Checked / Unchecked | Text |
| Functional test | Checked / Unchecked | Text |

---

### Tab 3 – Sparepart Usage

Columns:

| Column | Description |
|---|---|
| Item Code | Kode sparepart |
| Item Name | Nama sparepart |
| Quantity | Jumlah |
| Unit | Satuan |
| Notes | Catatan |

Actions:

- Add Row
- Remove Row
- Edit Quantity

---

### Tab 4 – Work Log

Fields:

- Work Notes
- Start Time
- End Time
- Actual Duration
- Upload Photo Evidence
- Technician Notes
- Asset Condition After Maintenance

Asset condition options:

```txt
Good
Warning
Critical
Need Replacement
```

---

### Tab 5 – History

Menampilkan timeline perubahan status.

Example:

```txt
2026-05-01 09:00 - WO Created by Supervisor
2026-05-01 10:00 - Technician Assigned
2026-05-02 08:30 - Work Started
2026-05-02 11:45 - Checklist Completed
2026-05-02 13:00 - WO Completed
```

---

## 11.5 Screen 5 – Maintenance Calendar

### Purpose

Menampilkan jadwal maintenance dalam bentuk kalender.

### Features

- Monthly view
- Weekly view optional
- Maintenance item marker
- Click event to open Work Order Detail
- Filter by technician/status/type

### Calendar Item Example

```txt
WO-2026-0001 - Preventive Maintenance - KM Kelud Engine Pump
```

---

## 12. Dummy Data Requirement

Gunakan dummy data agar UI demo terlihat hidup.

### 12.1 Dummy Asset Data

```ts
const assets = [
  {
    id: 'AST-001',
    code: 'AST-PELNI-001',
    name: 'Main Engine Pump KM Kelud',
    category: 'Mechanical',
    location: 'KM Kelud - Engine Room',
    condition: 'Good',
  },
  {
    id: 'AST-002',
    code: 'AST-PELNI-002',
    name: 'Generator Set KM Dobonsolo',
    category: 'Electrical',
    location: 'KM Dobonsolo - Power Room',
    condition: 'Warning',
  },
  {
    id: 'AST-003',
    code: 'AST-PELNI-003',
    name: 'Navigation Radar KM Labobar',
    category: 'Navigation',
    location: 'KM Labobar - Bridge Deck',
    condition: 'Critical',
  },
];
```

### 12.2 Dummy Work Order Data

```ts
const workOrders = [
  {
    id: 'WO-2026-0001',
    assetCode: 'AST-PELNI-001',
    assetName: 'Main Engine Pump KM Kelud',
    type: 'Preventive',
    priority: 'High',
    technician: 'Ahmad Fauzi',
    scheduleDate: '2026-05-05',
    status: 'In Progress',
  },
  {
    id: 'WO-2026-0002',
    assetCode: 'AST-PELNI-002',
    assetName: 'Generator Set KM Dobonsolo',
    type: 'Corrective',
    priority: 'Critical',
    technician: 'Budi Santoso',
    scheduleDate: '2026-05-06',
    status: 'Open',
  },
  {
    id: 'WO-2026-0003',
    assetCode: 'AST-PELNI-003',
    assetName: 'Navigation Radar KM Labobar',
    type: 'Preventive',
    priority: 'Medium',
    technician: 'Rizky Pratama',
    scheduleDate: '2026-05-07',
    status: 'Assigned',
  },
];
```

---

## 13. UI Components to Build

### Main Components

```txt
MaintenanceDashboard
WorkOrderSummaryCards
WorkOrderTable
WorkOrderFilter
CreateWorkOrderForm
WorkOrderDetailTabs
MaintenanceChecklist
SparepartUsageTable
WorkLogForm
MaintenanceCalendar
StatusBadge
PriorityBadge
```

### Shared Components

```txt
PageHeader
ModuleSidebar
DataTable
FilterBar
SAPPanel
SAPToolbar
FormSection
ActionButton
```

---

## 14. Styling Guidelines

### 14.1 Layout

- Use sidebar layout.
- Main content area menggunakan max width penuh.
- Gunakan spacing yang rapi dan konsisten.
- Gunakan card/panel tipis ala SAP.

### 14.2 Colors

Recommended colors:

```txt
Background: #F4F6F8
Panel: #FFFFFF
Border: #D9DEE3
Primary: #0F6CBD
Text Primary: #1F2937
Text Secondary: #6B7280
```

### 14.3 Status Colors

```txt
Open: Gray
Assigned: Indigo
In Progress: Blue
Completed: Green
Closed: Dark Gray
Critical: Red
High: Orange
Medium: Yellow
Low: Green
```

### 14.4 Table Style

- Header background abu-abu muda
- Border tipis
- Row hover
- Compact padding
- Font size kecil-menengah
- Action icon simple

---

## 15. Interaction Requirements

### 15.1 Work Order List

- User can search Work Order.
- User can filter by status, type, technician, date.
- User can click row to view detail.
- User can click Create Work Order.

### 15.2 Create Work Order

- WO Number auto generated.
- Asset dropdown updates location automatically.
- Submit button creates dummy Work Order in UI state.
- Validation for required fields.

### 15.3 Detail Page

- User can change status sequentially.
- User can update checklist.
- User can add sparepart usage row.
- User can input work log.
- User can view status history.

---

## 16. Validation Rules

| Field | Rule |
|---|---|
| Asset | Required |
| Maintenance Type | Required |
| Priority | Required |
| Schedule Date | Required |
| Technician | Required |
| Description | Required |
| Checklist | Optional |
| Sparepart Usage | Optional |
| Work Notes | Required when completing WO |
| Asset Condition | Required when completing WO |

---

## 17. Empty State

Jika belum ada Work Order:

```txt
No Work Orders Found
Create your first maintenance work order to start tracking asset maintenance activity.
[+ Create Work Order]
```

---

## 18. Error State

Contoh error state:

```txt
Failed to load maintenance data.
Please refresh or try again later.
```

Untuk tahap UI demo, error dapat disimulasikan menggunakan static component.

---

## 19. Future API Contract Placeholder

API ini belum perlu diimplementasikan pada tahap UI demo, tetapi struktur UI harus siap untuk integrasi tahap berikutnya.

```txt
GET    /api/maintenance/work-orders
GET    /api/maintenance/work-orders/:id
POST   /api/maintenance/work-orders
PUT    /api/maintenance/work-orders/:id
PATCH  /api/maintenance/work-orders/:id/status
GET    /api/assets
GET    /api/technicians
POST   /api/maintenance/work-orders/:id/checklist
POST   /api/maintenance/work-orders/:id/spareparts
POST   /api/maintenance/work-orders/:id/work-log
```

---

## 20. Suggested Page Structure

```txt
/app/pemeliharaan/maintenance/page.tsx
/app/pemeliharaan/maintenance/create/page.tsx
/app/pemeliharaan/maintenance/[id]/page.tsx
```

Alternative for simple UI demo:

```txt
/app/pemeliharaan/maintenance/page.tsx
```

All views can be handled in one page using local state/modal/tabs.

---

## 21. Acceptance Criteria

UI dianggap selesai jika memenuhi kriteria berikut:

1. Menu **Pemeliharaan** tersedia di sidebar.
2. Submenu **Maintenance** tersedia di bawah parent Pemeliharaan.
3. Route `/pemeliharaan/maintenance` dapat diakses.
4. Dashboard maintenance tampil dengan summary cards.
5. Work Order table tampil dengan dummy data.
6. Filter bar tersedia.
7. Button **Create Work Order** tersedia.
8. Form create Work Order tersedia.
9. Work Order Detail memiliki tab General Info, Checklist, Sparepart Usage, Work Log, History.
10. Status badge tampil dengan warna berbeda.
11. UI mengikuti style SAP Business One: clean, enterprise, grid-based.
12. Semua file submodul berada dalam folder `pemeliharaan/maintenance`.

---

## 22. Antigravity Implementation Instruction

Gunakan PRD ini untuk membangun UI demo submodul **2.5.1 Maintenance / Pemeliharaan**.

Instruksi implementasi:

1. Buat parent menu **Pemeliharaan** di sidebar.
2. Tambahkan submenu:
   - Maintenance
   - Stock Opname
   - Asset Tracking
3. Buat halaman `/pemeliharaan/maintenance`.
4. Gunakan dummy data untuk asset, technician, dan work order.
5. Buat tampilan mengikuti SAP Business One:
   - Sidebar kiri
   - Header atas
   - Table grid
   - Filter panel
   - Form dua kolom
   - Tab detail
6. Fokus hanya pada UI/UX demo, belum perlu backend.
7. Pastikan struktur folder submodul berada di bawah folder `pemeliharaan`.

---

## 23. Notes for Next Module

Submodul berikutnya adalah:

```txt
2.5.2 Stock Opname
```

Stock Opname akan menggunakan data asset yang sama dari Asset Registration dan akan berkaitan dengan validasi fisik aset.
