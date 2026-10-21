import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, MessageSquare, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1f293d] bg-[#080b12] text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center space-x-2 text-xl font-bold text-white">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-sm">
              AH
            </span>
            <span>Arif <span className="text-cyan-400">Hussain</span></span>
          </div>

          <p className="max-w-md text-sm text-gray-400">
            Full Stack Web Developer (MERN Stack) passionate about architecting scalable web applications, robust REST APIs, and responsive digital experiences.
          </p>

          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-gray-400 mb-4">
              Follow me on Social Media & Connect
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/arifhashimi9090"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/arif-hussain-mern"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923488241725"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                title="WhatsApp (+92 348 8241725)"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:arifhashimi9090@gmail.com"
                className="w-10 h-10 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                title="Email: arifhashimi9090@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+923488241725"
                className="w-10 h-10 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                title="Phone: +92 348 8241725"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <hr className="w-full border-surfaceBorder max-w-2xl" />

          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl text-xs text-gray-500 gap-4">
            <div>
              Copyright &copy; {new Date().getFullYear()} Arif Hussain | All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link>
              <span>•</span>
              <Link href="/about" className="hover:text-cyan-400 transition-colors">About & Skills</Link>
              <span>•</span>
              <Link href="/admin" className="text-cyan-400/80 hover:text-cyan-300 flex items-center">
                Admin Panel <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
