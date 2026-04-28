# PRD UI/UX – 2.4.1 Installation
## EAM PELNI – Enterprise Asset Management System

---

## 1. Document Information

| Item | Description |
|---|---|
| Module | 2.4 Pemasangan |
| Submodule | 2.4.1 Installation |
| Project | EAM PELNI |
| Phase | Tahap 1 – UI Frontend Demo dengan Dummy Data |
| Output | PRD UI/UX untuk Google AntiGravity |
| Frontend Stack | Next.js, Tailwind CSS |
| UI Reference | SAP Business One Style |
| Backend Future Stack | Node.js, Prisma, PostgreSQL |
| Integration Future | REST API, JWT Auth |

---

## 2. Background

Submodul **Installation** digunakan untuk mencatat proses pemasangan barang, equipment, atau komponen aset yang sebelumnya sudah melewati proses perencanaan dan pengadaan.

Flow ini harus terhubung dengan modul sebelumnya:

1. **2.2 Perencanaan**
   - 2.2.1 Plan & Design
   - 2.2.2 Create BoQ
   - 2.2.3 Purchase Request

2. **2.3 Pengadaan**
   - 2.3.1 WBS Assignment
   - 2.3.2 Purchase Order
   - 2.3.3 Delivery Order

3. **2.4 Pemasangan**
   - 2.4.1 Installation
   - 2.4.2 Acceptance Test
   - 2.4.3 Asset Registration

Submodul Installation menjadi titik awal perubahan status dari **barang hasil pengadaan** menjadi **calon aset operasional** yang siap dilakukan acceptance test.

---

## 3. Objective

Tujuan utama submodul ini adalah:

- Menyediakan UI pencatatan pemasangan aset/barang berdasarkan Delivery Order.
- Memastikan item yang dipasang berasal dari dokumen pengadaan yang valid.
- Menyediakan informasi lokasi pemasangan, PIC, tanggal pemasangan, dan dokumentasi.
- Menyediakan data awal untuk proses **2.4.2 Acceptance Test**.
- Menjaga keterkaitan data dari Plan & Design, BoQ, PR, WBS, PO, hingga DO.
- Menyediakan tampilan demo UI yang clean, enterprise, dan mirip SAP Business One.

---

## 4. Scope Tahap 1 – UI Frontend Demo

Pada tahap ini fokus hanya pada frontend UI demo menggunakan dummy data.

### Included

- Installation List Page
- Create Installation Page
- Detail Installation Page
- Edit Installation Page
- Dummy data dari Delivery Order
- Dummy data WBS
- Dummy data item hasil pengadaan
- Status flow visual
- Upload documentation mockup
- Table item installation
- Summary panel
- SAP Business One style UI

### Excluded

- Backend API asli
- Database asli
- Authentication JWT
- Upload file sungguhan
- Approval engine asli
- Inventory posting asli
- Asset capitalization asli

---

## 5. Business Context

Dalam sistem EAM, proses Installation dilakukan setelah barang diterima melalui Delivery Order.

Contoh:

- Mesin bantu kapal sudah diterima dari vendor.
- Spare part atau equipment sudah sampai di gudang/lokasi.
- Tim teknis memasang equipment tersebut ke kapal atau lokasi kerja.
- Setelah pemasangan selesai, equipment belum langsung menjadi aset aktif.
- Equipment harus melalui proses **Acceptance Test** terlebih dahulu.
- Setelah acceptance test berhasil, data masuk ke **Asset Registration**.

---

## 6. Relationship with Previous Modules

### 6.1 From 2.2.1 Plan & Design

Data yang menjadi dasar:

- Project/Work plan
- Lokasi pekerjaan
- Rencana kebutuhan aset/equipment
- Scope pekerjaan

### 6.2 From 2.2.2 Create BoQ

Data yang menjadi dasar:

- Item yang direncanakan
- Quantity kebutuhan
- Spesifikasi teknis
- Estimasi biaya
- Referensi pekerjaan

### 6.3 From 2.2.3 Purchase Request

Data yang menjadi dasar:

- PR Number
- Requested item
- Approved quantity
- Requesting department
- Approval status

### 6.4 From 2.3.1 WBS Assignment

Data yang menjadi dasar:

- WBS Code
- Work package
- Cost center
- Project location
- Activity grouping

### 6.5 From 2.3.2 Purchase Order

Data yang menjadi dasar:

- PO Number
- Vendor
- Item detail
- Ordered quantity
- Unit price
- Delivery terms

### 6.6 From 2.3.3 Delivery Order

Data utama yang digunakan pada Installation:

- Delivery Order Number
- Received item
- Delivered quantity
- Serial number jika tersedia
- Warehouse/location penerimaan
- Delivery status

---

## 7. High Level Flow

```text
Plan & Design
   ↓
Create BoQ
   ↓
Purchase Request
   ↓
WBS Assignment
   ↓
Purchase Order
   ↓
Delivery Order
   ↓
Installation
   ↓
Acceptance Test
   ↓
Asset Registration
```

---

## 8. Input – Process – Output

## 8.1 Input

### 8.1.1 Document Reference

| Input | Source | Description |
|---|---|---|
| Installation No | System | Nomor dokumen otomatis |
| WBS Code | WBS Assignment | Kode pekerjaan/proyek |
| Delivery Order No | Delivery Order | Referensi barang yang sudah diterima |
| Purchase Order No | Purchase Order | Referensi PO asal |
| PR No | Purchase Request | Referensi permintaan awal |
| BoQ Ref | Create BoQ | Referensi detail kebutuhan |
| Plan Ref | Plan & Design | Referensi rencana kerja |

### 8.1.2 Installation Header

| Input | Type | Required | Description |
|---|---|---|---|
| Installation Date | Date Picker | Yes | Tanggal pemasangan |
| Installation Location | Text / Dropdown | Yes | Lokasi pemasangan aset |
| Vessel / Unit / Office | Dropdown | Yes | Kapal/unit/kantor tujuan |
| PIC Technician | Dropdown | Yes | Teknisi/PIC pemasangan |
| Supervisor | Dropdown | Optional | Supervisor validasi |
| Status | Auto | Yes | Draft/In Progress/Partial/Completed |
| Notes | Textarea | Optional | Catatan umum pemasangan |

### 8.1.3 Installation Items

| Input | Source | Description |
|---|---|---|
| Item Code | Delivery Order | Kode barang |
| Item Name | Delivery Order | Nama barang |
| Specification | BoQ / PO | Spesifikasi teknis |
| Qty Delivered | Delivery Order | Jumlah diterima |
| Qty Installed | User Input | Jumlah dipasang |
| Unit | Delivery Order | Satuan |
| Serial Number | DO/User Input | Nomor seri jika ada |
| Installation Point | User Input | Titik pemasangan detail |
| Item Notes | User Input | Catatan per item |

### 8.1.4 Documentation

| Input | Type | Description |
|---|---|---|
| Before Photo | File Upload Mockup | Foto sebelum pemasangan |
| After Photo | File Upload Mockup | Foto setelah pemasangan |
| Supporting Document | File Upload Mockup | Dokumen tambahan |
| Technical Notes | Textarea | Catatan teknis |

---

## 8.2 Process

### 8.2.1 Create Installation Document

User membuat dokumen Installation baru dengan memilih WBS dan Delivery Order.

System behavior:

- Auto-generate Installation Number.
- Auto-load Delivery Order detail.
- Auto-load linked PO, PR, BoQ, dan Plan reference.
- Set status awal sebagai **Draft**.

### 8.2.2 Validate Delivery Order

Sistem melakukan validasi dummy:

- Delivery Order harus berstatus **Delivered** atau **Received**.
- Item harus memiliki quantity yang masih bisa dipasang.
- Qty Installed tidak boleh lebih besar dari Qty Delivered.
- WBS harus aktif dan valid.

### 8.2.3 Assign Installation Team

User mengisi:

- PIC Technician
- Supervisor
- Installation Date
- Installation Location
- Vessel/Unit/Office

Status dapat berubah dari **Draft** menjadi **Scheduled** atau **In Progress**.

### 8.2.4 Input Installation Realization

User mengisi realisasi pemasangan:

- Qty Installed
- Serial Number
- Installation Point
- Notes
- Documentation

Sistem menghitung:

```text
Remaining Qty = Qty Delivered - Total Qty Installed
```

### 8.2.5 Installation Status Calculation

Status dokumen dihitung berdasarkan kondisi item:

| Condition | Status |
|---|---|
| Belum ada item dipasang | Draft |
| Sebagian item mulai dipasang | In Progress |
| Sebagian item selesai dipasang | Partial |
| Semua item selesai dipasang | Completed |

### 8.2.6 Submit for Acceptance Test

Jika status sudah **Completed** atau **Partial Completed**, user dapat mengirim data ke proses **2.4.2 Acceptance Test**.

System behavior:

- Menandai item sebagai **Installed – Waiting Acceptance Test**.
- Membuat reference untuk Acceptance Test.
- Data tidak langsung menjadi asset aktif.

---

## 8.3 Output

### 8.3.1 Installation Document

Output utama berupa dokumen pemasangan dengan informasi:

- Installation No
- WBS Code
- Delivery Order No
- PO No
- Installation Date
- Location
- PIC
- Status
- List item terpasang
- Dokumentasi

### 8.3.2 Installation Report

Laporan pemasangan berisi:

- Ringkasan pekerjaan
- Detail item
- Qty delivered vs qty installed
- Lokasi pemasangan
- PIC dan supervisor
- Foto dokumentasi
- Catatan teknis

### 8.3.3 Status Update

Output status:

- Item berubah menjadi **Installed**
- Item siap masuk ke **Acceptance Test**
- Jika partial, remaining qty tetap tercatat

### 8.3.4 Data for Next Module

Data yang dikirim ke **2.4.2 Acceptance Test**:

- Installation No
- Installed Item
- Serial Number
- Location
- PIC
- Documentation
- Technical Notes

---

## 9. User Roles

| Role | Access |
|---|---|
| Admin Project | Create, edit, view, submit |
| PIC Technician | Update installation realization |
| Supervisor | Review, validate, approve |
| Viewer | View only |

---

## 10. Menu Structure

```text
EAM
 └── 2.4 Pemasangan
      ├── 2.4.1 Installation
      ├── 2.4.2 Acceptance Test
      └── 2.4.3 Asset Registration
```

---

## 11. UI/UX Design Reference

Desain UI/UX wajib mengacu pada tampilan **SAP Business One**:

- Clean enterprise layout
- Header document area di bagian atas
- Form field dalam grid rapi
- Table detail item di bawah header
- Tab panel untuk detail tambahan
- Status badge sederhana
- Sidebar navigation
- Action button konsisten di kanan atas/bawah
- Banyak whitespace
- Warna netral: putih, abu muda, biru enterprise
- Tidak menggunakan desain terlalu dekoratif
- Fokus pada data entry yang cepat dan mudah dibaca

---

## 12. Page 1 – Installation List

### 12.1 Purpose

Menampilkan daftar dokumen Installation yang sudah dibuat.

### 12.2 Layout

```text
 -----------------------------------------------------
| EAM / Pemasangan / Installation          [+ Create] |
 -----------------------------------------------------
| Search | Filter Status | Filter WBS | Date Range    |
 -----------------------------------------------------
| Installation No | WBS | DO No | Location | PIC | Status |
 -----------------------------------------------------
```

### 12.3 Components

- Breadcrumb
- Page title
- Create button
- Search input
- Filter status
- Filter WBS
- Date range filter
- Data table
- Pagination
- Status badge
- Row action dropdown

### 12.4 Table Columns

| Column | Description |
|---|---|
| Installation No | Nomor dokumen installation |
| WBS Code | Kode WBS |
| Delivery Order No | Nomor DO |
| PO No | Nomor PO |
| Location | Lokasi pemasangan |
| Installation Date | Tanggal pemasangan |
| PIC | Teknisi/PIC |
| Status | Draft/In Progress/Partial/Completed |
| Action | View/Edit |

### 12.5 Actions

- Create Installation
- View Detail
- Edit Draft/In Progress
- Submit to Acceptance Test

---

## 13. Page 2 – Create Installation

### 13.1 Purpose

Membuat dokumen installation baru berdasarkan Delivery Order.

### 13.2 Header Section

| Field | Type | Required | Behavior |
|---|---|---|---|
| Installation No | Text | Auto | Auto generated |
| WBS Code | Dropdown | Yes | Load WBS dummy data |
| Delivery Order No | Dropdown | Yes | Filter by selected WBS |
| PO No | Text | Auto | Auto from DO |
| PR No | Text | Auto | Auto from PO/PR |
| BoQ Ref | Text | Auto | Auto from planning |
| Installation Date | Date Picker | Yes | Default today |
| Location | Dropdown/Text | Yes | Lokasi pemasangan |
| Vessel/Unit | Dropdown | Yes | Kapal/unit/kantor |
| PIC Technician | Dropdown | Yes | Dummy employee |
| Supervisor | Dropdown | Optional | Dummy employee |
| Status | Badge | Auto | Draft |

### 13.3 Header Layout Style

Gunakan layout seperti SAP B1:

```text
 -----------------------------------------------------
| Installation No: INS-2026-0001   Status: Draft      |
| WBS Code       : WBS-ENG-001     DO No : DO-00021   |
| PO No          : PO-00019        PR No : PR-00017   |
| Location       : KM Kelud        Date  : 27 Apr 2026|
 -----------------------------------------------------
```

---

## 14. Page 3 – Installation Detail Tabs

Gunakan tab panel:

1. Items
2. Assignment
3. Documentation
4. Reference Flow
5. Activity Log

---

## 15. Tab 1 – Items

### 15.1 Purpose

Menampilkan daftar item dari Delivery Order dan mengisi realisasi pemasangan.

### 15.2 Table Columns

| Column | Type | Editable | Description |
|---|---|---|---|
| Item Code | Text | No | Dari DO |
| Item Name | Text | No | Dari DO |
| Specification | Text | No | Dari BoQ/PO |
| Qty Delivered | Number | No | Dari DO |
| Qty Installed | Number | Yes | Input realisasi |
| Unit | Text | No | Satuan |
| Serial Number | Text | Yes | Optional/required for serialized item |
| Installation Point | Text | Yes | Titik pemasangan |
| Item Status | Badge | Auto | Pending/Installed/Partial |
| Notes | Textarea | Yes | Catatan item |

### 15.3 Item Rules

- Qty Installed tidak boleh lebih besar dari Qty Delivered.
- Qty Installed boleh lebih kecil dari Qty Delivered untuk partial installation.
- Jika item memiliki serial tracking, Serial Number wajib diisi.
- Minimal satu item harus memiliki Qty Installed > 0 sebelum submit.

---

## 16. Tab 2 – Assignment

### 16.1 Purpose

Mengatur tim dan jadwal pemasangan.

### 16.2 Fields

| Field | Type | Required |
|---|---|---|
| PIC Technician | Dropdown | Yes |
| Technician Team | Multi Select | Optional |
| Supervisor | Dropdown | Optional |
| Schedule Start Date | Date Picker | Optional |
| Schedule End Date | Date Picker | Optional |
| Actual Installation Date | Date Picker | Yes |
| Work Location | Text | Yes |
| Safety Notes | Textarea | Optional |

---

## 17. Tab 3 – Documentation

### 17.1 Purpose

Mencatat dokumentasi visual dan dokumen pendukung proses pemasangan.

### 17.2 Components

- Upload before photo mockup
- Upload after photo mockup
- Upload supporting document mockup
- Notes textarea
- Thumbnail preview dummy
- File list dummy

### 17.3 Fields

| Field | Type |
|---|---|
| Before Installation Photo | File Upload |
| After Installation Photo | File Upload |
| Supporting Document | File Upload |
| Technical Notes | Textarea |

---

## 18. Tab 4 – Reference Flow

### 18.1 Purpose

Menampilkan keterkaitan dokumen dari perencanaan sampai pengadaan.

### 18.2 Display

```text
Plan & Design: PLN-2026-0007
      ↓
BoQ: BOQ-2026-0012
      ↓
Purchase Request: PR-2026-0018
      ↓
WBS Assignment: WBS-ENG-004
      ↓
Purchase Order: PO-2026-0022
      ↓
Delivery Order: DO-2026-0019
      ↓
Installation: INS-2026-0001
```

### 18.3 UI Notes

- Gunakan vertical timeline atau horizontal stepper.
- Tiap dokumen dapat ditampilkan sebagai card kecil.
- Status tiap dokumen menggunakan badge.

---

## 19. Tab 5 – Activity Log

### 19.1 Purpose

Menampilkan histori aktivitas dokumen.

### 19.2 Example Log

| Time | User | Activity |
|---|---|---|
| 27 Apr 2026 09:00 | Admin Project | Created installation draft |
| 27 Apr 2026 10:15 | PIC Technician | Updated installed quantity |
| 27 Apr 2026 11:00 | Supervisor | Reviewed installation data |
| 27 Apr 2026 11:30 | Admin Project | Submitted to Acceptance Test |

---

## 20. Page 4 – Installation Detail View

### 20.1 Purpose

Menampilkan detail dokumen installation dalam mode read-only.

### 20.2 Sections

- Header summary
- Status badge
- Document reference
- Item table
- Documentation preview
- Activity log
- Action button

### 20.3 Actions by Status

| Status | Available Actions |
|---|---|
| Draft | Edit, Delete Draft, Start Installation |
| In Progress | Edit, Complete, Save Progress |
| Partial | Edit, Submit Partial to Acceptance Test |
| Completed | Submit to Acceptance Test, Print Report |
| Submitted | View Only |

---

## 21. Status Flow

```text
Draft
  ↓
Scheduled
  ↓
In Progress
  ↓
Partial / Completed
  ↓
Submitted to Acceptance Test
```

### Status Description

| Status | Description |
|---|---|
| Draft | Dokumen baru dibuat |
| Scheduled | Jadwal pemasangan sudah diisi |
| In Progress | Proses pemasangan sedang berjalan |
| Partial | Sebagian item sudah dipasang |
| Completed | Semua item sudah dipasang |
| Submitted | Sudah dikirim ke Acceptance Test |

---

## 22. Validation Rules

| Rule | Message |
|---|---|
| WBS wajib dipilih | WBS Code is required |
| DO wajib dipilih | Delivery Order is required |
| Installation Date wajib diisi | Installation Date is required |
| PIC wajib diisi | PIC Technician is required |
| Qty Installed > Qty Delivered | Qty Installed cannot exceed Qty Delivered |
| Tidak ada item dipasang | At least one item must be installed |
| Serial number kosong untuk serialized item | Serial Number is required for this item |
| DO belum delivered | Delivery Order must be delivered before installation |

---

## 23. Dummy Data Requirement

### 23.1 Dummy WBS

```json
[
  {
    "id": "wbs-001",
    "wbsCode": "WBS-ENG-001",
    "name": "Pemasangan Pompa Pendingin KM Kelud",
    "location": "KM Kelud - Engine Room",
    "status": "Active"
  },
  {
    "id": "wbs-002",
    "wbsCode": "WBS-NAV-002",
    "name": "Upgrade Sistem Navigasi KM Dobonsolo",
    "location": "KM Dobonsolo - Bridge Deck",
    "status": "Active"
  }
]
```

### 23.2 Dummy Delivery Order

```json
[
  {
    "id": "do-001",
    "doNo": "DO-2026-0019",
    "poNo": "PO-2026-0022",
    "prNo": "PR-2026-0018",
    "boqNo": "BOQ-2026-0012",
    "planNo": "PLN-2026-0007",
    "wbsCode": "WBS-ENG-001",
    "vendor": "PT Marine Equipment Indonesia",
    "status": "Delivered"
  }
]
```

### 23.3 Dummy Items

```json
[
  {
    "itemCode": "EQP-PMP-001",
    "itemName": "Cooling Water Pump",
    "specification": "Marine Grade Pump 5.5 KW",
    "qtyDelivered": 2,
    "qtyInstalled": 0,
    "unit": "Unit",
    "serialRequired": true,
    "serialNumber": "",
    "installationPoint": "Engine Room - Port Side",
    "status": "Pending"
  },
  {
    "itemCode": "ACC-BLT-004",
    "itemName": "Mounting Bolt Set",
    "specification": "Stainless Bolt Set M16",
    "qtyDelivered": 8,
    "qtyInstalled": 0,
    "unit": "Set",
    "serialRequired": false,
    "serialNumber": "",
    "installationPoint": "Engine Room - Pump Base",
    "status": "Pending"
  }
]
```

---

## 24. Recommended Component Structure

```text
/app
 └── /eam
      └── /pemasangan
           └── /installation
                ├── page.tsx
                ├── create/page.tsx
                ├── [id]/page.tsx
                └── [id]/edit/page.tsx

/components
 └── /eam
      └── /installation
           ├── InstallationList.tsx
           ├── InstallationForm.tsx
           ├── InstallationHeader.tsx
           ├── InstallationItemsTable.tsx
           ├── InstallationAssignmentTab.tsx
           ├── InstallationDocumentationTab.tsx
           ├── InstallationReferenceFlow.tsx
           ├── InstallationActivityLog.tsx
           └── InstallationStatusBadge.tsx

/data
 └── installation-dummy.ts
```

---

## 25. UI Components

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
- Textarea
- Tabs
- Upload mockup component
- Summary card
- Timeline/stepper
- Activity log
- Action buttons

---

## 26. Visual Design Guidelines

### 26.1 SAP Business One Inspired

Gunakan karakter UI seperti:

- Enterprise clean layout
- Compact data density
- Table-first design
- Form grid yang rapi
- Header document summary
- Soft border
- Light grey background
- White content card
- Blue accent untuk primary action
- Status badge sederhana
- Tidak terlalu banyak animasi
- Fokus pada produktivitas user

### 26.2 Color Recommendation

| Purpose | Color |
|---|---|
| Primary Action | Blue |
| Draft | Grey |
| Scheduled | Indigo |
| In Progress | Blue |
| Partial | Orange |
| Completed | Green |
| Error | Red |

### 26.3 Layout

- Sidebar kiri
- Content utama kanan
- Header page di atas
- Filter bar sebelum table
- Form header sebagai card
- Tab detail di bawah header
- Action button di kanan bawah atau kanan atas

---

## 27. Button Specification

| Button | Location | Behavior |
|---|---|---|
| Create Installation | List Page | Open create page |
| Save Draft | Form Page | Save dummy state |
| Start Installation | Detail/Form | Change status to In Progress |
| Complete Installation | Form Page | Validate and set Completed |
| Submit to Acceptance Test | Detail Page | Mark as Submitted |
| Cancel | Form Page | Back to list |
| Print Report | Detail Page | Mock print action |

---

## 28. Empty State

Jika belum ada data installation:

```text
No Installation Data
Create your first installation document based on Delivery Order.
[+ Create Installation]
```

---

## 29. Error State

Contoh error:

```text
Delivery Order is not eligible for installation.
Please select a Delivery Order with Delivered status.
```

---

## 30. Success State

Contoh success:

```text
Installation document has been saved successfully.
```

```text
Installation has been submitted to Acceptance Test.
```

---

## 31. Future Backend API Contract

Tahap ini belum perlu backend, tetapi struktur UI harus siap untuk API berikut:

### 31.1 List Installation

```http
GET /api/installations
```

### 31.2 Detail Installation

```http
GET /api/installations/:id
```

### 31.3 Create Installation

```http
POST /api/installations
```

### 31.4 Update Installation

```http
PUT /api/installations/:id
```

### 31.5 Submit to Acceptance Test

```http
POST /api/installations/:id/submit-acceptance-test
```

---

## 32. Future Database Model

### 32.1 installations

```text
id
installation_no
wbs_id
delivery_order_id
purchase_order_id
purchase_request_id
boq_id
plan_id
installation_date
location
vessel_or_unit
pic_technician_id
supervisor_id
status
notes
created_by
created_at
updated_at
```

### 32.2 installation_items

```text
id
installation_id
item_id
item_code
item_name
specification
qty_delivered
qty_installed
unit
serial_number
installation_point
status
notes
created_at
updated_at
```

### 32.3 installation_documents

```text
id
installation_id
document_type
file_name
file_url
description
uploaded_by
uploaded_at
```

### 32.4 installation_logs

```text
id
installation_id
user_id
activity
description
created_at
```

---

## 33. Acceptance Criteria

### UI

- User dapat melihat daftar Installation.
- User dapat membuat Installation baru.
- User dapat memilih WBS dan Delivery Order.
- Sistem menampilkan dummy item dari Delivery Order.
- User dapat mengisi qty installed.
- User dapat mengisi lokasi pemasangan.
- User dapat mengisi PIC teknisi.
- User dapat melihat reference flow dari Plan sampai Installation.
- User dapat melihat status dokumen.
- User dapat submit ke Acceptance Test secara dummy.

### UX

- UI terlihat clean dan enterprise.
- Layout mengikuti gaya SAP Business One.
- Table mudah dibaca.
- Form tidak terlalu ramai.
- Status mudah dipahami.
- Flow terasa terhubung dengan modul sebelumnya.

### Data Flow

- Installation harus terkait dengan Delivery Order.
- Delivery Order harus terkait dengan PO.
- PO harus terkait dengan PR.
- PR harus terkait dengan BoQ dan Plan.
- Installation menjadi input untuk Acceptance Test.

---

## 34. Google AntiGravity Implementation Prompt

Gunakan instruksi berikut untuk generate UI:

```text
Build a Next.js + Tailwind CSS frontend demo for EAM PELNI module 2.4.1 Installation.

Create an enterprise asset management UI inspired by SAP Business One. The design must be clean, compact, professional, table-based, and suitable for BUMN/government ERP users.

Create these pages:
1. Installation List Page
2. Create Installation Page
3. Installation Detail Page
4. Edit Installation Page

Use dummy data only. No backend integration yet.

The Installation module must be connected visually and logically with previous modules:
- Plan & Design
- BoQ
- Purchase Request
- WBS Assignment
- Purchase Order
- Delivery Order

The Installation form must load dummy Delivery Order data and display related item lines. User can input qty installed, serial number, installation point, notes, PIC technician, supervisor, date, location, and documentation mockup.

Use tab layout:
- Items
- Assignment
- Documentation
- Reference Flow
- Activity Log

Use status badges:
- Draft
- Scheduled
- In Progress
- Partial
- Completed
- Submitted

Use sidebar navigation:
EAM > Pemasangan > Installation

Add buttons:
- Create Installation
- Save Draft
- Start Installation
- Complete Installation
- Submit to Acceptance Test
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

Prepare component structure under:
components/eam/installation

Prepare dummy data under:
data/installation-dummy.ts

Do not implement real API. But structure the code so it can be integrated later with REST API.
```

---

## 35. Next Module

Setelah PRD UI/UX 2.4.1 Installation selesai, modul berikutnya adalah:

```text
2.4.2 Acceptance Test
```

Acceptance Test akan menggunakan output dari Installation sebagai input utama sebelum aset dapat masuk ke proses Asset Registration.
