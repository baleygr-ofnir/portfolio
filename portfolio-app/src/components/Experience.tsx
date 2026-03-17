import { useState, useMemo } from 'react';
import type { Experience as ExperienceType } from '@/types/Types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceProps {
    experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    // Deep sort: Sort experiences AND the nested assignments
    const sortedExperience = useMemo(() => {
        const parseDate = (dateStr: string) => {
            const start = dateStr.split(' - ')[0].split('.');
            return start.length === 2
                ? new Date(parseInt(start[1]), parseInt(start[0]) - 1).getTime()
                : new Date(parseInt(start[0]), 0).getTime();
        };

        return [...experience]
            .sort((a, b) => parseDate(b.timeFrame) - parseDate(a.timeFrame))
            .map(exp => ({
                ...exp,
                assignments: [...(exp.assignments ?? [])].sort((a, b) => parseDate(b.dates) - parseDate(a.dates))
            }));
    }, [experience]);

    const toggleSection = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <section id="experience" className="w-full max-w-4xl mx-auto py-8 px-4 font-mono">
            <h2 className="text-2xl font-bold mb-12 flex items-center gap-3 text-purple-400">
                <Briefcase className="h-6 w-6" />
                /var/log/experience
            </h2>

            <div className="relative border-l-2 border-zinc-800 ml-4 space-y-12">
                {sortedExperience.map((item) => {
                    const isExpanded = expandedIds.includes(item.id);
                    const hasAssignments = item.assignments && item.assignments.length > 0;

                    return (
                        <div key={item.id} className="relative pl-10">
                            {/* Node using your Tailwind v4 classes */}
                            <div className="absolute -left-2.75 top-1.5 h-5 w-5 rounded-full border-4 border-zinc-950 bg-purple-600 shadow-[0_0_12px_rgba(147,51,234,0.6)] z-10" />

                            <div
                                className={`flex flex-col gap-1 group ${hasAssignments ? 'cursor-pointer' : ''} select-none transition-all`}
                                onClick={() => hasAssignments && toggleSection(item.id)}
                            >
                                <div className="flex items-center gap-2 text-zinc-500 text-[11px] uppercase tracking-widest mb-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{item.timeFrame}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold tracking-tight text-zinc-100 group-hover:text-purple-300 transition-colors">
                                            {item.position}
                                        </h3>
                                        <p className="text-purple-400 text-sm font-medium">@ {item.company}</p>
                                    </div>
                                    {hasAssignments && (
                                        <div className="text-zinc-500 group-hover:text-purple-400 transition-colors mr-2">
                                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                {hasAssignments ? (
                                    <div
                                        className={`grid gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
                                            isExpanded ? 'max-h-250 opacity-100 mt-6' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        {item.assignments.map((assignment, j) => (
                                            <Card key={j} className="bg-[#0a0a0a] border-zinc-800 hover:border-zinc-700 transition-colors">
                                                <CardContent className="p-5">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="secondary" className="bg-purple-950/40 text-purple-200 border-purple-800/30 text-[10px] uppercase px-2">
                                                                Assignment
                                                            </Badge>
                                                            <span className="font-bold text-zinc-200">{assignment.name}</span>
                                                        </div>
                                                        <span className="text-[11px] text-zinc-600 italic">{assignment.dates}</span>
                                                    </div>
                                                    <p className="text-sm text-zinc-400 leading-relaxed flex items-start gap-2">
                                                        <ChevronRight className="h-4 w-4 mt-0.5 text-purple-600 shrink-0" />
                                                        {assignment.task}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    item.description && (
                                        <Card className="bg-[#0a0a0a] border-zinc-800/50">
                                            <CardContent className="p-5">
                                                <p className="text-sm text-zinc-400 leading-relaxed italic">
                                                    {item.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}