import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal } from 'lucide-react';

export function HomeLab() {
    const linuxDistros = ['Arch Linux (Daily Driver)', 'AlmaLinux', 'Fedora', 'Rocky Linux', 'Debian', 'Ubuntu'];
    const hypervisors = ['Proxmox VE', 'XCP-ng', 'KVM/QEMU (virt-manager)'];
    const microservices = ['Docker', 'Docker Compose', 'Komodo', 'Podman'];
    const scripting = ['Bash', 'PowerShell'];

    return (
        <section className="w-full max-w-4xl mx-auto py-8">
            <Card className="border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl overflow-hidden">
                <CardHeader className="p-4 border-b border-zinc-800 bg-[#0f0f0f]">
                    <div className="flex items-center font-mono text-sm select-none">
                        <div className="relative z-20 flex items-center bg-[#231a31] text-purple-200 h-9 pl-4 pr-6 rounded-full shadow-sm">
                            <Terminal className="h-4 w-4 mr-2 opacity-70 shrink-0" />
                            <span className="font-semibold tracking-tight">
                                baleygr-ofnir@mimirsbrunnr.cloud
                            </span>
                        </div>
                        <div className="relative z-10 flex items-center bg-[#3c255b] text-purple-100 h-9 pl-8 pr-6 -ml-4 rounded-full shadow-sm">
                            <span className="opacity-90">~/skills/homelab</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-zinc-950">
                    {/* Linux Section */}
                    <div className="space-y-4">
                        <h3 className="font-mono text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Linux
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {linuxDistros.map((distro) => (
                                <Badge key={distro} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b]">
                                    {distro}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Hypervisors Section */}
                    <div className="space-y-4">
                        <h3 className="font-mono text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Hypervisors
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {hypervisors.map((hv) => (
                                <Badge key={hv} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b]">
                                    {hv}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Microservices Section */}
                    <div className="space-y-4">
                        <h3 className="font-mono text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Microservices
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {microservices.map((service) => (
                                <Badge key={service} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b]">
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Scripting Section */}
                    <div className="space-y-4">
                        <h3 className="font-mono text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Scripting
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {scripting.map((lang) => (
                                <Badge key={lang} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b]">
                                    {lang}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}