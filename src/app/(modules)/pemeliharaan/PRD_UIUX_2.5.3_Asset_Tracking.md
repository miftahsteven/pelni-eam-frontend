# PRD UI/UX – Modul 2.5.3 Asset Tracking

## 1. Informasi Modul

- **Kode Modul:** 2.5.3
- **Nama Modul:** Asset Tracking
- **Parent Module:** 2.5 Pemeliharaan
- **Path Menu:** `/pemeliharaan/asset-tracking`
- **Folder Frontend:** `/modules/pemeliharaan/asset-tracking`
- **Tahap Pengembangan:** Tahap 1 – UI Frontend Demo dengan Data Dummy
- **Referensi Desain:** SAP Business One
- **Stack Frontend:** Next.js, Tailwind CSS

---

## 2. Tujuan Modul

Submodul **Asset Tracking** digunakan untuk memantau posisi, status, dan riwayat perpindahan aset secara periodik. Modul ini membantu tim operasional mengetahui lokasi aktual aset, histori mutasi, status penggunaan, serta mendeteksi aset yang berpindah lokasi tanpa proses administrasi yang sah.

Dalam konteks EAM PELNI, Asset Tracking harus dapat mendukung pelacakan aset yang berada di kantor, gudang, cabang, kapal, pelabuhan, atau lokasi operasional lainnya.

---

## 3. Hubungan dengan Modul Lain

Asset Tracking harus terlihat terhubung dengan modul sebelumnya meskipun pada tahap UI demo masih menggunakan data dummy.

| Modul Terkait | Relasi |
|---|---|
| 2.4.3 Asset Registration | Sumber master data aset yang akan dilacak |
| 2.5.1 Maintenance | Status maintenance dapat memengaruhi status aset |
| 2.5.2 Stock Opname | Hasil stock opname dapat memperbarui lokasi aktual aset |
| 2.3 Procurement | Riwayat pengadaan sebagai sumber awal aset |

---

## 4. Struktur Menu

Sidebar harus menampilkan parent menu **Pemeliharaan** dengan sub menu sebagai berikut:

```text
Pemeliharaan
├── Maintenance
├── Stock Opname
└── Asset Tracking
```

Menu **Asset Tracking** harus aktif ketika user berada di path:

```text
/pemeliharaan/asset-tracking
```

---

## 5. Struktur Folder Wajib

Buat seluruh file submodul Asset Tracking di dalam folder parent **pemeliharaan**.

```text
/modules
  /pemeliharaan
    /maintenance
    /stock-opname
    /asset-tracking
      page.tsx
      components/
        AssetTrackingDashboard.tsx
        AssetTrackingTable.tsx
        AssetTrackingMap.tsx
        AssetMovementTimeline.tsx
        AssetTrackingFilter.tsx
        AssetTrackingDetailDrawer.tsx
      data/
        dummyAssetTracking.ts
      types/
        assetTracking.types.ts
```

---

## 6. Persona Pengguna

### 6.1 Admin EAM
- Melihat seluruh aset dan histori tracking.
- Mengelola data lokasi dan status aset.

### 6.2 Supervisor Operasional
- Memantau aset berdasarkan lokasi kerja.
- Melakukan review jika ada aset berpindah tidak sesuai prosedur.

### 6.3 Petugas Lapangan
- Melakukan scan QR/barcode aset.
- Melaporkan lokasi aktual aset.

### 6.4 Auditor / Manajemen
- Melihat histori perpindahan aset.
- Melihat laporan aset yang tidak sesuai lokasi.

---

## 7. Analisis Flow Asset Tracking

### 7.1 Flow Utama

```text
User membuka menu Pemeliharaan > Asset Tracking
↓
Sistem menampilkan dashboard ringkasan tracking aset
↓
User memilih filter lokasi / kategori / status / kondisi aset
↓
Sistem menampilkan daftar aset dan peta lokasi aset
↓
User memilih salah satu aset
↓
Sistem menampilkan detail aset, lokasi saat ini, dan histori movement
↓
User dapat melakukan update lokasi manual atau input hasil scan QR
↓
Sistem mencatat movement history dan timestamp
↓
Jika lokasi tidak sesuai dengan lokasi terdaftar, sistem memberi flag anomaly
↓
Supervisor melakukan review anomali
↓
Data tracking tersimpan sebagai audit trail
```

### 7.2 Flow Update Lokasi Aset

```text
Pilih aset
↓
Klik Update Location
↓
Input lokasi aktual / scan QR / pilih titik peta
↓
Isi catatan update
↓
Submit
↓
Sistem menyimpan lokasi baru
↓
Sistem menambahkan data ke movement history
↓
Status lokasi aset diperbarui
```

### 7.3 Flow Deteksi Anomali

```text
Aset memiliki lokasi terdaftar di sistem
↓
User melakukan update lokasi aktual
↓
Sistem membandingkan lokasi aktual dengan lokasi terdaftar
↓
Jika berbeda, sistem menandai sebagai Location Mismatch
↓
Supervisor menerima daftar anomaly tracking
↓
Supervisor dapat approve perubahan lokasi atau meminta klarifikasi
```

---

## 8. Analisis Input, Proses, Output

### 8.1 Input

| Input | Deskripsi |
|---|---|
| Asset ID | Kode unik aset dari Asset Registration |
| Asset Name | Nama aset |
| Asset Category | Kategori aset, contoh: mesin, kendaraan, perangkat IT, alat operasional |
| Registered Location | Lokasi resmi aset di sistem |
| Current Location | Lokasi aktual berdasarkan update terakhir |
| Tracking Method | Manual, QR Scan, Barcode, GPS Dummy |
| PIC / Custodian | Penanggung jawab aset |
| Movement Date | Tanggal perpindahan/update lokasi |
| Movement Type | Check-in, Check-out, Transfer, Relocation, Inspection |
| Notes | Catatan perubahan lokasi |
| Evidence Photo | Bukti foto, optional untuk UI demo |
| Status | Active, In Use, Under Maintenance, Missing, Mismatch |

### 8.2 Proses

| Proses | Deskripsi |
|---|---|
| Load Asset Tracking Data | Sistem mengambil daftar aset dari dummy data |
| Filter Asset | User dapat filter berdasarkan lokasi, kategori, status, dan PIC |
| Display Map / Location Panel | Sistem menampilkan lokasi aset dalam bentuk map placeholder atau location panel |
| View Asset Detail | User melihat detail aset dan histori tracking |
| Update Location | User melakukan update lokasi aset |
| Record Movement History | Sistem menyimpan histori perpindahan aset |
| Detect Location Mismatch | Sistem memberi tanda jika lokasi aktual berbeda dari lokasi resmi |
| Supervisor Review | Supervisor melakukan validasi atas perubahan/anomali |
| Generate Report | Sistem menampilkan summary tracking dan anomaly report |

### 8.3 Output

| Output | Deskripsi |
|---|---|
| Asset Tracking Dashboard | Ringkasan total aset, tracked asset, mismatch, missing, under maintenance |
| Asset Location List | Daftar aset beserta lokasi aktual |
| Asset Detail | Detail aset, PIC, status, lokasi, dan histori |
| Movement History | Riwayat perpindahan aset berdasarkan waktu |
| Location Mismatch Alert | Daftar aset yang lokasinya tidak sesuai |
| Missing Asset Flag | Penanda aset tidak ditemukan |
| Audit Trail | Catatan perubahan lokasi aset |
| Tracking Report | Laporan tracking aset untuk monitoring dan audit |

---

## 9. Status Lifecycle Asset Tracking

Gunakan status berikut pada UI:

```text
Active
In Use
Under Maintenance
Location Mismatch
Missing
Inactive
```

### Warna Status SAP-like

| Status | Warna UI |
|---|---|
| Active | Green soft badge |
| In Use | Blue soft badge |
| Under Maintenance | Orange soft badge |
| Location Mismatch | Red soft badge |
| Missing | Dark red / danger badge |
| Inactive | Gray badge |

---

## 10. Requirement Halaman UI

### 10.1 Halaman Utama Asset Tracking

Path:

```text
/pemeliharaan/asset-tracking
```

Komponen utama:

1. Page Header
2. Summary Cards
3. Filter Panel
4. Asset Location Table
5. Map / Location View Placeholder
6. Asset Detail Drawer
7. Movement Timeline
8. Anomaly List

---

## 11. Detail UI Screen

### 11.1 Page Header

Tampilkan:

- Title: **Asset Tracking**
- Subtitle: **Monitoring lokasi, status, dan histori perpindahan aset**
- Breadcrumb:

```text
EAM > Pemeliharaan > Asset Tracking
```

Action button:

- `+ Update Location`
- `Scan QR` sebagai button dummy
- `Export Report`

---

### 11.2 Summary Cards

Gunakan card ala SAP B1 yang clean dan compact.

Cards:

1. **Total Assets**
2. **Tracked Assets**
3. **Location Mismatch**
4. **Missing Assets**
5. **Under Maintenance**

Contoh dummy value:

```text
Total Assets: 240
Tracked Assets: 218
Location Mismatch: 7
Missing Assets: 3
Under Maintenance: 12
```

---

### 11.3 Filter Panel

Filter harus berada di atas table.

Field filter:

- Search asset name / asset code
- Location
- Category
- Status
- PIC / Custodian
- Date range

Button:

- `Search`
- `Reset`

Desain filter mengikuti SAP B1:

- Compact input
- Label kecil
- Grid 4 kolom di desktop
- Collapsible di mobile

---

### 11.4 Asset Location Table

Table utama menggunakan enterprise dense grid.

Kolom table:

| Column | Description |
|---|---|
| Asset Code | Kode aset |
| Asset Name | Nama aset |
| Category | Kategori aset |
| Registered Location | Lokasi resmi |
| Current Location | Lokasi aktual |
| PIC | Penanggung jawab |
| Last Update | Waktu update terakhir |
| Status | Badge status |
| Action | View, Update Location |

Fitur table:

- Sorting
- Search
- Pagination
- Hover row
- Sticky header
- Action menu per row

---

### 11.5 Map / Location View Placeholder

Karena tahap ini adalah UI demo, map cukup berupa placeholder visual.

Requirement:

- Tampilkan panel peta sederhana.
- Gunakan marker dummy untuk lokasi aset.
- Marker warna merah untuk mismatch/missing.
- Marker warna hijau untuk aset normal.
- Ketika marker diklik, munculkan mini popover berisi:
  - Asset Code
  - Asset Name
  - Current Location
  - Status

Catatan implementasi:

- Jangan wajib menggunakan library map berat pada tahap awal.
- Boleh menggunakan static location panel berbentuk card/map mock.
- Jika ingin library, gunakan pendekatan modular agar mudah diganti dengan Mapbox/Leaflet pada tahap berikutnya.

---

### 11.6 Asset Detail Drawer

Saat user klik `View`, tampilkan drawer kanan.

Isi drawer:

#### A. Asset Information
- Asset Code
- Asset Name
- Category
- Serial Number
- Registered Location
- Current Location
- PIC
- Status

#### B. Tracking Information
- Tracking Method
- Last Update
- Last Updated By
- Notes

#### C. Movement Timeline
- Tanggal
- Movement Type
- From Location
- To Location
- Updated By
- Notes

#### D. Related Action
- Update Location
- Mark as Missing
- View Maintenance History
- View Stock Opname Result

---

### 11.7 Update Location Modal

Form modal untuk update lokasi.

Field:

- Asset Code, readonly
- Asset Name, readonly
- Current Location, readonly
- New Location, dropdown/input
- Movement Type
- Tracking Method
- PIC / Custodian
- Notes
- Upload Evidence, dummy optional

Button:

- `Cancel`
- `Submit Update`

Setelah submit:

- Update current location di table dummy state.
- Tambahkan movement history dummy.
- Jika new location berbeda dari registered location, status menjadi `Location Mismatch`.

---

### 11.8 Anomaly List

Panel khusus untuk aset bermasalah.

Jenis anomaly:

- Location Mismatch
- Missing Asset
- Inactive Asset
- Asset under maintenance but moved

Kolom:

| Column | Description |
|---|---|
| Asset Code | Kode aset |
| Asset Name | Nama aset |
| Issue Type | Jenis anomali |
| Current Location | Lokasi aktual |
| Registered Location | Lokasi sistem |
| Last Update | Update terakhir |
| Action | Review |

---

## 12. Dummy Data Requirement

Buat dummy data minimal 12 aset.

Contoh struktur data:

```ts
export type AssetTrackingStatus =
  | 'Active'
  | 'In Use'
  | 'Under Maintenance'
  | 'Location Mismatch'
  | 'Missing'
  | 'Inactive';

export type AssetMovement = {
  id: string;
  movementDate: string;
  movementType: 'Check-in' | 'Check-out' | 'Transfer' | 'Relocation' | 'Inspection';
  fromLocation: string;
  toLocation: string;
  updatedBy: string;
  notes?: string;
};

export type AssetTrackingItem = {
  id: string;
  assetCode: string;
  assetName: string;
  category: string;
  serialNumber: string;
  registeredLocation: string;
  currentLocation: string;
  pic: string;
  trackingMethod: 'Manual' | 'QR Scan' | 'Barcode' | 'GPS Dummy';
  lastUpdate: string;
  lastUpdatedBy: string;
  status: AssetTrackingStatus;
  movementHistory: AssetMovement[];
};
```

Contoh aset dummy:

```text
AST-PELNI-0001 | Generator Kapal | Engine Room KM Kelud | Active
AST-PELNI-0002 | Pompa Air | Gudang Surabaya | Location Mismatch
AST-PELNI-0003 | Laptop Operasional | Kantor Pusat | In Use
AST-PELNI-0004 | Radio Komunikasi | KM Dorolonda | Missing
AST-PELNI-0005 | Panel Listrik | Pelabuhan Makassar | Under Maintenance
```

---

## 13. UI/UX Design Guidelines – SAP Business One Reference

Gunakan visual seperti SAP Business One:

### Layout
- Sidebar kiri untuk navigasi modul.
- Header atas sederhana.
- Konten berbasis card dan grid.
- Table dense dan rapi.
- Detail tampil melalui drawer kanan.

### Visual Style
- Background putih/abu muda.
- Border tipis.
- Shadow sangat ringan.
- Font modern dan mudah dibaca.
- Padding compact.
- Tidak terlalu banyak animasi.

### Komponen
- Button primary minimalis.
- Badge status.
- Table enterprise.
- Form 2 kolom.
- Modal compact.
- Drawer detail.

### Warna
- Gunakan warna netral dominan.
- Biru sebagai aksen utama.
- Warna status hanya untuk badge dan alert.

---

## 14. Responsive Requirement

### Desktop
- Sidebar tetap tampil.
- Table dan map bisa tampil berdampingan.
- Filter grid 4 kolom.

### Tablet
- Table full width.
- Map turun ke bawah.
- Filter 2 kolom.

### Mobile
- Sidebar collapsible.
- Table dapat horizontal scroll.
- Filter collapsible.
- Drawer berubah menjadi full screen modal.

---

## 15. Acceptance Criteria

### Functional UI
- User dapat membuka menu Pemeliharaan > Asset Tracking.
- User dapat melihat summary cards.
- User dapat melihat daftar tracking aset.
- User dapat melakukan filter dummy.
- User dapat membuka detail aset.
- User dapat melihat movement timeline.
- User dapat membuka modal update location.
- User dapat submit update location pada state dummy.
- User dapat melihat anomaly list.

### UI/UX
- Tampilan bersih, enterprise, dan mirip SAP Business One.
- Table terlihat compact dan profesional.
- Status aset mudah dibedakan.
- Detail drawer mudah dibaca.
- Layout tetap nyaman untuk demo kepada stakeholder.

### Foldering
- Semua file submodul ini wajib berada di:

```text
/modules/pemeliharaan/asset-tracking
```

---

## 16. Instruksi untuk Google Antigravity

Bangun UI frontend demo untuk submodul **2.5.3 Asset Tracking** pada aplikasi EAM PELNI.

Gunakan:

- Next.js
- Tailwind CSS
- Data dummy lokal
- Design reference SAP Business One
- Folder wajib: `/modules/pemeliharaan/asset-tracking`

Buat halaman utama di path:

```text
/pemeliharaan/asset-tracking
```

Pastikan parent menu **Pemeliharaan** memiliki submenu:

```text
Maintenance
Stock Opname
Asset Tracking
```

Asset Tracking harus menjadi menu aktif saat halaman dibuka.

Bangun komponen:

```text
AssetTrackingDashboard
AssetTrackingTable
AssetTrackingMap
AssetMovementTimeline
AssetTrackingFilter
AssetTrackingDetailDrawer
UpdateLocationModal
AnomalyList
```

Gunakan dummy data minimal 12 aset dengan variasi status:

```text
Active
In Use
Under Maintenance
Location Mismatch
Missing
Inactive
```

Fokus pada UI demo yang rapi, siap dipresentasikan, dan mudah dikembangkan pada tahap backend berikutnya.

---

## 17. Catatan Pengembangan Lanjutan

Pada tahap backend, modul ini dapat dikembangkan menjadi:

- Integrasi QR code scanner.
- Integrasi GPS untuk aset bergerak.
- Integrasi map seperti Leaflet/Mapbox.
- REST API tracking history.
- Approval workflow untuk perpindahan lokasi.
- Integrasi mobile app untuk petugas lapangan.
- Audit trail detail untuk kebutuhan pemeriksaan internal.

