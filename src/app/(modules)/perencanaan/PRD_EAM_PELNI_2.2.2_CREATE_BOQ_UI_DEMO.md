# PRD.md — EAM PELNI Phase 2.2.2
## Modul Perencanaan — Submodul 2.2.2 CREATE BoQ
### Version
v1.0 — UI/UX Demo Only

---

## 1. Ringkasan
Dokumen ini digunakan untuk pengembangan **UI/UX Demo** modul **Perencanaan** pada sistem **Enterprise Asset Management (EAM)** PELNI, khusus untuk submodul **2.2.2 CREATE BoQ**.

Submodul ini merupakan lanjutan langsung dari **2.2.1 PLAN & DESAIN** yang telah selesai dibuat dalam bentuk UI/UX demo.

Fokus pengerjaan saat ini **hanya demo front-end** menggunakan **dummy data**, tanpa integrasi backend, tanpa workflow engine nyata, tanpa kalkulasi real-time dari database, dan tanpa approval real.

Tujuan utamanya adalah:
- menampilkan alur penyusunan BoQ yang profesional
- menunjukkan bagaimana approved Plan & Desain diterjemahkan menjadi item-item terukur
- menunjukkan perhitungan quantity, unit of measure, dan estimasi biaya awal
- menyiapkan paket yang siap diteruskan ke **2.2.3 Purchase Request**
- menjaga kesinambungan visual dan flow dari modul **2.2.1 PLAN & DESAIN**

---

## 2. Scope Sprint / Tahap Saat Ini
### In Scope
- UI daftar BoQ
- UI create BoQ dari approved Plan & Design
- UI detail header BoQ
- UI work breakdown / line items
- UI quantity & UoM entry
- UI technical reference mapping
- UI cost estimation
- UI validation / review
- UI approval summary
- UI handover to Purchase Request readiness

### Out of Scope
- backend API
- database
- kalkulasi harga real
- integrasi item catalog real
- upload file real
- import Excel real
- approval workflow real
- audit trail real
- generate PDF real
- integrasi purchase request real

---

## 3. Posisi Submodul dalam Flow Bisnis
Submodul **2.2.2 CREATE BoQ** berada di antara:
- **2.2.1 PLAN & DESAIN**
- **2.2.3 PURCHASE REQUEST**

Flow besar:
1. Plan & Desain selesai dan approved
2. Create BoQ dimulai
3. Item pekerjaan / material / jasa disusun
4. Quantity dan UoM ditentukan
5. Technical reference dipetakan
6. Cost estimate awal dibentuk
7. Review dan approval BoQ dilakukan
8. Paket ditandai **Ready for PR**

---

## 4. Tujuan Bisnis
Submodul **2.2.2 CREATE BoQ** berfungsi untuk menerjemahkan hasil **Approved Plan & Design Package** menjadi **daftar kuantitas dan estimasi biaya** yang lebih rinci sebagai dasar untuk proses **2.2.3 Purchase Request**.

Output utama dari submodul ini adalah:
- dokumen BoQ dengan identitas paket
- line items yang terukur
- quantity dan unit of measure
- grouping material / jasa / peralatan / logistik
- estimasi biaya per item dan total
- hasil review dan approval
- status siap diteruskan ke Purchase Request

---

## 5. Prinsip UI Demo
UI harus menggambarkan aplikasi enterprise yang:
- clean
- formal
- rapi
- data-dense tetapi tetap nyaman dibaca
- cocok untuk BUMN / pemerintahan
- konsisten dengan submodul **2.2.1 PLAN & DESAIN**
- terasa seperti sistem ERP enterprise
- memiliki nuansa visual **mirip SAP Business One modern**

### Gaya visual
- sidebar kiri ala enterprise ERP
- top bar profesional
- dominan putih, abu muda, abu gelap, biru navy
- tabel grid rapi
- card summary di bagian atas
- tab / section yang jelas
- badge status yang konsisten
- form bersection
- summary panel di kanan untuk halaman detail
- spacing nyaman, tidak terlalu padat

### Prinsip kesinambungan dengan 2.2.1
Desain halaman 2.2.2 wajib terasa satu keluarga dengan 2.2.1:
- style status badge sama
- format summary card sama
- pola breadcrumb sama
- struktur detail page serupa
- penamaan action konsisten
- warna dan tone visual konsisten

---

## 6. Dependency terhadap 2.2.1 PLAN & DESAIN
Submodul **Create BoQ** hanya dapat dibuat dari request **2.2.1** yang statusnya:
- **Approved for BoQ**

### Data minimal dari 2.2.1 yang harus tersedia di demo
- Planning Request No
- Asset Code
- Asset Name
- Category
- Location
- Request Type
- Priority
- Scope Summary
- Preliminary Specification
- Design Concept Summary
- Preliminary Cost Estimate
- Approval Status

### Catatan kesinambungan
Jika pada UI 2.2.1 sebelumnya belum tersedia tampilan berikut, maka pada demo 2.2.2 perlu dicatat sebagai dependency enhancement:
1. **Approval status “Approved for BoQ” harus terlihat jelas** di halaman approval summary 2.2.1
2. **Handover card ke Create BoQ** pada halaman akhir 2.2.1 sebaiknya menampilkan:
   - Planning No
   - Scope Summary
   - Design Version
   - Preliminary Estimate
   - BoQ Readiness
3. **Scope of Work** pada 2.2.1 harus cukup jelas agar dapat diturunkan menjadi line items di 2.2.2
4. **Preliminary Cost Estimate** di 2.2.1 harus bersifat high-level, sedangkan detail cost breakdown dilakukan di 2.2.2
5. Jika memungkinkan, pada UI 2.2.1 ditambahkan tombol:
   - **Create BoQ**
   - tombol ini muncul hanya untuk status **Approved for BoQ**

> Catatan: Tidak perlu mengubah besar-besaran 2.2.1. Dependency ini cukup dicatat agar kesinambungan flow demo terlihat kuat.

---

## 7. User Role untuk Demo
### 1. Planner / Engineer
Menyusun struktur BoQ dan quantity.

### 2. Cost Engineer / Estimator
Mengisi harga satuan dan cost structure.

### 3. Reviewer
Melakukan review teknis dan biaya.

### 4. Budget Officer
Melihat total estimasi dan memberi catatan budget.

### 5. Approver
Melihat ringkasan akhir dan memberi keputusan.

### 6. Procurement Liaison
Melihat apakah BoQ sudah siap diteruskan ke Purchase Request.

> Catatan: Pada tahap demo, semua role cukup divisualisasikan dalam UI. Tidak perlu implementasi otorisasi nyata.

---

## 8. Business Flow Demo
Flow demo yang harus terlihat:

1. User membuka daftar BoQ  
2. User memilih membuat BoQ dari **Approved Plan & Design**  
3. Sistem membentuk **BoQ Header**  
4. Planner menyusun **Work Breakdown / Line Items**  
5. Planner mengisi **Quantity & UoM**  
6. Planner memetakan **Technical Reference**  
7. Cost engineer mengisi **Unit Price & Cost Estimate**  
8. Reviewer melakukan validasi  
9. Approver memberi keputusan  
10. Sistem menandai BoQ sebagai **Ready for PR**

---

## 9. Status Workflow Demo
Gunakan status berikut untuk dummy flow:
- Draft
- In Progress
- Waiting Technical Review
- Waiting Cost Review
- Revision Required
- Waiting Approval
- Approved
- Rejected
- Ready for PR
- Cancelled

Status wajib ditampilkan sebagai badge berwarna dan konsisten dengan style 2.2.1.

---

## 10. Daftar Halaman yang Harus Dibuat

## 10.1 BoQ List Page
### Tujuan
Menampilkan seluruh dokumen BoQ.

### Komponen
- page title
- breadcrumb
- filter bar
- search input
- tombol create BoQ
- table list
- pagination
- summary cards

### Summary cards
- Total BoQ
- In Progress
- Waiting Approval
- Ready for PR

### Filter
- status
- asset category
- location
- year
- request type
- planner
- approval status

### Kolom tabel
- BoQ No
- Planning No
- Asset Code
- Asset Name
- Category
- Location
- Total Items
- Total Estimate
- Current Status
- Last Updated
- Action

### Action row
- View Detail
- Edit Line Items
- Open Costing
- Review Summary
- Open PR Readiness

---

## 10.2 Create BoQ from Plan Page
### Tujuan
Membentuk BoQ baru dari data **Approved Plan & Design**.

### Layout
Halaman ini menampilkan:
- ringkasan data dari 2.2.1
- form pembuatan BoQ header
- area pemilihan template / type package

### Section
#### A. Source Planning Summary
- Planning Request No
- Request Date
- Asset Code
- Asset Name
- Category
- Location
- Scope Summary
- Design Concept Summary
- Preliminary Estimate
- Approval Status

#### B. BoQ Header Form
- BoQ No (auto dummy)
- BoQ Date
- Planner Name
- Package Title
- Package Type
- Work Category
- Cost Category (Capex/Opex)
- Fiscal Year
- Cost Center
- Notes

#### C. Package Classification
- Material-heavy
- Service-heavy
- Mixed Package
- Replacement
- Rehabilitation
- Upgrade
- New Asset

### Button
- Save Draft
- Create BoQ
- Cancel

---

## 10.3 BoQ Detail Header Page
### Tujuan
Menampilkan identitas utama dan konteks BoQ.

### Layout
Gunakan model 2 kolom:
- kiri: informasi utama
- kanan: summary card & status stepper

### Section
- header BoQ identity
- source planning package
- package summary
- asset summary
- approval path summary
- total estimate snapshot
- next step buttons

### Header action
- Edit Header
- Manage Line Items
- Open Costing
- Send to Review
- Cancel BoQ

---

## 10.4 Work Breakdown & Line Items Page
### Tujuan
Mengubah scope dari plan menjadi line items BoQ.

### Section
#### A. Work Section Group
- Preparation Work
- Main Material
- Installation / Repair Service
- Testing & Commissioning
- Logistics / Mobilization
- HSE / Compliance
- Contingency

#### B. Line Item Table
Kolom:
- Item No
- Item Group
- Item Code
- Item Name
- Description
- Mandatory / Optional / Contingency
- Technical Ref
- Quantity
- UoM
- Unit Price
- Subtotal
- Remarks

#### C. Line Item Action
- Add Item
- Duplicate Item
- Delete Item
- Move Group
- Add Section
- Reorder Item

### UI Tambahan
- sticky summary total
- inline editable grid feel seperti ERP
- add item via modal atau row insert
- section collapse / expand

---

## 10.5 Quantity & UoM Page
### Tujuan
Menentukan quantity dan unit of measure untuk setiap item.

### Section
#### A. Quantity Entry Table
Kolom:
- Item No
- Item Name
- Quantity
- UoM
- Quantity Type (Exact / Estimated / Provisional)
- Basis of Quantity
- Drawing Ref
- Survey Ref
- Notes

#### B. UoM Reference
Dummy dropdown:
- pcs
- unit
- set
- m
- m2
- m3
- lot
- job
- ls

#### C. Validation Panel
- missing quantity
- missing UoM
- zero quantity
- duplicated item warning
- abnormal quantity warning

### Button
- Save Draft
- Validate Quantity
- Continue to Technical Mapping

---

## 10.6 Technical Reference Mapping Page
### Tujuan
Memastikan setiap line item punya rujukan teknis.

### Section
#### A. Mapping Table
Kolom:
- Item No
- Item Name
- Spec Ref
- Drawing Ref
- Material Class
- Service Type
- Critical Item Flag
- Regulated Item Flag
- Notes

#### B. Reference Library (dummy panel)
- preliminary specification
- drawing placeholder
- design concept note
- related document placeholder

#### C. Mapping Summary Card
- total items mapped
- items without reference
- critical items
- regulated items

### Button
- Save Mapping
- Submit for Costing

---

## 10.7 Cost Estimation Page
### Tujuan
Mengisi unit price dan membentuk total estimate.

### Section
#### A. Cost Table
Kolom:
- Item No
- Item Name
- Quantity
- UoM
- Unit Price
- Price Source
- Subtotal
- Tax Flag
- Notes

#### B. Price Source Reference
Dummy source:
- historical purchase
- engineer estimate
- internal catalog
- vendor reference
- ahsp reference

#### C. Cost Summary
- material total
- service total
- logistics total
- testing total
- contingency total
- grand total

#### D. Budget Snapshot
- budget ceiling
- current estimate
- variance
- indicator

### UI Tambahan
- cost summary card kanan
- total sticky footer
- highlight variance

### Button
- Save Draft
- Recalculate (dummy)
- Submit for Review

---

## 10.8 Review & Validation Page
### Tujuan
Menampilkan hasil validasi BoQ sebelum approval.

### Komponen
- review summary card
- reviewer list
- comments thread style
- validation checklist
- issue flag list
- decision dropdown

### Validation checklist
- source planning is approved
- item breakdown is complete
- quantity and UoM are complete
- technical mapping is complete
- unit prices are available
- total estimate is reasonable
- ready for approval
- revision required

### Decision
- Approved with Notes
- Revision Required
- Rejected

### Button
- Submit Review
- Return to Estimator
- Return to Planner

---

## 10.9 Approval Summary Page
### Tujuan
Menampilkan ringkasan final sebelum status Approved / Ready for PR.

### Komponen
- BoQ summary
- planning source summary
- line items summary
- cost summary
- review summary
- issue summary
- final status

### Approval action
- Approve
- Return for Revision
- Reject
- Hold

### UI Style
Halaman harus terasa formal, padat, dan seperti final approval page di ERP enterprise.

---

## 10.10 PR Readiness Handover Page
### Tujuan
Menandai bahwa BoQ siap diteruskan ke **2.2.3 Purchase Request**.

### Komponen
- approved BoQ package summary
- planning reference
- total item count
- total estimate
- mandatory document list
- missing item checklist
- readiness badge
- handover notes
- next module CTA

### Output badge
- Ready for PR
- Need Completion

### CTA
- Go to Purchase Request
- View Approval Summary
- Back to BoQ List

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
  - BoQ Review
  - Ready for PR
- Pengadaan
- Master Data
- Settings

> Pada demo, menu lain cukup placeholder.
> Pastikan menu **Create BoQ** terlihat sebagai kelanjutan langsung dari **Plan & Design**.

---

## 12. Dummy Data Requirements

## 12.1 Contoh Source Planning Package
### Dummy Record 1
- Planning No: PLN-PLAN-2026-0012
- Asset Code: AST-KPL-MESIN-001
- Asset Name: Main Engine Cooling Pump
- Category: Mechanical
- Location: KM Kelud
- Request Type: Replacement
- Priority: High
- Scope Summary: Replacement of aging cooling pump and supporting installation items
- Preliminary Estimate: 185,000,000
- Status: Approved for BoQ

### Dummy Record 2
- Planning No: PLN-PLAN-2026-0013
- Asset Code: AST-KPL-ELC-014
- Asset Name: Distribution Panel Deck B
- Category: Electrical
- Location: KM Bukit Siguntang
- Request Type: Upgrade
- Priority: Medium
- Scope Summary: Upgrade of electrical distribution panel and testing
- Preliminary Estimate: 245,000,000
- Status: Approved for BoQ

## 12.2 Contoh BoQ Header
### Dummy Record 1
- BoQ No: BOQ-PELNI-2026-0008
- Planning No: PLN-PLAN-2026-0012
- Package Title: Replacement Main Engine Cooling Pump Package
- Package Type: Mixed Package
- Cost Category: Capex
- Fiscal Year: 2026
- Status: In Progress

### Dummy Record 2
- BoQ No: BOQ-PELNI-2026-0009
- Planning No: PLN-PLAN-2026-0013
- Package Title: Distribution Panel Upgrade Package
- Package Type: Service-heavy
- Cost Category: Capex
- Fiscal Year: 2026
- Status: Ready for PR

## 12.3 Contoh Line Items
### BoQ-PELNI-2026-0008
1. Cooling Pump Main Unit — 1 unit  
2. Pipe Connection Kit — 2 set  
3. Installation Service — 1 job  
4. Testing & Commissioning — 1 lot  
5. Mobilization & Logistics — 1 lot  
6. Safety Permit Support — 1 lot

### BoQ-PELNI-2026-0009
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
- ERPLineItemGrid
- InfoSectionCard
- StepProgressHeader
- CostSummaryCard
- ValidationPanel
- ApprovalCard
- CommentPanel
- SourcePlanningCard
- HandoverReadinessCard
- EmptyState
- AttachmentPlaceholder

> Komponen **ERPLineItemGrid** sangat penting agar tabel line items terasa seperti modul SAP B1 / ERP.

---

## 14. UX Rules
- tabel line items harus kuat dan nyaman dibaca
- gunakan pattern grid entry seperti ERP
- detail informasi dibagi per section
- gunakan tab bila halaman panjang
- status workflow selalu terlihat
- action utama harus jelas
- total biaya harus selalu terlihat
- summary di sisi kanan boleh digunakan untuk desktop
- semua halaman harus terasa siap presentasi ke client

### UX tambahan khusus Create BoQ
- perubahan line item harus mudah divisualisasikan
- total dan subtotal harus menonjol
- item group harus mudah dipahami
- flow dari source planning ke BoQ harus terlihat eksplisit
- jangan membuat layout terlalu gelap atau terlalu ramai

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
- gunakan mock calculation sederhana jika perlu
- data boleh hardcoded
- gunakan komponen yang konsisten dengan 2.2.1

---

## 16. Struktur Folder yang Disarankan
```bash
src/
  app/
    eam/
      planning/
        boq/
          list/
          create/
          [id]/
          quantities/
          mapping/
          costing/
          review/
          pr-ready/
  components/
    eam/
      planning/
        boq/
          list/
          header/
          line-items/
          quantities/
          mapping/
          costing/
          review/
          approval/
          pr-ready/
  lib/
    mocks/
      planning/
        boq/
```

---

## 17. Acceptance Criteria Demo

### A. Visual
- seluruh halaman utama 2.2.2 tersedia
- tampilan konsisten dengan 2.2.1
- gaya clean dan mirip SAP B1 terasa kuat
- status dan flow mudah dipahami client

### B. Flow
- user bisa membuat BoQ dari source planning yang approved
- user bisa melihat flow dari header hingga PR readiness
- seluruh step Create BoQ dapat divisualisasikan di demo
- ada jalur yang jelas menuju Purchase Request

### C. Data
- minimal 2 dummy source planning package tersedia
- minimal 2 dummy BoQ tersedia
- minimal 1 BoQ memiliki line items lengkap
- summary total dan badge tampil benar

### D. Presentasi
- client dapat memahami bahwa Create BoQ adalah turunan dari Plan & Design
- client dapat memahami bahwa BoQ harus selesai sebelum Purchase Request
- client dapat melihat struktur item, quantity, cost, dan approval tanpa backend

---

## 18. Skenario Demo Presentasi
### Skenario 1
User membuka daftar BoQ dan memilih membuat BoQ dari planning package **Approved for BoQ**.

### Skenario 2
Planner membuka halaman Create BoQ from Plan dan menunjukkan bahwa data sumber berasal dari 2.2.1.

### Skenario 3
Planner membuka Work Breakdown & Line Items lalu menunjukkan line item per kelompok pekerjaan.

### Skenario 4
Planner membuka Quantity & UoM lalu menunjukkan quantity basis dan satuan item.

### Skenario 5
Planner membuka Technical Mapping dan menunjukkan keterkaitan item terhadap spesifikasi dan referensi desain.

### Skenario 6
Cost engineer membuka halaman Cost Estimation dan menunjukkan pembentukan grand total.

### Skenario 7
Reviewer membuka halaman validation dan memberi catatan.

### Skenario 8
Approver membuka approval summary dan menyetujui dokumen.

### Skenario 9
Sistem menampilkan halaman **Ready for PR** sebagai langkah menuju **2.2.3 Purchase Request**.

---

## 19. Non-Functional untuk Tahap Demo
- fast loading
- responsive desktop first
- tablet acceptable
- tidak perlu mobile app level
- visual polished
- siap untuk demo meeting
- line item table stabil di desktop
- summary tetap terbaca saat data cukup banyak

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
- pastikan hubungan dengan 2.2.1 terlihat jelas
- jangan terlalu banyak fitur di luar scope 2.2.2

---

## 21. Deliverable Tahap Ini
Output yang diharapkan dari Antigravity:
1. halaman list BoQ
2. halaman create BoQ from plan
3. halaman detail BoQ header
4. halaman work breakdown & line items
5. halaman quantity & UoM
6. halaman technical reference mapping
7. halaman cost estimation
8. halaman review & validation
9. halaman approval summary
10. halaman ready for Purchase Request

---

## 22. Penutup
Submodul **2.2.2 CREATE BoQ** pada tahap ini difokuskan untuk membangun **UI/UX demo enterprise** yang menggambarkan proses penyusunan Bill of Quantity secara formal, rapi, clean, dan siap dipresentasikan ke client.

PRD ini juga menjaga kesinambungan dengan **2.2.1 PLAN & DESAIN**, terutama pada:
- source planning reference
- approval status Approved for BoQ
- handover flow
- tombol Create BoQ
- konsistensi visual dan navigasi

Setelah UI demo ini disetujui, tahapan berikutnya dapat dilanjutkan ke:
- penyempurnaan flow BoQ
- backend / middleware
- logika costing
- validasi data
- lanjutan ke **2.2.3 PURCHASE REQUEST**

---
