import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    moduleRef: 'Materi A: Pemahaman Dasar Literasi Digital',
    question: 'Manakah dari pernyataan berikut yang paling tepat mendefinisikan esensi literasi digital abad ke-21?',
    options: [
      'Kemampuan teknis untuk membeli perangkat gawai terbaru dan mengunduh banyak aplikasi permainan.',
      'Kecakapan menyeluruh dalam mencari, mengevaluasi informasi secara kritis, berkomunikasi etis, dan menjaga keamanan diri di ruang siber.',
      'Kecepatan mengetik di papan ketik komputer dan jumlah pengikut terbanyak di media sosial.',
      'Kemampuan menghafal seluruh istilah teknis pemrogaman dan komponen komputer.'
    ],
    correctIndex: 1,
    explanation: 'Literasi digital abad-21 adalah kecakapan kognitif, etis, dan sosial untuk memanfaatkan teknologi secara kritis, aman, dan bertanggung jawab bagi pembelajaran dan kehidupan bermasyarakat.'
  },
  {
    id: 2,
    moduleRef: 'Materi A: Pemahaman Dasar Literasi Digital',
    question: 'Mengapa jejak digital (digital footprint) sering diibaratkan sebagai "tato permanen"?',
    options: [
      'Karena dapat diganti gambarnya setiap saat tanpa bekas.',
      'Karena data digital yang diunggah dapat disimpan, disalin, atau diarsipkan orang lain meskipun postingan aslinya telah dihapus.',
      'Karena hanya dapat dilihat oleh pemilik akun dan penyedia layanan internet.',
      'Karena jejak digital akan otomatis hilang setelah 24 jam seperti fitur Story.'
    ],
    correctIndex: 1,
    explanation: 'Setiap unggahan, komentar, dan foto berpotensi diarsip oleh pihak ketiga atau tangkapan layar, sehingga dapat memengaruhi reputasi pribadi dan masa depan akademis/karier.'
  },
  {
    id: 3,
    moduleRef: 'Materi B: Berpikir Kritis & Memeriksa Informasi',
    question: 'Manakah di bawah ini yang merupakan ciri dari sebuah FAKTA, bukan opini?',
    options: [
      'Kemendikbudristek adalah kementerian terbaik yang pernah ada di Indonesia.',
      'Berdasarkan rilis resmi BPS tahun 2025, angka penetrasi internet di Indonesia mencapai 79,5%.',
      'Penggunaan ponsel pintar pasti merusak moral seluruh anak muda zaman sekarang.',
      'Belajar secara daring rasanya jauh lebih menyenangkan daripada tatap muka di kelas.'
    ],
    correctIndex: 1,
    explanation: 'Pernyataan BPS adalah fakta teruji karena dapat dibuktikan kebenarannya secara empiris melalui dokumen rilis resmi dan angka statistik yang terukur.'
  },
  {
    id: 4,
    moduleRef: 'Materi B: Berpikir Kritis & Memeriksa Informasi',
    question: 'Dalam rumus cek fakta S-A-R-I, apa tindakan yang harus Anda lakukan pada huruf "S" (Stop)?',
    options: [
      'Mematikan ponsel dan tidak pernah lagi menggunakan internet.',
      'Menahan diri sejenak untuk tidak langsung mempercayai, membagikan, atau bereaksi emosional terhadap kabar yang mengejutkan.',
      'Menghapus semua akun media sosial yang dimiliki.',
      'Mengirimkan pesan tersebut ke minimal 10 grup WhatsApp untuk meminta pendapat orang lain.'
    ],
    correctIndex: 1,
    explanation: 'Langkah pertama dalam menghadapi informasi viral adalah STOP (berhenti sejenak), agar kita tidak menjadi penyebar hoaks yang dikendalikan oleh emosi sesaat.'
  },
  {
    id: 5,
    moduleRef: 'Materi C: Keamanan & Etika Digital',
    question: 'Manakah contoh kombinasi kata sandi (password) yang paling kuat dan aman dari peretasan?',
    options: [
      '1234567890',
      'namaSayaBudi2026',
      'Kopi#Hangat!Pagi2026',
      'password_baru'
    ],
    correctIndex: 2,
    explanation: '"Kopi#Hangat!Pagi2026" adalah frasa sandi (passphrase) yang panjang (>15 karakter), menggabungkan huruf besar, huruf kecil, simbol khusus (#, !), dan angka acak yang sulit ditebak.'
  },
  {
    id: 6,
    moduleRef: 'Materi C: Keamanan & Etika Digital',
    question: 'Jika Anda melihat teman sekelas diejek dan dipermalukan di grup obrolan kelas, tindakan terbaik sebagai seorang "Upstander" adalah:',
    options: [
      'Ikut mengirim stiker tertawa agar tidak dianggap aneh oleh teman-teman lain.',
      'Menyimpan tangkapan layar, memberi dukungan moral kepada korban, dan melapor kepada wali kelas atau guru BK.',
      'Menantang pelaku dengan kata-kata kotor di dalam grup sehingga terjadi pertengkaran hebat.',
      'Keluar dari grup dan memblokir nomor semua teman kelas.'
    ],
    correctIndex: 1,
    explanation: 'Upstander bertindak bijak dengan mengamankan bukti, membela korban secara empatik, dan melibatkan orang dewasa tepercaya (guru BK) untuk intervensi yang adil.'
  },
  {
    id: 7,
    moduleRef: 'Materi D: Penggunaan Generative AI',
    question: 'Apa yang dimaksud dengan "Halusinasi AI" (AI Hallucination)?',
    options: [
      'Ketika komputer mengalami mati lampu secara tiba-tiba.',
      'Kondisi saat model AI menghasilkan informasi yang terdengar sangat meyakinkan dan fasih, namun faktanya salah atau tokohnya fiktif.',
      'Kemampuan AI untuk membaca pikiran manusia tanpa perintah teks.',
      'Gangguan virus komputer yang membuat layar berkedip-kedip.'
    ],
    correctIndex: 1,
    explanation: 'Model AI merangkai kata berdasarkan probabilitas statistik bahasa, bukan pemahaman kenyataan. AI bisa "mengarang" data atau referensi palsu, sehingga murid wajib memverifikasi hasilnya.'
  },
  {
    id: 8,
    moduleRef: 'Materi D: Penggunaan Generative AI',
    question: 'Manakah cara penggunaan Generative AI yang MENJUNJUNG TINGGI integritas akademik?',
    options: [
      'Menyalin mentah-mentah jawaban AI lalu mengumpulkannya seolah-olah karya pribadi.',
      'Menggunakan AI untuk mencari contoh analogi sederhana materi fisika yang sulit dipahami, lalu merangkumnya kembali dengan kata-kata sendiri.',
      'Meminta AI mengerjakan seluruh soal kuis online ujian nasional.',
      'Memalsukan kutipan buku dengan menyuruh AI membuat nama penulis fiktif.'
    ],
    correctIndex: 1,
    explanation: 'Generative AI adalah mitra belajar untuk memahami konsep dan memperluas wawasan, sedangkan analisis dan hasil akhir tugas harus tetap merupakan pemikiran otentik murid.'
  },
  {
    id: 9,
    moduleRef: 'Materi E: Kompetensi Guru sebagai Pembimbing',
    question: 'Ketika seorang murid melapor bahwa ia menjadi korban penipuan daring, sikap pertama yang harus ditunjukkan guru pembimbing adalah:',
    options: [
      'Memarahi murid di depan kelas karena kurang hati-hati saat bermain gawai.',
      'Menyita gawai murid selama satu semester penuh sebagai hukuman.',
      'Mendengarkan dengan empati tanpa menghakimi, menenangkan murid, dan membantu mengamankan akun/data pribadi.',
      'Meminta murid menyelesaikan masalahnya sendiri tanpa melibatkan sekolah.'
    ],
    correctIndex: 2,
    explanation: 'Kompetensi bimbingan menuntut respon empatik agar murid merasa aman, terlindungi, dan tidak takut mencari pertolongan ketika menghadapi bahaya siber.'
  },
  {
    id: 10,
    moduleRef: 'Materi E: Kompetensi Guru sebagai Pembimbing',
    question: 'Dalam menyusun materi literasi digital menggunakan Generative AI (seperti Google AI Studio), peran utama guru manusia adalah:',
    options: [
      'Menerima apa pun hasil buatan AI 100% tanpa perlu membaca atau memeriksanya kembali.',
      'Melakukan kurasi pedagogis, memvalidasi kebenaran materi, dan menyesuaikan konteks dengan kebutuhan karakteristik murid.',
      'Menghindari penggunaan teknologi sama sekali karena AI dianggap berbahaya.',
      'Menggantikan seluruh pertemuan kelas dengan rekaman suara AI otomatis.'
    ],
    correctIndex: 1,
    explanation: 'AI berfungsi sebagai akselerator efisiensi, sedangkan penentuan tujuan pembelajaran, validasi kebenaran materi, dan sentuhan pedagogis tetap mutlak berada pada guru.'
  }
];
