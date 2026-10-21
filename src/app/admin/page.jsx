'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Plus, Trash2, Edit2, ExternalLink, 
  Github, Eye, Heart, MessageSquare, RefreshCw, 
  FolderKanban, Star, AlertCircle, FileText, Upload, CheckCircle2, Download, User
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'cv' | 'messages'
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // CV Upload state
  const [cvFile, setCvFile] = useState(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvMsg, setCvMsg] = useState({ type: '', text: '' });

  // Form state for creating/editing project
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'fullStack',
    description: '',
    image: '',
    tags: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const [formMsg, setFormMsg] = useState({ type: '', text: '' });

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchAdminData();
        }
      } catch (err) {
        console.error('Session check error', err);
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginCreds)
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        fetchAdminData();
      } else {
        setLoginError(data.message || 'Invalid User ID or Password');
      }
    } catch (err) {
      setLoginError('Server se connect nahi ho saka. Dobara check karein.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setLoginCreds({ username: '', password: '' });
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [projRes, msgRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/contact')
      ]);
      const projData = await projRes.json();
      const msgData = await msgRes.json();

      if (projData.success) setProjects(projData.data);
      if (msgData.success) setMessages(msgData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: '',
      category: 'fullStack',
      description: '',
      image: '',
      tags: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    });
    setFormMsg({ type: '', text: '' });
    setShowForm(true);
  };

  const openEditModal = (p) => {
    setIsEditing(true);
    setEditId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      image: p.image || '',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags,
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      featured: Boolean(p.featured)
    });
    setFormMsg({ type: '', text: '' });
    setShowForm(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });

    try {
      const url = isEditing ? `/api/projects/${editId}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setFormMsg({ type: 'success', text: isEditing ? 'Project update ho gaya!' : 'Naya project add ho gaya!' });
        fetchAdminData();
        setTimeout(() => {
          setShowForm(false);
        }, 1200);
      } else {
        setFormMsg({ type: 'error', text: data.message || 'Operation failed.' });
      }
    } catch (err) {
      setFormMsg({ type: 'error', text: 'Server se connect nahi ho saka.' });
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Kya aap waqai is project ko delete karna chahte hain?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      alert('Project delete karne mein masla aya.');
    }
  };

  // Handle CV Upload
  const handleCvUpload = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setCvMsg({ type: 'error', text: 'Pehle PDF CV file select karein.' });
      return;
    }

    setCvUploading(true);
    setCvMsg({ type: '', text: '' });

    const data = new FormData();
    data.append('cv', cvFile);

    try {
      const res = await fetch('/api/upload-cv', {
        method: 'POST',
        body: data
      });
      const resData = await res.json();

      if (resData.success) {
        setCvMsg({ type: 'success', text: 'Shabash! CV kamyabi se upload ho chuki hai.' });
        setCvFile(null);
      } else {
        setCvMsg({ type: 'error', text: resData.message || 'CV upload nahi ho saki.' });
      }
    } catch (err) {
      setCvMsg({ type: 'error', text: 'Network issue. Dobara koshish karein.' });
    } finally {
      setCvUploading(false);
    }
  };

  // Loading State while checking auth
  if (authChecking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-cyan-400">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-sm">Security check ho rahi hai...</span>
        </div>
      </div>
    );
  }

  // 🔒 SECURE LOGIN FORM (Strictly for Arif Hussain)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#111726] border border-[#1f293d] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Control Access</h1>
            <p className="text-xs text-gray-400">
              Sirf Authorized Owner (Arif Hussain) hi is dashboard ko use kar sakta hai.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                User ID / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  required
                  placeholder="Enter User ID"
                  value={loginCreds.username}
                  onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="Enter Password"
                  value={loginCreds.password}
                  onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all text-sm disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Login to Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ✅ AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#1f293d] gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Logged in as Admin (Arif Hussain)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Portfolio Control Panel</h1>
          <p className="text-xs text-gray-400">Yahan se apne projects manage karein, nayi CV upload karein, aur contact messages dekhein.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchAdminData}
            className="p-2.5 rounded-xl bg-[#111726] border border-[#1f293d] text-gray-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors flex items-center space-x-2 text-xs"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-950/40 text-red-300 border border-red-800/60 hover:bg-red-900/40 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d]">
          <div className="text-xs text-gray-400 font-medium">Total Projects</div>
          <div className="text-2xl font-extrabold text-white mt-1">{projects.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d]">
          <div className="text-xs text-gray-400 font-medium">Full Stack (MERN)</div>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1">
            {projects.filter(p => p.category === 'fullStack').length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d]">
          <div className="text-xs text-gray-400 font-medium">Front End</div>
          <div className="text-2xl font-extrabold text-purple-400 mt-1">
            {projects.filter(p => p.category === 'frontEnd').length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d]">
          <div className="text-xs text-gray-400 font-medium">Inquiries Received</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">{messages.length}</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#1f293d]">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center space-x-2 py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'projects'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cv')}
          className={`flex items-center space-x-2 py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'cv'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>CV Management</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center space-x-2 py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'messages'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Client Inquiries ({messages.length})</span>
        </button>
      </div>

      {/* Projects Management Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">All Showcase Items</h2>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Project</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#1f293d] bg-[#111726]">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#0e1422] text-gray-400 uppercase font-semibold border-b border-[#1f293d]">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Tags</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f293d]">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80"}
                          alt={p.title}
                          className="w-12 h-8 rounded object-cover border border-[#1f293d]"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{p.title}</div>
                          <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">{p.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        p.category === 'fullStack'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : p.category === 'frontEnd'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.tags && p.tags.slice(0, 3).map((t, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-surface border border-surfaceBorder text-[10px]">
                            {t}
                          </span>
                        ))}
                        {p.tags && p.tags.length > 3 && (
                          <span className="text-[10px] text-gray-500">+{p.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {p.featured ? (
                        <span className="inline-flex items-center space-x-1 text-amber-400 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-gray-500">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg bg-surface border border-surfaceBorder hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/50 hover:bg-red-900/50 text-red-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CV Management Tab */}
      {activeTab === 'cv' && (
        <div className="max-w-2xl bg-[#111726] border border-[#1f293d] rounded-2xl p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>Resume / CV Management</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Yahan se aap apni updated PDF CV upload kar sakte hain. Ye website par direct "Download CV" button ke sath link ho jayegi.
            </p>
          </div>

          {cvMsg.text && (
            <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
              cvMsg.type === 'success'
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800'
                : 'bg-red-950/40 text-red-300 border border-red-800'
            }`}>
              {cvMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
              <span>{cvMsg.text}</span>
            </div>
          )}

          <div className="p-4 rounded-xl bg-[#0a0d14] border border-[#1f293d] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                PDF
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Current CV File</div>
                <div className="text-xs text-gray-500">public/Arif_Hussain_Resume.pdf</div>
              </div>
            </div>

            <a
              href="/Arif_Hussain_Resume.pdf"
              target="_blank"
              download
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs font-semibold border border-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>View / Download</span>
            </a>
          </div>

          <form onSubmit={handleCvUpload} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Nayi CV Upload Karein (PDF format)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="w-full text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500 file:text-black hover:file:bg-cyan-400 cursor-pointer bg-[#0a0d14] p-2 rounded-xl border border-[#1f293d]"
              />
            </div>

            <button
              type="submit"
              disabled={cvUploading || !cvFile}
              className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{cvUploading ? 'Uploading...' : 'Upload & Update CV'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Client Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Contact Form Inquiries</h2>
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-[#111726] rounded-2xl border border-[#1f293d]">
              Abhi tak koi message nahi mila.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((m) => (
                <div key={m.id} className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{m.name}</span>
                    <span className="text-[11px] text-gray-500">
                      {new Date(m.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-cyan-400 font-medium">{m.email}</div>
                  <div className="text-xs font-semibold text-gray-300">Sub: {m.subject}</div>
                  <p className="text-xs text-gray-400 bg-[#0a0d14] p-3 rounded-xl border border-[#1f293d] leading-relaxed">
                    "{m.message}"
                  </p>
                  <div className="pt-2 flex justify-end">
                    <a
                      href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 border border-cyan-500/30"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#111726] border border-[#1f293d] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f293d]">
              <h3 className="text-xl font-bold text-white">
                {isEditing ? 'Edit Project Details' : 'Upload New Portfolio Project'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {formMsg.text && (
              <div className={`p-3 rounded-lg text-xs ${
                formMsg.type === 'success'
                  ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800'
                  : 'bg-red-950/40 text-red-300 border border-red-800'
              }`}>
                {formMsg.text}
              </div>
            )}

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Real-Time Chat Application"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="fullStack">Full Stack (MERN)</option>
                    <option value="frontEnd">Front End</option>
                    <option value="backend">Backend & APIs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Tech Stack (Comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleFormChange}
                    placeholder="React, Node.js, Express, MongoDB"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Image URL (Unsplash or direct image link)</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Live Demo / Preview URL</label>
                  <input
                    type="text"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleFormChange}
                    placeholder="https://myapp.vercel.app"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleFormChange}
                    placeholder="https://github.com/arifhashimi9090/repo"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe key features, technical architecture, and problems solved..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleFormChange}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-[#0a0d14] border-[#1f293d]"
                />
                <label htmlFor="featured" className="text-xs text-gray-300 select-none cursor-pointer">
                  Pin to Homepage Spotlight ("Featured Project")
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#1f293d]">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl bg-surface border border-surfaceBorder text-gray-300 text-xs font-semibold hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  {isEditing ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
