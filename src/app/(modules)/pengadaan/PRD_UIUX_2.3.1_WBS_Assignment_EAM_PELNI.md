# PRD UI/UX 2.3.1 — WBS Assignment
## Project: EAM PELNI
## Stage: Tahap 1 — Frontend Demo with Dummy Data
## Format: Markdown for Google AntiGravity

---

## 1. Overview

Submodul **2.3.1 WBS Assignment** berada pada Modul **2.3 Pengadaan** dan berfungsi sebagai penghubung antara hasil perencanaan dan proses eksekusi pengadaan.

Pada flow sebelumnya:
- **2.2.2 Plan & Desain** menghasilkan rencana pekerjaan, kebutuhan material/jasa, estimasi biaya, target waktu, dan referensi aset/kapal/lokasi.
- **2.2.3 Purchase Request** mengubah kebutuhan tersebut menjadi permintaan pembelian yang sudah lebih terstruktur.

Submodul **WBS Assignment** memastikan setiap item pada PR dihubungkan ke **WBS / Work Breakdown Structure / paket pekerjaan** yang benar agar proses pengadaan memiliki dasar kontrol biaya, akuntabilitas, dan keterlacakan.

Dalam demo UI/UX, fokus utamanya adalah:
- menampilkan daftar PR yang siap di-assign
- memilih WBS yang sesuai untuk tiap item PR
- memvalidasi kesesuaian assignment
- mengubah status agar item siap diproses ke Purchase Order

---

## 2. Objective

Membangun UI/UX demo yang clean, ringan, dan mudah dipahami untuk proses **WBS Assignment**, dengan gaya visual enterprise yang terinspirasi dari **SAP Business One**.

Tujuan bisnis:
- memastikan setiap kebutuhan pengadaan terhubung ke pekerjaan yang sah
- menjaga kesinambungan antara perencanaan dan procurement
- mempermudah monitoring biaya per pekerjaan
- mendukung audit trail dan kontrol approval
- mencegah PR diproses ke PO tanpa assignment yang valid

---

## 3. Design Direction

### Visual Direction
- clean enterprise UI
- reference ke SAP Business One
- layout padat tapi tetap rapi
- fokus pada table, form panel, tab, dan status badge
- warna netral profesional
- minim dekorasi, lebih menonjolkan data dan action

### UX Principles
- user bisa melihat konteks PR tanpa berpindah-pindah halaman terlalu banyak
- assignment dibuat cepat untuk banyak item
- validasi harus terlihat jelas
- status proses mudah dipahami
- hubungan dengan modul sebelumnya harus terasa kuat

---

## 4. Scope

### In Scope
- list PR yang siap WBS assignment
- detail PR dan item-item PR
- pemilihan WBS untuk tiap item
- rekomendasi WBS berdasarkan referensi plan
- validasi assignment
- status workflow assignment
- approval assignment (demo level)
- ready for PO status
- dummy data dan relasi ke modul sebelumnya

### Out of Scope
- posting akuntansi real
- integrasi budget engine real
- integrasi vendor real
- approval engine kompleks multi-level
- notifikasi email/whatsapp real
- integrasi backend/API real

---

## 5. User Roles

### 1. Procurement Admin
- melihat PR approved yang menunggu assignment
- assign WBS per item
- submit assignment

### 2. Planner / Maintenance Planner
- memastikan WBS sesuai rencana kerja
- review assignment terhadap referensi plan

### 3. Budget Owner / Supervisor
- approval atau reject assignment
- memastikan pembebanan biaya sesuai

### 4. Viewer / Auditor
- hanya melihat data assignment dan audit trail

---

## 6. Business Flow Summary

### Flow Keterkaitan Antar Modul
1. Plan & Desain dibuat
2. kebutuhan material/jasa teridentifikasi
3. Purchase Request dibuat dan approved
4. PR masuk ke submodul WBS Assignment
5. item PR dipetakan ke WBS
6. assignment divalidasi dan disetujui
7. item berubah menjadi **Ready for PO**
8. proses dilanjutkan ke **2.3.2 Purchase Order**

### Inti Peran Submodul
WBS Assignment adalah titik kontrol agar PR dari perencanaan tidak langsung menjadi PO tanpa kejelasan pekerjaan, anggaran, dan ownership.

---

## 7. Input - Process - Output

## 7.1 Input

Sumber input dari modul sebelumnya:
- approved Purchase Request
- referensi Plan & Desain
- daftar item material/jasa
- asset / vessel / location reference
- target date
- cost estimate
- priority
- candidate WBS list
- budget owner reference

Contoh field input:
- PR No
- PR Date
- Requesting Unit
- Vessel / Asset
- Planning Ref No
- Item No
- Item Type
- Item Name
- Qty
- UoM
- Required Date
- Estimated Price
- Existing Suggested WBS

## 7.2 Process

1. user membuka daftar PR yang menunggu WBS assignment
2. user memilih salah satu PR
3. sistem menampilkan header PR dan daftar item
4. sistem menampilkan rekomendasi WBS berdasarkan plan reference
5. user memilih WBS per item atau per group item
6. sistem memvalidasi kesesuaian WBS
7. user simpan draft assignment
8. user submit untuk approval
9. approver melakukan approve / reject
10. item yang valid berubah status menjadi **Ready for PO**

## 7.3 Output

- assignment record per item PR
- status assignment
- log approval
- daftar item ready for PO
- riwayat perubahan assignment

---

## 8. Functional Requirements

### FR-01 Dashboard / List WBS Assignment
Sistem menampilkan daftar PR yang siap untuk assignment.

Kolom utama:
- PR No
- PR Date
- Requesting Unit
- Vessel / Asset
- Planning Ref
- Total Items
- Total Estimate
- Assignment Status
- Approval Status
- Action

Action:
- view detail
- assign WBS
- continue draft
- submit

### FR-02 Filter & Search
User dapat memfilter daftar berdasarkan:
- PR No
- unit
- vessel / asset
- planning ref
- status assignment
- approval status
- date range

### FR-03 PR Header Detail
Saat membuka detail, sistem menampilkan ringkasan PR:
- PR No
- requestor
- department
- vessel / asset
- planning reference
- required date
- priority
- total estimate
- notes

### FR-04 PR Item Assignment Grid
Sistem menampilkan grid item PR dengan kolom:
- item no
- item type
- item code
- item name
- specification
- qty
- uom
- estimated price
- suggested WBS
- selected WBS
- validation result
- status

### FR-05 WBS Selection
User dapat memilih WBS melalui:
- dropdown searchable
- modal browse WBS
- quick select dari suggested WBS

Data WBS minimum:
- WBS code
- WBS name
- parent work/package
- vessel / asset scope
- budget owner
- period
- status active/inactive

### FR-06 Bulk Assignment
User dapat assign WBS untuk banyak item sekaligus jika item-item terkait pada pekerjaan yang sama.

### FR-07 Validation Engine (UI Demo)
Sistem menampilkan hasil validasi visual:
- valid
- warning
- error

Aturan validasi demo:
- WBS wajib diisi
- WBS harus aktif
- WBS harus sesuai vessel/asset jika ada constraint
- required date harus berada pada period yang valid
- item tidak boleh submitted jika masih ada validation error

### FR-08 Save Draft
User dapat menyimpan draft assignment sebelum submit.

### FR-09 Submit for Approval
User dapat mengirim assignment ke approver.

### FR-10 Approval Action
Approver dapat:
- approve all
- reject all
- return for revision
- isi note approval

### FR-11 Ready for PO
Setelah approval valid, status berubah menjadi:
- Assignment Approved
- Ready for PO

### FR-12 Audit Trail
Sistem menampilkan histori:
- dibuat oleh
- diubah oleh
- submit oleh
- approve/reject oleh
- tanggal & jam
- remarks

---

## 9. Non-Functional Requirements

- UI harus ringan untuk demo
- struktur markdown harus ringkas dan aman untuk Google AntiGravity
- komponen reusable
- responsif minimal untuk desktop/tablet
- data dummy konsisten antar modul
- istilah UI konsisten dengan modul 2.2.2 dan 2.2.3

---

## 10. Workflow Status

### Assignment Status
- Draft
- Waiting Assignment
- Partially Assigned
- Fully Assigned
- Submitted
- Need Revision
- Approved
- Rejected
- Ready for PO

### Validation Status per Item
- Not Assigned
- Valid
- Warning
- Error

---

## 11. Business Rules

1. hanya PR dengan status **Approved** yang dapat masuk ke WBS Assignment
2. setiap item PR wajib memiliki WBS sebelum lanjut ke PO
3. item dengan validation error tidak boleh disubmit
4. satu item hanya boleh memiliki satu WBS pada demo tahap ini
5. bulk assignment diperbolehkan hanya untuk item yang relevan pada pekerjaan yang sama
6. perubahan setelah submit harus tercatat di audit trail
7. approval dapat mengembalikan data ke draft/revision
8. hanya item dengan assignment approved yang akan berstatus **Ready for PO**

---

## 12. Screen List

## Screen 1 — WBS Assignment List

### Tujuan
Menampilkan daftar PR yang siap atau sedang dalam proses assignment.

### Layout
- top header page
- filter bar
- table list
- summary badge
- action button

### Komponen
- page title: `WBS Assignment`
- breadcrumb: `Procurement > WBS Assignment`
- filter search
- status tabs
- primary button: `Open`, `Continue Draft`

### Catatan UI
Gaya list mengikuti SAP Business One style: dominan tabel, rapat, jelas, dan sangat operasional.

---

## Screen 2 — WBS Assignment Detail

### Tujuan
Menampilkan detail PR serta item PR yang akan di-assign.

### Layout
- header info card
- tab section
- item assignment grid
- right panel / modal tools
- footer action bar

### Tabs
- Overview
- Items
- Assignment Log
- Approval Notes

### Header Section
Menampilkan:
- PR No
- Planning Ref
- Requesting Unit
- Vessel / Asset
- Priority
- Total Estimate
- Assignment Status

### Footer Actions
- Save Draft
- Validate
- Submit for Approval
- Back

---

## Screen 3 — WBS Browse Modal

### Tujuan
Memudahkan user memilih WBS yang sesuai.

### Komponen
- search field
- filter by vessel/asset
- filter by status
- table WBS
- select action

### Kolom Tabel
- WBS Code
- WBS Name
- Parent Work
- Vessel / Asset
- Budget Owner
- Status

---

## Screen 4 — Approval Review Screen

### Tujuan
Memudahkan approver meninjau assignment sebelum approve/reject.

### Komponen
- summary header
- item list with selected WBS
- validation result
- approval notes
- action buttons

### Action Buttons
- Approve
- Return for Revision
- Reject

---

## Screen 5 — Assignment Audit Trail Modal

### Tujuan
Menampilkan histori perubahan.

### Data
- user
- action
- old value
- new value
- timestamp
- note

---

## 13. UI Component Guidance

Gunakan komponen berikut:
- enterprise table
- compact form field
- searchable dropdown
- status badge
- tabs
- modal dialog
- side panel summary
- sticky footer action bar

### Style Notes
- gunakan spacing yang efisien
- hindari desain terlalu modern atau terlalu banyak ilustrasi
- gunakan garis table halus
- gunakan badge kecil untuk status
- gunakan warna secukupnya hanya untuk status dan action penting

---

## 14. Suggested Information Architecture

```text
Procurement
└── WBS Assignment
    ├── List
    ├── Detail
    │   ├── Overview
    │   ├── Items
    │   ├── Assignment Log
    │   └── Approval Notes
    ├── WBS Browse Modal
    └── Approval Review
```

---

## 15. Dummy Data Example

### PR Header Dummy
- PR No: PR-PELNI-2026-0042
- PR Date: 2026-04-18
- Requesting Unit: Technical Fleet Division
- Vessel: KM Kelud
- Planning Ref: PLN-KM-KLD-2026-018
- Priority: High
- Total Estimate: Rp 285.000.000
- Status: Waiting Assignment

### PR Item Dummy
1. Impeller Cooling Pump — Qty 2 — Est Rp 45.000.000
2. Bearing Set Main Engine — Qty 4 — Est Rp 60.000.000
3. Jasa Overhaul Cooling Line — Qty 1 — Est Rp 180.000.000

### Suggested WBS Dummy
- WBS-DOCK-KLD-001 — Docking KM Kelud 2026
- WBS-MNT-KLD-014 — Preventive Maintenance Cooling System
- WBS-ENG-KLD-003 — Engineering Repair Main Engine

---

## 16. Example User Journey

### Procurement Admin
1. buka menu WBS Assignment
2. cari PR approved
3. buka detail PR
4. lihat suggested WBS dari planning reference
5. assign WBS untuk tiap item
6. klik validate
7. simpan draft atau submit

### Approver
1. buka assignment submitted
2. review item dan WBS
3. baca note dan validation result
4. approve atau return for revision

---

## 17. Error / Empty / Edge States

### Empty State
- belum ada PR approved yang menunggu assignment

### Error States
- WBS belum dipilih
- WBS inactive
- WBS tidak cocok dengan vessel/asset
- item gagal validasi period

### Edge Cases
- sebagian item valid, sebagian tidak valid
- WBS yang sebelumnya dipilih menjadi inactive
- approver meminta revisi note wajib diisi

---

## 18. Acceptance Criteria

### AC-01
User dapat melihat daftar PR approved yang menunggu assignment.

### AC-02
User dapat membuka detail PR dan melihat item-item yang harus di-assign.

### AC-03
User dapat memilih WBS untuk tiap item.

### AC-04
User dapat melakukan bulk assignment untuk beberapa item.

### AC-05
Sistem menampilkan hasil validasi secara jelas.

### AC-06
User dapat menyimpan draft assignment.

### AC-07
User dapat submit assignment untuk approval.

### AC-08
Approver dapat approve, reject, atau return for revision.

### AC-09
Item yang approved berubah status menjadi Ready for PO.

### AC-10
Audit trail tampil untuk setiap perubahan penting.

---

## 19. Handoff Notes for Frontend Developer

- stack target: Next.js + Tailwind
- buat data dummy local/static terlebih dahulu
- gunakan reusable table dan modal component
- siapkan status badge component global
- gunakan layout enterprise dashboard
- desain harus konsisten dengan modul 2.2.x sebelumnya
- fokus desktop first

---

## 20. Handoff Notes for Backend Phase Later

Pada tahap backend nanti, endpoint yang kemungkinan dibutuhkan:
- GET `/wbs-assignments`
- GET `/wbs-assignments/:id`
- POST `/wbs-assignments/save-draft`
- POST `/wbs-assignments/validate`
- POST `/wbs-assignments/submit`
- POST `/wbs-assignments/approve`
- POST `/wbs-assignments/reject`
- GET `/wbs-master/search`

Ini hanya catatan awal dan belum menjadi scope implementasi tahap UI/UX demo.

---

## 21. Relation to Next Module

Output dari submodul ini akan menjadi input utama untuk:
- **2.3.2 Purchase Order**

Kondisi untuk lanjut:
- PR item sudah assigned ke WBS
- assignment sudah approved
- item berstatus **Ready for PO**

Dengan demikian flow tetap utuh:

```text
2.2.2 Plan & Design
→ 2.2.3 Purchase Request
→ 2.3.1 WBS Assignment
→ 2.3.2 Purchase Order
→ 2.3.3 Delivery Order
```

---

## 22. Final Notes

Dokumen ini disusun untuk kebutuhan:
- PRD ringan dan mudah dibaca di Google AntiGravity
- acuan pembuatan UI/UX demo
- memastikan kesinambungan antar submodul procurement
- menjaga tone enterprise system ala SAP Business One

