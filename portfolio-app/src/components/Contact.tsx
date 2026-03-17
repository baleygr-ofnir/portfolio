import { useState } from 'react';
import { portfolioService } from '@/services/api';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, MessageSquare, Terminal, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');

    const handleTransmit = async () => {
        if (!name.trim() || !email.trim() || !message.trim()) return;

        setStatus('transmitting');
        try {
            await portfolioService.transmitMessage({
                name: name,
                email: email,
                message: message
            });

            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            setTimeout(() => setStatus('idle'), 4000);
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section id="contact" className="w-full max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-mono font-bold mb-8 flex items-center gap-3 text-purple-400">
                <MessageSquare className="h-6 w-6" />
                /var/log/messages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                {/* LEFT COLUMN: Info */}
                {/* justify-between with 3 direct children guarantees exactly equal gaps */}
                <div className="flex flex-col justify-between h-full">

                    {/* Item 1: Top block */}
                    <Card className="bg-zinc-900/20 border-zinc-800 shrink-0">
                        <CardContent className="p-4 font-mono text-xs space-y-2">
                            <p className="text-zinc-500">// CONNECTION_ESTABLISHED</p>
                            <p className="text-zinc-500">// TARGET_RELAY: jormalindh@inbox</p>
                            <p className="text-zinc-300 leading-relaxed">
                                Use the adjacent terminal to send a direct message to my enterprise mail relay.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Item 2: LinkedIn */}
                    <a href="https://linkedin.com/in/jorma-lindh-86625514b" target="_blank" rel="noreferrer" className="block shrink-0">
                        <Card className="bg-[#0f0f0f] border-zinc-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group h-full">
                            <CardContent className="p-4 flex items-center gap-4">
                                <FaLinkedin className="h-5 w-5 text-purple-400" />
                                <div className="font-mono text-left">
                                    <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-tight">Professional Identity</p>
                                    <p className="text-sm text-zinc-200">Jorma Lindh</p>
                                </div>
                            </CardContent>
                        </Card>
                    </a>

                    {/* Item 3: GitHub */}
                    <a href="https://github.com/baleygr-ofnir" target="_blank" rel="noreferrer" className="block shrink-0">
                        <Card className="bg-[#0f0f0f] border-zinc-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group h-full">
                            <CardContent className="p-4 flex items-center gap-4">
                                <FaGithub className="h-5 w-5 text-purple-400" />
                                <div className="font-mono text-left">
                                    <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-tight">Source Control</p>
                                    <p className="text-sm text-zinc-200">baleygr-ofnir</p>
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                </div>

                {/* RIGHT COLUMN: Terminal Form */}
                <Card className="bg-[#0a0a0a] border-zinc-800 shadow-2xl flex flex-col h-full">
                    <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <Terminal className="h-3 w-3 text-zinc-500" />
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">mail_relay.sh</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Send className={`h-3 w-3 ${status === 'transmitting' ? 'text-yellow-500' : 'text-purple-500'} animate-pulse`} />
                        </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1 gap-5">

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 shrink-0">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-zinc-600 font-bold tracking-widest">Identity</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-zinc-800/50 focus:border-purple-500/50 text-zinc-300 focus:outline-none focus:ring-0 px-0 py-1 text-sm font-mono placeholder:text-zinc-800 transition-colors"
                                    placeholder="Name / Company"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={status === 'transmitting' || status === 'success'}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-mono text-zinc-600 font-bold tracking-widest">Return Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-zinc-800/50 focus:border-purple-500/50 text-zinc-300 focus:outline-none focus:ring-0 px-0 py-1 text-sm font-mono placeholder:text-zinc-800 transition-colors"
                                    placeholder="name@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'transmitting' || status === 'success'}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 min-h-30 pt-1">
                            <label className="text-[10px] uppercase font-mono text-zinc-600 font-bold tracking-widest shrink-0 mb-2">Mail Payload</label>
                            <textarea
                                className="w-full h-full bg-transparent border-none text-zinc-300 focus:outline-none focus:ring-0 p-0 text-sm font-mono resize-none placeholder:text-zinc-800 flex-1"
                                placeholder="root@mimirsbrunnr:~$ Type your email message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={status === 'transmitting' || status === 'success'}
                            />
                        </div>

                        <button
                            onClick={handleTransmit}
                            disabled={status !== 'idle' || !name.trim() || !email.trim() || !message.trim()}
                            className={`shrink-0 group relative flex items-center justify-center gap-2 w-full py-3 border transition-all font-mono text-xs uppercase tracking-[0.2em] rounded-sm
                                ${status === 'success' ? 'border-green-500/50 text-green-400 bg-green-500/5' :
                                status === 'error' ? 'border-red-500/50 text-red-400 bg-red-500/5' :
                                    'border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'}`}
                        >
                            {status === 'transmitting' ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : status === 'success' ? (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : status === 'error' ? (
                                <AlertCircle className="h-3.5 w-3.5" />
                            ) : (
                                <Mail className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                            )}

                            {status === 'transmitting' ? 'Relaying...' :
                                status === 'success' ? 'Mail Delivered' :
                                    status === 'error' ? 'Relay Failed' :
                                        'Transmit to Email'}
                        </button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}