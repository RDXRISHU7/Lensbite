'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, History, Trash2, ShieldCheck, Biohazard, ArrowLeft, Database } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import Link from 'next/link';

export default function HistoryPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const scansQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'users', user.uid, 'scans'), orderBy('timestamp', 'desc'));
    }, [user, firestore]);

    const { data: scans, isLoading } = useCollection(scansQuery);

    const handleDelete = async (scanId: string) => {
        if (!user || !firestore) return;
        await deleteDoc(doc(firestore, 'users', user.uid, 'scans', scanId));
    };

    if (isUserLoading || isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <Loader2 className="animate-spin text-primary size-12 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Decrypting Vault...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col p-6 md:p-12 pb-32">
            <div className="flex items-center justify-between mb-12">
                <Link href="/">
                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <ArrowLeft size={14} /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Database size={16} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">SECURE-VAULT-v2.0</span>
                </div>
            </div>

            <div className="space-y-4 mb-12">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Vault <span className="text-primary">History</span></h1>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Clinical Intelligence Log</p>
            </div>

            {scans?.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center glass-panel rounded-[3rem] border-dashed border-white/5">
                    <History className="size-16 text-white/5 mb-6" />
                    <p className="text-sm font-black uppercase tracking-[0.3em] opacity-20">No scan signatures found</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {scans?.map((scan) => (
                        <Card key={scan.id} className="rounded-[2rem] glass-panel border-white/5 hover:border-primary/30 transition-all group overflow-hidden">
                            <CardContent className="p-6 flex items-center gap-6">
                                <div className={cn(
                                    "size-16 rounded-2xl flex items-center justify-center shrink-0 border",
                                    scan.isSafe ? "bg-primary/5 text-primary border-primary/20" : "bg-destructive/5 text-destructive border-destructive/20"
                                )}>
                                    {scan.isSafe ? <ShieldCheck size={24} /> : <Biohazard size={24} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-black uppercase truncate tracking-tighter">{scan.productName}</h3>
                                    <div className="flex items-center gap-4 mt-1">
                                        <p className="text-[8px] font-black uppercase opacity-40 tracking-widest">
                                            {scan.timestamp ? format(scan.timestamp.toDate(), 'MMM d, HH:mm') : 'Syncing...'}
                                        </p>
                                        <Badge className={cn("text-[8px] font-black uppercase rounded-md", scan.isSafe ? "bg-primary text-background" : "bg-destructive text-white")}>
                                            {scan.nutriScore}
                                        </Badge>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(scan.id)} className="size-12 rounded-xl hover:bg-destructive/10 hover:text-destructive">
                                    <Trash2 size={18} />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}