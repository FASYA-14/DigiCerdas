import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini SDK with telemetry header
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API 1: Laboratorium Prompt AI
  app.post('/api/gemini/prompt-lab', async (req, res) => {
    try {
      const { prompt, topic = 'Umum' } = req.body;

      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({ error: 'Prompt tidak boleh kosong.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        // Fallback pedagogical analysis if API key is not configured in environment
        return res.json({
          score: Math.min(85, Math.max(50, prompt.length > 50 ? 80 : 60)),
          pillarScores: {
            clarity: prompt.length > 30 ? 80 : 55,
            context: /murid|sekolah|kelas|pelajaran|tugas/i.test(prompt) ? 85 : 60,
            constraints: /panjang|format|daftar|poin|singkat/i.test(prompt) ? 90 : 50,
            ethics: /pribadi|rahasia|password/i.test(prompt) ? 60 : 85,
          },
          strengths: ['Topik pembelajaran teridentifikasi', 'Bahasa mudah dipahami'],
          suggestions: [
            'Berikan batasan format jawaban (misal: buat dalam 3 poin)',
            'Tentukan target audiens atau tingkat kelas agar penjelasan relevan'
          ],
          improvedPrompt: `${prompt.trim()}. Tolong jelaskan secara bertahap dalam 3 poin ringkas untuk murid sekolah menengah, sertakan contoh kehidupan sehari-hari.`,
          aiResponse: `Berikut adalah tanggapan edukatif untuk topik "${prompt}":\n\n1. Konsep Utama: Memahami dasar materi secara konseptual sangat penting sebelum melangkah ke analisis mendalam.\n2. Penerapan Nyata: Dalam kehidupan sehari-hari, konsep ini sering dijumpai saat berinteraksi di ruang digital.\n3. Pertimbangan Kritis: Selalu cocokkan rangkuman ini dengan buku teks atau sumber tepercaya guru Anda.`,
          verificationChallenge: 'Cobalah periksa: Apakah penjelasan ini menyebutkan sumber data atau tanggal riset yang sahih? Mengapa kita tidak boleh menelan mentah-mentah jawaban AI?'
        });
      }

      const systemInstruction = `Anda adalah Asisten Pembimbing Literasi Digital DigiCerdas untuk murid sekolah menengah (SMP/SMA) di Indonesia.
Tugas Anda adalah mengevaluasi prompt AI yang dibuat murid, memberikan nilai edukatif, saran perbaikan, versi prompt yang lebih efektif, serta menghasilkan jawaban contoh disertai pertanyaan verifikasi kritis.

Kembalikan jawaban HANYA dalam format JSON valid dengan struktur:
{
  "score": number (0-100),
  "pillarScores": {
    "clarity": number (0-100, kejelasan instruksi),
    "context": number (0-100, konteks dan latar belakang tugas),
    "constraints": number (0-100, batasan panjang, nada bicara, atau format),
    "ethics": number (0-100, kesadaran menjaga privasi dan tidak curang)
  },
  "strengths": ["kelebihan 1", "kelebihan 2"],
  "suggestions": ["saran konstruktif 1", "saran konstruktif 2"],
  "improvedPrompt": "kalimat prompt yang disempurnakan",
  "aiResponse": "tanggapan AI terhadap improvedPrompt dalam Bahasa Indonesia yang ramah murid",
  "verificationChallenge": "1 pertanyaan kritis yang mengarahkan murid untuk memverifikasi kebenaran atau fakta dalam aiResponse"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Evaluasi prompt murid ini untuk topik "${topic}":\n"${prompt}"`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text || '{}';
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (parseError) {
        return res.json({
          score: 75,
          pillarScores: { clarity: 75, context: 70, constraints: 70, ethics: 85 },
          strengths: ['Prompt cukup jelas dan langsung pada topik.'],
          suggestions: ['Tambahkan format keluaran yang lebih spesifik.'],
          improvedPrompt: `${prompt} (Mohon sertakan 3 poin utama dan contoh praktis).`,
          aiResponse: responseText,
          verificationChallenge: 'Periksa keakuratan istilah yang digunakan dengan buku pelajaran resmi.'
        });
      }
    } catch (err: any) {
      console.error('Error in /api/gemini/prompt-lab:', err);
      return res.status(500).json({
        error: 'Gagal memproses prompt dengan AI. Silakan coba lagi.',
        detail: err.message,
      });
    }
  });

  // API 2: Asistensi Cek Fakta Interaktif
  app.post('/api/gemini/fact-check', async (req, res) => {
    try {
      const { textToVerify } = req.body;
      if (!textToVerify) {
        return res.status(400).json({ error: 'Teks berita atau klaim harus diisi.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          category: 'Analisis Mandiri',
          toneAnalysis: 'Judul memiliki indikasi gaya bahasa hiperbolis atau emosional.',
          redFlags: [
            'Menggunakan huruf kapital berlebihan atau tanda seru ganda',
            'Tidak menyertakan nama narasumber atau tanggal peristiwa yang spesifik',
            'Mendorong pembaca untuk menyebarkan informasi secara terburu-buru'
          ],
          factCheckingSteps: [
            'Periksa alamat web (URL) apakah domain resmi media pers terdaftar Dewan Pers',
            'Lakukan pencarian terbalik judul berita di mesin pencari dengan kata kunci "hoaks"',
            'Bandingkan dengan minimal 2 media arus utama terpercaya'
          ],
          pedagogicalTip: 'Ingat rumus S-A-R-I: Stop, Amati sumber, Riset bukti, Ikuti konfirmasi resmi.'
        });
      }

      const systemInstruction = `Anda adalah Analis Literasi Informasi DigiCerdas.
Analisis klaim atau judul informasi berikut untuk mendidik murid cara berpikir kritis dalam membedakan fakta, opini, dan indikasi hoaks.
Kembalikan JSON valid:
{
  "category": "Fakta Teruji" | "Opini / Klaim Subjektif" | "Potensi Hoaks / Meragukan",
  "toneAnalysis": "penjelasan nada bahasa (sensasional, persuasif, atau faktual)",
  "redFlags": ["tanda peringatan 1", "tanda peringatan 2"],
  "factCheckingSteps": ["langkah verifikasi 1", "langkah verifikasi 2", "langkah verifikasi 3"],
  "pedagogicalTip": "nasihat bijak untuk murid sebelum membagikan informasi ini"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analisis teks klaim/berita ini:\n"${textToVerify}"`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/gemini/fact-check:', err);
      return res.status(500).json({
        error: 'Gagal menganalisis klaim.',
        detail: err.message,
      });
    }
  });

  // API 3: Konsultasi Kasus Guru & Bimbingan Konseling (BK)
  app.post('/api/gemini/case-consult', async (req, res) => {
    try {
      const { caseDescription, studentGrade = 'Sekolah Menengah' } = req.body;
      if (!caseDescription) {
        return res.status(400).json({ error: 'Deskripsi kasus harus diisi.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          empathicApproach: 'Dengarkan cerita murid di ruang yang nyaman dan privat tanpa menyalahkan atau menyita gawai secara tergesa-gesa.',
          reflectiveQuestions: [
            'Bagaimana perasaanmu setelah kejadian tersebut terjadi di dunia maya?',
            'Apa dampak jangka panjang yang mungkin terjadi jika masalah ini dibiarkan?',
            'Bantuan seperti apa yang paling kamu butuhkan dari bapak/ibu guru saat ini?'
          ],
          actionSteps: [
            'Amankan bukti digital (tangkapan layar, URL, akun terkait)',
            'Lindungi identitas dan privasi murid yang melapor',
            'Diskusikan solusi pemulihan bersama orang tua murid jika terdapat risiko keamanan mendesak'
          ],
          counselingNotes: 'Selalu kedepankan prinsip perlindungan anak dan edukasi restorative ketimbang hukuman semata.'
        });
      }

      const systemInstruction = `Anda adalah Konsultan Bimbingan & Konseling (BK) Ahli Literasi Digital untuk Guru di Indonesia.
Berikan panduan penanganan pedagogis dan psikososial untuk kasus perilaku digital murid (${studentGrade}).
Kembalikan JSON valid:
{
  "empathicApproach": "panduan pendekatan awal guru saat mendengar curhat/masalah murid",
  "reflectiveQuestions": ["pertanyaan refleksi 1", "pertanyaan refleksi 2", "pertanyaan refleksi 3"],
  "actionSteps": ["langkah tindakan 1", "langkah tindakan 2", "langkah tindakan 3"],
  "counselingNotes": "catatan etika bimbingan dan kapan perlu eskalasi ke pimpinan sekolah atau orang tua"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Kasus siswa:\n"${caseDescription}"`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/gemini/case-consult:', err);
      return res.status(500).json({
        error: 'Gagal memproses konsultasi kasus.',
        detail: err.message,
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'DigiCerdas AI Backend',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Setup Vite in middleware mode for development
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production serve dist static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DigiCerdas server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start DigiCerdas server:', err);
  process.exit(1);
});
