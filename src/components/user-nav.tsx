'use client';

import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Database, History } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  if (isUserLoading || !user) {
    return (
      <Link href="/login">
        <Button variant="outline" className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-primary/20 text-primary hover:bg-primary/10">
          Link Session
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-xl bg-white/5 border border-white/10">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.photoURL ?? ''} />
            <AvatarFallback className="bg-primary text-background font-black uppercase">
              {user.email?.charAt(0) || <User />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass-panel rounded-2xl border-white/20 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-black uppercase truncate">{user.email}</p>
            <p className="text-[8px] font-black opacity-40 uppercase tracking-[0.3em]">Verified Access</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <Link href="/profile">
          <DropdownMenuItem className="rounded-lg h-10 px-3 text-xs font-black uppercase cursor-pointer focus:bg-primary focus:text-background">
            <Database className="mr-3 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/history">
          <DropdownMenuItem className="rounded-lg h-10 px-3 text-xs font-black uppercase cursor-pointer focus:bg-primary focus:text-background">
            <History className="mr-3 h-4 w-4" />
            Vault
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={() => signOut(auth)} className="rounded-lg h-10 px-3 text-xs font-black uppercase cursor-pointer text-destructive focus:bg-destructive focus:text-white">
          <LogOut className="mr-3 h-4 w-4" />
          End Session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
