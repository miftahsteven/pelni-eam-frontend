# PRD UI/UX – Modul 2.5.2 Stock Opname

## 1. Informasi Modul

- **Nama Modul:** Stock Opname
- **Kode Modul:** 2.5.2
- **Parent Module:** 2.5 Pemeliharaan
- **Path Menu:** `/pemeliharaan/stock-opname`
- **Folder Implementasi:** `/modules/pemeliharaan/stock-opname`
- **Stack Frontend:** Next.js + Tailwind CSS
- **Design Reference:** SAP Business One
- **Target Fase:** Tahap 1 – UI Frontend Demo dengan Dummy Data

---

## 2. Tujuan Modul

Submodul Stock Opname digunakan untuk melakukan pencocokan antara data aset yang tercatat di sistem dengan kondisi fisik aktual di lapangan. Modul ini membantu perusahaan memastikan bahwa aset benar-benar tersedia, berada di lokasi yang benar, dalam kondisi sesuai, serta memiliki catatan audit yang jelas.

Dalam konteks EAM PELNI, Stock Opname menjadi proses penting setelah aset terdaftar pada modul **2.4.3 Asset Registration** dan sebelum aset terus dimonitor melalui modul **2.5.3 Asset Tracking**.

---

## 3. Scope UI/UX

PRD ini hanya mencakup desain UI/UX frontend demo untuk:

1. Dashboard Stock Opname
2. List Dokumen Stock Opname
3. Create Stock Opname
4. Detail Stock Opname
5. Input Hasil Pemeriksaan Aset
6. Review Selisih Data
7. Approval & Finalisasi
8. Laporan Hasil Stock Opname

Belum mencakup backend, API, database, integrasi scanner fisik, atau mobile app real.

---

## 4. Referensi Desain SAP Business One

UI harus mengikuti karakter desain SAP Business One:

- Layout enterprise, clean, dan padat informasi
- Sidebar menu di kiri
- Header halaman sederhana
- Table/grid sebagai komponen utama
- Filter bar di bagian atas table
- Form input 2 kolom
- Tab section pada halaman detail
- Button minimalis dan konsisten
- Status badge yang mudah dibaca
- Warna dasar netral: putih, abu-abu muda, biru SAP-like
- Tidak menggunakan tampilan terlalu playful

---

## 5. Struktur Menu

Parent menu:

```text
Pemeliharaan
├── Maintenance
├── Stock Opname
└── Asset Tracking
```

Menu Stock Opname harus muncul sebagai submenu aktif di bawah modul parent **Pemeliharaan**.

---

## 6. Struktur Folder Implementasi

Gunakan struktur folder berikut:

```text
/modules
  /pemeliharaan
    /maintenance
    /stock-opname
      page.tsx
      components/
        StockOpnameDashboard.tsx
        StockOpnameTable.tsx
        StockOpnameForm.tsx
        StockOpnameDetail.tsx
        StockOpnameAssetChecklist.tsx
        StockOpnameVarianceTable.tsx
        StockOpnameApprovalPanel.tsx
      data/
        dummy-stock-opname.ts
      types/
        stock-opname.ts
    /asset-tracking
```

Apabila project menggunakan App Router Next.js, route dapat diarahkan ke:

```text
/app/pemeliharaan/stock-opname/page.tsx
```

Namun komponen utama tetap disimpan di:

```text
/modules/pemeliharaan/stock-opname
```

---

## 7. Analisis Flow Bisnis Stock Opname

### 7.1 Ringkasan Flow

```text
Start
↓
Create Stock Opname Plan
↓
Pilih Lokasi / Kategori / Periode Aset
↓
Generate Daftar Aset dari Sistem
↓
Assign Petugas Stock Opname
↓
Pelaksanaan Pemeriksaan Fisik
↓
Input Hasil Pemeriksaan
↓
Sistem Membandingkan Data Fisik vs Data Sistem
↓
Muncul Variance / Selisih
↓
Review Supervisor
↓
Approval / Revisi
↓
Finalisasi Stock Opname
↓
Generate Report & Audit Trail
↓
End
```

---

### 7.2 Detail Flow

#### Step 1 – Create Stock Opname Plan

User membuat dokumen rencana stock opname berdasarkan periode tertentu.

Contoh:

- Stock Opname Bulanan
- Stock Opname Tahunan
- Stock Opname berdasarkan lokasi kapal/cabang/gudang
- Stock Opname berdasarkan kategori aset

Output dari tahap ini adalah dokumen Stock Opname dengan status **Draft**.

---

#### Step 2 – Pilih Scope Pemeriksaan

User menentukan cakupan aset yang akan diperiksa:

- Lokasi aset
- Kategori aset
- Unit kerja
- Kapal/cabang/departemen
- Periode pemeriksaan
- Penanggung jawab

Sistem akan mengambil data aset dari master aset yang berasal dari modul **2.4.3 Asset Registration**.

---

#### Step 3 – Generate Asset List

Sistem menampilkan daftar aset yang sesuai dengan scope pemeriksaan.

Data yang ditampilkan:

- Asset ID
- Asset Name
- Category
- Location System
- Current Condition System
- Custodian / PIC
- Last Stock Opname Date

Status dokumen berubah menjadi **Generated**.

---

#### Step 4 – Assign Petugas

Supervisor/admin menunjuk petugas stock opname.

Role yang dapat dilibatkan:

- Admin aset
- Petugas lapangan
- Supervisor
- Auditor internal

Status dokumen berubah menjadi **Assigned**.

---

#### Step 5 – Physical Checking

Petugas melakukan pemeriksaan fisik aset di lapangan.

Metode input pada UI demo:

- Manual checklist
- Input kondisi fisik
- Input lokasi aktual
- Upload foto dummy
- Catatan pemeriksaan
- Simulasi QR scan button

Status dokumen berubah menjadi **In Progress**.

---

#### Step 6 – Input Result

Petugas mengisi hasil pemeriksaan per aset:

- Found / Not Found
- Lokasi sesuai / tidak sesuai
- Kondisi sesuai / tidak sesuai
- Kondisi aktual
- Catatan
- Foto bukti

---

#### Step 7 – Variance Detection

Sistem membandingkan hasil fisik dengan data sistem.

Jenis selisih:

- Aset tidak ditemukan
- Lokasi berbeda
- Kondisi berbeda
- Aset ditemukan tetapi tidak ada di sistem
- Data PIC berbeda
- Nomor seri berbeda

Status dokumen berubah menjadi **Review**.

---

#### Step 8 – Review & Approval

Supervisor melakukan review hasil stock opname.

Aksi yang tersedia:

- Approve
- Request Revision
- Reject
- Add Review Notes

Jika disetujui, status menjadi **Approved**.
Jika butuh revisi, status menjadi **Revision Required**.

---

#### Step 9 – Finalisasi

Setelah approved, dokumen dapat difinalisasi.

Finalisasi menghasilkan:

- Laporan stock opname
- Rekomendasi adjustment
- Audit trail
- Update status pemeriksaan aset

Status akhir: **Closed**.

---

## 8. Analisis Input – Process – Output

### 8.1 Input

Data yang dibutuhkan dalam proses Stock Opname:

| Input | Deskripsi | Sumber Data |
|---|---|---|
| Stock Opname Number | Nomor dokumen stock opname | Auto-generated |
| Period | Periode pemeriksaan | User input |
| Location | Lokasi aset yang diperiksa | Master location |
| Asset Category | Kategori aset | Master asset category |
| Asset List | Daftar aset sistem | Asset Registration |
| Officer / Petugas | Petugas pemeriksa | Master user/employee |
| Physical Condition | Kondisi aktual aset | Input petugas |
| Actual Location | Lokasi aktual aset | Input petugas |
| Finding Status | Found / Not Found | Input petugas |
| Photo Evidence | Bukti foto | Upload dummy |
| Notes | Catatan pemeriksaan | Input petugas |
| Approval Notes | Catatan supervisor | Input supervisor |

---

### 8.2 Process

Proses utama dalam submodul ini:

1. Membuat dokumen stock opname
2. Menentukan scope pemeriksaan aset
3. Generate asset list dari master asset
4. Assign petugas pemeriksaan
5. Melakukan pemeriksaan fisik aset
6. Input hasil pemeriksaan
7. Membandingkan data fisik dengan data sistem
8. Menampilkan variance/selisih
9. Review supervisor
10. Approval atau revisi
11. Finalisasi dokumen stock opname
12. Generate laporan dan audit trail

---

### 8.3 Output

Output dari proses Stock Opname:

| Output | Deskripsi |
|---|---|
| Stock Opname Document | Dokumen pemeriksaan aset |
| Physical Check Result | Hasil pengecekan fisik aset |
| Variance Report | Laporan selisih data sistem vs fisik |
| Missing Asset List | Daftar aset tidak ditemukan |
| Location Mismatch List | Daftar aset dengan lokasi tidak sesuai |
| Condition Mismatch List | Daftar aset dengan kondisi berbeda |
| Approval Status | Status approval dokumen |
| Final Report | Laporan akhir stock opname |
| Audit Trail | Riwayat aksi user pada dokumen |

---

## 9. Status Lifecycle

Gunakan status dokumen berikut:

```text
Draft
Generated
Assigned
In Progress
Review
Revision Required
Approved
Closed
Cancelled
```

### Status Badge

| Status | Warna UI |
|---|---|
| Draft | Gray |
| Generated | Blue Light |
| Assigned | Blue |
| In Progress | Orange |
| Review | Purple |
| Revision Required | Yellow |
| Approved | Green |
| Closed | Dark Gray |
| Cancelled | Red |

---

## 10. Role & Permission

| Role | Hak Akses |
|---|---|
| Admin | Create, edit, delete draft, assign, view all |
| Supervisor | Review, approve, request revision, close |
| Petugas | Input hasil pemeriksaan, upload bukti, submit |
| Auditor | View report, view audit trail |
| Viewer | View only |

---

## 11. Screen Requirement

### 11.1 Stock Opname Dashboard

Path:

```text
/pemeliharaan/stock-opname
```

Komponen:

- Page title: `Stock Opname`
- Breadcrumb: `Pemeliharaan > Stock Opname`
- Summary cards:
  - Total Stock Opname
  - In Progress
  - Need Review
  - Approved
  - Variance Found
- Mini chart dummy:
  - Stock Opname by Status
  - Variance by Category
- Recent stock opname table

Desain mengikuti dashboard SAP B1: ringkas, informatif, grid-based.

---

### 11.2 Stock Opname List

Komponen:

- Header action:
  - `+ Create Stock Opname`
  - `Export`
  - `Refresh`
- Filter bar:
  - Period
  - Location
  - Category
  - Status
  - Officer
- Table/grid:
  - SO Number
  - Period
  - Location
  - Category
  - Total Asset
  - Checked
  - Variance
  - Status
  - Created By
  - Action

Action:

- View Detail
- Edit Draft
- Continue Checking
- Submit Review
- Print Report

---

### 11.3 Create Stock Opname Form

Path:

```text
/pemeliharaan/stock-opname/create
```

Form fields:

| Field | Type | Rule |
|---|---|---|
| Stock Opname No | Text readonly | Auto-generated |
| Period | Month/Date range | Required |
| Location | Select | Required |
| Asset Category | Multi-select | Optional |
| Unit / Department | Select | Optional |
| Responsible Officer | Select | Required |
| Supervisor | Select | Required |
| Description | Textarea | Optional |

Button:

- Save Draft
- Generate Asset List
- Cancel

---

### 11.4 Detail Stock Opname

Path:

```text
/pemeliharaan/stock-opname/[id]
```

Gunakan layout tab seperti SAP B1:

```text
[General Info] [Asset Checklist] [Variance] [Approval] [Audit Trail]
```

#### Tab 1 – General Info

Menampilkan:

- Stock Opname No
- Period
- Location
- Category
- Officer
- Supervisor
- Status
- Progress bar pemeriksaan

---

#### Tab 2 – Asset Checklist

Table aset yang diperiksa:

| Column | Description |
|---|---|
| Asset ID | ID aset |
| Asset Name | Nama aset |
| System Location | Lokasi menurut sistem |
| Actual Location | Lokasi aktual |
| System Condition | Kondisi sistem |
| Actual Condition | Kondisi aktual |
| Found Status | Found / Not Found |
| Photo | Evidence dummy |
| Notes | Catatan |
| Action | Edit result |

Fitur:

- Search asset
- Filter by Found / Not Found
- Filter by variance
- Simulate QR Scan button
- Bulk mark as found

---

#### Tab 3 – Variance

Menampilkan data selisih:

| Column | Description |
|---|---|
| Asset ID | ID aset |
| Asset Name | Nama aset |
| Variance Type | Missing / Location / Condition / Serial |
| System Value | Data sistem |
| Actual Value | Data aktual |
| Severity | Low / Medium / High |
| Recommendation | Adjustment / Investigation / No Action |

Fitur:

- Highlight variance
- Badge severity
- Summary variance count

---

#### Tab 4 – Approval

Komponen:

- Review notes
- Approval history
- Action button:
  - Approve
  - Request Revision
  - Reject
  - Close Document

---

#### Tab 5 – Audit Trail

Menampilkan log aktivitas:

| Time | User | Action | Notes |
|---|---|---|---|

Contoh action:

- Created document
- Generated asset list
- Assigned officer
- Updated asset result
- Submitted for review
- Approved by supervisor
- Closed document

---

## 12. Dummy Data Requirement

Buat dummy data minimal:

- 8 dokumen Stock Opname
- 20 data aset dalam checklist
- 6 data variance
- 5 user petugas/supervisor

Contoh dokumen:

```ts
const stockOpnameDocuments = [
  {
    id: 'SO-2026-0001',
    period: 'May 2026',
    location: 'Kapal KM Kelud',
    category: 'Navigation Equipment',
    totalAsset: 42,
    checked: 39,
    variance: 3,
    status: 'In Progress',
    officer: 'Petugas Aset 01',
    supervisor: 'Supervisor Teknik',
  },
];
```

Contoh asset checklist:

```ts
const stockOpnameAssets = [
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
];
```

---

## 13. Component UI Guideline

### 13.1 Layout

- Sidebar fixed di kiri
- Header atas berisi title dan breadcrumb
- Content area max width full
- Table menggunakan dense spacing
- Tab detail menggunakan border bawah seperti SAP B1

---

### 13.2 Table

Table harus memiliki:

- Sticky header
- Row hover
- Status badge
- Action dropdown
- Pagination dummy
- Empty state

---

### 13.3 Form

Form menggunakan 2-column layout pada desktop:

```text
Label kiri / input kanan
```

Atau:

```text
Field 1 | Field 2
Field 3 | Field 4
Textarea full width
```

---

### 13.4 Buttons

Primary:

- Create Stock Opname
- Generate Asset List
- Submit Review
- Approve

Secondary:

- Save Draft
- Export
- Refresh
- Cancel

Danger:

- Reject
- Cancel Document

---

## 14. Validation Rules

- Period wajib diisi
- Location wajib diisi
- Responsible officer wajib diisi
- Supervisor wajib diisi
- Tidak bisa submit review jika checklist belum diisi
- Tidak bisa approve jika masih ada data tanpa keputusan
- Closed document tidak boleh diedit

---

## 15. Empty State

Jika belum ada dokumen:

Title:

```text
Belum ada dokumen Stock Opname
```

Description:

```text
Buat dokumen stock opname pertama untuk mulai melakukan pemeriksaan fisik aset.
```

Button:

```text
+ Create Stock Opname
```

---

## 16. Future API Contract

Untuk tahap backend nanti, siapkan struktur endpoint berikut:

```text
GET    /api/pemeliharaan/stock-opname
POST   /api/pemeliharaan/stock-opname
GET    /api/pemeliharaan/stock-opname/:id
PUT    /api/pemeliharaan/stock-opname/:id
POST   /api/pemeliharaan/stock-opname/:id/generate-assets
PUT    /api/pemeliharaan/stock-opname/:id/assets/:assetId/result
POST   /api/pemeliharaan/stock-opname/:id/submit-review
POST   /api/pemeliharaan/stock-opname/:id/approve
POST   /api/pemeliharaan/stock-opname/:id/request-revision
POST   /api/pemeliharaan/stock-opname/:id/close
GET    /api/pemeliharaan/stock-opname/:id/report
```

---

## 17. Data Model Awareness

Entity yang nanti perlu disiapkan pada backend:

```text
StockOpname
StockOpnameAsset
StockOpnameVariance
StockOpnameApproval
StockOpnameAuditTrail
Asset
AssetLocation
AssetCategory
User
```

---

## 18. Acceptance Criteria UI Demo

UI dianggap selesai apabila:

1. Menu Stock Opname tampil di bawah parent Pemeliharaan.
2. Halaman dashboard Stock Opname tersedia.
3. List dokumen Stock Opname tampil menggunakan dummy data.
4. User dapat membuka halaman create form.
5. User dapat membuka detail Stock Opname.
6. Detail memiliki tab General Info, Asset Checklist, Variance, Approval, dan Audit Trail.
7. Table menggunakan style enterprise seperti SAP B1.
8. Status badge tampil konsisten.
9. Folder implementasi berada di `/modules/pemeliharaan/stock-opname`.
10. UI responsive untuk desktop dan tablet.

---

## 19. Catatan Integrasi Antar Modul

- Data aset berasal dari **2.4.3 Asset Registration**.
- Hasil Stock Opname dapat menjadi input koreksi untuk **2.5.3 Asset Tracking**.
- Jika ditemukan aset rusak, user dapat diarahkan ke **2.5.1 Maintenance** untuk membuat Work Order.
- Jika ditemukan aset hilang, sistem dapat menandai aset sebagai perlu investigasi.

---

## 20. Instruksi Implementasi untuk Google Antigravity

Bangun UI frontend demo untuk submodul `2.5.2 Stock Opname` pada aplikasi EAM PELNI menggunakan Next.js dan Tailwind CSS.

Ketentuan utama:

- Buat menu `Stock Opname` di bawah parent menu `Pemeliharaan`.
- Simpan seluruh komponen submodul di folder `/modules/pemeliharaan/stock-opname`.
- Gunakan desain clean enterprise dengan referensi SAP Business One.
- Gunakan dummy data, belum perlu backend.
- Buat dashboard, list, create form, dan detail page.
- Detail page wajib memiliki tab: General Info, Asset Checklist, Variance, Approval, Audit Trail.
- Buat table/grid padat informasi seperti ERP.
- Gunakan status lifecycle: Draft, Generated, Assigned, In Progress, Review, Revision Required, Approved, Closed, Cancelled.
- Pastikan style konsisten dengan submodul sebelumnya di parent Pemeliharaan.
