/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, StudentTab, TeacherTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LearningCenter } from './components/LearningCenter';
import { FactCheckChallenge } from './components/FactCheckChallenge';
import { SecuritySimulation } from './components/SecuritySimulation';
import { PromptLab } from './components/PromptLab';
import { TeacherPortal } from './components/TeacherPortal';
import { QuizCenter } from './components/QuizCenter';
import { ReflectionCenter } from './components/ReflectionCenter';
import { Footer } from './components/Footer';

export default function App() {
  const [role, setRole] = useState<UserRole>('student');
  const [studentTab, setStudentTab] = useState<StudentTab>('materi');
  const [teacherTab, setTeacherTab] = useState<TeacherTab>('kurikulum-90m');

  // Stored state for progress and certificate
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('digicerdas_completed_modules');
      return saved ? JSON.parse(saved) : ['materi-1'];
    } catch {
      return ['materi-1'];
    }
  });

  const [quizScore, setQuizScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('digicerdas_quiz_score');
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem('digicerdas_student_name') || 'Fasya Rahmawati';
    } catch {
      return 'Fasya Rahmawati';
    }
  });

  const [schoolName, setSchoolName] = useState<string>(() => {
    try {
      return localStorage.getItem('digicerdas_school_name') || 'SMP / SMA Negeri 1 DigiCerdas';
    } catch {
      return 'SMP / SMA Negeri 1 DigiCerdas';
    }
  });

  const [hasCommitment, setHasCommitment] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('digicerdas_digital_pledge'));
    } catch {
      return false;
    }
  });

  // Persist name & school
  useEffect(() => {
    try {
      localStorage.setItem('digicerdas_student_name', studentName);
    } catch {}
  }, [studentName]);

  useEffect(() => {
    try {
      localStorage.setItem('digicerdas_school_name', schoolName);
    } catch {}
  }, [schoolName]);

  const handleToggleCompleteModule = (moduleId: string) => {
    setCompletedModules((prev) => {
      const updated = prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId];
      localStorage.setItem('digicerdas_completed_modules', JSON.stringify(updated));
      return updated;
    });
  };

  const handleQuizCompleted = (score: number) => {
    setQuizScore(score);
    localStorage.setItem('digicerdas_quiz_score', String(score));
  };

  const handleCommitmentSaved = () => {
    setHasCommitment(true);
  };

  // Calculate overall percentage progress (0 - 100%)
  const modulesScore = (completedModules.length / 5) * 50; // max 50%
  const testScore = quizScore !== null ? 25 : 0; // 25%
  const pledgeScore = hasCommitment ? 25 : 0; // 25%
  const totalProgress = Math.min(100, Math.round(modulesScore + testScore + pledgeScore));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Navbar
        role={role}
        setRole={setRole}
        studentTab={studentTab}
        setStudentTab={setStudentTab}
        teacherTab={teacherTab}
        setTeacherTab={setTeacherTab}
        progressPercent={totalProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          role={role}
          setRole={setRole}
          onStartLearning={() => {
            setRole('student');
            setStudentTab('materi');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
        />

        {/* Dynamic Content Views */}
        {role === 'student' ? (
          <div>
            {studentTab === 'materi' && (
              <LearningCenter
                completedModules={completedModules}
                onToggleCompleteModule={handleToggleCompleteModule}
                onNavigateToTab={(tab: StudentTab) => setStudentTab(tab)}
              />
            )}

            {studentTab === 'cek-fakta' && <FactCheckChallenge />}

            {studentTab === 'simulasi' && <SecuritySimulation />}

            {studentTab === 'prompt-lab' && <PromptLab />}

            {studentTab === 'kuis' && (
              <QuizCenter
                studentName={studentName}
                setStudentName={setStudentName}
                schoolName={schoolName}
                setSchoolName={setSchoolName}
                onQuizCompleted={handleQuizCompleted}
              />
            )}

            {studentTab === 'refleksi' && (
              <ReflectionCenter
                studentName={studentName}
                setStudentName={setStudentName}
                onCommitmentSaved={handleCommitmentSaved}
              />
            )}
          </div>
        ) : (
          <TeacherPortal
            activeTab={teacherTab}
            onTabChange={(tab: TeacherTab) => setTeacherTab(tab)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
