import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';

export function Header() {
    return (
        <header className="px-6 lg:px-12 h-20 flex items-center border-b border-white/5 sticky top-0 bg-background/80 backdrop-blur-xl z-[90]">
            <Logo />
            <div className="ml-auto">
                <UserNav />
            </div>
        </header>
    );
}
