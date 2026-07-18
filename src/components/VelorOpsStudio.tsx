import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, Calendar, Sparkles, CheckCircle, RefreshCw, Plus, Trash2, 
  Settings, Facebook, AlertCircle, Play, BarChart2, Check, ExternalLink, MessageSquare, ChevronRight
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  page: string;
  scheduledTime: string;
  status: 'scheduled' | 'posting' | 'posted' | 'failed';
  caption: string;
}

export function VelorOpsStudio() {
  const [activeTab, setActiveTab] = useState<'queue' | 'composer' | 'channels' | 'analytics'>('queue');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: '1',
      title: 'VelorOps Launch Trailer - High Def',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
      page: 'TechOps Solutions',
      scheduledTime: 'Today at 6:30 PM',
      status: 'scheduled',
      caption: 'Meet VelorOps: The developer-first automated scheduling system for Facebook Pages. Secure, reliable, and powered by official APIs. 🚀 #SaaS #Marketing'
    },
    {
      id: '2',
      title: 'Facebook Graph API Tutorial & Deep Dive',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      page: 'Gamer Central Fanpage',
      scheduledTime: 'Tomorrow at 10:00 AM',
      status: 'scheduled',
      caption: 'Struggling with Facebook API limits and security tokens? Here is a full walkthrough on how to maintain healthy auth states. 🔌'
    },
    {
      id: '3',
      title: '10x Your Engagement With Video Automation',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      page: 'Media Growth Agency',
      scheduledTime: 'July 11, 2026 at 2:15 PM',
      status: 'posted',
      caption: 'Consistency is king. Automated video scheduling lets you hit optimal posting windows across multiple time zones without waking up at 3 AM.'
    }
  ]);

  // Composer States
  const [composerTitle, setComposerTitle] = useState('');
  const [composerCaption, setComposerCaption] = useState('');
  const [composerPage, setComposerPage] = useState('TechOps Solutions');
  const [composerTone, setComposerTone] = useState<'hype' | 'professional' | 'funny' | 'educational'>('professional');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [composerStatus, setComposerStatus] = useState<'idle' | 'success'>('idle');

  // Channel States
  const [pages, setPages] = useState([
    { id: 'p1', name: 'TechOps Solutions', followers: '12.4K', tokenStatus: 'healthy', expiry: '58 days left', active: true },
    { id: 'p2', name: 'Gamer Central Fanpage', followers: '45.1K', tokenStatus: 'healthy', expiry: '54 days left', active: true },
    { id: 'p3', name: 'Media Growth Agency', followers: '8.2K', tokenStatus: 'warning', expiry: '2 days left', active: true }
  ]);
  const [isAddingPage, setIsAddingPage] = useState(false);

  // Production Analytics State
  const [analyticsRange, setAnalyticsRange] = useState<'7d' | '30d'>('7d');

  // Interactive functions
  const handlePublishNow = (id: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, status: 'posted', scheduledTime: 'Published Just Now' };
      }
      return v;
    }));
    if (selectedVideo?.id === id) {
      setSelectedVideo(prev => prev ? { ...prev, status: 'posted', scheduledTime: 'Published Just Now' } : null);
    }
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerTitle) return;
    
    const newVideo: VideoItem = {
      id: Date.now().toString(),
      title: composerTitle,
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80',
      page: composerPage,
      scheduledTime: 'Today at 11:30 PM',
      status: 'scheduled',
      caption: composerCaption || 'New automated post drafted in VelorOps.'
    };

    setVideos([newVideo, ...videos]);
    setComposerTitle('');
    setComposerCaption('');
    setComposerStatus('success');
    setTimeout(() => {
      setComposerStatus('idle');
      setActiveTab('queue');
    }, 1200);
  };

  const handleGenerateAICaption = () => {
    if (!composerTitle) return;
    setIsGeneratingCaption(true);
    setTimeout(() => {
      let generated = '';
      if (composerTone === 'professional') {
        generated = `Elevate your social media strategy with ${composerTitle}. Optimized for peak performance, integrated with security-first protocols. Read the full insights below. 📈 #MarketingStrategy #Enterprise`;
      } else if (composerTone === 'hype') {
        generated = `🔥 THIS IS HUGE! 🔥 Check out our latest video: "${composerTitle}". We're breaking down the exact systems to scale your output. Drop a comment below! 👇💻 #GrowthMindset #SaaS`;
      } else if (composerTone === 'funny') {
        generated = `My team: "Please do this manually."\nMe with ${composerTitle}: *hits one automation button and goes to the beach* 🏖️ Absolute game changer.`;
      } else {
        generated = `💡 Educational breakdown: "${composerTitle}" explains how official Graph API tokens prevent shadowbans and secure your automation loops. Let's look at the metrics.`;
      }
      setComposerCaption(generated);
      setIsGeneratingCaption(false);
    }, 1000);
  };

  const handleTogglePage = (id: string) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleReconnectPage = (id: string) => {
    setPages(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, tokenStatus: 'healthy', expiry: '60 days left' };
      }
      return p;
    }));
  };

  return (
    <div id="velorops-studio" className="w-full max-w-6xl mx-auto bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden font-sans text-zinc-100">
      
      {/* Studio Interactive Console */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-3 w-3 gap-1.5">
            <span className="h-3.5 w-3.5 rounded-full bg-rose-500/80"></span>
            <span className="h-3.5 w-3.5 rounded-full bg-amber-500/80"></span>
            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-zinc-500 font-mono text-xs ml-2 select-none">|</span>
          <div className="flex items-center gap-2 bg-zinc-950/60 border border-zinc-800 px-3 py-1 rounded-full text-xs font-medium text-indigo-400">
            <Facebook className="w-3.5 h-3.5 fill-current" />
            <span>app.velorops.io/studio</span>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800/80 overflow-x-auto w-full sm:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap">
          <button 
            onClick={() => { setActiveTab('queue'); setSelectedVideo(null); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'queue' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Queue</span>
          </button>
          <button 
            onClick={() => setActiveTab('composer')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'composer' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Composer</span>
          </button>
          <button 
            onClick={() => setActiveTab('channels')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'channels' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>FB Pages</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${activeTab === 'analytics' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Workspace Sidebar / Quick Stats */}
        <div className="lg:col-span-3 bg-zinc-900/55 p-6 border-r border-zinc-800 hidden lg:flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">Active Live Sync</span>
            </div>

            <div className="space-y-5">
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-4">
                <span className="text-zinc-500 text-xs block font-medium">Queue Status</span>
                <span className="text-2xl font-bold tracking-tight mt-1 block">
                  {videos.filter(v => v.status === 'scheduled').length} Scheduled
                </span>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>

              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-4">
                <span className="text-zinc-500 text-xs block font-medium">Post Success Rate</span>
                <span className="text-2xl font-bold text-emerald-400 tracking-tight mt-1 block">99.8%</span>
                <span className="text-[10px] text-zinc-500 block mt-1">2,410 total posts scheduled via API</span>
              </div>

              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-4">
                <span className="text-zinc-500 text-xs block font-medium">Connected Tokens</span>
                <span className="text-2xl font-bold tracking-tight mt-1 block">3 / 3 Active</span>
                <div className="flex gap-1 mt-2">
                  <span className="h-2 w-5 bg-emerald-500/80 rounded-sm"></span>
                  <span className="h-2 w-5 bg-emerald-500/80 rounded-sm"></span>
                  <span className="h-2 w-5 bg-emerald-500/80 rounded-sm"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-400 text-xs">
                VO
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-200">velorops@gmail.com</span>
                <span className="block text-[10px] text-zinc-500">Developer License</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 p-6 sm:p-8 bg-zinc-950">
          <AnimatePresence mode="wait">
            
            {/* 1. Queue Tab */}
            {activeTab === 'queue' && (
              <motion.div
                key="queue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Upcoming Broadcast Schedule</h3>
                    <p className="text-xs text-zinc-400">Manage and preview videos scheduled to post via the Facebook Graph API.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('composer')}
                    className="self-start sm:self-auto flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Schedule New</span>
                  </button>
                </div>

                <div className="grid gap-4">
                  {videos.map(video => (
                    <div 
                      key={video.id}
                      className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 rounded-xl p-4 transition-all flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                    >
                      <div className="flex gap-4 items-center flex-1 min-w-0">
                        <div className="relative h-16 w-24 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0 bg-zinc-950">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="h-full w-full object-cover opacity-80"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/30">
                            <Play className="w-4 h-4 text-white opacity-80" />
                          </div>
                        </div>
                        <div className="space-y-1 min-w-0 w-full">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-white leading-tight truncate block max-w-full">{video.title}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              video.status === 'scheduled' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                              video.status === 'posted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {video.status}
                            </span>
                          </div>
                          <span className="block text-xs text-zinc-400 flex items-center gap-1">
                            <Facebook className="w-3 h-3 text-indigo-500" />
                            {video.page} <span className="text-zinc-600">•</span> {video.scheduledTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t border-zinc-800/80 md:border-none pt-3 md:pt-0">
                        <button 
                          onClick={() => setSelectedVideo(video)}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium transition-all"
                        >
                          Details
                        </button>
                        {video.status === 'scheduled' && (
                          <button 
                            onClick={() => handlePublishNow(video.id)}
                            className="px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white text-indigo-400 rounded-lg text-xs font-medium transition-all"
                          >
                            Publish Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Queue Detail Drawer Content */}
                <AnimatePresence>
                  {selectedVideo && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-base font-bold text-white">Post Preview & API Parameters</h4>
                          <p className="text-xs text-zinc-400">Live preview of Facebook feed distribution structure.</p>
                        </div>
                        <button 
                          onClick={() => setSelectedVideo(null)}
                          className="text-zinc-400 hover:text-zinc-200 text-xs font-medium"
                        >
                          Close Preview
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Feed Card */}
                        <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-4">
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                              f
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-zinc-200">{selectedVideo.page}</span>
                              <span className="block text-[10px] text-zinc-500">Sponsored/Automated • Graph API v19.0</span>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-3 whitespace-pre-line">{selectedVideo.caption}</p>
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                            <img 
                              src={selectedVideo.thumbnail} 
                              alt="Feed Media" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-zinc-950/25 flex items-center justify-center">
                              <span className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                <Play className="w-5 h-5 text-white" />
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* API Metadata */}
                        <div className="space-y-4">
                          <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-3">
                            <span className="block text-[10px] font-mono text-zinc-500 uppercase">FB Video Endpoint</span>
                            <span className="block text-xs font-mono text-indigo-400 mt-1 overflow-x-auto whitespace-nowrap">
                              https://graph.facebook.com/v19.0/&#123;page_id&#125;/videos
                            </span>
                          </div>

                          <div className="bg-zinc-950/60 border border-zinc-800 rounded-lg p-3 space-y-2">
                            <span className="block text-[10px] font-mono text-zinc-500 uppercase">Request Payload</span>
                            <div className="text-[11px] font-mono text-zinc-400 space-y-1">
                              <div><span className="text-indigo-400">"title":</span> "{selectedVideo.title}"</div>
                              <div><span className="text-indigo-400">"description":</span> "{selectedVideo.caption.substring(0, 40)}..."</div>
                              <div><span className="text-indigo-400">"scheduled_publish_time":</span> "1783584000"</div>
                              <div><span className="text-indigo-400">"published":</span> "false"</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {selectedVideo.status === 'scheduled' && (
                              <button 
                                onClick={() => handlePublishNow(selectedVideo.id)}
                                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all"
                              >
                                Trigger Instant API Publish
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setVideos(prev => prev.filter(v => v.id !== selectedVideo.id));
                                setSelectedVideo(null);
                              }}
                              className="px-3 py-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 rounded-lg text-xs font-medium transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* 2. Composer Tab */}
            {activeTab === 'composer' && (
              <motion.div
                key="composer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white">Sleek AI Post Composer</h3>
                  <p className="text-xs text-zinc-400">Generate tags, write copy with Gemini, and schedule directly with zero hassle.</p>
                </div>

                <form onSubmit={handleCreateVideo} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Form Block */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Facebook Target Page</label>
                      <select 
                        value={composerPage}
                        onChange={(e) => setComposerPage(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-200"
                      >
                        {pages.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Video Title / Filename</label>
                      <input 
                        type="text"
                        required
                        value={composerTitle}
                        onChange={(e) => setComposerTitle(e.target.value)}
                        placeholder="e.g. Cinematic Tech Demo v2"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-200"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-semibold text-zinc-400">Post Caption</label>
                        <span className="text-[10px] text-zinc-500">{composerCaption.length}/2000 chars</span>
                      </div>
                      <textarea 
                        value={composerCaption}
                        onChange={(e) => setComposerCaption(e.target.value)}
                        rows={4}
                        placeholder="Draft your Facebook post copy here..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-200 resize-none"
                      />
                    </div>

                    {/* AI Assistance Options */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                        <Sparkles className="w-4 h-4" />
                        <span>AI Content Improver</span>
                      </div>
                      
                      <div>
                        <span className="block text-[10px] text-zinc-400 mb-2">Select Creative Brand Tone:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {(['hype', 'professional', 'funny', 'educational'] as const).map(tone => (
                            <button
                              key={tone}
                              type="button"
                              onClick={() => setComposerTone(tone)}
                              className={`py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all ${
                                composerTone === tone ? 'bg-indigo-600 text-white' : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-400'
                              }`}
                            >
                              {tone}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!composerTitle || isGeneratingCaption}
                        onClick={handleGenerateAICaption}
                        className="w-full py-2 bg-zinc-950 border border-zinc-800/80 hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGeneratingCaption ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Crafting...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Generate High-Converting Caption</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      {composerStatus === 'success' ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Successfully Scheduled!</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Schedule with official Meta API</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Post Preview Block */}
                  <div className="md:col-span-5 space-y-4">
                    <span className="block text-xs font-semibold text-zinc-400">Interactive Feed Preview</span>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Facebook Feed Standard View</span>
                      </div>
                      
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                            f
                          </div>
                          <div>
                            <span className="block text-[11px] font-bold text-zinc-200">{composerPage}</span>
                            <span className="block text-[9px] text-zinc-500">Just now • Automated</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-zinc-300 leading-normal min-h-[40px] whitespace-pre-line bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
                          {composerCaption || "Your caption will appear here as written or AI generated..."}
                        </p>

                        <div className="aspect-video rounded-lg bg-zinc-950 border border-zinc-800/80 flex flex-col items-center justify-center text-zinc-500 text-center p-4">
                          <Video className="w-8 h-8 text-zinc-700 mb-2" />
                          <span className="text-[10px] font-bold text-zinc-400 block truncate w-full px-4">
                            {composerTitle || "cinematic_promo.mp4"}
                          </span>
                          <span className="text-[9px] text-zinc-600 block mt-1">Ready to upload</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* 3. Channels Tab */}
            {activeTab === 'channels' && (
              <motion.div
                key="channels"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Meta API Channel Manager</h3>
                    <p className="text-xs text-zinc-400">Keep token permissions active and manage publication targets.</p>
                  </div>
                  <button 
                    onClick={() => setIsAddingPage(true)}
                    className="self-start sm:self-auto flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Connect Facebook Page</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pages.map(page => (
                    <div 
                      key={page.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white block">{page.name}</span>
                          <input 
                            type="checkbox"
                            checked={page.active}
                            onChange={() => handleTogglePage(page.id)}
                            className="h-4 w-7 rounded-full bg-zinc-800 border-zinc-700 checked:bg-indigo-600 text-indigo-600 transition-colors cursor-pointer"
                          />
                        </div>
                        <span className="text-zinc-500 text-xs mt-1 block">{page.followers} Facebook Followers</span>
                      </div>

                      <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-zinc-400 font-medium">Access Token State:</span>
                          <span className={`font-bold flex items-center gap-1 ${
                            page.tokenStatus === 'healthy' ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${page.tokenStatus === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            {page.tokenStatus}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-zinc-400 font-medium">Expires:</span>
                          <span className="text-zinc-300 font-mono">{page.expiry}</span>
                        </div>
                      </div>

                      {page.tokenStatus === 'warning' && (
                        <button 
                          type="button"
                          onClick={() => handleReconnectPage(page.id)}
                          className="w-full py-1.5 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg text-[10px] font-semibold transition-all mt-2"
                        >
                          Refresh Facebook OAuth Token
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Facebook Login Modal */}
                <AnimatePresence>
                  {isAddingPage && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 mt-6 flex flex-col items-center text-center space-y-4 max-w-md mx-auto"
                    >
                      <div className="h-12 w-12 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-full flex items-center justify-center text-[#1877F2]">
                        <Facebook className="w-6 h-6 fill-current" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Secure Facebook Authorization Flow</h4>
                        <p className="text-xs text-zinc-400 mt-1">
                          Grant VelorOps permissions to post videos and view insights on your Facebook Pages.
                        </p>
                      </div>

                      <div className="bg-zinc-950 p-4.5 rounded-lg border border-zinc-800 w-full text-left space-y-2.5">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-zinc-300"><strong>manage_pages</strong>: List linked accounts</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-zinc-300"><strong>publish_video</strong>: Direct video uploads</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-zinc-300"><strong>read_insights</strong>: Performance analytics</span>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full pt-2">
                        <button 
                          onClick={() => setIsAddingPage(false)}
                          className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-semibold transition-all"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => {
                            setPages([...pages, {
                              id: 'p' + (pages.length + 1),
                              name: 'Brand Promotion Page',
                              followers: '2.5K',
                              tokenStatus: 'healthy',
                              expiry: '60 days left',
                              active: true
                            }]);
                            setIsAddingPage(false);
                          }}
                          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all"
                        >
                          Agree & Connect
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* 4. Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Dynamic Audience Reach</h3>
                    <p className="text-xs text-zinc-400">Track view performance and automation optimization scores.</p>
                  </div>
                  
                  <div className="flex bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
                    <button 
                      onClick={() => setAnalyticsRange('7d')}
                      className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${analyticsRange === '7d' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      Last 7 Days
                    </button>
                    <button 
                      onClick={() => setAnalyticsRange('30d')}
                      className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${analyticsRange === '30d' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      Last 30 Days
                    </button>
                  </div>
                </div>

                {/* Chart using Pure SVG and CSS for 100% Stability */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <span className="block text-xs font-semibold text-zinc-400 mb-4">Video Views Over Time</span>
                  
                  <div className="h-64 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="100" y2="20" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="0" y1="40" x2="100" y2="40" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="0" y1="60" x2="100" y2="60" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="0" y1="80" x2="100" y2="80" stroke="#1e293b" strokeWidth="0.5" />
                      
                      {/* Gradient Fill under path */}
                      <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d={analyticsRange === '7d' 
                          ? "M 0 80 Q 15 45, 30 50 T 60 25 T 90 10 T 100 5 L 100 100 L 0 100 Z"
                          : "M 0 75 Q 10 70, 20 60 T 40 40 T 60 55 T 80 20 T 100 10 L 100 100 L 0 100 Z"
                        }
                        fill="url(#chart-grad)"
                        className="transition-all duration-700 ease-in-out"
                      />

                      {/* Main Line */}
                      <path 
                        d={analyticsRange === '7d' 
                          ? "M 0 80 Q 15 45, 30 50 T 60 25 T 90 10 T 100 5"
                          : "M 0 75 Q 10 70, 20 60 T 40 40 T 60 55 T 80 20 T 100 10"
                        }
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="2"
                        className="transition-all duration-700 ease-in-out"
                      />
                    </svg>

                    {/* Chart Tooltip */}
                    <div className="absolute top-1/4 left-2/3 bg-zinc-950 border border-zinc-800 p-2 rounded-lg text-[10px] space-y-0.5 shadow-xl select-none pointer-events-none">
                      <span className="block text-zinc-400 font-semibold">Peak Day (Automated)</span>
                      <span className="block text-white font-bold font-mono">14.8K Video Views</span>
                      <span className="block text-emerald-400 font-semibold font-mono">+142% vs baseline</span>
                    </div>
                  </div>

                  {/* Chart Legend */}
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium mt-4 border-t border-zinc-800/80 pt-3">
                    <span>{analyticsRange === '7d' ? 'July 1, 2026' : 'June 8, 2026'}</span>
                    <span>Peak Optimization</span>
                    <span>Today</span>
                  </div>
                </div>

                {/* Analytical Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wide">Total Impression</span>
                    <span className="block text-lg font-bold text-white mt-1">45.2K</span>
                    <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
                      <span>↑ 24.1%</span>
                    </span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wide">Engagement (Avg)</span>
                    <span className="block text-lg font-bold text-white mt-1">8.4%</span>
                    <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
                      <span>↑ 12.8%</span>
                    </span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wide">Shares Triggered</span>
                    <span className="block text-lg font-bold text-white mt-1">2.1K</span>
                    <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
                      <span>↑ 35.6%</span>
                    </span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wide">Time Saved (Est.)</span>
                    <span className="block text-lg font-bold text-indigo-400 mt-1">18 hrs</span>
                    <span className="text-[9px] text-zinc-500 mt-1 block font-medium">This month</span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
