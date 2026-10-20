import { FactCheckItem } from '../types';

export const factCheckScenarios: FactCheckItem[] = [
  {
    id: 'fc-1',
    title: 'Surat Edaran Pembagian Kuota Edukasi 100GB Lewat Tautan Bit.ly',
    platform: 'WhatsApp',
    source: 'Grup Chat Kelas ("Pesan Diteruskan Berkali-kali")',
    date: 'Hari ini, 09:15 WIB',
    textSnippet: 'KEMENDIKBUD RESMI BAGIKAN KUOTA 100GB DAN PULSA 200RB UNTUK SELURUH SISWA DALAM RANGKA UTS! Batas klaim HARI INI pukul 23.59. Bagikan ke 5 grup kelas dan klik tautan verifikasi: http://bit.ly/kuota-gratis-uts-resmi2026.xyz',
    clues: {
      urlClue: 'Alamat domain menggunakan layanan pemendek URL bit.ly dan berakhiran ekstensi komersial .xyz, bukan domain resmi instansi pemerintah (.go.id).',
      expertClue: 'Kementerian Pendidikan Dasar & Menengah selalu mengumumkan program resmi melalui portal www.kemdikbud.go.id atau akun media sosial centang biru resmi terverifikasi.',
      imageContextClue: 'Teks menggunakan huruf kapital penuh (SHOUTING), tata bahasa mendesak ("Batas klaim HARI INI"), dan syarat membagikan pesan berantai—karakteristik umum phishing pencurian data.'
    },
    correctType: 'hoaks',
    explanation: 'Informasi ini adalah HOAKS dengan modus phishing. Pesan ini memanfaatkan kepanikan murid yang membutuhkan kuota internet untuk mencuri nomor telepon atau memasang malware pada perangkat.',
    verificationTip: 'Periksa akhiran domain URL. Lembaga negara Indonesia WAJIB menggunakan domain berakhiran .go.id. Abaikan pesan berantai yang memaksa Anda membagikan tautan ke grup lain.'
  },
  {
    id: 'fc-2',
    title: 'Laporan BPS & Kemenkominfo: 72% Pelajar Mengakses Internet Lebih dari 4 Jam Tiap Hari',
    platform: 'Portal Berita',
    source: 'Harian Edukasi Nasional (Media Terdaftar di Dewan Pers)',
    date: 'Kemarin, 14:30 WIB',
    textSnippet: 'Berdasarkan Survei Penetrasi Internet Indonesia terbaru yang dirilis Badan Pusat Statistik bersama Kementerian Komunikasi dan Digital, 72,4% murid tingkat SMP dan SMA menghabiskan rata-rata 4,5 jam per hari di ruang digital untuk hiburan dan tugas sekolah.',
    clues: {
      urlClue: 'Domain berita terdaftar resmi di Dewan Pers Indonesia dengan alamat protokol aman HTTPS dan kanal redaksi yang jelas.',
      expertClue: 'Statistik merujuk pada dokumen publik tahunan BPS dengan metodologi survei sampel acak berstrata di 38 provinsi.',
      imageContextClue: 'Grafik infografis menyertakan tahun penerbitan, margin of error (±2.5%), dan tautan unduh dokumen laporan resmi.'
    },
    correctType: 'fakta',
    explanation: 'Informasi ini adalah FAKTA TERUJI. Memiliki atribusi sumber lembaga resmi yang jelas, metodologi terukur, dimuat oleh media pers profesional yang menerapkan Kode Etik Jurnalistik.',
    verificationTip: 'Fakta selalu dapat ditelusuri kembali ke rilis pers resmi atau dokumen penelitian primer. Cari nama instansi terkait di mesin pencari untuk memastikan keaslian riset.'
  },
  {
    id: 'fc-3',
    title: 'Klaim: "Generative AI Akan Membuat Murid Menjadi Sepenuhnya Malas dan Hilang Kreativitas"',
    platform: 'X (Twitter)',
    source: 'Utas Opini Akun Pribadi Pengamat Pendidikan',
    date: '3 hari yang lalu',
    textSnippet: 'Kemunculan ChatGPT dan Gemini adalah malapetaka terbesar bagi pendidikan abad ini. Dalam 3 tahun ke depan, semua murid dijamin akan kehilangan kemampuan berpikir analitis dan tidak akan ada lagi anak yang mau membaca buku tebal.',
    clues: {
      urlClue: 'Berasal dari akun opini pribadi, bukan publikasi jurnal ilmiah atau studi empiris jangka panjang.',
      expertClue: 'Para peneliti UNESCO menyatakan AI justru dapat meningkatkan personalisasi belajar murid jika didampingi dengan literasi prompt yang kritis dan panduan etika guru.',
      imageContextClue: 'Teks didominasi kata sifat mutlak ("malapetaka terbesar", "semua murid dijamin", "tidak akan ada lagi") tanpa menyajikan data statistik pembanding.'
    },
    correctType: 'opini',
    explanation: 'Ini adalah OPINI / PENDAPAT SUBJEKTIF. Kalimat ini mencerminkan sudut pandang dan kekhawatiran pribadi penulis, bukan fakta mutlak yang tak terbantahkan. AI dapat menjadi alat yang membangun atau merusak tergantung cara penggunaannya.',
    verificationTip: 'Identifikasi kata-kata subjektif seperti "terbaik", "terburuk", "malapetaka", "dijamin pasti". Opini adalah sudut pandang yang patut didiskusikan secara berimbang, bukan fakta ilmiah definitif.'
  },
  {
    id: 'fc-4',
    title: 'Peringatan Bahaya: "Mengetik Kata Kunci Ini di Google Akan Membuat Saldo Rekening Ludes"',
    platform: 'Instagram',
    source: 'Postingan Akun Gosip Viral',
    date: 'Pagi ini, 07:10 WIB',
    textSnippet: 'DARURAT! Jangan pernah ketik nama akun ini di pencarian Google atau data kontak dan rekening tabungan orang tua Anda akan langsung disedot peretas dalam 3 detik! Segera repost postingan ini di Story sebelum akun Anda ditandai hacker!',
    clues: {
      urlClue: 'Tidak ada rujukan teknis dari Badan Siber dan Sandi Negara (BSSN) atau pakar keamanan komputer.',
      expertClue: 'Secara arsitektur teknis keamanan internet, hanya melakukan pencarian kata teks di mesin pencari resmi TIDAK DAPAT menguras saldo rekening tanpa pengguna mengunduh file jahat (APK) atau menyerahkan kode OTP.',
      imageContextClue: 'Format gambar menggunakan warna merah menyala, efek sirene darurat, dan ajakan viralitas (engagement bait) untuk menaikkan pengikut akun.'
    },
    correctType: 'hoaks',
    explanation: 'Ini adalah HOAKS / PENAKUT-NAKUTI (Fear-mongering) yang bertujuan mencari viralitas (engagement bait). Secara teknis mustahil rekening tersedot hanya karena mengetik kata pencarian tanpa transaksi atau penyerahan kredensial.',
    verificationTip: 'Waspadai informasi yang menimbulkan ketakutan irasional dan memaksa untuk segera disebarkan ulang. Tanyakan pada guru TIK atau cek penjelasan akun pemeriksa fakta seperti Mafindo/TurnBackHoax.'
  },
  {
    id: 'fc-5',
    title: 'Kementerian Umumkan Program Integrasi Literasi Kecerdasan Buatan (AI) di Sekolah',
    platform: 'Portal Berita',
    source: 'Siaran Pers Resmi & Antara News',
    date: 'Minggu lalu, 11:00 WIB',
    textSnippet: 'Pemerintah secara bertahap mulai memperkenalkan modul pengenalan berpikir komputasional dan etika kecerdasan buatan bagi murid jenjang pendidikan dasar dan menengah melalui pelatihan guru dan kurikulum muatan lokal.',
    clues: {
      urlClue: 'Dikutip langsung dari transkrip pidato menteri pada konferensi pers resmi yang disiarkan di kanal YouTube resmi Kemdikbud.',
      expertClue: 'Selaras dengan roadmap transformasi digital nasional yang dirancang bersama pakar pedagogi dan praktisi teknologi.',
      imageContextClue: 'Foto dokumentasi peluncuran resmi dengan latar spanduk resmi, dihadiri para guru pembimbing dan asosiasi pendidik.'
    },
    correctType: 'fakta',
    explanation: 'Informasi ini adalah FAKTA. Disampaikan dalam forum resmi terbuka dengan dokumentasi yang konsisten di berbagai portal berita kredibel nasional.',
    verificationTip: 'Kroscek siaran pers dengan mencari video dokumentasi atau transkrip resmi dari kementerian terkait.'
  }
];
