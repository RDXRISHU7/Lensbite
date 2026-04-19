import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { MobileNav } from '@/components/mobile-nav';
import { Toaster } from '@/components/ui/toaster';
import { CommandCore } from '@/components/command-core';

export const metadata = {
  title: 'Lens Bite | Command Center',
  description: 'Clinical grade food safety intelligence platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="m-0 p-0 font-sans antialiased relative">
        <FirebaseClientProvider>
          {/* ARCHITECTURAL BACKGROUND STACK */}
          <div className="fixed inset-0 z-[-2] bg-[#F6F4FB]" />
          <CommandCore />
          
          {/* CLINICAL INTERFACE LAYER */}
          <div className="relative min-h-dvh z-10 perspective-3d">
            {children}
            <MobileNav />
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
