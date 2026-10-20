import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { QuizQuestion } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Printer,
  RotateCcw,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface QuizCenterProps {
  studentName: string;
  setStudentName: (name: string) => void;
  schoolName: string;
  setSchoolName: (school: string) => void;
  onQuizCompleted: (score: number) => void;
}

export const QuizCenter: React.FC<QuizCenterProps> = ({
  studentName,
  setStudentName,
  schoolName,
  setSchoolName,
  onQuizCompleted,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizMode, setQuizMode] = useState<'pre-test' | 'post-test'>('post-test');

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });
    return Math.round((correctCount / quizQuestions.length) * 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const score = calculateScore();
    onQuizCompleted(score);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === quizQuestions.length;

  const certificateId = `DIGI-CERDAS-${(studentName || 'SISWA')
    .slice(0, 3)
    .toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const todayDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Printable Certificate (Visible in Print Mode or After Passing) */}
      {isSubmitted && score >= 70 && (
        <div className="mb-10 certificate-container">
          <div className="bg-white rounded-3xl border-4 border-double border-teal-800 p-8 sm:p-12 shadow-lg max-w-4xl mx-auto certificate-frame relative overflow-hidden">
            {/* Watermark Background Stamp */}
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
              <ShieldCheck className="w-96 h-96 text-teal-900" />
            </div>

            <div className="text-center relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-700 text-white flex items-center justify-center mx-auto shadow-sm">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest block">
                  SERTIFIKAT KELULUSAN & KOMPETENSI
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Literasi Digital & Generative AI
                </h2>
                <p className="text-xs text-slate-700 mt-0.5">
                  Program Ujian Tengah Semester (UTS) DigiCerdas · Smart Bright Generative AI
                </p>
              </div>

              <div className="py-4">
                <span className="text-xs text-slate-700 block">Diberikan Kepada Murid:</span>
                <h3 className="text-2xl sm:text-3xl font-black text-teal-900 border-b-2 border-teal-600/30 inline-block pb-1 mt-1">
                  {studentName || 'Nama Peserta Didik'}
                </h3>
                <p className="text-xs text-slate-700 mt-1 font-medium">
                  {schoolName || 'Sekolah Menengah'}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
                Telah berhasil menyelesaikan rangkaian modul pembelajaran literasi digital abad ke-21, uji studi kasus cek fakta, simulasi etika keamanan data, dan praktik Generative AI dengan capaian nilai evaluasi:
              </p>

              <div className="inline-flex items-center gap-4 bg-teal-50 border border-teal-200 px-6 py-2.5 rounded-2xl">
                <div>
                  <span className="text-[11px] text-teal-800 font-bold block">Skor Evaluasi:</span>
                  <span className="text-xl font-black text-teal-900">{score} / 100</span>
                </div>
                <div className="h-8 w-px bg-teal-200" />
                <div>
                  <span className="text-[11px] text-teal-800 font-bold block">Predikat:</span>
                  <span className="text-xs font-bold text-teal-900">
                    {score >= 90 ? 'Sangat Mahir (Distinction)' : 'Kompeten & Beretika (Passed)'}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-4">
                <div className="text-left">
                  <span className="block font-semibold">Nomor Registrasi:</span>
                  <span className="font-mono text-slate-700">{certificateId}</span>
                </div>

                <div className="text-center">
                  <span className="block font-semibold">Diterbitkan pada:</span>
                  <span>{todayDate}</span>
                </div>

                <div className="text-right">
                  <span className="block font-semibold">Status Validasi:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-4 h-4" /> Terverifikasi DigiCerdas
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF Sertifikat</span>
            </button>
          </div>
        </div>
      )}

      {/* Header & Mode Switcher */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
            <span>Evaluasi Pemahaman</span>
            <span aria-hidden="true">·</span>
            <span>10 Soal Komprehensif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Kuis & Uji Kompetensi Literasi Digital
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Uji pemahaman Anda terhadap 5 materi utama. Raih nilai minimal 70 untuk membuka Sertifikat Kelulusan resmi DigiCerdas.
          </p>
        </div>

        {/* Student Name Inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2.5 rounded-2xl border border-slate-200">
          <div>
            <label htmlFor="student-name-input" className="sr-only">Nama Lengkap Murid</label>
            <input
              id="student-name-input"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nama Lengkap Murid..."
              className="text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500 w-44"
            />
          </div>
          <div>
            <label htmlFor="school-name-input" className="sr-only">Nama Sekolah / Kelas</label>
            <input
              id="school-name-input"
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Nama Sekolah / Kelas..."
              className="text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500 w-44"
            />
          </div>
        </div>
      </div>

      {/* Quiz Form */}
      <form onSubmit={handleSubmit} className="space-y-6 no-print">
        {quizQuestions.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border bg-white transition-all shadow-sm ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-700 mb-2">
                <span className="font-bold text-teal-800">Pertanyaan {idx + 1} dari 10</span>
                <span>{q.moduleRef}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-relaxed">
                {q.question}
              </h3>

              <div className="space-y-2.5">
                {q.options.map((option, optIdx) => {
                  const isThisOptionChosen = selectedOption === optIdx;
                  const isThisOptionCorrect = optIdx === q.correctIndex;

                  let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (isSubmitted) {
                    if (isThisOptionCorrect) {
                      optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isThisOptionChosen && !isThisOptionCorrect) {
                      optionStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-medium';
                    } else {
                      optionStyle = 'bg-slate-50/60 border-slate-200 text-slate-600 opacity-60';
                    }
                  } else if (isThisOptionChosen) {
                    optionStyle = 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 text-teal-950 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {isSubmitted && (
                <div
                  className={`mt-4 p-3.5 rounded-xl text-xs leading-relaxed border ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <span className="font-bold block mb-1">
                    {isCorrect ? '✓ Jawaban Anda Benar!' : '✗ Penjelasan Jawaban yang Tepat:'}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {/* Action Bottom Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-xs text-slate-700 block">Status Pengerjaan:</span>
            <span className="text-sm font-bold text-slate-900">
              {answeredCount} dari {quizQuestions.length} soal dijawab
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isSubmitted ? (
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Pengerjaan Kuis</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isAllAnswered}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Kumpulkan & Lihat Hasil Evaluasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
