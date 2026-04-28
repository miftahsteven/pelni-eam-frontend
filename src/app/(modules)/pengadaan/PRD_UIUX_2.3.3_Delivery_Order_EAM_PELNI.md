# PRD UI/UX 2.3.3 Delivery Order
## Project
EAM PELNI – Modul 2.3 Pengadaan

## Submodul
2.3.3 Delivery Order

## Dokumen Versi
v1.0 – UI/UX Demo Stage

## Format Target
PRD ringan untuk Google AntiGravity

## Design Reference
**Wajib menggunakan referensi desain SAP Business One** untuk seluruh keputusan UI/UX pada submodul ini.

---

# 1. Tujuan Submodul
Submodul **Delivery Order** digunakan untuk mencatat, memverifikasi, dan memonitor pengiriman barang/jasa dari vendor berdasarkan **Purchase Order** yang telah dirilis. Submodul ini menjadi penghubung antara proses pemesanan dan proses penerimaan internal.

Delivery Order pada demo UI/UX ini difokuskan untuk:
- mencatat pengiriman vendor berdasarkan PO
- memonitor pengiriman parsial maupun penuh
- memverifikasi dokumen pengiriman dan kuantitas kirim
- menyiapkan data untuk proses berikutnya seperti Goods Receipt atau Service Confirmation
- menjaga keterkaitan data dari **PR → WBS Assignment → PO → Delivery Order**

---

# 2. Keterkaitan dengan Modul Sebelumnya

## 2.2.2 Plan & Desain
Menjadi sumber kebutuhan awal pekerjaan, material, atau jasa.

## 2.2.3 Purchase Request
Menghasilkan item kebutuhan pembelian yang disetujui.

## 2.3.1 WBS Assignment
Mengikat item PR ke work package / WBS yang benar.

## 2.3.2 Purchase Order
Menjadi dasar utama Delivery Order. DO hanya boleh dibuat dari PO yang valid dan sudah released.

---

# 3. Tujuan UI/UX Demo
UI/UX demo ini dibuat untuk menunjukkan alur enterprise yang sederhana, rapi, dan mudah dipahami user bisnis, dengan gaya visual yang mengacu pada **SAP Business One**:
- layout desktop-first
- clean header document
- grid item yang dominan
- section form ringkas dan informatif
- status dokumen jelas
- relasi base document terlihat
- tombol aksi tidak berlebihan

---

# 4. User / Role

## Primary Users
- Staff Procurement
- Staff Warehouse / Receiving
- Supervisor Procurement
- User Verifikator

## Secondary Users
- Planner
- Budget Owner
- Auditor Internal

---

# 5. Scope Tahap Demo

## In Scope
- daftar PO yang siap dipenuhi
- pembuatan Delivery Order dari PO
- pencatatan nomor surat jalan vendor
- pencatatan item dan qty kirim
- monitoring status pengiriman
- verifikasi penerimaan awal
- relasi ke PO dan WBS
- status dokumen dan histori pengiriman

## Out of Scope
- integrasi vendor portal
- auto ASN / EDI
- integrasi scanner barcode nyata
- workflow invoice
- accounting posting
- multi-company advanced logic

---

# 6. Business Flow Ringkas
1. User membuka daftar PO yang sudah released.
2. User memilih PO yang masih memiliki open quantity.
3. User membuat Delivery Order berdasarkan PO.
4. Sistem menarik item PO yang masih outstanding.
5. User mengisi data pengiriman vendor dan qty yang dikirim.
6. User melakukan verifikasi awal saat barang/jasa datang.
7. Sistem memperbarui status delivery dan remaining quantity.
8. Data siap diteruskan ke proses Goods Receipt atau Service Confirmation.

---

# 7. Flow Input – Process – Output

## Input
- Purchase Order berstatus Released / Sent to Vendor
- vendor
- item PO
- qty ordered
- qty delivered sebelumnya
- qty outstanding
- delivery date
- ship-to / receiving location
- nomor surat jalan / dokumen vendor
- data kendaraan/ekspedisi bila ada
- attachment pendukung

## Process
- user memilih PO yang open
- sistem membentuk draft Delivery Order
- user mengisi data pengiriman vendor
- user memilih item yang dikirim
- sistem validasi qty dan referensi dokumen
- user verifikasi pengiriman saat tiba
- sistem update fulfilled qty dan outstanding qty
- sistem tandai item siap untuk proses penerimaan berikutnya

## Output
- dokumen Delivery Order
- histori shipment per item PO
- status fulfillment PO
- daftar discrepancy / selisih
- item siap Goods Receipt / Service Confirmation

---

# 8. Business Rules
1. Delivery Order hanya boleh dibuat dari PO yang sudah **Released**.
2. Satu Delivery Order hanya mereferensi satu PO.
3. Satu PO dapat memiliki lebih dari satu Delivery Order.
4. Sistem hanya menampilkan item PO yang masih memiliki outstanding quantity.
5. Qty kirim tidak boleh melebihi qty outstanding, kecuali ada rule toleransi khusus.
6. Vendor pada Delivery Order harus sama dengan vendor pada PO.
7. Ship-to location default mengikuti PO.
8. Item yang memiliki discrepancy tidak boleh otomatis dianggap selesai diterima.
9. Semua perubahan setelah verifikasi wajib tersimpan di audit trail.
10. Item service harus tetap dibedakan dari item material pada tampilan dan proses lanjutannya.

---

# 9. Status Workflow

## Header Status
- Draft
- Waiting Arrival
- Arrived
- Under Verification
- Verified
- Partial Accepted
- Rejected
- Closed

## Item Status
- Open
- Delivered
- Partially Accepted
- Accepted
- Short Delivered
- Damaged
- Rejected
- Ready for GR
- Ready for Service Confirmation

---

# 10. Struktur Halaman

## A. Delivery Order List
Halaman daftar seluruh Delivery Order.

### Tujuan
Memudahkan user mencari, memantau, dan membuka dokumen DO.

### Komponen
- page title: Delivery Order
- filter bar
- search field
- status tabs
- summary cards
- data table
- action button: Create from PO

### Filter
- DO No
- PO No
- Vendor
- Status
- Date Range
- Receiving Location
- Created By

### Summary Cards
- Total DO
- Waiting Arrival
- Under Verification
- Verified Today
- With Discrepancy

### Table Columns
- DO No
- DO Date
- PO No
- Vendor
- Shipment Date
- Arrival Date
- Receiving Location
- Status
- Created By
- Action

---

## B. Create Delivery Order from PO
Halaman pemilihan base document dari PO.

### Tujuan
User memilih PO yang siap dibuatkan DO.

### Komponen
- modal / side panel pilih PO
- filter released PO
- search by PO No / Vendor / Location
- table PO open items
- button: Select PO

### Table Columns
- PO No
- PO Date
- Vendor
- Ship-to
- WBS Ref
- Open Items
- Remaining Qty
- Status

### Notes UX
- gunakan pola base document seperti SAP B1
- tampilkan bahwa DO dibuat **berdasarkan PO**
- tampilkan informasi PO summary di atas form

---

## C. Delivery Order Form
Halaman utama pembuatan/edit dokumen DO.

### Layout Style
Mengikuti pendekatan SAP Business One:
- document header di bagian atas
- informasi utama di sisi kiri dan kanan secara seimbang
- item matrix/grid sebagai area terbesar
- tab bawah untuk detail tambahan
- action bar di kanan atas

### Header Section
Field:
- Delivery Order No
- Document Status
- Document Date
- Shipment Date
- Expected Arrival Date
- Actual Arrival Date
- PO No (readonly reference)
- Vendor Code
- Vendor Name
- Ship-to Location
- Receiver / PIC

### Vendor Shipping Section
Field:
- Vendor DO / Surat Jalan No
- Expedition / Transporter
- Vehicle No
- Driver Name
- Packing List No
- Delivery Notes

### Reference Section
Field:
- Base Document: Purchase Order
- PO No
- PR Reference
- WBS Reference
- Asset / Vessel / Location

### Item Matrix/Grid
Kolom:
- Line No
- Item Code
- Item Name
- Type (Material/Service)
- UoM
- Qty Ordered
- Qty Delivered Before
- Qty Delivered Now
- Qty Accepted
- Qty Rejected
- Qty Remaining
- Warehouse / Receiving Point
- Condition
- Item Status
- Remarks

### Rules Grid
- qty delivered now editable
- qty accepted dan rejected dapat diisi saat verifikasi
- qty remaining dihitung otomatis
- baris item service diberi visual badge berbeda
- item fully delivered tidak tampil default saat create baru

---

## D. Verification Tab
Digunakan untuk pemeriksaan awal pengiriman.

### Field
- Verification Status
- Verified By
- Verification Date
- Physical Check Result
- Document Check Result
- Discrepancy Flag
- Discrepancy Notes
- Damage Notes
- Follow-up Action

### Status Options
- Match
- Partial
- Short Delivery
- Damaged
- Rejected

---

## E. Attachment Tab
Untuk lampiran dokumen pengiriman.

### Attachment Types
- Surat Jalan Vendor
- Packing List
- Foto Barang
- Foto Kerusakan
- Dokumen Pendukung Lain

### UI Notes
- gunakan attachment list sederhana
- tampilkan nama file, uploader, upload date
- tombol preview dan download

---

## F. Document Flow Tab
Menampilkan keterkaitan antar dokumen.

### Tujuan
Menjaga kesinambungan flow bisnis.

### Document Chain
- Plan & Desain
- Purchase Request
- WBS Assignment
- Purchase Order
- Delivery Order
- Goods Receipt / Service Confirmation

### UX Notes
- tampilkan dalam bentuk breadcrumb atau linked references
- user dapat klik dokumen induk
- tampilkan status singkat tiap dokumen

---

# 11. Screen List
1. Delivery Order List
2. Select Purchase Order for Delivery Order
3. Delivery Order Form
4. Delivery Verification Panel
5. Delivery Attachment Panel
6. Document Flow / Reference Panel
7. Delivery Order Detail View

---

# 12. Field List Minimum

## Header
- do_no
- do_date
- shipment_date
- expected_arrival_date
- actual_arrival_date
- po_no
- vendor_code
- vendor_name
- ship_to_location
- receiver_name
- vendor_do_no
- packing_list_no
- status
- notes

## Item
- line_no
- item_code
- item_name
- item_type
- uom
- qty_ordered
- qty_delivered_before
- qty_delivered_now
- qty_accepted
- qty_rejected
- qty_remaining
- receiving_point
- condition
- item_status
- remarks

## Verification
- verification_status
- verified_by
- verified_at
- discrepancy_flag
- discrepancy_notes
- follow_up_action

---

# 13. Dummy Data Example

## Header Example
- DO No: DO-2026-04-0007
- DO Date: 2026-04-22
- PO No: PO-2026-04-0012
- Vendor: PT Bahari Teknik Nusantara
- Ship-to: Gudang Teknik Tanjung Priok
- Vendor DO No: SJ-8891/BTN/IV/2026
- Status: Under Verification

## Item Example
1. IMP-001 – Impeller Pump 4 Inch
   - Qty Ordered: 4
   - Delivered Before: 0
   - Delivered Now: 2
   - Accepted: 2
   - Rejected: 0
   - Remaining: 2
   - Status: Partially Accepted

2. GAS-004 – Gasket Set Main Engine
   - Qty Ordered: 10
   - Delivered Before: 6
   - Delivered Now: 4
   - Accepted: 3
   - Rejected: 1
   - Remaining: 0
   - Status: Damaged

---

# 14. UX Guidelines

## Visual Direction
- desktop enterprise layout
- clean and compact
- abu-abu muda, putih, biru lembut
- fokus pada data table dan form clarity
- jarak antar section rapat namun tetap nyaman dibaca
- ikon secukupnya
- hindari card berlebihan

## SAP Business One Reference Principles
- document-centric layout
- header form ringkas
- matrix/grid dominan
- tab informasi tambahan di bawah
- action utama jelas: Add, Update, Verify, Close
- relasi antar dokumen terlihat jelas

## Interaction Principles
- minim popup berlapis
- validasi inline
- readonly field dibedakan jelas
- status diberi badge sederhana
- action destructive perlu confirmation

---

# 15. Main Actions
- Create from PO
- Save Draft
- Submit Verification
- Mark Arrived
- Mark Verified
- Send to Goods Receipt
- Close Document
- Cancel Document
- Print / Export

---

# 16. Validation Rules
- PO wajib dipilih sebelum form tersimpan
- Vendor otomatis mengikuti PO
- DO No dapat auto-generate
- Qty Delivered Now tidak boleh negatif
- Qty Accepted + Qty Rejected tidak boleh melebihi Qty Delivered Now
- Actual Arrival Date tidak boleh lebih awal dari Shipment Date tanpa override note
- Attachment wajib untuk status discrepancy tertentu
- Item service tidak boleh diarahkan ke warehouse receiving standar jika rule bisnis membedakan prosesnya

---

# 17. Acceptance Criteria

## Functional
- user dapat membuat DO dari PO released
- sistem hanya menampilkan item outstanding dari PO
- user dapat input qty pengiriman per item
- user dapat melakukan verifikasi awal per item
- sistem menghitung remaining qty otomatis
- sistem menyimpan histori dokumen dan status
- sistem menampilkan referensi dokumen sebelumnya

## UI/UX
- tampilan konsisten dengan modul sebelumnya
- layout mengacu ke SAP Business One
- halaman list mudah discan
- form utama fokus pada header + item matrix
- status dan relasi dokumen mudah dipahami
- tidak terlalu banyak elemen dekoratif

---

# 18. Error / Empty States

## Empty State
- belum ada Delivery Order
- tidak ada PO released yang siap diproses
- tidak ada item outstanding

## Error State
- qty melebihi outstanding
- vendor tidak sesuai PO
- dokumen referensi tidak valid
- status PO tidak mengizinkan pembuatan DO
- data verifikasi belum lengkap

---

# 19. Audit Trail
Setiap perubahan penting harus tercatat:
- create document
- edit qty delivery
- change status
- verification result
- discrepancy update
- close document
- cancel document

Audit trail minimal menyimpan:
- action
- user
- timestamp
- before value
- after value
- notes

---

# 20. Catatan Teknis Demo
- Tahap ini hanya demo frontend dengan dummy data.
- Belum perlu integrasi backend nyata.
- Gunakan data yang konsisten dengan modul PR, WBS Assignment, dan Purchase Order.
- Nama status, field, dan relasi dokumen harus dijaga agar berkesinambungan.
- Referensi desain wajib tetap mengacu ke SAP Business One.

---

# 21. Kesimpulan
Submodul **2.3.3 Delivery Order** pada UI/UX demo harus memperlihatkan bahwa dokumen ini adalah jembatan antara **Purchase Order** dan **penerimaan barang/jasa**. Fokus utama desain adalah keterbacaan data pengiriman, kejelasan status, kemudahan verifikasi, dan kesinambungan dokumen antar submodul.

Dokumen ini harus terasa seperti aplikasi enterprise yang formal, rapi, dan operasional, bukan aplikasi consumer.
