import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { MobileNav } from '@/components/mobile-nav';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'Lens Bite | Safety Command Center',
  description: 'Pro-grade food safety intelligence with 3D HUD technology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background m-0 p-0 overflow-hidden font-sans antialiased">
        <FirebaseClientProvider>
          <div className="relative min-h-dvh overflow-hidden preserve-3d">
            <div className="scanline" />
            {children}
            <MobileNav />
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
