import React, { useState } from 'react';
import { PromptAnalysisResult } from '../types';
import {
  Sparkles,
  Send,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Copy,
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const PRESET_PROMPTS = [
  {
    title: 'Topik IPA: Fotosintesis',
    topic: 'IPA / Biologi',
    badPrompt: 'jelaskan fotosintesis dong',
    betterPrompt: 'Jelaskan proses fotosintesis pada tumbuhan hijau untuk murid SMP kelas 8. Buatkan analogi sederhana seperti proses memasak di dapur, gunakan maksimal 3 paragraf singkat, dan sebutkan zat apa saja yang dihasilkan.',
  },
  {
    title: 'Topik IPS: Perjanjian Sejarah',
    topic: 'IPS / Sejarah',
    badPrompt: 'tulis esai perjanjian renville',
    betterPrompt: 'Bantu saya membuat kerangka rangkuman Perjanjian Renville (1948) untuk bahan belajar sejarah. Bagi menjadi 3 bagian: Latar Belakang, Tokoh Kunci Delegasi Indonesia-Belanda, dan Dampaknya bagi wilayah Indonesia. Sertakan 2 pertanyaan refleksi kritis.',
  },
  {
    title: 'Topik Matematika: Teorema Pythagoras',
    topic: 'Matematika',
    badPrompt: 'rumus pythagoras dan contohnya',
    betterPrompt: 'Jelaskan konsep Teorema Pythagoras menggunakan contoh masalah nyata (seperti mengukur tangga yang bersandar di dinding). Tuliskan langkah perhitungannya secara bertahap dan berikan 1 soal latihan tanpa langsung membocorkan jawabannya.',
  },
];

export const PromptLab: React.FC = () => {
  const [promptInput, setPromptInput] = useState(PRESET_PROMPTS[0].badPrompt);
  const [selectedTopic, setSelectedTopic] = useState('IPA / Biologi');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PromptAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyzePrompt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/prompt-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInput,
          topic: selectedTopic,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal memproses prompt dengan AI.');
      }

      const data: PromptAnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengevaluasi prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseImprovedPrompt = (improved: string) => {
    setPromptInput(improved);
  };

  const handleCopyImproved = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
            <span>Laboratorium AI Praktis</span>
            <span aria-hidden="true">·</span>
            <span>Didukung Gemini 3.8 Flash</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Laboratorium Prompt & Verifikasi AI
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Generative AI adalah mitra belajar cerdas, bukan alat salin-tempel. Latih kemampuan merumuskan prompt berkualitas tinggi berdasarkan 4 Pilar (Kejelasan, Konteks, Batasan, Verifikasi).
          </p>
        </div>

        {/* Quality Score Indicator */}
        {result && (
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-700 block">Skor Kualitas Prompt</span>
              <span
                className={`text-lg font-extrabold ${
                  result.score >= 80
                    ? 'text-emerald-700'
                    : result.score >= 60
                    ? 'text-amber-700'
                    : 'text-rose-700'
                }`}
              >
                {result.score} / 100
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-800 font-bold border border-teal-100">
              <Sparkles className="w-5 h-5 text-teal-700" />
            </div>
          </div>
        )}
      </div>

      {/* Preset Inspirations Bar */}
      <div className="mb-6 bg-slate-100/80 p-4 rounded-2xl border border-slate-200">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
          Pilih Contoh Kasus Prompt Nyata untuk Dibandingkan:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_PROMPTS.map((preset, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-teal-800 block mb-1">{preset.topic}</span>
                <p className="text-xs text-slate-700 font-medium line-clamp-1">"{preset.badPrompt}"</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPromptInput(preset.badPrompt);
                    setSelectedTopic(preset.topic);
                  }}
                  className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                >
                  Prompt Mentah
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPromptInput(preset.betterPrompt);
                    setSelectedTopic(preset.topic);
                  }}
                  className="px-2.5 py-1 text-[11px] font-medium bg-teal-50 hover:bg-teal-100 rounded-lg text-teal-800"
                >
                  Prompt 4C Rapi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Two-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Prompt & 4-Pillar Evaluation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prompt Workbench Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <form onSubmit={handleAnalyzePrompt}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="prompt-input" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Ketik Prompt AI Pembelajaran Anda:
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="IPA / Biologi">Topik: IPA / Sains</option>
                  <option value="IPS / Sejarah">Topik: IPS / Sejarah</option>
                  <option value="Matematika">Topik: Matematika</option>
                  <option value="Bahasa Indonesia">Topik: Bahasa & Sastra</option>
                  <option value="Teknologi & Informatika">Topik: Informatika / TIK</option>
                </select>
              </div>

              <textarea
                id="prompt-input"
                rows={4}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Contoh: Tolong jelaskan materi fisika gaya gravitasi untuk murid SMP..."
                className="w-full text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50 leading-relaxed font-sans"
              />

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-700">
                  {promptInput.length} karakter · Masukkan instruksi, batasan, & konteks
                </span>

                <button
                  type="submit"
                  disabled={isLoading || !promptInput.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Mengevaluasi dengan AI...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Uji & Evaluasi Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {error}
              </div>
            )}
          </div>

          {/* 4 Pillars Evaluation Cards */}
          {result && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Evaluasi 4 Pilar Kualitas Prompt
                </h3>
                <span className="text-xs text-slate-700">Metrik Abad ke-21</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-700 block mb-1">1. Kejelasan</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    {result.pillarScores?.clarity ?? 75}%
                  </span>
                  <span className="text-[10px] text-slate-700">Instruksi spesifik</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-700 block mb-1">2. Konteks</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    {result.pillarScores?.context ?? 70}%
                  </span>
                  <span className="text-[10px] text-slate-700">Tingkat kelas & latar</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-700 block mb-1">3. Batasan</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    {result.pillarScores?.constraints ?? 65}%
                  </span>
                  <span className="text-[10px] text-slate-700">Format & panjang</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-700 block mb-1">4. Etika</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    {result.pillarScores?.ethics ?? 90}%
                  </span>
                  <span className="text-[10px] text-slate-700">Privasi & kejujuran</span>
                </div>
              </div>

              {/* Strengths & Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" /> Kelebihan Prompt:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-emerald-950">
                    {result.strengths?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                  <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> Saran Perbaikan:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-amber-950">
                    {result.suggestions?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improved Prompt Box */}
              {result.improvedPrompt && (
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-teal-900 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-teal-700" /> Rekomendasi Prompt yang Disempurnakan:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyImproved(result.improvedPrompt)}
                      className="text-teal-800 hover:text-teal-900 font-semibold flex items-center gap-1 text-[11px]"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <p className="text-slate-800 italic bg-white/80 p-3 rounded-lg border border-teal-100 font-mono text-[11px] leading-relaxed">
                    "{result.improvedPrompt}"
                  </p>
                  <div className="mt-2.5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleUseImprovedPrompt(result.improvedPrompt)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-[11px]"
                    >
                      <span>Gunakan Prompt Ini di Editor</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: AI Output & Critical Verification Challenge */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Response Display */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Hasil Eksekusi Generative AI</span>
              </span>
              <span className="text-[11px] text-slate-700">Gemini 3.8 Flash</span>
            </div>

            {result ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                  {result.aiResponse}
                </div>

                {/* Critical Verification Challenge Card */}
                {result.verificationChallenge && (
                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
                      <ShieldCheck className="w-4 h-4 text-indigo-700" />
                      <span>Tantangan Verifikasi Kritis Murid:</span>
                    </div>
                    <p className="text-indigo-950 leading-relaxed font-medium">
                      "{result.verificationChallenge}"
                    </p>
                    <p className="text-[11px] text-indigo-800 mt-2">
                      💡 Ingat: Jangan langsung menyalin jawaban di atas ke buku tugas sebelum Anda membuktikan kebenarannya dengan buku teks resmi!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 px-4 text-slate-600 text-xs">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-700">Belum ada prompt yang diuji.</p>
                <p className="mt-1">Ketik prompt Anda di sebelah kiri dan klik tombol "Uji & Evaluasi Prompt" untuk melihat tanggapan AI dan analisis pedagogis.</p>
              </div>
            )}
          </div>

          {/* Quick Guide to 4C Prompting */}
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm">
            <h4 className="text-sm font-bold text-indigo-300 mb-2">
              Rumus 4C Prompt Cerdas Abad ke-21:
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">1. Clarity (Kejelasan):</strong> Nyatakan tujuan tugas secara spesifik.</p>
              <p><strong className="text-white">2. Context (Konteks):</strong> Tentukan target audiens atau tingkat kelas.</p>
              <p><strong className="text-white">3. Constraints (Batasan):</strong> Batasi format (contoh: 3 poin, tanpa rumus rumit).</p>
              <p><strong className="text-white">4. Check (Verifikasi):</strong> Periksa fakta dan jangan serahkan data rahasia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
