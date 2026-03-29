import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';

export function Header() {
    return (
        <header className="hidden md:flex px-6 lg:px-12 h-20 items-center border-b border-white/5 sticky top-0 bg-background/80 backdrop-blur-xl z-[90]">
            <Logo />
            <div className="ml-auto">
                <UserNav />
            </div>
        </header>
    );
}
