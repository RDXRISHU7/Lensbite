'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, History, Trash2, ShieldCheck, Biohazard } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import Link from 'next/link';

export default function HistoryPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const scansQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, 'users', user.uid, 'scans'),
            orderBy('timestamp', 'desc')
        );
    }, [user, firestore]);

    const { data: scans, isLoading } = useCollection(scansQuery);

    const handleDelete = async (scanId: string) => {
        if (!user || !firestore) return;
        await deleteDoc(doc(firestore, 'users', user.uid, 'scans', scanId));
    };

    if (isUserLoading || isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-8">
                <Loader2 className="animate-spin text-primary size-20 opacity-20" />
                <p className="text-sm font-black tracking-[0.5em] uppercase opacity-40">Syncing Vault...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col perspective-1000">
            <Header />
            <main className="flex-1 container max-w-5xl mx-auto px-4 py-12 space-y-12 animate-reveal pb-32 md:pb-12 preserve-3d">
                <div className="space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/20 px-4 py-1.5 uppercase tracking-[0.4em] text-[10px] font-black">Secure History Vault</Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Scan <span className="text-primary">History</span></h1>
                    <p className="text-muted-foreground text-sm md:text-xl font-medium uppercase tracking-[0.2em] opacity-40">Your clinical safety timeline.</p>
                </div>

                {scans?.length === 0 ? (
                    <div className="p-20 border-4 border-dashed border-white/5 rounded-[3rem] text-center space-y-10 glass-panel">
                        <History className="size-20 text-muted-foreground/20 mx-auto" />
                        <p className="text-2xl font-black opacity-20 uppercase tracking-widest">No vault entries found.</p>
                        <Link href="/scanner/barcode">
                            <Button size="lg" className="h-20 px-12 rounded-2xl bg-primary text-background font-black uppercase tracking-widest">Initial Scan</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {scans?.map((scan) => (
                            <Card key={scan.id} className="rounded-[2.5rem] glass-panel border-white/5 overflow-hidden group hover:border-primary/40 transition-all duration-500 preserve-3d hover:-translate-y-2">
                                <CardContent className="p-6 md:p-10 flex items-center gap-6 md:gap-10">
                                    <div className={cn(
                                        "size-16 md:size-24 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl",
                                        scan.isSafe ? "bg-primary/10 text-primary border border-primary/20" : "bg-destructive/10 text-destructive border border-destructive/20"
                                    )}>
                                        {scan.isSafe ? <ShieldCheck className="size-8 md:size-12" /> : <Biohazard className="size-8 md:size-12" />}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-2xl md:text-4xl font-black tracking-tighter truncate leading-none uppercase">{scan.productName}</h3>
                                            <Badge className={cn("rounded-lg px-3 py-1 font-black", scan.isSafe ? "bg-primary text-background" : "bg-destructive text-white")}>
                                                {scan.nutriScore}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest">
                                                {scan.timestamp ? format(scan.timestamp.toDate(), 'MMM d, p') : 'Syncing...'}
                                            </p>
                                            <span className="size-1 rounded-full bg-white/20" />
                                            <p className="text-muted-foreground font-medium text-[10px] uppercase tracking-widest truncate">{scan.summary}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(scan.id)} className="size-14 md:size-20 rounded-2xl hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0">
                                            <Trash2 className="size-6 md:size-8" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}