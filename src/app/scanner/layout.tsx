import { Header } from '@/components/header';

export default function ScannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
