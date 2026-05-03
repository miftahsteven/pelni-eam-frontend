# PRD UI/UX EAM PELNI — Modul 2.6.3 Dismantle / Disposal

**Project:** Enterprise Asset Management PELNI  
**Module Group:** 2.6 Penghapusan  
**Submodule:** 2.6.3 Dismantle / Disposal  
**Output Type:** UI/UX Frontend Demo dengan Dummy Data  
**Target Implementation:** Google Antigravity  
**Frontend Stack:** Next.js, Tailwind CSS  
**Backend Future Stack:** Node.js, Prisma, PostgreSQL  
**Design Reference:** SAP Business One style — clean, table dominant, enterprise layout, compact form, status badge, approval stepper, audit trail.

---

## 1. Tujuan Submodule

Submodule **2.6.3 Dismantle / Disposal** digunakan untuk mengelola proses pembongkaran, penonaktifan, penghapusan, penjualan, scrap, hibah, kehilangan, atau write-off aset dari sistem Enterprise Asset Management.

Submodule ini menjadi tahap akhir dari siklus hidup aset setelah aset melalui proses:

```text
Planning → Procurement → Installation → Asset Registration → Maintenance → Stock Opname → Asset Tracking → Movement / Replacement → Dismantle / Disposal
```

Dalam sistem EAM, disposal tidak boleh dipahami sebagai tombol hapus data. Disposal harus menjadi proses formal yang memiliki:

- request number,
- alasan penghapusan,
- kondisi aset,
- bukti fisik,
- rekomendasi teknis,
- validasi nilai aset,
- approval berjenjang,
- berita acara,
- disposal certificate,
- dan audit trail.

---

## 2. Scope Submodule

### 2.1 In Scope

Fitur yang harus dibuat pada tahap UI demo:

1. Dashboard Dismantle / Disposal.
2. List Disposal Request.
3. Create Disposal Request.
4. Detail Disposal Request.
5. Approval Workflow.
6. Dismantle Task untuk aset yang harus dibongkar terlebih dahulu.
7. Disposal Execution.
8. Disposal Certificate / Berita Acara UI preview.
9. Asset lifecycle history.
10. Dummy data aset yang berasal dari modul sebelumnya.
11. Status badge dan approval stepper.
12. SAP B1 style layout.

### 2.2 Out of Scope untuk Tahap UI Demo

Fitur berikut tidak wajib dibuat penuh pada tahap ini, tetapi harus disiapkan secara konsep UI:

1. Integrasi accounting/depresiasi real.
2. Generate PDF berita acara secara backend.
3. Integrasi e-signature.
4. Integrasi inventory warehouse real.
5. Integrasi notifikasi email/WhatsApp.
6. Posting jurnal otomatis.
7. REST API dan database real.

---

## 3. Keterkaitan dengan Modul Sebelumnya

Submodule Dismantle / Disposal harus terlihat sebagai kelanjutan dari flow lain. Data yang ditampilkan di UI harus memperlihatkan keterkaitan berikut.

### 3.1 Relasi dengan 2.4.3 Asset Registration

Asset Registration adalah sumber utama data master aset.

Data yang digunakan:

- Asset Code
- Asset Name
- Asset Category
- Serial Number
- Acquisition Date
- Current Location
- Current PIC
- Current Status
- Book Value
- Useful Life
- Asset Registration Number

Pada Disposal, user tidak boleh membuat aset baru secara bebas. User harus memilih aset dari daftar asset master yang sudah teregistrasi.

---

### 3.2 Relasi dengan 2.5.1 Maintenance

Maintenance menjadi sumber justifikasi teknis disposal.

Contoh kondisi:

- Aset rusak berat.
- Biaya perbaikan lebih mahal dibanding nilai aset.
- Aset sering mengalami breakdown.
- Aset tidak layak operasional.
- Teknisi merekomendasikan dispose atau replace.

Data yang ditampilkan:

- Last Maintenance Date
- Maintenance Type
- Failure Description
- Repair Cost
- Technician Recommendation
- Maintenance Result

---

### 3.3 Relasi dengan 2.5.2 Stock Opname

Stock Opname menjadi validasi fisik aset sebelum disposal.

Contoh hasil stock opname:

- Aset ditemukan rusak.
- Aset tidak ditemukan.
- Aset berpindah lokasi tanpa dokumen.
- Aset ditemukan tetapi tidak layak pakai.

Data yang ditampilkan:

- Last Stock Opname Number
- Physical Status
- Actual Location
- Condition Finding
- Opname Note
- Evidence Photo

---

### 3.4 Relasi dengan 2.5.3 Asset Tracking

Asset Tracking menjadi sumber lokasi terakhir dan histori perpindahan aset.

Data yang ditampilkan:

- Current Location
- Last Movement Date
- Last Known PIC
- Movement History
- Tracking Note

Sebelum disposal disetujui, sistem harus memastikan lokasi terakhir aset jelas.

---

### 3.5 Relasi dengan 2.6.1 Movement

Aset yang akan dibongkar atau dihapus dapat dipindahkan terlebih dahulu ke:

- disposal warehouse,
- scrap area,
- central warehouse,
- holding area,
- atau workshop.

Flow:

```text
Asset Active / Damaged
↓
Movement to Disposal Area
↓
Dismantle / Disposal Request
↓
Approval
↓
Disposal Execution
```

---

### 3.6 Relasi dengan 2.6.2 Replacement

Jika aset lama sudah diganti oleh aset baru, aset lama dapat masuk ke proses disposal.

Flow:

```text
Replacement Completed
↓
Old Asset status = Replaced / Pending Disposal
↓
Create Disposal Request
↓
Approval
↓
Disposed / Written Off
```

Data yang ditampilkan:

- Replacement Request Number
- Old Asset Code
- New Asset Code
- Replacement Completion Date
- Pending Disposal Status

---

## 4. Definisi Dismantle dan Disposal

### 4.1 Dismantle

Dismantle adalah proses pembongkaran aset dari lokasi operasional sebelum aset dihapus, dijual, dipindahkan ke gudang, atau di-scrap.

Contoh:

- Membongkar perangkat mesin dari kapal.
- Melepas perangkat navigasi lama.
- Melepas perangkat IT dari ruang server.
- Membongkar komponen yang masih dapat digunakan.

Status akhir dismantle belum tentu disposed. Setelah dismantle, aset dapat menjadi:

- Dismantled,
- Waiting Disposal,
- Partially Salvaged,
- Moved to Warehouse.

---

### 4.2 Disposal

Disposal adalah proses final untuk mengeluarkan aset dari daftar aset aktif.

Jenis disposal yang harus tersedia di UI:

1. Scrap
2. Sale
3. Donation / Hibah
4. Write-off
5. Lost Asset
6. Destroyed
7. Returned to Vendor
8. Dismantle Only

Status akhir disposal:

- Disposed
- Written Off
- Sold
- Scrapped
- Donated
- Lost
- Destroyed
- Inactive

---

## 5. Analisis Flow Utama

### 5.1 Main Flow Dismantle / Disposal

```text
Start
↓
User membuka menu 2.6.3 Dismantle / Disposal
↓
User melihat dashboard disposal
↓
User memilih Create Disposal Request
↓
User memilih aset dari asset master
↓
Sistem menampilkan data aset lengkap:
    - asset registration
    - current location
    - current PIC
    - maintenance history
    - stock opname result
    - movement history
    - replacement relation jika ada
    - book value
↓
User memilih disposal type
↓
User mengisi alasan disposal dan rekomendasi teknis
↓
User upload bukti fisik / dokumen pendukung
↓
User submit disposal request
↓
Sistem membuat disposal request number
↓
Status menjadi Submitted
↓
Technical Review
↓
Asset Manager Review
↓
Finance Review
↓
Management Approval
↓
Jika approved:
    - Jika perlu dismantle, buat dismantle task
    - Jika tidak perlu dismantle, lanjut disposal execution
↓
Dismantle task dieksekusi jika ada
↓
Disposal execution dilakukan
↓
Sistem update status aset menjadi Disposed / Written Off / Sold / Scrapped / Lost / Destroyed
↓
Sistem membuat Disposal Certificate / Berita Acara
↓
Aset tidak lagi muncul sebagai active operational asset
↓
End
```

---

### 5.2 Alternative Flow — Request Rejected

```text
User submit disposal request
↓
Approver melakukan review
↓
Approver menolak request
↓
Sistem mengubah status menjadi Rejected
↓
User melihat rejection reason
↓
User dapat revise request atau cancel request
```

---

### 5.3 Alternative Flow — Need Movement First

```text
User memilih aset untuk disposal
↓
Sistem mendeteksi aset masih berada di lokasi operasional
↓
Sistem menampilkan warning:
    Asset must be moved to disposal area before final disposal
↓
User membuat Movement Request ke Disposal Area
↓
Movement approved dan completed
↓
User melanjutkan Disposal Request
```

---

### 5.4 Alternative Flow — From Replacement

```text
Replacement Request Completed
↓
Old Asset status = Pending Disposal
↓
User membuka Dismantle / Disposal
↓
User memilih old asset dari replacement list
↓
Sistem menampilkan relasi aset lama dan aset baru
↓
User membuat Disposal Request
↓
Approval
↓
Final disposal
```

---

### 5.5 Alternative Flow — Lost Asset

```text
Stock Opname menemukan aset tidak ditemukan
↓
Asset status menjadi Missing / Under Investigation
↓
User membuat Disposal Request dengan type Lost Asset
↓
Sistem meminta dokumen pendukung:
    - investigation note
    - approval letter
    - stock opname finding
↓
Approval berjenjang
↓
Jika approved, asset status menjadi Lost / Written Off
```

---

## 6. Analisis Input - Process - Output

### 6.1 Input

Input utama pada form Dismantle / Disposal:

#### A. Asset Information

| Field | Type | Required | Description |
|---|---|---:|---|
| Asset Code | Select/Search | Yes | Diambil dari Asset Master |
| Asset Name | Auto Fill | Yes | Nama aset |
| Asset Category | Auto Fill | Yes | Kategori aset |
| Serial Number | Auto Fill | Optional | Nomor seri aset |
| Current Location | Auto Fill | Yes | Lokasi terakhir aset |
| Current PIC | Auto Fill | Yes | Penanggung jawab aset |
| Asset Status | Auto Fill | Yes | Status aset saat ini |
| Acquisition Date | Auto Fill | Optional | Tanggal perolehan aset |
| Book Value | Auto Fill | Optional | Nilai buku aset |

#### B. Technical & Physical Condition

| Field | Type | Required | Description |
|---|---|---:|---|
| Asset Condition | Select | Yes | Good / Fair / Damaged / Heavy Damage / Missing |
| Last Maintenance Result | Auto Fill | Optional | Hasil maintenance terakhir |
| Technician Recommendation | Textarea | Yes | Rekomendasi teknis |
| Stock Opname Result | Auto Fill | Optional | Hasil opname terakhir |
| Physical Evidence | Upload | Optional | Foto kondisi aset |

#### C. Disposal Detail

| Field | Type | Required | Description |
|---|---|---:|---|
| Disposal Type | Select | Yes | Scrap / Sale / Donation / Write-off / Lost / Destroyed / Returned to Vendor / Dismantle Only |
| Disposal Reason | Textarea | Yes | Alasan disposal |
| Proposed Disposal Date | Date | Yes | Tanggal rencana disposal |
| Need Dismantle | Checkbox | Optional | Apakah perlu pembongkaran |
| Dismantle Location | Select | Conditional | Lokasi pembongkaran |
| Disposal Location | Select | Conditional | Lokasi disposal akhir |
| Estimated Scrap Value | Number | Optional | Estimasi nilai scrap |
| Buyer / Receiver | Text | Conditional | Untuk sale/donation/returned vendor |

#### D. Document & Approval

| Field | Type | Required | Description |
|---|---|---:|---|
| Supporting Document | Upload | Optional | Dokumen pendukung |
| Approval Note | Textarea | Optional | Catatan pengajuan |
| Requester | Auto Fill | Yes | User pembuat request |
| Request Date | Auto Fill | Yes | Tanggal request |
| Approval Level | Auto | Yes | Level approval berdasarkan type disposal |

---

### 6.2 Process

Proses yang harus tergambar dalam UI demo:

1. User memilih aset dari Asset Master.
2. Sistem menampilkan detail asset lifecycle.
3. Sistem melakukan validasi status aset.
4. User memilih disposal type.
5. Sistem menampilkan field conditional sesuai disposal type.
6. User mengisi alasan dan upload bukti.
7. Sistem membuat Disposal Request Number.
8. Sistem mengubah status request menjadi Submitted.
9. Technical reviewer memberikan rekomendasi.
10. Asset Manager memvalidasi aset, lokasi, dan kondisi.
11. Finance memvalidasi book value, disposal type, dan write-off impact.
12. Management memberikan approval final jika diperlukan.
13. Jika perlu dismantle, sistem membuat Dismantle Task.
14. Jika dismantle selesai, sistem lanjut ke disposal execution.
15. Sistem update status aset.
16. Sistem membuat disposal certificate / berita acara.
17. Sistem menyimpan audit trail.

---

### 6.3 Output

Output dari submodule Dismantle / Disposal:

| Output | Description |
|---|---|
| Disposal Request Number | Nomor dokumen disposal |
| Dismantle Task Number | Nomor task pembongkaran jika diperlukan |
| Updated Asset Status | Status aset berubah menjadi disposed/written off/etc |
| Disposal Certificate | Dokumen final disposal |
| Berita Acara Penghapusan | Preview dokumen berita acara |
| Approval Log | Riwayat persetujuan |
| Asset Lifecycle History | Histori lengkap aset |
| Audit Trail | Jejak aktivitas user |
| Inactive Asset Record | Aset tidak lagi aktif secara operasional |

---

## 7. Status Request

Status untuk Disposal Request:

```text
Draft
Submitted
Technical Review
Asset Manager Review
Finance Review
Management Approval
Approved
Rejected
Need Revision
Dismantling
Ready for Disposal
Disposed
Written Off
Sold
Scrapped
Donated
Lost
Destroyed
Cancelled
```

Status untuk aset:

```text
Active
In Maintenance
Moved to Disposal Area
Replaced
Pending Disposal
Dismantling
Dismantled
Disposed
Written Off
Sold
Scrapped
Lost
Destroyed
Inactive
```

---

## 8. Role dan Permission

| Role | Permission |
|---|---|
| Requester | Create draft, submit request, view own request |
| Maintenance Team | Add technical review and recommendation |
| Asset Manager | Validate asset data, approve/reject asset side |
| Warehouse / Logistic | Confirm physical movement or disposal area |
| Finance | Validate book value, write-off, sale/scrap value |
| Management | Final approval for sensitive disposal |
| Admin | Manage dummy master data and view all |

---

## 9. UI/UX Direction

Gunakan referensi **SAP Business One**:

- clean enterprise layout,
- warna netral,
- table dominant,
- compact input form,
- header document number,
- status badge,
- tab detail,
- approval stepper,
- right side summary panel,
- audit trail section,
- no overly playful design.

### 9.1 Layout Utama

Halaman utama menggunakan layout:

```text
Top Header
↓
Module Breadcrumb
↓
Summary Cards
↓
Filter Bar
↓
Main Table
↓
Detail Drawer / Detail Page
```

### 9.2 Warna dan Style

Rekomendasi style:

- Background: gray-50 / slate-50
- Card: white
- Border: gray-200
- Text primary: slate-800
- Text secondary: slate-500
- Badge status: soft color
- Button primary: SAP-like blue
- Table hover: light blue/gray

### 9.3 Komponen UI Wajib

1. Page Header
2. Breadcrumb
3. Summary Cards
4. Filter Bar
5. Data Table
6. Status Badge
7. Create Form
8. Asset Search Modal
9. Approval Stepper
10. Tab Detail
11. Right Summary Panel
12. Upload Area
13. Timeline / Audit Trail
14. Certificate Preview

---

## 10. Struktur Halaman

### 10.1 Dashboard Dismantle / Disposal

Path:

```text
/eam/penghapusan/dismantle-disposal
```

Komponen:

- Summary Card:
  - Total Disposal Requests
  - Pending Approval
  - Dismantling
  - Disposed This Month
  - Written Off
  - Rejected

- Chart sederhana optional:
  - Disposal by Type
  - Disposal by Status

- Main Table:
  - Request No
  - Asset Code
  - Asset Name
  - Location
  - Disposal Type
  - Requester
  - Request Date
  - Status
  - Action

---

### 10.2 Create Disposal Request

Path:

```text
/eam/penghapusan/dismantle-disposal/create
```

Section form:

1. Document Header
2. Asset Selection
3. Asset Detail Snapshot
4. Technical Condition
5. Disposal Detail
6. Dismantle Requirement
7. Supporting Documents
8. Approval Preview
9. Submit Button

---

### 10.3 Disposal Detail

Path:

```text
/eam/penghapusan/dismantle-disposal/[id]
```

Tab detail:

1. Overview
2. Asset Information
3. Technical Review
4. Finance Review
5. Dismantle Task
6. Documents
7. Approval Log
8. Lifecycle History
9. Audit Trail

---

### 10.4 Approval Page

Path:

```text
/eam/penghapusan/dismantle-disposal/approval
```

Fitur:

- List pending approval.
- Filter by approval level.
- Detail review panel.
- Approve button.
- Reject button.
- Need revision button.
- Approval note.

---

### 10.5 Disposal Certificate Preview

Path:

```text
/eam/penghapusan/dismantle-disposal/[id]/certificate
```

Isi preview:

- Company name placeholder: PT PELNI
- Disposal request number
- Asset identity
- Disposal type
- Final status
- Approval summary
- Execution date
- Notes
- Signature placeholder

---

## 11. Dummy Data Requirement

Buat dummy data agar UI terlihat hidup dan terkait dengan modul sebelumnya.

### 11.1 Dummy Disposal Requests

Contoh data:

```ts
const disposalRequests = [
  {
    id: 'DIS-2026-0001',
    assetCode: 'AST-NAV-00021',
    assetName: 'Radar Navigasi Lama',
    category: 'Navigation Equipment',
    currentLocation: 'KM Kelud - Bridge Deck',
    currentPIC: 'Officer Navigasi',
    disposalType: 'Scrap',
    condition: 'Heavy Damage',
    sourceModule: 'Maintenance',
    maintenanceRef: 'MTN-2026-0041',
    stockOpnameRef: 'SO-2026-0012',
    replacementRef: 'REP-2026-0004',
    bookValue: 12000000,
    requestDate: '2026-05-03',
    requester: 'Technical Unit',
    status: 'Finance Review'
  },
  {
    id: 'DIS-2026-0002',
    assetCode: 'AST-IT-00087',
    assetName: 'Server Rack Lama',
    category: 'IT Equipment',
    currentLocation: 'Gudang Pusat',
    currentPIC: 'IT Asset PIC',
    disposalType: 'Sale',
    condition: 'Obsolete',
    sourceModule: 'Replacement',
    maintenanceRef: 'MTN-2026-0032',
    stockOpnameRef: 'SO-2026-0009',
    replacementRef: 'REP-2026-0002',
    bookValue: 8500000,
    requestDate: '2026-05-01',
    requester: 'IT Department',
    status: 'Approved'
  },
  {
    id: 'DIS-2026-0003',
    assetCode: 'AST-MCH-00102',
    assetName: 'Pompa Air Mesin Lama',
    category: 'Machinery',
    currentLocation: 'Disposal Area Surabaya',
    currentPIC: 'Warehouse Surabaya',
    disposalType: 'Write-off',
    condition: 'Damaged',
    sourceModule: 'Movement',
    movementRef: 'MOV-2026-0018',
    maintenanceRef: 'MTN-2026-0055',
    stockOpnameRef: 'SO-2026-0021',
    bookValue: 0,
    requestDate: '2026-04-28',
    requester: 'Engineering Unit',
    status: 'Dismantling'
  }
];
```

### 11.2 Dummy Approval Steps

```ts
const approvalSteps = [
  { level: 1, role: 'Technical Review', status: 'Approved', approver: 'Maintenance Supervisor' },
  { level: 2, role: 'Asset Manager Review', status: 'Approved', approver: 'Asset Manager' },
  { level: 3, role: 'Finance Review', status: 'Pending', approver: 'Finance Officer' },
  { level: 4, role: 'Management Approval', status: 'Waiting', approver: 'General Manager' }
];
```

### 11.3 Dummy Lifecycle History

```ts
const lifecycleHistory = [
  { date: '2025-10-12', module: 'Asset Registration', ref: 'REG-2025-0120', note: 'Asset registered after acceptance test' },
  { date: '2026-01-15', module: 'Maintenance', ref: 'MTN-2026-0041', note: 'Heavy damage found during corrective maintenance' },
  { date: '2026-03-20', module: 'Replacement', ref: 'REP-2026-0004', note: 'Asset replaced by new navigation radar' },
  { date: '2026-04-02', module: 'Movement', ref: 'MOV-2026-0015', note: 'Moved to disposal warehouse' },
  { date: '2026-05-03', module: 'Disposal', ref: 'DIS-2026-0001', note: 'Disposal request submitted' }
];
```

---

## 12. Struktur Folder yang Direkomendasikan

Gunakan foldering konsisten dengan modul penghapusan.

```text
src/
├── app/
│   └── eam/
│       └── penghapusan/
│           └── dismantle-disposal/
│               ├── page.tsx
│               ├── create/
│               │   └── page.tsx
│               ├── approval/
│               │   └── page.tsx
│               └── [id]/
│                   ├── page.tsx
│                   └── certificate/
│                       └── page.tsx
│
├── components/
│   └── eam/
│       └── penghapusan/
│           └── dismantle-disposal/
│               ├── DisposalDashboardCards.tsx
│               ├── DisposalFilterBar.tsx
│               ├── DisposalTable.tsx
│               ├── DisposalForm.tsx
│               ├── AssetDisposalSnapshot.tsx
│               ├── DisposalApprovalStepper.tsx
│               ├── DismantleTaskPanel.tsx
│               ├── DisposalCertificatePreview.tsx
│               ├── DisposalLifecycleHistory.tsx
│               └── DisposalStatusBadge.tsx
│
├── data/
│   └── eam/
│       └── penghapusan/
│           └── dismantleDisposalDummy.ts
│
└── types/
    └── eam/
        └── dismantleDisposal.ts
```

---

## 13. TypeScript Type Recommendation

```ts
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
}
```

---

## 14. Acceptance Criteria

### 14.1 Dashboard

- User dapat melihat ringkasan disposal request.
- User dapat melihat list request dalam tabel dominan.
- User dapat filter berdasarkan status, disposal type, lokasi, kategori aset, dan tanggal.
- Setiap row memiliki status badge.
- Setiap row dapat dibuka ke halaman detail.

### 14.2 Create Request

- User dapat memilih aset dari dummy asset master.
- Setelah aset dipilih, sistem menampilkan snapshot asset lifecycle.
- User dapat memilih disposal type.
- Field conditional berubah sesuai disposal type.
- User dapat mengisi alasan disposal.
- User dapat melihat approval preview.
- Submit menghasilkan status Submitted secara dummy.

### 14.3 Detail Request

- User dapat melihat detail aset.
- User dapat melihat relasi ke maintenance, stock opname, movement, replacement.
- User dapat melihat approval stepper.
- User dapat melihat lifecycle history.
- User dapat melihat dokumen dan certificate preview.

### 14.4 Approval

- User dapat melihat daftar request yang pending approval.
- User dapat approve, reject, atau request revision secara dummy.
- Approval note wajib diisi saat reject atau need revision.

### 14.5 SAP B1 Style

- UI harus clean dan enterprise.
- Tabel menjadi komponen utama.
- Form harus compact dan rapi.
- Gunakan status badge dan tab detail.
- Hindari tampilan terlalu colorful atau gamified.

---

## 15. Prompt Siap Pakai untuk Google Antigravity

Gunakan prompt berikut untuk implementasi UI demo:

```text
Buatkan UI frontend demo untuk EAM PELNI submodule 2.6.3 Dismantle / Disposal menggunakan Next.js dan Tailwind CSS.

Konteks:
Submodule ini adalah bagian dari Modul 2.6 Penghapusan. Flow harus terkait dengan modul sebelumnya: Asset Registration, Maintenance, Stock Opname, Asset Tracking, Movement, Replacement, dan nantinya Finance/Accounting. Disposal bukan delete data, tetapi proses formal untuk pembongkaran, write-off, sale, scrap, donation, lost asset, destroyed, atau inactive asset.

Gunakan gaya desain SAP Business One:
- clean enterprise layout
- table dominant
- compact form
- neutral color
- status badge
- approval stepper
- tab detail
- right summary panel
- audit trail
- document number style

Buat struktur halaman:
1. /eam/penghapusan/dismantle-disposal
   Dashboard + summary cards + filter bar + table list disposal request.

2. /eam/penghapusan/dismantle-disposal/create
   Form create disposal request dengan section:
   - Document Header
   - Asset Selection
   - Asset Detail Snapshot
   - Technical Condition
   - Disposal Detail
   - Dismantle Requirement
   - Supporting Documents
   - Approval Preview

3. /eam/penghapusan/dismantle-disposal/[id]
   Detail page dengan tab:
   - Overview
   - Asset Information
   - Technical Review
   - Finance Review
   - Dismantle Task
   - Documents
   - Approval Log
   - Lifecycle History
   - Audit Trail

4. /eam/penghapusan/dismantle-disposal/approval
   List pending approval dan action approve/reject/need revision secara dummy.

5. /eam/penghapusan/dismantle-disposal/[id]/certificate
   Preview Disposal Certificate / Berita Acara Penghapusan.

Buat komponen:
- DisposalDashboardCards
- DisposalFilterBar
- DisposalTable
- DisposalForm
- AssetDisposalSnapshot
- DisposalApprovalStepper
- DismantleTaskPanel
- DisposalCertificatePreview
- DisposalLifecycleHistory
- DisposalStatusBadge

Buat dummy data yang menunjukkan keterkaitan dengan modul lain:
- maintenanceRef
- stockOpnameRef
- movementRef
- replacementRef
- assetRegistrationRef
- bookValue
- currentLocation
- currentPIC
- lifecycleHistory

Status request yang digunakan:
Draft, Submitted, Technical Review, Asset Manager Review, Finance Review, Management Approval, Approved, Rejected, Need Revision, Dismantling, Ready for Disposal, Disposed, Written Off, Sold, Scrapped, Donated, Lost, Destroyed, Cancelled.

Disposal type:
Scrap, Sale, Donation, Write-off, Lost Asset, Destroyed, Returned to Vendor, Dismantle Only.

Pastikan UI terlihat konsisten dengan modul EAM sebelumnya dan folder berada di:
src/app/eam/penghapusan/dismantle-disposal
src/components/eam/penghapusan/dismantle-disposal
src/data/eam/penghapusan/dismantleDisposalDummy.ts
src/types/eam/dismantleDisposal.ts

Tahap ini hanya UI frontend demo dengan dummy data. Tidak perlu backend dan database.
```

---

## 16. Catatan Integrasi Backend Tahap Berikutnya

Saat masuk tahap backend, endpoint yang disarankan:

```text
GET    /api/eam/disposal
GET    /api/eam/disposal/:id
POST   /api/eam/disposal
PATCH  /api/eam/disposal/:id
POST   /api/eam/disposal/:id/submit
POST   /api/eam/disposal/:id/approve
POST   /api/eam/disposal/:id/reject
POST   /api/eam/disposal/:id/request-revision
POST   /api/eam/disposal/:id/dismantle-task
POST   /api/eam/disposal/:id/execute
GET    /api/eam/disposal/:id/certificate
```

Entity database future:

- Asset
- DisposalRequest
- DisposalApproval
- DismantleTask
- DisposalDocument
- AssetLifecycleHistory
- AssetMovement
- MaintenanceWorkOrder
- StockOpnameFinding
- ReplacementRequest

---

## 17. Kesimpulan

Submodule **2.6.3 Dismantle / Disposal** adalah penutup dari lifecycle aset dalam EAM PELNI. UI/UX harus menampilkan bahwa disposal adalah proses formal, bukan penghapusan data biasa.

Submodule ini harus memperlihatkan keterkaitan kuat dengan:

- Asset Registration sebagai sumber master aset,
- Maintenance sebagai justifikasi teknis,
- Stock Opname sebagai validasi fisik,
- Asset Tracking sebagai lokasi aktual,
- Movement sebagai proses pemindahan ke disposal area,
- Replacement sebagai trigger aset lama masuk pending disposal,
- Finance sebagai validasi nilai aset dan write-off.

Dengan desain SAP Business One, halaman harus terasa rapi, serius, enterprise, dan siap dikembangkan bertahap dari UI demo ke backend dan business flow real.
