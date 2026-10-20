export interface WorkshopStage {
  id: string;
  order: number;
  durationMinutes: number;
  name: string;
  phase: string;
  objective: string;
  teacherActions: string[];
  studentActivities: string[];
  facilitationTips: string;
  materialsNeeded: string;
}

export interface TeacherCompetency {
  id: string;
  title: string;
  category: string;
  description: string;
  indicators: string[];
  practicalApplication: string;
}

export interface TriageCase {
  id: string;
  issue: string;
  severity: 'Rendah' | 'Sedang' | 'Tinggi';
  symptoms: string[];
  initialCounselingAction: string;
  questionsToAskStudent: string[];
  escalationProcedure: string;
}

export const workshopStages: WorkshopStage[] = [
  {
    id: 'stage-1',
    order: 1,
    durationMinutes: 10,
    name: 'Pembukaan & Ice Breaking',
    phase: 'Apersepsi & Kesadaran Awal',
    objective: 'Membangun suasana kelas yang aman, memperkenalkan tujuan DigiCerdas, dan memetakan kebiasaan digital murid.',
    teacherActions: [
      'Menyampaikan salam dan memaparkan tujuan pelatihan literasi digital abad ke-21.',
      'Mengajukan pertanyaan pemantik: "Berapa jam Anda menatap layar kemarin dan apa aplikasi yang paling sering Anda buka?"',
      'Menegaskan aturan kelas: ruang ini aman, tidak ada penghakiman atas kesalahan digital masa lalu.'
    ],
    studentActivities: [
      'Menjawab survei singkat kebiasaan digital dengan mengangkat tangan atau polling cepat.',
      'Mendengarkan gambaran 5 materi yang akan dipelajari.'
    ],
    facilitationTips: 'Gunakan nada bicara hangat dan inklusif. Jangan menyalahkan murid yang mengaku menggunakan gawai lebih dari 6 jam.',
    materialsNeeded: 'Proyektor/Layar DigiCerdas, Lembar Survei Awal'
  },
  {
    id: 'stage-2',
    order: 2,
    durationMinutes: 20,
    name: 'Penyampaian Materi Interaktif',
    phase: 'Penguatan Konsep',
    objective: 'Murid memahami 4 pilar kecakapan digital, prinsip keamanan data pribadi, rumus verifikasi S-A-R-I, dan etika AI.',
    teacherActions: [
      'Memandu eksplorasi 5 Modul DigiCerdas melalui proyektor.',
      'Menjelaskan perbedaan mendasar antara data pribadi sensitif vs umum.',
      'Memberikan contoh bagaimana algoritma medsos memperkuat bias informasi.'
    ],
    studentActivities: [
      'Menyimak materi, mencatat konsep kunci, dan menanyakan istilah yang belum dipahami.'
    ],
    facilitationTips: 'Hindari ceramah satu arah. Setiap 5 menit, ajukan 1 pertanyaan cek pemahaman singkat kepada murid acak.',
    materialsNeeded: 'Tab "Pusat Materi" pada aplikasi DigiCerdas'
  },
  {
    id: 'stage-3',
    order: 3,
    durationMinutes: 20,
    name: 'Latihan Studi Kasus & Cek Fakta',
    phase: 'Aplikasi Kritis',
    objective: 'Murid mampu membedakan fakta vs opini vs hoaks dan menentukan respons tepat terhadap risiko siber.',
    teacherActions: [
      'Membagi murid ke dalam kelompok kecil (3-4 orang).',
      'Mengarahkan kelompok membuka modul "Tantangan Cek Fakta" dan "Simulasi Keamanan".',
      'Berkeliling kelas mengamati jalannya diskusi dan memicu penalaran kritis.'
    ],
    studentActivities: [
      'Menganalisis contoh postingan hoaks WhatsApp dan akun gosip anonim.',
      'Memilih opsi terbaik dan membandingkan konsekuensi keputusan bersama kelompok.'
    ],
    facilitationTips: 'Minta perwakilan kelompok menjelaskan alasan logis di balik pilihan mereka, bukan hanya hasil tebakannya.',
    materialsNeeded: 'Tab "Tantangan Cek Fakta" & "Simulasi Keamanan"'
  },
  {
    id: 'stage-4',
    order: 4,
    durationMinutes: 20,
    name: 'Praktik Laboratorium Generative AI',
    phase: 'Eksplorasi & Verifikasi AI',
    objective: 'Murid terampil menyusun prompt berkualitas (4C) dan membiasakan diri memverifikasi kebenaran jawaban AI.',
    teacherActions: [
      'Mendemonstrasikan cara membuat prompt yang spesifik vs prompt yang ambigu.',
      'Menugaskan murid mencoba memasukkan prompt tugas sekolah di "Laboratorium Prompt AI".',
      'Menyoroti bagian halusinasi atau informasi umum yang dihasilkan model.'
    ],
    studentActivities: [
      'Mengetik prompt di Laboratorium AI dan mengamati evaluasi skor 4 pilar.',
      'Menjawab tantangan verifikasi kritis: "Fakta apa yang harus saya cek ulang dari jawaban AI ini?"'
    ],
    facilitationTips: 'Tekankan bahwa AI adalah alat pemantik ide, bukan pengganti otak atau pembantu curang.',
    materialsNeeded: 'Tab "Laboratorium Prompt AI" dengan live AI assist'
  },
  {
    id: 'stage-5',
    order: 5,
    durationMinutes: 15,
    name: 'Refleksi Diri & Evaluasi',
    phase: 'Asesmen & Internalisasi',
    objective: 'Mengukur peningkatan literasi murid serta merumuskan komitmen kebiasaan digital yang terukur.',
    teacherActions: [
      'Meminta murid mengerjakan kuis evaluasi 10 soal secara mandiri.',
      'Membimbing pengisian lembar "Komitmen & Refleksi Digital".'
    ],
    studentActivities: [
      'Mengerjakan kuis evaluasi dan melihat pembahasan jawaban.',
      'Menuliskan 1 kebiasaan digital yang ingin diubah (misal: tidak membuka HP sebelum tidur).',
      'Mengunduh atau mencetak Sertifikat Kompetensi Literasi Digital.'
    ],
    facilitationTips: 'Fokus pada kejujuran refleksi murid ketimbang kesempurnaan skor nilai.',
    materialsNeeded: 'Tab "Kuis & Evaluasi" serta "Refleksi Digital"'
  },
  {
    id: 'stage-6',
    order: 6,
    durationMinutes: 5,
    name: 'Penutup & Rencana Tindak Lanjut',
    phase: 'Konsolidasi',
    objective: 'Menyimpulkan makna menjadi warga digital cerdas dan membuka akses pendampingan berkelanjutan.',
    teacherActions: [
      'Menyampaikan pesan penutup: "Teknologi membuat kita cepat, literasi membuat kita bijak."',
      'Mengingatkan bahwa ruang BK selalu terbuka untuk konsultasi masalah siber tanpa penghakiman.',
      'Memberikan apresiasi kepada seluruh murid atas partisipasi aktif.'
    ],
    studentActivities: [
      'Menyimak rangkuman dan menyimpan kartu komitmen digital.'
    ],
    facilitationTips: 'Tutup dengan optimisme dan energi positif.',
    materialsNeeded: 'Lembar Sertifikat dan Kartu Ikrar Digital'
  }
];

export const teacherCompetencies: TeacherCompetency[] = [
  {
    id: 'comp-1',
    title: '1. Kompetensi Digital',
    category: 'Teknologi & AI',
    description: 'Guru mampu mengoperasikan media edukasi digital, mencari sumber primer tepercaya, serta memanfaatkan Generative AI sebagai alat bantu perancangan materi ajar.',
    indicators: [
      'Mampu mengarahkan murid menggunakan mesin pencari dan filter pencarian secara efektif',
      'Memahami cara kerja dasar model bahasa besar (LLM) dan keterbatasannya',
      'Mampu merancang prompt instruksional yang menghasilkan lembar kerja siswa'
    ],
    practicalApplication: 'Menggunakan Gemini untuk membuat variasi soal latihan studi kasus kontekstual sekolah.'
  },
  {
    id: 'comp-2',
    title: '2. Kompetensi Pedagogis',
    category: 'Metode Pembelajaran',
    description: 'Guru mampu merancang kegiatan literasi yang partisipatif, mengintegrasikan teknologi sebagai sarana berpikir tingkat tinggi (HOTS), bukan sekadar proyektor slide statis.',
    indicators: [
      'Menyesuaikan kompleksitas kasus dengan jenjang kognitif murid (SMP vs SMA)',
      'Memfasilitasi diskusi berbasis pemecahan masalah (Problem-Based Learning)',
      'Mendorong murid saling mengevaluasi sumber rujukan teman secara kritis'
    ],
    practicalApplication: 'Mengadakan debat mini di kelas tentang batas etis penggunaan AI dalam tugas seni visual.'
  },
  {
    id: 'comp-3',
    title: '3. Kompetensi Bimbingan & Konseling (BK)',
    category: 'Psikososial & Empati',
    description: 'Guru mampu mendengarkan keluhan murid terkait dilema maya secara empatik tanpa mencela, serta membimbing murid menimbang konsekuensi perilaku siber.',
    indicators: [
      'Menghindari reaksi panik atau menyalahkan ketika murid melapor insiden siber',
      'Mengajukan pertanyaan reflektif yang merangsang kesadaran nurani murid',
      'Mengenali tanda-tanda kecemasan atau isolasi sosial akibat perundungan daring'
    ],
    practicalApplication: 'Mendampingi murid yang akun media sosialnya dibajak dengan panduan pemulihan dan dukungan moril.'
  },
  {
    id: 'comp-4',
    title: '4. Kompetensi Etika & Tanggung Jawab',
    category: 'Integritas & Teladan',
    description: 'Guru menjadi teladan dalam menjaga kerahasiaan data murid, menghormati hak cipta materi ajar, dan memverifikasi kebenaran informasi sebelum membagikannya.',
    indicators: [
      'Tidak mengunggah data nilai atau foto wajah murid tanpa izin wali murid',
      'Selalu mencantumkan sumber rujukan materi yang diambil dari internet',
      'Menghargai keberagaman pandangan murid di ruang digital kelas'
    ],
    practicalApplication: 'Menolak membagikan kabar viral di grup guru sebelum memeriksa verifikasi dari Kemdikbud.'
  },
  {
    id: 'comp-5',
    title: '5. Kompetensi Evaluasi Holistik',
    category: 'Asesmen & Refleksi',
    description: 'Guru mampu mengevaluasi perkembangan literasi digital murid secara menyeluruh, tidak hanya dari skor kuis pilihan ganda tetapi dari kematangan penalaran etisnya.',
    indicators: [
      'Menilai kemampuan murid menjelaskan alasan di balik keputusan digitalnya',
      'Memantau perubahan kebiasaan penggunaan gawai murid secara berkala',
      'Menggunakan hasil asesmen untuk merancang sesi bimbingan tematik lanjutan'
    ],
    practicalApplication: 'Meninjau kartu komitmen digital murid sebulan setelah pelatihan untuk melihat penerapannya.'
  }
];

export const studentTriageCases: TriageCase[] = [
  {
    id: 'triage-1',
    issue: 'Perundungan Siber (Cyberbullying) di Media Sosial',
    severity: 'Tinggi',
    symptoms: [
      'Murid mendadak menarik diri dari pergaulan kelas',
      'Prestasi belajar menurun drastis dan sering izin sakit',
      'Tampak gelisah atau gemetar saat memeriksa ponsel di jam istirahat'
    ],
    initialCounselingAction: 'Ajak murid berbicara di ruang BK yang tenang dan privat. Pastikan murid merasa aman dan yakinkan bahwa kejadian ini bukan salahnya. Amankan bukti tangkapan layar.',
    questionsToAskStudent: [
      'Bapak/Ibu ada di sini untuk membantumu. Mau menceritakan apa yang membuatmu merasa tidak nyaman belakangan ini?',
      'Sejak kapan pesan atau komentar tersebut mulai muncul?',
      'Siapa saja teman dekat yang sudah kamu ceritakan hal ini?'
    ],
    escalationProcedure: 'Jika ada ancaman kekerasan fisik atau pemerasan, segera koordinasikan dengan Kepala Sekolah dan undang orang tua kedua belah pihak untuk mediasi restorative sesuai prosedur perlindungan anak.'
  },
  {
    id: 'triage-2',
    issue: 'Kecanduan Layar & Media Sosial (Screen Addiction)',
    severity: 'Sedang',
    symptoms: [
      'Sering tertidur di kelas karena begadang bermain game/medsos',
      'Mengeluh sakit mata atau sakit kepala terus menerus',
      'Cemas berlebihan (FOMO) jika ponsel tidak berada di dekatnya'
    ],
    initialCounselingAction: 'Buat grafik pelacak waktu layar (screen time audit) bersama murid secara kolaboratif. Hindari menyita ponsel secara paksa karena dapat memicu resistensi.',
    questionsToAskStudent: [
      'Ketika bermain ponsel sampai larut malam, apa yang sebenarnya paling kamu cari atau rasakan?',
      'Bagaimana perasaan tubuhmu di pagi hari setelah begadang menatap layar?',
      'Aktivitas offline apa di luar gawai yang dulu pernah kamu sukai?'
    ],
    escalationProcedure: 'Ajak orang tua berdiskusi tentang zona bebas gawai di rumah (misal: tidak ada ponsel di kamar tidur setelah jam 21.00).'
  },
  {
    id: 'triage-3',
    issue: 'Ketergantungan AI Berlebihan & Pelanggaran Integritas Akademik',
    severity: 'Rendah',
    symptoms: [
      'Tugas esai menggunakan istilah akademis yang tidak sesuai usia',
      'Murid tidak dapat menjelaskan kembali isi tugas yang ia kumpulkan',
      'Terdapat kutipan tokoh fiktif akibat halusinasi model AI'
    ],
    initialCounselingAction: 'Hindari langsung memberi nilai nol di depan kelas. Panggil murid secara individual untuk berdialog tentang makna belajar sesungguhnya.',
    questionsToAskStudent: [
      'Bisakah kamu menceritakan prosesmu mengerjakan tugas ini?',
      'Bagian mana dari tugas ini yang merupakan ide murnimu dan bagian mana yang dibantu AI?',
      'Bagaimana menurutmu cara terbaik menggunakan AI agar otakmu tetap bertambah pintar?'
    ],
    escalationProcedure: 'Berikan kesempatan murid menulis ulang esai dengan tulisan tangan langsung di perpustakaan atau ruang kelas dengan bimbingan.'
  }
];
