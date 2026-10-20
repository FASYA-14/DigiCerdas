export type UserRole = 'student' | 'teacher';

export type StudentTab = 'materi' | 'cek-fakta' | 'simulasi' | 'prompt-lab' | 'kuis' | 'refleksi';
export type TeacherTab = 'kurikulum-90m' | 'kompetensi' | 'matriks-bk' | 'pemantik-diskusi' | 'konsultasi-ai';

export interface ModuleSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  readTime: string;
  iconName: string;
  summary: string;
  keyPoints: string[];
  caseStudy: {
    title: string;
    description: string;
    lesson: string;
  };
  reflectiveQuestion: string;
}

export interface FactCheckItem {
  id: string;
  title: string;
  platform: 'WhatsApp' | 'Instagram' | 'X (Twitter)' | 'Portal Berita';
  source: string;
  date: string;
  textSnippet: string;
  clues: {
    urlClue: string;
    expertClue: string;
    imageContextClue: string;
  };
  correctType: 'fakta' | 'opini' | 'hoaks';
  explanation: string;
  verificationTip: string;
}

export interface SecurityOption {
  text: string;
  isBest: boolean;
  scoreDelta: number;
  consequence: string;
  counselorFeedback: string;
}

export interface SecurityScenario {
  id: string;
  title: string;
  category: 'Keamanan Data' | 'Etika & Cyberbullying' | 'Privasi Aplikasi' | 'Integritas AI';
  context: string;
  situation: string;
  options: SecurityOption[];
}

export interface QuizQuestion {
  id: number;
  moduleRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PromptAnalysisResult {
  score: number;
  pillarScores: {
    clarity: number;
    context: number;
    constraints: number;
    ethics: number;
  };
  strengths: string[];
  suggestions: string[];
  improvedPrompt: string;
  aiResponse: string;
  verificationChallenge: string;
}

export interface DigitalCommitment {
  studentName: string;
  screenTimeLimit: string;
  factCheckingHabit: boolean;
  privacySettingHabit: boolean;
  respectfulCommunicationHabit: boolean;
  ethicalAiHabit: boolean;
  personalGoal: string;
  createdDate: string;
}
