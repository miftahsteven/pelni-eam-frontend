# PRD UI/UX – 2.4.3 Asset Registration
## EAM PELNI – Enterprise Asset Management System

---

## 1. Document Information

| Item | Description |
|---|---|
| Module | 2.4 Pemasangan |
| Submodule | 2.4.3 Asset Registration |
| Project | EAM PELNI |
| Phase | Tahap 1 – UI Frontend Demo dengan Dummy Data |
| Output | PRD UI/UX untuk Google AntiGravity |
| Frontend Stack | Next.js, Tailwind CSS |
| UI Reference | SAP Business One Style |
| Backend Future Stack | Node.js, Prisma, PostgreSQL |
| Integration Future | REST API, JWT Auth |

---

# PART A – ANALISIS FLOW & INPUT PROCESS OUTPUT

---

## 2. Background

Submodul **Asset Registration** adalah proses akhir dalam rangkaian modul pemasangan. Setelah item/equipment selesai dipasang melalui **2.4.1 Installation** dan dinyatakan lolos pengujian pada **2.4.2 Acceptance Test**, item tersebut dapat diregistrasikan sebagai aset resmi di dalam sistem EAM.

Pada tahap ini, item yang sebelumnya masih dianggap sebagai hasil pengadaan atau equipment terpasang akan berubah menjadi **asset master data** yang memiliki identitas aset, kode aset, lokasi operasional, status operasional, kategori aset, nilai awal, dan informasi teknis.

Dalam konteks ERP/EAM, Asset Registration adalah titik transisi penting dari:

```text
Installed & Accepted Item
        ↓
Registered Asset
        ↓
Operational Asset
```

Asset Registration juga menjadi dasar untuk proses berikutnya di modul EAM, seperti maintenance, inspection, asset movement, depreciation, disposal, dan reporting.

---

## 3. Objective

Tujuan submodul Asset Registration:

- Mendaftarkan item yang sudah accepted menjadi master data aset.
- Membuat kode aset unik untuk setiap item/equipment.
- Menyimpan informasi teknis, lokasi, kategori, dan ownership aset.
- Menghubungkan aset dengan dokumen sebelumnya: Plan, BoQ, PR, WBS, PO, DO, Installation, Acceptance Test.
- Menentukan status awal aset, misalnya Active, Standby, Under Warranty, atau Pending Operational.
- Menyediakan data awal untuk proses maintenance dan lifecycle management.
- Menjaga audit trail aset sejak perencanaan sampai menjadi aset aktif.

---

## 4. End-to-End Business Flow

```text
2.2.1 Plan & Design
      ↓
2.2.2 Create BoQ
      ↓
2.2.3 Purchase Request
      ↓
2.3.1 WBS Assignment
      ↓
2.3.2 Purchase Order
      ↓
2.3.3 Delivery Order
      ↓
2.4.1 Installation
      ↓
2.4.2 Acceptance Test
      ↓
2.4.3 Asset Registration
      ↓
Asset Master Data
      ↓
Maintenance / Inspection / Lifecycle Management
```

---

## 5. Asset Registration Business Logic

Asset Registration hanya dapat dilakukan jika:

- Acceptance Test sudah berstatus **Accepted**, **Accepted with Notes**, atau **Partial Accepted**.
- Item memiliki status eligible for asset registration.
- Item belum pernah diregistrasikan sebagai aset.
- Item memiliki serial number jika kategori aset membutuhkan serial tracking.
- Item memiliki lokasi aset.
- Item memiliki reference ke Installation dan Acceptance Test.
- Data item dapat ditelusuri sampai ke DO, PO, PR, BoQ, dan Plan.

Asset Registration dapat menghasilkan beberapa status aset:

1. **Active**  
   Aset sudah siap digunakan secara operasional.

2. **Standby**  
   Aset sudah terdaftar, tetapi belum digunakan aktif.

3. **Under Warranty**  
   Aset aktif dan masih dalam masa garansi vendor.

4. **Pending Operational**  
   Aset sudah terdaftar, tetapi masih menunggu administrasi atau assignment akhir.

5. **Inactive**  
   Aset terdaftar tetapi belum dapat digunakan.

---

## 6. High Level Flow Asset Registration

```text
User membuka Asset Registration
      ↓
User klik Create Asset Registration
      ↓
User memilih Acceptance Test No
      ↓
Sistem auto-load item yang Accepted / Eligible
      ↓
User memilih item yang akan diregistrasikan
      ↓
Sistem generate Asset Code
      ↓
User mengisi master data aset
      ↓
User mengisi lokasi, kategori, ownership, warranty, dan technical data
      ↓
User submit registration
      ↓
Sistem membuat Asset Master
      ↓
Aset siap masuk modul maintenance/lifecycle
```

---

## 7. Flow Detail

### 7.1 Create Asset Registration

User membuat dokumen registrasi aset baru berdasarkan dokumen Acceptance Test.

System behavior:

- Auto-generate Asset Registration No.
- Auto-load Acceptance Test detail.
- Auto-load Installation, WBS, DO, PO, PR, BoQ, dan Plan reference.
- Auto-load item yang eligible untuk registrasi.
- Set status dokumen menjadi **Draft**.

### 7.2 Select Accepted Item

User memilih item yang akan diregistrasikan sebagai aset.

Rules:

- Hanya item dengan status **Pass** atau **Accepted with Notes** yang dapat dipilih.
- Item dengan status **Fail**, **Rejected**, atau **Retest Required** tidak boleh dipilih.
- Item yang sudah memiliki Asset Code tidak boleh didaftarkan ulang.
- Untuk item quantity lebih dari 1, sistem harus mendukung pemecahan menjadi beberapa asset record.

Contoh:

```text
Qty Accepted: 2 Unit Cooling Water Pump
Output:
- AST-2026-MCH-0001 Cooling Water Pump Serial PMP-KLD-2026-0001
- AST-2026-MCH-0002 Cooling Water Pump Serial PMP-KLD-2026-0002
```

### 7.3 Generate Asset Code

Sistem membuat kode aset secara otomatis.

Contoh format:

```text
AST-[YEAR]-[CATEGORY]-[RUNNING_NUMBER]
AST-2026-MCH-0001
AST-2026-NAV-0002
AST-2026-ELC-0003
```

Format kode dapat disesuaikan untuk kebutuhan PELNI.

### 7.4 Complete Asset Master Data

User melengkapi data aset:

- Asset Code
- Asset Name
- Asset Category
- Asset Class
- Location
- Vessel/Unit/Office
- Department/Owner
- Acquisition Date
- Acceptance Date
- Warranty Start Date
- Warranty End Date
- Vendor
- Serial Number
- Manufacturer
- Model
- Specification
- Initial Status
- Criticality Level

### 7.5 Validate Registration

Sistem melakukan validasi:

- Asset Code harus unik.
- Serial number tidak boleh duplikat untuk serialized item.
- Asset Category wajib dipilih.
- Location wajib diisi.
- Acceptance Test harus valid.
- Item belum pernah diregistrasikan.

### 7.6 Submit Asset Registration

Setelah valid, user submit dokumen.

System behavior:

- Status dokumen berubah menjadi **Registered**.
- Asset Master Data terbentuk.
- Item dari Acceptance Test berubah status menjadi **Registered as Asset**.
- Aset dapat digunakan oleh modul berikutnya.

---

## 8. Input – Process – Output

---

## 8.1 Input

### 8.1.1 Document Reference Input

| Input | Source | Description |
|---|---|---|
| Asset Registration No | System | Nomor dokumen registrasi otomatis |
| Acceptance Test No | 2.4.2 Acceptance Test | Referensi hasil acceptance |
| Installation No | 2.4.1 Installation | Referensi pemasangan |
| WBS Code | WBS Assignment | Kode pekerjaan/proyek |
| Delivery Order No | Delivery Order | Referensi penerimaan barang |
| Purchase Order No | Purchase Order | Referensi pembelian |
| Purchase Request No | Purchase Request | Referensi permintaan |
| BoQ No | Create BoQ | Referensi kebutuhan dan spesifikasi |
| Plan No | Plan & Design | Referensi rencana awal |

### 8.1.2 Header Input

| Input | Type | Required | Description |
|---|---|---|---|
| Registration Date | Date Picker | Yes | Tanggal registrasi aset |
| Asset Owner Department | Dropdown | Yes | Department pemilik aset |
| Asset Location | Dropdown/Text | Yes | Lokasi aset |
| Vessel/Unit/Office | Dropdown | Yes | Kapal/unit/kantor |
| Registered By | Dropdown/Text | Yes | User yang melakukan registrasi |
| Status | Auto | Yes | Draft/Registered/Cancelled |
| Notes | Textarea | Optional | Catatan registrasi |

### 8.1.3 Asset Master Input

| Input | Type | Required | Description |
|---|---|---|---|
| Asset Code | Auto/Text | Yes | Kode aset unik |
| Asset Name | Text | Yes | Nama aset |
| Asset Category | Dropdown | Yes | Kategori aset |
| Asset Class | Dropdown | Optional | Kelas aset |
| Parent Asset | Dropdown | Optional | Parent asset jika struktur hierarchy |
| Serial Number | Text | Conditional | Wajib untuk serialized item |
| Manufacturer | Text | Optional | Pabrikan |
| Model | Text | Optional | Model aset |
| Specification | Textarea | Optional | Spesifikasi teknis |
| Criticality Level | Dropdown | Yes | Low/Medium/High/Critical |
| Asset Status | Dropdown | Yes | Active/Standby/Pending Operational |

### 8.1.4 Financial & Warranty Input

| Input | Type | Required | Description |
|---|---|---|---|
| Acquisition Date | Date Picker | Optional | Tanggal perolehan |
| Acquisition Value | Currency | Optional | Nilai perolehan aset |
| Vendor | Text | Auto/Optional | Vendor dari PO |
| Warranty Start Date | Date Picker | Optional | Awal garansi |
| Warranty End Date | Date Picker | Optional | Akhir garansi |
| Depreciation Method | Dropdown | Optional | Untuk integrasi future finance |
| Useful Life | Number | Optional | Umur manfaat aset |

### 8.1.5 Technical Input

| Input | Type | Required | Description |
|---|---|---|---|
| Technical Specification | Textarea | Optional | Detail teknis |
| Capacity | Text | Optional | Kapasitas aset |
| Power Rating | Text | Optional | Daya/rating |
| Material | Text | Optional | Material |
| Dimension | Text | Optional | Dimensi |
| Operational Parameter | Textarea | Optional | Parameter operasional |

### 8.1.6 Documentation Input

| Input | Type | Description |
|---|---|---|
| Acceptance Report | File Reference | Dari Acceptance Test |
| Installation Photo | File Reference | Dari Installation |
| Asset Photo | File Upload Mockup | Foto aset final |
| Warranty Document | File Upload Mockup | Dokumen garansi |
| Manual Book | File Upload Mockup | Manual book |
| Supporting Document | File Upload Mockup | Dokumen pendukung |

---

## 8.2 Process

### 8.2.1 Validate Acceptance Test

System melakukan validasi:

- Acceptance Test harus Accepted, Accepted with Notes, atau Partial Accepted.
- Item harus eligible for asset registration.
- Item belum pernah didaftarkan.
- Data reference dokumen harus lengkap.

### 8.2.2 Auto Load Eligible Items

System menampilkan item eligible:

- Item Code
- Item Name
- Serial Number
- Specification
- Accepted Date
- Location
- Installation Point
- Vendor
- PO Reference

### 8.2.3 Generate Asset Code

System membuat Asset Code otomatis berdasarkan aturan:

```text
AST-[YEAR]-[CATEGORY_CODE]-[RUNNING_NUMBER]
```

Contoh:

```text
AST-2026-MCH-0001
```

Untuk demo, Asset Code dapat digenerate secara dummy saat item dipilih.

### 8.2.4 Create Asset Master Draft

System membuat draft asset master berdasarkan data Acceptance Test.

Auto-filled fields:

- Asset Name dari Item Name
- Specification dari BoQ/PO
- Vendor dari PO
- Location dari Installation
- Acceptance Date dari Acceptance Test
- Serial Number dari Installation/Acceptance
- Installation Point dari Installation

### 8.2.5 User Completes Asset Data

User melengkapi:

- Asset Category
- Asset Class
- Owner Department
- Criticality Level
- Asset Status
- Warranty information
- Technical details
- Documentation

### 8.2.6 Validate Asset Master

System melakukan validasi:

| Validation | Description |
|---|---|
| Unique Asset Code | Asset Code tidak boleh sama |
| Unique Serial Number | Serial number tidak boleh duplikat |
| Required Category | Asset Category wajib dipilih |
| Required Location | Lokasi wajib diisi |
| Required Owner | Department pemilik wajib dipilih |
| Required Criticality | Criticality wajib dipilih |
| Eligible Item | Item harus accepted |

### 8.2.7 Submit Registration

Jika validasi berhasil:

- Asset Registration status menjadi **Registered**.
- Asset Master dibuat.
- Item status menjadi **Registered as Asset**.
- Data siap digunakan di modul maintenance dan lifecycle management.

---

## 8.3 Output

### 8.3.1 Asset Registration Document

Dokumen registrasi aset berisi:

- Asset Registration No
- Acceptance Test No
- Installation No
- WBS Code
- Registration Date
- Registered By
- Location
- Owner Department
- Status
- List asset yang dibuat

### 8.3.2 Asset Master Data

Output utama berupa asset master:

- Asset Code
- Asset Name
- Asset Category
- Asset Class
- Serial Number
- Location
- Owner Department
- Vendor
- Manufacturer
- Model
- Specification
- Criticality Level
- Asset Status
- Warranty Period
- Acquisition Info

### 8.3.3 Asset Traceability

Setiap asset memiliki traceability ke:

```text
Plan → BoQ → PR → WBS → PO → DO → Installation → Acceptance Test → Asset Registration
```

### 8.3.4 Data for Next Process

Data yang siap digunakan oleh modul berikutnya:

- Preventive Maintenance
- Corrective Maintenance
- Inspection
- Asset Movement
- Asset History
- Asset Depreciation
- Asset Disposal

---

# PART B – PRD UI/UX

---

## 9. Scope Tahap 1 – UI Frontend Demo

Fokus tahap ini adalah membuat UI demo menggunakan dummy data.

### Included

- Asset Registration List Page
- Create Asset Registration Page
- Asset Registration Detail Page
- Edit Asset Registration Page
- Dummy data Acceptance Test
- Dummy eligible accepted items
- Asset master form
- Auto-generate Asset Code dummy
- Asset category selection
- Location and ownership form
- Warranty and technical data form
- Documentation upload mockup
- Reference flow timeline
- Activity log
- SAP Business One inspired layout

### Excluded

- Backend API asli
- Database asli
- File upload sungguhan
- Financial posting asli
- Depreciation calculation asli
- Integration ke maintenance asli
- QR code/barcode asset asli

---

## 10. User Roles

| Role | Access |
|---|---|
| Asset Admin | Create, edit, submit asset registration |
| Admin Project | View and create registration from accepted item |
| Supervisor | Review registration |
| Maintenance Planner | View registered asset |
| Finance User | View acquisition data |
| Viewer | View only |

---

## 11. Menu Structure

```text
EAM
 └── 2.4 Pemasangan
      ├── 2.4.1 Installation
      ├── 2.4.2 Acceptance Test
      └── 2.4.3 Asset Registration
```

---

## 12. UI/UX Design Reference

UI wajib mengacu pada **SAP Business One**:

- Clean enterprise interface.
- Header document area di bagian atas.
- Data entry form menggunakan grid.
- Table detail asset di bawah header.
- Tab panel untuk detail tambahan.
- Status badge compact.
- Sidebar navigation.
- Breadcrumb.
- Action button konsisten.
- Warna netral dan profesional.
- Form tidak terlalu dekoratif.
- Fokus pada kecepatan input dan keterbacaan data.

---

## 13. Page 1 – Asset Registration List

### 13.1 Purpose

Menampilkan daftar dokumen Asset Registration.

### 13.2 Layout

```text
 ------------------------------------------------------------------
| EAM / Pemasangan / Asset Registration              [+ Create]    |
 ------------------------------------------------------------------
| Search | Filter Status | Filter Category | Filter Location | Date |
 ------------------------------------------------------------------
| Reg No | AT No | Asset Code | Asset Name | Location | Status     |
 ------------------------------------------------------------------
```

### 13.3 Components

- Sidebar navigation
- Breadcrumb
- Page title
- Create Asset Registration button
- Search input
- Filter status
- Filter asset category
- Filter location
- Date range filter
- Data table
- Pagination
- Status badge
- Row action dropdown

### 13.4 Table Columns

| Column | Description |
|---|---|
| Asset Registration No | Nomor dokumen registrasi |
| Acceptance Test No | Referensi acceptance |
| Installation No | Referensi installation |
| Asset Code | Kode aset |
| Asset Name | Nama aset |
| Asset Category | Kategori aset |
| Location | Lokasi aset |
| Owner Department | Pemilik aset |
| Asset Status | Active/Standby/Pending |
| Registration Status | Draft/Registered/Cancelled |
| Action | View/Edit |

---

## 14. Page 2 – Create Asset Registration

### 14.1 Purpose

Membuat dokumen registrasi aset berdasarkan Acceptance Test.

### 14.2 Header Section

| Field | Type | Required | Behavior |
|---|---|---|---|
| Asset Registration No | Text | Auto | Auto generated |
| Acceptance Test No | Dropdown | Yes | Load accepted/partial accepted AT |
| Installation No | Text | Auto | Auto from AT |
| WBS Code | Text | Auto | Auto from AT |
| Registration Date | Date Picker | Yes | Default today |
| Registered By | Dropdown/Text | Yes | Dummy user |
| Owner Department | Dropdown | Yes | Required |
| Asset Location | Dropdown/Text | Yes | Auto from installation, editable |
| Vessel/Unit/Office | Dropdown | Yes | Auto from installation, editable |
| Status | Badge | Auto | Draft |

### 14.3 Header Layout Style

```text
 -----------------------------------------------------------------
| Asset Registration No: AR-2026-0001       Status: Draft         |
| Acceptance Test No    : AT-2026-0001      WBS: WBS-ENG-001      |
| Installation No       : INS-2026-0001     DO : DO-2026-0019     |
| Location              : KM Kelud - Engine Room                  |
| Owner Department      : Marine Engineering                      |
| Registration Date     : 27 Apr 2026                             |
 -----------------------------------------------------------------
```

---

## 15. Page 3 – Asset Registration Detail Tabs

Gunakan tab panel:

1. Eligible Items
2. Asset Master
3. Location & Ownership
4. Warranty & Financial
5. Technical Data
6. Documentation
7. Reference Flow
8. Activity Log

---

## 16. Tab 1 – Eligible Items

### 16.1 Purpose

Menampilkan item dari Acceptance Test yang eligible untuk didaftarkan sebagai aset.

### 16.2 Table Columns

| Column | Type | Editable | Description |
|---|---|---|---|
| Select | Checkbox | Yes | Pilih item untuk registrasi |
| Item Code | Text | No | Dari Acceptance Test |
| Item Name | Text | No | Dari Acceptance Test |
| Specification | Text | No | Dari BoQ/PO |
| Serial Number | Text | No/Edit Optional | Dari Acceptance |
| Qty Accepted | Number | No | Qty accepted |
| Installation Point | Text | No | Titik pemasangan |
| Test Result | Badge | No | Pass/Accepted with Notes |
| Registration Status | Badge | Auto | Not Registered/Registered |
| Generated Asset Code | Text | Auto | Terisi saat generate |

### 16.3 Rules

- Hanya item eligible yang muncul.
- Item yang sudah registered tidak dapat dipilih.
- Jika Qty Accepted > 1, UI harus menyediakan tombol **Split to Multiple Assets** secara mockup.
- Asset Code dapat digenerate setelah item dipilih.

---

## 17. Tab 2 – Asset Master

### 17.1 Purpose

Mengisi data utama master aset.

### 17.2 Fields

| Field | Type | Required |
|---|---|---|
| Asset Code | Text/Auto | Yes |
| Asset Name | Text | Yes |
| Asset Category | Dropdown | Yes |
| Asset Class | Dropdown | Optional |
| Parent Asset | Dropdown | Optional |
| Serial Number | Text | Conditional |
| Manufacturer | Text | Optional |
| Model | Text | Optional |
| Specification | Textarea | Optional |
| Criticality Level | Dropdown | Yes |
| Asset Status | Dropdown | Yes |

### 17.3 Asset Category Options Dummy

- Machinery
- Navigation Equipment
- Electrical Equipment
- Safety Equipment
- IT Equipment
- Vessel Component
- Building Facility
- Supporting Equipment

### 17.4 Criticality Level Options

- Low
- Medium
- High
- Critical

### 17.5 Asset Status Options

- Active
- Standby
- Under Warranty
- Pending Operational
- Inactive

---

## 18. Tab 3 – Location & Ownership

### 18.1 Purpose

Menentukan lokasi dan kepemilikan operasional aset.

### 18.2 Fields

| Field | Type | Required |
|---|---|---|
| Vessel/Unit/Office | Dropdown | Yes |
| Main Location | Dropdown/Text | Yes |
| Sub Location | Text | Optional |
| Installation Point | Text | Optional |
| Owner Department | Dropdown | Yes |
| Responsible Person | Dropdown | Optional |
| Cost Center | Dropdown | Optional |
| WBS Code | Text | Auto |

### 18.3 UI Notes

- Tampilkan location hierarchy dalam bentuk small card.
- Contoh:
  ```text
  KM Kelud > Engine Room > Port Side > Pump Base
  ```

---

## 19. Tab 4 – Warranty & Financial

### 19.1 Purpose

Mengisi informasi vendor, garansi, dan nilai awal aset.

### 19.2 Fields

| Field | Type | Required |
|---|---|---|
| Vendor | Text | Auto/Optional |
| Purchase Order No | Text | Auto |
| Acquisition Date | Date Picker | Optional |
| Acquisition Value | Currency | Optional |
| Warranty Start Date | Date Picker | Optional |
| Warranty End Date | Date Picker | Optional |
| Warranty Provider | Text | Optional |
| Depreciation Method | Dropdown | Optional |
| Useful Life | Number | Optional |
| Residual Value | Currency | Optional |

### 19.3 Notes

Pada tahap frontend demo, financial field hanya sebagai tampilan dan input dummy. Tidak perlu kalkulasi depresiasi.

---

## 20. Tab 5 – Technical Data

### 20.1 Purpose

Menyimpan spesifikasi teknis aset.

### 20.2 Fields

| Field | Type | Required |
|---|---|---|
| Technical Specification | Textarea | Optional |
| Capacity | Text | Optional |
| Power Rating | Text | Optional |
| Material | Text | Optional |
| Dimension | Text | Optional |
| Weight | Text | Optional |
| Operational Parameter | Textarea | Optional |
| Maintenance Notes | Textarea | Optional |

---

## 21. Tab 6 – Documentation

### 21.1 Purpose

Mencatat dokumen pendukung aset.

### 21.2 Components

- Upload asset photo mockup
- Upload warranty document mockup
- Upload manual book mockup
- Upload supporting document mockup
- File preview dummy
- File list dummy
- Document notes textarea

### 21.3 Fields

| Field | Type |
|---|---|
| Asset Photo | File Upload |
| Warranty Document | File Upload |
| Manual Book | File Upload |
| Supporting Document | File Upload |
| Acceptance Report Reference | Read-only |
| Installation Photo Reference | Read-only |

---

## 22. Tab 7 – Reference Flow

### 22.1 Purpose

Menampilkan keterkaitan dokumen dari perencanaan sampai registrasi aset.

### 22.2 Display

```text
Plan & Design: PLN-2026-0007
      ↓
BoQ: BOQ-2026-0012
      ↓
Purchase Request: PR-2026-0018
      ↓
WBS Assignment: WBS-ENG-001
      ↓
Purchase Order: PO-2026-0022
      ↓
Delivery Order: DO-2026-0019
      ↓
Installation: INS-2026-0001
      ↓
Acceptance Test: AT-2026-0001
      ↓
Asset Registration: AR-2026-0001
      ↓
Asset Master: AST-2026-MCH-0001
```

### 22.3 UI Notes

- Gunakan horizontal stepper atau vertical timeline.
- Tampilkan dokumen sebagai card kecil.
- Gunakan badge status per dokumen.
- Asset Master ditampilkan sebagai output akhir.

---

## 23. Tab 8 – Activity Log

### 23.1 Purpose

Menampilkan histori aktivitas dokumen.

### 23.2 Example Log

| Time | User | Activity |
|---|---|---|
| 27 Apr 2026 09:00 | Asset Admin | Created Asset Registration draft |
| 27 Apr 2026 09:20 | Asset Admin | Generated Asset Code AST-2026-MCH-0001 |
| 27 Apr 2026 09:40 | Asset Admin | Completed asset master data |
| 27 Apr 2026 10:00 | Supervisor | Reviewed asset registration |
| 27 Apr 2026 10:15 | Asset Admin | Registered asset as Active |

---

## 24. Page 4 – Asset Registration Detail View

### 24.1 Purpose

Menampilkan dokumen Asset Registration dalam mode read-only.

### 24.2 Sections

- Header summary
- Status badge
- Reference document
- Asset master summary
- Location & ownership
- Warranty & financial summary
- Technical data
- Documentation preview
- Reference flow
- Activity log

### 24.3 Actions by Status

| Status | Available Actions |
|---|---|
| Draft | Edit, Delete Draft, Generate Asset Code |
| Ready to Register | Edit, Submit Registration |
| Registered | View Asset Master, Print Asset Card, Print Report |
| Cancelled | View Only |

---

## 25. Status Flow

```text
Draft
  ↓
Ready to Register
  ↓
Registered
  ↓
Asset Master Created
```

Alternative:

```text
Draft
  ↓
Cancelled
```

### Status Description

| Status | Description |
|---|---|
| Draft | Dokumen baru dibuat |
| Ready to Register | Data aset sudah lengkap |
| Registered | Aset sudah resmi terdaftar |
| Asset Master Created | Master aset sudah terbentuk |
| Cancelled | Registrasi dibatalkan |

---

## 26. Validation Rules

| Rule | Message |
|---|---|
| Acceptance Test wajib dipilih | Acceptance Test No is required |
| Acceptance Test belum accepted | Acceptance Test must be Accepted or Partial Accepted |
| Tidak ada eligible item | No eligible item for asset registration |
| Asset Code kosong | Asset Code is required |
| Asset Code duplikat | Asset Code must be unique |
| Asset Name kosong | Asset Name is required |
| Asset Category kosong | Asset Category is required |
| Location kosong | Asset Location is required |
| Owner Department kosong | Owner Department is required |
| Criticality kosong | Criticality Level is required |
| Serial number kosong untuk serialized asset | Serial Number is required |
| Item sudah registered | This item has already been registered as asset |

---

## 27. Dummy Data Requirement

### 27.1 Dummy Acceptance Test

```json
[
  {
    "id": "at-001",
    "acceptanceTestNo": "AT-2026-0001",
    "installationNo": "INS-2026-0001",
    "wbsCode": "WBS-ENG-001",
    "deliveryOrderNo": "DO-2026-0019",
    "purchaseOrderNo": "PO-2026-0022",
    "purchaseRequestNo": "PR-2026-0018",
    "boqNo": "BOQ-2026-0012",
    "planNo": "PLN-2026-0007",
    "location": "KM Kelud - Engine Room",
    "status": "Accepted",
    "acceptedDate": "2026-04-27"
  }
]
```

### 27.2 Dummy Eligible Items

```json
[
  {
    "itemCode": "EQP-PMP-001",
    "itemName": "Cooling Water Pump",
    "specification": "Marine Grade Pump 5.5 KW",
    "serialNumber": "PMP-KLD-2026-0001",
    "qtyAccepted": 1,
    "unit": "Unit",
    "installationPoint": "Engine Room - Port Side",
    "testResult": "Pass",
    "eligibleForAssetRegistration": true,
    "registrationStatus": "Not Registered",
    "generatedAssetCode": "AST-2026-MCH-0001"
  },
  {
    "itemCode": "ACC-BLT-004",
    "itemName": "Mounting Bolt Set",
    "specification": "Stainless Bolt Set M16",
    "serialNumber": "",
    "qtyAccepted": 4,
    "unit": "Set",
    "installationPoint": "Engine Room - Pump Base",
    "testResult": "Accepted with Notes",
    "eligibleForAssetRegistration": true,
    "registrationStatus": "Not Registered",
    "generatedAssetCode": "AST-2026-MCH-0002"
  }
]
```

### 27.3 Dummy Asset Master

```json
[
  {
    "assetCode": "AST-2026-MCH-0001",
    "assetName": "Cooling Water Pump",
    "assetCategory": "Machinery",
    "assetClass": "Pump System",
    "serialNumber": "PMP-KLD-2026-0001",
    "manufacturer": "MarineTech",
    "model": "MT-PMP-5.5KW",
    "location": "KM Kelud - Engine Room",
    "ownerDepartment": "Marine Engineering",
    "criticalityLevel": "High",
    "assetStatus": "Active",
    "vendor": "PT Marine Equipment Indonesia",
    "warrantyStartDate": "2026-04-27",
    "warrantyEndDate": "2027-04-27"
  }
]
```

---

## 28. Recommended Component Structure

```text
/app
 └── /eam
      └── /pemasangan
           └── /asset-registration
                ├── page.tsx
                ├── create/page.tsx
                ├── [id]/page.tsx
                └── [id]/edit/page.tsx

/components
 └── /eam
      └── /asset-registration
           ├── AssetRegistrationList.tsx
           ├── AssetRegistrationForm.tsx
           ├── AssetRegistrationHeader.tsx
           ├── EligibleItemsTable.tsx
           ├── AssetMasterTab.tsx
           ├── AssetLocationOwnershipTab.tsx
           ├── AssetWarrantyFinancialTab.tsx
           ├── AssetTechnicalDataTab.tsx
           ├── AssetDocumentationTab.tsx
           ├── AssetReferenceFlow.tsx
           ├── AssetActivityLog.tsx
           └── AssetRegistrationStatusBadge.tsx

/data
 └── asset-registration-dummy.ts
```

---

## 29. UI Components

### Required Components

- Sidebar navigation
- Breadcrumb
- Page header
- Search filter
- Data table
- Status badge
- Form input
- Select dropdown
- Date picker
- Currency input mockup
- Textarea
- Tabs
- Upload mockup component
- Summary card
- Timeline/stepper
- Asset master card
- Activity log
- Action buttons

---

## 30. Visual Design Guidelines

### 30.1 SAP Business One Inspired

Gunakan karakter UI:

- Enterprise clean layout
- Compact data density
- Table-first design
- Form grid rapi
- Header document summary
- Soft border
- Light grey background
- White content card
- Blue accent untuk primary action
- Status badge sederhana
- Tidak terlalu banyak animasi
- Fokus pada produktivitas user

### 30.2 Color Recommendation

| Purpose | Color |
|---|---|
| Primary Action | Blue |
| Draft | Grey |
| Ready to Register | Indigo |
| Registered | Green |
| Asset Master Created | Emerald |
| Cancelled | Red |
| Active Asset | Green |
| Standby Asset | Blue |
| Pending Operational | Orange |
| Inactive | Grey |

---

## 31. Button Specification

| Button | Location | Behavior |
|---|---|---|
| Create Asset Registration | List Page | Open create page |
| Generate Asset Code | Eligible Items Tab | Generate dummy asset code |
| Split to Multiple Assets | Eligible Items Tab | Mock split quantity > 1 |
| Save Draft | Form Page | Save dummy state |
| Validate Registration | Form Page | Run dummy validation |
| Submit Registration | Detail/Form | Set status Registered |
| View Asset Master | Detail Page | Show asset master summary |
| Print Asset Card | Detail Page | Mock print asset card |
| Print Report | Detail Page | Mock print report |
| Cancel | Form Page | Back to list |

---

## 32. Empty State

Jika belum ada data asset registration:

```text
No Asset Registration Data
Create asset registration based on accepted Acceptance Test.
[+ Create Asset Registration]
```

---

## 33. Error State

Contoh error:

```text
Selected Acceptance Test has no eligible item for asset registration.
Please select Acceptance Test with Accepted or Partial Accepted status.
```

---

## 34. Success State

Contoh success:

```text
Asset Registration has been saved successfully.
```

```text
Asset has been registered successfully and Asset Master has been created.
```

---

## 35. Future Backend API Contract

Tahap ini belum perlu backend, tetapi UI harus siap untuk API berikut:

### 35.1 List Asset Registration

```http
GET /api/asset-registrations
```

### 35.2 Detail Asset Registration

```http
GET /api/asset-registrations/:id
```

### 35.3 Create Asset Registration

```http
POST /api/asset-registrations
```

### 35.4 Update Asset Registration

```http
PUT /api/asset-registrations/:id
```

### 35.5 Generate Asset Code

```http
POST /api/asset-registrations/generate-asset-code
```

### 35.6 Submit Registration

```http
POST /api/asset-registrations/:id/submit
```

### 35.7 Get Asset Master

```http
GET /api/assets/:assetCode
```

---

## 36. Future Database Model

### 36.1 asset_registrations

```text
id
asset_registration_no
acceptance_test_id
installation_id
wbs_id
delivery_order_id
purchase_order_id
purchase_request_id
boq_id
plan_id
registration_date
registered_by
owner_department_id
asset_location
vessel_or_unit
status
notes
created_by
created_at
updated_at
```

### 36.2 asset_registration_items

```text
id
asset_registration_id
acceptance_test_item_id
item_id
item_code
item_name
specification
serial_number
qty_accepted
qty_registered
unit
installation_point
generated_asset_code
registration_status
created_at
updated_at
```

### 36.3 assets

```text
id
asset_code
asset_name
asset_category_id
asset_class_id
parent_asset_id
serial_number
manufacturer
model
specification
criticality_level
asset_status
location
sub_location
installation_point
vessel_or_unit
owner_department_id
responsible_person_id
cost_center_id
vendor_id
purchase_order_id
acceptance_test_id
installation_id
acquisition_date
acquisition_value
warranty_start_date
warranty_end_date
depreciation_method
useful_life
residual_value
created_at
updated_at
```

### 36.4 asset_documents

```text
id
asset_id
document_type
file_name
file_url
description
uploaded_by
uploaded_at
```

### 36.5 asset_registration_logs

```text
id
asset_registration_id
user_id
activity
description
created_at
```

---

## 37. Acceptance Criteria

### UI

- User dapat melihat daftar Asset Registration.
- User dapat membuat Asset Registration baru.
- User dapat memilih Acceptance Test yang Accepted atau Partial Accepted.
- Sistem menampilkan dummy item eligible dari Acceptance Test.
- User dapat memilih item untuk didaftarkan.
- User dapat generate Asset Code secara dummy.
- User dapat mengisi Asset Master.
- User dapat mengisi Location & Ownership.
- User dapat mengisi Warranty & Financial.
- User dapat mengisi Technical Data.
- User dapat melihat Reference Flow dari Plan sampai Asset Master.
- User dapat submit registration dan melihat status Registered.

### UX

- UI terlihat clean dan enterprise.
- Layout mengikuti gaya SAP Business One.
- Table mudah dibaca.
- Form asset master mudah dipahami.
- Status asset dan registration mudah dibedakan.
- Flow terasa tersambung dari Acceptance Test ke Asset Master.

### Data Flow

- Asset Registration harus terkait dengan Acceptance Test.
- Acceptance Test harus terkait dengan Installation.
- Installation harus terkait dengan Delivery Order.
- Delivery Order harus terkait dengan PO.
- PO harus terkait dengan PR.
- PR harus terkait dengan BoQ dan Plan.
- Asset Registration menghasilkan Asset Master Data.

---

## 38. Google AntiGravity Implementation Prompt

Gunakan instruksi berikut untuk generate UI:

```text
Build a Next.js + Tailwind CSS frontend demo for EAM PELNI module 2.4.3 Asset Registration.

Create an enterprise asset management UI inspired by SAP Business One. The design must be clean, compact, professional, table-based, and suitable for BUMN/government ERP users.

Create these pages:
1. Asset Registration List Page
2. Create Asset Registration Page
3. Asset Registration Detail Page
4. Edit Asset Registration Page

Use dummy data only. No backend integration yet.

The Asset Registration module must be connected visually and logically with previous modules:
- Plan & Design
- BoQ
- Purchase Request
- WBS Assignment
- Purchase Order
- Delivery Order
- Installation
- Acceptance Test

The Asset Registration form must load dummy Acceptance Test data and display eligible accepted item lines. User can select accepted items, generate asset code, complete asset master data, set category, location, owner department, warranty, financial info, technical data, and documentation mockup.

Use tab layout:
- Eligible Items
- Asset Master
- Location & Ownership
- Warranty & Financial
- Technical Data
- Documentation
- Reference Flow
- Activity Log

Use status badges:
- Draft
- Ready to Register
- Registered
- Asset Master Created
- Cancelled

Use asset status badges:
- Active
- Standby
- Under Warranty
- Pending Operational
- Inactive

Use sidebar navigation:
EAM > Pemasangan > Asset Registration

Add buttons:
- Create Asset Registration
- Generate Asset Code
- Split to Multiple Assets
- Save Draft
- Validate Registration
- Submit Registration
- View Asset Master
- Print Asset Card
- Print Report

Use SAP Business One style:
- Header document summary
- Grid form layout
- Data table
- White cards
- Light grey page background
- Blue primary actions
- Compact spacing
- Enterprise typography
- Status badges
- Reference flow timeline
- Asset master summary card

Prepare component structure under:
components/eam/asset-registration

Prepare dummy data under:
data/asset-registration-dummy.ts

Do not implement real API. But structure the code so it can be integrated later with REST API.
```

---

## 39. Next Module Recommendation

Setelah **2.4.3 Asset Registration** selesai, sistem sudah memiliki alur lengkap dari perencanaan sampai aset aktif.

Rekomendasi modul berikutnya:

```text
2.5 Maintenance / Pemeliharaan
```

Modul maintenance akan menggunakan output dari Asset Registration sebagai master asset untuk preventive maintenance, corrective maintenance, inspection, dan work order.
