'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { User, LogOut, LogIn, Database, Fingerprint } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function UserNav() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (isUserLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (user) {
    const fallback = user.email ? user.email.charAt(0).toUpperCase() : <User size={20} />;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-[0.75rem] hover:scale-110 transition-transform duration-500 border border-primary/20 bg-primary/5">
            <Avatar className="h-10 w-10 rounded-[0.5rem]">
              <AvatarImage src={user.photoURL ?? ''} alt={user.email ?? ''} />
              <AvatarFallback className="bg-primary text-background font-black italic">{fallback}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 rounded-[1.5rem] p-3 glass-panel shadow-2xl" align="end" forceMount>
          <DropdownMenuLabel className="font-normal p-4">
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-black italic tracking-tighter leading-none">
                {user.isAnonymous ? 'Guest User' : user.email}
              </p>
               <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40 mt-1">
                {user.isAnonymous ? "Guest Session" : "Authenticated"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/5" />
          <DropdownMenuGroup className="p-1">
                <Link href="/profile">
                    <DropdownMenuItem className="rounded-xl h-12 px-4 text-md font-black italic cursor-pointer focus:bg-primary focus:text-background transition-colors">
                        <Database className="mr-3 h-4 w-4" />
                        <span>My Health Profile</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="rounded-xl h-12 px-4 text-md font-black italic cursor-pointer focus:bg-primary focus:text-background transition-colors">
                    <Fingerprint className="mr-3 h-4 w-4" />
                    <span>Security Settings</span>
                </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-white/5" />
          <DropdownMenuItem onClick={handleLogout} className="rounded-xl h-12 px-4 text-md font-black italic cursor-pointer text-destructive focus:bg-destructive focus:text-white transition-colors">
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href="/login">
      <Button className="h-12 px-8 rounded-full text-md font-black italic uppercase tracking-widest bg-primary text-background hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,230,118,0.2)]">
        <LogIn className="mr-2 h-5 w-5" />
        Get Started
      </Button>
    </Link>
  );
}
