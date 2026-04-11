'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, History, Trash2, ShieldCheck, Biohazard, ArrowLeft, Database } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
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
            <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-background">
                <Loader2 className="animate-spin text-primary size-8" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Accessing Vault</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 pb-32 page-fade-in">
            <div className="flex items-center justify-between mb-12">
                <Link href="/">
                    <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <ArrowLeft size={16} /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Database size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure Audit Log</span>
                </div>
            </div>

            <div className="space-y-4 mb-12">
                <h1 className="text-4xl font-bold">Analysis <span className="text-primary">History</span></h1>
                <p className="text-muted-foreground">Your complete food safety audit history, stored securely.</p>
            </div>

            {scans?.length === 0 ? (
                <div className="medical-card p-24 flex flex-col items-center justify-center text-center">
                    <History className="size-12 text-muted-foreground/20 mb-6" />
                    <p className="text-sm font-medium text-muted-foreground">No analysis records found.</p>
                    <Link href="/scanner/barcode" className="mt-6">
                        <Button className="primary-btn">Initialize First Scan</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {scans?.map((scan) => (
                        <Card key={scan.id} className="medical-card hover:border-primary/30 transition-all group overflow-hidden">
                            <CardContent className="p-6 flex items-center gap-6">
                                <div className={cn(
                                    "size-12 rounded-xl flex items-center justify-center shrink-0 border",
                                    scan.isSafe ? "badge-safe" : "badge-alert"
                                )}>
                                    {scan.isSafe ? <ShieldCheck size={20} /> : <Biohazard size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold truncate leading-tight">{scan.productName}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                            {scan.timestamp ? format(scan.timestamp.toDate(), 'MMM d, HH:mm') : 'Syncing...'}
                                        </p>
                                        <Badge className={cn("text-[9px] font-bold h-5 px-2", scan.isSafe ? "badge-safe" : "badge-alert")}>
                                            Score: {scan.riskScore}
                                        </Badge>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(scan.id)} className="size-10 rounded-lg hover:bg-destructive/10 hover:text-destructive">
                                    <Trash2 size={16} />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}