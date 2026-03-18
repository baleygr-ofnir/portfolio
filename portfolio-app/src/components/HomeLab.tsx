import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal } from 'lucide-react';

export function HomeLab() {
    const linuxDistros = ['Arch Linux (Daily Driver)', 'AlmaLinux', 'Fedora', 'Rocky Linux', 'Debian', 'Ubuntu'];
    const hypervisors = ['Proxmox VE', 'XCP-ng', 'KVM/QEMU (virt-manager)'];
    const microservices = ['Docker', 'Docker Compose', 'Komodo', 'Podman'];
    const scripting = ['Bash', 'PowerShell'];

    return (
        // Added px-4 so the card doesn't bleed into the physical edges of mobile screens
        <section className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-0">
            <Card className="border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl overflow-hidden">
                <CardHeader className="p-3 sm:p-4 border-b border-zinc-800 bg-[#0f0f0f]">
                    {/* Added w-full and overflow-hidden to contain the layout */}
                    <div className="flex items-center font-mono text-xs sm:text-sm select-none w-full overflow-hidden">

                        {/* Adjusted paddings and heights for mobile */}
                        <div className="relative z-20 flex items-center bg-[#231a31] text-purple-200 h-8 sm:h-9 pl-3 pr-4 sm:pl-4 sm:pr-6 rounded-full shadow-sm shrink-0">
                            <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 opacity-70 shrink-0" />
                            <span className="font-semibold tracking-tight">
                                {/* The Magic Fix: Hide the domain on mobile, show on medium screens+ */}
                                <span className="hidden md:inline">baleygr-ofnir@mimirsbrunnr.cloud</span>
                                <span className="md:hidden">baleygr-ofnir</span>
                            </span>
                        </div>

                        {/* Added min-w-0 and truncate to prevent path from breaking out */}
                        <div className="relative z-10 flex items-center bg-[#3c255b] text-purple-100 h-8 sm:h-9 pl-6 pr-4 sm:pl-8 sm:pr-6 -ml-4 rounded-full shadow-sm min-w-0">
                            <span className="opacity-90 truncate">~/skills/homelab</span>
                        </div>
                    </div>
                </CardHeader>

                {/* Adjusted padding and gap specifically for mobile readability */}
                <CardContent className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 bg-zinc-950">

                    {/* Linux Section */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-mono text-xs sm:text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Linux
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {linuxDistros.map((distro) => (
                                <Badge key={distro} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b] text-[11px] sm:text-xs">
                                    {distro}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Hypervisors Section */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-mono text-xs sm:text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Hypervisors
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {hypervisors.map((hv) => (
                                <Badge key={hv} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b] text-[11px] sm:text-xs">
                                    {hv}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Microservices Section */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-mono text-xs sm:text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Microservices
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {microservices.map((service) => (
                                <Badge key={service} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b] text-[11px] sm:text-xs">
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Scripting Section */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-mono text-xs sm:text-sm text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="h-px w-4 bg-[#563680]"></span>
                            Scripting
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {scripting.map((lang) => (
                                <Badge key={lang} variant="secondary" className="font-mono bg-[#231a31] text-purple-200 border border-[#3c255b] text-[11px] sm:text-xs">
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