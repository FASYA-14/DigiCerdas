import { SecurityScenario } from '../types';

export const securityScenarios: SecurityScenario[] = [
  {
    id: 'sec-1',
    title: 'Undian Ponsel Gratis di Grup WhatsApp Kelas',
    category: 'Keamanan Data',
    context: 'Suatu malam di grup WhatsApp kelas, sebuah nomor tak dikenal mengirimkan tautan dengan klaim "Selamat! Kamu terpilih mendapatkan smartphone gratis dari sponsor sekolah. Isi formulir nama lengkap, NIK, tanggal lahir, dan alamat rumah sekarang!"',
    situation: 'Beberapa teman sekelas mulai tertarik dan berniat mengisi formulir tersebut karena mengira disponsori oleh pihak sekolah.',
    options: [
      {
        text: 'Ikut mengisi formulir secara lengkap agar tidak ketinggalan kesempatan mendapatkan ponsel gratis.',
        isBest: false,
        scoreDelta: -25,
        consequence: 'Data pribadi sensitif Anda (NIK, tanggal lahir, alamat) jatuh ke tangan sindikat penipuan atau pinjaman daring ilegal.',
        counselorFeedback: 'Jangan pernah menyerahkan NIK dan alamat rumah di formulir tidak resmi. Ini adalah teknik rekayasa sosial (phishing) berbahaya.'
      },
      {
        text: 'Mengabaikan pesan tanpa memberitahu siapa pun di grup kelas.',
        isBest: false,
        scoreDelta: 0,
        consequence: 'Diri Anda aman, namun teman-teman sekelas lainnya yang belum paham literasi digital berisiko menjadi korban penipuan.',
        counselorFeedback: 'Menjaga diri sendiri sudah baik, namun warga digital bertanggung jawab juga peduli terhadap keamanan komunitasnya.'
      },
      {
        text: 'Mengingatkan teman di grup bahwa tautan tersebut mencurigakan, jangan ada yang mengisi, dan segera laporkan ke wali kelas/admin grup.',
        isBest: true,
        scoreDelta: 30,
        consequence: 'Teman-teman teredukasi, admin mengeluarkan nomor asing tersebut, dan tidak ada murid yang menjadi korban kebocoran data.',
        counselorFeedback: 'Tindakan teladan! Anda menunjukkan kepemimpinan digital dan kepedulian sosial yang melindungi lingkungan sekolah.'
      }
    ]
  },
  {
    id: 'sec-2',
    title: 'Akun Gosip Anonim yang Mengolok Teman Sekelas',
    category: 'Etika & Cyberbullying',
    context: 'Muncul akun Instagram anonim "@spill_rahasia_sekolah" yang mengunggah foto teman sekelasmu saat tersandung di kantin dengan keterangan mengejek yang mengundang tawa banyak murid.',
    situation: 'Temanmu tersebut terlihat sangat sedih, mengurung diri di kelas, dan mulai enggan masuk sekolah karena malu.',
    options: [
      {
        text: 'Ikut meninggalkan komentar lucu dan meneruskan postingan tersebut ke grup obrolan lain demi bercandaan.',
        isBest: false,
        scoreDelta: -30,
        consequence: 'Anda menjadi bagian dari pelaku perundungan siber (cyberbullying), memperparah trauma psikologis teman, dan dapat dilaporkan ke tim disiplin sekolah.',
        counselorFeedback: 'Perundungan daring bukan lelucon. Jejak digital komentar Anda tercatat dan dapat melukai masa depan serta kondisi mental korban.'
      },
      {
        text: 'Mendatangi temanmu secara pribadi untuk memberi dukungan moral, mengajak teman lain untuk me-report akun tersebut, dan membantunya melapor ke guru BK.',
        isBest: true,
        scoreDelta: 35,
        consequence: 'Korban merasa dihargai dan tidak sendirian. Guru BK mengambil langkah perlindungan konseling dan menelusuri pemilik akun anonim.',
        counselorFeedback: 'Inilah sikap seorang "Upstander" (pembela kebaikan). Empati dan keberanian Anda menjadi penyelamat kesehatan mental sesama murid.'
      },
      {
        text: 'Membalas akun anonim tersebut dengan kata-kata kasar dan ancaman balik yang menyerang.',
        isBest: false,
        scoreDelta: -10,
        consequence: 'Situasi semakin panas dan ricuh di media sosial, memicu pertengkaran antarkelas tanpa menyelesaikan akar masalah.',
        counselorFeedback: 'Niat membela teman itu baik, namun membalas toksisitas dengan toksisitas hanya akan memperluas konflik. Salurkan melalui jalur bimbingan resmi.'
      }
    ]
  },
  {
    id: 'sec-3',
    title: 'Izin Akses Berlebihan pada Aplikasi Edit Foto Viral',
    category: 'Privasi Aplikasi',
    context: 'Sebuah aplikasi filter wajah avatar kartun sedang viral di TikTok. Saat diinstal di ponsel, aplikasi meminta izin akses: Kontak Telepon, Lokasi GPS Real-time, Riwayat Panggilan, dan Akses File Penyimpanan Penuh.',
    situation: 'Untuk sekadar mengubah foto menjadi kartun, perlukah memberikan semua izin akses tersebut?',
    options: [
      {
        text: 'Langsung klik "Izinkan Semua" (Allow All) tanpa membaca, yang penting bisa mencoba filter viral secepatnya.',
        isBest: false,
        scoreDelta: -20,
        consequence: 'Pengembang aplikasi yang tidak jelas dapat menyalin seluruh kontak telepon dan memantau koordinat keberadaan Anda 24 jam.',
        counselorFeedback: 'Aplikasi manipulasi foto HANYA membutuhkan akses galeri/kamera foto terpilih, sama sekali TIDAK butuh izin kontak dan GPS. Waspadai aplikasi penyedot data.'
      },
      {
        text: 'Hanya izinkan akses foto yang dipilih (Select Photos), tolak izin kontak dan lokasi, atau cari aplikasi resmi yang terbukti reputasinya di Google Play / App Store.',
        isBest: true,
        scoreDelta: 25,
        consequence: 'Anda tetap dapat menikmati filter foto dengan aman tanpa mempertaruhkan privasi pribadi dan keluarga.',
        counselorFeedback: 'Langkah bijak! Selalu terapkan prinsip kehati-hatian perizinan (least privilege principle) pada gawai Anda.'
      }
    ]
  },
  {
    id: 'sec-4',
    title: 'Godaan Menggunakan Generative AI untuk Ujian & Esai UTS',
    category: 'Integritas AI',
    context: 'Anda memiliki tugas membuat esai refleksi pribadi tentang pengalaman toleransi beragama di lingkungan sekitar. Karena batas waktu tinggal 1 jam, Anda berpikir untuk meminta AI membuatkan esai utuh dari awal sampai akhir.',
    situation: 'AI memberikan esai yang rapi dan terstruktur, namun berisi cerita fiktif di kota lain yang bukan pengalaman hidup Anda.',
    options: [
      {
        text: 'Langsung salin (copy-paste) seluruh tulisan AI dan kumpulkan dengan nama Anda tanpa membaca ulang.',
        isBest: false,
        scoreDelta: -25,
        consequence: 'Tindakan ini adalah plagiarisme dan manipulasi tugas. Guru akan mudah mengenali gaya bahasa AI dan inkonsistensi pengalaman pribadi Anda.',
        counselorFeedback: 'AI tidak memiliki pengalaman hidup nyata Anda. Tugas refleksi bertujuan melatih kejujuran dan rasa empati diri Anda, bukan sekadar nilai angka.'
      },
      {
        text: 'Gunakan AI sebagai mitra pemantik ide: minta AI membuat kerangka poin-poin penulisan, lalu tuliskan esai menggunakan pengalaman nyata dan gaya bahasa Anda sendiri.',
        isBest: true,
        scoreDelta: 30,
        consequence: 'Esai selesai tepat waktu, alur pikir rapi, tulisan autentik dan mencerminkan pemikiran Anda, serta integritas akademik Anda terjaga.',
        counselorFeedback: 'Inilah esensi Generative AI untuk pembelajaran abad-21: AI sebagai asisten penggali sudut pandang, sementara penulis dan pemikir utamanya tetap Anda!'
      }
    ]
  }
];
