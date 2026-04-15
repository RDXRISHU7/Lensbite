import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';

export function Header() {
    return (
        <header className="hidden md:flex px-6 lg:px-12 h-20 items-center border-b border-white/20 bg-white/40 backdrop-blur-xl sticky top-0 z-[100]">
            <Logo />
            <div className="ml-auto flex items-center gap-8">
                <nav className="flex items-center gap-6">
                    <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Home</Link>
                    <Link href="/history" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">History</Link>
                    <Link href="/profile" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Profile</Link>
                </nav>
                <div className="h-6 w-px bg-border/40" />
                <UserNav />
            </div>
        </header>
    );
}