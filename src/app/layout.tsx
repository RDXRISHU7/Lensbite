import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { MobileNav } from '@/components/mobile-nav';
import { Toaster } from '@/components/ui/toaster';

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
      <body className="bg-background m-0 p-0 overflow-hidden font-sans antialiased">
        <FirebaseClientProvider>
          <div className="relative min-h-dvh overflow-hidden perspective-3d">
            {children}
            <MobileNav />
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}