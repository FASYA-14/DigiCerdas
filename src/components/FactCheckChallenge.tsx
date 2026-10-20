import React, { useState } from 'react';
import { factCheckScenarios } from '../data/factCheckData';
import { FactCheckItem } from '../types';
import {
  ShieldCheck,
  Search,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const FactCheckChallenge: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedClues, setRevealedClues] = useState<Record<string, boolean>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<'fakta' | 'opini' | 'hoaks' | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Live AI Fact Check Assistant State
  const [customClaim, setCustomClaim] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const currentScenario: FactCheckItem = factCheckScenarios[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentScenario.correctType;

  const handleSelectAnswer = (type: 'fakta' | 'opini' | 'hoaks') => {
    if (isAnswered) return;
    setSelectedAnswer(type);
    setAnsweredCount((prev) => prev + 1);
    if (type === currentScenario.correctType) {
      setUserScore((prev) => prev + 20);
    }
  };

  const handleNext = () => {
    if (currentIndex < factCheckScenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setRevealedClues({});
    }
  };

  const handleResetChallenge = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setRevealedClues({});
    setUserScore(0);
    setAnsweredCount(0);
  };

  const toggleClue = (clueKey: string) => {
    setRevealedClues((prev) => ({
      ...prev,
      [clueKey]: !prev[clueKey],
    }));
  };

  const handleRunAiFactCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customClaim.trim()) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiAnalysisResult(null);

    try {
      const res = await fetch('/api/gemini/fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textToVerify: customClaim }),
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi server verifikasi AI.');
      }

      const data = await res.json();
      setAiAnalysisResult(data);
    } catch (err: any) {
      setAiError(err.message || 'Terjadi kesalahan saat memeriksa klaim.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
            <span>Tantangan Interaktif</span>
            <span aria-hidden="true">·</span>
            <span>Detektif Informasi Cerdas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Laboratorium Cek Fakta & Deteksi Hoaks
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Latih naluri berpikir kritis Anda dengan memeriksa bukti, meneliti kredibilitas sumber, dan membedakan antara fakta, opini, dan manipulasi informasi.
          </p>
        </div>

        {/* Score & Progress Tracker */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200">
          <div>
            <span className="text-[11px] text-slate-700 block">Skor Detektif</span>
            <span className="text-base font-extrabold text-teal-800">{userScore} Poin</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-[11px] text-slate-700 block">Kasus Selesai</span>
            <span className="text-base font-extrabold text-indigo-700">
              {currentIndex + 1} / {factCheckScenarios.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Simulated Post & Clue Inspection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simulated Post Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header Platform */}
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-xs font-bold text-slate-700">
                  Simulasi Tangkapan Layar: {currentScenario.platform}
                </span>
              </div>
              <span className="text-xs text-slate-700">{currentScenario.date}</span>
            </div>

            <div className="p-6">
              <div className="mb-3">
                <span className="text-xs font-semibold text-slate-700 block">Sumber / Akun Pengunggah:</span>
                <span className="text-sm font-bold text-slate-900">{currentScenario.source}</span>
              </div>

              {/* Mock Message Bubble */}
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-800 text-sm leading-relaxed font-sans mb-4 select-text">
                {currentScenario.textSnippet}
              </div>

              {/* Clue Inspector Accordions */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1">
                  Peralatan Investigasi (Klik untuk Membuka Bukti):
                </span>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleClue('url')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 text-left text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-teal-700" />
                      1. Cek Kredibilitas URL & Domain Situs
                    </span>
                    <span className="text-teal-800 font-bold">{revealedClues.url ? 'Tutup' : 'Buka Bukti'}</span>
                  </button>
                  {revealedClues.url && (
                    <div className="p-3 bg-teal-50/50 text-xs text-slate-700 border-t border-slate-200 leading-relaxed">
                      {currentScenario.clues.urlClue}
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleClue('expert')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 text-left text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                      2. Cek Konfirmasi Narasumber / Lembaga Resmi
                    </span>
                    <span className="text-indigo-700 font-bold">{revealedClues.expert ? 'Tutup' : 'Buka Bukti'}</span>
                  </button>
                  {revealedClues.expert && (
                    <div className="p-3 bg-indigo-50/50 text-xs text-slate-700 border-t border-slate-200 leading-relaxed">
                      {currentScenario.clues.expertClue}
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleClue('context')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 text-left text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      3. Analisis Gaya Bahasa & Konteks Visual
                    </span>
                    <span className="text-amber-800 font-bold">{revealedClues.context ? 'Tutup' : 'Buka Bukti'}</span>
                  </button>
                  {revealedClues.context && (
                    <div className="p-3 bg-amber-50/50 text-xs text-slate-700 border-t border-slate-200 leading-relaxed">
                      {currentScenario.clues.imageContextClue}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Voting Options */}
            <div className="bg-slate-50 p-6 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-3">
                Setelah meneliti bukti, tentukan klasifikasi informasi di atas:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer('fakta')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedAnswer === 'fakta'
                      ? currentScenario.correctType === 'fakta'
                        ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-sm'
                        : 'bg-rose-600 text-white border-rose-700 font-bold shadow-sm'
                      : isAnswered && currentScenario.correctType === 'fakta'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 font-medium'
                  }`}
                >
                  <span className="text-xs block">1. Fakta Teruji</span>
                </button>

                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer('opini')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedAnswer === 'opini'
                      ? currentScenario.correctType === 'opini'
                        ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-sm'
                        : 'bg-rose-600 text-white border-rose-700 font-bold shadow-sm'
                      : isAnswered && currentScenario.correctType === 'opini'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 font-medium'
                  }`}
                >
                  <span className="text-xs block">2. Opini Subjektif</span>
                </button>

                <button
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer('hoaks')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedAnswer === 'hoaks'
                      ? currentScenario.correctType === 'hoaks'
                        ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-sm'
                        : 'bg-rose-600 text-white border-rose-700 font-bold shadow-sm'
                      : isAnswered && currentScenario.correctType === 'hoaks'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 font-medium'
                  }`}
                >
                  <span className="text-xs block">3. Hoaks / Misinformasi</span>
                </button>
              </div>

              {/* Feedback Reveal */}
              {isAnswered && (
                <div
                  className={`mt-4 p-4 rounded-xl border ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Analisis Tepat! (+20 Poin)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Kurang Tepat. Jawaban sebenarnya adalah {currentScenario.correctType.toUpperCase()}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed mt-1">{currentScenario.explanation}</p>
                  <div className="mt-2 pt-2 border-t border-slate-200/50 text-[11px] font-medium">
                    <span className="font-bold">Tips Detektif:</span> {currentScenario.verificationTip}
                  </div>

                  <div className="mt-4 flex justify-end">
                    {currentIndex < factCheckScenarios.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-sm"
                      >
                        <span>Kasus Berikutnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResetChallenge}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Ulangi Latihan Kasus</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live AI Fact-Checking Assist Workbench */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              <span>Live AI Fact-Checking Assistant</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Punya Berita / Pesan Meragukan?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              Uji teks berita, pesan berantai WhatsApp, atau klaim viral dengan analisis bahasa dan panduan verifikasi berbasis Gemini AI.
            </p>

            <form onSubmit={handleRunAiFactCheck} className="space-y-3">
              <div>
                <label htmlFor="custom-claim-input" className="block text-xs font-medium text-slate-700 mb-1">
                  Tempelkan Teks / Judul Berita:
                </label>
                <textarea
                  id="custom-claim-input"
                  rows={3}
                  value={customClaim}
                  onChange={(e) => setCustomClaim(e.target.value)}
                  placeholder="Contoh: Beredar kabar bahwa nomor ujian siswa harus diverifikasi lewat link undian hadiah..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-600">Model: Gemini 3.8 Flash</span>
                <button
                  type="submit"
                  disabled={isAiLoading || !customClaim.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {isAiLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Menganalisis...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analisis Kritis AI</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {aiError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {aiError}
              </div>
            )}

            {aiAnalysisResult && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800">Kategori Prediksi:</span>
                  <span className="font-extrabold text-indigo-700">
                    {aiAnalysisResult.category || 'Analisis Selesai'}
                  </span>
                </div>

                {aiAnalysisResult.toneAnalysis && (
                  <div>
                    <span className="font-semibold text-slate-700 block mb-0.5">Analisis Nada Bahasa:</span>
                    <p className="text-slate-600 leading-relaxed">{aiAnalysisResult.toneAnalysis}</p>
                  </div>
                )}

                {aiAnalysisResult.redFlags && aiAnalysisResult.redFlags.length > 0 && (
                  <div>
                    <span className="font-semibold text-amber-800 block mb-1">Tanda-tanda Kecurigaan:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                      {aiAnalysisResult.redFlags.map((flag: string, i: number) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiAnalysisResult.factCheckingSteps && (
                  <div>
                    <span className="font-semibold text-teal-800 block mb-1">Langkah Verifikasi Mandiri:</span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
                      {aiAnalysisResult.factCheckingSteps.map((step: string, i: number) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {aiAnalysisResult.pedagogicalTip && (
                  <div className="pt-2 border-t border-slate-200 text-teal-900 font-medium bg-teal-50/50 p-2.5 rounded-lg">
                    💡 <span className="font-bold">Nasihat DigiCerdas:</span> {aiAnalysisResult.pedagogicalTip}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Fact Checking Guide Card */}
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm">
            <h4 className="text-sm font-bold text-teal-300 mb-2">
              Rumus Cek Fakta Cepat: S - A - R - I
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">S (Stop):</strong> Tahan jari Anda, jangan langsung sebar.</p>
              <p><strong className="text-white">A (Amati):</strong> Teliti URL domain (.go.id / .ac.id) dan tanggal berita.</p>
              <p><strong className="text-white">R (Riset):</strong> Cari di Google dengan format "kata kunci + hoaks".</p>
              <p><strong className="text-white">I (Ikuti):</strong> Cek pengumuman resmi instansi terkait.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
