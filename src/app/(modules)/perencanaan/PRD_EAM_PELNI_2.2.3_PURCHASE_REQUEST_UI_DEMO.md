# PRD.md — EAM PELNI Phase 2.2.3
## Modul Perencanaan — Submodul 2.2.3 PURCHASE REQUEST
### Version
v1.0 — UI/UX Demo Only

---

## 1. Ringkasan
Dokumen ini digunakan untuk pengembangan **UI/UX Demo** modul **Perencanaan** pada sistem **Enterprise Asset Management (EAM)** PELNI, khusus untuk submodul **2.2.3 PURCHASE REQUEST**.

Submodul ini merupakan lanjutan langsung dari:
- **2.2.1 PLAN & DESAIN**
- **2.2.2 CREATE BoQ**

Fokus pengerjaan saat ini **hanya demo front-end** menggunakan **dummy data**, tanpa integrasi backend, tanpa workflow engine nyata, tanpa approval real-time, tanpa integrasi purchasing real, dan tanpa generate dokumen formal.

Tujuan utamanya adalah:
- menampilkan alur Purchase Request yang profesional dan formal
- menunjukkan bahwa PR dibentuk dari **Approved / Ready for PR BoQ**
- menunjukkan kesinambungan data dari **2.2.2 Create BoQ**
- memperlihatkan hubungan antar dokumen dari Planning, BoQ, hingga Purchase Request
- menyiapkan dasar visual untuk modul pengadaan berikutnya

---

## 2. Scope Sprint / Tahap Saat Ini
### In Scope
- UI daftar Purchase Request
- UI create PR dari Approved BoQ / Ready for PR
- UI header Purchase Request
- UI item PR hasil turunan dari BoQ
- UI procurement attributes
- UI lampiran / supporting documents
- UI validation & completeness check
- UI budget confirmation
- UI approval summary
- UI handover to Procurement

### Out of Scope
- backend API
- database
- approval workflow real
- integrasi purchasing real
- integrasi vendor / supplier real
- RFQ / tender / PO process real
- upload file real
- generate PDF real
- audit trail real
- notifikasi real

---

## 3. Posisi Submodul dalam Flow Bisnis
Submodul **2.2.3 PURCHASE REQUEST** berada di akhir proses perencanaan internal, setelah:
- **2.2.1 PLAN & DESAIN**
- **2.2.2 CREATE BoQ**

Flow besar:
1. Plan & Desain selesai dan approved
2. Create BoQ selesai dan status **Ready for PR**
3. Purchase Request dibuat dari BoQ
4. Procurement attributes dilengkapi
5. Dokumen pendukung dicek
6. Budget confirmation dilakukan
7. Approval Purchase Request dilakukan
8. PR dikirim ke Procurement / Purchasing

---

## 4. Tujuan Bisnis
Submodul **2.2.3 PURCHASE REQUEST** berfungsi untuk mengubah hasil **Approved / Ready for PR BoQ Package** menjadi **permintaan pengadaan internal** yang lengkap, jelas, dan siap diteruskan ke fungsi procurement.

Output utama dari submodul ini adalah:
- dokumen Purchase Request formal internal
- item PR yang berasal dari BoQ
- procurement information yang lengkap
- lampiran pendukung yang memadai
- hasil review dan approval internal
- status siap diteruskan ke Procurement

---

## 5. Prinsip UI Demo
UI harus menggambarkan aplikasi enterprise yang:
- clean
- formal
- rapi
- cocok untuk BUMN / pemerintahan
- konsisten dengan submodul **2.2.1** dan **2.2.2**
- terasa seperti sistem ERP enterprise
- memiliki nuansa visual **mirip SAP Business One modern**

### Gaya visual
- sidebar kiri ala ERP
- topbar profesional
- dominan putih, abu, biru gelap
- tabel grid enterprise
- card summary di bagian atas
- form bersection
- halaman detail dua kolom
- badge status yang konsisten
- timeline / stepper sederhana
- summary panel kanan untuk desktop

### Prinsip kesinambungan dengan 2.2.2
Desain halaman 2.2.3 wajib terasa satu keluarga dengan 2.2.2:
- style status badge sama
- summary card sama
- format breadcrumb sama
- naming action konsisten
- struktur detail page serupa
- warna dan tone visual konsisten
- source document dari BoQ harus tampil jelas

---

## 6. Dependency terhadap 2.2.2 CREATE BoQ
Submodul **Purchase Request** hanya dapat dibuat dari BoQ yang statusnya:
- **Approved**
- atau **Ready for PR**

### Data minimal dari 2.2.2 yang harus tersedia di demo
- BoQ No
- Planning No
- Package Title
- Package Type
- Asset Code
- Asset Name
- Category
- Location
- Total Items
- Total Estimate
- Cost Category
- Fiscal Year
- Line Items
- Quantity
- UoM
- Technical Ref
- Approval Status
- PR Readiness Status

### Catatan kesinambungan
Jika pada UI 2.2.2 sebelumnya belum tersedia tampilan berikut, maka pada demo 2.2.3 perlu dicatat sebagai dependency enhancement:
1. **Status “Ready for PR” harus terlihat jelas** pada halaman akhir 2.2.2
2. **PR Readiness Handover Page** pada 2.2.2 sebaiknya menampilkan:
   - BoQ No
   - Planning No
   - Package Title
   - Total Items
   - Total Estimate
   - Approval Status
   - Readiness Badge
3. Pada halaman akhir 2.2.2 sebaiknya tersedia tombol:
   - **Create Purchase Request**
   - tombol ini hanya muncul untuk status **Ready for PR**
4. **Item line BoQ** harus mudah dipahami agar pada 2.2.3 bisa terlihat sebagai source items dari PR
5. **Cost summary** di 2.2.2 harus cukup jelas agar di 2.2.3 bisa ditampilkan sebagai reference estimate, bukan dihitung ulang

> Catatan: Dependency ini dicatat agar flow demo tetap berkesinambungan tanpa perlu perubahan besar pada UI sebelumnya.

---

## 7. User Role untuk Demo
### 1. Requester / User Owner
Membuat atau menginisiasi Purchase Request.

### 2. Planner / Engineer
Memastikan PR sesuai dengan source planning dan BoQ.

### 3. Budget Officer
Melakukan budget confirmation.

### 4. Reviewer
Melakukan pengecekan kelengkapan PR.

### 5. Approver
Melihat summary akhir dan memberi keputusan.

### 6. Procurement Liaison / Purchasing
Menerima PR yang telah disetujui.

> Catatan: Pada tahap demo, semua role cukup divisualisasikan dalam UI. Tidak perlu implementasi otorisasi nyata.

---

## 8. Business Flow Demo
Flow demo yang harus terlihat:

1. User membuka daftar Purchase Request  
2. User memilih membuat PR dari **BoQ Ready for PR**  
3. Sistem membentuk **PR Header**  
4. Sistem menarik item PR dari source BoQ  
5. User melengkapi procurement attributes  
6. User meninjau lampiran pendukung  
7. Reviewer melakukan validation / completeness check  
8. Budget officer memberi budget confirmation  
9. Approver memberi keputusan  
10. Sistem menandai PR sebagai **Sent to Procurement**

---

## 9. Status Workflow Demo
Gunakan status berikut untuk dummy flow:
- Draft
- In Preparation
- Waiting Budget Confirmation
- Waiting Review
- Revision Required
- Waiting Approval
- Approved
- Rejected
- Sent to Procurement
- Cancelled

Status wajib ditampilkan sebagai badge berwarna dan konsisten dengan style 2.2.1 dan 2.2.2.

---

## 10. Daftar Halaman yang Harus Dibuat

## 10.1 Purchase Request List Page
### Tujuan
Menampilkan seluruh dokumen Purchase Request.

### Komponen
- page title
- breadcrumb
- filter bar
- search input
- tombol create PR
- table list
- pagination
- summary cards

### Summary cards
- Total PR
- In Preparation
- Waiting Approval
- Sent to Procurement

### Filter
- status
- fiscal year
- unit
- procurement type
- category
- location
- budget status

### Kolom tabel
- PR No
- PR Date
- BoQ No
- Planning No
- Requesting Unit
- Package Title
- Total Items
- Total Estimate
- Current Status
- Required Date
- Action

### Action row
- View Detail
- Edit Procurement Info
- Open Validation
- Open Approval Summary
- View Procurement Handover

---

## 10.2 Create PR from BoQ Page
### Tujuan
Membentuk Purchase Request baru dari data **Approved / Ready for PR BoQ**.

### Layout
Halaman ini menampilkan:
- ringkasan data dari 2.2.2
- form pembuatan PR header
- preview source items dari BoQ

### Section
#### A. Source BoQ Summary
- BoQ No
- Planning No
- Package Title
- Package Type
- Asset Code
- Asset Name
- Category
- Location
- Total Items
- Total Estimate
- Approval Status
- PR Readiness Status

#### B. PR Header Form
- PR No (auto dummy)
- PR Date
- Requesting Unit
- Requester Name
- Procurement Type
- Request Priority
- Fiscal Year
- Cost Center
- Budget Owner
- Required Delivery Date
- Delivery Location
- Notes

#### C. Source Item Preview
- item list preview
- quantity
- UoM
- reference subtotal
- remarks preview

### Button
- Save Draft
- Create Purchase Request
- Cancel

---

## 10.3 Purchase Request Detail Header Page
### Tujuan
Menampilkan identitas utama PR dan hubungan ke dokumen sumber.

### Layout
Gunakan model 2 kolom:
- kiri: informasi utama
- kanan: summary card & workflow stepper

### Section
- header PR identity
- source planning reference
- source BoQ reference
- request summary
- requester info
- budget summary snapshot
- next step buttons

### Header action
- Edit Header
- Open PR Items
- Open Validation
- Send to Review
- Cancel PR

---

## 10.4 PR Items Page
### Tujuan
Menampilkan item PR yang diturunkan dari BoQ.

### Section
#### A. Source Mapping Banner
Banner di atas tabel harus menunjukkan:
- Source Planning No
- Source BoQ No
- Package Title
- Readiness Status

#### B. PR Item Table
Kolom:
- Item No
- Source BoQ Item No
- Item Type
- Item Code
- Item Name
- Description
- Quantity
- UoM
- Required Date
- Delivery Location
- Estimated Unit Price
- Estimated Subtotal
- Spec Ref
- Remarks

#### C. Item Action
- View Source Item
- Edit Delivery Info
- Split Item (dummy)
- Remove Item (dummy for demo)
- Add Manual Note

### UI Tambahan
- sticky item count & total estimate
- row hover action seperti ERP
- source badge pada tiap item
- banner yang menegaskan bahwa item berasal dari BoQ

---

## 10.5 Procurement Attributes Page
### Tujuan
Melengkapi data yang diperlukan Procurement / Purchasing.

### Section
#### A. General Procurement Info
- Procurement Type
- Cost Category (Capex/Opex)
- Purchasing Group
- Suggested Procurement Method
- Required Date
- Delivery Terms
- Delivery Location
- Receiving Unit

#### B. Financial / Account Assignment
- Fiscal Year
- Cost Center
- Budget Owner
- Source of Fund
- Budget Reference
- Account Assignment Category

#### C. Procurement Notes
- Business Justification
- Operational Impact
- Special Handling
- Internal Instruction to Procurement

### Button
- Save Draft
- Continue to Supporting Documents
- Back

---

## 10.6 Supporting Documents Page
### Tujuan
Menampilkan dokumen pendukung yang melekat pada Purchase Request.

### Section
#### A. Mandatory Documents Checklist
- Approved Plan & Design Summary
- Approved BoQ Summary
- Technical Specification / KAK
- Cost Summary / Estimate
- Budget Confirmation Note
- Approval Note

#### B. Document Preview Panel (dummy)
- document card placeholders
- view document action dummy
- document status tag

#### C. Missing Documents Indicator
- complete
- incomplete
- pending attachment

### Button
- Save Checklist
- Continue to Validation

---

## 10.7 Validation & Completeness Check Page
### Tujuan
Memastikan PR lengkap sebelum approval.

### Komponen
- validation summary card
- completeness checklist
- issue flag list
- comments thread style
- decision dropdown

### Validation checklist
- source BoQ is approved / ready for PR
- source planning reference is available
- PR header is complete
- item list is complete
- required date is available
- delivery location is available
- cost center is available
- documents are complete
- ready for budget confirmation
- revision required

### Decision
- Complete
- Revision Required
- Rejected

### Button
- Submit Validation
- Return to Requester
- Return to Planner

---

## 10.8 Budget Confirmation Page
### Tujuan
Menampilkan pengecekan anggaran sebelum approval.

### Field
- budget owner
- fiscal year
- budget ceiling
- total estimate
- allocated amount
- available balance
- variance
- budget note

### Decision
- Budget Confirmed
- Confirmed with Note
- Not Confirmed

### UI
- comparison card
- variance indicator
- summary note box
- cost reference from BoQ

### Button
- Save Confirmation
- Continue to Approval Summary

---

## 10.9 Approval Summary Page
### Tujuan
Menampilkan ringkasan final sebelum status Approved.

### Komponen
- PR summary
- source planning summary
- source BoQ summary
- item summary
- budget summary
- validation summary
- document completeness summary
- final status

### Approval action
- Approve
- Return for Revision
- Reject
- Hold

### UI Style
Halaman harus terasa formal, padat, dan seperti halaman final approval di ERP enterprise / SAP B1 style modern.

---

## 10.10 Procurement Handover Page
### Tujuan
Menandai bahwa Purchase Request telah disetujui dan siap / sudah dikirim ke Procurement.

### Komponen
- approved PR package summary
- source document references
- total item count
- total estimate
- procurement queue status
- handover note
- readiness / sent badge
- next module CTA

### Output badge
- Ready for Procurement
- Sent to Procurement
- Need Revision

### CTA
- Go to Procurement Module
- View Approval Summary
- Back to PR List

---

## 11. Navigasi yang Direkomendasikan
Sidebar menu demo:
- Dashboard
- Asset Registry
- Maintenance
- Perencanaan
  - Planning Request
  - Plan & Design
  - Create BoQ
  - Purchase Request
  - Ready for Procurement
- Pengadaan
- Master Data
- Settings

> Pada demo, menu lain cukup placeholder.
> Pastikan menu **Purchase Request** terlihat sebagai kelanjutan langsung dari **Create BoQ**.

---

## 12. Dummy Data Requirements

## 12.1 Contoh Source BoQ Package
### Dummy Record 1
- BoQ No: BOQ-PELNI-2026-0008
- Planning No: PLN-PLAN-2026-0012
- Package Title: Replacement Main Engine Cooling Pump Package
- Package Type: Mixed Package
- Asset Code: AST-KPL-MESIN-001
- Asset Name: Main Engine Cooling Pump
- Category: Mechanical
- Location: KM Kelud
- Total Items: 6
- Total Estimate: 185,000,000
- Approval Status: Approved
- PR Readiness Status: Ready for PR

### Dummy Record 2
- BoQ No: BOQ-PELNI-2026-0009
- Planning No: PLN-PLAN-2026-0013
- Package Title: Distribution Panel Upgrade Package
- Package Type: Service-heavy
- Asset Code: AST-KPL-ELC-014
- Asset Name: Distribution Panel Deck B
- Category: Electrical
- Location: KM Bukit Siguntang
- Total Items: 4
- Total Estimate: 245,000,000
- Approval Status: Approved
- PR Readiness Status: Ready for PR

## 12.2 Contoh Purchase Request Header
### Dummy Record 1
- PR No: PR-PELNI-2026-0015
- PR Date: 2026-04-22
- BoQ No: BOQ-PELNI-2026-0008
- Planning No: PLN-PLAN-2026-0012
- Requesting Unit: Fleet Engineering
- Package Title: Replacement Main Engine Cooling Pump Package
- Total Items: 6
- Total Estimate: 185,000,000
- Current Status: Waiting Approval

### Dummy Record 2
- PR No: PR-PELNI-2026-0016
- PR Date: 2026-04-22
- BoQ No: BOQ-PELNI-2026-0009
- Planning No: PLN-PLAN-2026-0013
- Requesting Unit: Electrical Maintenance
- Package Title: Distribution Panel Upgrade Package
- Total Items: 4
- Total Estimate: 245,000,000
- Current Status: Sent to Procurement

## 12.3 Contoh PR Items
### PR-PELNI-2026-0015
1. Cooling Pump Main Unit — 1 unit  
2. Pipe Connection Kit — 2 set  
3. Installation Service — 1 job  
4. Testing & Commissioning — 1 lot  
5. Mobilization & Logistics — 1 lot  
6. Safety Permit Support — 1 lot  

### PR-PELNI-2026-0016
1. Distribution Panel Unit — 1 unit  
2. Cable Re-routing Work — 120 m  
3. Installation Service — 1 job  
4. Functional Testing — 1 lot  

---

## 13. Komponen UI Reusable
Buat komponen reusable berikut:
- PageHeader
- SummaryCard
- StatusBadge
- FilterBar
- DataTable
- SourceDocumentCard
- PRItemGrid
- ValidationPanel
- BudgetComparisonCard
- ApprovalCard
- CommentPanel
- HandoverStatusCard
- StepProgressHeader
- EmptyState
- AttachmentPlaceholder

> Komponen **PRItemGrid** sangat penting agar tabel item Purchase Request terasa seperti modul ERP / SAP B1.

---

## 14. UX Rules
- tampilan harus clean dan formal
- detail informasi dibagi per section
- gunakan layout seperti ERP
- status workflow selalu terlihat
- source dokumen harus terlihat jelas
- total estimate harus terlihat konsisten
- action utama harus jelas
- halaman harus siap presentasi ke client

### UX tambahan khusus Purchase Request
- source BoQ harus tampil eksplisit di banyak titik
- user harus paham bahwa item PR berasal dari BoQ
- jangan buat user merasa PR adalah PO
- gunakan wording yang jelas:
  - Purchase Request
  - Sent to Procurement
  - bukan Purchase Order
- summary reference document wajib tampil di halaman detail

---

## 15. Teknis Frontend Demo
### Stack
- Next.js
- Tailwind CSS
- component-based architecture
- dummy JSON / local mock data

### Catatan
- tidak perlu state management kompleks
- tidak perlu backend
- gunakan dummy actions
- gunakan data hardcoded
- gunakan komponen konsisten dengan 2.2.1 dan 2.2.2
- bisa gunakan mock modal untuk approval dan validation

---

## 16. Struktur Folder yang Disarankan
```bash
src/
  app/
    eam/
      planning/
        purchase-request/
          list/
          create/
          [id]/
          items/
          procurement-info/
          documents/
          validation/
          budget/
          handover/
  components/
    eam/
      planning/
        purchase-request/
          list/
          header/
          items/
          procurement-info/
          documents/
          validation/
          budget/
          approval/
          handover/
  lib/
    mocks/
      planning/
        purchase-request/
```

---

## 17. Acceptance Criteria Demo

### A. Visual
- seluruh halaman utama 2.2.3 tersedia
- tampilan konsisten dengan 2.2.1 dan 2.2.2
- gaya clean dan mirip SAP B1 terasa kuat
- source document flow mudah dipahami client

### B. Flow
- user bisa membuat PR dari BoQ yang siap
- user bisa melihat hubungan BoQ ke Purchase Request
- seluruh step Purchase Request dapat divisualisasikan di demo
- ada jalur yang jelas menuju Procurement

### C. Data
- minimal 2 source BoQ package tersedia
- minimal 2 PR tersedia
- minimal 1 PR memiliki item lengkap
- summary estimate dan status tampil benar

### D. Presentasi
- client dapat memahami bahwa Purchase Request adalah turunan dari BoQ
- client dapat memahami bahwa PR adalah akhir proses perencanaan internal
- client dapat melihat hubungan antar dokumen tanpa backend

---

## 18. Skenario Demo Presentasi
### Skenario 1
User membuka daftar Purchase Request dan memilih membuat PR dari BoQ dengan status **Ready for PR**.

### Skenario 2
User membuka halaman Create PR from BoQ dan menunjukkan bahwa data sumber berasal dari 2.2.2.

### Skenario 3
User membuka halaman PR Items dan menunjukkan item Purchase Request berasal dari source BoQ item.

### Skenario 4
User membuka Procurement Attributes dan menunjukkan data yang dibutuhkan procurement.

### Skenario 5
User membuka Supporting Documents dan menunjukkan dokumen pendukung PR.

### Skenario 6
Reviewer membuka halaman Validation dan memberi catatan kelengkapan.

### Skenario 7
Budget officer membuka Budget Confirmation dan memberikan hasil budget confirmation.

### Skenario 8
Approver membuka Approval Summary dan menyetujui PR.

### Skenario 9
Sistem menampilkan halaman **Sent to Procurement** sebagai langkah menuju modul pengadaan berikutnya.

---

## 19. Non-Functional untuk Tahap Demo
- fast loading
- responsive desktop first
- tablet acceptable
- tidak perlu mobile app level
- visual polished
- siap untuk demo meeting
- item grid nyaman di desktop
- summary source document tetap terbaca saat data cukup banyak

---

## 20. Catatan Penting untuk Antigravity
Saat generate UI:
- fokus hanya front-end demo
- jangan buat backend dulu
- gunakan dummy data
- jangan buat logic kompleks
- prioritaskan halaman, layout, dan komponen reusable
- gunakan naming yang rapi dan enterprise
- pertahankan nuansa clean dan mirip SAP B1
- pastikan hubungan dengan 2.2.2 terlihat sangat jelas
- jangan terlalu banyak fitur di luar scope 2.2.3
- tegaskan bahwa PR berbeda dengan PO

---

## 21. Deliverable Tahap Ini
Output yang diharapkan dari Antigravity:
1. halaman list Purchase Request
2. halaman create PR from BoQ
3. halaman detail PR header
4. halaman PR items
5. halaman procurement attributes
6. halaman supporting documents
7. halaman validation & completeness check
8. halaman budget confirmation
9. halaman approval summary
10. halaman procurement handover

---

## 22. Penutup
Submodul **2.2.3 PURCHASE REQUEST** pada tahap ini difokuskan untuk membangun **UI/UX demo enterprise** yang menggambarkan proses permintaan pengadaan internal secara formal, rapi, clean, dan siap dipresentasikan ke client.

PRD ini menjaga kesinambungan dengan **2.2.2 CREATE BoQ**, terutama pada:
- source BoQ reference
- status Ready for PR
- item turunan dari BoQ
- total estimate reference
- tombol Create Purchase Request
- konsistensi visual dan navigasi

Setelah UI demo ini disetujui, tahapan berikutnya dapat dilanjutkan ke:
- modul procurement / purchasing
- backend / middleware
- approval logic
- integrasi data
- workflow pengadaan berikutnya

---
