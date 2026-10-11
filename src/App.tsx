import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Folder, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import data from './data.json';

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.1, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const { personal, competencies, projects, experience, blogs } = data;
  const [theme, setTheme] = useState<'paper' | 'ink'>('ink');
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [termLines, setTermLines] = useState<string[]>([
    "Connected to prod-sql-01 · Microsoft SQL Server · session 52",
    "Hi, I'm Pritesh. I build resilient data tiers and highly scalable backends."
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();
    
    if (lower === 'clear') {
      setTermLines([]);
      return;
    }
    
    let response = "";
    if (lower === 'whoami') response = "Pritesh Vadhel - Principal Software Engineer";
    else if (lower === 'bio' || lower === 'about') response = "Principal Engineer with 15+ years scaling high-availability enterprise systems, distributed .NET/AWS backends, and agentic AI architectures.";
    else if (lower === 'uptime') response = "99.99% (15+ years in production)";
    else if (lower === 'skills') response = "SQL Server, Always On, .NET 10, React, AWS Lambda, Asterisk SBC, LLMs";
    else if (lower === 'projects') response = "agency-agents, SBC-Context-Router, ArchiveManager";
    else if (lower.includes('drop table')) response = "Msg 15151, Level 16, State 1: Cannot drop table. Nice try! I've backed up transaction logs since 2010.";
    else if (lower.includes('select * from secrets') || lower.includes('passwords')) response = "(0 rows affected) You thought I'd leave those in plaintext? TDE is enabled.";
    else if (lower.startsWith('select ')) response = "(42 rows affected) Execution time: 0.001s. Look at that query plan!";
    else if (lower.startsWith('sudo ')) response = "Pritesh is not in the sudoers file. This incident will be reported to... wait, I am the sysadmin.";
    else if (lower === '') return;
    else response = `Command not found: ${trimmed}. Try 'whoami', 'uptime', or a fun SQL query!`;

    setTermLines(prev => [...prev, `> ${trimmed}`, response]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputValue);
    setInputValue("");
    // Ensure focus remains on the input after submitting
    document.getElementById('terminal-input')?.focus();
  };

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [termLines]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'paper' ? 'ink' : 'paper');
  };

  const isDark = theme === 'ink';
  
  // Brutalist Theme Colors mapped to variables
  const bg = isDark ? 'bg-[#121110]' : 'bg-[#e4dfd1]';
  const text = isDark ? 'text-[#ebe7de]' : 'text-[#151413]';
  const muted = isDark ? 'text-[#8f8a80]' : 'text-[#6d685e]';
  const signal = isDark ? 'text-[#ff5a1f]' : 'text-[#ff4d00]';
  const signalBg = isDark ? 'bg-[#ff5a1f]' : 'bg-[#ff4d00]';
  const borderRule = isDark ? 'border-[#2e2c28]' : 'border-[#c4beb0]';
  
  // Terminal colors
  const termBg = isDark ? 'bg-[#1b1a18]' : 'bg-[#151413]';
  const termText = isDark ? 'text-[#ebe7de]' : 'text-[#e9e5db]';
  const termDim = isDark ? 'text-[#7d786e]' : 'text-[#8a857b]';

  const inverseTextHover = isDark ? 'group-hover:text-[#121110]' : 'group-hover:text-[#e4dfd1]';
  const inverseTextHoverMuted = isDark ? 'group-hover:text-[#121110]/70' : 'group-hover:text-[#e4dfd1]/70';
  const inverseText = isDark ? 'text-[#121110]' : 'text-[#e4dfd1]';
  const inverseBg = isDark ? 'bg-[#ebe7de]' : 'bg-[#151413]';
  

  return (
    <div className={`${bg} ${text} font-sans min-h-screen transition-colors duration-300 selection:bg-[#ff4d00] selection:text-white pb-12 overflow-clip`}>
      
      {/* Subtle paper grain */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <header className={`sticky top-0 z-40 flex items-center justify-between py-4 backdrop-blur-md border-b ${borderRule} transition-colors duration-300`} style={{ backgroundColor: isDark ? 'rgba(18,17,16,0.85)' : 'rgba(228,223,209,0.85)' }}>
          <a href="#" className={`text-2xl font-black tracking-tighter uppercase ${text}`}>
            PV<span className={signal}>/</span>
          </a>
          
          <nav className="hidden lg:flex gap-8 font-mono text-xs uppercase tracking-widest">
            <a href="#about" className={`hover:${signal} transition-colors pb-1 border-b-2 ${activeSection === 'about' ? 'border-[#ff4d00]' : 'border-transparent'}`}>About</a>
            <a href="#experience" className={`hover:${signal} transition-colors pb-1 border-b-2 ${activeSection === 'experience' ? 'border-[#ff4d00]' : 'border-transparent'}`}>Experience</a>
            <a href="#work" className={`hover:${signal} transition-colors pb-1 border-b-2 ${activeSection === 'work' ? 'border-[#ff4d00]' : 'border-transparent'}`}>Work</a>
            <a href="#blogs" className={`hover:${signal} transition-colors pb-1 border-b-2 ${activeSection === 'blogs' ? 'border-[#ff4d00]' : 'border-transparent'}`}>Writings</a>
            <a href="#schema" className={`hover:${signal} transition-colors pb-1 border-b-2 ${activeSection === 'schema' ? 'border-[#ff4d00]' : 'border-transparent'}`}>Skills</a>
            <a href="#contact" className={`hover:${signal} transition-colors pb-1 border-b-2 ${activeSection === 'contact' ? 'border-[#ff4d00]' : 'border-transparent'}`}>Contact</a>
          </nav>

          <div className="flex items-center gap-4 font-mono text-xs">
            <button onClick={toggleTheme} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${borderRule} hover:border-current transition-colors`}>
              <div className={`w-2.5 h-2.5 rounded-full shadow-inner ${isDark ? 'bg-[#ebe7de]' : 'bg-[#151413]'}`}></div>
              <span className="uppercase hidden sm:block">{isDark ? 'Paper' : 'Ink'}</span>
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <nav className={`lg:hidden fixed inset-0 z-30 pt-24 px-6 flex flex-col gap-8 font-mono text-xl uppercase tracking-widest ${bg} ${text}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className={`hover:${signal} transition-colors border-b ${borderRule} pb-4`}>About</a>
            <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className={`hover:${signal} transition-colors border-b ${borderRule} pb-4`}>Experience</a>
            <a href="#work" onClick={() => setIsMobileMenuOpen(false)} className={`hover:${signal} transition-colors border-b ${borderRule} pb-4`}>Work</a>
            <a href="#blogs" onClick={() => setIsMobileMenuOpen(false)} className={`hover:${signal} transition-colors border-b ${borderRule} pb-4`}>Writings</a>
            <a href="#schema" onClick={() => setIsMobileMenuOpen(false)} className={`hover:${signal} transition-colors border-b ${borderRule} pb-4`}>Skills</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className={`hover:${signal} transition-colors border-b ${borderRule} pb-4`}>Contact</a>
          </nav>
        )}

        <main>
          {/* Hero Section */}
          <section className="pt-10 pb-10">
            <Reveal>
              <div className={`flex flex-wrap items-center gap-3 font-mono text-xs md:text-sm ${muted} mb-8`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${signalBg} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${signalBg}`}></span>
                </span>
                SYSTEM ONLINE <span className="opacity-50">/</span> LOCAL TIME: {new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute:'2-digit', timeZoneName: 'short' })}
              </div>

              <div className="flex flex-row items-end justify-between w-full mb-6">
                <h1 className="text-[15vw] md:text-[7rem] lg:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase">
                  Pritesh<br />Vadhel<span className={signal}>.</span>
                </h1>
                
                {/* Image Placeholder */}
                <div className="w-32 md:w-64 shrink-0 hidden sm:block relative mb-8 md:mb-0">
                  <div className={`w-full aspect-square rounded-full border-2 border-current overflow-hidden shadow-[8px_8px_0px_#ff4d00] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#ff4d00] transition-all duration-300`}>
                    <img 
                      src="/photo.png" 
                      alt="Pritesh Vadhel" 
                      className="w-full h-full object-cover contrast-125 saturate-110 scale-110"
                    />
                  </div>
                  <p className={`font-mono text-[10px] mt-6 ${muted} hidden md:block text-center`}>Fig 1. — the architect</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-current">
                
                <div className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight max-w-xl">
                  {personal.subtext}
                </div>

                <div className="font-mono text-sm border-t md:border-t-0 md:border-l border-current md:pl-8 pt-8 md:pt-0 flex justify-start md:justify-end">
                  <dl className="space-y-4 w-full max-w-sm">
                    <div className={`border-b ${borderRule} pb-3 flex justify-between`}><dt className={muted}>Role</dt><dd className="text-right">Principal Software Engineer</dd></div>
                    <div className={`border-b ${borderRule} pb-3 flex justify-between`}><dt className={muted}>Focus</dt><dd className="text-right">AI & Automation</dd></div>
                    <div className={`border-b ${borderRule} pb-3 flex justify-between`}><dt className={muted}>Stack</dt><dd className="text-right">.NET · AWS · LLMs</dd></div>
                    <div className={`flex justify-between`}><dt className={muted}>Status</dt><dd className={`text-right font-bold ${signal}`}>Online</dd></div>
                  </dl>
                </div>

              </div>
            </Reveal>
          </section>

          {/* Scrolling Ticker */}
          <div className={`-mx-6 md:-mx-12 py-3 ${signalBg} text-[#121110] transform -rotate-1 origin-center border-y-2 ${isDark ? 'border-[#ebe7de]' : 'border-[#151413]'} overflow-hidden whitespace-nowrap flex items-center`}>
            <div className="animate-[spin_30s_linear_infinite] inline-flex items-center font-black text-2xl uppercase tracking-widest gap-8 px-4" style={{ animationName: 'marquee', animationDuration: '30s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}>
              <span>SQL Server ✶ Always On ✶ .NET 10 ✶ React ✶ AWS Lambda ✶ Azure ✶ SignalR ✶ PowerShell</span>
              <span>SQL Server ✶ Always On ✶ .NET 10 ✶ React ✶ AWS Lambda ✶ Azure ✶ SignalR ✶ PowerShell</span>
            </div>
            <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
          </div>

          {/* Interactive Terminal block */}
          <section className="py-10 md:py-16">
            <Reveal>
              <div className={`${termBg} ${termText} rounded-md shadow-[8px_8px_0px_#ff4d00] max-w-4xl mx-auto border ${borderRule}`}>
                <div className={`flex justify-between items-center px-4 py-2 border-b border-[#ffffff1a] font-mono text-xs ${termDim}`}>
                  <span>pritesh@prod-sql-01</span>
                  <span className="border border-current px-2 py-0.5 rounded">type <kbd className="text-white">help</kbd></span>
                </div>
                <div ref={terminalScrollRef} className="p-4 md:p-6 font-mono text-sm h-64 overflow-y-auto flex flex-col" onClick={() => document.getElementById('terminal-input')?.focus()}>
                  {termLines.map((line, i) => (
                    <p key={i} className={line.startsWith('Connected') || line.startsWith('>') || line.startsWith('Msg') ? termDim : "mt-2"}>
                      {line.startsWith('>') ? <span className={signal}>{line.substring(0, 1)}</span> : ''}
                      {line.startsWith('>') ? line.substring(1) : line}
                    </p>
                  ))}
                  <form onSubmit={handleTerminalSubmit} className="mt-4 flex items-center gap-2">
                    <span className={`font-bold ${signal}`}>&gt;</span>
                    <input 
                      id="terminal-input"
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 text-inherit font-mono w-full"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>
                  <div className="mt-auto pt-6 flex flex-wrap gap-2 text-xs opacity-70 shrink-0">
                    <button type="button" onClick={() => handleCommand('whoami')} className="px-2 py-1 border border-current rounded hover:opacity-100 hover:bg-white/10 transition-colors">whoami</button>
                    <button type="button" onClick={() => handleCommand('skills')} className="px-2 py-1 border border-current rounded hover:opacity-100 hover:bg-white/10 transition-colors">skills</button>
                    <button type="button" onClick={() => handleCommand('projects')} className="px-2 py-1 border border-current rounded hover:opacity-100 hover:bg-white/10 transition-colors">projects</button>
                    <button type="button" onClick={() => handleCommand('uptime')} className="px-2 py-1 border border-current rounded hover:opacity-100 hover:bg-white/10 transition-colors">uptime</button>
                    <button type="button" onClick={() => handleCommand('clear')} className="px-2 py-1 border border-current rounded hover:opacity-100 hover:bg-white/10 transition-colors">clear</button>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* About & Engineering Philosophy */}
          <section id="about" className="py-10 md:py-16 border-b border-current/20">
            <Reveal>
              <header className={`flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b ${borderRule} pb-4 mb-8`}>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">About &amp; Log</h2>
                <code className={`font-mono text-xs ${muted} hidden md:block`}><span className={signal}>SELECT</span> bio, history <span className={signal}>FROM</span> engineer;</code>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Long-form bio */}
                <div className="lg:col-span-7 space-y-5 text-base md:text-lg leading-relaxed font-normal">
                  {personal.bio?.map((paragraph: string, idx: number) => (
                    <p key={idx} className={idx === 0 ? "text-lg md:text-xl font-medium" : muted}>
                      {paragraph}
                    </p>
                  ))}
                  
                  {/* Quick System Specs badge box */}
                  <div className={`mt-8 p-5 border ${borderRule} font-mono text-xs space-y-2 bg-current/5`}>
                    <div className="flex items-center justify-between border-b border-current/20 pb-2 mb-2 font-bold uppercase tracking-wider">
                      <span>[ENGINEER_SPEC.SYS]</span>
                      <span className={signal}>STATUS: ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div><span className={muted}>PRIMARY_DIALECT:</span> T-SQL / C# / TypeScript</div>
                      <div><span className={muted}>INFRA_BASE:</span> AWS / Always On / Asterisk</div>
                      <div><span className={muted}>AI_LAYER:</span> Agentic Workflows &amp; LLMs</div>
                      <div><span className={muted}>CORE_BELIEF:</span> Uptime over premature abstraction</div>
                    </div>
                  </div>
                </div>

                {/* History Timeline Log */}
                <div className="lg:col-span-5 font-mono">
                  <div className={`text-xs uppercase tracking-widest ${muted} mb-4 flex items-center gap-2`}>
                    <span className={`inline-block w-2 h-2 ${signalBg}`}></span>
                    <span>Evolution Log</span>
                  </div>
                  <div className="border-l-2 border-current/30 pl-4 sm:pl-6 space-y-6 relative">
                    {personal.history?.map((h: { phase: string, title: string, detail: string }, idx: number) => (
                      <div key={idx} className="relative group">
                        <div className={`absolute -left-[23px] sm:-left-[31px] top-1 w-3 h-3 rounded-full border-2 border-current ${idx === 2 ? signalBg : 'bg-current/40'}`}></div>
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${signal}`}>PHASE {h.phase}</span>
                        <h4 className="text-sm font-bold tracking-tight mt-0.5">{h.title}</h4>
                        <p className={`text-xs mt-1 leading-normal ${muted}`}>{h.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Metrics / Numbers */}
          <section className="py-10 md:py-16 border-b border-current/20">
            <Reveal>
              <header className={`flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b ${borderRule} pb-4 mb-6`}>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">By the numbers</h2>
                <code className={`font-mono text-xs ${muted} hidden md:block`}><span className={signal}>SELECT</span> metric, value <span className={signal}>FROM</span> career;</code>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-current/20">
                {personal.metrics.map((m, idx) => (
                  <div key={idx} className="p-6 md:p-8 border-r border-b border-current/20 hover:bg-current/5 transition-colors">
                    <div className="text-5xl md:text-7xl font-black tracking-tighter mb-2">{m.value}</div>
                    <div className={`font-mono text-xs uppercase ${muted}`}>{m.label}</div>
                  </div>
                ))}
              </div>
              <p className={`font-mono text-xs mt-6 ${muted}`}>(4 rows affected) · 0.003 s</p>
            </Reveal>
          </section>

          {/* Experience */}
          <section id="experience" className="py-10 md:py-16">
            <Reveal>
              <header className={`flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b ${borderRule} pb-4 mb-6`}>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Experience</h2>
                <code className={`font-mono text-xs ${muted} hidden md:block`}><span className={signal}>SELECT</span> * <span className={signal}>FROM</span> experience <span className={signal}>ORDER BY</span> started <span className={signal}>DESC</span>;</code>
              </header>
            </Reveal>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <Reveal key={idx} delay={0.1}>
                  <details className="group border-b border-transparent hover:border-current pb-6 cursor-pointer" open={idx === 0}>
                    <summary className="list-none flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 relative outline-none pr-8">
                      <span className={`font-mono text-sm w-32 shrink-0 ${muted}`}>{exp.period}</span>
                      <h3 className={`text-xl md:text-3xl font-bold tracking-tight ${signal} flex-1`}>{exp.role}</h3>
                      <span className="text-lg font-medium">{exp.company}</span>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 hidden md:block">
                        <div className="absolute inset-0 bg-current h-[2px] top-1/2 -translate-y-1/2"></div>
                        <div className="absolute inset-0 bg-current w-[2px] left-1/2 -translate-x-1/2 group-open:rotate-90 transition-transform duration-300"></div>
                      </div>
                    </summary>
                    <div className="mt-4 md:pl-[10rem] max-w-4xl text-base md:text-lg text-current/80 space-y-2">
                      <ul className="space-y-2">
                        {exp.description.split('. ').filter(Boolean).map((sentence, sIdx) => (
                          <li key={sIdx} className="flex gap-2">
                            <span className={signal}>→</span>
                            <span>{sentence + '.'}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {exp.tags.map(tag => (
                          <span key={tag} className={`px-2 py-1 font-mono text-xs border ${borderRule} rounded-sm`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Work / Projects */}
          <section id="work" className="py-10 md:py-16">
            <Reveal>
              <header className={`flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b ${borderRule} pb-4 mb-6`}>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Selected Work</h2>
                <code className={`font-mono text-xs ${muted} hidden md:block`}><span className={signal}>SELECT TOP</span> 3 * <span className={signal}>FROM</span> projects <span className={signal}>WHERE</span> featured = 1;</code>
              </header>
            </Reveal>

            <div className="space-y-0">
              {projects.map((project, idx) => (
                <Reveal key={idx} delay={0.1}>
                  <a href={project.link} target="_blank" rel="noreferrer" className={`group block grid grid-cols-1 md:grid-cols-[60px_1fr_auto] items-center gap-4 md:gap-8 py-8 border-b ${borderRule} relative overflow-hidden`}>
                    
                    {/* Hover Reveal Background */}
                    <div className={`absolute inset-0 bg-current origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] -z-10`}></div>
                    
                    <span className={`font-mono text-sm ${signal} ${inverseTextHover}`}>
                      <Folder size={32} />
                    </span>
                    <div className="group-hover:translate-x-4 transition-transform duration-500">
                      <h3 className={`text-2xl md:text-4xl font-bold tracking-tight ${inverseTextHover}`}>{project.title}</h3>
                      <p className={`mt-2 text-sm md:text-base ${muted} ${inverseTextHoverMuted} max-w-2xl`}>{project.description}</p>
                    </div>
                    <div className={`hidden md:flex justify-end transform transition-transform duration-500 group-hover:rotate-45 group-hover:${signal}`}>
                      <ArrowUpRight size={32} />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 flex justify-end">
                <a href={personal.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 font-mono text-xs uppercase font-bold hover:${signal} transition-colors border-b border-transparent hover:border-current pb-1`}>
                  View all repositories ↗
                </a>
              </div>
            </Reveal>
          </section>

          {/* Blogs / Writings */}
          {blogs && blogs.length > 0 && (
            <section id="blogs" className="py-10 md:py-16">
              <Reveal>
                <header className={`flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b ${borderRule} pb-4 mb-6`}>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Writings</h2>
                  <code className={`font-mono text-xs ${muted} hidden md:block`}><span className={signal}>SELECT</span> * <span className={signal}>FROM</span> sys.blogs;</code>
                </header>

                <div className="border-t border-current/20">
                  {blogs.map((blog, idx) => (
                    <Reveal key={idx} delay={0.1}>
                      <a href={blog.link} target="_blank" rel="noreferrer" className={`group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-6 border-b border-current/20 hover:bg-current/5 transition-colors px-4 -mx-4`}>
                        <span className={`font-mono text-xs w-32 shrink-0 ${signal}`}>{blog.date}</span>
                        <div className="flex-1">
                          <h3 className={`text-xl md:text-2xl font-bold tracking-tight group-hover:${signal} transition-colors`}>{blog.title}</h3>
                          <p className={`mt-2 text-sm md:text-base ${muted} max-w-3xl`}>{blog.description}</p>
                        </div>
                        <span className={`font-mono text-xs ${muted} shrink-0`}>{blog.readTime}</span>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </section>
          )}

          {/* Skills Schema */}
          <section id="schema" className="py-10 md:py-16">
            <Reveal>
              <header className={`flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b ${borderRule} pb-4 mb-6`}>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Skills Schema</h2>
                <code className={`font-mono text-xs ${muted} hidden md:block`}><span className={signal}>SELECT</span> * <span className={signal}>FROM</span> INFORMATION_SCHEMA.COLUMNS;</code>
              </header>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {competencies.map((comp, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className={`border border-current hover:-translate-y-1 transition-transform hover:shadow-[6px_6px_0px_#ff4d00] ${bg} overflow-hidden`}>
                    <h3 className={`font-mono text-sm font-bold p-3 px-4 ${inverseBg} ${inverseText}`}>dbo.{comp.category.replace('dbo.', '')}</h3>
                    <ul className="font-mono text-sm">
                      {comp.skills.map((skill: any, sIdx: number) => (
                        <li key={sIdx} className={`flex justify-between items-center border-t border-current/20 p-3 px-4`}>
                          <span className="flex items-center gap-2">
                            {skill.isPK && <span className={`text-[10px] font-bold border border-[#ff4d00] text-[#ff4d00] px-1 rounded-sm leading-tight`}>PK</span>}
                            {skill.name}
                          </span>
                          <span className={muted}>{skill.level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            
            <Reveal delay={0.4}>
              <div className={`mt-12 p-6 md:p-8 font-mono text-xs md:text-sm ${termBg} ${termText} rounded-sm border ${borderRule}`}>
                <p className={`${termDim} mb-4`}>-- constraints (certifications)</p>
                <div className="space-y-2">
                  <p><span className={signal}>CHECK</span> (microsoft.azure_database_administrator = 'associate') <span className={termDim}>-- 2021</span></p>
                  <p><span className={signal}>CHECK</span> (aws.solutions_architect = 'associate') <span className={termDim}>-- 2022</span></p>
                  <p><span className={signal}>CHECK</span> (microsoft.azure_solutions_architect = 'expert') <span className={termDim}>-- 2023</span></p>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Footer Contact */}
          <section id="contact" className="pt-10 pb-6 md:pt-16 md:pb-8">
            <Reveal>
              <p className={`font-mono text-xs uppercase tracking-widest ${signal} mb-4`}>Get in Touch</p>
              <h2 className="text-[10vw] md:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
                Got a system that<br />needs to stay up?
              </h2>
              
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <a href={`mailto:${personal.email}`} className={`text-4xl md:text-6xl font-bold tracking-tight hover:${signal} transition-colors border-b-4 border-transparent hover:border-current pb-2`}>
                  Start a Conversation ↗
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 font-mono text-sm uppercase">
                <a href={personal.linkedin} className={`hover:${signal} border-b ${borderRule} hover:border-current pb-1`} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href={personal.github} className={`hover:${signal} border-b ${borderRule} hover:border-current pb-1`} target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </Reveal>
            
            <div className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 border-t ${borderRule} pt-6 font-mono text-sm text-current opacity-70 text-center md:text-left`}>
              <div className="md:text-left">
                <p>© 2026 Pritesh V.</p>
              </div>
              <div className="md:text-center">
                <p>Powered by black coffee and raw SQL.</p>
              </div>
              <div className="md:text-right">
                <button onClick={() => window.scrollTo(0, 0)} className={`hover:${signal} transition-colors uppercase`}>
                  Back to top ↑
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
