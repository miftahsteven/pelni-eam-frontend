# PRD UI/UX EAM PELNI — 2.6.2 Replacement

**Project:** Enterprise Asset Management (EAM) PELNI  
**Module:** 2.6 Penghapusan  
**Submodule:** 2.6.2 Replacement  
**Output:** UI/UX Demo Frontend with Dummy Data  
**Target Tool:** Google Antigravity  
**Frontend Stack:** Next.js, Tailwind CSS  
**Backend Target Later:** Node.js, Prisma, PostgreSQL  
**Design Reference:** SAP Business One — clean enterprise layout, dominant data table, compact form, status badge, approval stepper, document detail panel, audit trail.

---

## 1. Tujuan Submodule

Submodule **2.6.2 Replacement** digunakan untuk mengelola proses penggantian aset lama dengan aset baru. Proses ini terjadi ketika aset lama sudah tidak layak digunakan, sering rusak, obsolete, hilang, atau biaya perbaikannya tidak ekonomis.

Replacement harus menjadi penghubung antara beberapa modul EAM sebelumnya, yaitu:

1. **2.4.3 Asset Registration** — sumber data master aset lama dan aset baru.
2. **2.5.1 Maintenance** — sumber rekomendasi teknis bahwa aset perlu diganti.
3. **2.5.2 Stock Opname** — sumber validasi fisik aset dan kondisi aktual.
4. **2.5.3 Asset Tracking** — sumber lokasi terakhir, PIC, dan histori pergerakan aset.
5. **2.3 Procurement** — jika aset pengganti perlu dibeli melalui PR, PO, dan DO.
6. **2.4 Installation** — jika aset baru perlu dipasang dan diuji sebelum menggantikan aset lama.
7. **2.6.3 Dismantle/Disposal** — aset lama yang sudah diganti dapat masuk ke proses disposal.

Submodule ini tidak boleh hanya menjadi form penggantian aset. Replacement harus menjaga jejak audit relasi:

```text
Old Asset → Replaced By → New Asset
```

---

## 2. Scope UI/UX Demo

PRD ini hanya untuk tahap pertama, yaitu **frontend UI demo dengan dummy data**.

Yang harus dibuat:

- Halaman list Replacement Request.
- Halaman create Replacement Request.
- Halaman detail Replacement Request.
- Panel histori maintenance aset lama.
- Panel hasil stock opname aset lama.
- Panel asset tracking/lokasi terakhir.
- Panel referensi procurement jika penggantian membutuhkan pembelian aset baru.
- Panel referensi installation jika aset baru perlu dipasang.
- Approval stepper.
- Status badge.
- Dummy data yang menggambarkan keterkaitan flow antar modul.

Yang belum wajib dibuat pada tahap ini:

- Backend API.
- Database persistence.
- Login/JWT.
- Real upload file.
- Real approval engine.
- Real accounting integration.

---

## 3. Business Context

Dalam alur EAM PELNI, replacement biasanya dipicu oleh salah satu kondisi berikut:

1. Hasil maintenance menyatakan aset rusak berat.
2. Biaya perbaikan aset lebih tinggi daripada nilai ekonomisnya.
3. Aset sudah obsolete dan tidak didukung lagi oleh vendor.
4. Hasil stock opname menyatakan aset tidak layak pakai.
5. Aset hilang dan perlu diganti.
6. Aset lama perlu diganti karena upgrade kebutuhan operasional.
7. Aset lama sudah melewati umur manfaat.

Replacement dapat dilakukan melalui dua pola:

### 3.1 Replace with Existing Asset

Aset lama diganti dengan aset lain yang sudah terdaftar di Asset Registration.

Contoh:

```text
Old Asset: GPS NAV-001 di Kapal A
New Asset: GPS NAV-009 dari gudang pusat
```

### 3.2 Replace with New Procurement

Aset lama diganti dengan aset baru yang harus melalui proses pengadaan.

Flow terkait:

```text
Replacement Request
↓
Purchase Request
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
↓
Replacement Completed
```

---

## 4. Analisis Flow Replacement

### 4.1 Main Flow

```text
Start
↓
User membuka menu 2.6 Penghapusan > Replacement
↓
Sistem menampilkan daftar Replacement Request
↓
User klik Create Replacement
↓
User memilih Old Asset dari Asset Master
↓
Sistem menampilkan data aset lama:
- asset code
- asset name
- category
- serial number
- location
- PIC
- status
- condition
- book value dummy
- last maintenance result
- last stock opname result
- last tracking location
↓
User memilih Replacement Type:
1. Replace with Existing Asset
2. Replace with New Procurement
↓
User mengisi alasan replacement dan rekomendasi teknis
↓
Jika Replace with Existing Asset:
    User memilih New Asset dari Asset Master
    Sistem validasi New Asset harus available/ready/registered
↓
Jika Replace with New Procurement:
    User memilih atau membuat referensi PR dummy
    Sistem menampilkan PR/PO/DO/Installation reference panel
↓
User upload/isi bukti pendukung dummy:
- foto aset
- dokumen teknis
- berita acara pemeriksaan
↓
User submit Replacement Request
↓
Status menjadi Submitted
↓
Approval teknis oleh Maintenance Team
↓
Approval Asset Manager
↓
Approval Finance
↓
Approval Management jika nilai aset tinggi
↓
Jika approved:
    Status old asset menjadi Waiting Replacement
↓
Jika aset baru sudah tersedia dan installation complete:
    Sistem membuat relasi Old Asset → New Asset
    Status old asset menjadi Replaced / Pending Disposal
    Status new asset menjadi Active
↓
End
```

---

### 4.2 Alternative Flow — Request Ditolak

```text
Replacement Request Submitted
↓
Reviewer memeriksa data
↓
Reviewer menemukan alasan tidak valid / dokumen kurang / aset masih layak pakai
↓
Request ditolak
↓
Status menjadi Rejected
↓
Requester melihat rejection note
↓
Requester dapat revise dan submit ulang
```

---

### 4.3 Alternative Flow — Menunggu Procurement

```text
Replacement Request Approved
↓
Replacement Type = New Procurement
↓
Belum ada PR/PO/DO
↓
Status menjadi Waiting Procurement
↓
User melihat procurement reference panel
↓
Setelah PR/PO/DO selesai dan aset diterima:
    Status menjadi Waiting Installation
↓
Setelah installation dan acceptance test selesai:
    Status menjadi Ready to Complete
↓
User complete replacement
```

---

### 4.4 Alternative Flow — Menunggu Disposal

```text
Replacement Completed
↓
Old Asset sudah tidak digunakan
↓
Status old asset menjadi Pending Disposal
↓
User dapat klik Create Disposal Request
↓
Sistem mengarahkan ke submodule 2.6.3 Dismantle/Disposal
```

---

## 5. Hubungan dengan Modul Lain

### 5.1 Relation to 2.5.1 Maintenance

Maintenance menjadi trigger utama replacement.

Data yang ditarik:

```text
Maintenance Work Order No
Maintenance Type
Technician
Failure Description
Repair Cost Estimation
Technical Recommendation
Last Maintenance Status
```

Contoh tampilan UI:

```text
Last Maintenance Result: Failed
Recommendation: Replace
Estimated Repair Cost: Rp 45.000.000
Reason: sparepart obsolete and vendor support ended
```

---

### 5.2 Relation to 2.5.2 Stock Opname

Stock opname menjadi validasi kondisi fisik aset.

Data yang ditarik:

```text
Stock Opname No
Physical Status
Actual Location
Condition Finding
Discrepancy Note
Evidence Photo
```

Contoh:

```text
Physical Status: Found
Condition: Heavy Damage
Actual Location: KM Kelud - Engine Room
Finding: corrosion on main unit
```

---

### 5.3 Relation to 2.5.3 Asset Tracking

Asset tracking memastikan aset lama berada di lokasi terakhir yang valid sebelum diganti.

Data yang ditarik:

```text
Current Location
Last Movement Date
Current PIC
Tracking History
Asset Position Status
```

Contoh:

```text
Current Location: Kapal KM Kelud - Engine Room
PIC: Chief Engineer
Last Movement: 2026-04-15
```

---

### 5.4 Relation to 2.3 Procurement

Jika replacement membutuhkan aset baru, maka submodule ini harus menampilkan referensi procurement.

Data yang ditarik:

```text
PR Number
PR Status
PO Number
PO Status
DO Number
Delivery Status
Vendor
Expected Delivery Date
```

Contoh:

```text
PR-2026-0021 → PO-2026-0088 → DO-2026-0043
Delivery Status: Delivered
```

---

### 5.5 Relation to 2.4 Installation & Asset Registration

Aset baru tidak boleh menggantikan aset lama sebelum proses installation dan acceptance test selesai.

Data yang ditarik:

```text
Installation No
Acceptance Test No
Acceptance Result
New Asset Code
New Asset Registration Status
```

Contoh:

```text
Installation: INST-2026-0041
Acceptance Test: Passed
New Asset: AST-NAV-009
Registration: Completed
```

---

### 5.6 Relation to 2.6.3 Dismantle/Disposal

Setelah aset lama berhasil diganti, status aset lama masuk ke **Pending Disposal**.

Data yang dikirim ke disposal:

```text
Old Asset Code
Replacement Request No
Replacement Completion Date
Old Asset Condition
Disposal Recommendation
```

---

## 6. Analisis Input - Proses - Output

### 6.1 Input

| Field | Description | Source |
|---|---|---|
| Replacement Request No | Nomor dokumen replacement | Auto generated |
| Request Date | Tanggal request | User/System |
| Requester | Pembuat request | User |
| Old Asset Code | Kode aset lama | Asset Registration |
| Old Asset Name | Nama aset lama | Asset Registration |
| Asset Category | Kategori aset | Asset Registration |
| Serial Number | Nomor seri aset | Asset Registration |
| Current Location | Lokasi terakhir | Asset Tracking |
| Current PIC | PIC aset saat ini | Asset Tracking |
| Asset Condition | Kondisi aset | Maintenance / Stock Opname |
| Last Maintenance No | Referensi maintenance terakhir | Maintenance |
| Last Stock Opname No | Referensi stock opname terakhir | Stock Opname |
| Replacement Reason | Alasan penggantian | User |
| Technical Recommendation | Rekomendasi teknis | Maintenance Team |
| Replacement Type | Existing Asset / New Procurement | User |
| New Asset Code | Kode aset pengganti jika sudah tersedia | Asset Registration |
| PR Reference | Referensi purchase request | Procurement |
| PO Reference | Referensi purchase order | Procurement |
| DO Reference | Referensi delivery order | Procurement |
| Installation Reference | Referensi pemasangan | Installation |
| Acceptance Test Reference | Referensi acceptance test | Acceptance Test |
| Supporting Document | Dokumen pendukung dummy | User |
| Photo Evidence | Foto bukti dummy | User |
| Approval Notes | Catatan approver | Approver |

---

### 6.2 Proses

| Process | Description |
|---|---|
| Validate Old Asset | Sistem memastikan aset lama terdaftar dan statusnya valid untuk diganti. |
| Pull Asset History | Sistem menampilkan histori maintenance, stock opname, dan tracking. |
| Validate Replacement Reason | Sistem memastikan alasan penggantian diisi dan sesuai kategori. |
| Determine Replacement Type | Sistem membedakan flow existing asset atau new procurement. |
| Validate New Asset | Jika existing asset, sistem memastikan aset pengganti available dan registered. |
| Link Procurement | Jika new procurement, sistem menampilkan PR/PO/DO reference. |
| Link Installation | Sistem memastikan aset baru sudah installation dan acceptance test jika diperlukan. |
| Approval Routing | Sistem menjalankan approval stepper: Maintenance, Asset Manager, Finance, Management. |
| Update Old Asset Status | Status aset lama berubah menjadi Waiting Replacement, Replaced, atau Pending Disposal. |
| Update New Asset Status | Status aset baru berubah menjadi Active setelah replacement selesai. |
| Create Asset Relation | Sistem menyimpan relasi Old Asset → New Asset. |
| Create Audit Trail | Sistem menyimpan riwayat perubahan, approval, dan dokumen. |

---

### 6.3 Output

| Output | Description |
|---|---|
| Replacement Request Number | Nomor dokumen replacement. |
| Replacement Status | Draft, Submitted, Under Review, Approved, Rejected, Waiting Procurement, Waiting Installation, Completed. |
| Old Asset Updated Status | Waiting Replacement, Replaced, Pending Disposal, Disposed. |
| New Asset Updated Status | Reserved, Installed, Active. |
| Replacement Relation | Relasi aset lama dan aset baru. |
| Approval Log | Catatan approval per level. |
| Procurement Reference | PR/PO/DO terkait jika ada. |
| Installation Reference | Installation dan acceptance test terkait jika ada. |
| Replacement History | Riwayat replacement untuk audit. |
| Disposal Recommendation | Rekomendasi lanjutan ke Dismantle/Disposal. |

---

## 7. Status Replacement

Gunakan status berikut dalam UI demo:

```text
Draft
Submitted
Technical Review
Asset Manager Review
Finance Review
Management Approval
Approved
Rejected
Waiting Procurement
Waiting Delivery
Waiting Installation
Ready to Complete
Completed
Pending Disposal
```

Status badge style:

- Draft: grey
- Submitted: blue
- Technical Review: amber
- Approved: green
- Rejected: red
- Waiting Procurement: purple
- Waiting Installation: orange
- Completed: green solid
- Pending Disposal: dark grey

Gunakan warna secara konsisten dengan modul sebelumnya dan tetap mengikuti kesan SAP B1 yang clean, tidak terlalu ramai.

---

## 8. Struktur Halaman UI

### 8.1 Replacement List Page

Path rekomendasi:

```text
/app/eam/penghapusan/replacement/page.tsx
```

Komponen utama:

1. Page Header
2. Summary Cards
3. Filter Bar
4. Replacement Request Table
5. Right Detail Preview Panel atau action dropdown

Layout:

```text
[Header: Replacement]
[Summary Cards: Total, Pending Approval, Waiting Procurement, Completed]
[Filter Bar]
[Dominant Table]
```

Kolom table:

| Column | Description |
|---|---|
| Request No | Nomor replacement |
| Old Asset | Kode dan nama aset lama |
| Current Location | Lokasi aset lama |
| Replacement Type | Existing Asset / New Procurement |
| New Asset | Aset pengganti jika ada |
| Reason | Alasan singkat |
| Requester | Pembuat request |
| Request Date | Tanggal request |
| Status | Badge status |
| Action | View/Edit/Approve |

Filter:

```text
Search by request no / asset code
Status
Replacement Type
Asset Category
Location
Date Range
Requester
```

---

### 8.2 Create Replacement Page

Path rekomendasi:

```text
/app/eam/penghapusan/replacement/create/page.tsx
```

Layout SAP B1 style:

```text
[Document Header]
[Old Asset Selection]
[Asset Context Panels]
[Replacement Information]
[Replacement Type Section]
[Supporting Evidence]
[Footer Action Buttons]
```

Section detail:

#### A. Document Header

Fields:

```text
Replacement Request No: Auto
Request Date
Requester
Department
Status: Draft
```

#### B. Old Asset Selection

Fields:

```text
Old Asset Code
Old Asset Name
Asset Category
Serial Number
Current Location
Current PIC
Current Status
Condition
```

Gunakan lookup modal/table untuk memilih aset.

#### C. Asset Context Panel

Tampilkan tiga panel kecil:

1. Maintenance Summary
2. Stock Opname Summary
3. Asset Tracking Summary

#### D. Replacement Information

Fields:

```text
Replacement Reason
Technical Recommendation
Urgency Level
Expected Replacement Date
Notes
```

Replacement Reason options:

```text
Heavy Damage
Obsolete
High Repair Cost
Lost Asset
Upgrade Requirement
End of Useful Life
Compliance Requirement
```

#### E. Replacement Type

Radio/card option:

```text
Replace with Existing Asset
Replace with New Procurement
```

Jika pilih Existing Asset:

```text
New Asset Code
New Asset Name
New Asset Location
New Asset Status
```

Jika pilih New Procurement:

```text
PR Reference
PO Reference
DO Reference
Expected Delivery Date
Vendor
Procurement Status
```

#### F. Installation Reference

Jika aset baru butuh pemasangan:

```text
Installation No
Acceptance Test No
Acceptance Result
Installation Status
```

#### G. Supporting Evidence

Dummy upload area:

```text
Technical Report
Asset Photo
Stock Opname Evidence
Approval Memo
```

Footer buttons:

```text
Save Draft
Submit Request
Cancel
```

---

### 8.3 Replacement Detail Page

Path rekomendasi:

```text
/app/eam/penghapusan/replacement/[id]/page.tsx
```

Layout:

```text
[Header + Status Badge]
[Document Summary]
[Approval Stepper]
[Tabs]
```

Tabs:

1. Overview
2. Old Asset
3. New Asset / Procurement
4. Maintenance History
5. Stock Opname
6. Tracking History
7. Approval Log
8. Documents
9. Audit Trail

#### Overview Tab

Tampilkan:

```text
Replacement Request No
Status
Old Asset
New Asset
Replacement Type
Reason
Requester
Request Date
Expected Completion Date
```

#### Approval Stepper

```text
Submitted → Technical Review → Asset Manager Review → Finance Review → Management Approval → Approved → Completed
```

#### Old Asset Tab

Tampilkan data aset lama dan status setelah replacement.

#### New Asset / Procurement Tab

Jika existing asset:

```text
New Asset Code
New Asset Name
Status
Location
Registration Status
```

Jika new procurement:

```text
PR No
PO No
DO No
Vendor
Delivery Status
Installation Status
Acceptance Test Result
```

#### Approval Log Tab

Table:

| Step | Approver | Role | Decision | Date | Notes |
|---|---|---|---|---|---|

---

## 9. Dummy Data Requirement

Buat dummy data minimal 8 replacement request.

Contoh dummy data:

```ts
const replacementRequests = [
  {
    id: 'REP-2026-0001',
    oldAssetCode: 'AST-NAV-001',
    oldAssetName: 'Marine GPS Navigator',
    category: 'Navigation Equipment',
    location: 'KM Kelud - Bridge Deck',
    pic: 'Chief Officer',
    condition: 'Heavy Damage',
    replacementType: 'New Procurement',
    reason: 'Obsolete and vendor support ended',
    maintenanceRef: 'MNT-2026-0031',
    stockOpnameRef: 'SO-2026-0018',
    trackingRef: 'TRK-2026-0022',
    prRef: 'PR-2026-0021',
    poRef: 'PO-2026-0088',
    doRef: 'DO-2026-0043',
    installationRef: 'INST-2026-0041',
    newAssetCode: 'AST-NAV-009',
    status: 'Waiting Installation',
    requester: 'Marine Operation Unit',
    requestDate: '2026-05-03'
  },
  {
    id: 'REP-2026-0002',
    oldAssetCode: 'AST-ENG-017',
    oldAssetName: 'Auxiliary Pump Unit',
    category: 'Engine Equipment',
    location: 'KM Dobonsolo - Engine Room',
    pic: 'Chief Engineer',
    condition: 'High Repair Cost',
    replacementType: 'Existing Asset',
    reason: 'Repair cost exceeds economic value',
    maintenanceRef: 'MNT-2026-0044',
    stockOpnameRef: 'SO-2026-0020',
    trackingRef: 'TRK-2026-0030',
    newAssetCode: 'AST-ENG-051',
    status: 'Technical Review',
    requester: 'Engineering Unit',
    requestDate: '2026-05-01'
  }
]
```

Tambahkan data lain dengan status bervariasi:

```text
Draft
Submitted
Technical Review
Finance Review
Waiting Procurement
Waiting Installation
Completed
Rejected
Pending Disposal
```

---

## 10. Komponen UI yang Disarankan

Buat komponen reusable:

```text
/components/eam/PageHeader.tsx
/components/eam/SummaryCard.tsx
/components/eam/StatusBadge.tsx
/components/eam/FilterBar.tsx
/components/eam/DataTable.tsx
/components/eam/ApprovalStepper.tsx
/components/eam/DocumentPanel.tsx
/components/eam/AssetLookupModal.tsx
/components/eam/ReferencePanel.tsx
/components/eam/AuditTrail.tsx
```

Khusus replacement:

```text
/components/eam/penghapusan/replacement/ReplacementTable.tsx
/components/eam/penghapusan/replacement/ReplacementForm.tsx
/components/eam/penghapusan/replacement/OldAssetPanel.tsx
/components/eam/penghapusan/replacement/NewAssetPanel.tsx
/components/eam/penghapusan/replacement/ProcurementReferencePanel.tsx
/components/eam/penghapusan/replacement/MaintenanceSummaryPanel.tsx
/components/eam/penghapusan/replacement/StockOpnameSummaryPanel.tsx
/components/eam/penghapusan/replacement/TrackingSummaryPanel.tsx
```

---

## 11. Folder Structure

Ikuti foldering modul sebelumnya. Semua submodule penghapusan harus berada dalam folder `penghapusan`.

```text
/app
  /eam
    /penghapusan
      /replacement
        page.tsx
        /create
          page.tsx
        /[id]
          page.tsx

/components
  /eam
    /penghapusan
      /replacement
        ReplacementTable.tsx
        ReplacementForm.tsx
        OldAssetPanel.tsx
        NewAssetPanel.tsx
        ProcurementReferencePanel.tsx
        MaintenanceSummaryPanel.tsx
        StockOpnameSummaryPanel.tsx
        TrackingSummaryPanel.tsx
        ReplacementApprovalStepper.tsx

/lib
  /dummy-data
    replacement.ts
    assets.ts
    maintenance.ts
    stock-opname.ts
    asset-tracking.ts
    procurement.ts
    installation.ts
```

---

## 12. UI/UX Design Direction — SAP Business One Reference

Gunakan pendekatan desain seperti SAP Business One:

1. **Clean enterprise layout**  
   Tidak terlalu banyak ornamen. Fokus pada data, status, dan proses.

2. **Dominant table**  
   Halaman list harus berbasis table besar dengan filter di atas.

3. **Compact form**  
   Form dibuat rapi dalam section dan grid dua kolom.

4. **Document number oriented**  
   Setiap request harus terlihat seperti dokumen bisnis resmi.

5. **Status badge jelas**  
   Status harus terlihat cepat tanpa membuka detail.

6. **Approval stepper**  
   Gunakan stepper horizontal atau vertical untuk menunjukkan posisi approval.

7. **Reference panel**  
   Tampilkan referensi maintenance, stock opname, tracking, procurement, dan installation dalam panel ringkas.

8. **Audit trail**  
   Detail page wajib memiliki tab audit trail.

9. **Neutral color palette**  
   Gunakan warna putih, abu muda, biru enterprise, dan border halus.

10. **Consistent with previous modules**  
   Pastikan header, sidebar, breadcrumb, table, button, dan badge konsisten dengan modul:
   - 2.4 Asset Registration
   - 2.5 Maintenance
   - 2.5 Stock Opname
   - 2.5 Asset Tracking
   - 2.6.1 Movement

---

## 13. Required Interactions

### Replacement List

- Search request number / asset code.
- Filter by status.
- Filter by replacement type.
- Filter by location.
- Click row to open detail.
- Click Create Replacement.

### Create Replacement

- Select old asset from modal/table.
- Auto-fill asset details.
- Show maintenance, stock opname, and tracking context.
- Select replacement type.
- If existing asset, select new asset.
- If new procurement, show PR/PO/DO reference fields.
- Save as Draft.
- Submit Request.

### Detail Replacement

- Show approval stepper.
- Show relation old asset and new asset.
- Show status and reference documents.
- Show audit trail.
- Show button Create Disposal Request when status is Completed or Pending Disposal.

---

## 14. Acceptance Criteria

### Functional Acceptance Criteria

- User can view replacement request list.
- User can filter replacement request by status, type, location, and date.
- User can open replacement detail.
- User can create replacement request using dummy data.
- User can choose old asset from dummy asset data.
- System displays maintenance, stock opname, and asset tracking summary for selected old asset.
- User can select replacement type.
- User can select existing new asset or link procurement reference.
- UI displays approval stepper.
- UI displays old asset to new asset relation.
- UI displays procurement and installation references when relevant.
- UI displays status badge correctly.
- UI shows action to create disposal request after replacement completed.

### UI Acceptance Criteria

- Layout is clean and enterprise-like.
- Table dominates the list page.
- Form is compact and easy to scan.
- Status badge is visually clear.
- Approval stepper is visible on detail page.
- Design visually follows SAP Business One reference.
- UI remains consistent with previous EAM modules.
- Foldering follows `/penghapusan/replacement`.

---

## 15. Suggested Page Copy

### Page Title

```text
Replacement
```

### Page Subtitle

```text
Manage asset replacement requests, link old assets with new assets, and maintain replacement audit history.
```

### Empty State

```text
No replacement request found. Create a new replacement request to start replacing damaged, obsolete, or uneconomical assets.
```

### Submit Confirmation

```text
Submit this replacement request for approval?
```

### Completed Message

```text
Replacement completed. The old asset has been marked as Pending Disposal and the new asset is now Active.
```

---

## 16. Google Antigravity Implementation Prompt

Use this prompt in Google Antigravity:

```text
Build UI/UX demo for EAM PELNI submodule 2.6.2 Replacement using Next.js and Tailwind CSS.

Context:
This module is part of EAM lifecycle under 2.6 Penghapusan. Replacement connects previous modules: Maintenance, Stock Opname, Asset Tracking, Procurement, Installation, and Asset Registration. The UI must follow SAP Business One style: clean enterprise layout, dominant data table, compact forms, document-number-oriented detail pages, status badges, approval stepper, reference panels, and audit trail.

Create pages:
1. /eam/penghapusan/replacement
   - Replacement list page
   - Summary cards
   - Filter bar
   - Dominant replacement request table
   - Status badges
   - Action buttons

2. /eam/penghapusan/replacement/create
   - Create replacement form
   - Document header
   - Old asset selector
   - Auto-filled old asset information
   - Maintenance summary panel
   - Stock opname summary panel
   - Asset tracking summary panel
   - Replacement reason
   - Technical recommendation
   - Replacement type: Existing Asset or New Procurement
   - If Existing Asset, select new asset from dummy data
   - If New Procurement, show PR/PO/DO reference fields
   - Installation and acceptance test reference section
   - Supporting evidence dummy upload area
   - Save Draft and Submit Request buttons

3. /eam/penghapusan/replacement/[id]
   - Replacement detail page
   - Header with request number and status badge
   - Approval stepper
   - Tabs: Overview, Old Asset, New Asset/Procurement, Maintenance History, Stock Opname, Tracking History, Approval Log, Documents, Audit Trail
   - Show relation Old Asset → New Asset
   - Show button Create Disposal Request when status is Completed or Pending Disposal

Use dummy data only.
Create reusable components:
- PageHeader
- SummaryCard
- StatusBadge
- FilterBar
- DataTable
- ApprovalStepper
- DocumentPanel
- AssetLookupModal
- ReferencePanel
- AuditTrail
- ReplacementTable
- ReplacementForm
- OldAssetPanel
- NewAssetPanel
- ProcurementReferencePanel
- MaintenanceSummaryPanel
- StockOpnameSummaryPanel
- TrackingSummaryPanel

Folder structure:
/app/eam/penghapusan/replacement/page.tsx
/app/eam/penghapusan/replacement/create/page.tsx
/app/eam/penghapusan/replacement/[id]/page.tsx
/components/eam/penghapusan/replacement/*
/lib/dummy-data/replacement.ts
/lib/dummy-data/assets.ts
/lib/dummy-data/maintenance.ts
/lib/dummy-data/stock-opname.ts
/lib/dummy-data/asset-tracking.ts
/lib/dummy-data/procurement.ts
/lib/dummy-data/installation.ts

Design requirements:
- SAP Business One inspired
- Clean layout
- White/grey/blue enterprise palette
- Table dominant list page
- Compact forms with two-column grid
- Clear document number and status badge
- Approval stepper visible in detail
- Reference panels for linked modules
- Audit trail tab
- Consistent with previous EAM modules: Asset Registration, Maintenance, Stock Opname, Asset Tracking, Movement

Do not build backend. Do not use real API. Use dummy data and local state.
```

---

## 17. Notes for Next Backend Phase

Pada tahap backend nanti, minimal entity yang dibutuhkan:

```text
ReplacementRequest
ReplacementRequestItem
ReplacementApproval
ReplacementDocument
ReplacementAssetRelation
Asset
MaintenanceWorkOrder
StockOpnameResult
AssetTrackingLog
ProcurementReference
InstallationReference
AuditTrail
```

Relasi penting:

```text
ReplacementRequest.oldAssetId → Asset.id
ReplacementRequest.newAssetId → Asset.id nullable
ReplacementRequest.maintenanceWorkOrderId → MaintenanceWorkOrder.id nullable
ReplacementRequest.stockOpnameId → StockOpnameResult.id nullable
ReplacementRequest.procurementReferenceId → ProcurementReference.id nullable
ReplacementRequest.installationReferenceId → InstallationReference.id nullable
```

---

## 18. End State

Ketika replacement selesai, sistem harus menghasilkan kondisi berikut:

```text
Old Asset Status: Replaced / Pending Disposal
New Asset Status: Active
Replacement Request Status: Completed
Asset Relation: Old Asset → New Asset
Disposal Recommendation: Available
Audit Trail: Completed
```

Submodule berikutnya yang perlu dibuat adalah:

```text
2.6.3 Dismantle / Disposal
```

Submodule tersebut akan menerima aset lama dari Replacement dengan status **Pending Disposal**.
