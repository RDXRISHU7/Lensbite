import { Header } from '@/components/header';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-6 mt-8">
        {children}
      </main>
    </div>
  );
}
