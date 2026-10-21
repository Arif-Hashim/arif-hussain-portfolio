import { GraduationCap, Award, Code, CheckCircle, MapPin, Mail, Phone, Calendar, Globe, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const skillCategories = [
    {
      title: 'Programming & Web Languages',
      skills: ['JavaScript (ES6+)', 'Python', 'HTML5', 'CSS3']
    },
    {
      title: 'Frontend Development',
      skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Component Lifecycle']
    },
    {
      title: 'Backend & APIs',
      skills: ['Node.js', 'Express.js', 'RESTful API Architecture', 'JWT Authentication', 'Password Hashing (Bcrypt)', 'CRUD Operations']
    },
    {
      title: 'Databases & ORM',
      skills: ['MongoDB', 'Mongoose ODM', 'Data Modeling', 'Aggregations', 'Indexes']
    },
    {
      title: 'Tools, Testing & Cloud',
      skills: ['Git & GitHub', 'Postman API Testing', 'Vercel', 'Netlify', 'Render', 'VS Code', 'Browser DevTools']
    }
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Bio Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          ABOUT ME
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Arif Hussain
        </h1>
        <p className="text-cyan-400 text-lg font-medium">
          Full Stack Web Developer (MERN Stack)
        </p>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Motivated MERN Stack developer with hands-on experience building full-stack applications, 
          including REST APIs, secure authentication, and database design. I write clean, maintainable 
          code and learn new tools quickly. Seeking an entry-level position to apply my skills and grow with a forward-thinking engineering team.
        </p>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Email</div>
            <a href="mailto:arifhashimi9090@gmail.com" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
              arifhashimi9090@gmail.com
            </a>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Phone & WhatsApp</div>
            <a href="tel:+923488241725" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
              +92-3488241725
            </a>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Location</div>
            <div className="text-sm font-semibold text-white">PECHS, Karachi, Pakistan</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f293d] flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Nationality & Status</div>
            <div className="text-sm font-semibold text-white">Pakistani • Single</div>
          </div>
        </div>
      </div>

      {/* Technical Skills Grid */}
      <section className="space-y-6">
        <div className="border-b border-[#1f293d] pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Code className="w-6 h-6 text-cyan-400" />
            <span>Capabilities & Technical Skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d] hover:border-cyan-500/40 transition-colors">
              <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{cat.title}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#192338] text-gray-200 border border-[#233252]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Professional Training Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Education Column */}
        <section className="space-y-6">
          <div className="border-b border-[#1f293d] pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              <span>Education</span>
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d] relative">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                2024 - Present
              </span>
              <h3 className="text-lg font-bold text-white mt-2">BS Software Engineering</h3>
              <p className="text-sm text-cyan-400">Virtual University of Pakistan</p>
              <p className="text-xs text-gray-400 mt-2">
                Major studies in Computer Science, Information Technology, Software Methodologies, and Web Development.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d] relative">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                2024
              </span>
              <h3 className="text-lg font-bold text-white mt-2">FSC (Pre-Engineering / ICS)</h3>
              <p className="text-sm text-purple-400">FBISE Islamabad</p>
              <p className="text-xs text-gray-400 mt-2">
                Computer Science, Mathematics, and Physics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d] relative">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                2022
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Matriculation</h3>
              <p className="text-sm text-emerald-400">FBISE Islamabad</p>
              <p className="text-xs text-gray-400 mt-2">
                Computer Science, Physics, Chemistry.
              </p>
            </div>
          </div>
        </section>

        {/* Professional Development Column */}
        <section className="space-y-6">
          <div className="border-b border-[#1f293d] pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Award className="w-6 h-6 text-cyan-400" />
              <span>Professional Development</span>
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d]">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                May 2026 - Nov 2026 • Karachi
              </span>
              <h3 className="text-lg font-bold text-white mt-2">
                Full Stack Web Development (MERN Stack) Program
              </h3>
              <p className="text-sm text-cyan-400">Nexskill, Karachi</p>
              <ul className="text-xs text-gray-300 mt-3 space-y-1.5 list-disc list-inside">
                <li>Mastered HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React, Next.js, Node.js, Express.js, and MongoDB.</li>
                <li>Built full stack web applications through hands-on, project-based curriculum.</li>
                <li>Engineered REST APIs with JSON Web Token (JWT) auth and bcrypt security.</li>
                <li>Deployed production-ready apps on Vercel and Netlify using Git & GitHub version control.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d]">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                August 2023 • 10-Day Workshop
              </span>
              <h3 className="text-lg font-bold text-white mt-2">
                HTML & CSS Hands-On Training Workshop
              </h3>
              <p className="text-sm text-purple-400">Government of Pakistan | Degree College Skardu</p>
              <ul className="text-xs text-gray-300 mt-3 space-y-1.5 list-disc list-inside">
                <li>Gained practical skills in HTML & CSS for modern web development.</li>
                <li>Applied responsive design and styling techniques in real-time coding exercises.</li>
                <li>Built a rock-solid foundation for subsequent front-end and full-stack engineering.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>

      {/* Languages & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Languages */}
        <div className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>Languages</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-200">English</span>
              <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md">
                Excellent in Reading, Listening & Writing
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-200">Urdu</span>
              <span className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md">
                Excellent in Speaking, Reading, Writing & Listening
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-200">Balti</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                Native Language
              </span>
            </div>
          </div>
        </div>

        {/* Interests & Activities */}
        <div className="p-6 rounded-2xl bg-[#111726] border border-[#1f293d]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Extra-Curricular Interests</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {['Cricket', 'Football', 'Book Reading', 'Freelancing', 'Documentaries & Tech Cinema', 'Continuous Learning'].map((interest, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1a233a] text-gray-200 border border-[#273656]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
