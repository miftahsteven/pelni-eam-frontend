# PRD UI/UX — EAM PELNI Module 2.7 Invoice Management

**Project:** Enterprise Asset Management (EAM) PELNI  
**Module:** 2.7 Invoice Management  
**Version:** 1.0  
**Stage:** Tahap 1 — UI Frontend Demo dengan Dummy Data  
**Prepared For:** Google Antigravity Implementation  
**Frontend Stack:** Next.js, TailwindCSS  
**Backend Future Stack:** Node.js, Prisma, PostgreSQL, REST API, JWT  
**Design Reference:** SAP Business One style — clean enterprise UI, table-dominant, compact form, tab-based detail, status badge, master-detail layout  

---

## 1. Objective

Module **2.7 Invoice Management** adalah modul enterprise untuk mengelola tagihan vendor yang muncul dari seluruh proses EAM, mulai dari pengadaan aset, pemasangan, pemeliharaan, penggantian, hingga disposal/penghapusan aset.

Modul ini tidak hanya berfungsi sebagai pencatatan invoice, tetapi juga sebagai penghubung antara:

```text
EAM Operational Flow → Vendor Billing → Invoice Matching → Approval → Payment Monitoring → Asset Cost History
```

Modul ini harus dapat membaca dan menghubungkan data dari modul-modul sebelumnya:

- 2.2.1 Plan & Design
- 2.2.2 Create BoQ
- 2.2.3 Purchase Request
- 2.3.1 WBS Assignment
- 2.3.2 Purchase Order
- 2.3.3 Delivery Order
- 2.4.1 Installation
- 2.4.2 Acceptance Test
- 2.4.3 Asset Registration
- 2.5.1 Maintenance
- 2.5.2 Stock Opname
- 2.5.3 Asset Tracking
- 2.6.1 Movement
- 2.6.2 Replacement
- 2.6.3 Dismantle / Disposal

---

## 2. Enterprise Business Context

Dalam sistem EAM enterprise, invoice tidak boleh berdiri sendiri. Setiap invoice harus memiliki referensi ke dokumen sumber, seperti PO, DO, Work Order, Acceptance Test, atau Disposal Report.

Tujuan utamanya adalah memastikan vendor hanya dapat ditagihkan dan dibayar jika pekerjaan/barang benar-benar:

1. Direncanakan.
2. Dianggarkan.
3. Dipesan melalui PO/WO.
4. Diterima melalui DO/BAST.
5. Diverifikasi secara teknis.
6. Disetujui oleh unit terkait.
7. Dicatat ke histori biaya aset.

---

## 3. Recommended Module Structure

```text
2.7 Invoice Management
├── 2.7.1 Vendor Invoice
├── 2.7.2 Invoice Matching
├── 2.7.3 Invoice Approval
├── 2.7.4 Payment Monitoring
├── 2.7.5 Asset Cost Allocation
└── 2.7.6 Invoice Report & Audit Trail
```

Untuk tahap UI demo, seluruh subfungsi di atas dibuat dalam satu modul besar dengan tab dan menu internal.

---

## 4. User Roles

| Role | Description | Main Access |
|---|---|---|
| EAM Admin | Menginput dan mengelola invoice | Create, edit, upload document |
| Procurement Officer | Validasi invoice terhadap PO/DO | Matching PO, DO, vendor |
| Technical Verifier | Validasi pekerjaan/barang secara teknis | Acceptance, work result, asset linkage |
| Finance Verifier | Validasi pajak, nilai, dan termin pembayaran | Finance verification |
| Manager / Approver | Memberikan approval final | Approve/reject invoice |
| Auditor | Melihat histori dan audit trail | Read-only report |
| Vendor User | Submit invoice dan dokumen pendukung | Submit invoice, view status |

---

## 5. Main Business Flow

### 5.1 High Level Flow

```text
Source Document Created
→ Goods / Service Completed
→ Vendor Invoice Submitted
→ Invoice Data Validation
→ Invoice Matching
→ Technical Verification
→ Finance Verification
→ Approval
→ Ready for Payment
→ Paid / Partially Paid
→ Asset Cost History Updated
→ Audit Trail Completed
```

---

## 6. Invoice Source Flow

### 6.1 Procurement Invoice Flow

```text
Plan & Design
→ BoQ
→ Purchase Request
→ WBS Assignment
→ Purchase Order
→ Delivery Order
→ Acceptance Test
→ Asset Registration
→ Vendor Invoice
→ Invoice Matching
→ Approval
→ Payment Monitoring
→ Asset Acquisition Cost Updated
```

### 6.2 Maintenance Invoice Flow

```text
Maintenance Request
→ Work Order
→ Vendor Assignment
→ Maintenance Execution
→ Technical Completion
→ Vendor Invoice
→ Technical Verification
→ Finance Verification
→ Payment
→ Asset Maintenance Cost History Updated
```

### 6.3 Installation Invoice Flow

```text
Delivery Order
→ Installation Schedule
→ Installation Report
→ Acceptance Test
→ Vendor Invoice
→ Invoice Matching
→ Approval
→ Installation Cost Added to Asset
```

### 6.4 Replacement Invoice Flow

```text
Asset Issue
→ Replacement Request
→ Approval
→ Purchase Order / Work Order
→ Replacement Execution
→ Old Asset Movement / Disposal
→ New Asset Registration
→ Vendor Invoice
→ Cost Allocation
→ Payment
```

### 6.5 Disposal Invoice Flow

```text
Disposal Request
→ Dismantle / Disposal Approval
→ Disposal Execution
→ Disposal Report
→ Vendor Invoice / Scrap Revenue Record
→ Finance Verification
→ Asset Financial Closure
```

---

## 7. Invoice Matching Concept

### 7.1 2-Way Matching

```text
Purchase Order ↔ Invoice
```

Digunakan untuk pembelian sederhana atau jasa yang tidak memerlukan penerimaan fisik.

### 7.2 3-Way Matching

```text
Purchase Order ↔ Delivery Order / Goods Receipt ↔ Invoice
```

Digunakan untuk pembelian barang/aset.

### 7.3 4-Way Matching

```text
Purchase Order
↔ Delivery Order
↔ Acceptance Test / Technical Verification
↔ Invoice
```

Digunakan untuk pengadaan aset teknis, pekerjaan pemasangan, atau pekerjaan yang harus diverifikasi sebelum pembayaran.

**Default untuk EAM PELNI:** gunakan 4-Way Matching untuk invoice pengadaan aset besar dan pekerjaan teknis.

---

## 8. Status Lifecycle

| Status | Description | UI Badge |
|---|---|---|
| Draft | Invoice baru dibuat, belum dikirim | Grey |
| Submitted | Invoice sudah diajukan | Blue |
| Waiting Matching | Menunggu proses pencocokan dokumen | Yellow |
| Matched | Invoice sesuai dengan dokumen sumber | Green |
| Mismatch | Ada perbedaan data | Red |
| Technical Verification | Menunggu validasi teknis | Purple |
| Finance Verification | Menunggu validasi finance | Indigo |
| Waiting Approval | Menunggu approval final | Orange |
| Approved | Invoice disetujui | Green |
| Rejected | Invoice ditolak | Red |
| Ready for Payment | Invoice siap dibayarkan | Blue |
| Partially Paid | Invoice dibayar sebagian | Amber |
| Paid | Invoice lunas | Green |
| Cancelled | Invoice dibatalkan | Grey |
| Hold | Invoice ditahan karena masalah dokumen | Red |

---

## 9. Input — Process — Output Analysis

### 9.1 Input

| Input Field | Type | Source | Description |
|---|---|---|---|
| Invoice No | Text | Manual/vendor | Nomor invoice vendor |
| Invoice Type | Select | System | Procurement, Maintenance, Installation, Replacement, Disposal |
| Vendor | Select | Vendor master | Nama vendor |
| Source Document Type | Select | System | PO, WO, DO, Acceptance, Disposal Report |
| Source Document No | Select | Related module | Nomor dokumen sumber |
| PO No | Select | Purchase Order | Referensi PO jika ada |
| DO No | Select | Delivery Order | Referensi DO jika ada |
| Work Order No | Select | Maintenance/Installation | Referensi WO jika ada |
| WBS Code | Select | WBS Assignment | Pembebanan proyek/pekerjaan |
| Cost Center | Select | Master data | Unit/bagian pembebanan biaya |
| Asset ID | Select | Asset Master | Aset terkait |
| Invoice Date | Date | Manual | Tanggal invoice |
| Due Date | Date | Manual | Tanggal jatuh tempo |
| Payment Term | Select | PO/contract | Termin pembayaran |
| Currency | Select | System | IDR default |
| Line Item | Table | Manual/import | Detail barang/jasa |
| Quantity | Number | Manual/PO | Jumlah item |
| Unit Price | Currency | Manual/PO | Harga satuan |
| Tax / PPN | Currency | Manual | Nilai pajak |
| Withholding Tax | Currency | Manual | Potongan pajak jika ada |
| Total Amount | Currency | Calculated | Total tagihan |
| Supporting Document | Upload | Vendor/admin | Invoice PDF, faktur pajak, BAST, BA, foto, laporan |
| Bank Account | Text | Vendor master | Rekening vendor |
| Notes | Textarea | Manual | Catatan tambahan |

---

### 9.2 Process

| Process | Description | System Behavior |
|---|---|---|
| Create Invoice | User membuat invoice baru | Status Draft |
| Submit Invoice | Invoice dikirim untuk validasi | Status Submitted |
| Source Validation | Sistem cek dokumen sumber | Wajib memiliki source document |
| Matching Validation | Sistem membandingkan PO/DO/Acceptance/Invoice | Menampilkan matched atau mismatch |
| Technical Verification | Tim teknis validasi pekerjaan/barang | Approve/reject dengan notes |
| Finance Verification | Finance cek nilai, pajak, termin, vendor bank | Approve/reject dengan notes |
| Approval Routing | Invoice dikirim ke manager/approver | Berdasarkan nilai invoice/WBS |
| Payment Monitoring | Finance update status pembayaran | Unpaid, partial, paid |
| Cost Allocation | Sistem mengalokasikan biaya ke aset/WBS | Update cost history |
| Audit Trail | Sistem mencatat semua aktivitas | View timeline |

---

### 9.3 Output

| Output | Description |
|---|---|
| Invoice Record | Data invoice lengkap |
| Matching Result | Hasil validasi 2-way, 3-way, atau 4-way matching |
| Approval Status | Status approval invoice |
| Payment Status | Status pembayaran |
| Asset Cost History | Biaya aset yang diperbarui |
| Vendor Payable Report | Laporan tagihan vendor |
| Aging Invoice Report | Laporan invoice jatuh tempo |
| Mismatch Report | Laporan invoice bermasalah |
| Audit Trail | Riwayat aktivitas invoice |
| Export Data | Data siap ekspor ke finance/accounting system |

---

## 10. UI/UX Design Direction — SAP Business One Reference

### 10.1 General UI Principle

Gunakan referensi visual SAP Business One:

- Layout clean, enterprise, dan padat informasi.
- Dominan table/grid.
- Master-detail pattern.
- Form header compact.
- Tab section untuk detail.
- Toolbar action di bagian atas.
- Status badge jelas.
- Sidebar menu sederhana.
- Warna netral: white, light grey, dark blue/navy, soft border.
- Tidak menggunakan tampilan terlalu modern yang playful.
- Cocok untuk user enterprise, finance, procurement, dan technical team.

---

## 11. Page Structure

### 11.1 Main Menu

Add menu baru pada sidebar EAM:

```text
2.7 Invoice Management
```

Menu internal:

```text
Invoice Dashboard
Vendor Invoice
Invoice Matching
Approval Queue
Payment Monitoring
Asset Cost Allocation
Reports & Audit Trail
```

---

## 12. Screen 1 — Invoice Dashboard

### Purpose

Memberikan ringkasan status invoice, nilai tagihan, invoice jatuh tempo, dan invoice bermasalah.

### UI Layout

```text
[Page Title: Invoice Management]
[Filter Bar: Period | Vendor | Invoice Type | Status | WBS | Asset | Search]

[Summary Cards]
- Total Invoice
- Total Amount
- Waiting Approval
- Mismatch Invoice
- Ready for Payment
- Overdue Invoice

[Chart Area]
- Invoice by Status
- Invoice by Type
- Invoice Aging

[Recent Invoice Table]
```

### Summary Card Sample

| Card | Value |
|---|---:|
| Total Invoice | 18 |
| Total Amount | Rp 12.875.000.000 |
| Waiting Approval | 5 |
| Mismatch Invoice | 2 |
| Ready for Payment | 4 |
| Overdue Invoice | 3 |

---

## 13. Screen 2 — Vendor Invoice List

### Purpose

Menampilkan seluruh invoice vendor dalam bentuk tabel enterprise.

### Table Columns

| Column | Description |
|---|---|
| Invoice No | Nomor invoice |
| Invoice Type | Jenis invoice |
| Vendor | Nama vendor |
| Source Ref | PO/WO/DO/Acceptance reference |
| WBS | Kode WBS |
| Asset | Asset terkait |
| Invoice Date | Tanggal invoice |
| Due Date | Jatuh tempo |
| Amount | Nilai invoice |
| Matching | Matched/Mismatch |
| Approval Status | Status approval |
| Payment Status | Status bayar |
| Action | View/Edit/Approve |

### Action Button

```text
[New Invoice] [Import] [Export] [Refresh] [Filter]
```

---

## 14. Screen 3 — Create / Detail Invoice

### Layout

Gunakan model SAP B1 document form.

```text
Header Section
- Invoice No
- Vendor
- Invoice Type
- Status
- Invoice Date
- Due Date
- Currency
- Total Amount

Reference Section
- Source Document Type
- Source Document No
- PO No
- DO No
- Work Order No
- Acceptance No
- WBS Code
- Cost Center

Tab Section
[General]
[Line Items]
[Matching]
[Technical Verification]
[Finance Verification]
[Approval]
[Payment]
[Asset Allocation]
[Attachments]
[Audit Trail]
```

---

## 15. Tab Detail Specification

### 15.1 Tab General

Fields:

| Field | Description |
|---|---|
| Invoice No | Nomor invoice vendor |
| Vendor | Nama vendor |
| Invoice Type | Procurement/Maintenance/Installation/Replacement/Disposal |
| Invoice Date | Tanggal invoice |
| Due Date | Tanggal jatuh tempo |
| Payment Term | Net 30, Termin 1, Termin 2, Final Payment |
| Bank Account | Rekening vendor |
| Notes | Catatan invoice |

---

### 15.2 Tab Line Items

Table:

| Item Code | Description | Source Qty | Invoice Qty | Unit Price | Tax | Total | Status |
|---|---|---:|---:|---:|---:|---:|---|
| AST-NAV-001 | Radar Navigation Unit | 2 | 2 | Rp 850.000.000 | Rp 187.000.000 | Rp 1.887.000.000 | Matched |
| SRV-INS-001 | Installation Service | 1 | 1 | Rp 125.000.000 | Rp 13.750.000 | Rp 138.750.000 | Matched |

---

### 15.3 Tab Matching

Display 2-way, 3-way, or 4-way matching.

Table:

| Checkpoint | Source Value | Invoice Value | Result | Notes |
|---|---:|---:|---|---|
| Vendor | PT Samudera Teknik Nusantara | PT Samudera Teknik Nusantara | Match | - |
| PO Amount | Rp 2.025.750.000 | Rp 2.025.750.000 | Match | - |
| DO Qty | 2 unit | 2 unit | Match | - |
| Acceptance Status | Passed | Passed | Match | AT completed |
| Tax | Rp 200.750.000 | Rp 200.750.000 | Match | - |

If mismatch:

| Checkpoint | Source Value | Invoice Value | Result | Notes |
|---|---:|---:|---|---|
| Invoice Qty | 4 unit | 5 unit | Mismatch | Invoice qty exceeds received qty |

---

### 15.4 Tab Technical Verification

Fields:

| Field | Description |
|---|---|
| Technical Reviewer | User teknis |
| Verification Date | Tanggal review |
| Related Acceptance | Nomor acceptance |
| Work Result | Passed/Failed/Conditional |
| Technical Notes | Catatan teknis |
| Decision | Approve / Reject / Hold |

---

### 15.5 Tab Finance Verification

Fields:

| Field | Description |
|---|---|
| Finance Reviewer | User finance |
| Tax Invoice No | Nomor faktur pajak |
| Tax Validation | Valid/Invalid |
| Payment Term Validation | Valid/Invalid |
| Bank Account Validation | Valid/Invalid |
| Budget Availability | Available/Not Available |
| Finance Notes | Catatan finance |
| Decision | Approve / Reject / Hold |

---

### 15.6 Tab Approval

Table:

| Step | Role | Approver | Status | Date | Notes |
|---|---|---|---|---|---|
| 1 | Technical Verifier | Chief Engineer | Approved | 2026-05-08 | Work accepted |
| 2 | Procurement | Procurement Manager | Approved | 2026-05-09 | PO matched |
| 3 | Finance | Finance Verifier | Waiting | - | - |
| 4 | Manager | Asset Manager | Waiting | - | - |

---

### 15.7 Tab Payment

Fields:

| Field | Description |
|---|---|
| Payment Status | Unpaid/Partial/Paid |
| Payment Date | Tanggal pembayaran |
| Payment Amount | Nilai dibayarkan |
| Payment Reference | Nomor referensi pembayaran |
| Remaining Amount | Sisa tagihan |
| Payment Notes | Catatan pembayaran |

---

### 15.8 Tab Asset Allocation

Purpose: menghubungkan biaya invoice ke aset.

Table:

| Asset ID | Asset Name | Cost Type | Allocation Amount | WBS | Cost Center |
|---|---|---|---:|---|---|
| AST-PELNI-000231 | Radar Navigation Unit KM Kelud | Acquisition Cost | Rp 943.500.000 | WBS-NAV-2026-001 | OPS-MARINE |
| AST-PELNI-000232 | Radar Navigation Unit KM Dobonsolo | Acquisition Cost | Rp 943.500.000 | WBS-NAV-2026-001 | OPS-MARINE |
| AST-PELNI-000231 | Radar Navigation Unit KM Kelud | Installation Cost | Rp 69.375.000 | WBS-NAV-2026-001 | OPS-MARINE |
| AST-PELNI-000232 | Radar Navigation Unit KM Dobonsolo | Installation Cost | Rp 69.375.000 | WBS-NAV-2026-001 | OPS-MARINE |

---

### 15.9 Tab Attachments

Document types:

| Document Type | Required | Example |
|---|---|---|
| Vendor Invoice PDF | Yes | INV-STN-2026-0001.pdf |
| Tax Invoice / Faktur Pajak | Yes | FP-010.001-26.00000123.pdf |
| Purchase Order | Auto-linked | PO-EAM-2026-0004.pdf |
| Delivery Order | Conditional | DO-STN-2026-0007.pdf |
| Acceptance Report | Conditional | AT-NAV-2026-0002.pdf |
| Work Completion Report | Conditional | BA-MAINT-2026-0011.pdf |
| Photo Evidence | Optional | radar-installation-km-kelud.jpg |

---

### 15.10 Tab Audit Trail

Table:

| Date Time | User | Action | Old Value | New Value | Notes |
|---|---|---|---|---|---|
| 2026-05-07 09:12 | Vendor User | Submit Invoice | Draft | Submitted | Invoice uploaded |
| 2026-05-07 10:05 | Procurement Officer | Matching Check | Submitted | Matched | PO/DO matched |
| 2026-05-08 13:30 | Chief Engineer | Technical Approval | Technical Verification | Approved | Acceptance passed |

---

## 16. Screen 4 — Invoice Matching Workbench

### Purpose

Halaman khusus untuk membandingkan invoice dengan dokumen sumber.

### Layout

```text
Left Panel: Invoice List Waiting Matching
Right Panel: Matching Detail
Bottom: Mismatch Notes / Action
```

### Matching Table

| Invoice Line | PO Line | DO Line | Acceptance | Result | Action |
|---|---|---|---|---|---|
| Radar Navigation Unit x2 | x2 | x2 received | Passed | Match | View |
| Installation Service x1 | x1 | N/A | Passed | Match | View |
| Spare Cable x5 | x4 | x4 received | N/A | Mismatch | Resolve |

### Actions

```text
[Approve Match] [Mark as Mismatch] [Request Revision] [Hold Invoice]
```

---

## 17. Screen 5 — Approval Queue

### Purpose

Menampilkan daftar invoice yang membutuhkan approval user login.

### Table Columns

| Invoice No | Vendor | Type | Amount | Current Step | Due Date | Aging | Action |
|---|---|---|---:|---|---|---:|---|
| INV-STN-2026-0001 | PT Samudera Teknik Nusantara | Procurement | Rp 2.025.750.000 | Finance Verification | 2026-06-06 | 3 days | Review |

### Approval Action

```text
[Approve] [Reject] [Hold] [Request Revision]
```

Approval modal fields:

- Decision
- Notes
- Attachment optional
- Confirmation checkbox

---

## 18. Screen 6 — Payment Monitoring

### Purpose

Memantau invoice yang sudah approved dan status pembayarannya.

### Table Columns

| Invoice No | Vendor | Amount | Due Date | Status | Paid Amount | Remaining | Payment Ref | Action |
|---|---|---:|---|---|---:|---:|---|---|
| INV-STN-2026-0001 | PT Samudera Teknik Nusantara | Rp 2.025.750.000 | 2026-06-06 | Ready for Payment | Rp 0 | Rp 2.025.750.000 | - | Update Payment |
| INV-BAH-2026-0003 | PT Bahari Maintenance Indonesia | Rp 420.000.000 | 2026-05-30 | Partially Paid | Rp 200.000.000 | Rp 220.000.000 | PAY-2026-0501 | Update Payment |

### Payment Update Modal

Fields:

- Payment Date
- Payment Amount
- Payment Reference
- Payment Method
- Notes
- Upload proof of payment

---

## 19. Screen 7 — Asset Cost Allocation

### Purpose

Menampilkan hubungan invoice dengan nilai dan histori biaya aset.

### Table Columns

| Asset ID | Asset Name | Invoice No | Cost Type | Amount | Module Source | Date |
|---|---|---|---|---:|---|---|
| AST-PELNI-000231 | Radar Navigation Unit KM Kelud | INV-STN-2026-0001 | Acquisition | Rp 943.500.000 | Procurement | 2026-05-07 |
| AST-PELNI-000231 | Radar Navigation Unit KM Kelud | INV-STN-2026-0001 | Installation | Rp 69.375.000 | Installation | 2026-05-07 |
| AST-PELNI-000145 | Main Engine Pump KM Labobar | INV-BAH-2026-0003 | Maintenance | Rp 420.000.000 | Maintenance | 2026-05-03 |
| AST-PELNI-000188 | Generator Panel KM Ciremai | INV-ELEC-2026-0004 | Replacement | Rp 680.000.000 | Replacement | 2026-05-11 |

---

## 20. Screen 8 — Reports & Audit Trail

### Report Types

| Report | Description |
|---|---|
| Invoice by Vendor | Laporan invoice per vendor |
| Invoice by Status | Laporan berdasarkan status |
| Invoice Aging | Laporan jatuh tempo |
| Invoice by Asset | Laporan biaya per aset |
| Invoice by WBS | Laporan biaya per WBS/project |
| Invoice Mismatch | Laporan invoice bermasalah |
| Payment Status | Laporan status pembayaran |
| Tax Validation Report | Laporan validasi faktur pajak |
| Audit Trail Report | Riwayat perubahan invoice |

### Export Button

```text
[Export Excel] [Export PDF] [Print]
```

---

## 21. Dummy Master Data

### 21.1 Vendor Sample

| Vendor ID | Vendor Name | Category | NPWP | Bank Account | Contact |
|---|---|---|---|---|---|
| VEN-001 | PT Samudera Teknik Nusantara | Marine Equipment | 01.234.567.8-901.000 | BNI 1234567890 | procurement@stn.co.id |
| VEN-002 | PT Bahari Maintenance Indonesia | Maintenance Service | 02.345.678.9-012.000 | Mandiri 9876543210 | billing@bmi.co.id |
| VEN-003 | PT Elektrika Kapal Mandiri | Electrical System | 03.456.789.0-123.000 | BRI 1122334455 | finance@ekm.co.id |
| VEN-004 | PT Docking Prima Jaya | Docking & Disposal | 04.567.890.1-234.000 | BCA 5566778899 | admin@dpj.co.id |
| VEN-005 | PT Integrasi Teknologi Maritim | IT & Monitoring | 05.678.901.2-345.000 | BTN 1020304050 | invoice@itm.co.id |

---

### 21.2 WBS Sample

| WBS Code | WBS Name | Related Module | Budget | Status |
|---|---|---|---:|---|
| WBS-NAV-2026-001 | Pengadaan Radar Navigasi Kapal PELNI | Procurement | Rp 2.500.000.000 | Active |
| WBS-MNT-2026-014 | Maintenance Main Engine Pump KM Labobar | Maintenance | Rp 500.000.000 | Active |
| WBS-INS-2026-006 | Instalasi Asset Monitoring System | Installation | Rp 850.000.000 | Active |
| WBS-RPL-2026-009 | Replacement Generator Panel KM Ciremai | Replacement | Rp 750.000.000 | Active |
| WBS-DSP-2026-003 | Disposal Equipment Lama KM Tidar | Disposal | Rp 120.000.000 | Active |

---

### 21.3 Purchase Request Sample

| PR No | Requester | Module Source | WBS | Description | Status |
|---|---|---|---|---|---|
| PR-EAM-2026-0007 | Marine Operation Division | 2.2.3 Purchase Request | WBS-NAV-2026-001 | Pengadaan 2 unit radar navigasi | Approved |
| PR-EAM-2026-0012 | Engineering Division | 2.5.1 Maintenance | WBS-MNT-2026-014 | Pengadaan jasa maintenance pump | Approved |
| PR-EAM-2026-0015 | Electrical Division | 2.6.2 Replacement | WBS-RPL-2026-009 | Penggantian generator panel | Approved |

---

### 21.4 Purchase Order Sample

| PO No | Vendor | PR No | WBS | Amount | Status |
|---|---|---|---|---:|---|
| PO-EAM-2026-0004 | PT Samudera Teknik Nusantara | PR-EAM-2026-0007 | WBS-NAV-2026-001 | Rp 2.025.750.000 | Approved |
| PO-EAM-2026-0009 | PT Elektrika Kapal Mandiri | PR-EAM-2026-0015 | WBS-RPL-2026-009 | Rp 680.000.000 | Approved |
| PO-EAM-2026-0011 | PT Integrasi Teknologi Maritim | PR-EAM-2026-0018 | WBS-INS-2026-006 | Rp 795.000.000 | Approved |

---

### 21.5 Delivery Order Sample

| DO No | PO No | Vendor | Received Date | Received By | Status |
|---|---|---|---|---|---|
| DO-STN-2026-0007 | PO-EAM-2026-0004 | PT Samudera Teknik Nusantara | 2026-05-03 | Warehouse Officer | Received |
| DO-EKM-2026-0012 | PO-EAM-2026-0009 | PT Elektrika Kapal Mandiri | 2026-05-08 | Engineering Staff | Received |
| DO-ITM-2026-0005 | PO-EAM-2026-0011 | PT Integrasi Teknologi Maritim | 2026-05-09 | IT Asset Officer | Partial Received |

---

### 21.6 Acceptance Test Sample

| Acceptance No | Source Ref | Asset / Work | Result | Date | Status |
|---|---|---|---|---|---|
| AT-NAV-2026-0002 | DO-STN-2026-0007 | Radar Navigation Unit | Passed | 2026-05-06 | Completed |
| AT-RPL-2026-0004 | DO-EKM-2026-0012 | Generator Panel Replacement | Passed | 2026-05-10 | Completed |
| AT-INS-2026-0006 | DO-ITM-2026-0005 | Asset Monitoring System | Conditional | 2026-05-12 | Need Revision |

---

### 21.7 Asset Registration Sample

| Asset ID | Asset Name | Vessel / Location | Asset Category | Registration Source | Status |
|---|---|---|---|---|---|
| AST-PELNI-000231 | Radar Navigation Unit KM Kelud | KM Kelud | Navigation Equipment | AT-NAV-2026-0002 | Active |
| AST-PELNI-000232 | Radar Navigation Unit KM Dobonsolo | KM Dobonsolo | Navigation Equipment | AT-NAV-2026-0002 | Active |
| AST-PELNI-000145 | Main Engine Pump KM Labobar | KM Labobar | Engine Equipment | Maintenance Existing Asset | Active |
| AST-PELNI-000188 | Generator Panel KM Ciremai | KM Ciremai | Electrical Equipment | Replacement | Active |
| AST-PELNI-000099 | Old Communication Rack KM Tidar | KM Tidar | Communication Equipment | Disposal Candidate | Disposal Process |

---

## 22. Dummy Invoice Data

### 22.1 Invoice List Sample

| Invoice No | Type | Vendor | Source Ref | WBS | Asset Ref | Amount | Status | Payment |
|---|---|---|---|---|---|---:|---|---|
| INV-STN-2026-0001 | Procurement | PT Samudera Teknik Nusantara | PO-EAM-2026-0004 | WBS-NAV-2026-001 | AST-PELNI-000231, AST-PELNI-000232 | Rp 2.025.750.000 | Finance Verification | Unpaid |
| INV-BAH-2026-0003 | Maintenance | PT Bahari Maintenance Indonesia | WO-MNT-2026-0014 | WBS-MNT-2026-014 | AST-PELNI-000145 | Rp 420.000.000 | Approved | Partially Paid |
| INV-EKM-2026-0004 | Replacement | PT Elektrika Kapal Mandiri | PO-EAM-2026-0009 | WBS-RPL-2026-009 | AST-PELNI-000188 | Rp 680.000.000 | Ready for Payment | Unpaid |
| INV-DPJ-2026-0002 | Disposal | PT Docking Prima Jaya | DSP-2026-0003 | WBS-DSP-2026-003 | AST-PELNI-000099 | Rp 115.000.000 | Technical Verification | Unpaid |
| INV-ITM-2026-0008 | Installation | PT Integrasi Teknologi Maritim | PO-EAM-2026-0011 | WBS-INS-2026-006 | Multiple IT Assets | Rp 795.000.000 | Mismatch | Hold |

---

### 22.2 Procurement Invoice Detail Sample

| Field | Value |
|---|---|
| Invoice No | INV-STN-2026-0001 |
| Invoice Type | Procurement |
| Vendor | PT Samudera Teknik Nusantara |
| Source Document | PO-EAM-2026-0004 |
| Delivery Order | DO-STN-2026-0007 |
| Acceptance Test | AT-NAV-2026-0002 |
| WBS | WBS-NAV-2026-001 |
| Related Assets | AST-PELNI-000231, AST-PELNI-000232 |
| Invoice Date | 2026-05-07 |
| Due Date | 2026-06-06 |
| Payment Term | Net 30 |
| Amount | Rp 2.025.750.000 |
| Status | Finance Verification |

Line Items:

| Item Code | Description | Qty | Unit Price | Tax | Total |
|---|---|---:|---:|---:|---:|
| AST-NAV-001 | Radar Navigation Unit | 2 | Rp 850.000.000 | Rp 187.000.000 | Rp 1.887.000.000 |
| SRV-INS-001 | Installation & Commissioning | 1 | Rp 125.000.000 | Rp 13.750.000 | Rp 138.750.000 |

---

### 22.3 Maintenance Invoice Detail Sample

| Field | Value |
|---|---|
| Invoice No | INV-BAH-2026-0003 |
| Invoice Type | Maintenance |
| Vendor | PT Bahari Maintenance Indonesia |
| Source Document | WO-MNT-2026-0014 |
| Related Asset | AST-PELNI-000145 — Main Engine Pump KM Labobar |
| WBS | WBS-MNT-2026-014 |
| Invoice Date | 2026-05-03 |
| Due Date | 2026-05-30 |
| Amount | Rp 420.000.000 |
| Status | Approved |
| Payment Status | Partially Paid |

Line Items:

| Item Code | Description | Qty | Unit Price | Tax | Total |
|---|---|---:|---:|---:|---:|
| SRV-MNT-001 | Overhaul Main Engine Pump | 1 | Rp 350.000.000 | Rp 38.500.000 | Rp 388.500.000 |
| SPR-PMP-002 | Pump Seal Kit | 1 | Rp 28.378.378 | Rp 3.121.622 | Rp 31.500.000 |

---

### 22.4 Installation Invoice Detail Sample

| Field | Value |
|---|---|
| Invoice No | INV-ITM-2026-0008 |
| Invoice Type | Installation |
| Vendor | PT Integrasi Teknologi Maritim |
| Source Document | PO-EAM-2026-0011 |
| Acceptance Test | AT-INS-2026-0006 |
| WBS | WBS-INS-2026-006 |
| Invoice Date | 2026-05-13 |
| Due Date | 2026-06-12 |
| Amount | Rp 795.000.000 |
| Status | Mismatch / Hold |

Mismatch Reason:

```text
Acceptance Test status is Conditional and still requires revision.
Invoice cannot proceed to approval before final acceptance is completed.
```

---

### 22.5 Replacement Invoice Detail Sample

| Field | Value |
|---|---|
| Invoice No | INV-EKM-2026-0004 |
| Invoice Type | Replacement |
| Vendor | PT Elektrika Kapal Mandiri |
| Source Document | PO-EAM-2026-0009 |
| Related Asset | AST-PELNI-000188 — Generator Panel KM Ciremai |
| Old Asset Ref | AST-PELNI-000177 — Old Generator Panel |
| WBS | WBS-RPL-2026-009 |
| Invoice Date | 2026-05-11 |
| Due Date | 2026-06-10 |
| Amount | Rp 680.000.000 |
| Status | Ready for Payment |

---

### 22.6 Disposal Invoice Detail Sample

| Field | Value |
|---|---|
| Invoice No | INV-DPJ-2026-0002 |
| Invoice Type | Disposal |
| Vendor | PT Docking Prima Jaya |
| Source Document | DSP-2026-0003 |
| Related Asset | AST-PELNI-000099 — Old Communication Rack KM Tidar |
| WBS | WBS-DSP-2026-003 |
| Invoice Date | 2026-05-04 |
| Due Date | 2026-05-24 |
| Amount | Rp 115.000.000 |
| Status | Technical Verification |

---

## 23. Dummy Dashboard Metrics

```typescript
export const invoiceDashboardSummary = {
  totalInvoices: 18,
  totalAmount: 12875000000,
  waitingApproval: 5,
  mismatchInvoices: 2,
  readyForPayment: 4,
  overdueInvoices: 3,
  paidInvoices: 6,
  partiallyPaidInvoices: 2,
};
```

---

## 24. Suggested Dummy Data Structure for Frontend

```typescript
export type InvoiceStatus =
  | 'Draft'
  | 'Submitted'
  | 'Waiting Matching'
  | 'Matched'
  | 'Mismatch'
  | 'Technical Verification'
  | 'Finance Verification'
  | 'Waiting Approval'
  | 'Approved'
  | 'Rejected'
  | 'Ready for Payment'
  | 'Partially Paid'
  | 'Paid'
  | 'Cancelled'
  | 'Hold';

export type InvoiceType =
  | 'Procurement'
  | 'Maintenance'
  | 'Installation'
  | 'Replacement'
  | 'Disposal';

export interface InvoiceLineItem {
  itemCode: string;
  description: string;
  sourceQty: number;
  invoiceQty: number;
  unitPrice: number;
  tax: number;
  total: number;
  matchingStatus: 'Matched' | 'Mismatch' | 'Not Checked';
}

export interface InvoiceRecord {
  id: string;
  invoiceNo: string;
  invoiceType: InvoiceType;
  vendorId: string;
  vendorName: string;
  sourceDocumentType: 'PO' | 'WO' | 'DO' | 'Acceptance' | 'Disposal';
  sourceDocumentNo: string;
  poNo?: string;
  doNo?: string;
  workOrderNo?: string;
  acceptanceNo?: string;
  wbsCode: string;
  costCenter: string;
  assetIds: string[];
  invoiceDate: string;
  dueDate: string;
  paymentTerm: string;
  currency: 'IDR';
  subtotal: number;
  taxAmount: number;
  withholdingTax?: number;
  totalAmount: number;
  status: InvoiceStatus;
  paymentStatus: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Hold';
  lineItems: InvoiceLineItem[];
  attachments: string[];
  notes?: string;
}
```

---

## 25. Suggested Folder Structure

```text
/src
  /app
    /eam
      /invoice-management
        page.tsx
        /components
          InvoiceDashboard.tsx
          InvoiceListTable.tsx
          InvoiceDetailForm.tsx
          InvoiceMatchingWorkbench.tsx
          ApprovalQueue.tsx
          PaymentMonitoring.tsx
          AssetCostAllocation.tsx
          InvoiceReports.tsx
          StatusBadge.tsx
          InvoiceToolbar.tsx
        /data
          invoiceDummyData.ts
          vendorDummyData.ts
          wbsDummyData.ts
          assetDummyData.ts
        /types
          invoice.types.ts
        /utils
          invoiceFormatter.ts
          invoiceMatching.ts
```

---

## 26. Component Requirement

### 26.1 InvoiceDashboard.tsx

Responsibilities:

- Render summary cards.
- Render invoice by status chart.
- Render recent invoices table.
- Provide quick filter.

### 26.2 InvoiceListTable.tsx

Responsibilities:

- Render table of all invoices.
- Support search, filter, sort.
- Support row click to detail.
- Show status badge.

### 26.3 InvoiceDetailForm.tsx

Responsibilities:

- SAP B1-like document detail.
- Header form.
- Tab-based detail area.
- Action toolbar.

### 26.4 InvoiceMatchingWorkbench.tsx

Responsibilities:

- Compare invoice against source documents.
- Show matched/mismatch results.
- Allow action: approve match, hold, request revision.

### 26.5 ApprovalQueue.tsx

Responsibilities:

- Show pending approval tasks.
- Provide approve/reject/hold modal.

### 26.6 PaymentMonitoring.tsx

Responsibilities:

- Show invoice payment status.
- Update payment dummy status.

### 26.7 AssetCostAllocation.tsx

Responsibilities:

- Show allocation of invoice cost to assets.
- Separate acquisition, installation, maintenance, replacement, disposal cost.

### 26.8 InvoiceReports.tsx

Responsibilities:

- Render reports by vendor/status/asset/WBS.
- Provide export button UI only.

---

## 27. UI Behavior

### 27.1 Filter Behavior

Available filters:

- Period
- Vendor
- Invoice Type
- Status
- Payment Status
- WBS
- Asset
- Source Document
- Search keyword

### 27.2 Table Behavior

- Row hover highlight.
- Sticky table header.
- Compact row density.
- Pagination.
- Sort by date, amount, status.
- Status badge color.

### 27.3 Detail Behavior

- Clicking invoice row opens detail page or right-side panel.
- Detail form has SAP B1-style header and tabs.
- Primary actions visible on top toolbar.
- Disabled action if status does not allow it.

---

## 28. Validation Rules

| Rule | Description |
|---|---|
| Invoice No required | Invoice tidak boleh kosong |
| Vendor required | Vendor wajib dipilih |
| Source document required | Invoice harus punya referensi dokumen sumber |
| Due date >= invoice date | Due date tidak boleh lebih kecil dari invoice date |
| Invoice qty <= received qty | Untuk procurement, invoice qty tidak boleh lebih besar dari DO qty |
| Invoice amount <= PO remaining amount | Tidak boleh overbilling kecuali ada approval khusus |
| Acceptance must pass | Untuk asset teknis, acceptance harus passed sebelum approval |
| Tax invoice required | Untuk invoice kena pajak, faktur pajak wajib diupload |
| Asset allocation required | Untuk invoice asset-related, cost allocation wajib diisi |

---

## 29. Approval Rule Sample

| Amount Range | Approval Flow |
|---|---|
| < Rp 100.000.000 | Technical Verifier → Finance Verifier |
| Rp 100.000.000 - Rp 1.000.000.000 | Technical Verifier → Procurement Manager → Finance Manager |
| > Rp 1.000.000.000 | Technical Verifier → Procurement Manager → Finance Manager → Asset Manager / Director |

---

## 30. Integration Notes for Future Backend

Although this PRD is for UI demo stage, prepare the UI to support future backend integration.

### 30.1 Future API Endpoint Suggestion

```text
GET    /api/eam/invoices
GET    /api/eam/invoices/:id
POST   /api/eam/invoices
PUT    /api/eam/invoices/:id
POST   /api/eam/invoices/:id/submit
POST   /api/eam/invoices/:id/matching
POST   /api/eam/invoices/:id/technical-verification
POST   /api/eam/invoices/:id/finance-verification
POST   /api/eam/invoices/:id/approve
POST   /api/eam/invoices/:id/reject
POST   /api/eam/invoices/:id/payment
GET    /api/eam/invoices/reports/aging
GET    /api/eam/invoices/reports/by-vendor
GET    /api/eam/invoices/reports/by-asset
```

### 30.2 Future Database Entity Suggestion

```text
Invoice
InvoiceLine
InvoiceAttachment
InvoiceMatchingResult
InvoiceApproval
InvoicePayment
InvoiceAssetAllocation
InvoiceAuditTrail
```

---

## 31. Page Acceptance Criteria

### 31.1 Dashboard

- User can see total invoice, amount, mismatch, approval, overdue.
- User can filter by period, vendor, status.
- Recent invoice table appears.

### 31.2 Vendor Invoice

- User can view all invoice records.
- User can create dummy invoice.
- User can open invoice detail.
- Status badge works.

### 31.3 Invoice Detail

- Header information is visible.
- Tabs are available and navigable.
- Line item table is visible.
- Matching result is visible.
- Attachment list is visible.

### 31.4 Matching Workbench

- User can compare invoice with source document.
- Mismatch data must be visually highlighted.
- User can mark invoice as matched or hold.

### 31.5 Approval Queue

- User can view invoice pending approval.
- User can click approve/reject/hold.
- Approval timeline updates in dummy UI.

### 31.6 Payment Monitoring

- User can view payment status.
- User can update dummy payment status.
- Partial payment must show remaining amount.

### 31.7 Asset Cost Allocation

- User can see invoice cost linked to asset.
- Cost type must be visible.
- Asset cost history should reflect invoice relation.

---

## 32. UI Copywriting

Use enterprise wording:

| Label | Recommended Text |
|---|---|
| New Invoice | New Vendor Invoice |
| Matching | Invoice Matching |
| Technical | Technical Verification |
| Finance | Finance Verification |
| Payment | Payment Monitoring |
| Cost | Asset Cost Allocation |
| Audit | Audit Trail |
| Hold | Hold Invoice |
| Revision | Request Revision |

---

## 33. Development Priority for Google Antigravity

Build sequence:

```text
1. Create invoice-management route and layout
2. Create dummy data files
3. Build Invoice Dashboard
4. Build Invoice List Table
5. Build Invoice Detail with tabs
6. Build Matching Workbench
7. Build Approval Queue
8. Build Payment Monitoring
9. Build Asset Cost Allocation
10. Build Reports & Audit Trail
11. Polish SAP B1-like styling
```

---

## 34. Design Style Tokens

Use Tailwind classes similar to:

```text
bg-slate-50
bg-white
border border-slate-200
text-slate-700
text-slate-900
rounded-sm or rounded-md
shadow-sm
text-xs for dense table
text-sm for form label
h-9 for input height
```

Recommended layout density:

- Table font: `text-xs`
- Form label: `text-xs font-medium`
- Form input: `h-9 text-sm`
- Card padding: `p-4`
- Tab header: compact and bordered
- Toolbar button: small, enterprise style

---

## 35. Final Notes

Module **2.7 Invoice Management** harus menjadi jembatan antara flow operasional EAM dan kebutuhan finance/accounting.

Dalam UI demo tahap pertama, modul ini wajib menunjukkan bahwa invoice terhubung dengan:

- PO
- DO
- Acceptance Test
- Asset Registration
- Maintenance Work Order
- Replacement
- Disposal
- WBS
- Cost Center
- Payment Status
- Asset Cost History

Dengan begitu, EAM PELNI terlihat sebagai sistem enterprise yang utuh, bukan hanya sistem pencatatan aset.

