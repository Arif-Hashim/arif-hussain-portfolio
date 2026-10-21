import Link from 'next/link';
import { ArrowRight, Code2, Database, Globe, Layers, Sparkles, Terminal, CheckCircle2, Download, Briefcase, Mail } from 'lucide-react';
import { getProjects } from '@/lib/db';
import ProjectCard from '@/components/ProjectCard';

export const revalidate = 0; // dynamic on demand

export default async function HomePage() {
  const allProjects = getProjects();
  const featuredProjects = allProjects.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Column: Bio & Value Proposition */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Available for Full-time Roles & Projects</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="gradient-text">Arif Hussain</span>
                <br />
                <span className="text-3xl sm:text-5xl text-gray-300 font-bold">
                  MERN Stack Developer
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-gray-400 leading-relaxed mx-auto lg:mx-0">
                Motivated Full Stack Web Developer based in Karachi, Pakistan. Specialized in architecting robust 
                <strong className="text-gray-200"> React & Next.js </strong> frontends, scalable 
                <strong className="text-gray-200"> Node.js / Express </strong> backends, and efficient 
                <strong className="text-gray-200"> MongoDB </strong> database schemas with clean, maintainable code.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                <Link
                  href="/portfolio"
                  className="px-6 py-3.5 rounded-xl font-semibold bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-500/50 hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <span>Explore My Creations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl font-semibold bg-[#111726] hover:bg-[#1a233a] text-white border border-[#1f293d] transition-all duration-200 flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Get In Touch</span>
                </Link>

                <a
                  href="/Arif_Hussain_Resume.pdf"
                  target="_blank"
                  download
                  className="px-5 py-3.5 rounded-xl font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all text-sm flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download CV</span>
                </a>
              </div>

              {/* Key Skills Ticker */}
              <div className="pt-6 border-t border-[#1f293d]/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
                <span className="flex items-center space-x-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> <span>Next.js & React</span></span>
                <span className="flex items-center space-x-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> <span>Node & Express REST APIs</span></span>
                <span className="flex items-center space-x-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> <span>MongoDB & Mongoose</span></span>
                <span className="flex items-center space-x-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> <span>Tailwind CSS</span></span>
              </div>
            </div>

            {/* Right Column: Code Window / Profile Visual */}
            <div className="w-full max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl bg-[#0e1320] border border-[#1f293d] shadow-2xl p-5 glow-effect">
                
                {/* Code Window Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#1f293d] mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-gray-400">ArifHussain.config.js</span>
                  <div className="w-6" />
                </div>

                {/* Code syntax */}
                <div className="font-mono text-xs sm:text-sm space-y-2 text-gray-300">
                  <p><span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> = &#123;</p>
                  <p className="pl-4"><span className="text-gray-400">name:</span> <span className="text-emerald-300">'Arif Hussain'</span>,</p>
                  <p className="pl-4"><span className="text-gray-400">role:</span> <span className="text-emerald-300">'Full Stack Web Developer'</span>,</p>
                  <p className="pl-4"><span className="text-gray-400">stack:</span> [<span className="text-amber-300">'MongoDB'</span>, <span className="text-amber-300">'Express'</span>, <span className="text-amber-300">'React'</span>, <span className="text-amber-300">'Node.js'</span>, <span className="text-amber-300">'Next.js'</span>],</p>
                  <p className="pl-4"><span className="text-gray-400">education:</span> <span className="text-emerald-300">'BS Software Engineering'</span>,</p>
                  <p className="pl-4"><span className="text-gray-400">institute:</span> <span className="text-emerald-300">'Virtual University of Pakistan'</span>,</p>
                  <p className="pl-4"><span className="text-gray-400">training:</span> <span className="text-emerald-300">'Nexskill Karachi (MERN Stack)'</span>,</p>
                  <p className="pl-4"><span className="text-gray-400">location:</span> <span className="text-emerald-300">'Karachi, Pakistan'</span>,</p>
                  <p className="pl-4"><span className="text-gray-400">status:</span> <span className="text-cyan-400">'Open to Work & Collaborations'</span></p>
                  <p>&#125;;</p>
                </div>

                {/* Terminal status line */}
                <div className="mt-4 pt-3 border-t border-[#1f293d] flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center space-x-1.5 text-emerald-400">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Server ready on port 3000</span>
                  </span>
                  <span className="text-gray-500">Node v20.x</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">PORTFOLIO SPOTLIGHT</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Featured Creations</h2>
            <p className="text-gray-400 text-sm mt-1">Hand-picked web applications highlighting full-stack engineering and intuitive UX.</p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
          >
            <span>View All {allProjects.length} Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Core Capabilities / What I Bring */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">CAPABILITIES</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">What I Bring to the Table</h2>
          <p className="text-gray-400 text-sm mt-2">
            Combining modern frontend ergonomics with solid backend fundamentals from my MERN development background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-[#111726]/80 border border-[#1f293d] hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Frontend Engineering</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Responsive user interfaces crafted with React, Next.js, and Tailwind CSS. Clean, mobile-first layouts, accessible components, and swift state management.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#111726]/80 border border-[#1f293d] hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Backend & REST APIs</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Server-side logic and RESTful microservices with Node.js and Express.js. Secure JWT authentication, password hashing, and Postman-tested endpoints.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#111726]/80 border border-[#1f293d] hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Database & Deployment</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Schema modeling with MongoDB & Mongoose. Version control with Git/GitHub, continuous delivery, and zero-downtime deployment on Vercel, Netlify, and Render.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-900/40 via-surface to-indigo-950/40 border border-cyan-500/30 p-8 sm:p-14 text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Have a Project in Mind or Hiring?</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              I'm actively seeking opportunities to contribute clean MERN stack code and build impactful software products.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3 rounded-xl font-semibold bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
              >
                Let's Work Together
              </Link>
              <a
                href="https://wa.me/923488241725"
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3 rounded-xl font-semibold bg-surface hover:bg-[#1a233a] text-white border border-surfaceBorder transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
