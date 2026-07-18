import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Chrome, Shield, Sparkles, LogIn, ArrowRight, 
  CheckCircle2, RefreshCw, User, Briefcase, Mail, AlertTriangle
} from 'lucide-react';

interface UserData {
  email: string;
  name: string;
  workspace: string;
}

interface DashboardLoginGateProps {
  onLogin: (user: UserData) => void;
}

export function DashboardLoginGate({ onLogin }: DashboardLoginGateProps) {
  const [showOAuthModal, setShowOAuthModal] = useState(false);
  const [oauthStep, setOauthStep] = useState<'select' | 'custom' | 'workspace_confirm' | 'loading'>('select');
  
  // Custom Google Account Inputs
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customWorkspace, setCustomWorkspace] = useState('');
  
  // Confirmed details state during OAuth flow
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState('VelorOps Studio');

  const [handshakeLogs, setHandshakeLogs] = useState<string[]>([]);
  const [isHandshaking, setIsHandshaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default pre-approved user account from environment metadata
  const defaultGoogleAccount = {
    email: 'velorops@gmail.com',
    name: 'VelorOps Admin',
    workspace: 'VelorOps Studio'
  };

  const handleSelectDefaultAccount = () => {
    setSelectedEmail(defaultGoogleAccount.email);
    setSelectedName(defaultGoogleAccount.name);
    setSelectedWorkspace(defaultGoogleAccount.workspace);
    setOauthStep('workspace_confirm');
  };

  const handleCustomAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customEmail || !customName) {
      setError('Google Email and Full Name are required.');
      return;
    }

    if (!customEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSelectedEmail(customEmail.trim());
    setSelectedName(customName.trim());
    setSelectedWorkspace(customWorkspace.trim() || `${customName.trim()}'s Workspace`);
    setOauthStep('workspace_confirm');
  };

  const handleExecuteOAuth = () => {
    setOauthStep('loading');
    setIsHandshaking(true);
    setError(null);

    const logs = [
      `[${new Date().toLocaleTimeString()}] Redirecting token handshake to accounts.google.com...`,
      `[${new Date().toLocaleTimeString()}] Fetching OAuth2 Client Configuration...`,
    ];
    setHandshakeLogs(logs);

    setTimeout(() => {
      setHandshakeLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Access token granted under openid, email, and profile scopes.`,
        `[${new Date().toLocaleTimeString()}] Exchanging cryptographic Authorization Code for access_token...`
      ]);
    }, 600);

    setTimeout(() => {
      setHandshakeLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Querying Google UserInfo endpoint for profile validation...`,
        `[${new Date().toLocaleTimeString()}] Authentication Success! User: ${selectedEmail}`
      ]);
    }, 1300);

    setTimeout(() => {
      setHandshakeLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Initializing workspace: "${selectedWorkspace}"`,
        `[${new Date().toLocaleTimeString()}] Decrypting secure local environment keys...`
      ]);
    }, 1900);

    setTimeout(() => {
      setIsHandshaking(false);
      const loggedUser = {
        email: selectedEmail,
        name: selectedName,
        workspace: selectedWorkspace
      };
      
      // Save user log state to localStorage
      localStorage.setItem('logged_in_user', JSON.stringify(loggedUser));
      
      // Add or update registered users collection in localStorage
      const savedUsers = localStorage.getItem('registered_users');
      let usersList = [];
      if (savedUsers) {
        try {
          usersList = JSON.parse(savedUsers);
        } catch {
          usersList = [];
        }
      }
      if (!usersList.some((u: any) => u.email.toLowerCase() === selectedEmail.toLowerCase())) {
        usersList.push({
          email: selectedEmail,
          name: selectedName,
          workspace: selectedWorkspace,
          password: 'google_authorized'
        });
        localStorage.setItem('registered_users', JSON.stringify(usersList));
      }

      onLogin(loggedUser);
    }, 2600);
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-zinc-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden select-none">
      {/* Background Decorative Tech Spheres & Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1b1e2e_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex h-12 w-12 rounded-xl bg-indigo-600 items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-600/20 mb-3"
          >
            VO
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-white tracking-tight"
          >
            VELOROPS OS CONSOLE
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xs text-zinc-400 mt-1 font-medium"
          >
            Secure workspace validation powered by Google Identity Services
          </motion.p>
        </div>

        {/* Unified Login Card */}
        <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full text-[10px] text-indigo-400 font-bold tracking-wider uppercase mb-3">
                <Shield className="w-3 h-3" />
                <span>Single Sign-On (SSO) Gate</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Access Control</h3>
              <p className="text-xs text-zinc-400 mt-1">Authenticate your session instantly using Google Workspace.</p>
            </div>

            {/* Google Authentication Button Area */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setOauthStep('select');
                  setShowOAuthModal(true);
                  setError(null);
                }}
                className="w-full bg-white hover:bg-zinc-100 text-zinc-900 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-3 shadow-lg shadow-white/5 active:scale-[0.98]"
              >
                {/* Simulated Google Color Icon */}
                <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full p-0.5">
                  <Chrome className="w-4 h-4 text-indigo-600 shrink-0" />
                </span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOauthStep('custom');
                  setShowOAuthModal(true);
                  setError(null);
                }}
                className="w-full bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-300 py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                <span>Register Workspace via Google</span>
              </button>
            </div>

            <div className="border-t border-zinc-800/60 pt-4 text-center">
              <span className="text-[10px] text-zinc-500 block leading-normal">
                By entering the console, you authorize VelorOps to synchronize your scheduled videos and page playlists directly with your Meta and Google account integrations.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== HIGH FIDELITY SIMULATED GOOGLE OAUTH POPUP MODAL ==================== */}
      <AnimatePresence>
        {showOAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isHandshaking) setShowOAuthModal(false);
              }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Simulated Google Sign-In Window */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-white text-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden relative z-10 flex flex-col font-sans"
            >
              {/* Fake Browser Titlebar */}
              <div className="bg-zinc-100 border-b border-zinc-200 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-[10px] font-medium text-zinc-500 font-mono select-all">accounts.google.com/o/oauth2/auth</span>
                <span className="w-3"></span>
              </div>

              {/* Fake Google Header */}
              <div className="px-6 py-8 text-center border-b border-zinc-100">
                <div className="flex justify-center mb-3">
                  <div className="flex items-center gap-1 text-lg font-black tracking-tight select-none">
                    <span className="text-blue-600 font-bold">G</span>
                    <span className="text-red-500 font-bold">o</span>
                    <span className="text-yellow-500 font-bold">o</span>
                    <span className="text-blue-500 font-bold">g</span>
                    <span className="text-green-500 font-bold">l</span>
                    <span className="text-red-600 font-bold">e</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-zinc-800 tracking-tight">Sign in with Google</h4>
                <p className="text-xs text-zinc-500 mt-1">to continue to <strong className="text-zinc-700">VelorOps OS Console</strong></p>
              </div>

              {/* OAuth Content Body */}
              <div className="p-6 flex-1 bg-zinc-50/50">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: SELECT ACCOUNT */}
                  {oauthStep === 'select' && (
                    <motion.div
                      key="select"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Use pre-approved developer account</span>

                      {/* Default environmental account button */}
                      <button
                        type="button"
                        onClick={handleSelectDefaultAccount}
                        className="w-full text-left bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 p-3.5 rounded-xl transition-all flex items-center justify-between group shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-600/10 text-indigo-600 font-bold flex items-center justify-center text-xs border border-indigo-200">
                            VO
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-zinc-800 group-hover:text-indigo-600 transition-colors">{defaultGoogleAccount.name}</span>
                            <span className="block text-[10px] text-zinc-500 font-medium">{defaultGoogleAccount.email}</span>
                          </div>
                        </div>
                        <div className="bg-zinc-100 group-hover:bg-indigo-50 border border-zinc-200/50 rounded-lg p-1 px-2 text-[9px] text-zinc-600 font-bold uppercase tracking-wider transition-colors shrink-0">
                          Active User
                        </div>
                      </button>

                      <div className="relative flex items-center justify-center py-2">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200"></div></div>
                        <span className="relative bg-zinc-50 px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">or</span>
                      </div>

                      {/* Custom input activator */}
                      <button
                        type="button"
                        onClick={() => setOauthStep('custom')}
                        className="w-full py-3 border border-dashed border-zinc-300 hover:border-zinc-400 bg-white hover:bg-zinc-50/30 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-800 transition-all text-center flex items-center justify-center gap-2"
                      >
                        <User className="w-4 h-4 text-zinc-400" />
                        <span>Use another Google Account</span>
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: CUSTOM GOOGLE SIGN IN */}
                  {oauthStep === 'custom' && (
                    <motion.form
                      key="custom"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onSubmit={handleCustomAccountSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Google Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 text-zinc-400 w-4 h-4" />
                          <input 
                            type="email"
                            required
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                            placeholder="e.g. name@gmail.com"
                            className="w-full bg-white border border-zinc-200 focus:border-blue-500 pl-9 pr-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 text-zinc-400 w-4 h-4" />
                            <input 
                              type="text"
                              required
                              value={customName}
                              onChange={(e) => setCustomName(e.target.value)}
                              placeholder="Elena Rostova"
                              className="w-full bg-white border border-zinc-200 focus:border-blue-500 pl-9 pr-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Workspace Name</label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 text-zinc-400 w-4 h-4" />
                            <input 
                              type="text"
                              value={customWorkspace}
                              onChange={(e) => setCustomWorkspace(e.target.value)}
                              placeholder="e.g. Paramount Growth"
                              className="w-full bg-white border border-zinc-200 focus:border-blue-500 pl-9 pr-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-400"
                            />
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg text-[11px] font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setOauthStep('select')}
                          className="text-xs font-semibold text-zinc-500 hover:text-zinc-700 py-2 transition-all"
                        >
                          Back to Selector
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md shadow-blue-500/10 transition-all flex items-center gap-1.5"
                        >
                          <span>Sign Up with Google</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* STEP 3: WORKSPACE INITIALIZATION CONFIRMATION */}
                  {oauthStep === 'workspace_confirm' && (
                    <motion.div
                      key="workspace_confirm"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="space-y-5"
                    >
                      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl space-y-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Confirm Authorized Workspace Settings</span>
                        
                        <div className="space-y-1 text-xs text-zinc-700 leading-normal">
                          <p>You are authorizing <strong className="text-zinc-800">VelorOps OS Console</strong> to access:</p>
                          <ul className="list-disc list-inside space-y-1 pl-1 font-medium text-zinc-600 text-[11px]">
                            <li>Google account profile metadata ({selectedEmail})</li>
                            <li>Direct publishing pipelines to paired social media Pages</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Workspace Console Name</label>
                        <input 
                          type="text"
                          required
                          value={selectedWorkspace}
                          onChange={(e) => setSelectedWorkspace(e.target.value)}
                          placeholder="Acme Agency Studio"
                          className="w-full bg-white border border-zinc-200 focus:border-blue-500 px-3.5 py-2.5 rounded-lg text-xs font-bold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-[10px] text-zinc-400 block pt-0.5 leading-normal">
                          You can change this workspace name anytime later from the Console Settings module.
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setOauthStep('select')}
                          className="text-xs font-semibold text-zinc-500 hover:text-zinc-700 py-2 transition-all"
                        >
                          Cancel Sign-In
                        </button>
                        <button
                          type="button"
                          onClick={handleExecuteOAuth}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
                        >
                          <span>Confirm & Launch Console</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: OAUTH HANDSHAKE LOADING FLOW */}
                  {oauthStep === 'loading' && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 py-4"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                        <span className="text-xs font-bold text-zinc-700 animate-pulse">Exchanging credentials with accounts.google.com...</span>
                      </div>

                      {/* Live OAuth Handshake System Logs */}
                      <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between text-[9px] font-bold text-zinc-500 font-mono tracking-wide uppercase border-b border-zinc-800 pb-1.5">
                          <span>Secure Handshake Monitor</span>
                          <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping"></span>
                        </div>
                        <div className="font-mono text-[9px] text-blue-400 space-y-1 max-h-[120px] overflow-y-auto">
                          {handshakeLogs.map((log, i) => (
                            <div key={i} className="leading-relaxed">{log}</div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Fake Google Footer */}
              <div className="bg-zinc-100 border-t border-zinc-200 px-6 py-4 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="font-medium">Secure Verification Tunnel</span>
                <span className="font-mono text-[10px] bg-zinc-200/50 px-2 py-0.5 rounded text-zinc-600">TLS 1.3 AES-256</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
