import React, { useState } from 'react';
import { modulesData } from '../data/modulesData';
import { ModuleSection } from '../types';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  Save,
  Check,
  Globe,
  ShieldAlert,
  Lock,
  Sparkles,
  Compass,
} from 'lucide-react';

interface LearningCenterProps {
  completedModules: string[];
  onToggleCompleteModule: (moduleId: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const LearningCenter: React.FC<LearningCenterProps> = ({
  completedModules,
  onToggleCompleteModule,
  onNavigateToTab,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(modulesData[0].id);
  const [reflectionInputs, setReflectionInputs] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('digicerdas_reflections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const activeModule = modulesData.find((m) => m.id === activeModuleId) || modulesData[0];
  const isCompleted = completedModules.includes(activeModule.id);

  const handleSaveReflection = (moduleId: string) => {
    const updated = { ...reflectionInputs };
    localStorage.setItem('digicerdas_reflections', JSON.stringify(updated));
    if (!completedModules.includes(moduleId)) {
      onToggleCompleteModule(moduleId);
    }
    setSaveSuccess(moduleId);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-teal-700" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-700" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-indigo-700" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-violet-700" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-700" />;
      default:
        return <BookOpen className="w-5 h-5 text-teal-700" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
            <span>Pusat Materi Pembelajaran</span>
            <span aria-hidden="true">·</span>
            <span>5 Modul Terstruktur</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Materi Literasi Digital Abad ke-21
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl">
            Pelajari konsep fundamental literasi informasi, keamanan data, etika siber, serta cara bijak berkolaborasi dengan Generative AI.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-200">
          <CheckCircle className="w-4 h-4 text-emerald-700" />
          <span>
            {completedModules.length} dari {modulesData.length} modul telah diselesaikan
          </span>
        </div>
      </div>

      {/* Module Selector List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {modulesData.map((mod, idx) => {
          const active = mod.id === activeModuleId;
          const completed = completedModules.includes(mod.id);
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => setActiveModuleId(mod.id)}
              className={`text-left p-3.5 rounded-xl border transition-all ${
                active
                  ? 'bg-teal-700 text-white border-teal-800 shadow-sm ring-2 ring-teal-500/30'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    active ? 'text-teal-200' : 'text-slate-700'
                  }`}
                >
                  {mod.code}
                </span>
                {completed ? (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                      active ? 'text-teal-100' : 'text-emerald-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" /> Selesai
                  </span>
                ) : (
                  <span className={`text-[11px] ${active ? 'text-teal-200' : 'text-slate-600'}`}>
                    {mod.readTime}
                  </span>
                )}
              </div>
              <h3 className={`text-xs font-bold line-clamp-2 ${active ? 'text-white' : 'text-slate-900'}`}>
                {mod.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Two-Zone Layout (Left Stage: Theory & Case Study, Right Stage: Interactive Reflection & Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                {renderIcon(activeModule.iconName)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
                  <span className="font-semibold text-teal-800">{activeModule.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModule.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {activeModule.title}
                </h3>
                <p className="text-xs sm:text-sm text-teal-800 font-medium mt-1">
                  {activeModule.subtitle}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed">
              {activeModule.summary}
            </div>

            {/* Key Points */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Poin Kunci Pembelajaran
              </h4>
              <ul className="space-y-3">
                {activeModule.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real-World Case Study Box */}
          <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/30 rounded-2xl border border-amber-200/80 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              <span>{activeModule.caseStudy.title}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeModule.caseStudy.description}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-start gap-2">
              <span className="text-xs font-bold text-amber-900 shrink-0">Pelajaran Berharga:</span>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {activeModule.caseStudy.lesson}
              </p>
            </div>
          </div>
        </div>

        {/* Right Zone: 5 Columns (Interactive Sandbox & Reflection) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reflection Journal Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span>Pertanyaan Refleksi Diri</span>
            </div>

            <p className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed">
              "{activeModule.reflectiveQuestion}"
            </p>

            <label htmlFor={`reflection-${activeModule.id}`} className="block text-xs text-slate-700 mb-2">
              Tuliskan pemikiran atau pengalaman pribadi Anda di sini:
            </label>
            <textarea
              id={`reflection-${activeModule.id}`}
              rows={4}
              value={reflectionInputs[activeModule.id] || ''}
              onChange={(e) =>
                setReflectionInputs({
                  ...reflectionInputs,
                  [activeModule.id]: e.target.value,
                })
              }
              placeholder="Contoh: Menurut saya, sebelum membagikan informasi saya harus..."
              className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-slate-50/50"
            />

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleSaveReflection(activeModule.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan & Tandai Selesai</span>
              </button>

              {saveSuccess === activeModule.id && (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" /> Tersimpan!
                </span>
              )}
            </div>
          </div>

          {/* Quick Practice Jump Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
              Latihan Interaktif Terkait
            </span>
            <h4 className="text-base font-bold text-white mb-2">
              Uji Pemahaman Materi Ini di Sandbox
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Setelah membaca materi, asah keterampilan berpikir kritis Anda dengan menyelesaikan simulasi dan tantangan langsung.
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onNavigateToTab('cek-fakta')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-medium text-slate-200 transition-colors"
              >
                <span>Tantangan Cek Fakta (5 Studi Kasus)</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('simulasi')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-medium text-slate-200 transition-colors"
              >
                <span>Simulasi Dilema Keamanan Digital</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('prompt-lab')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-medium text-slate-200 transition-colors"
              >
                <span>Laboratorium Prompt AI Interaktif</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
