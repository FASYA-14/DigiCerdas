import React, { useState } from 'react';
import { DigitalCommitment } from '../types';
import {
  CheckSquare,
  Shield,
  Sparkles,
  Heart,
  Save,
  Printer,
  Check,
  Award,
} from 'lucide-react';

interface ReflectionCenterProps {
  studentName: string;
  setStudentName: (name: string) => void;
  onCommitmentSaved: () => void;
}

export const ReflectionCenter: React.FC<ReflectionCenterProps> = ({
  studentName,
  setStudentName,
  onCommitmentSaved,
}) => {
  const [screenLimit, setScreenLimit] = useState('Maksimal 2 Jam untuk Hiburan');
  const [habitFactCheck, setHabitFactCheck] = useState(true);
  const [habitPrivacy, setHabitPrivacy] = useState(true);
  const [habitEtiquette, setHabitEtiquette] = useState(true);
  const [habitEthicalAi, setHabitEthicalAi] = useState(true);
  const [personalGoal, setPersonalGoal] = useState(
    'Saya berkomitmen untuk tidak membuka gawai 30 menit sebelum tidur dan selalu memeriksa sumber berita sebelum membagikannya ke grup kelas.'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSavePledge = (e: React.FormEvent) => {
    e.preventDefault();
    const pledge: DigitalCommitment = {
      studentName: studentName || 'Warga Digital Cerdas',
      screenTimeLimit: screenLimit,
      factCheckingHabit: habitFactCheck,
      privacySettingHabit: habitPrivacy,
      respectfulCommunicationHabit: habitEtiquette,
      ethicalAiHabit: habitEthicalAi,
      personalGoal,
      createdDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
    localStorage.setItem('digicerdas_digital_pledge', JSON.stringify(pledge));
    setIsSaved(true);
    onCommitmentSaved();
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
            <span>Refleksi Diri & Aksi Nyata</span>
            <span aria-hidden="true">·</span>
            <span>Internalisasi Sikap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Refleksi & Kartu Komitmen Warga Digital
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Literasi digital sejati terwujud dalam kebiasaan sehari-hari. Rumuskan janji komitmen Anda untuk menjadi generasi muda yang bijak, aman, dan beretika di dunia maya.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm no-print"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Cetak Kartu Komitmen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Habit Audit & Goal Setting */}
        <div className="lg:col-span-7 space-y-6 no-print">
          <form onSubmit={handleSavePledge} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Formulir Audit & Ikrar Kebiasaan Digital
            </h3>

            <div>
              <label htmlFor="reflection-student-name" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Nama Lengkap Anda:
              </label>
              <input
                id="reflection-student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ketik nama lengkap Anda..."
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
              />
            </div>

            <div>
              <label htmlFor="screen-limit-select" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Target Batas Waktu Layar (Screen Time) Harian untuk Hiburan:
              </label>
              <select
                id="screen-limit-select"
                value={screenLimit}
                onChange={(e) => setScreenLimit(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
              >
                <option value="Maksimal 1 Jam untuk Hiburan">Maksimal 1 Jam (Sangat Seimbang)</option>
                <option value="Maksimal 2 Jam untuk Hiburan">Maksimal 2 Jam (Moderat & Produktif)</option>
                <option value="Maksimal 3 Jam untuk Hiburan">Maksimal 3 Jam (Perlu Disiplin Tambahan)</option>
              </select>
            </div>

            {/* Checklist of 4 Core Habits */}
            <div>
              <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Pilar Sikap Digital yang Saya Sepakati:
              </span>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={habitFactCheck}
                    onChange={(e) => setHabitFactCheck(e.target.checked)}
                    className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">1. Saring Sebelum Sharing:</span>
                    <span className="text-slate-600">Saya tidak akan meneruskan informasi yang meragukan sebelum memverifikasi sumber primernya.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={habitPrivacy}
                    onChange={(e) => setHabitPrivacy(e.target.checked)}
                    className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">2. Lindungi Privasi Diri & Teman:</span>
                    <span className="text-slate-600">Saya tidak akan membagikan NIK, kata sandi, atau foto orang lain tanpa izin eksplisit.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={habitEtiquette}
                    onChange={(e) => setHabitEtiquette(e.target.checked)}
                    className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">3. Menjadi Upstander (Anti-Cyberbullying):</span>
                    <span className="text-slate-600">Saya akan bersikap ramah di kolom komentar dan membela teman yang dirundung di media sosial.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={habitEthicalAi}
                    onChange={(e) => setHabitEthicalAi(e.target.checked)}
                    className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">4. Integritas Penggunaan Generative AI:</span>
                    <span className="text-slate-600">Saya akan menggunakan AI sebagai asisten pemantik ide, bukan menyalin tugas secara curang.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Personal Goal Free-text */}
            <div>
              <label htmlFor="personal-goal-textarea" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Tuliskan 1 Janji Spesifik Perubahan Diri Anda:
              </label>
              <textarea
                id="personal-goal-textarea"
                rows={3}
                value={personalGoal}
                onChange={(e) => setPersonalGoal(e.target.value)}
                placeholder="Contoh: Saya berjanji tidak akan membawa ponsel ke tempat tidur..."
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Ikrar Komitmen</span>
              </button>

              {isSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Komitmen Tersimpan!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Preview: Printable Pledge Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-teal-800/80 certificate-frame">
            <div className="flex items-center justify-between border-b border-teal-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" />
                <span className="font-extrabold text-sm tracking-tight text-white">DigiCerdas</span>
              </div>
              <span className="text-[10px] text-teal-300 font-mono tracking-widest uppercase">
                IKRAR WARGA DIGITAL
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-teal-300 block">Nama Pemilik Komitmen:</span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {studentName || 'Nama Murid'}
                </h4>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs space-y-2">
                <span className="font-bold text-teal-200 block">Sasaran Disiplin Diri:</span>
                <p className="text-slate-200 italic font-sans leading-relaxed">
                  "{personalGoal}"
                </p>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300 pt-2 border-t border-teal-800/60">
                <div className="flex items-center justify-between">
                  <span>Target Waktu Layar:</span>
                  <span className="font-semibold text-teal-200">{screenLimit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Saring Sebelum Sharing:</span>
                  <span className="text-emerald-400 font-bold">{habitFactCheck ? 'Ya' : 'Belum'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Perlindungan Privasi:</span>
                  <span className="text-emerald-400 font-bold">{habitPrivacy ? 'Ya' : 'Belum'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Empati & Anti-Perundungan:</span>
                  <span className="text-emerald-400 font-bold">{habitEtiquette ? 'Ya' : 'Belum'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Integritas Generative AI:</span>
                  <span className="text-emerald-400 font-bold">{habitEthicalAi ? 'Ya' : 'Belum'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-teal-800/60 flex items-center justify-between text-[11px] text-teal-300">
                <span>Program Smart Bright AI</span>
                <span>Ditandatangani secara Digital</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
