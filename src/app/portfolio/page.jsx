'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Search, Sparkles, Filter, RefreshCw, FolderPlus } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch projects from our Next.js API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error('Failed to load projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullStack', label: 'Full Stack (MERN)' },
    { id: 'frontEnd', label: 'Front End' },
    { id: 'backend', label: 'Backend & APIs' },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'all' ||
      project.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Title Header matching Muzammil's portfolio format */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          PORTFOLIO SHOWCASE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          My Creations & Engineering Work
        </h1>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Explore complete full stack applications, interactive frontend products, and backend REST APIs engineered by Arif Hussain.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-[#111726] border border-[#1f293d] gap-1 shadow-inner">
            {categories.map((tab) => {
              const isActive = activeCategory === tab.id;
              const count = tab.id === 'all' 
                ? projects.length 
                : projects.filter(p => p.category.toLowerCase() === tab.id.toLowerCase()).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/30 text-white' : 'bg-[#1b253b] text-gray-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech (e.g. Next.js)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111726] border border-[#1f293d] text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-sm text-gray-400">Loading portfolio creations...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-[#111726]/50 rounded-2xl border border-[#1f293d] p-8 space-y-4">
          <p className="text-gray-300 font-semibold text-lg">No projects found matching your criteria</p>
          <p className="text-gray-500 text-sm">Try choosing another category or clearing your search query.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/30"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Admin Floating Callout */}
      <div className="pt-10 border-t border-[#1f293d] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <span>Displaying {filteredProjects.length} of {projects.length} loaded creations.</span>
        <Link
          href="/admin"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#111726] border border-[#1f293d] text-cyan-400 hover:text-white hover:border-cyan-500/50 transition-colors"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>Upload or edit projects in Admin Panel</span>
        </Link>
      </div>

    </div>
  );
}
