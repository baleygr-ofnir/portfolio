import { usePortfolio } from '@/hooks/usePortfolioData';
import { HomeLab } from '@/components/HomeLab';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { Loader2, AlertTriangle } from 'lucide-react';

function App() {
  const { data: profile, isLoading, error } = usePortfolio();
  
  if (isLoading) {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-purple-500 font-mono gap-4">
          <Loader2 className="animate-spin h-8 w-8" />
          <p className="text-zinc-500 text-xs tracking-widest uppercase">Initializing...</p>
        </div>
    );
  }
  
  if (error || !profile) {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-red-500 font-mono gap-4">
          <AlertTriangle className="h-8 w-8" />
          <p className="tracking-widest uppercase text-sm">Signal Lost: Backend Unreachable</p>
        </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono selection:bg-purple-500/30">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
        <section id="hero" className="py-12 text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl uppercase">
              Jorma Lindh
            </h1>
            <p className="text-purple-400 text-lg font-semibold tracking-widest uppercase">
              .NET Cloud & Systems Student // Ex-Sysadmin
            </p>
          </div>
          <p className="mt-2 text-zinc-400 text-base max-w-2xl mx-auto leading-relaxed">
            Transitioning from six years of professional enterprise Microsoft administration and over a decade 
            of personal Linux experience into backend and systems development. <br/> Currently specialising 
            in .NET cloud architecture at IT-Högskolan.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <a 
              href="https://github.com/baleygr-ofnir" 
              target="_blank" 
              rel="noreferrer" 
              className="text-zinc-500 hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <FaGithub className="h-4 w-4" />
              <span className="font-mono uppercase tracking-widest text-[10px] underline-offset-4 hover:underline">Github</span>
            </a>
            <a 
              href="https://linkedin.com/in/jorma-lindh-86625514b" 
              target="_blank" 
              rel="noreferrer" 
              className="text-zinc-500 hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <FaLinkedin className="h-4 w-4" />
              <span className="font-mono uppercase tracking-widest text-[10px] underline-offset-4 hover:underline">LinkedIn</span>
            </a>
          </div>
        </section>

        <HomeLab />
        <Skills skills={profile.skills} />
        <Education
            educationList={profile.education ?? []}
            certificationsList={profile.certifications ?? []}
        />
        <Projects projects={profile.projects} />
        <Experience experience={profile.experience}/>
        <Contact />

      </main>

      <footer className="relative z-10 border-t border-zinc-900 bg-zinc-950/50 py-8 mt-12 text-center text-xs text-zinc-600">
        <div className="space-y-2">
          <p>baleygr-ofnir@github.com</p>
          <p className="opacity-50 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} — BUILT WITH REACT + TS + VITE + TAILWIND V4
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;