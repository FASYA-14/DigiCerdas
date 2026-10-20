import { ModuleSection } from '../types';

export const modulesData: ModuleSection[] = [
  {
    id: 'materi-1',
    code: 'Materi A',
    title: 'Pemahaman Dasar Literasi Digital',
    subtitle: 'Keterampilan Abad ke-21 untuk Murid & Warga Digital Bertanggung Jawab',
    readTime: '6 menit baca',
    iconName: 'Globe',
    summary: 'Literasi digital bukan sekadar kemampuan teknis menyalakan ponsel atau membuka aplikasi, melainkan kecakapan holistik dalam berpikir kritis, berkomunikasi santun, berkolaborasi positif, dan memecahkan masalah di dunia maya.',
    keyPoints: [
      'Empat Pilar Kecakapan Abad ke-21: Berpikir Kritis (Critical Thinking), Kreativitas (Creativity), Kolaborasi (Collaboration), dan Komunikasi (Communication).',
      'Jejak Digital Permanen: Setiap foto, komentar, riwayat pencarian, dan tautan yang diunggah membentuk reputasi digital jangka panjang yang sulit dihapus sepenuhnya.',
      'Keseimbangan Waktu Layar (Digital Well-being): Mengatur ritme penggunaan gawai agar tidak mengganggu kesehatan fisik, jam tidur, dan interaksi sosial nyata.',
      'Tanggung Jawab Kewargaan Digital: Menjadi agen kebaikan siber yang menghormati perbedaan pendapat dan menciptakan iklim internet yang suportif.'
    ],
    caseStudy: {
      title: 'Studi Kasus: Jejak Komentar Masa Lalu Dimas',
      description: 'Dimas (16 tahun) melamar beasiswa OSIS tingkat provinsi. Saat verifikasi latar belakang, panitia menemukan komentar sarkastis bernada perundungan yang ia tulis dua tahun lalu di media sosial terbuka.',
      lesson: 'Jejak digital bersifat arsip abadi. Berpikirlah sebelum memposting: Apakah kalimat ini bermanfaat, benar, dan tidak menyakiti orang lain jika dibaca kembali di masa depan?'
    },
    reflectiveQuestion: 'Jika seseorang mencari nama Anda di mesin pencari hari ini, jejak digital seperti apa yang akan pertama kali mereka temukan tentang kepribadian Anda?'
  },
  {
    id: 'materi-2',
    code: 'Materi B',
    title: 'Berpikir Kritis & Memeriksa Informasi',
    subtitle: 'Strategi Membedakan Fakta, Opini, dan Menghindari Jebakan Hoaks',
    readTime: '7 menit baca',
    iconName: 'ShieldAlert',
    summary: 'Di era banjir informasi dan algoritma media sosial, murid dilatih menjadi detektif informasi yang cermat dengan memeriksa kredibilitas sumber, bukti pendukung, konteks waktu, serta motif di balik sebuah konten.',
    keyPoints: [
      'Membedakan Fakta vs Opini: Fakta didukung data empiris dan dapat diverifikasi ulang; opini memuat sudut pandang pribadi, asumsi, kata sifat subjektif, atau dugaan.',
      'Teknik Rumus S-A-R-I: Stop (jangan langsung sebar), Amati (cek URL dan tanggal), Riset (cari di 2 sumber lain), Ikuti konfirmasi resmi.',
      'Waspadai "Clickbait" dan Judul Provokatif: Judul yang memancing kemarahan, ketakutan, atau rasa mendesak seringkali merupakan indikasi manipulasi klik atau hoaks.',
      'Triangulasi Informasi: Jangan pernah mempercayai kabar penting hanya dari satu kiriman pesan grup instan atau video potongan singkat tanpa verifikasi media arus utama.'
    ],
    caseStudy: {
      title: 'Studi Kasus: Kabar Bantuan Kuota 100GB Palsu',
      description: 'Pesan berantai di grup kelas mengklaim Kemdikbud membagikan kuota internet 100GB gratis jika murid membagikan tautan berakhiran ".xyz" ke 10 kontak. Banyak teman yang panik membagikannya karena takut ketinggalan.',
      lesson: 'Domain situs pemerintah Indonesia selalu menggunakan akhiran resmi ".go.id". Format pesan berantai yang memaksa penerima menyebarkan tautan adalah ciri khas phishing.'
    },
    reflectiveQuestion: 'Langkah apa yang biasa Anda lakukan saat pertama kali menerima kabar mengejutkan di grup obrolan sebelum memutuskan untuk percaya atau menyebarkannya?'
  },
  {
    id: 'materi-3',
    code: 'Materi C',
    title: 'Keamanan Data Pribadi & Etika Digital',
    subtitle: 'Melindungi Privasi Diri, Mencegah Phishing, dan Menghentikan Cyberbullying',
    readTime: '8 menit baca',
    iconName: 'Lock',
    summary: 'Ruang digital membutuhkan perisai keamanan yang kokoh dan kepekaan nurani etis. Lindungi informasi sensitif Anda seperti kata sandi dan lokasi, serta tegakkan budaya saling menghargai tanpa perundungan siber.',
    keyPoints: [
      'Data Pribadi Sensitif vs Data Umum: Jangan pernah membagikan NIK, tanggal lahir lengkap, nama ibu kandung, nomor kartu pelajar, atau kode OTP kepada siapa pun.',
      'Kombinasi Kata Sandi Kuat & 2FA: Gunakan frasa sandi unik minimal 12 karakter (kombinasi huruf besar/kecil, angka, simbol) dan aktifkan Autentikasi Dua Faktor (2FA).',
      'Netiket & Kesopanan Maya: Perlakukan orang di balik layar dengan empati yang sama seperti saat berhadapan langsung di dunia nyata. Terapkan prinsip anti-cyberbullying.',
      'Tindakan Sebagai Saksi (Upstander): Jika melihat teman dirundung secara daring di grup obrolan atau akun anonim, jangan ikut menertawakan atau membagikan ulang. Berikan dukungan moral dan laporkan ke guru BK.'
    ],
    caseStudy: {
      title: 'Studi Kasus: Akun Rahasia "Spill The Tea" Sekolah',
      description: 'Muncul akun anonim di Instagram yang mengunggah foto candid murid lain disertai rumor palsu. Beberapa murid menganggapnya sekadar lelucon, namun korban mengalami kecemasan berat dan takut masuk sekolah.',
      lesson: 'Perundungan daring dapat dikenai sanksi pelanggaran UU ITE dan aturan disiplin sekolah. Keheningan penonton memperkuat pelaku; melaporkan akun adalah tindakan kepedulian nyata.'
    },
    reflectiveQuestion: 'Pernahkah Anda membagikan informasi pribadi atau foto orang lain tanpa meminta izin terlebih dahulu? Mengapa izin privasi itu sangat penting?'
  },
  {
    id: 'materi-4',
    code: 'Materi D',
    title: 'Penggunaan Generative AI untuk Pembelajaran',
    subtitle: 'Memanfaatkan AI sebagai Mitra Diskusi Cerdas, Bukan Alat Salin-Tempel Curang',
    readTime: '7 menit baca',
    iconName: 'Sparkles',
    summary: 'Generative AI seperti Gemini adalah akselerator pembelajaran yang luar biasa jika digunakan dengan bijak. Pelajari cara merumuskan prompt berkualitas, memverifikasi halusinasi data, dan menjunjung tinggi kejujuran akademik.',
    keyPoints: [
      'Empat Pilar Prompt Efektif (4C): Persona/Peran yang jelas, Konteks kebutuhan tugas, Batasan keluaran (panjang & format), serta Perintah Verifikasi.',
      'Bahaya Halusinasi AI: AI menghasilkan teks berdasarkan pola bahasa, bukan kesadaran fakta mutlak. Selalu periksa kutipan, rumus, angka statistik, dan nama tokoh.',
      'Integritas Akademik & Anti-Plagiasi: Menggunakan AI untuk menjelaskan konsep sulit atau mencari sudut pandang baru itu sah; tetapi menyalin mentah-mentah esai AI sebagai tugas pribadi adalah plagiarisme.',
      'Privasi Prompt: Jangan pernah memasukkan nama lengkap teman, nomor telepon, data rahasia keluarga, atau dokumen sekolah sensitif ke dalam kolom prompt AI.'
    ],
    caseStudy: {
      title: 'Studi Kasus: Tugas Makalah Sejarah Rian',
      description: 'Rian meminta AI menuliskan esai tentang Perjanjian Linggarjati. AI menuliskan tokoh fiktif yang tidak pernah ada dalam arsip sejarah. Karena tidak memeriksa ulang, Rian ditegur oleh guru sejarahnya.',
      lesson: 'AI adalah pembantu riset awal, bukan penentu kebenaran mutlak. Tanggung jawab kebenaran karya ilmiah selalu berada di tangan penulis manusia.'
    },
    reflectiveQuestion: 'Bagaimana cara Anda memastikan bahwa tugas sekolah yang Anda kerjakan dengan bantuan AI tetap mencerminkan pemikiran dan pemahaman Anda sendiri?'
  },
  {
    id: 'materi-5',
    code: 'Materi E',
    title: 'Penguatan Kompetensi Guru sebagai Pembimbing',
    subtitle: 'Mendampingi Murid Menghadapi Dilema Digital dengan Pendekatan Bimbingan & Konseling',
    readTime: '7 menit baca',
    iconName: 'Compass',
    summary: 'Guru bukan sekadar penyampai materi kurikulum, melainkan mentor navigasi moral dan emosional murid di dunia digital. Guru perlu menguasai 5 kompetensi pembimbing abad-21 dan membangun iklim kelas yang aman.',
    keyPoints: [
      '5 Kompetensi Guru Pembimbing: Kompetensi Digital (paham alat & AI), Pedagogis (metode interaktif), Bimbingan (BK & empati), Etika (teladan privasi), dan Evaluasi (refleksi holistik).',
      'Mendengar Tanpa Menghakimi: Ketika murid menceritakan kesalahan perilaku digitalnya (misal: terjebak penipuan akun), guru harus mendengarkan dengan empati agar murid tidak takut bersuara.',
      'Penggunaan Studi Kasus & Pertanyaan Reflektif: Libatkan murid dalam simulasi dilema nyata agar mereka melatih otot pertimbangan etis sebelum bertindak di dunia nyata.',
      'Prosedur Kolaborasi BK & Sekolah: Mengetahui kapan suatu kasus perlu didampingi wali kelas, guru BK, orang tua, atau ditindaklanjuti sesuai regulasi perlindungan anak.'
    ],
    caseStudy: {
      title: 'Studi Kasus: Ibu Sarah Membimbing Kelas Menghadapi Deepfake',
      description: 'Beredar foto rekayasa wajah salah satu siswi di media sosial sekolah. Guru BK Ibu Sarah segera mengajak kelas berdialog tenang mengenai dampak hukum dan psikologis manipulasi gambar tanpa mempermalukan siswi tersebut.',
      lesson: 'Respons guru yang cepat, edukatif, dan menjaga privasi korban mampu menghentikan kepanikan kelas dan mengubah insiden menjadi momentum penguatan empati digital bersama.'
    },
    reflectiveQuestion: 'Sebagai pendidik atau fasilitator, bagaimana Anda menciptakan suasana di mana murid merasa nyaman meminta bantuan saat menghadapi masalah siber?'
  }
];
