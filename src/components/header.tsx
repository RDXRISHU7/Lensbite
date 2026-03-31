import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';

export function Header() {
    return (
        <header className="hidden md:flex px-6 lg:px-12 h-20 items-center border-b border-border/50 sticky top-0 bg-white/80 backdrop-blur-xl z-[90]">
            <Logo />
            <div className="ml-auto flex items-center gap-6">
                <nav className="flex items-center gap-8 mr-8">
                    <a href="/" className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors italic tracking-tight">System</a>
                    <a href="/history" className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors italic tracking-tight">Vault</a>
                </nav>
                <UserNav />
            </div>
        </header>
    );
}