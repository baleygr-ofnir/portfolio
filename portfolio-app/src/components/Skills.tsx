import type { Skill } from "@/types/Types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Server, Cloud, Code2, Wrench } from 'lucide-react';

interface SkillsProps {
    skills: Skill[];
}

// Using index signature to avoid 'Record' deprecation
const CATEGORY_MAP: { [key: string]: { icon: any } } = {
    "Backend Development": { icon: Code2 },
    "Cloud & Identity": { icon: Cloud },
    "Enterprise Infrastructure": { icon: Server },
    "Tools & Workflow": { icon: Wrench }
};

export function Skills({ skills }: SkillsProps) {
    // Group the flat list from the DB by category
    const skillGroups = skills.reduce((acc: { [key: string]: string[] }, skill) => {
        const category = skill.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill.name);
        return acc;
    }, {});

    return (
        <section className="w-full max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-mono font-bold mb-8 flex items-center gap-3 text-purple-400">
                <Cpu className="h-6 w-6" />
                /var/log/skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skillGroups).map(([category, items], i) => {
                    const groupIcon = CATEGORY_MAP[category]?.icon || Code2;
                    const Icon = groupIcon;

                    return (
                        <Card key={i} className="bg-[#0f0f0f] border-zinc-800 shadow-lg hover:border-zinc-700 transition-colors">
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
                                    <Icon className="h-4 w-4 text-purple-500" />
                                    <h3 className="font-mono text-sm font-bold text-zinc-300 uppercase tracking-wider">
                                        {category}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skillName) => (
                                        <Badge
                                            key={skillName}
                                            variant="outline"
                                            className="font-mono text-[10px] border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-purple-300 hover:border-purple-900/50 transition-all"
                                        >
                                            {skillName}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}