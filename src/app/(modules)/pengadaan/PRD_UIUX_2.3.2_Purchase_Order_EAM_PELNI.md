# PRD UI/UX 2.3.2 Purchase Order
## Project: EAM PELNI
## Modul: 2.3 Pengadaan
## Submodul: 2.3.2 Purchase Order
## Format: UI/UX Demo PRD
## Status: Draft for Google AntiGravity

---

## 1. Ringkasan
Submodul **Purchase Order (PO)** adalah proses lanjutan dari **2.2.3 Purchase Request** dan **2.3.1 WBS Assignment**. Tujuan utamanya adalah mengubah kebutuhan internal yang sudah valid menjadi **dokumen pemesanan resmi ke vendor**.

Pada tahap UI/UX demo, fokus submodul ini adalah:
- menampilkan daftar item yang siap dibuatkan PO
- membantu user pengadaan memilih vendor
- membentuk draft PO berdasarkan referensi PR dan WBS Assignment
- mengelola approval dan release PO
- menampilkan monitoring status PO hingga siap diteruskan ke Delivery Order

Dokumen ini disusun untuk kebutuhan **Tahap 1: Frontend Demo dengan data dummy** dan menggunakan gaya visual **clean enterprise** dengan referensi **SAP Business One**.

---

## 2. Tujuan Submodul
1. Mengubah PR item yang sudah valid menjadi PO resmi.
2. Menjaga agar setiap PO tetap terhubung ke PR dan WBS.
3. Menentukan vendor, harga, quantity, delivery date, dan receiving location.
4. Menjadi dasar proses pengiriman barang/jasa pada submodul berikutnya.
5. Menyediakan kontrol approval, status, dan audit trail.

---

## 3. Keterkaitan dengan Modul Sebelumnya

### 3.1 Keterkaitan dengan 2.2.2 Plan & Desain
Purchase Order harus tetap dapat ditelusuri sampai ke:
- aset / kapal / unit
- pekerjaan / activity plan
- target waktu kebutuhan
- estimasi biaya
- kebutuhan material atau jasa

### 3.2 Keterkaitan dengan 2.2.3 Purchase Request
PO dibuat dari item PR yang sudah:
- approved
- memiliki detail kebutuhan yang jelas
- memiliki quantity, UoM, tanggal kebutuhan, dan spesifikasi

### 3.3 Keterkaitan dengan 2.3.1 WBS Assignment
PO hanya boleh dibuat dari item yang sudah:
- assigned ke WBS / work package
- valid terhadap budget / owner / cost object
- memiliki status **Ready for PO**

### 3.4 Keterkaitan dengan 2.3.3 Delivery Order
PO yang sudah approved dan released akan menjadi dasar untuk:
- pengiriman barang oleh vendor
- penerimaan barang/jasa
- monitoring fulfillment

---

## 4. Ruang Lingkup UI/UX Demo
Cakupan pada demo:
- List item Ready for PO
- Create PO from PR/WBS
- Draft PO Header & Items
- Vendor selection
- Approval flow simulation
- PO detail view
- PO status tracking
- Print / export preview (dummy)

Di luar cakupan demo tahap ini:
- integrasi vendor portal
- perhitungan pajak kompleks
- integrasi email otomatis ke vendor
- integrasi accounting / invoice posting
- multi-currency kompleks
- auto source determination berbasis kontrak penuh

---

## 5. User Roles

### 5.1 Procurement Staff
- melihat item ready for PO
- membuat draft PO
- memilih vendor
- mengisi detail pengadaan
- submit approval

### 5.2 Procurement Supervisor
- review PO draft
- approve / reject / revise PO

### 5.3 Budget Owner / Manager
- melihat referensi WBS dan nilai pembelian
- memberikan persetujuan sesuai batas kewenangan

### 5.4 Read Only / Auditor
- melihat histori PO
- melihat audit trail dan relasi dokumen

---

## 6. Business Flow

### 6.1 Flow Utama
1. User membuka daftar item **Ready for PO**.
2. Sistem menampilkan item dari PR yang sudah approved dan sudah assigned ke WBS.
3. User memilih satu atau beberapa item untuk dibuatkan PO.
4. User memilih vendor.
5. Sistem membentuk draft PO dengan referensi PR dan WBS.
6. User melengkapi informasi header dan item.
7. Sistem melakukan validasi.
8. User submit untuk approval.
9. Approver menyetujui / menolak / meminta revisi.
10. Jika disetujui, PO mendapat nomor resmi dan status **Released**.
11. PO siap digunakan sebagai dasar proses Delivery Order.

### 6.2 Flow Alternatif
#### A. Draft disimpan tanpa submit
- user membuat draft
- status tetap `Draft`

#### B. PO ditolak
- status menjadi `Rejected`
- user procurement melakukan revisi

#### C. Sebagian item dibuat ke vendor berbeda
- item di-split menjadi beberapa draft PO
- setiap draft PO tetap menyimpan referensi PR item asal

#### D. Sebagian quantity dipesan
- PO item boleh parsial
- sistem menandai sisa quantity PR sebagai open

---

## 7. Flow Input - Process - Output

### 7.1 Input
Input utama:
- Approved Purchase Request
- Approved WBS Assignment
- item status `Ready for PO`
- vendor master
- receiving location
- payment term
- delivery term
- estimated / negotiated price

Input turunan:
- PR No
- PR Item No
- WBS Code
- Plan Reference
- Asset / Vessel / Location
- material / service name
- qty
- UoM
- required date
- budget owner

### 7.2 Process
1. Ambil daftar item `Ready for PO`.
2. User memilih item yang akan dipesan.
3. User memilih vendor.
4. Sistem membentuk draft PO.
5. User melengkapi header dan item details.
6. Sistem validasi mandatory fields, WBS, quantity, vendor, delivery date.
7. User submit approval.
8. Approver review.
9. Jika approved, sistem generate nomor PO dan status `Released`.

### 7.3 Output
- Draft PO
- Approved / Released PO
- relasi PO ke PR dan WBS
- status item procurement
- data monitoring open PO
- dasar untuk proses Delivery Order

---

## 8. Struktur Halaman

### 8.1 PO Ready List
Fungsi:
- menampilkan item-item yang siap dibuatkan PO

Kolom utama:
- Select
- PR No
- PR Item
- Request Date
- Requesting Unit
- Asset / Vessel
- WBS Code
- Item Type
- Item Name
- Qty
- UoM
- Required Date
- Estimated Price
- Suggested Vendor
- Status

Filter:
- date range
- PR No
- requesting unit
- vessel / asset
- WBS code
- item type
- status
- vendor suggestion

Action:
- Create PO
- View PR
- View WBS
- Refresh

### 8.2 Create Purchase Order
Fungsi:
- membuat draft PO dari item terpilih

Section:
1. Header Information
2. Vendor Information
3. Delivery & Payment
4. Item List
5. Notes & Attachment (dummy)

Field Header:
- PO Date
- Document Type
- Vendor
- Vendor Contact
- Currency
- Payment Term
- Delivery Term
- Ship To / Receiving Location
- Reference PR
- Reference WBS
- Internal Notes

Field Item:
- Line No
- PR No
- PR Item No
- WBS Code
- Item Code
- Item Name
- Description
- Qty Ordered
- UoM
- Unit Price
- Tax Code
- Delivery Date
- Warehouse / Receiving Point
- Remarks

Action:
- Save Draft
- Submit Approval
- Cancel

### 8.3 PO Detail
Fungsi:
- melihat data lengkap Purchase Order

Informasi yang ditampilkan:
- header PO
- vendor
- item list
- approval history
- reference documents
- fulfillment status
- audit trail

Action:
- Edit (jika Draft / Rejected)
- Submit Approval
- Approve
- Reject
- Release
- Print Preview
- Close PO

### 8.4 PO Approval Inbox
Fungsi:
- menampilkan daftar PO yang menunggu approval

Kolom:
- PO No / Draft No
- PO Date
- Vendor
- Total Amount
- Currency
- WBS Summary
- Created By
- Waiting Since
- Status

Action:
- View
- Approve
- Reject
- Request Revision

### 8.5 PO Monitoring List
Fungsi:
- memonitor status PO sesudah release

Kolom:
- PO No
- Vendor
- PO Date
- Total Amount
- Delivery Status
- Invoice Status
- Related DO
- PR Reference
- WBS Reference
- Status

Filter:
- vendor
- open / partial / closed
- date range
- WBS code
- receiving location

---

## 9. Komponen UI

### 9.1 Gaya Visual
Referensi visual:
- SAP Business One
- clean enterprise layout
- dominan putih / abu muda
- table grid rapi
- panel header tipis
- form horizontal
- tombol aksi ringkas
- badge status berwarna lembut

### 9.2 Layout
- top header page
- action bar
- filter panel collapsible
- table content area
- right drawer / modal untuk quick detail
- form card per section

### 9.3 UX Principle
- fokus pada efisiensi kerja user procurement
- tabel mudah discan
- input tidak terlalu padat
- status selalu terlihat jelas
- relasi dokumen mudah ditelusuri
- minim klik untuk create PO dari item siap proses

---

## 10. Status Workflow

### 10.1 Header Status
- Draft
- Waiting Approval
- Approved
- Released
- Sent to Vendor
- Partially Fulfilled
- Fully Fulfilled
- Closed
- Cancelled
- Rejected

### 10.2 Item Status
- Open
- Partial Ordered
- Ordered
- Partially Delivered
- Delivered
- Closed
- Cancelled

### 10.3 Badge UX
Contoh badge:
- Draft = grey
- Waiting Approval = orange
- Approved = blue
- Released = green
- Rejected = red
- Partial = yellow
- Closed = dark grey

---

## 11. Business Rules
1. PO hanya dapat dibuat dari PR yang sudah approved.
2. PO hanya dapat dibuat dari item yang sudah memiliki WBS Assignment valid.
3. PO tidak boleh dibuat jika status item belum `Ready for PO`.
4. Satu PO dapat berisi beberapa item jika vendor sama dan kebutuhan logis untuk digabung.
5. Jika vendor berbeda, sistem harus mendorong split PO.
6. Qty ordered tidak boleh melebihi open qty dari PR item.
7. WBS di item PO wajib mengikuti WBS Assignment sumber.
8. Receiving location wajib diisi.
9. PO yang sudah `Released` tidak bisa diedit bebas, perubahan harus melalui revisi.
10. Semua aksi approval dan perubahan wajib tercatat di audit trail.

---

## 12. Validasi Form

### 12.1 Validasi Header
- Vendor wajib dipilih
- PO Date wajib diisi
- Payment Term wajib diisi
- Receiving Location wajib diisi
- minimal 1 item

### 12.2 Validasi Item
- Qty Ordered > 0
- Qty Ordered <= Open Qty
- Delivery Date wajib diisi
- Unit Price >= 0
- WBS Code wajib ada
- Item Name wajib tampil

### 12.3 Validasi Workflow
- Draft hanya dapat disubmit jika field mandatory lengkap
- Approve hanya bisa dilakukan oleh role approver
- Release hanya bisa dilakukan setelah approved

---

## 13. Data Model Konseptual

### 13.1 PO Header
- po_id
- po_no
- po_date
- vendor_id
- vendor_name
- currency
- payment_term
- delivery_term
- receiving_location_id
- reference_pr_summary
- reference_wbs_summary
- total_amount
- status
- created_by
- created_at
- approved_by
- approved_at
- released_by
- released_at

### 13.2 PO Item
- po_item_id
- po_id
- line_no
- pr_no
- pr_item_no
- wbs_code
- asset_id
- item_type
- item_code
- item_name
- description
- qty_ordered
- uom
- unit_price
- tax_code
- delivery_date
- receiving_location_id
- item_status

### 13.3 Approval Log
- approval_log_id
- po_id
- action
- action_by
- action_at
- notes

---

## 14. Dummy Data untuk UI Demo

### 14.1 Dummy Vendor
- PT Samudra Teknik
- PT Bahari Sparepart Indonesia
- PT Docking Nusantara
- PT Sinar Marine Services

### 14.2 Dummy Ready for PO Items
1. PR-2026-0041 / Item 001
   - Spare Part Main Pump
   - Qty 4 EA
   - WBS: WBS-DOCK-001
   - Vessel: KM Kelud
   - Suggested Vendor: PT Bahari Sparepart Indonesia

2. PR-2026-0041 / Item 002
   - Gasket Set Engine Room
   - Qty 10 EA
   - WBS: WBS-DOCK-001
   - Vessel: KM Kelud
   - Suggested Vendor: PT Samudra Teknik

3. PR-2026-0057 / Item 001
   - Jasa Overhaul Pompa
   - Qty 1 AU
   - WBS: WBS-MTN-014
   - Vessel: KM Umsini
   - Suggested Vendor: PT Sinar Marine Services

### 14.3 Dummy Status Scenario
- 2 Draft PO
- 1 Waiting Approval
- 2 Released
- 1 Partially Fulfilled

---

## 15. Rekomendasi Navigasi

### Main Menu Path
`Pengadaan > Purchase Order`

### Submenu
- Ready for PO
- Draft PO
- Approval Inbox
- PO Monitoring
- Vendor Reference

### Breadcrumb Example
`Home / Pengadaan / Purchase Order / Create PO`

---

## 16. Acceptance Criteria UI/UX Demo

### 16.1 Ready List
- user dapat melihat daftar item yang siap dibuat PO
- user dapat filter berdasarkan PR, vendor, WBS, vessel, status
- user dapat memilih satu atau beberapa item

### 16.2 Create PO
- user dapat membuat draft PO dari item terpilih
- data PR dan WBS tampil otomatis sebagai referensi
- vendor dapat dipilih dari lookup
- qty, price, delivery date dapat diisi / disesuaikan

### 16.3 Approval
- draft dapat disubmit ke approval
- approver dapat approve, reject, atau request revision
- histori approval tampil di detail

### 16.4 Monitoring
- user dapat melihat status PO sesudah release
- user dapat melihat relasi ke PR dan WBS
- user dapat melihat indikator fulfillment

---

## 17. Catatan Desain untuk Konsistensi dengan PRD Sebelumnya
1. Gunakan struktur halaman yang sama dengan modul sebelumnya.
2. Pertahankan pola:
   - list page
   - detail page
   - create/edit form
   - approval inbox
3. Gunakan style tabel dan filter panel yang konsisten.
4. Istilah dokumen harus konsisten dengan submodul PR dan WBS Assignment.
5. Relasi dokumen harus terlihat jelas di header dan item.

---

## 18. Catatan untuk Developer AntiGravity
Fokus implementasi tahap ini adalah **UI demo only**.

### Frontend Stack
- Next.js
- Tailwind CSS
- component style clean enterprise
- dummy JSON/local mock data

### Belum perlu di tahap ini
- backend API real
- database real
- autentikasi real
- integrasi vendor email
- integrasi PDF generator final

### Komponen yang disarankan
- DataTable
- FilterBar
- StatusBadge
- FormSectionCard
- DocumentRelationPanel
- ApprovalTimeline
- HeaderActionBar

---

## 19. Out of Scope
- kontrak pembelian jangka panjang
- quotation comparison full process
- goods receipt real
- invoice posting
- vendor performance scoring detail
- multi-company procurement rules kompleks

---

## 20. Penutup
Submodul **2.3.2 Purchase Order** adalah titik perubahan dari kebutuhan internal menjadi komitmen pembelian resmi ke vendor. Dalam konteks EAM PELNI, submodul ini harus menjaga hubungan yang kuat antara:
- kebutuhan perencanaan
- Purchase Request
- WBS Assignment
- proses pengiriman barang / jasa berikutnya

PRD ini dibuat agar tim dapat langsung membangun **UI/UX demo** yang rapi, ringan, dan konsisten dengan modul-modul sebelumnya.
