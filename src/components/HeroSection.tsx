import React from 'react';
import { UserRole } from '../types';
import { Sparkles, ArrowRight, BookOpen, Clock, ShieldCheck, Award } from 'lucide-react';

interface HeroSectionProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onStartLearning: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  role,
  setRole,
  onStartLearning,
}) => {
  return (
    <section className="bg-gradient-to-b from-teal-50/50 via-slate-50 to-white border-b border-slate-200/80 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Editorial Header Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase mb-3">
            <span>Ujian Tengah Semester</span>
            <span aria-hidden="true">·</span>
            <span>Program Pelatihan Smart Bright</span>
            <span aria-hidden="true">·</span>
            <span>Generative AI di Pendidikan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            DigiCerdas: Digital Cerdas & Bertanggung Jawab
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Program informasi dan pelatihan literasi digital interaktif untuk membekali murid sekolah menengah dengan keterampilan abad ke-21: berpikir kritis memverifikasi informasi, menjaga keamanan data pribadi, beretika di dunia maya, dan memanfaatkan Generative AI secara bijak.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStartLearning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-sm transition-all hover:translate-y-[-1px]"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setRole(role === 'student' ? 'teacher' : 'student')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
            >
              <span>Beralih ke {role === 'student' ? 'Panduan Guru & Konselor BK' : 'Portal Murid'}</span>
            </button>
          </div>

          {/* Clean Unboxed Key Metric Points (Anti-Slop Restraint) */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-teal-800 text-sm font-bold">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>5 Modul Inti</span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">Etika, verifikasi & AI</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-indigo-700 text-sm font-bold">
                <Clock className="w-4 h-4 text-indigo-700" />
                <span>90 Menit Sesi</span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">Rundown pelatihan kelas</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-amber-700 text-sm font-bold">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Live Gemini AI</span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">Uji prompt & cek fakta</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-bold">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Sertifikat Resmi</span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">Asesmen & komitmen diri</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
