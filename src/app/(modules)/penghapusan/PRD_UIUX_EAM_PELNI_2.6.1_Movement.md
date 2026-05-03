# PRD UI/UX EAM PELNI - Modul 2.6.1 Movement

**Project:** Enterprise Asset Management (EAM) PELNI  
**Module:** 2.6 Penghapusan  
**Submodule:** 2.6.1 Movement  
**Output:** UI/UX Frontend Demo dengan Dummy Data  
**Target Implementasi:** Google Antigravity  
**Frontend Stack:** Next.js, Tailwind CSS  
**Design Reference:** SAP Business One style  
**Backend Future Stack:** Node.js, Prisma, PostgreSQL, REST API, JWT  
**Document Version:** v1.0  

---

## 1. Ringkasan Submodule

Submodule **2.6.1 Movement** digunakan untuk mengelola proses perpindahan aset dari satu lokasi ke lokasi lain, dari satu kapal ke kapal lain, dari satu unit kerja ke unit kerja lain, atau dari lokasi aktif ke lokasi transit/disposal area.

Dalam konteks EAM PELNI, Movement tidak selalu berarti aset dihapus. Namun Movement menjadi proses penting sebelum aset masuk ke tahapan lebih lanjut seperti Replacement, Dismantle, atau Disposal.

Contoh movement:

- Aset dipindahkan dari Kapal A ke Kapal B.
- Aset dipindahkan dari lokasi operasional ke gudang pusat.
- Aset dipindahkan dari cabang ke holding area.
- Aset dipindahkan dari area aktif ke disposal warehouse.
- Aset dipindahkan karena hasil stock opname menunjukkan lokasi aktual berbeda dari lokasi sistem.

---

## 2. Tujuan Submodule

Tujuan utama submodule Movement adalah:

1. Membuat proses perpindahan aset lebih terkontrol.
2. Menjaga akurasi lokasi aset berdasarkan Asset Tracking.
3. Menyediakan riwayat movement yang lengkap untuk audit.
4. Menghubungkan proses movement dengan modul Maintenance, Stock Opname, Asset Tracking, Replacement, dan Disposal.
5. Memastikan setiap perpindahan aset memiliki dokumen permintaan dan approval.
6. Menyediakan UI demo yang clean, enterprise, dan konsisten dengan SAP Business One.

---

## 3. Keterkaitan dengan Modul Sebelumnya

Submodule Movement harus terlihat sebagai kelanjutan dari modul sebelumnya, bukan fitur yang berdiri sendiri.

### 3.1 Relasi dengan 2.4.3 Asset Registration

Movement mengambil data utama aset dari Asset Registration.

Data yang digunakan:

- Asset Code
- Asset Name
- Serial Number
- Asset Category
- Current Location
- Current Department
- Current PIC
- Current Status
- Acquisition Date
- Book Value

### 3.2 Relasi dengan 2.5.1 Maintenance

Movement dapat terjadi setelah maintenance.

Contoh:

- Aset rusak dipindahkan ke workshop.
- Aset selesai diperbaiki dipindahkan kembali ke lokasi operasional.
- Aset yang direkomendasikan untuk disposal dipindahkan ke holding area.

### 3.3 Relasi dengan 2.5.2 Stock Opname

Movement dapat dibuat untuk memperbaiki lokasi sistem berdasarkan hasil stock opname.

Contoh:

- Lokasi sistem: Gudang A.
- Lokasi aktual hasil opname: Kapal Dobonsolo.
- Setelah validasi, user membuat Movement Adjustment agar lokasi sistem diperbarui.

### 3.4 Relasi dengan 2.5.3 Asset Tracking

Asset Tracking menjadi sumber validasi lokasi terakhir aset.

Movement harus menampilkan:

- Last tracked location
- Last scanned date
- Last PIC
- Tracking confidence/status
- Movement history

### 3.5 Relasi dengan 2.6.2 Replacement

Sebelum replacement, aset lama dapat dipindahkan ke lokasi transit atau gudang.

Flow contoh:

```text
Active Asset
↓
Movement to Transit Warehouse
↓
Replacement Request
↓
New Asset Installed
↓
Old Asset Pending Disposal
```

### 3.6 Relasi dengan 2.6.3 Dismantle / Disposal

Sebelum disposal, aset dapat dipindahkan ke disposal area.

Flow contoh:

```text
Damaged Asset
↓
Movement to Disposal Area
↓
Disposal Request
↓
Dismantle / Scrap / Write-off
```

---

## 4. Analisis Flow Movement

### 4.1 Main Flow

```text
Start
↓
User membuka menu 2.6.1 Movement
↓
Sistem menampilkan daftar Movement Request
↓
User klik Create Movement Request
↓
User memilih Asset Code dari Asset Master
↓
Sistem menampilkan detail aset:
- asset name
- category
- serial number
- current location
- current PIC
- current status
- last tracking info
- related maintenance/opname finding jika ada
↓
User mengisi lokasi tujuan, PIC tujuan, movement date, dan alasan perpindahan
↓
User upload dokumen/foto pendukung jika diperlukan
↓
User menyimpan sebagai Draft atau Submit
↓
Jika Submit:
    sistem membuat Movement Request Number
    status menjadi Submitted
    request masuk approval queue
↓
Approver melakukan review
↓
Jika Approved:
    status menjadi Approved / In Transit
    sistem update lokasi aset setelah movement completed
    sistem membuat movement history
↓
Jika Rejected:
    status menjadi Rejected
    sistem menyimpan catatan penolakan
↓
Jika Completed:
    current location aset diperbarui
    current PIC diperbarui
    audit trail tersimpan
↓
End
```

---

## 5. Business Rules

1. Hanya aset dengan status tertentu yang boleh dibuatkan Movement Request.

   Status yang diperbolehkan:

   - Active
   - In Maintenance
   - Available
   - Moved
   - Pending Disposal
   - Waiting Replacement

2. Aset dengan status berikut tidak boleh dipindahkan:

   - Disposed
   - Written Off
   - Sold
   - Scrapped
   - Lost
   - Inactive

3. Current Location tidak boleh sama dengan Destination Location.

4. Movement Request wajib memiliki alasan perpindahan.

5. Movement Date tidak boleh lebih kecil dari tanggal registration asset.

6. Jika aset terkait hasil Stock Opname, tampilkan label **Opname Finding**.

7. Jika aset sedang dalam proses Replacement atau Disposal, tampilkan warning badge.

8. Jika movement sudah Approved, data utama tidak boleh diedit kecuali oleh role tertentu.

9. Movement yang sudah Completed akan mengupdate:

   - Current Location
   - Current Department
   - Current PIC
   - Asset Movement History
   - Asset Tracking Timeline

10. Semua proses submit, approve, reject, dan complete wajib tercatat dalam audit trail.

---

## 6. Analisis Input - Process - Output

### 6.1 Input

| Input | Deskripsi | Required | Source |
|---|---|---:|---|
| Movement Request No | Nomor dokumen movement | Auto | System |
| Asset Code | Kode aset yang akan dipindahkan | Yes | Asset Registration |
| Asset Name | Nama aset | Auto | Asset Registration |
| Serial Number | Nomor serial aset | Auto | Asset Registration |
| Asset Category | Kategori aset | Auto | Asset Registration |
| Current Location | Lokasi saat ini | Auto | Asset Tracking / Asset Master |
| Current Department | Unit saat ini | Auto | Asset Master |
| Current PIC | PIC saat ini | Auto | Asset Master |
| Destination Location | Lokasi tujuan | Yes | User Input / Master Location |
| Destination Department | Unit tujuan | Yes | User Input / Master Department |
| Destination PIC | PIC tujuan | Yes | User Input / Master Employee |
| Movement Date | Tanggal perpindahan | Yes | User Input |
| Movement Type | Jenis movement | Yes | User Input |
| Movement Reason | Alasan movement | Yes | User Input |
| Related Reference | Referensi Maintenance/Opname/Replacement/Disposal | Optional | Related Module |
| Supporting Document | Dokumen pendukung | Optional | Upload |
| Photo Evidence | Foto kondisi/lokasi aset | Optional | Upload |
| Requester | Pembuat request | Auto | Login Session |
| Approval Notes | Catatan approver | Optional | Approver Input |

### 6.2 Process

| Process | Deskripsi |
|---|---|
| Validate Asset | Memastikan asset code valid dan aset masih aktif dalam sistem |
| Validate Status | Memastikan status aset masih boleh dipindahkan |
| Validate Location | Memastikan lokasi asal dan tujuan berbeda |
| Load Asset Context | Menampilkan riwayat lokasi, maintenance, tracking, dan stock opname |
| Create Draft | Menyimpan movement sebagai draft |
| Submit Request | Mengirim movement request ke approval queue |
| Approval Review | Approver memeriksa detail, alasan, dan dokumen pendukung |
| Approve / Reject | Approver menyetujui atau menolak request |
| Mark In Transit | Jika disetujui, aset dapat masuk status In Transit |
| Complete Movement | Sistem memperbarui lokasi dan PIC aset |
| Save History | Sistem mencatat movement history dan audit trail |

### 6.3 Output

| Output | Deskripsi |
|---|---|
| Movement Request Number | Nomor dokumen movement |
| Movement Status | Draft, Submitted, Approved, Rejected, In Transit, Completed |
| Updated Asset Location | Lokasi aset terbaru setelah movement completed |
| Updated Asset PIC | PIC terbaru aset |
| Movement History | Riwayat perpindahan aset |
| Approval Log | Riwayat approval dan catatan approver |
| Audit Trail | Log aktivitas user dan sistem |
| Movement Detail Page | Halaman detail movement request |
| Printable Movement Document | Dokumen movement yang dapat dicetak untuk tahap berikutnya |

---

## 7. User Roles & Permission

| Role | Permission |
|---|---|
| Admin | Full access semua data movement |
| Asset Manager | Review, approve, reject, complete movement |
| Unit Requester | Create draft, submit movement request |
| PIC Asset | Melihat dan mengkonfirmasi movement aset yang menjadi tanggung jawabnya |
| Warehouse / Logistic | Update status In Transit dan Completed |
| Finance Viewer | Read-only untuk aset yang terkait disposal/replacement |
| Auditor | Read-only movement history dan audit trail |

---

## 8. Status Movement

Gunakan status badge yang konsisten dengan gaya SAP Business One.

| Status | Deskripsi | UI Badge |
|---|---|---|
| Draft | Request belum dikirim | Gray |
| Submitted | Request sudah dikirim | Blue |
| Under Review | Sedang direview approver | Yellow |
| Approved | Request disetujui | Green |
| Rejected | Request ditolak | Red |
| In Transit | Aset sedang dalam proses perpindahan | Purple |
| Completed | Movement selesai dan lokasi aset diperbarui | Green |
| Cancelled | Request dibatalkan | Dark Gray |

Catatan: warna dapat menggunakan Tailwind default, tetapi tetap gunakan tampilan professional dan tidak terlalu mencolok.

---

## 9. UI/UX Direction

### 9.1 General Style

Gunakan referensi visual **SAP Business One**:

- Layout clean dan enterprise.
- Dominan tabel data.
- Sidebar kiri untuk navigasi modul.
- Header atas berisi breadcrumb, search, user profile.
- Content area putih/abu muda.
- Form menggunakan layout dua kolom.
- Button simple dan formal.
- Status menggunakan badge kecil.
- Detail menggunakan tab seperti SAP.
- Tidak menggunakan desain terlalu playful.

### 9.2 Layout Utama

Struktur layout:

```text
Main App Shell
├── Left Sidebar
│   ├── Dashboard
│   ├── Planning
│   ├── Procurement
│   ├── Installation
│   ├── Maintenance
│   └── Penghapusan
│       ├── Movement
│       ├── Replacement
│       └── Dismantle / Disposal
│
├── Top Header
│   ├── Breadcrumb
│   ├── Global Search
│   ├── Notification
│   └── User Profile
│
└── Main Content
    ├── Page Title
    ├── Summary Cards
    ├── Filter Bar
    ├── Data Table
    └── Detail Drawer / Detail Page
```

---

## 10. Required Pages

### 10.1 Movement Dashboard / List Page

Route suggestion:

```text
/eam/disposal/movement
```

Page title:

```text
Movement Request
```

Content:

1. Summary cards
2. Filter bar
3. Movement request table
4. Action button: Create Movement

Summary cards:

| Card | Value Example |
|---|---:|
| Total Movement | 128 |
| Draft | 12 |
| Pending Approval | 18 |
| In Transit | 7 |
| Completed This Month | 34 |

Filter bar:

- Search by request no / asset code / asset name
- Status
- Movement Type
- Origin Location
- Destination Location
- Date Range
- Requester

Table columns:

| Column | Description |
|---|---|
| Request No | MOV-2026-0001 |
| Asset Code | AST-ENG-00032 |
| Asset Name | Main Engine Pump |
| Current Location | KM Dobonsolo - Engine Room |
| Destination Location | Central Warehouse Jakarta |
| Movement Type | Operational to Warehouse |
| Requester | User name |
| Movement Date | 2026-05-03 |
| Status | Badge |
| Action | View / Edit / Approve |

Required interaction:

- Click row opens detail page or right drawer.
- Click Create Movement opens create form.
- Filter updates table dummy data.
- Status badge visually clear.
- Action menu available per row.

---

### 10.2 Create Movement Request Page

Route suggestion:

```text
/eam/disposal/movement/create
```

Layout:

- Header document area.
- Asset information panel.
- Movement detail form.
- Related context panel.
- Attachment section.
- Footer action buttons.

Form sections:

#### A. Document Header

Fields:

- Movement Request No: Auto Draft
- Request Date: Auto today
- Requester: Auto from login dummy
- Department: Auto / selectable
- Status: Draft

#### B. Asset Selection

Fields:

- Asset Code dropdown/search
- Asset Name auto
- Serial Number auto
- Asset Category auto
- Current Status auto
- Current Location auto
- Current PIC auto

When asset selected, show asset context card:

- Last Tracking Location
- Last Tracking Date
- Last Maintenance Status
- Last Stock Opname Finding
- Replacement/Disposal warning if any

#### C. Movement Information

Fields:

- Movement Type
- Origin Location auto
- Destination Location
- Origin Department auto
- Destination Department
- Origin PIC auto
- Destination PIC
- Movement Date
- Expected Arrival Date
- Movement Reason
- Notes

Movement Type options:

- Operational Transfer
- Warehouse Transfer
- Inter-Ship Transfer
- Maintenance Transfer
- Stock Opname Adjustment
- Replacement Preparation
- Disposal Preparation

#### D. Related Reference

Fields:

- Related Module
- Reference Number
- Reference Notes

Related Module options:

- None
- Maintenance
- Stock Opname
- Asset Tracking
- Replacement
- Disposal

#### E. Attachment

Fields:

- Upload document
- Upload photo evidence
- Attachment notes

#### F. Action Buttons

- Save Draft
- Submit Request
- Cancel

---

### 10.3 Movement Detail Page

Route suggestion:

```text
/eam/disposal/movement/[id]
```

Detail page uses SAP-like document detail layout.

Header:

- Request No
- Status badge
- Request date
- Requester
- Action buttons

Tabs:

1. Overview
2. Asset Detail
3. Movement Detail
4. Approval
5. Attachments
6. History & Audit Trail

#### Tab 1 - Overview

Show:

- Movement summary
- Origin vs destination comparison
- Current approval status
- Quick timeline

#### Tab 2 - Asset Detail

Show asset details:

- Asset Code
- Asset Name
- Category
- Serial Number
- Current Status
- Book Value dummy
- Acquisition Date dummy
- Current Location
- Current PIC

#### Tab 3 - Movement Detail

Show movement details:

- Movement Type
- Origin Location
- Destination Location
- Origin Department
- Destination Department
- Origin PIC
- Destination PIC
- Movement Date
- Expected Arrival Date
- Reason
- Notes

#### Tab 4 - Approval

Show approval stepper:

```text
Requester Submitted
↓
Supervisor Review
↓
Asset Manager Approval
↓
Warehouse / Logistic Confirmation
↓
Completed
```

Approver table columns:

| Step | Approver | Role | Status | Date | Notes |
|---|---|---|---|---|---|

Buttons for approver:

- Approve
- Reject
- Request Revision

#### Tab 5 - Attachments

Show:

- File name
- File type
- Uploaded by
- Uploaded date
- Preview action

#### Tab 6 - History & Audit Trail

Show timeline:

- Draft created
- Request submitted
- Approved by supervisor
- Approved by asset manager
- Marked in transit
- Movement completed
- Asset location updated

---

### 10.4 Approval Queue Page

Route suggestion:

```text
/eam/disposal/movement/approval
```

Content:

- Table of movement requests waiting for approval.
- Filter by status, location, requester, date.
- Bulk selection optional for demo, but approval should be per document.

Table columns:

| Column | Description |
|---|---|
| Request No | Movement number |
| Asset Code | Asset identifier |
| Asset Name | Asset name |
| From | Origin location |
| To | Destination location |
| Requester | Request owner |
| Submitted Date | Date |
| Current Step | Supervisor / Asset Manager / Logistic |
| Status | Badge |
| Action | Review |

---

## 11. Dummy Data Requirement

Create dummy data directly in frontend.

### 11.1 Asset Dummy Data

Minimum 10 assets.

Example:

```ts
const assets = [
  {
    id: 'AST-ENG-00032',
    name: 'Main Engine Pump',
    serialNumber: 'MEP-PEL-2024-032',
    category: 'Engine Equipment',
    currentLocation: 'KM Dobonsolo - Engine Room',
    currentDepartment: 'Marine Engineering',
    currentPic: 'Budi Santoso',
    status: 'Active',
    lastTrackingLocation: 'KM Dobonsolo - Engine Room',
    lastTrackingDate: '2026-04-28',
    lastMaintenanceStatus: 'Completed',
    lastOpnameFinding: 'Matched'
  }
]
```

### 11.2 Movement Dummy Data

Minimum 15 movement requests.

Example:

```ts
const movementRequests = [
  {
    requestNo: 'MOV-2026-0001',
    assetCode: 'AST-ENG-00032',
    assetName: 'Main Engine Pump',
    currentLocation: 'KM Dobonsolo - Engine Room',
    destinationLocation: 'Central Warehouse Jakarta',
    movementType: 'Maintenance Transfer',
    requester: 'Budi Santoso',
    movementDate: '2026-05-03',
    status: 'Submitted'
  }
]
```

### 11.3 Location Dummy Data

Minimum locations:

- KM Dobonsolo - Engine Room
- KM Kelud - Deck 2
- KM Bukit Raya - Navigation Room
- Central Warehouse Jakarta
- Surabaya Branch Warehouse
- Makassar Branch Warehouse
- Disposal Holding Area
- Maintenance Workshop Jakarta
- Procurement Receiving Area
- Asset Transit Area

---

## 12. Component Requirement

Build reusable components:

```text
/components/eam/AppShell.tsx
/components/eam/Sidebar.tsx
/components/eam/Topbar.tsx
/components/eam/PageHeader.tsx
/components/eam/SummaryCard.tsx
/components/eam/FilterBar.tsx
/components/eam/DataTable.tsx
/components/eam/StatusBadge.tsx
/components/eam/ApprovalStepper.tsx
/components/eam/AssetContextCard.tsx
/components/eam/AttachmentList.tsx
/components/eam/AuditTimeline.tsx
```

For Movement-specific components:

```text
/components/eam/movement/MovementTable.tsx
/components/eam/movement/MovementForm.tsx
/components/eam/movement/MovementDetailTabs.tsx
/components/eam/movement/MovementApprovalPanel.tsx
/components/eam/movement/OriginDestinationCard.tsx
```

---

## 13. Suggested Folder Structure

Important: follow foldering note from previous module. Every submodule in Penghapusan must be inside folder `penghapusan`.

```text
/app
└── eam
    └── penghapusan
        └── movement
            ├── page.tsx
            ├── create
            │   └── page.tsx
            ├── approval
            │   └── page.tsx
            └── [id]
                └── page.tsx

/components
└── eam
    ├── common
    │   ├── AppShell.tsx
    │   ├── Sidebar.tsx
    │   ├── Topbar.tsx
    │   ├── PageHeader.tsx
    │   ├── SummaryCard.tsx
    │   ├── StatusBadge.tsx
    │   ├── DataTable.tsx
    │   └── FilterBar.tsx
    │
    └── penghapusan
        └── movement
            ├── MovementTable.tsx
            ├── MovementForm.tsx
            ├── MovementDetailTabs.tsx
            ├── MovementApprovalPanel.tsx
            └── OriginDestinationCard.tsx

/data
└── eam
    └── penghapusan
        └── movement.ts
```

---

## 14. Navigation Requirement

Sidebar Penghapusan:

```text
Penghapusan
├── Movement
├── Replacement
└── Dismantle / Disposal
```

Movement menu should be active when user visits:

- `/eam/penghapusan/movement`
- `/eam/penghapusan/movement/create`
- `/eam/penghapusan/movement/approval`
- `/eam/penghapusan/movement/[id]`

---

## 15. Visual Detail Requirement

### 15.1 Table Style

- Compact enterprise table.
- Sticky header optional.
- Alternating row hover.
- Small status badge.
- Action button as dropdown or icon button.
- Pagination at bottom.

### 15.2 Form Style

- Use section cards.
- Use two-column layout on desktop.
- Single column on mobile.
- Required field marker.
- Disabled auto-filled fields should have gray background.
- Warning information should use subtle yellow alert.

### 15.3 Detail Page Style

- Header document card.
- Tabs below header.
- Summary information in grid.
- Approval stepper similar enterprise workflow.
- Audit timeline clean and readable.

---

## 16. Validation Rules for UI Demo

Implement frontend validation only.

Rules:

1. Asset Code required.
2. Destination Location required.
3. Destination PIC required.
4. Movement Date required.
5. Movement Type required.
6. Movement Reason required.
7. Destination Location cannot equal Current Location.
8. If Related Module is selected, Reference Number required.
9. Submit button disabled until mandatory fields are valid.
10. Show validation message under field.

---

## 17. Empty State & Error State

### Empty Table

Message:

```text
No movement request found. Create a new movement request to start tracking asset transfer.
```

Button:

```text
Create Movement
```

### Invalid Asset Selection

Message:

```text
Selected asset is not eligible for movement because its status is Disposed or Inactive.
```

### Duplicate Location Warning

Message:

```text
Destination location cannot be the same as current location.
```

---

## 18. Future Backend API Contract

For future integration, prepare frontend with service layer.

Suggested endpoints:

```text
GET    /api/eam/penghapusan/movement
GET    /api/eam/penghapusan/movement/:id
POST   /api/eam/penghapusan/movement
PUT    /api/eam/penghapusan/movement/:id
POST   /api/eam/penghapusan/movement/:id/submit
POST   /api/eam/penghapusan/movement/:id/approve
POST   /api/eam/penghapusan/movement/:id/reject
POST   /api/eam/penghapusan/movement/:id/complete
GET    /api/eam/assets/search
GET    /api/eam/locations
GET    /api/eam/employees
```

Suggested response object:

```ts
type MovementRequest = {
  id: string
  requestNo: string
  assetCode: string
  assetName: string
  serialNumber: string
  category: string
  currentLocation: string
  destinationLocation: string
  currentDepartment: string
  destinationDepartment: string
  currentPic: string
  destinationPic: string
  movementType: string
  movementDate: string
  expectedArrivalDate?: string
  reason: string
  notes?: string
  relatedModule?: string
  referenceNumber?: string
  status: MovementStatus
  requester: string
  createdAt: string
  updatedAt: string
}
```

---

## 19. Acceptance Criteria

Submodule dianggap selesai untuk tahap UI demo jika:

1. User dapat melihat daftar Movement Request.
2. User dapat melakukan filter dan search data dummy.
3. User dapat membuka halaman Create Movement.
4. User dapat memilih dummy asset dan melihat data aset otomatis terisi.
5. User dapat mengisi detail movement.
6. User mendapatkan validasi jika field wajib kosong.
7. User dapat melihat detail movement dengan tab Overview, Asset Detail, Movement Detail, Approval, Attachments, dan Audit Trail.
8. User dapat melihat approval stepper.
9. User dapat melihat halaman approval queue.
10. UI menggunakan gaya SAP Business One: clean, table dominant, enterprise, compact.
11. Folder submodule berada di bawah `penghapusan/movement`.
12. Tidak ada backend wajib pada tahap ini, semua data menggunakan dummy data.

---

## 20. Prompt Implementasi untuk Google Antigravity

Gunakan prompt berikut di Google Antigravity:

```text
Build UI frontend demo for EAM PELNI submodule 2.6.1 Movement using Next.js and Tailwind CSS.

Context:
This is part of Enterprise Asset Management lifecycle. Previous modules already include Planning, Procurement, Installation, Maintenance, Stock Opname, and Asset Tracking. Movement is under module 2.6 Penghapusan and must be placed inside folder penghapusan/movement.

Design direction:
Use SAP Business One as UI/UX reference. The layout must be clean, enterprise, compact, table-dominant, and professional. Use left sidebar navigation, top header, breadcrumb, summary cards, filter bar, data table, status badges, detail tabs, approval stepper, attachment list, and audit timeline.

Required routes:
- /eam/penghapusan/movement
- /eam/penghapusan/movement/create
- /eam/penghapusan/movement/approval
- /eam/penghapusan/movement/[id]

Required pages:
1. Movement List Page
   - Summary cards: Total Movement, Draft, Pending Approval, In Transit, Completed This Month
   - Filter bar: search, status, movement type, origin location, destination location, date range, requester
   - Table columns: Request No, Asset Code, Asset Name, Current Location, Destination Location, Movement Type, Requester, Movement Date, Status, Action

2. Create Movement Page
   - Document header section
   - Asset selection section
   - Auto-filled asset context card
   - Movement information form
   - Related reference section
   - Attachment section
   - Buttons: Save Draft, Submit Request, Cancel
   - Frontend validation for required fields

3. Movement Detail Page
   - Header with request number and status badge
   - Tabs: Overview, Asset Detail, Movement Detail, Approval, Attachments, History & Audit Trail
   - Show origin vs destination comparison
   - Show approval stepper
   - Show audit timeline

4. Approval Queue Page
   - Table for movement requests waiting for approval
   - Review action per row

Dummy data:
Create dummy assets, locations, employees, and minimum 15 movement requests. Include asset context from previous modules: last tracking location, last maintenance status, last stock opname finding, and related warning if asset is linked to replacement/disposal.

Business rules:
- Asset Code is required
- Destination Location is required
- Destination PIC is required
- Movement Date is required
- Movement Type is required
- Movement Reason is required
- Destination Location cannot be the same as Current Location
- Assets with status Disposed, Written Off, Sold, Scrapped, Lost, or Inactive cannot be moved

Folder structure:
/app/eam/penghapusan/movement/page.tsx
/app/eam/penghapusan/movement/create/page.tsx
/app/eam/penghapusan/movement/approval/page.tsx
/app/eam/penghapusan/movement/[id]/page.tsx
/components/eam/common/*
/components/eam/penghapusan/movement/*
/data/eam/penghapusan/movement.ts

Important:
Do not build backend yet. Use dummy data only. Prepare code structure so it can later connect to REST API with Node.js, Prisma, PostgreSQL, and JWT.
```

---

## 21. Notes for Next Submodule

Submodule berikutnya adalah **2.6.2 Replacement**.

Movement harus menyediakan data yang dapat dipakai oleh Replacement, terutama:

- asset yang sudah dipindahkan ke transit warehouse,
- asset yang masuk status Waiting Replacement,
- movement history aset lama,
- lokasi akhir aset sebelum diganti,
- dan PIC terakhir aset sebelum replacement.

