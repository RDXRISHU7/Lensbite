import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';

export function Header() {
    return (
        <header className="hidden md:flex px-6 lg:px-12 h-20 items-center bg-white/10 backdrop-blur-3xl border-b border-white/20 sticky top-0 z-[100]">
            <Logo />
            <div className="ml-auto flex items-center gap-10">
                <nav className="flex items-center gap-8">
                    <Link href="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all">Home</Link>
                    <Link href="/history" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all">Vault</Link>
                    <Link href="/profile" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all">Profile</Link>
                </nav>
                <div className="h-8 w-px bg-white/20" />
                <UserNav />
            </div>
        </header>
    );
}