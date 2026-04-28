# PRD.md — EAM PELNI Phase 2.2.1
## Modul Perencanaan — Submodul 2.2.1 PLAN & DESAIN
### Version
v1.0 — UI/UX Demo Only

---

## 1. Ringkasan
Dokumen ini digunakan untuk pengembangan **UI/UX Demo** modul **Perencanaan** pada sistem **Enterprise Asset Management (EAM)** PELNI, khusus untuk submodul **2.2.1 PLAN & DESAIN**.

Fokus pengerjaan saat ini **hanya demo front-end** menggunakan **dummy data**, tanpa integrasi backend, tanpa workflow engine nyata, dan tanpa approval real-time.

Tujuan utamanya adalah:
- menampilkan alur perencanaan aset yang profesional
- menunjukkan flow kerja Plan & Design sebelum masuk ke BoQ
- memudahkan client memahami struktur proses bisnis
- menjadi dasar presentasi, validasi, dan approval awal UI

---

## 2. Scope Sprint / Tahap Saat Ini
### In Scope
- UI daftar usulan perencanaan
- UI form create planning request
- UI detail request
- UI technical assessment
- UI workspace plan & design
- UI review & comment
- UI budget check
- UI approval summary
- UI handover to BoQ readiness

### Out of Scope
- backend API
- database
- login real
- upload file real
- workflow approval real
- notifikasi real
- audit trail real
- generate PDF real
- integrasi procurement

---

## 3. Tujuan Bisnis
Submodul **2.2.1 PLAN & DESAIN** berfungsi untuk mengubah kebutuhan aset menjadi **paket rencana teknis awal** yang telah direview dan siap dilanjutkan ke proses **2.2.2 Create BoQ**.

Output utama dari submodul ini adalah:
- kebutuhan tervalidasi
- kajian teknis tersedia
- desain awal tersedia
- estimasi awal tersedia
- status siap BoQ

---

## 4. Prinsip UI Demo
UI harus menggambarkan aplikasi enterprise yang:
- rapi
- formal
- mudah dibaca
- cocok untuk BUMN / pemerintahan
- terasa seperti sistem kerja operasional sungguhan
- layout referensi: enterprise dashboard ala SAP / ERP style modern

### Gaya visual
- clean layout
- data dense but readable
- dominan putih / abu / biru gelap
- tabel profesional
- card summary di bagian atas
- form multi section
- status badge jelas
- sidebar kiri
- topbar standard enterprise

---

## 5. User Role untuk Demo
### 1. Requester / Unit Pengusul
Membuat usulan kebutuhan perencanaan.

### 2. Planner / Engineer
Mengisi technical assessment dan plan & design.

### 3. Reviewer
Melakukan review dan memberi catatan.

### 4. Budget Officer
Melihat estimasi awal dan memberi status budget check.

### 5. Approver
Melihat ringkasan akhir dan memberi keputusan.

> Catatan: Pada tahap demo, semua role cukup divisualisasikan dalam UI. Tidak perlu implementasi otorisasi nyata.

---

## 6. Business Flow Demo
Flow demo yang harus terlihat:

1. User melihat daftar planning request  
2. User membuat request baru  
3. User membuka detail request  
4. Planner mengisi technical assessment  
5. Planner menyusun plan & design  
6. Reviewer memberi komentar  
7. Budget officer memberi hasil budget check  
8. Approver melihat summary  
9. Sistem menandai request sebagai **Approved for BoQ**

---

## 7. Status Workflow Demo
Gunakan status berikut untuk dummy flow:
- Draft
- Submitted
- Under Screening
- Screening Approved
- Under Technical Assessment
- Under Planning & Design
- Under Review
- Revision Required
- Under Budget Check
- Pending Approval
- Approved for BoQ
- Rejected
- Cancelled

Status wajib ditampilkan sebagai badge berwarna.

---

## 8. Daftar Halaman yang Harus Dibuat

## 8.1 Planning Request List
### Tujuan
Menampilkan seluruh usulan perencanaan.

### Komponen
- page title
- breadcrumb
- filter bar
- search input
- tombol create new request
- table list
- pagination
- quick summary cards

### Summary cards
- Total Requests
- Under Assessment
- Pending Approval
- Approved for BoQ

### Filter
- status
- asset category
- location
- year
- priority
- unit pengusul

### Kolom tabel
- Request No
- Request Date
- Asset Code
- Asset Name
- Category
- Location
- Request Type
- Priority
- Current Status
- PIC Planner
- Target Date
- Action

### Action row
- View Detail
- Open Assessment
- Open Plan & Design
- Review Summary

---

## 8.2 Create Planning Request Page
### Tujuan
Halaman input usulan baru.

### Section Form
#### A. Informasi Umum
- Request No (auto dummy)
- Request Date
- Requester Unit
- Requester Name
- Department
- Request Type
- Priority

#### B. Informasi Aset
- Asset Code
- Asset Name
- Asset Category
- Asset Class
- Location / Site
- Existing Condition
- Criticality Level

#### C. Kebutuhan / Permasalahan
- Problem Title
- Problem Description
- Business Justification
- Operational Impact
- Safety / Compliance Impact
- Urgency Reason

#### D. Rencana Awal
- Proposed Action
- Estimated Target Start
- Estimated Target Finish
- Shutdown Required? (Yes/No)
- Related Program / RKAP / RKBMN
- Notes

#### E. Lampiran (dummy)
- upload area UI only

### Button
- Save as Draft
- Submit
- Cancel

---

## 8.3 Planning Request Detail
### Tujuan
Menampilkan ringkasan lengkap request.

### Layout
Gunakan model 2 kolom:
- kiri: informasi utama
- kanan: summary card & status timeline

### Section
- header request identity
- asset profile
- issue summary
- attached files (dummy)
- workflow timeline
- related notes
- next step buttons

### Header action
- Edit Request
- Start Assessment
- Send to Review
- Cancel Request

---

## 8.4 Technical Assessment Page
### Tujuan
Planner / engineer mengisi hasil kajian teknis.

### Section
#### A. Assessment Info
- Assessment No
- Planner Name
- Assessment Date
- Site Visit Date

#### B. Temuan Teknis
- Existing Technical Condition
- Root Cause
- Risk Level
- Safety Impact
- Compliance Impact
- Reliability Impact

#### C. Opsi Penanganan
- Repair
- Replace
- Upgrade
- Redesign
- Monitor / Defer

#### D. Recommended Action
- Recommendation Summary
- Technical Reason
- Preliminary Scope
- Required Shutdown
- Estimated Work Complexity

#### E. Supporting Evidence
- inspection photo placeholder
- drawing placeholder
- document placeholder

### Button
- Save Draft
- Submit Assessment
- Back

---

## 8.5 Plan & Design Workspace
### Tujuan
Halaman utama penyusunan paket plan & design.

### Section
#### A. Scope of Work
- Scope Summary
- In Scope
- Out of Scope
- Assumptions
- Constraints

#### B. Design Concept
- Design Objective
- Concept Description
- Initial Technical Specification
- Preliminary Drawing / Sketch placeholder
- Method Overview

#### C. Resource Planning
- Labor Requirement Summary
- Equipment Requirement Summary
- Material Group Summary
- Service Requirement Summary

#### D. Schedule Planning
- milestone list
- target engineering date
- target execution window
- shutdown window
- target ready for BoQ date

#### E. Risk & Dependency
- key risk
- mitigation
- dependency
- external permit / approval need

#### F. Preliminary Cost Estimate
- material estimate
- service estimate
- logistics estimate
- contingency estimate
- total preliminary estimate

### UI Tambahan
- tab navigation
- autosave badge dummy
- version label
- comment side panel dummy

### Button
- Save Draft
- Submit for Review
- Export Summary (dummy)
- Back to Request

---

## 8.6 Review & Comment Page
### Tujuan
Menampilkan hasil review lintas fungsi.

### Komponen
- review summary card
- reviewer list
- comments thread style
- checklist review area
- decision dropdown

### Review checklist
- scope is clear
- design concept is acceptable
- initial estimate is reasonable
- technical basis is sufficient
- ready for budget check
- revision required

### Decision
- Approved with Notes
- Revision Required
- Rejected

### Button
- Submit Review
- Return to Planner

---

## 8.7 Budget Check Page
### Tujuan
Menampilkan pengecekan anggaran awal.

### Field
- fiscal year
- budget owner
- cost center
- capex / opex
- budget availability
- preliminary budget ceiling
- estimated cost
- variance
- budget notes

### Decision
- Budget Feasible
- Feasible with Adjustment
- Not Feasible

### UI
- comparison card
- status ribbon
- summary notes

---

## 8.8 Approval Summary Page
### Tujuan
Menampilkan ringkasan final sebelum status Approved for BoQ.

### Komponen
- request summary
- asset summary
- technical recommendation summary
- plan & design summary
- review summary
- budget result
- final status

### Approval action
- Approve for BoQ
- Return for Revision
- Reject
- Hold

### UI Style
Halaman harus terasa formal, seperti halaman final approval di sistem enterprise.

---

## 8.9 BoQ Readiness Handover Page
### Tujuan
Menandai bahwa dokumen siap dilanjutkan ke 2.2.2 Create BoQ.

### Komponen
- approved package summary
- list dokumen yang tersedia
- missing item checklist
- readiness badge
- handover notes

### Output badge
- Ready for BoQ
- Need Completion

---

## 9. Navigasi yang Direkomendasikan
Sidebar menu demo:
- Dashboard
- Asset Registry
- Maintenance
- Perencanaan
  - Planning Request
  - Technical Assessment
  - Plan & Design
  - Review & Approval
  - Ready for BoQ
- Pengadaan
- Master Data
- Settings

> Pada demo, menu lain cukup placeholder.

---

## 10. Dummy Data Requirements

## 10.1 Contoh Request
### Dummy Record 1
- Request No: PLN-PLAN-2026-0012
- Asset Code: AST-KPL-MESIN-001
- Asset Name: Main Engine Cooling Pump
- Category: Mechanical
- Location: KM Kelud
- Request Type: Replacement
- Priority: High
- Status: Under Planning & Design

### Dummy Record 2
- Request No: PLN-PLAN-2026-0013
- Asset Code: AST-KPL-ELC-014
- Asset Name: Distribution Panel Deck B
- Category: Electrical
- Location: KM Bukit Siguntang
- Request Type: Upgrade
- Priority: Medium
- Status: Under Review

### Dummy Record 3
- Request No: PLN-PLAN-2026-0014
- Asset Code: AST-PRT-HVAC-020
- Asset Name: HVAC Passenger Deck
- Category: Facility
- Location: Terminal Penumpang Makassar
- Request Type: Rehabilitation
- Priority: Medium
- Status: Approved for BoQ

## 10.2 Dummy Reviewer
- Engineering Manager
- Asset Manager
- Operation Representative
- Budget Officer

---

## 11. Komponen UI Reusable
Buat komponen reusable berikut:
- PageHeader
- SummaryCard
- StatusBadge
- FilterBar
- DataTable
- InfoSectionCard
- TimelineVertical
- CommentPanel
- ApprovalCard
- CostSummaryCard
- EmptyState
- AttachmentPlaceholder
- StepProgressHeader

---

## 12. UX Rules
- tabel harus nyaman dibaca
- form panjang harus dibagi per section
- gunakan accordion atau tab bila perlu
- status workflow harus selalu terlihat
- action utama harus jelas
- hindari tampilan terlalu ramai
- semua halaman harus terasa siap presentasi ke client

---

## 13. Teknis Frontend Demo
### Stack
- Next.js
- Tailwind CSS
- component-based architecture
- dummy JSON / local mock data

### Catatan
- tidak perlu state management kompleks
- tidak perlu backend
- gunakan dummy actions
- bisa gunakan modal untuk approval / comment
- data boleh hardcoded

---

## 14. Struktur Folder yang Disarankan
```bash
src/
  app/
    eam/
      planning/
        requests/
        assessment/
        design/
        review/
        boq-ready/
  components/
    eam/
      planning/
        request-list/
        request-form/
        detail/
        assessment/
        design/
        review/
        approval/
  lib/
    mocks/
      planning/
```

---

## 15. Acceptance Criteria Demo

### A. Visual
- seluruh halaman utama 2.2.1 tersedia
- tampilan konsisten antar halaman
- gaya enterprise terlihat kuat
- status dan flow mudah dipahami client

### B. Flow
- user bisa berpindah antar halaman utama
- dummy status berubah sesuai skenario presentasi
- terdapat flow dari request sampai approved for BoQ

### C. Data
- minimal 3 dummy request tersedia
- setiap halaman memiliki data yang cukup untuk demo
- summary card dan badge tampil benar

### D. Presentasi
- client dapat memahami bahwa 2.2.1 selesai sebelum 2.2.2 dimulai
- client dapat melihat hubungan antar halaman tanpa backend

---

## 16. Skenario Demo Presentasi
### Skenario 1
User membuka daftar request dan memilih request dengan status **Under Planning & Design**.

### Skenario 2
Planner membuka technical assessment dan menunjukkan hasil analisa teknis.

### Skenario 3
Planner membuka workspace plan & design dan menunjukkan scope, design concept, risk, dan preliminary cost.

### Skenario 4
Reviewer membuka halaman review dan memberi catatan revisi.

### Skenario 5
Budget officer memberi hasil **Budget Feasible**.

### Skenario 6
Approver membuka halaman summary dan mengubah status menjadi **Approved for BoQ**.

---

## 17. Non-Functional untuk Tahap Demo
- fast loading
- responsive desktop first
- tablet acceptable
- tidak perlu mobile app level
- visual polished
- siap untuk demo meeting

---

## 18. Catatan Penting untuk Antigravity
Saat generate UI:
- fokus hanya front-end demo
- jangan buat backend dulu
- gunakan dummy data
- jangan buat logic kompleks
- prioritaskan halaman, layout, dan komponen reusable
- gunakan naming yang rapi dan enterprise
- jangan terlalu banyak fitur di luar scope 2.2.1

---

## 19. Deliverable Tahap Ini
Output yang diharapkan dari Antigravity:
1. halaman list planning request
2. halaman create request
3. halaman detail request
4. halaman technical assessment
5. halaman plan & design workspace
6. halaman review & comment
7. halaman budget check
8. halaman approval summary
9. halaman ready for BoQ

---

## 20. Penutup
Submodul **2.2.1 PLAN & DESAIN** pada tahap ini difokuskan untuk membangun **UI/UX demo enterprise** yang menggambarkan proses perencanaan aset secara formal, rapi, dan siap dipresentasikan ke client.

Setelah UI demo ini disetujui, tahapan berikutnya dapat dilanjutkan ke:
- penyempurnaan flow
- pembuatan PRD backend/middleware
- integrasi data
- lanjutan ke **2.2.2 CREATE BoQ**

---
