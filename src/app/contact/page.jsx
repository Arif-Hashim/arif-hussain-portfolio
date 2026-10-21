'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          GET IN TOUCH
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Let's Build Something Great Together
        </h1>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Whether you have an opening for an entry-level MERN developer, need a freelance web solution, or just want to chat tech, send me a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl bg-[#111726] border border-[#1f293d] space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Details</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              I am based in Karachi, Pakistan and available for remote and on-site opportunities across Pakistan and globally.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href="mailto:arifhashimi9090@gmail.com"
                className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-surface border border-surfaceBorder hover:border-cyan-500/50 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Direct Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400">
                    arifhashimi9090@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/923488241725"
                target="_blank"
                rel="noreferrer"
                className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-surface border border-surfaceBorder hover:border-emerald-500/50 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">WhatsApp (Instant Chat)</div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-400">
                    +92 348 8241725
                  </div>
                </div>
              </a>

              <a
                href="tel:+923488241725"
                className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-surface border border-surfaceBorder hover:border-cyan-500/50 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Phone Call</div>
                  <div className="text-sm font-semibold text-white group-hover:text-purple-400">
                    +92-3488241725
                  </div>
                </div>
              </a>

              <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-surface border border-surfaceBorder">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Address</div>
                  <div className="text-sm font-semibold text-white">
                    3RD Floor H No R-1031, Sector 8/C Lines Area, PECHS, Karachi
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300 flex items-center space-x-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>Standard Response Time: Under 24 hours.</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#111726] border border-[#1f293d] shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2">Send a Direct Message</h3>
            <p className="text-sm text-gray-400 mb-6">
              Messages submitted here are saved instantly and delivered directly to the Admin Dashboard.
            </p>

            {status.success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-emerald-300 text-sm flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Thank you! Your message has been sent successfully. Arif will respond promptly.</span>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-700/50 text-red-300 text-sm flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Job Opportunity / Freelance Project"
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, or job position..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0d14] border border-[#1f293d] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3.5 px-6 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {status.loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
