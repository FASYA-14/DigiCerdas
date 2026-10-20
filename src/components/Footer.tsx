import React from 'react';
import { Shield, Sparkles, BookOpen, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 no-print mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-black">
                <Shield className="w-4 h-4" />
              </div>
              <span>DigiCerdas</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Program Informasi dan Pelatihan Literasi Digital Berbasis Generative AI untuk Murid Sekolah Menengah dan Guru Pembimbing / Konselor Bimbingan & Konseling (BK).
            </p>
            <div className="flex items-center gap-2 text-teal-400 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Dikembangkan melalui Keterampilan Pelatihan Smart Bright & Google AI Studio</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-200 uppercase tracking-wider block mb-3">
              Materi Inti DigiCerdas
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>1. Pemahaman Dasar Literasi Abad-21</li>
              <li>2. Berpikir Kritis & Cek Fakta (S-A-R-I)</li>
              <li>3. Keamanan Data & Etika Upstander</li>
              <li>4. Laboratorium Prompt Generative AI</li>
              <li>5. Kompetensi Pembimbing Guru & BK</li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-slate-200 uppercase tracking-wider block mb-3">
              Konteks Kurikulum
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>Durasi: Sesi Workshop 90 Menit</li>
              <li>Target: Murid SMP, SMA & Guru</li>
              <li>Model AI: Gemini 3.8 Flash</li>
              <li>Status: Proyek Ujian Tengah Semester</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 DigiCerdas. Hak Cipta Dilindungi Undang-Undang. Pendidikan Karakter Digital Indonesia.</p>
          <p className="flex items-center gap-1">
            <span>Didedikasikan untuk kemajuan literasi generasi emas Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
