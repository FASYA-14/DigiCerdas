# DigiCerdas: Platform Informasi & Pelatihan Literasi Digital Berbasis Generative AI

Rancangan implementasi platform pembelajaran dan panduan interaktif literasi digital untuk murid sekolah menengah dan guru/konselor BK, mencakup 7 fitur utama pendukung kurikulum 90 menit dengan integrasi Generative AI (Gemini 3.8 Flash).

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan klarifikasi pengguna pada Fase 1, keputusan desain dan arsitektur berikut telah disepakati:
> - **Mode Akses Pengguna**: Dual Mode terintegrasi dengan pengalih cepat peran (*Student Hub* untuk murid & *Teacher/Counselor Portal* untuk fasilitator dan guru BK).
> - **Laboratorium Prompt AI**: Didukung langsung oleh Live Gemini AI API (`gemini-3.8-flash`) untuk pengujian prompt real-time, evaluasi kualitas prompt berdasarkan 4 pilar (Kejelasan, Konteks, Batasan, Verifikasi), dan analisis kritis terhadap hasil AI.
> - **Arah Visual & Desain**: Tema edukasi modern dan berenergi (*vibrant modern educational theme*) dengan warna utama Teal (#0D9488) dan Indigo (#4F46E5), aksen hangat amber, tata letak dua zona (*two-zone sandbox*), serta kepatuhan anti-slop (tanpa pill box statis, tipografi editorial bersih).

---

## 1. Overview & Core Concept

- **Definisi Produk**: DigiCerdas (Digital Cerdas dan Bertanggung Jawab) adalah aplikasi web edukatif interaktif yang dirancang untuk mendukung Ujian Tengah Semester dan program pelatihan literasi digital abad ke-21.
- **Target Pengguna**:
  1. *Murid Sekolah Menengah*: Pengguna aktif internet dan Generative AI yang membutuhkan panduan berpikir kritis, keamanan data pribadi, etika digital, dan kecakapan AI.
  2. *Guru Mata Pelajaran & Guru BK*: Pembimbing literasi digital yang membutuhkan modul ajar 90 menit, pedoman konseling kasus siber, panduan refleksi, dan instrumen evaluasi.
- **Nilai Kunci**: Menjembatani teori literasi digital dengan latihan praktis langsung (simulasi studi kasus nyata, uji fakta interaktif, deteksi hoaks, etika AI) serta integrasi live AI untuk mengevaluasi jawaban secara kritis.

---

## 2. User Experience & Visual Design

### A. Alur Pengguna (User Flows)
1. **Penyambutan & Pemilihan Peran**:
   - Hero banner interaktif dengan ringkasan program UTS DigiCerdas, capaian pembelajaran abad-21, dan pengalih peran (Murid vs Guru).
2. **Student Learning Hub**:
   - **Pusat Materi (5 Modul)**: Navigasi visual konsep dasar, berpikir kritis, keamanan/etika siber, generative AI beretika, dan penguatan peran bimbingan.
   - **Tantangan Cek Fakta**: Simulasi feed berita/medsos Indonesia dengan tombol verifikasi sumber, bukti pendukung, dan label fakta vs opini.
   - **Simulasi Keamanan Digital**: Skenario percabangan pilihan keputusan (phishing, perundungan siber, kebocoran data, jejak digital).
   - **Laboratorium Prompt AI**: Uji coba prompt live dengan Gemini AI, skor kualitas prompt (0-100), analisis kelemahan prompt, dan uji verifikasi halusinasi.
   - **Kuis & Evaluasi**: Pre-test & Post-test komprehensif dengan pembahasan detail tiap opsi, kalkulasi skor pemahaman, dan penerbitan *Sertifikat DigiCerdas* yang dapat dicetak/disimpan.
   - **Refleksi & Komitmen Digital**: Lembar komitmen kebiasaan digital positif dengan kartu ikrar digital personal.
3. **Teacher & Counselor Facilitator Portal**:
   - **Rundown 90 Menit Interaktif**: Timer sesi hidup untuk 6 tahapan (Pembukaan 10m, Materi 20m, Studi Kasus 20m, Praktik AI 20m, Refleksi 15m, Penutup 5m).
   - **Panduan 5 Kompetensi Guru**: Digital, Pedagogis, Bimbingan Konseling (BK), Etika, dan Evaluasi.
   - **Matriks Kasus & Eskalasi BK**: Prosedur penanganan isu siswa (cyberbullying, kecanduan layar, hoaks, plagiarisme AI).
   - **Generator Bahan Diskusi**: Bantuan prompt terstruktur untuk memantik diskusi kelas yang mendalam.

### B. Identitas Visual & Desain UI
- **Gaya Visual**: Modern Educational Portal dengan layout bersih, kartu berbayang halus (`shadow-sm`, border tipis slate-200), dan aksen dinamis teal & indigo.
- **Palet Warna**:
  - Dominan Kanvas: Slate-50 / Putih bersih (`#F8FAFC`, `#FFFFFF`)
  - Warna Primer: Deep Teal (`#0F766E` / `#0D9488`) untuk ketenangan dan kecerdasan
  - Warna Sekunder: Indigo (`#4338CA` / `#6366F1`) untuk nuansa teknologi dan kecerdasan buatan
  - Aksen Status: Emerald (`#059669`) untuk verifikasi benar, Coral Red (`#E11D48`) untuk hoaks/peringatan bahaya, Amber (`#D97706`) untuk perlu investigasi
- **Tipografi**: Heading tegas dan bersahabat dengan font sans-serif modern, hierarchy teks yang jelas, unboxed metadata (menggunakan pemisah titik tengah `·` tanpa static pill badges).
- **Mikro-interaksi & Gerakan**: Transisi halus antar modul dengan Motion, umpan balik interaktif saat menjawab kuis atau cek fakta, animasi progres persentase materi.

---

## 3. Key Product Decisions & Trade-Offs

1. **Integrasi Gemini AI Server-Side**:
   - *Pilihan*: Menggunakan endpoint server Node.js/Express proxy (`/api/gemini/prompt-lab` dan `/api/gemini/critique`) dengan SDK `@google/genai` model `gemini-3.8-flash`.
   - *Alasan*: Menjaga keamanan API key tanpa eksposur ke browser, latency rendah, serta kemampuan memberikan analisis pedagogis yang tepat dalam Bahasa Indonesia.
   - *Alternatif*: Rule-based regex saja (ditinggalkan karena tidak memberikan pengalaman Generative AI nyata seperti yang diinstruksikan dalam proposal Smart Bright).
2. **State Management & Sertifikasi Lokal**:
   - *Pilihan*: State berbasis React dengan sinkronisasi `localStorage` untuk progres belajar murid, jawaban kuis, dan data sertifikat.
   - *Alasan*: Pengguna dapat langsung menggunakan aplikasi secara instan tanpa login yang rumit, namun riwayat belajar dan sertifikat tetap tersimpan antar muat ulang halaman.
3. **Dukungan Cetak & Ekspor**:
   - *Pilihan*: Template kartu komitmen digital dan sertifikat kelulusan berbasis CSS print & snapshot ekspor untuk presentasi hasil tugas UTS murid.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          DigiCerdas Web App                            │
│                                                                        │
│  ┌───────────────────────┐          ┌───────────────────────────────┐  │
│  │  Student Hub View     │          │  Teacher & Counselor Portal   │  │
│  │  - Modul Materi (5)   │          │  - 90-Min Workshop Timer      │  │
│  │  - Cek Fakta Lab      │          │  - Matriks Penanganan BK      │  │
│  │  - Simulasi Keamanan  │          │  - Panduan 5 Kompetensi       │  │
│  │  - Laboratorium AI    │          │  - Panduan Diskusi Kelas      │  │
│  │  - Kuis Pre/Post Test │          │  - Ekspor Rencana Aksi        │  │
│  │  - Komitmen & Cert    │          │                               │  │
│  └───────────┬───────────┘          └───────────────┬───────────────┘  │
│              │                                      │                  │
│              └──────────────────┬───────────────────┘                  │
│                                 ▼                                      │
│                      [ App State & LocalStorage ]                      │
│                  Progres, Skor Kuis, Nama Murid, Refleksi              │
│                                 │                                      │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │ HTTP POST (/api/gemini/prompt-lab)
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Express Server / Backend                        │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ POST /api/gemini/prompt-lab                                      │  │
│  │ POST /api/gemini/fact-check-assist                               │  │
│  │ - Menggunakan @google/genai SDK dengan model 'gemini-3.8-flash' │  │
│  │ - Header 'User-Agent': 'aistudio-build'                          │  │
│  │ - Validasi kriteria prompt: Konteks, Batasan, Instruksi, Verifikasi│  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Entitas Data & State
- `ModuleItem`: ID, judul, icon, durasi baca, ringkasan konsep, poin kunci, contoh dunia nyata.
- `FactCheckScenario`: Berita/postingan simulasi, tangkapan layar tiruan, petunjuk sumber, analisis fakta vs opini, kunci verifikasi & penjelasan edukatif.
- `SecurityScenario`: Skenario risiko siber, pilihan tindakan (bijak vs berisiko), konsekuensi, tips perlindungan data pribadi.
- `PromptLabSession`: Input prompt murid, respons hasil AI, skor 4 pilar prompt, catatan perbaikan, panduan verifikasi kebenaran (*fact-checking the AI*).
- `QuizQuestion`: Pertanyaan komprehensif menguji 5 materi utama, pembahasan detail tiap jawaban benar & salah.
- `UserProgress`: Modul terselesaikan, skor pre-test, skor post-test, teks komitmen digital, nama peserta untuk sertifikat.
