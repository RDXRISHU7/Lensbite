'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-iris w-full h-full min-h-dvh">
      {children}
    </div>
  );
}
