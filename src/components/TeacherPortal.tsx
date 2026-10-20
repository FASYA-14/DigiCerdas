import React, { useState, useEffect } from 'react';
import {
  workshopStages,
  teacherCompetencies,
  studentTriageCases,
  WorkshopStage,
} from '../data/teacherCurriculumData';
import { TeacherTab } from '../types';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ShieldAlert,
  Users,
  Compass,
  Sparkles,
  HelpCircle,
  FileCheck,
  Send,
  RefreshCw,
  Printer,
} from 'lucide-react';

interface TeacherPortalProps {
  activeTab: TeacherTab;
  onTabChange: (tab: TeacherTab) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  activeTab,
  onTabChange,
}) => {
  // Workshop Timer State
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const currentStage: WorkshopStage = workshopStages[currentStageIdx];
  const [secondsRemaining, setSecondsRemaining] = useState(currentStage.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Sync timer when stage changes
  useEffect(() => {
    setSecondsRemaining(currentStage.durationMinutes * 60);
    setIsTimerRunning(false);
  }, [currentStageIdx, currentStage.durationMinutes]);

  // Countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // AI Case Consultation State
  const [caseDescription, setCaseDescription] = useState('');
  const [studentGrade, setStudentGrade] = useState('SMP / SMA (Sekolah Menengah)');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiConsultationResult, setAiConsultationResult] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleRunAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseDescription.trim()) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiConsultationResult(null);

    try {
      const res = await fetch('/api/gemini/case-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseDescription, studentGrade }),
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi layanan konsultasi kasus AI.');
      }

      const data = await res.json();
      setAiConsultationResult(data);
    } catch (err: any) {
      setAiError(err.message || 'Terjadi kesalahan saat memproses konsultasi.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
            <span>Portal Fasilitator & Guru BK</span>
            <span aria-hidden="true">·</span>
            <span>Panduan Pedagogis & Konseling</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Panduan Pembimbing Literasi Digital DigiCerdas
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Instrumen lengkap untuk guru mata pelajaran dan guru BK: pengelolaan alur lokakarya 90 menit, pedoman 5 kompetensi pembimbing, matriks eskalasi kasus siber, dan generator konsultasi bimbingan berbasis AI.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm no-print"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Cetak Dokumen Panduan</span>
        </button>
      </div>

      {/* Sub-tab Pills (Functional filter buttons per frontend-design guidelines) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl mb-8 overflow-x-auto border border-slate-200">
        <button
          type="button"
          onClick={() => onTabChange('kurikulum-90m')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'kurikulum-90m'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          1. Rundown 90 Menit Sesi
        </button>
        <button
          type="button"
          onClick={() => onTabChange('kompetensi')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'kompetensi'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          2. Lima Kompetensi Guru
        </button>
        <button
          type="button"
          onClick={() => onTabChange('matriks-bk')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'matriks-bk'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          3. Matriks Kasus & Eskalasi BK
        </button>
        <button
          type="button"
          onClick={() => onTabChange('pemantik-diskusi')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'pemantik-diskusi'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          4. Bank Pemantik Diskusi
        </button>
        <button
          type="button"
          onClick={() => onTabChange('konsultasi-ai')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'konsultasi-ai'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          5. Konsultan Kasus AI (BK)
        </button>
      </div>

      {/* Tab 1: 90-Minute Interactive Workshop Runner */}
      {activeTab === 'kurikulum-90m' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Stage Controller & Live Timer */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                    Tahap {currentStage.order} dari {workshopStages.length} · {currentStage.phase}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {currentStage.name}
                  </h3>
                  <span className="text-xs text-slate-700 mt-1 block">
                    Alokasi Waktu: {currentStage.durationMinutes} Menit
                  </span>
                </div>

                {/* Live Countdown Timer */}
                <div className="flex items-center gap-3 bg-slate-900 text-white p-3.5 rounded-2xl">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-2xl font-bold tracking-wider">
                    {formatTimer(secondsRemaining)}
                  </span>
                  <div className="flex items-center gap-1 pl-2 border-l border-slate-700">
                    <button
                      type="button"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      title={isTimerRunning ? 'Jeda Timer' : 'Jalankan Timer'}
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTimerRunning(false);
                        setSecondsRemaining(currentStage.durationMinutes * 60);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Reset Timer Tahap Ini"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stage Objective */}
              <div className="mt-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
                <span className="font-bold block text-indigo-900 mb-1">Tujuan Pembelajaran Tahap Ini:</span>
                {currentStage.objective}
              </div>

              {/* Action Lists: Teacher vs Student */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Langkah Tindakan Guru:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {currentStage.teacherActions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Aktivitas Murid:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {currentStage.studentActivities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Facilitation Tips & Materials */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
                <p>
                  <strong className="text-slate-900">Tips Fasilitasi Guru:</strong>{' '}
                  <span className="text-slate-600">{currentStage.facilitationTips}</span>
                </p>
                <p>
                  <strong className="text-slate-900">Media Pendukung:</strong>{' '}
                  <span className="text-slate-600">{currentStage.materialsNeeded}</span>
                </p>
              </div>

              {/* Navigation between Stages */}
              <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentStageIdx === 0}
                  onClick={() => setCurrentStageIdx((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  Tahap Sebelumnya
                </button>

                <div className="flex items-center gap-1">
                  {workshopStages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentStageIdx(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        idx === currentStageIdx
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentStageIdx === workshopStages.length - 1}
                  onClick={() => setCurrentStageIdx((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-40 shadow-sm"
                >
                  Tahap Selanjutnya
                </button>
              </div>
            </div>
          </div>

          {/* Right: Stage Timeline Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Ringkasan Timeline 90 Menit
              </h4>

              <div className="space-y-3">
                {workshopStages.map((stage, idx) => {
                  const isActive = idx === currentStageIdx;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setCurrentStageIdx(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-indigo-50 border-indigo-300 shadow-sm ring-1 ring-indigo-400'
                          : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-indigo-700">Tahap {stage.order}</span>
                        <span className="font-medium text-slate-700">{stage.durationMinutes} Menit</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">{stage.name}</h5>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 5 Teacher Competencies */}
      {activeTab === 'kompetensi' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              5 Kompetensi Guru Pembimbing Literasi Digital
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Berdasarkan rancangan program DigiCerdas (Section 7), guru diharapkan mengembangkan kompetensi terpadu yang memadukan keahlian teknologi dengan sentuhan kemanusiaan dan empati konseling.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacherCompetencies.map((comp) => (
                <div
                  key={comp.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-indigo-700 uppercase">{comp.category}</span>
                      <span className="text-[11px] text-slate-600">Terstandarisasi</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{comp.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{comp.description}</p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-800 block">Indikator Keberhasilan:</span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {comp.indicators.map((ind, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-600">✓</span>
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-indigo-900 bg-indigo-50/60 p-2.5 rounded-xl font-medium">
                    <span className="font-bold block text-indigo-950">Penerapan Nyata:</span>
                    {comp.practicalApplication}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Student Triage & BK Escalation Matrix */}
      {activeTab === 'matriks-bk' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Matriks Penanganan Masalah & Eskalasi Konseling BK
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Panduan respon cepat ketika guru menemukan tanda-tanda permasalahan digital murid di sekolah (perundungan siber, kecanduan layar, hoaks, pelanggaran integritas AI).
            </p>

            <div className="space-y-4">
              {studentTriageCases.map((tc) => (
                <div
                  key={tc.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-base font-bold text-slate-900">{tc.issue}</h4>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        tc.severity === 'Tinggi'
                          ? 'bg-rose-100 text-rose-800'
                          : tc.severity === 'Sedang'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      Tingkat Urgensi: {tc.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-900 block mb-1">Gejala Perilaku yang Teramati:</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-600">
                        {tc.symptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                      <span className="font-bold text-indigo-950 block mb-1">Tindakan Konseling Awal:</span>
                      <p className="text-slate-700 leading-relaxed">{tc.initialCounselingAction}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                      <span className="font-bold text-emerald-950 block mb-1">Pertanyaan Reflektif ke Murid:</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {tc.questionsToAskStudent.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700 flex items-start gap-2">
                    <span className="font-bold text-slate-900 shrink-0">Prosedur Eskalasi Resmi:</span>
                    <span>{tc.escalationProcedure}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Discussion Prompts Bank */}
      {activeTab === 'pemantik-diskusi' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Bank Pertanyaan Pemantik Diskusi Kelas (Socratic Method)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Gunakan pertanyaan-pertanyaan terbuka ini untuk memicu perdebatan konstruktif dan melatih murid mempertimbangkan sudut pandang etis sebelum mengambil tindakan digital.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="text-xs font-bold text-teal-800 uppercase">Topik 1: Privasi vs Ketenaran</span>
              <p className="text-sm font-semibold text-slate-900">
                "Apakah demi mendapatkan konten viral di media sosial, kita boleh merekam teman atau orang asing di tempat umum tanpa izin mereka?"
              </p>
              <p className="text-xs text-slate-600">
                Tujuan: Membangkitkan empati hak privasi dan batas persetujuan (consent) di ruang publik.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="text-xs font-bold text-indigo-700 uppercase">Topik 2: Etika Generative AI</span>
              <p className="text-sm font-semibold text-slate-900">
                "Jika seorang murid menggunakan AI untuk menulis 100% esai sejarahnya dan mendapat nilai A, siapa yang sebenarnya belajar: murid tersebut atau mesin?"
              </p>
              <p className="text-xs text-slate-600">
                Tujuan: Mengarahkan murid memahami hakikat sejati proses belajar dan pembentukan karakter.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase">Topik 3: Kecepatan vs Akurasi Berita</span>
              <p className="text-sm font-semibold text-slate-900">
                "Mengapa orang lebih cepat membagikan kabar yang membuat mereka marah atau takut daripada kabar yang menenangkan?"
              </p>
              <p className="text-xs text-slate-600">
                Tujuan: Membongkar psikologi clickbait dan bagaimana algoritma media sosial mengeksploitasi emosi manusia.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="text-xs font-bold text-rose-800 uppercase">Topik 4: Budaya Upstander di Sekolah</span>
              <p className="text-sm font-semibold text-slate-900">
                "Apa alasan terbesar murid memilih diam saat melihat teman dirundung di media sosial, dan bagaimana sekolah bisa memberi rasa aman untuk melapor?"
              </p>
              <p className="text-xs text-slate-600">
                Tujuan: Mengidentifikasi hambatan pelaporan dan membangun sistem pendukung sebaya (peer support).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Live AI Case Consultant for Teachers & Counselors */}
      {activeTab === 'konsultasi-ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-indigo-700" />
                <span>Konsultan Bimbingan & Konseling AI</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Konsultasikan Situasi Dilema Digital Murid
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Deskripsikan situasi atau insiden digital yang terjadi pada murid Anda (tanpa menyertakan nama asli untuk menjaga privasi). Gemini AI akan merumuskan rekomendasi bimbingan, pertanyaan reflektif, dan protokol eskalasi.
              </p>

              <form onSubmit={handleRunAiConsult} className="space-y-4">
                <div>
                  <label htmlFor="student-grade-select" className="block text-xs font-medium text-slate-700 mb-1">
                    Tingkat Kelas / Usia Murid:
                  </label>
                  <select
                    id="student-grade-select"
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                  >
                    <option value="SMP (Usia 12-15 tahun)">SMP (Usia 12-15 tahun)</option>
                    <option value="SMA / SMK (Usia 16-18 tahun)">SMA / SMK (Usia 16-18 tahun)</option>
                    <option value="Pendidikan Menengah Atas Umum">Pendidikan Menengah Atas Umum</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="case-description-input" className="block text-xs font-medium text-slate-700 mb-1">
                    Deskripsi Situasi / Perilaku Murid:
                  </label>
                  <textarea
                    id="case-description-input"
                    rows={4}
                    value={caseDescription}
                    onChange={(e) => setCaseDescription(e.target.value)}
                    placeholder="Contoh: Seorang siswi kelas 8 melapor bahwa foto dirinya diedit menggunakan filter tidak senonoh oleh teman sekelas dan disebarkan di grup obrolan tertutup..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isAiLoading || !caseDescription.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Merumuskan Pedoman...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Minta Panduan Bimbingan</span>
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
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Hasil Analisis & Rekomendasi Konseling BK
              </h4>

              {aiConsultationResult ? (
                <div className="space-y-4 text-xs animate-fadeIn">
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                    <span className="font-bold text-indigo-950 block mb-1">
                      1. Pendekatan Empatis Awal (Mendengar Tanpa Menghakimi):
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {aiConsultationResult.empathicApproach}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1.5">
                      2. Pertanyaan Reflektif untuk Membuka Dialog:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {aiConsultationResult.reflectiveQuestions?.map((q: string, i: number) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1.5">
                      3. Langkah Tindakan Korektif & Edukatif:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700">
                      {aiConsultationResult.actionSteps?.map((act: string, i: number) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
                    <span className="font-bold text-teal-950 block mb-1">
                      4. Catatan Etika Bimbingan & Koordinasi Sekolah:
                    </span>
                    <p className="text-teal-900 leading-relaxed font-medium">
                      {aiConsultationResult.counselingNotes}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 px-4 text-slate-400 text-xs">
                  <Compass className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="font-semibold text-slate-600">Belum ada kasus yang dikonsultasikan.</p>
                  <p className="mt-1">Ketik deskripsi situasi murid di sebelah kiri untuk menghasilkan panduan bimbingan yang terstruktur.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
