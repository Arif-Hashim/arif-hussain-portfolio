'use client';

import { ExternalLink, Github, Eye, Heart, Sparkles, Layers } from 'lucide-react';
import { useState } from 'react';

export default function ProjectCard({ project }) {
  const [likes, setLikes] = useState(project.likes || 12);
  const [liked, setLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <div className="card-hover group relative flex flex-col rounded-2xl bg-[#111726]/90 border border-[#1f293d] overflow-hidden transition-all duration-300">
      
      {/* Thumbnail with overlay & badge */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0c101a]">
        <img
          src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80"}
          alt={project.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full tracking-wide uppercase backdrop-blur-md shadow-md ${
            project.category === 'fullStack'
              ? 'bg-cyan-500/80 text-white border border-cyan-400/40'
              : project.category === 'frontEnd'
              ? 'bg-purple-600/80 text-white border border-purple-400/40'
              : 'bg-emerald-600/80 text-white border border-emerald-400/40'
          }`}>
            {project.category === 'fullStack' ? 'Full Stack' : project.category === 'frontEnd' ? 'Front End' : 'Backend & API'}
          </span>
        </div>

        {/* Stats on top right */}
        <div className="absolute top-3 right-3 z-10 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-gray-300 border border-white/10">
          <button 
            onClick={handleLike} 
            className={`flex items-center space-x-1 transition-colors ${liked ? 'text-red-400' : 'hover:text-red-300'}`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-400' : ''}`} />
            <span>{likes}</span>
          </button>
          <span className="text-gray-500">|</span>
          <div className="flex items-center space-x-1 text-gray-400">
            <Eye className="w-3.5 h-3.5" />
            <span>{project.views || 45}</span>
          </div>
        </div>

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent opacity-80" />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags && project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-0.5 rounded-md bg-[#192237] text-gray-300 border border-[#273552]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons: Live Demo & GitHub Code */}
        <div className="pt-4 border-t border-[#1f293d]/80 flex items-center justify-between gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors shadow-md shadow-cyan-500/20"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold bg-surface hover:bg-[#1a233a] text-gray-200 border border-surfaceBorder transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
  );
}
