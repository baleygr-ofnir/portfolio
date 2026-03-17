import { useState } from 'react';
import type { Project } from "@/types/Types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from 'react-icons/fa6';
import {
    FolderCode,
    ChevronRight,
    LayoutList,
    Search,
    PlusSquare,
    ShieldCheck,
    User,
    KeyRound,
    Image as ImageIcon
} from 'lucide-react';

interface ProjectsProps {
    projects: Project[];
}

// Map strings from the DB to your specific Lucide icons
const ICON_MAP: { [key: string]: any } = {
    'Auctions Page': LayoutList,
    'Auction Detail': Search,
    'Create Auction': PlusSquare,
    'Admin: Users': ShieldCheck,
    'Admin: Auctions': ShieldCheck,
    'Profile: Account': User,
    'Profile: My Auctions': User,
    'Profile: My Bids': User,
    'Login': KeyRound,
    'Register': KeyRound,
};

export function Projects({ projects }: ProjectsProps) {
    // Initialize active view with the first view's label/id for each project if it exists
    const [activeViews, setActiveViews] = useState<{ [key: string]: string }>(() => {
        const initial: { [key: string]: string } = {};
        projects.forEach(p => {
            if (p.views && p.views.length > 0) {
                initial[p.id] = p.views[0].label;
            }
        });
        return initial;
    });

    const handleToggleView = (projectId: string, viewLabel: string) => {
        setActiveViews(prev => ({ ...prev, [projectId]: viewLabel }));
    };

    return (
        <section id="projects" className="w-full max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-mono font-bold mb-8 flex items-center gap-3 text-purple-400">
                <FolderCode className="h-6 w-6" />
                /var/log/projects
            </h2>

            <div className="grid grid-cols-1 gap-8">
                {projects.map((project) => {
                    const activeViewLabel = activeViews[project.id] || (project.views[0]?.label);

                    return (
                        <Card key={project.id} className="bg-[#0f0f0f] border-zinc-800 shadow-xl overflow-hidden group">
                            <CardContent className="p-0 flex flex-col md:flex-row">

                                {/* Preview / Browser Shell Section */}
                                <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950 flex flex-col">
                                    <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex gap-1.5">
                                                <div className="h-2 w-2 rounded-full bg-zinc-800" />
                                                <div className="h-2 w-2 rounded-full bg-zinc-800" />
                                                <div className="h-2 w-2 rounded-full bg-zinc-800" />
                                            </div>
                                            <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">HTTPS</span>
                                        </div>

                                        <div className="flex flex-wrap gap-1">
                                            {project.views.map((v) => {
                                                const Icon = ICON_MAP[v.label] || ImageIcon;
                                                return (
                                                    <button
                                                        key={v.label}
                                                        onClick={() => handleToggleView(project.id, v.label)}
                                                        className={`p-1.5 rounded transition-all ${activeViewLabel === v.label ? 'text-purple-400 bg-purple-400/10' : 'text-zinc-600 hover:text-zinc-500'}`}
                                                        title={v.label}
                                                    >
                                                        <Icon className="h-3.5 w-3.5" />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="relative h-80 w-full overflow-hidden bg-zinc-950">
                                        {project.views.map((v) => (
                                            <img
                                                key={v.label}
                                                src={v.image}
                                                alt={v.label}
                                                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${activeViewLabel === v.label ? 'opacity-80 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
                                            />
                                        ))}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="absolute inset-0 z-10 bg-purple-900/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="bg-zinc-950/90 border border-purple-500/50 px-3 py-1.5 rounded text-[10px] font-mono text-white shadow-2xl uppercase tracking-widest">
                                                    Open Live View
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-1 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-purple-400 transition-colors uppercase tracking-tight">
                                            {project.title}
                                        </h3>
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono">
                                                <FaGithub className="h-4 w-4" />
                                                [ source ]
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>

                                    <div className="space-y-3">
                                        <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Implementation Details</p>
                                        <ul className="grid grid-cols-1 gap-y-2">
                                            {project.features.map((feat, idx) => (
                                                <li key={idx} className="text-xs text-zinc-500 flex items-center gap-2">
                                                    <ChevronRight className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tech.map((t) => (
                                            <Badge key={t} variant="secondary" className="bg-[#231a31] text-purple-200 border-[#3c255b] font-mono text-[10px]">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}