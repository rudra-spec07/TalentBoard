import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('seeker');

  const features = {
    seeker: [
      { title: 'Resume Screening', desc: 'Check your resume alignment against job descriptions in real-time.' },
      { title: 'AI Match Indexing', desc: 'Obtain granular scores and structured feedback on target roles.' },
      { title: 'Smart Suggestions', desc: 'Receive contextual keyword recommendations to improve response rates.' }
    ],
    employer: [
      { title: 'Automated Screening', desc: 'Evaluate hundreds of applications instantly using Gemini logic.' },
      { title: 'Detailed HR Reports', desc: 'AutoGen agents compose multi-dimensional fit reports automatically.' },
      { title: 'Candidate Ranking', desc: 'Filter and prioritize candidates by AI matching index values.' }
    ],
    admin: [
      { title: 'Role Access Audits', desc: 'Enforce RBAC rules across job boards and credentials layers.' },
      { title: 'System Analytics', desc: 'Track matching trends, database query health, and platform growth.' },
      { title: 'Database Swapping', desc: 'Toggle platform repository layers between MongoDB and PostgreSQL.' }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full">
      {/* Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 w-full px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <span className="text-white font-bold text-sm sm:text-xl">X</span>
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">TalentBoardX</span>
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20">Phase 1</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-sky-400 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-sky-400 transition-colors">Architecture</a>
          </nav>
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            <Link to="/login" className="px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-lg shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full">
        <section className="relative overflow-hidden pt-12 sm:pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            AI-Driven Resume Matching <br />
            <span className="bg-gradient-to-r from-sky-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent">Built for Enterprise Scale</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            TalentBoardX is a modern recruitment portal featuring Clean Architecture, swappable database repositories (MongoDB/PostgreSQL), and Gemini-powered assessment agents.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg shadow-lg shadow-sky-600/20 transition-all text-sm">Explore Platform Modules</Link>
            <Link to="/login" className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold rounded-lg transition-all text-sm">Log In Demo</Link>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">Functional Modules By Persona</h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">Toggle below to examine target functionalities planned for each role persona.</p>
              
              <div className="inline-flex flex-wrap sm:flex-nowrap justify-center p-1 bg-slate-900 border border-slate-800 rounded-lg mt-8 gap-1 sm:gap-0">
                <button 
                  onClick={() => setActiveTab('seeker')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${activeTab === 'seeker' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Job Seeker
                </button>
                <button 
                  onClick={() => setActiveTab('employer')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${activeTab === 'employer' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Employer
                </button>
                <button 
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${activeTab === 'admin' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Administrator
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {features[activeTab].map((f, i) => (
                <div key={i} className="p-6 sm:p-8 bg-slate-900/40 border border-slate-800/80 rounded-2xl hover:border-sky-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-base sm:text-lg mb-6 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all duration-300">
                    {i + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Architecture Summary */}
        <section id="architecture" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sky-400 text-sm font-bold uppercase tracking-wider">Enterprise Foundations</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-6">Clean & Pluggable MVC Architecture</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                TalentBoardX decouples components completely. The frontend utilizes standard REST APIs, while the backend implements a clear controller-service-repository split to allow seamless database swapping:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                  <div>
                    <strong className="text-white">Strict Repository Abstraction</strong>
                    <p className="text-slate-400 text-sm">Controllers never access data models. Service boundaries govern business calculations independently.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                  <div>
                    <strong className="text-white">Zod Payload Gatekeeping</strong>
                    <p className="text-slate-400 text-sm">Requests are sanitized and typed before reaching controllers, blocking structural injection early.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative shadow-2xl">
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <div className="mt-6 font-mono text-xs text-slate-300 space-y-4 overflow-x-auto scrollbar-thin pb-2">
                <div className="text-slate-500">// TalentBoardX Data Flow</div>
                <div>
                  <span className="text-indigo-400">class</span> <span className="text-emerald-400">AuthService</span> &#123;
                  <div className="pl-4">
                    <span className="text-indigo-400">async</span> <span className="text-sky-400">register</span>(userData) &#123;
                    <div className="pl-4 text-slate-400">
                      const existing = await userRepository.findByEmail(userData.email);<br />
                      if (existing) throw new ConflictError(...);<br />
                      const hashed = await bcrypt.hash(userData.password, 10);<br />
                      return await userRepository.create(&#123; ...userData, password: hashed &#125;);
                    </div>
                    &#125;
                  </div>
                  &#125;
                </div>
                <div className="border-t border-slate-800 pt-4 text-slate-500">
                  // Swappable Database Repository Layer<br />
                  // Change model layer only (MongoDB &lt;=&gt; PostgreSQL via Sequelize)
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">X</span>
            </div>
            <span className="text-slate-400 font-bold">TalentBoardX Platform</span>
          </div>
          <div>
            &copy; 2026 TalentBoardX. Released under Apache-2.0.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
