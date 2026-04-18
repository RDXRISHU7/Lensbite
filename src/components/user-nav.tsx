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
import { User, LogOut, Database, History } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  if (isUserLoading || !user) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">
          Link Session
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-2xl bg-white border border-black/5 shadow-sm p-0 overflow-hidden">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage src={user.photoURL ?? ''} />
            <AvatarFallback className="bg-primary text-white font-black uppercase text-lg">
              {user.email?.charAt(0) || <User />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="truncate">{user.email}</p>
          <p className="text-[8px] tracking-[0.3em] font-black opacity-40">Verified Access</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile" className="w-full">
          <DropdownMenuItem>
            <Database className="mr-3" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/history" className="w-full">
          <DropdownMenuItem>
            <History className="mr-3" />
            Vault
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(auth)} className="text-destructive focus:liquid-glass-destructive focus:text-white">
          <LogOut className="mr-3" />
          End Session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}