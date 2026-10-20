import React, { useState } from 'react';
import { securityScenarios } from '../data/securityScenariosData';
import { SecurityScenario, SecurityOption } from '../types';
import {
  ShieldAlert,
  Lock,
  HeartHandshake,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const SecuritySimulation: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [safetyScore, setSafetyScore] = useState(70); // starts at baseline 70
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const scenario: SecurityScenario = securityScenarios[currentScenarioIndex];
  const isSelected = selectedOptionIndex !== null;
  const chosenOption: SecurityOption | null = isSelected
    ? scenario.options[selectedOptionIndex]
    : null;

  const handleSelectOption = (index: number) => {
    if (isSelected) return;
    setSelectedOptionIndex(index);
    const option = scenario.options[index];
    setSafetyScore((prev) => Math.min(100, Math.max(0, prev + option.scoreDelta)));
    if (!completedScenarios.includes(currentScenarioIndex)) {
      setCompletedScenarios([...completedScenarios, currentScenarioIndex]);
    }
  };

  const handleNext = () => {
    if (currentScenarioIndex < securityScenarios.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    }
  };

  const handleReset = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptionIndex(null);
    setSafetyScore(70);
    setCompletedScenarios([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
            <span>Simulasi Pengambilan Keputusan</span>
            <span aria-hidden="true">·</span>
            <span>Laboratorium Etika & Keamanan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Simulasi Dilema Keamanan Digital
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Hadapi berbagai situasi nyata di dunia siber. Setiap keputusan yang Anda ambil memiliki konsekuensi terhadap keselamatan data pribadi, reputasi moral, dan kesehatan mental Anda.
          </p>
        </div>

        {/* Safety Score Meter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 min-w-[220px]">
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className="text-slate-700">Skor Kebijaksanaan Digital</span>
            <span
              className={
                safetyScore >= 80
                  ? 'text-emerald-700 font-extrabold'
                  : safetyScore >= 50
                  ? 'text-amber-700 font-extrabold'
                  : 'text-rose-700 font-extrabold'
              }
            >
              {safetyScore} / 100
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                safetyScore >= 80
                  ? 'bg-emerald-600'
                  : safetyScore >= 50
                  ? 'bg-amber-600'
                  : 'bg-rose-600'
              }`}
              style={{ width: `${safetyScore}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-700 block mt-1">
            {safetyScore >= 80
              ? 'Warga Digital Teladan 🌟'
              : safetyScore >= 50
              ? 'Cukup Waspada, Perlu Ditingkatkan ⚠️'
              : 'Rentan terhadap Ancaman Siber 🚨'}
          </span>
        </div>
      </div>

      {/* Main Simulation Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scenario & Decision Tree */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Scenario Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                  {currentScenarioIndex + 1}
                </span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  {scenario.category}
                </span>
              </div>
              <span className="text-xs text-slate-700">
                Skenario {currentScenarioIndex + 1} dari {securityScenarios.length}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{scenario.title}</h3>

              {/* Context Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed mb-4">
                <span className="font-bold text-slate-900 block mb-1">Konteks Peristiwa:</span>
                {scenario.context}
              </div>

              {/* Dilemma Situation */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-sm text-amber-950 font-medium leading-relaxed mb-6">
                <span className="font-bold text-amber-900 block mb-1">Dilema yang Anda Hadapi:</span>
                {scenario.situation}
              </div>

              {/* Decision Options */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1">
                  Apa Tindakan yang Akan Anda Ambil?
                </span>

                {scenario.options.map((option, idx) => {
                  const isThisSelected = selectedOptionIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSelected}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isThisSelected
                          ? option.isBest
                            ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20'
                          : isSelected && option.isBest
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isThisSelected
                              ? option.isBest
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 leading-snug">{option.text}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Consequence & Counselor Feedback */}
              {chosenOption && (
                <div
                  className={`mt-6 p-5 rounded-xl border animate-fadeIn ${
                    chosenOption.isBest
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-2">
                    {chosenOption.isBest ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Keputusan Tepat & Bertanggung Jawab! (+{chosenOption.scoreDelta} Skor)</span>
                      </>
                    ) : (
                      <>
                        <AlertOctagon className="w-5 h-5 text-rose-600" />
                        <span>Pilihan Berisiko! ({chosenOption.scoreDelta} Skor)</span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 text-xs leading-relaxed">
                    <p>
                      <strong className="text-slate-900">Konsekuensi Keputusan:</strong>{' '}
                      {chosenOption.consequence}
                    </p>
                    <p className="pt-2 border-t border-slate-200/50">
                      <strong className="text-slate-900">Arahan Guru Konselor BK:</strong>{' '}
                      {chosenOption.counselorFeedback}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    {currentScenarioIndex < securityScenarios.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-sm"
                      >
                        <span>Skenario Berikutnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Ulangi Simulasi</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Security Checklist Guide */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
              <Lock className="w-4 h-4 text-teal-700" />
              <span>Pedoman 4 Lapisan Keamanan</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">
              Perisai Perlindungan Diri di Internet
            </h4>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block mb-0.5">1. Frasa Sandi Unik (Passphrase):</span>
                <span>Jangan pakai nama hewan atau tanggal lahir. Gunakan kalimat acak kombinasi simbol (misal: "Hujan#Deras!EsTeh26").</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block mb-0.5">2. Wajib 2-Factor Authentication (2FA):</span>
                <span>Aktifkan verifikasi dua langkah melalui aplikasi autentikator di akun medsos dan email Anda.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block mb-0.5">3. Prinsip Izin Terkecil (Least Privilege):</span>
                <span>Jangan beri izin kontak/GPS pada aplikasi yang fungsinya hanya untuk mengedit foto atau bermain game.</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block mb-0.5">4. Budaya Upstander (Anti-Bullying):</span>
                <span>Jangan jadi penonton pasif saat teman dirundung secara daring. Beri dukungan moral dan laporkan.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
