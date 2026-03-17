import type { Education as EducationType, Certification } from "@/types/Types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar } from "lucide-react";

interface EducationProps {
    educationList: EducationType[];
    certificationsList: Certification[];
}

export function Education({ educationList, certificationsList }: EducationProps) {
    return (
        <section className="w-full max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-mono font-bold mb-8 flex items-center gap-3 text-purple-400">
                <GraduationCap className="h-6 w-6" />
                /var/log/education
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education Section */}
                <div className="space-y-4">
                    {educationList?.map((edu) => (
                        <Card key={edu.id} className="bg-[#0f0f0f] border-zinc-800 shadow-xl overflow-hidden">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Badge className="bg-purple-950/40 text-purple-300 border-purple-800/30 font-mono text-[10px] uppercase">
                                        {edu.status}
                                    </Badge>
                                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>{edu.timeFrame}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-100">{edu.degree}</h3>
                                    <p className="text-purple-400 font-mono text-sm uppercase tracking-tight">{edu.institution}</p>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    {edu.description}
                                </p>
                            </CardContent>
                        </Card>
                    )) ?? <p>No education data found.</p>}
                </div>

                {/* Certifications Section */}
                <Card className="bg-[#0f0f0f] border-zinc-800 shadow-xl">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2 text-purple-400">
                            <Award className="h-5 w-5" />
                            <h3 className="font-mono text-sm uppercase tracking-widest font-bold">Certifications</h3>
                        </div>
                        <div className="space-y-3">
                            {certificationsList.map((cert) => (
                                <div key={cert.id} className="flex justify-between items-center group">
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {cert.name}
                  </span>
                                    <span className="font-mono text-[10px] text-zinc-600 italic uppercase">
                    {cert.issued}
                  </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}