import React from 'react';
import { UserRole, StudentTab, TeacherTab } from '../types';
import { Shield, BookOpen, CheckCircle2, User, GraduationCap } from 'lucide-react';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  studentTab: StudentTab;
  setStudentTab: (tab: StudentTab) => void;
  teacherTab: TeacherTab;
  setTeacherTab: (tab: TeacherTab) => void;
  progressPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  role,
  setRole,
  studentTab,
  setStudentTab,
  teacherTab,
  setTeacherTab,
  progressPercent,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">DigiCerdas</span>
                <span className="text-xs text-teal-800 font-medium">· Literasi AI & BK</span>
              </div>
              <p className="text-xs text-slate-700 hidden sm:block">Digital Cerdas dan Bertanggung Jawab</p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'student'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Portal Murid</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'teacher'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal Guru & BK</span>
            </button>
          </div>

          {/* Quick Progress Indicator */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <span className="text-xs text-slate-700 block">Progres Pelatihan</span>
              <span className="text-xs font-bold text-teal-800">{progressPercent}% Tuntas</span>
            </div>
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-600 to-indigo-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 border-t border-slate-100 scrollbar-none text-xs font-medium">
          {role === 'student' ? (
            <>
              <button
                type="button"
                onClick={() => setStudentTab('materi')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  studentTab === 'materi'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                1. Pusat Materi (5 Modul)
              </button>
              <button
                type="button"
                onClick={() => setStudentTab('cek-fakta')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  studentTab === 'cek-fakta'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                2. Tantangan Cek Fakta
              </button>
              <button
                type="button"
                onClick={() => setStudentTab('simulasi')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  studentTab === 'simulasi'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                3. Simulasi Keamanan
              </button>
              <button
                type="button"
                onClick={() => setStudentTab('prompt-lab')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  studentTab === 'prompt-lab'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                4. Laboratorium AI
              </button>
              <button
                type="button"
                onClick={() => setStudentTab('kuis')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  studentTab === 'kuis'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                5. Kuis & Sertifikat
              </button>
              <button
                type="button"
                onClick={() => setStudentTab('refleksi')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  studentTab === 'refleksi'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                6. Refleksi & Komitmen
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setTeacherTab('kurikulum-90m')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  teacherTab === 'kurikulum-90m'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Rundown 90 Menit Sesi
              </button>
              <button
                type="button"
                onClick={() => setTeacherTab('kompetensi')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  teacherTab === 'kompetensi'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                5 Kompetensi Pembimbing
              </button>
              <button
                type="button"
                onClick={() => setTeacherTab('matriks-bk')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  teacherTab === 'matriks-bk'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Matriks Kasus & Eskalasi BK
              </button>
              <button
                type="button"
                onClick={() => setTeacherTab('pemantik-diskusi')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  teacherTab === 'pemantik-diskusi'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Bank Pemantik Diskusi
              </button>
              <button
                type="button"
                onClick={() => setTeacherTab('konsultasi-ai')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  teacherTab === 'konsultasi-ai'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Konsultan Kasus AI (BK)
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
