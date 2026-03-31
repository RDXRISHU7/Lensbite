'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { MobileNav } from '@/components/mobile-nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Lens Bite | Intelligent Food Analysis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="font-sans antialiased text-foreground bg-background">
        <div className="scanline pointer-events-none" />
        <FirebaseClientProvider>
          <div className="flex flex-col min-h-screen relative">
            {children}
            <MobileNav />
          </div>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}