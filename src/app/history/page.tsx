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
                <Loader2 className="animate-spin text-primary size-16 md:size-20 opacity-20" />
                <p className="text-sm md:text-xl font-black tracking-widest uppercase opacity-40 italic">Retrieving Vault Data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12 animate-reveal pb-32 md:pb-12">
                <div className="space-y-2 md:space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/20 px-3 md:px-4 py-1 uppercase tracking-widest text-[8px] md:text-[10px] font-black">Secure History Vault</Badge>
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">Scan <span className="text-primary">History</span></h1>
                    <p className="text-muted-foreground text-sm md:text-xl font-light">Your nutritional safety timeline.</p>
                </div>

                {scans?.length === 0 ? (
                    <div className="p-10 md:p-20 border-2 md:border-4 border-dashed border-white/5 rounded-[2rem] md:rounded-[3rem] text-center space-y-6 md:space-y-8">
                        <History className="size-12 md:size-20 text-muted-foreground/20 mx-auto" />
                        <p className="text-lg md:text-2xl font-black italic opacity-20">No saved scans found.</p>
                        <Link href="/scanner/barcode">
                            <Button size="lg" className="h-14 md:h-16 px-8 md:px-10 rounded-xl md:rounded-2xl bg-primary text-background font-black italic">Start Your First Scan</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 md:gap-6">
                        {scans?.map((scan) => (
                            <Card key={scan.id} className="rounded-2xl md:rounded-[2.5rem] glass-panel border-white/5 overflow-hidden group hover:border-primary/20 transition-all duration-500">
                                <CardContent className="p-4 md:p-8 flex items-center gap-4 md:gap-8">
                                    <div className={cn(
                                        "size-12 md:size-20 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-2xl",
                                        scan.isSafe ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                                    )}>
                                        {scan.isSafe ? <ShieldCheck className="size-6 md:size-10" /> : <Biohazard className="size-6 md:size-10" />}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-lg md:text-3xl font-black italic tracking-tighter truncate leading-none uppercase">{scan.productName}</h3>
                                            <Badge className={cn("rounded-md text-[8px] md:text-xs", scan.isSafe ? "bg-primary text-background" : "bg-destructive text-white")}>
                                                {scan.nutriScore}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground font-medium text-[10px] md:text-sm">
                                            {scan.timestamp ? format(scan.timestamp.toDate(), 'MMM d, p') : 'Syncing...'}
                                        </p>
                                        <p className="text-muted-foreground line-clamp-1 italic text-[10px] md:text-sm hidden sm:block">{scan.summary}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(scan.id)} className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0">
                                            <Trash2 className="size-5 md:size-6" />
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