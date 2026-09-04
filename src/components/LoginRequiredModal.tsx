import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Lock, Shield, User, Mail, Briefcase, Building, ArrowRight, X, CheckCircle2, Sparkles, FileText } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  pendingFileName?: string | null;
  actionType?: 'upload' | 'link' | 'paste' | 'general';
}

const QUICK_EVALUATOR_PRESETS: Array<{
  name: string;
  email: string;
  role: string;
  subsidiary: string;
  department: string;
}> = [
  {
    name: 'K. Srivaishnav',
    email: 'srivaishnavk@gmail.com',
    role: 'Lead Exploration Geologist',
    subsidiary: 'CMPDI Regional Institute',
    department: 'Geology & Mineral Exploration Division',
  },
  {
    name: 'Dr. A. K. Sharma',
    email: 'aksharma@cmpdi.co.in',
    role: 'Chief Technical Officer',
    subsidiary: 'CMPDI HQ, Ranchi',
    department: 'Mine Planning & Resource Evaluation',
  },
  {
    name: 'Priya Mukherjee',
    email: 'pmukherjee@coalindia.in',
    role: 'Senior Mining Analyst',
    subsidiary: 'Coal India Limited (CIL)',
    department: 'Digital Operations & Production Audits',
  },
];

export const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  pendingFileName,
  actionType = 'upload',
}) => {
  const [name, setName] = useState('K. Srivaishnav');
  const [email, setEmail] = useState('srivaishnavk@gmail.com');
  const [role, setRole] = useState('Lead Exploration Geologist');
  const [subsidiary, setSubsidiary] = useState('CMPDI Regional Institute');
  const [department, setDepartment] = useState('Geology & Exploration Division');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const user: UserProfile = {
      id: `USR-${Date.now().toString(36).toUpperCase()}`,
      name: name.trim(),
      email: email.trim(),
      role: role.trim() || 'Technical Evaluator',
      subsidiary: subsidiary.trim() || 'Coal India Limited',
      department: department.trim() || 'Mining Operations & Geology',
      clearanceLevel: 'Level 3 - Authorized Evaluator',
      badge: 'Certified Assessor',
      lastLogin: 'Active Session (Verified)',
      permissions: [
        'Ingest Geological & Mining Reports',
        'Execute OCR Text & Tabular Extraction',
        'Grounded Fact Verification & Q&A',
        'Discrepancy Audit & Geologist Override',
        'Generate & Sign CMPDI Synthesis Reports',
      ],
    };

    onLogin(user);
    onClose();
  };

  const handleSelectPreset = (preset: typeof QUICK_EVALUATOR_PRESETS[0]) => {
    setName(preset.name);
    setEmail(preset.email);
    setRole(preset.role);
    setSubsidiary(preset.subsidiary);
    setDepartment(preset.department);

    const user: UserProfile = {
      id: `USR-${Date.now().toString(36).toUpperCase()}`,
      name: preset.name,
      email: preset.email,
      role: preset.role,
      subsidiary: preset.subsidiary,
      department: preset.department,
      clearanceLevel: 'Level 3 - Authorized Evaluator',
      badge: 'Certified Assessor',
      lastLogin: 'Active Session (Verified)',
      permissions: [
        'Ingest Geological & Mining Reports',
        'Execute OCR Text & Tabular Extraction',
        'Grounded Fact Verification & Q&A',
        'Discrepancy Audit & Geologist Override',
        'Generate & Sign CMPDI Synthesis Reports',
      ],
    };

    onLogin(user);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-required-title"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden transition-all my-6 text-slate-900 dark:text-slate-100">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md font-bold">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded">
                  Mandatory Authentication
                </span>
              </div>
              <h3 id="login-required-title" className="font-bold text-base sm:text-lg tracking-tight text-white">
                Login Required to Upload Documents
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You must be logged into a user account before you can upload or process mining files.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pending File Notification */}
        {pendingFileName && (
          <div className="bg-blue-50 dark:bg-blue-950/50 border-b border-blue-200 dark:border-blue-900/80 p-3 px-5 flex items-center gap-2.5 text-xs text-blue-900 dark:text-blue-200">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="truncate flex-1">
              <span className="font-semibold">File ready to upload:</span>{' '}
              <span className="font-mono bg-blue-100/70 dark:bg-blue-900/50 px-1.5 py-0.5 rounded text-[11px]">
                {pendingFileName}
              </span>
            </div>
            <span className="text-[10px] bg-blue-200/80 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-bold shrink-0">
              Pending Sign-In
            </span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Why Login Banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Private Account Storage & Audit Trail</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Uploaded geological documents, drill logs, and extracted assay tables are saved directly within your user account workspace. Sign in below to begin your upload.
            </p>
          </div>

          {/* 1-Click Demo Profiles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Sign-In (1-Click Presets)</span>
              </span>
              <span className="text-[10px] text-slate-400">Click to sign in instantly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {QUICK_EVALUATOR_PRESETS.map((preset) => (
                <button
                  key={preset.email}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition cursor-pointer group shadow-2xs"
                >
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {preset.role.split(' ')[0]} {preset.role.split(' ')[1] || ''}
                  </div>
                  <div className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold mt-1 flex items-center gap-1">
                    <span>Sign in</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">
              Or Custom Sign-In Details
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., K. Srivaishnav"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., srivaishnavk@gmail.com"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Designation / Role</span>
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Lead Geologist"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Organization</span>
                </label>
                <input
                  type="text"
                  value={subsidiary}
                  onChange={(e) => setSubsidiary(e.target.value)}
                  placeholder="e.g., CMPDI RI / CIL"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sign In & Continue Upload</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
