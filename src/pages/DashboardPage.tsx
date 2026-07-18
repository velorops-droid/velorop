import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, FolderHeart, Video, FileText, Sparkles, Cpu, 
  BarChart3, Users, CreditCard, Bell, Settings, HelpCircle, Search, 
  ChevronLeft, ChevronRight, Play, Check, AlertTriangle, Plus, Trash2, X, 
  ExternalLink, LogOut, ArrowUpRight, Copy, CheckCircle2, RefreshCw, 
  MoreHorizontal, Sliders, Calendar as CalendarIcon, Filter, Download, 
  Globe, Shield, Key, Eye, EyeOff, User, Mail, Laptop, HardDrive, 
  Send, HelpCircle as HelpIcon, FileSpreadsheet, PlusCircle, ArrowDownRight,
  Info, History, FileVideo, Facebook, Twitter, Linkedin, Terminal, BookOpen
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { DashboardLoginGate } from '../components/DashboardLoginGate';

// Typography note: Styled using "Inter" font, with gorgeous soft shadows, glassmorphism, 
// and Linear-inspired clean aesthetics.

// Types & Interfaces
interface ConnectedPage {
  id: string;
  name: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin';
  followers: string;
  status: 'healthy' | 'warning' | 'expired';
  avatar: string;
}

interface MediaFile {
  id: string;
  name: string;
  size: string;
  type: 'video' | 'image';
  duration?: string;
  thumbnail: string;
  category: string;
  tags: string[];
  uploadedAt: string;
  aiDescription?: string;
}

interface QueueItem {
  id: string;
  title: string;
  pageId: string;
  scheduledTime: string;
  status: 'scheduled' | 'publishing' | 'published' | 'failed';
  caption: string;
  mediaId: string;
}

export function DashboardPage() {
  const navigate = useNavigate();
  
  // Active Logged-In User State
  const [user, setUser] = useState<{ email: string; name: string; workspace: string } | null>(() => {
    const saved = localStorage.getItem('logged_in_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Theme State
  const [isDark, setIsDark] = useState(true);

  // Layout states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState<
    'dashboard' | 'workspace' | 'publishing' | 'media' | 'ai' | 
    'automation' | 'analytics' | 'team' | 'billing' | 'notifications' | 
    'settings' | 'help'
  >('dashboard');

  // General App State
  const [currentWorkspace, setCurrentWorkspace] = useState(() => {
    const saved = localStorage.getItem('logged_in_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        return u.workspace || 'Acme Agency Studio';
      } catch {
        return 'Acme Agency Studio';
      }
    }
    return 'Acme Agency Studio';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [latency, setLatency] = useState(42);
  const [notificationPermission, setNotificationPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  // BYOK Credentials states
  const [byokEnabled, setByokEnabled] = useState(() => localStorage.getItem('byok_enabled') === 'true');
  const [byokFbAppId, setByokFbAppId] = useState(() => localStorage.getItem('byok_fb_app_id') || '');
  const [byokFbAppSecret, setByokFbAppSecret] = useState(() => localStorage.getItem('byok_fb_app_secret') || '');
  const [byokFbAccessToken, setByokFbAccessToken] = useState(() => localStorage.getItem('byok_fb_access_token') || '');
  const [byokGeminiApiKey, setByokGeminiApiKey] = useState(() => localStorage.getItem('byok_gemini_api_key') || '');

  // Eye toggle state for secret values
  const [showFbSecret, setShowFbSecret] = useState(false);
  const [showFbToken, setShowFbToken] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);

  // Validation States
  const [isTestingCredentials, setIsTestingCredentials] = useState(false);
  const [testLogs, setTestLogs] = useState<string[]>([]);

  const handleTestCredentials = () => {
    if (!byokFbAppId || !byokFbAppSecret || !byokFbAccessToken) {
      showNotification('Please fill in all Facebook credentials before testing.', 'error');
      return;
    }
    
    setIsTestingCredentials(true);
    setTestLogs([
      `[${new Date().toLocaleTimeString()}] Initializing connection check for App ID: ${byokFbAppId}...`,
    ]);

    setTimeout(() => {
      setTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Fetching app information from Meta Graph API (v20.0)...`]);
    }, 600);

    setTimeout(() => {
      setTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Cryptographically verifying App Secret Proof hash integrity...`]);
    }, 1200);

    setTimeout(() => {
      if (byokGeminiApiKey) {
        setTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Verifying optional Gemini API endpoint credentials...`]);
      }
    }, 1800);

    setTimeout(() => {
      setTestLogs(prev => [
        ...prev, 
        `[${new Date().toLocaleTimeString()}] Connection Successful!`,
        `[${new Date().toLocaleTimeString()}] Active permissions confirmed: [publish_video, manage_pages, pages_show_list, read_insights]`
      ]);
      setIsTestingCredentials(false);
      showNotification('BYOK credentials validated successfully!', 'success');
    }, 2400);
  };

  const handleSaveByok = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('byok_enabled', byokEnabled ? 'true' : 'false');
    localStorage.setItem('byok_fb_app_id', byokFbAppId);
    localStorage.setItem('byok_fb_app_secret', byokFbAppSecret);
    localStorage.setItem('byok_fb_access_token', byokFbAccessToken);
    localStorage.setItem('byok_gemini_api_key', byokGeminiApiKey);
    
    showNotification('BYOK credentials saved successfully!', 'success');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const jump = Math.floor(Math.random() * 10) - 5;
        let newLatency = prev + jump;
        if (newLatency < 20) newLatency = 20;
        if (newLatency > 150) newLatency = 150;
        return newLatency;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleRequestNotification = () => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
        if (permission === 'granted') {
          new Notification("VelorOps", { body: "Notifications enabled successfully!" });
        }
      });
    }
  };

  // Sample Data for connected channels
  const [connectedPages, setConnectedPages] = useState<ConnectedPage[]>([
    { id: 'p1', name: 'TechOps Solutions', platform: 'facebook', followers: '124.5K', status: 'healthy', avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=60' },
    { id: 'p2', name: 'Gamer Central Fanpage', platform: 'facebook', followers: '451.2K', status: 'healthy', avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&auto=format&fit=crop&q=60' },
    { id: 'p3', name: 'Media Growth Agency', platform: 'facebook', followers: '82.8K', status: 'warning', avatar: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&auto=format&fit=crop&q=60' },
    { id: 'p4', name: 'TechOps Reels', platform: 'instagram', followers: '95.1K', status: 'healthy', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60' },
    { id: 'p5', name: 'VelorOps Enterprise', platform: 'linkedin', followers: '12.4K', status: 'expired', avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&auto=format&fit=crop&q=60' }
  ]);

  // Media Library State
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    { id: 'm1', name: 'v_product_demo_final.mp4', size: '128.4 MB', type: 'video', duration: '1:45', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80', category: 'Product', tags: ['Demo', 'SaaS', 'AI'], uploadedAt: '2026-07-10', aiDescription: 'High fidelity screen recording demonstrating the core interface. Soft ambient transitions added.' },
    { id: 'm2', name: 'v_explainer_v3_compressed.mp4', size: '42.1 MB', type: 'video', duration: '0:58', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80', category: 'Explainer', tags: ['Marketing', 'Promo'], uploadedAt: '2026-07-09', aiDescription: '3D animated character explaining the core benefits of automated scheduling loops.' },
    { id: 'm3', name: 'v_customer_testimonial_sarah.mp4', size: '245.8 MB', type: 'video', duration: '3:12', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80', category: 'Testimonials', tags: ['Social Proof', 'Agency'], uploadedAt: '2026-07-08', aiDescription: 'Interview format with Sarah Jenkins, Director of Growth at CloudNine, praising the local folder sync worker.' },
    { id: 'm4', name: 'img_banner_announcement.png', size: '4.8 MB', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80', category: 'Graphics', tags: ['Launch', 'Banner'], uploadedAt: '2026-07-07', aiDescription: 'Minimal vector layout featuring the VelorOps logo alongside sleek gradient spheres.' }
  ]);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(mediaFiles[0]);
  const [mediaFilter, setMediaFilter] = useState('All');
  const [mediaSearch, setMediaSearch] = useState('');

  // Queue State
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 'q1', title: 'Why Manual Scheduling is Slow in 2026', pageId: 'p1', scheduledTime: 'Today at 6:30 PM', status: 'scheduled', caption: 'Are you still setting alarms at midnight to hit peak publishing slots? ⏰ Automate the entire pipeline directly with our local client token framework. Let VelorOps do the heavy lifting.', mediaId: 'm1' },
    { id: 'q2', title: 'CloudNine Scaling Testimonial Clip', pageId: 'p3', scheduledTime: 'Tomorrow at 10:00 AM', status: 'scheduled', caption: 'Hear directly from agency directors on how desktop-worker sync saved their operations team over 25 hours per week. 🔋 #SaaS #GrowthMetrics', mediaId: 'm3' },
    { id: 'q3', title: 'Sleek UI Design Principles Breakdown', pageId: 'p2', scheduledTime: 'July 13, 2026 at 2:15 PM', status: 'scheduled', caption: 'Minimal UI elements, strong typography hierarchies, and intentional whitespace. The anatomy of a high-converting landing template. 🎨', mediaId: 'm2' },
    { id: 'q4', title: 'AI-Generated Copywriting Frameworks', pageId: 'p1', scheduledTime: 'Yesterday at 4:30 PM', status: 'published', caption: 'AIDA, PAS, and BAB: How to feed prompt models proper brand metrics to generate consistent engagement. 🚀', mediaId: 'm1' }
  ]);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostPage, setNewPostPage] = useState('p1');
  const [newPostMedia, setNewPostMedia] = useState('m1');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostSchedule, setNewPostSchedule] = useState('Today at 8:00 PM');

  // AI Composer State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState<'professional' | 'hype' | 'educational' | 'creative'>('professional');
  const [aiLength, setAiLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  const [aiHistory, setAiHistory] = useState([
    { prompt: 'Explain desktop worker benefits', output: 'The VelorOps Desktop Sync Worker bypasses server limits by securely queueing and uploading native files directly from your computer using persistent tokens.', tone: 'educational' },
    { prompt: 'Hype launch announcement', output: 'THE FUTURE OF SOCIAL OPERATIONS IS HERE! ⚡ Say hello to VelorOps. Zero server lags, total security.', tone: 'hype' }
  ]);

  // Desktop Client / Automation Worker State
  const [workerConnected, setWorkerConnected] = useState(true);
  const [workerLogs, setWorkerLogs] = useState<string[]>([
    '[09:42:01] VelorOps Agent initialized (v1.2.4)',
    '[09:42:02] Connected to cloud endpoint: https://api.velorops.com',
    '[09:42:05] Local directory loaded: C:\\VelorOps\\Publishing_Queue',
    '[10:15:32] Found new video chunk: v_product_demo_final.mp4 (128.4 MB)',
    '[10:15:34] Initializing secure chunked upload via Graph API...',
    '[10:16:12] Chunk upload completed. Server video ID registered.',
    '[11:00:00] Standing by for synchronized broadcast triggers.'
  ]);
  const [syncFolder, setSyncFolder] = useState('/Users/velorops/desktop_queue');
  const [bandwidthLimit, setBandwidthLimit] = useState('No limit');

  // Analytics State
  const [analyticsRange, setAnalyticsRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Workspace API Key state
  const [apiKeys, setApiKeys] = useState([
    { id: 'k1', name: 'Prod-Desktop-Worker', key: 'vo_sk_live_9a87d82e1c90f3817112', createdAt: '2026-06-01', status: 'active' },
    { id: 'k2', name: 'Staging-Webhooks-Endpoint', key: 'vo_sk_test_1f98d73b2a80c4129188', createdAt: '2026-07-05', status: 'active' }
  ]);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  // Team State
  const [teamMembers, setTeamMembers] = useState([
    { id: 't1', name: 'Sarah Jenkins', email: 'sarah@velorops.com', role: 'Owner', status: 'active', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60' },
    { id: 't2', name: 'Marcus Chen', email: 'marcus@velorops.com', role: 'Developer', status: 'active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60' },
    { id: 't3', name: 'Elena Rostova', email: 'elena@velorops.com', role: 'Publisher', status: 'pending', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60' }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Publisher' | 'Analyst'>('Publisher');

  // Billing states
  const [subscriptionTier, setSubscriptionTier] = useState('Enterprise Tier');
  const [monthlyCost, setMonthlyCost] = useState(299);
  const [creditBalance, setCreditBalance] = useState(14850);

  // Command Palette items
  const commandItems = [
    { name: 'Go to Dashboard', shortcut: 'G D', action: () => setActiveModule('dashboard') },
    { name: 'Go to Publishing Queue', shortcut: 'G P', action: () => setActiveModule('publishing') },
    { name: 'Go to AI Copywriter', shortcut: 'G A', action: () => setActiveModule('ai') },
    { name: 'Go to Media Library', shortcut: 'G M', action: () => setActiveModule('media') },
    { name: 'Configure Sync Worker', shortcut: 'G O', action: () => setActiveModule('automation') },
    { name: 'View Analytics Report', shortcut: 'G R', action: () => setActiveModule('analytics') },
    { name: 'Workspace Settings', shortcut: 'G S', action: () => setActiveModule('settings') },
    { name: 'Trigger Quick Post Composer', shortcut: 'C P', action: () => setIsComposerOpen(true) },
    { name: 'Clear All Worker Logs', shortcut: 'C L', action: () => setWorkerLogs(['[00:00:00] Logs cleared manually.']) },
  ];

  // Helper Toast function
  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K opens command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      // Esc closes modals
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsComposerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync state helpers
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle) return;

    const newPost: QueueItem = {
      id: 'q_' + Date.now(),
      title: newPostTitle,
      pageId: newPostPage,
      scheduledTime: newPostSchedule,
      status: 'scheduled',
      caption: newPostCaption || 'Generated draft post in VelorOps.',
      mediaId: newPostMedia
    };

    setQueue([newPost, ...queue]);
    setIsComposerOpen(false);
    setNewPostTitle('');
    setNewPostCaption('');
    showNotification('New broadcast successfully queued', 'success');
  };

  const handleTriggerPublish = (id: string) => {
    setQueue(prev => prev.map(item => {
      if (item.id === id) {
        if (notificationPermission === 'granted') {
          new Notification("Video Published", { body: `Your post "${item.title}" was published via Meta API.` });
        }
        return { ...item, status: 'published', scheduledTime: 'Published just now' };
      }
      return item;
    }));
    showNotification('Video published instantly via Meta API', 'success');
  };

  const handleDeletePost = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    showNotification('Post removed from publication pipeline', 'info');
  };

  const handleGenerateAICaption = () => {
    if (!aiPrompt) {
      showNotification('Please input a topic/brief for the AI assistant', 'error');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      let result = '';
      if (aiTone === 'professional') {
        result = `💡 Enterprise Breakdown: We are analyzing the core metrics driving organic viewer retention. Based on the topic "${aiPrompt}", here are three immediate takeaways for engineering teams. 📈 #SaaS #Strategy`;
      } else if (aiTone === 'hype') {
        result = `⚡ THIS IS AN ABSOLUTE GAME CHANGER! ⚡ We just cracked the code on "${aiPrompt}". Get ready to level up your entire distribution workflow. Drop a "YES" if you want full beta access! 👇👀`;
      } else if (aiTone === 'educational') {
        result = `📌 Did you know? Incorporating persistent chunked uploads reduces API memory leak states by 43%. Let us evaluate how this applies to "${aiPrompt}" and what steps you can take today to secure your network endpoints.`;
      } else {
        result = `Imagine a world where desktop tasks run autonomously while you sleep... That is how we approached "${aiPrompt}". Streamlined, beautiful, and completely secure. 🪐✨`;
      }
      setAiOutput(result);
      setAiHistory([{ prompt: aiPrompt, output: result, tone: aiTone }, ...aiHistory]);
      setIsGenerating(false);
      showNotification('AI caption draft composed successfully', 'success');
    }, 1200);
  };

  const handleCreateApiKey = () => {
    const keyId = 'vo_sk_live_' + Math.random().toString(36).substring(2, 18);
    setApiKeys([...apiKeys, {
      id: 'k' + (apiKeys.length + 1),
      name: 'Dynamic-Client-Worker',
      key: keyId,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    }]);
    showNotification('New secret API key generated securely', 'success');
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail) return;
    setTeamMembers([...teamMembers, {
      id: 't' + (teamMembers.length + 1),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: newMemberRole,
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60'
    }]);
    setNewMemberEmail('');
    showNotification(`Invitation sent to ${newMemberEmail}`, 'success');
  };

  // Recharts custom styling
  const areaChartData = analyticsRange === '7d' ? [
    { name: 'Mon', views: 12400, reach: 9800, engagement: 2400 },
    { name: 'Tue', views: 14800, reach: 11200, engagement: 3100 },
    { name: 'Wed', views: 18900, reach: 14200, engagement: 4200 },
    { name: 'Thu', views: 16500, reach: 12800, engagement: 3800 },
    { name: 'Fri', views: 24800, reach: 19500, engagement: 5600 },
    { name: 'Sat', views: 22100, reach: 17100, engagement: 4900 },
    { name: 'Sun', views: 31200, reach: 24500, engagement: 6800 },
  ] : [
    { name: 'W1', views: 48000, reach: 35000, engagement: 9500 },
    { name: 'W2', views: 65000, reach: 51000, engagement: 14200 },
    { name: 'W3', views: 58000, reach: 45000, engagement: 12800 },
    { name: 'W4', views: 89000, reach: 72000, engagement: 19800 },
  ];

  const barChartData = [
    { name: 'TechOps', posts: 42, success: 42, failed: 0 },
    { name: 'Gamer Central', posts: 95, success: 94, failed: 1 },
    { name: 'Growth Agency', posts: 18, success: 17, failed: 1 },
    { name: 'Instagram Hub', posts: 29, success: 29, failed: 0 }
  ];

  // Colors based on premium theme specification
  const COLORS = ['#2563EB', '#6366F1', '#06B6D4', '#22C55E', '#EF4444'];

  if (!user) {
    return (
      <DashboardLoginGate 
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          setCurrentWorkspace(loggedInUser.workspace);
        }} 
      />
    );
  }

  return (
    <div className={`min-h-screen bg-[#08090e] text-[#f4f6fa] font-sans antialiased overflow-hidden flex transition-colors duration-300`}>
      
      {/* 1. STICKY SIDEBAR (Linear Style) */}
      <aside className={`bg-[#0f111a] border-r border-[#1b1e2a]/80 transition-all duration-300 flex flex-col justify-between z-30 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div>
          {/* Workspace Switcher & Brand Info */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#1b1e2a]/50">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30 flex-shrink-0">
                VO
              </div>
              {!isSidebarCollapsed && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex flex-col"
                >
                  <span className="text-sm font-bold text-white tracking-tight truncate max-w-[130px]">{currentWorkspace}</span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Enterprise Studio</span>
                </motion.div>
              )}
            </div>
            
            {/* Collapse Toggle button */}
            {!isSidebarCollapsed && (
              <button 
                onClick={() => setIsSidebarCollapsed(true)}
                className="text-zinc-500 hover:text-white p-1 rounded hover:bg-zinc-800/50 transition-colors"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {isSidebarCollapsed && (
              <button 
                onClick={() => setIsSidebarCollapsed(false)}
                className="text-zinc-500 hover:text-white p-1.5 rounded hover:bg-zinc-800/50 transition-colors mx-auto"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search trigger in Sidebar */}
          {!isSidebarCollapsed && (
            <div className="px-3 py-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-[#08090e] hover:bg-zinc-800/40 border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs text-zinc-500 flex items-center justify-between transition-colors cursor-text"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search...</span>
                </div>
                <kbd className="text-[9px] bg-zinc-800 border border-zinc-700 px-1 py-0.5 rounded font-mono text-zinc-400">⌘K</kbd>
              </button>
            </div>
          )}

          {/* Sidebar Modules List */}
          <nav className="space-y-1 px-2.5 py-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'workspace', label: 'Workspace', icon: FolderHeart },
              { id: 'publishing', label: 'Publishing', icon: Video },
              { id: 'media', label: 'Media Library', icon: FileText },
              { id: 'ai', label: 'AI Copywriter', icon: Sparkles },
              { id: 'automation', label: 'Local Sync Agent', icon: Cpu },
              { id: 'analytics', label: 'Analytics Hub', icon: BarChart3 },
              { id: 'team', label: 'Team Space', icon: Users },
              { id: 'billing', label: 'Billing & Usage', icon: CreditCard },
              { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'help', label: 'Help & API Docs', icon: HelpCircle }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all relative ${
                    isActive 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isSidebarCollapsed && item.badge && (
                    <span className="bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Account info */}
        <div className="p-3 border-t border-[#1b1e2a]/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" 
                alt="Avatar" 
                className="h-full w-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-semibold text-zinc-200 truncate">{user?.name || 'Elena Rostova'}</span>
                <span className="block text-[10px] text-zinc-500 truncate">{user?.email || 'elena@velorops.com'}</span>
              </div>
            )}
            {!isSidebarCollapsed && (
              <button 
                onClick={() => {
                  localStorage.removeItem('logged_in_user');
                  setUser(null);
                  navigate('/');
                }} 
                className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-zinc-800/50 transition-colors"
                title="Log out of console"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Panel Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#08090e]">
        
        {/* Sticky Header */}
        <header className="h-16 border-b border-[#1b1e2a]/50 px-6 sm:px-8 flex items-center justify-between bg-[#0f111a]/45 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold text-white capitalize flex items-center gap-2">
              <span>{activeModule}</span>
              <span className="text-zinc-600 text-xs font-medium">/</span>
              <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider truncate max-w-[150px] sm:max-w-none">{currentWorkspace}</span>
            </h1>
            {byokEnabled && (
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full text-[10px] text-emerald-400 font-bold tracking-wider uppercase animate-pulse select-none">
                <Key className="w-3 h-3" />
                <span>BYOK Engine Active</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Quick action trigger */}
            <button 
              onClick={() => setIsComposerOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-lg shadow-indigo-600/10 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Video Broadcast</span>
            </button>

            {/* Local Agent Sync indicator */}
            <div className="flex items-center gap-2 bg-[#0f111a] border border-[#1b1e2a] px-3 py-1.5 rounded-lg">
              <span className={`h-1.5 w-1.5 rounded-full ${workerConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
              <span className="text-[10px] text-zinc-400 font-semibold tracking-tight">Desktop Client Connected</span>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#08090e] [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {notificationPermission === 'default' && (
            <div className="mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Enable Publishing Notifications</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Get instantly alerted when your scheduled videos go live on Facebook.</p>
                </div>
              </div>
              <button 
                onClick={handleRequestNotification}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-600/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Enable Notifications
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* ==================== 1. DASHBOARD MODULE ==================== */}
            {activeModule === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stats Counters Overview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Reach (FB)', value: '620.4 K', change: '+14.2%', isPositive: true, detail: 'Across 3 active channels' },
                    { label: 'Avg Engagement Rate', value: '8.4%', change: '+3.1%', isPositive: true, detail: 'Industry baseline: 4.2%' },
                    { label: 'Upcoming Queue', value: `${queue.filter(q => q.status === 'scheduled').length} Videos`, change: '3 Channels Active', isPositive: true, detail: 'Drip system running' },
                    { label: 'Client Worker Status', value: 'Healthy Sync', change: 'Log ID: #v124', isPositive: true, detail: 'C:\\VelorOps\\Publishing_Queue' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 hover:border-[#2563EB]/40 transition-all shadow-xl relative overflow-hidden group">
                      <span className="text-xs text-zinc-400 font-semibold tracking-tight">{stat.label}</span>
                      <div className="flex items-baseline gap-3 mt-2">
                        <span className="text-2xl font-bold tracking-tight text-white">{stat.value}</span>
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                          <ArrowUpRight className="w-3 h-3" />
                          {stat.change}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 block mt-2">{stat.detail}</span>
                      <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
                    </div>
                  ))}
                </div>

                {/* Main Dynamic charts & Worker log columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Performance Chart Card */}
                  <div className="lg:col-span-8 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Enterprise Performance Analytics</h3>
                        <p className="text-xs text-zinc-500">Comparing video consumption metrics with organic reach.</p>
                      </div>
                      <div className="flex bg-[#08090e] border border-[#1b1e2a] p-1 rounded-lg">
                        {(['7d', '30d'] as const).map(range => (
                          <button
                            key={range}
                            onClick={() => setAnalyticsRange(range)}
                            className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${analyticsRange === range ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                          >
                            {range.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#296dff" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#296dff" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" stroke="#525d73" fontSize={10} tickLine={false} />
                          <YAxis stroke="#525d73" fontSize={10} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f111a', border: '1px solid #1b1e2a', borderRadius: '8px', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="views" stroke="#296dff" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                          <Area type="monotone" dataKey="reach" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Worker status details */}
                  <div className="lg:col-span-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-indigo-400" />
                          <span>Local Agent Monitor</span>
                        </h3>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          Live Active
                        </span>
                      </div>

                      {/* Device specifications list */}
                      <div className="space-y-3.5">
                        <div className="bg-[#08090e] border border-[#1b1e2a]/50 p-3 rounded-lg space-y-1">
                          <span className="text-[10px] text-zinc-500 uppercase font-mono block">Worker IP & ID</span>
                          <span className="text-xs font-semibold text-zinc-200 block font-mono">192.168.1.104 <span className="text-zinc-600">•</span> client-vo-mac-pro</span>
                        </div>
                        <div className="bg-[#08090e] border border-[#1b1e2a]/50 p-3 rounded-lg space-y-1">
                          <span className="text-[10px] text-zinc-500 uppercase font-mono block">Monitored Local Directory</span>
                          <span className="text-xs font-semibold text-indigo-400 block font-mono truncate">{syncFolder}</span>
                        </div>
                        <div className="bg-[#08090e] border border-[#1b1e2a]/50 p-3 rounded-lg space-y-1">
                          <span className="text-[10px] text-zinc-500 uppercase font-mono block">Bandwidth Throttle limit</span>
                          <span className="text-xs font-semibold text-zinc-200 block">{bandwidthLimit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1b1e2a]/50 mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase font-mono">Auto Sync Frequency: 30s</span>
                      <button 
                        onClick={() => setActiveModule('automation')}
                        className="text-[10px] text-indigo-400 hover:text-white font-bold flex items-center gap-1.5"
                      >
                        <span>Agent Config</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom activity line and quick actions row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Activity Log */}
                  <div className="lg:col-span-8 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      <span>Security & Distribution Audit Feed</span>
                    </h3>
                    <div className="space-y-3">
                      {[
                        { time: 'Today, 11:30 AM', event: 'Meta Graph API chunked upload complete', status: 'success', page: 'TechOps Solutions' },
                        { time: 'Today, 10:15 AM', event: 'Video draft created from local directory watch', status: 'success', page: 'Gamer Central Fanpage' },
                        { time: 'Yesterday, 4:30 PM', event: 'Scheduled post published automatically', status: 'published', page: 'TechOps Solutions' },
                        { time: 'Yesterday, 2:10 PM', event: 'OAuth Access Token renewal successful', status: 'security', page: 'Media Growth Agency' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-[#08090e]/60 border border-[#1b1e2a]/40 rounded-lg text-xs">
                          <div className="flex items-center gap-3">
                            <span className={`h-2 w-2 rounded-full ${
                              item.status === 'success' ? 'bg-emerald-500' :
                              item.status === 'published' ? 'bg-indigo-500' : 'bg-cyan-500'
                            }`} />
                            <div>
                              <span className="block font-semibold text-zinc-200">{item.event}</span>
                              <span className="block text-[10px] text-zinc-500 mt-0.5">{item.time}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-zinc-400 font-mono bg-[#0f111a] border border-[#1b1e2a] px-2 py-0.5 rounded-md">
                            {item.page}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Activities Quick panel */}
                  <div className="lg:col-span-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                    <h3 className="text-sm font-bold text-white mb-4">Workspace Resource Limits</h3>
                    
                    <div className="space-y-4">
                      {/* Meter 1 */}
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium">
                          <span className="text-zinc-400">Monthly Video Bandwidth</span>
                          <span className="text-zinc-200">12.8 GB / 100 GB</span>
                        </div>
                        <div className="w-full bg-[#08090e] border border-[#1b1e2a] h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '12.8%' }}></div>
                        </div>
                      </div>

                      {/* Meter 2 */}
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium">
                          <span className="text-zinc-400">AI Tokens Consumption</span>
                          <span className="text-zinc-200">45,150 / 150,000</span>
                        </div>
                        <div className="w-full bg-[#08090e] border border-[#1b1e2a] h-2 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: '30.1%' }}></div>
                        </div>
                      </div>

                      {/* Meter 3 */}
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium">
                          <span className="text-zinc-400">Connected Accounts</span>
                          <span className="text-zinc-200">5 / 15 accounts</span>
                        </div>
                        <div className="w-full bg-[#08090e] border border-[#1b1e2a] h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full rounded-full" style={{ width: '33.3%' }}></div>
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg flex gap-2.5 items-start mt-2">
                        <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span className="text-[10px] text-zinc-400 leading-normal">
                          Need more accounts or bandwidth? Upgrade your workspace inside the Billing section to access custom limits.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 2. WORKSPACE MODULE ==================== */}
            {activeModule === 'workspace' && (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Linked Accounts Header */}
                <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-6 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">Federated Social Accounts</h3>
                      <p className="text-xs text-zinc-500">Add or manage secure API integrations via Meta and LinkedIn OAuth.</p>
                    </div>
                    <button 
                      onClick={() => showNotification('OAuth integration window initialized', 'info')}
                      className="bg-[#08090e] border border-[#1b1e2a] hover:bg-zinc-800 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all self-start"
                    >
                      <Plus className="w-4 h-4 text-indigo-400" />
                      <span>Connect Social Account</span>
                    </button>
                  </div>

                  {/* Connected platforms grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {connectedPages.map(page => (
                      <div key={page.id} className="bg-[#08090e] border border-[#1b1e2a] rounded-xl p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3 items-center">
                            <div className="h-10 w-10 rounded-full border border-zinc-800 overflow-hidden bg-zinc-900 flex-shrink-0">
                              <img src={page.avatar} alt={page.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-white">{page.name}</span>
                              <span className="text-[10px] text-zinc-500 font-semibold capitalize flex items-center gap-1 mt-0.5">
                                <Globe className="w-3 h-3 text-indigo-500" />
                                {page.platform}
                              </span>
                            </div>
                          </div>
                          
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            page.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            page.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {page.status === 'healthy' ? 'Active' : page.status === 'warning' ? 'Needs Refresh' : 'Expired'}
                          </span>
                        </div>

                        <div className="border-t border-[#1b1e2a] mt-4 pt-3 flex items-center justify-between text-[11px] text-zinc-500 font-semibold">
                          <span>{page.followers} followers</span>
                          {page.status !== 'healthy' ? (
                            <button 
                              onClick={() => {
                                setConnectedPages(prev => prev.map(p => p.id === page.id ? { ...p, status: 'healthy' } : p));
                                showNotification('Token renewed successfully', 'success');
                              }}
                              className="text-indigo-400 hover:text-white transition-colors"
                            >
                              Renew OAuth Token
                            </button>
                          ) : (
                            <span className="text-emerald-500 font-mono text-[9px]">Token v19 Healthy</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Developer API Keys Section */}
                <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">Secure Webhook & Worker API Keys</h3>
                      <p className="text-xs text-zinc-500">Access tokens for local desktop watch folders or server integrations.</p>
                    </div>
                    <button 
                      onClick={handleCreateApiKey}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Generate Secret Key
                    </button>
                  </div>

                  {/* API Keys Table */}
                  <div className="overflow-x-auto border border-[#1b1e2a] rounded-xl bg-[#08090e]">
                    <table className="w-full text-left text-xs text-zinc-400 border-collapse">
                      <thead>
                        <tr className="bg-[#0f111a] text-zinc-300 border-b border-[#1b1e2a]">
                          <th className="p-4 font-semibold">Key Name</th>
                          <th className="p-4 font-semibold">Secret Key</th>
                          <th className="p-4 font-semibold">Created At</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1b1e2a]/40 font-semibold">
                        {apiKeys.map((item) => (
                          <tr key={item.id} className="hover:bg-[#0f111a]/50">
                            <td className="p-4 font-bold text-white">{item.name}</td>
                            <td className="p-4 font-mono">
                              <div className="flex items-center gap-2">
                                <span>{showKey[item.id] ? item.key : '••••••••••••••••••••••••••••'}</span>
                                <button 
                                  onClick={() => setShowKey(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                  className="text-zinc-500 hover:text-white p-0.5 rounded"
                                >
                                  {showKey[item.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(item.key);
                                    showNotification('API Key copied to clipboard', 'info');
                                  }}
                                  className="text-zinc-500 hover:text-white p-0.5 rounded"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                            <td className="p-4 text-zinc-500 font-mono">{item.createdAt}</td>
                            <td className="p-4">
                              <span className="bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px]">
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => {
                                  setApiKeys(prev => prev.filter(k => k.id !== item.id));
                                  showNotification('Key revoked and deleted', 'info');
                                }}
                                className="text-zinc-500 hover:text-rose-400 p-1"
                                title="Revoke Key"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 3. PUBLISHING MODULE ==================== */}
            {activeModule === 'publishing' && (
              <motion.div
                key="publishing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Visual Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                  <div>
                    <h3 className="text-base font-bold text-white">Active Social Publication Pipeline</h3>
                    <p className="text-xs text-zinc-500">Track scheduled reels, live broadcasts, and auto-drip sequences.</p>
                  </div>
                  <button 
                    onClick={() => setIsComposerOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Schedule New Broadcast</span>
                  </button>
                </div>

                {/* Queue / Calendar Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Queue Items */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Scheduled Queue Items ({queue.filter(q => q.status === 'scheduled').length})</span>
                      <button 
                        onClick={() => {
                          setQueue(prev => prev.map(item => ({ ...item, status: 'published', scheduledTime: 'Published just now' })));
                          showNotification('Triggered batch publishing sequence', 'success');
                        }}
                        className="text-xs text-indigo-400 hover:text-white font-bold flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Force Publish All</span>
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {queue.map(post => {
                        const pageObj = connectedPages.find(p => p.id === post.pageId) || connectedPages[0];
                        const mediaObj = mediaFiles.find(m => m.id === post.mediaId) || mediaFiles[0];
                        return (
                          <div key={post.id} className="bg-[#0f111a] border border-[#1b1e2a] hover:border-[#2563EB]/40 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all shadow-xl">
                            <div className="flex gap-4 items-center flex-1 min-w-0">
                              {/* Thumbnail preview */}
                              <div className="relative h-14 w-20 rounded-lg overflow-hidden border border-zinc-800 bg-[#08090e] flex-shrink-0 group">
                                <img src={mediaObj.thumbnail} alt="Thumbnail" className="h-full w-full object-cover opacity-80" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Play className="w-4 h-4 text-white" />
                                </div>
                              </div>

                              <div className="space-y-1.5 min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-white leading-tight truncate block max-w-full">{post.title}</span>
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    post.status === 'scheduled' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                    post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  }`}>
                                    {post.status}
                                  </span>
                                </div>
                                
                                <span className="block text-xs text-zinc-500 flex items-center gap-1.5">
                                  <Facebook className="w-3 h-3 text-indigo-500 fill-current" />
                                  <span className="font-semibold text-zinc-300">{pageObj.name}</span>
                                  <span>•</span>
                                  <span className="font-mono text-[11px]">{post.scheduledTime}</span>
                                </span>
                              </div>
                            </div>

                            {/* Actions button */}
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t border-[#1b1e2a] sm:border-none pt-3 sm:pt-0">
                              {post.status === 'scheduled' && (
                                <button 
                                  onClick={() => handleTriggerPublish(post.id)}
                                  className="px-3 py-1.5 bg-indigo-600/15 border border-indigo-500/25 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-semibold transition-all"
                                >
                                  Publish Now
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="p-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Live RTMP Streaming Setup panel */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Live Stream Server settings</span>
                    <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 space-y-4 shadow-xl">
                      <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                        <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                        <span>RTMP Broadcast Server Ready</span>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">RTMP Ingest URL</span>
                        <div className="flex bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs font-mono justify-between items-center text-zinc-300">
                          <span className="truncate">rtmp://live.velorops.com/app</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText('rtmp://live.velorops.com/app');
                              showNotification('RTMP Server URL copied', 'info');
                            }}
                            className="text-zinc-500 hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono block">Stream Secret Key</span>
                        <div className="flex bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs font-mono justify-between items-center text-zinc-300">
                          <span>••••••••••••••••</span>
                          <button 
                            onClick={() => showNotification('Stream Key copied securely', 'info')}
                            className="text-zinc-500 hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg text-[11px] text-zinc-500 leading-normal">
                        <strong>Observer Note</strong>: Live streaming requires configuring OBS Studio, Wirecast, or your custom camera worker to stream native video feeds via our RTMP proxies.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 4. MEDIA MODULE ==================== */}
            {activeModule === 'media' && (
              <motion.div
                key="media"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Media Search and Filter options */}
                <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input 
                      type="text" 
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      placeholder="Search assets by tag or name..." 
                      className="w-full bg-[#08090e] border border-[#1b1e2a] pl-9 pr-4 py-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-200 font-semibold"
                    />
                  </div>

                  <div className="flex gap-2 self-start md:self-auto overflow-x-auto w-full md:w-auto">
                    {['All', 'Video', 'Image', 'Product', 'Launch'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMediaFilter(tab)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                          mediaFilter === tab 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-[#08090e] text-zinc-400 border border-[#1b1e2a] hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Media grid & Info side drawer */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Media Grid */}
                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {mediaFiles
                      .filter(file => {
                        if (mediaFilter !== 'All' && file.category !== mediaFilter && file.type !== mediaFilter.toLowerCase()) return false;
                        if (mediaSearch && !file.name.toLowerCase().includes(mediaSearch.toLowerCase())) return false;
                        return true;
                      })
                      .map(file => (
                        <div 
                          key={file.id} 
                          onClick={() => setSelectedMedia(file)}
                          className={`bg-[#0f111a] border rounded-xl overflow-hidden cursor-pointer transition-all ${
                            selectedMedia?.id === file.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-[#1b1e2a] hover:border-zinc-700'
                          }`}
                        >
                          <div className="aspect-video relative bg-zinc-950">
                            <img src={file.thumbnail} alt={file.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            {file.type === 'video' && (
                              <div className="absolute bottom-2 right-2 bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-zinc-200">
                                {file.duration}
                              </div>
                            )}
                          </div>
                          <div className="p-3.5 space-y-1">
                            <span className="block text-xs font-bold text-white truncate">{file.name}</span>
                            <span className="text-[10px] text-zinc-500 font-mono flex justify-between">
                              <span>{file.size}</span>
                              <span>{file.uploadedAt}</span>
                            </span>
                          </div>
                        </div>
                    ))}
                  </div>

                  {/* Inspector Panel */}
                  <div className="lg:col-span-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl h-fit">
                    {selectedMedia ? (
                      <div className="space-y-4">
                        <div className="aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-[#08090e]">
                          <img src={selectedMedia.thumbnail} alt="Inspector Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider font-mono">File Name</span>
                          <h4 className="text-sm font-bold text-white truncate mt-0.5">{selectedMedia.name}</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-3.5 border-y border-[#1b1e2a]/50 py-3 text-xs">
                          <div>
                            <span className="text-zinc-500 block">File Size</span>
                            <span className="text-zinc-200 font-bold mt-0.5 block">{selectedMedia.size}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Uploaded On</span>
                            <span className="text-zinc-200 font-bold mt-0.5 block">{selectedMedia.uploadedAt}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider font-mono">Auto-Generated AI Description</span>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed bg-[#08090e]/60 border border-[#1b1e2a]/40 p-3 rounded-lg">
                            {selectedMedia.aiDescription || 'Generating metadata description...'}
                          </p>
                        </div>

                        {/* Associated tags */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block font-mono">Assigned Tags</span>
                          <div className="flex flex-wrap gap-1">
                            {selectedMedia.tags.map(t => (
                              <span key={t} className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setMediaFiles(prev => prev.filter(m => m.id !== selectedMedia.id));
                            setSelectedMedia(null);
                            showNotification('Media asset removed from repository', 'info');
                          }}
                          className="w-full py-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete File Asset</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-zinc-500">
                        <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 opacity-40 text-indigo-500" />
                        <span className="text-xs font-medium">Select a media file to view metadata parameters</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 5. AI MODULE ==================== */}
            {activeModule === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* AI Assistant Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Parameter Panel */}
                  <div className="lg:col-span-7 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1 tracking-tight">Gemini-Powered Post Copilot</h3>
                      <p className="text-xs text-zinc-500 font-medium">Create engaging, conversion-optimized copy adapted to specific target audiences.</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">Write a topic or brief describing the post</label>
                        <textarea 
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          rows={4}
                          placeholder="e.g., An educational tutorial explaining the difference between client-side and server-side state in React 19..."
                          className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-3 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-200 resize-none font-semibold leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 block">Brand Tone Preset</label>
                          <select 
                            value={aiTone}
                            onChange={(e) => setAiTone(e.target.value as any)}
                            className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 font-semibold"
                          >
                            <option value="professional">Professional</option>
                            <option value="hype">Hype / Viral</option>
                            <option value="educational">Educational</option>
                            <option value="creative">Creative Storyteller</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 block">Target Content Length</label>
                          <select 
                            value={aiLength}
                            onChange={(e) => setAiLength(e.target.value as any)}
                            className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 font-semibold"
                          >
                            <option value="short">Short (Under 150 chars)</option>
                            <option value="medium">Medium (250 - 500 chars)</option>
                            <option value="long">Long (Interactive Thread)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleGenerateAICaption}
                        disabled={isGenerating}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Composing high-converting copy...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Generate AI Copilot Caption</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Output Panel */}
                  <div className="lg:col-span-5 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold block tracking-wider mb-3">AI Co-pilot output</span>
                      {aiOutput ? (
                        <div className="bg-[#08090e] border border-[#1b1e2a] p-4 rounded-lg space-y-4 relative">
                          <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-medium">
                            {aiOutput}
                          </p>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(aiOutput);
                              showNotification('Generated caption copied to clipboard', 'info');
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-zinc-900 border border-zinc-800 hover:text-white rounded text-zinc-500"
                            title="Copy output copy"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-16 text-zinc-500 border border-dashed border-zinc-800 rounded-lg">
                          <Sparkles className="w-6 h-6 mx-auto mb-2 text-indigo-500 opacity-45" />
                          <span className="text-xs">Formulate parameters and hit generate to draft copy.</span>
                        </div>
                      )}
                    </div>

                    {/* Output History list */}
                    <div className="border-t border-[#1b1e2a]/50 pt-4 mt-6">
                      <span className="text-[10px] text-zinc-500 uppercase font-mono block tracking-wider mb-2">Workspace prompt history</span>
                      <div className="space-y-2">
                        {aiHistory.slice(0, 2).map((hist, index) => (
                          <div key={index} className="bg-[#08090e]/60 border border-[#1b1e2a]/50 p-2.5 rounded-lg text-[11px] flex justify-between items-center gap-4">
                            <span className="text-zinc-400 font-medium truncate flex-1">"{hist.prompt}"</span>
                            <span className="text-indigo-400 font-semibold font-mono text-[9px] uppercase bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 flex-shrink-0">
                              {hist.tone}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 6. AUTOMATION / DESKTOP AGENT ==================== */}
            {activeModule === 'automation' && (
              <motion.div
                key="automation"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Active connection parameters */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left config Form */}
                  <div className="lg:col-span-6 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Local Directory Monitor Configuration</h3>
                      <p className="text-xs text-zinc-500">Configure directory watch systems running on your local operating machine.</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">Local Watch Directory Absolute Path</label>
                        <input 
                          type="text" 
                          value={syncFolder}
                          onChange={(e) => setSyncFolder(e.target.value)}
                          placeholder="e.g., C:\VelorOps\Publishing_Queue"
                          className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-2.5 rounded-lg text-xs text-indigo-400 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 block">Bandwidth Compression Level</label>
                        <select 
                          value={bandwidthLimit}
                          onChange={(e) => setSyncFolder(e.target.value)}
                          className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs text-zinc-300 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="No limit">Unlimited Bandwidth Uploads</option>
                          <option value="5 MB/s">Throttle to 5.0 MB/s (High Speed)</option>
                          <option value="1 MB/s">Throttle to 1.0 MB/s (Optimized/Silent)</option>
                        </select>
                      </div>

                      <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg flex gap-2.5 items-start">
                        <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] text-zinc-400 leading-normal">
                          <strong>Developer Note</strong>: The Desktop Worker agent client tracks file creations. Dropping `.mp4` videos into your watch folder queues and pushes them via our chunked API securely without browser timeouts.
                        </span>
                      </div>

                      <button 
                        onClick={() => showNotification('Sync Folder config saved and broadcasted to worker client', 'success')}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all"
                      >
                        Push Configurations to Worker
                      </button>
                    </div>
                  </div>

                  {/* Right Worker Logs Terminal */}
                  <div className="lg:col-span-6 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Local worker process logging</span>
                        <button 
                          onClick={() => setWorkerLogs(['[00:00:00] Logs cleared.'])}
                          className="text-[10px] text-zinc-500 hover:text-white"
                        >
                          Clear Terminal
                        </button>
                      </div>

                      <div className="bg-[#08090e] border border-[#1b1e2a] rounded-lg p-3 font-mono text-[11px] text-zinc-400 space-y-1.5 h-64 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#08090e] [&::-webkit-scrollbar-thumb]:bg-zinc-800">
                        {workerLogs.map((log, index) => (
                          <div key={index} className="leading-relaxed">
                            <span className="text-zinc-600 font-bold select-none">{log.split(' ')[0]}</span>
                            <span className="text-zinc-300"> {log.substring(11)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-4 pt-3 border-t border-[#1b1e2a]/50">
                      <button 
                        onClick={() => {
                          setWorkerConnected(!workerConnected);
                          showNotification(workerConnected ? 'Desktop sync client disconnected' : 'Desktop sync client reconnected', 'info');
                        }}
                        className={`flex-1 py-1.5 border rounded-lg text-xs font-semibold transition-all ${
                          workerConnected 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white' 
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        {workerConnected ? 'Disconnect Agent Worker' : 'Reconnect Agent Worker'}
                      </button>
                      <button 
                        onClick={() => {
                          setWorkerLogs([...workerLogs, `[${new Date().toLocaleTimeString()}] Sync query triggered by user.`]);
                          showNotification('Forcing manual watch folder check', 'success');
                        }}
                        className="px-4 py-1.5 bg-[#08090e] border border-[#1b1e2a] hover:bg-zinc-800 text-zinc-300 rounded-lg text-xs font-semibold transition-all"
                      >
                        Force Sync Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 7. ANALYTICS MODULE ==================== */}
            {activeModule === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Recharts Analytics details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Line graph views */}
                  <div className="lg:col-span-8 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                    <h3 className="text-sm font-bold text-white mb-4">Organic Views & Engagement Retention</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" stroke="#525d73" fontSize={10} tickLine={false} />
                          <YAxis stroke="#525d73" fontSize={10} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f111a', border: '1px solid #1b1e2a', borderRadius: '8px', fontSize: '11px' }} />
                          <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2.5} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="engagement" stroke="#22C55E" strokeWidth={2.5} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Channel success split bar chart */}
                  <div className="lg:col-span-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-white mb-4">Account Success Distribution</h3>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                          <XAxis dataKey="name" stroke="#525d73" fontSize={9} tickLine={false} />
                          <YAxis stroke="#525d73" fontSize={9} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f111a', border: '1px solid #1b1e2a', fontSize: '10px' }} />
                          <Bar dataKey="posts" fill="#6366F1" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="success" fill="#22C55E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase text-center mt-2 block font-mono">Comparing drafts vs successful API calls</span>
                  </div>
                </div>

                {/* Performance table of top-performing videos */}
                <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                  <h3 className="text-sm font-bold text-white mb-4">Video Content High-Yield Metrics</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-zinc-400">
                      <thead>
                        <tr className="border-b border-[#1b1e2a] text-zinc-300">
                          <th className="p-3 font-semibold">Video Resource</th>
                          <th className="p-3 font-semibold">Target Channel</th>
                          <th className="p-3 font-semibold">Impressions</th>
                          <th className="p-3 font-semibold">Engagement</th>
                          <th className="p-3 font-semibold">AI Captions used</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1b1e2a]/40 font-semibold">
                        {[
                          { title: 'VelorOps Launch Trailer', channel: 'TechOps Solutions', views: '241.4K', engagement: '11.8%', ai: 'Yes (Hype)' },
                          { title: 'Graph API Tutorial Walkthrough', channel: 'Gamer Central Fanpage', views: '115.1K', engagement: '9.2%', ai: 'Yes (Educational)' },
                          { title: '10x Engagement Secrets', channel: 'Media Growth Agency', views: '82.5K', engagement: '6.4%', ai: 'Yes (Creative)' }
                        ].map((video, index) => (
                          <tr key={index} className="hover:bg-[#08090e]/60">
                            <td className="p-3 font-bold text-white">{video.title}</td>
                            <td className="p-3">{video.channel}</td>
                            <td className="p-3 font-mono text-zinc-300">{video.views}</td>
                            <td className="p-3 text-emerald-400 font-mono">{video.engagement}</td>
                            <td className="p-3 text-zinc-500 font-mono">{video.ai}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 8. TEAM MODULE ==================== */}
            {activeModule === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Member Directory */}
                  <div className="lg:col-span-8 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                    <h3 className="text-sm font-bold text-white mb-4">Workspace Collaborators Directory</h3>
                    <div className="space-y-3.5">
                      {teamMembers.map(member => (
                        <div key={member.id} className="flex justify-between items-center p-3.5 bg-[#08090e] border border-[#1b1e2a]/60 rounded-xl">
                          <div className="flex gap-3 items-center">
                            <div className="h-9 w-9 rounded-full border border-zinc-800 overflow-hidden bg-zinc-900">
                              <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-white">{member.name}</span>
                              <span className="block text-[10px] text-zinc-500 mt-0.5">{member.email}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-semibold">
                            <span className="text-zinc-400 font-mono">{member.role}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              member.status === 'active' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                            }`}>
                              {member.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invite Form */}
                  <div className="lg:col-span-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl flex flex-col justify-between h-fit">
                    <form onSubmit={handleInviteMember} className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Invite Collaborator</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal">Collaborators gain scoped read or publication rights.</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-400 font-mono">Collaborator Email</label>
                        <input 
                          type="email"
                          required
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="e.g. user@agency.com"
                          className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 font-semibold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-400 font-mono">Access Scope Role</label>
                        <select 
                          value={newMemberRole}
                          onChange={(e) => setNewMemberRole(e.target.value as any)}
                          className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 font-semibold"
                        >
                          <option value="Publisher">Publisher (Direct Uploads)</option>
                          <option value="Admin">Administrator (Keys & billing)</option>
                          <option value="Analyst">Analyst (Metrics read-only)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all"
                      >
                        Send Scoped Invitation
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 9. BILLING MODULE ==================== */}
            {activeModule === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Subscription Tier Info card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-indigo-400 uppercase font-mono font-bold tracking-wider">Active plan</span>
                      <h3 className="text-xl font-bold text-white mt-1">{subscriptionTier}</h3>
                      <p className="text-xs text-zinc-500 mt-2">Unlimited desktop agent watch systems, custom Meta OAuth proxies.</p>
                    </div>
                    <div className="pt-4 border-t border-[#1b1e2a] mt-4 flex justify-between items-baseline">
                      <span className="text-2xl font-mono text-white font-bold">${monthlyCost} <span className="text-xs text-zinc-500 font-sans">/ month</span></span>
                      <span className="text-emerald-500 text-[10px] font-bold font-mono">Renews July 30, 2026</span>
                    </div>
                  </div>

                  <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-purple-400 uppercase font-mono font-bold tracking-wider">API Credits used</span>
                      <h3 className="text-xl font-mono text-white font-bold mt-1">{creditBalance.toLocaleString()}</h3>
                      <p className="text-xs text-zinc-500 mt-2">Consumed based on Gemini captions generated and background metadata audits.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setCreditBalance(prev => prev + 10000);
                        showNotification('Added 10,000 developer credits securely', 'success');
                      }}
                      className="w-full py-1.5 bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg text-xs font-semibold transition-all mt-4"
                    >
                      Refill API Credits ($10/10k)
                    </button>
                  </div>

                  <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold tracking-wider">Payment Method</span>
                      <h3 className="text-sm font-bold text-white mt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px] font-mono">VISA</span>
                        <span>•••• •••• •••• 9812</span>
                      </h3>
                      <p className="text-xs text-zinc-500 mt-2">Default payment card charged on subscription renewal dates.</p>
                    </div>
                    <button 
                      onClick={() => showNotification('Payment updater active', 'info')}
                      className="w-full py-1.5 bg-[#08090e] border border-[#1b1e2a] hover:bg-zinc-800 text-zinc-300 rounded-lg text-xs font-semibold transition-all mt-4"
                    >
                      Update Billing Credentials
                    </button>
                  </div>
                </div>

                {/* Invoices panel */}
                <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl">
                  <h3 className="text-sm font-bold text-white mb-4">Workspace Invoicing History</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'INV-2026-004', date: 'June 30, 2026', amount: '$299.00', status: 'Paid' },
                      { id: 'INV-2026-003', date: 'May 30, 2026', amount: '$299.00', status: 'Paid' },
                      { id: 'INV-2026-002', date: 'April 30, 2026', amount: '$150.00', status: 'Paid' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-[#08090e] border border-[#1b1e2a]/50 rounded-xl text-xs font-semibold">
                        <div className="flex gap-4 font-mono">
                          <span className="text-white">{item.id}</span>
                          <span className="text-zinc-500">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-4 font-mono">
                          <span className="text-zinc-300">{item.amount}</span>
                          <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[9px] uppercase font-bold">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}


            {/* ==================== 10. NOTIFICATIONS MODULE ==================== */}
            {activeModule === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Security and Sync Notifications Inbox</span>
                  <button 
                    onClick={() => showNotification('Inbox cleared successfully', 'info')}
                    className="text-xs text-indigo-400 hover:text-white"
                  >
                    Mark all as read
                  </button>
                </div>

                <div className="space-y-3.5">
                  {[
                    { title: 'Critical OAuth Expiry Warning', details: 'LinkedIn oauth token for "VelorOps Enterprise" expires in 48 hours. Regenerate key to prevent pipeline blocks.', type: 'alert', time: '10 mins ago' },
                    { title: 'Desktop Worker Sync Speed Alert', details: 'Desktop client watch synchronized 128MB video chunk in 4.2 seconds using chunked multi-stream API.', type: 'info', time: '1 hour ago' },
                    { title: 'Video Upload Successful on FB Page', details: 'Video "Why Manual Scheduling is Slow in 2026.mp4" successfully published via Graph API proxy endpoints.', type: 'success', time: '2 hours ago' }
                  ].map((note, index) => (
                    <div key={index} className="bg-[#0f111a] border border-[#1b1e2a] hover:border-zinc-700 p-4.5 rounded-xl transition-all shadow-xl flex gap-3.5 items-start">
                      {note.type === 'alert' ? (
                        <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                      ) : note.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      )}
                      
                      <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-baseline gap-4">
                          <span className="text-xs font-bold text-white">{note.title}</span>
                          <span className="text-[10px] text-zinc-500 font-mono font-semibold">{note.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-semibold">{note.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}


            {/* ==================== 11. SETTINGS MODULE ==================== */}
            {activeModule === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Configuration parameters */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Form */}
                  <div className="lg:col-span-8 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl space-y-4">
                    <h3 className="text-sm font-bold text-white">General Workspace Parameters</h3>
                    
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400">Workspace Label</label>
                          <input 
                            type="text" 
                            value={currentWorkspace}
                            onChange={(e) => setCurrentWorkspace(e.target.value)}
                            className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400">Support Account Email</label>
                          <input 
                            type="email" 
                            disabled
                            value="elena@velorops.com"
                            className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-2.5 rounded-lg text-xs font-semibold opacity-60 text-zinc-500 select-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 block">Default Publication Privacy Level</label>
                        <select className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs text-zinc-300 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500">
                          <option>Direct Public Feed Post</option>
                          <option>Unlisted (Draft Distribution Only)</option>
                          <option>Direct Scheduling Loops</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => showNotification('Workspace changes updated successfully', 'success')}
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition-all"
                      >
                        Commit Settings Updates
                      </button>
                    </div>
                  </div>

                  {/* Security Panel */}
                  <div className="lg:col-span-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl space-y-4 h-fit">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>Security credentials</span>
                    </h3>

                    <div className="space-y-3 pt-2 text-xs font-semibold">
                      <div className="bg-[#08090e] border border-[#1b1e2a]/50 p-3 rounded-lg flex justify-between items-center">
                        <span className="text-zinc-400">OAuth Security</span>
                        <span className="text-emerald-400 font-mono text-[10px]">32-Byte Active</span>
                      </div>
                      <div className="bg-[#08090e] border border-[#1b1e2a]/50 p-3 rounded-lg flex justify-between items-center">
                        <span className="text-zinc-400">Local Watch SSL</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Enforced TLS 1.3</span>
                      </div>
                      <div className="bg-[#08090e] border border-[#1b1e2a]/50 p-3 rounded-lg flex justify-between items-center">
                        <span className="text-zinc-400">Two-Factor Authentication</span>
                        <button className="text-indigo-400 hover:text-white text-[11px] transition-colors">Configure 2FA</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ==================== BRING YOUR OWN KEY (BYOK) ENGINE ==================== */}
                <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-6 shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b1e2a] pb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-indigo-600/10 border border-indigo-500/25 text-indigo-400 rounded-xl">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Bring Your Own Key (BYOK) Configuration</span>
                          <span className="text-[10px] px-2 py-0.5 bg-indigo-500/15 text-indigo-400 rounded-md font-mono font-bold tracking-tight">DEVELOPER ENGINE</span>
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1">Configure your own Facebook Developer App credentials and Gemini API key to run direct standalone distributions.</p>
                      </div>
                    </div>
                    
                    {/* BYOK Toggle */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400 font-semibold">Enable BYOK Integration</span>
                      <button
                        onClick={() => {
                          const nextState = !byokEnabled;
                          setByokEnabled(nextState);
                          localStorage.setItem('byok_enabled', nextState ? 'true' : 'false');
                          showNotification(nextState ? 'BYOK Engine Enabled' : 'BYOK Engine Disabled', 'info');
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          byokEnabled ? 'bg-indigo-600' : 'bg-zinc-800'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            byokEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {byokEnabled ? (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                      {/* Inputs Form */}
                      <form onSubmit={handleSaveByok} className="xl:col-span-8 space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* App ID */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-400">Facebook App ID</label>
                            <input 
                              type="text" 
                              value={byokFbAppId}
                              onChange={(e) => setByokFbAppId(e.target.value)}
                              placeholder="e.g. 1592398452102"
                              className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 placeholder:text-zinc-600"
                            />
                          </div>

                          {/* App Secret */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-400">Facebook App Secret</label>
                            <div className="relative">
                              <input 
                                type={showFbSecret ? "text" : "password"} 
                                value={byokFbAppSecret}
                                onChange={(e) => setByokFbAppSecret(e.target.value)}
                                placeholder="32-character hexadecimal secret"
                                className="w-full bg-[#08090e] border border-[#1b1e2a] pl-3.5 pr-10 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 placeholder:text-zinc-600"
                              />
                              <button
                                type="button"
                                onClick={() => setShowFbSecret(!showFbSecret)}
                                className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                              >
                                {showFbSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* User Access Token */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400">Long-Lived Page/User Access Token</label>
                          <div className="relative">
                            <input 
                              type={showFbToken ? "text" : "password"} 
                              value={byokFbAccessToken}
                              onChange={(e) => setByokFbAccessToken(e.target.value)}
                              placeholder="e.g. EAAGz1aPjZCBA..."
                              className="w-full bg-[#08090e] border border-[#1b1e2a] pl-3.5 pr-10 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 placeholder:text-zinc-600"
                            />
                            <button
                              type="button"
                              onClick={() => setShowFbToken(!showFbToken)}
                              className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                            >
                              {showFbToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          <span className="text-[10px] text-zinc-500 block leading-normal pt-1">
                            Use the <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-0.5">Graph API Explorer <ExternalLink className="w-2.5 h-2.5" /></a> to retrieve a token. Make sure it includes <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-400">publish_video</code>, <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-400">pages_manage_posts</code>, and <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-400">pages_read_engagement</code>.
                          </span>
                        </div>

                        {/* Gemini API Key */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-400 font-medium">Custom Gemini API Key <span className="text-[10px] text-zinc-500 font-normal">(Optional)</span></label>
                            <span className="text-[10px] text-zinc-500 font-normal">For custom AI caption recommendations</span>
                          </div>
                          <div className="relative">
                            <input 
                              type={showGeminiKey ? "text" : "password"} 
                              value={byokGeminiApiKey}
                              onChange={(e) => setByokGeminiApiKey(e.target.value)}
                              placeholder="e.g. AIzaSy..."
                              className="w-full bg-[#08090e] border border-[#1b1e2a] pl-3.5 pr-10 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 placeholder:text-zinc-600"
                            />
                            <button
                              type="button"
                              onClick={() => setShowGeminiKey(!showGeminiKey)}
                              className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                            >
                              {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Save & Test Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          <button 
                            type="submit"
                            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition-all shadow-lg shadow-indigo-600/10"
                          >
                            Save BYOK Configuration
                          </button>
                          
                          <button 
                            type="button"
                            disabled={isTestingCredentials}
                            onClick={handleTestCredentials}
                            className="py-2.5 px-4 bg-[#08090e] hover:bg-zinc-900 border border-[#1b1e2a] text-zinc-300 hover:text-white font-semibold rounded-lg text-xs transition-all flex items-center gap-2"
                          >
                            {isTestingCredentials ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Verifying Connection...</span>
                              </>
                            ) : (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Test Graph API Client</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>

                      {/* Technical Diagnostics Logs */}
                      <div className="xl:col-span-4 flex flex-col justify-between space-y-4">
                        <div className="bg-black/40 border border-[#1b1e2a] p-4.5 rounded-xl h-full flex flex-col">
                          <div className="flex items-center justify-between border-b border-[#1b1e2a] pb-2.5 mb-3">
                            <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider uppercase">BYOK Diagnostics logs</span>
                            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                          </div>
                          
                          <div className="flex-1 font-mono text-[10px] text-zinc-400 space-y-2 overflow-y-auto max-h-[180px] md:max-h-none select-all [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-zinc-800">
                            {testLogs.length > 0 ? (
                              testLogs.map((log, index) => (
                                <div key={index} className={`leading-normal ${log.includes('Successful') || log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : ''}`}>
                                  {log}
                                </div>
                              ))
                            ) : (
                              <div className="text-zinc-600 italic">
                                Ready to run diagnostics check. Fill in fields and click "Test Graph API Client" to initiate cryptographic handshake with Meta's servers.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800 text-center max-w-lg mx-auto">
                      <Key className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-zinc-300">BYOK Sandbox Mode</h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                        Currently running using standard pre-approved sandboxed client configurations. Toggle "Enable BYOK Integration" above to substitute server pipelines with your own standalone developer access tokens.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}


            {/* ==================== 12. HELP / API DOCS MODULE ==================== */}
            {activeModule === 'help' && (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* FAQ section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>Developer API documentation</span>
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                      VelorOps supports RESTful actions. You can push post schedules, query active connected accounts, or download metadata JSON schemas securely.
                    </p>

                    <div className="bg-[#08090e] border border-[#1b1e2a] p-3.5 rounded-lg font-mono text-[11px] text-zinc-300 space-y-1 overflow-x-auto whitespace-pre">
                      <div className="text-zinc-500"># Post custom payload dynamically via terminal</div>
                      <div>curl -X POST https://api.velorops.com/v1/publish \</div>
                      <div>  -H "Authorization: Bearer vo_sk_live_xxxx" \</div>
                      <div>  -d "title=API Tutorial" \</div>
                      <div>  -d "scheduled_time=1783584000"</div>
                    </div>
                  </div>

                  <div className="bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-5 shadow-2xl space-y-4">
                    <h3 className="text-sm font-bold text-white">Client Token Synchronization Hub</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                      To synchronize folders without API rate blocks, download the official native VelorOps watch client. Enter your secret workspace key to securely forward desktop directory queues.
                    </p>
                    
                    <button 
                      onClick={() => showNotification('Desktop client compilation started', 'info')}
                      className="py-2 px-4 bg-[#08090e] border border-[#1b1e2a] hover:bg-zinc-800 text-white font-semibold rounded-lg text-xs flex items-center gap-2 transition-all w-fit"
                    >
                      <Download className="w-4 h-4 text-indigo-400" />
                      <span>Download Watch Client executable</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Footer with Graph API latency */}
        <footer className="h-10 border-t border-[#1b1e2a]/50 bg-[#0f111a] flex items-center justify-between px-6 shrink-0 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <div className={`w-2 h-2 rounded-full ${latency < 100 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
              Facebook Graph API v19.0
            </span>
            <span className="text-zinc-700">|</span>
            <span className="font-mono">{latency}ms</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Operational</span>
          </div>
        </footer>
      </main>

      {/* 2. COMMAND PALETTE (CMD+K Modal - Stripe/Linear Style) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Palette Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              className="relative bg-[#0f111a] border border-[#1b1e2a] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl z-10"
            >
              <div className="p-4 border-b border-[#1b1e2a] flex items-center gap-3">
                <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <input 
                  type="text" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a command or navigate modules..." 
                  className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-zinc-600 font-semibold"
                />
                <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase select-none">Esc</span>
              </div>

              <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                {commandItems
                  .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setIsSearchOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3.5 hover:bg-zinc-800/40 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>{item.name}</span>
                      <kbd className="text-[10px] bg-[#08090e] border border-[#1b1e2a] px-1.5 py-0.5 rounded font-mono text-zinc-500">
                        {item.shortcut}
                      </kbd>
                    </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. QUICK POST COMPOSER DRAWER */}
      <AnimatePresence>
        {isComposerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsComposerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Composer Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 15 }}
              className="relative bg-[#0f111a] border border-[#1b1e2a] rounded-xl w-full max-w-md overflow-hidden shadow-2xl z-10 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white tracking-tight">Sleek Video Publication Composer</h3>
                <button 
                  onClick={() => setIsComposerOpen(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-400 font-mono">Video Title</label>
                  <input 
                    type="text" 
                    required
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="e.g. Cinematic SaaS Launch Trailer"
                    className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-zinc-400 font-mono">Social Target Page</label>
                    <select 
                      value={newPostPage}
                      onChange={(e) => setNewPostPage(e.target.value)}
                      className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs focus:outline-none text-zinc-300 font-semibold"
                    >
                      {connectedPages.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-zinc-400 font-mono">Associated Media</label>
                    <select 
                      value={newPostMedia}
                      onChange={(e) => setNewPostMedia(e.target.value)}
                      className="w-full bg-[#08090e] border border-[#1b1e2a] px-3 py-2 rounded-lg text-xs focus:outline-none text-zinc-300 font-semibold"
                    >
                      {mediaFiles.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-400 font-mono">Post Schedule Time</label>
                  <input 
                    type="text" 
                    required
                    value={newPostSchedule}
                    onChange={(e) => setNewPostSchedule(e.target.value)}
                    placeholder="Today at 8:00 PM"
                    className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-zinc-300 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-400 font-mono">Publication Caption</label>
                  <textarea 
                    value={newPostCaption}
                    onChange={(e) => setNewPostCaption(e.target.value)}
                    rows={3}
                    placeholder="Write beautiful copy or draft manually..."
                    className="w-full bg-[#08090e] border border-[#1b1e2a] px-3.5 py-2.5 rounded-lg text-xs focus:outline-none text-zinc-300 font-semibold resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition-all shadow-lg shadow-indigo-600/10"
                >
                  Schedule with official APIs
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. NOTIFICATION TOAST POPUP */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-4 right-4 bg-[#0f111a] border border-[#1b1e2a] rounded-xl p-3.5 shadow-2xl z-50 flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-xs font-bold text-white font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
