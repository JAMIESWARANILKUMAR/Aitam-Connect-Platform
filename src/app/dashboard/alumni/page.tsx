
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserX, ChevronLeft, ChevronRight } from "lucide-react";
import { useFirestore } from "@/firebase";
import type { UserProfile } from "@/lib/database/users";
import { collection, query, where, getDocs, limit, startAfter, orderBy, DocumentSnapshot } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PROFILES_PER_PAGE = 10;

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const firestore = useFirestore();
  const [alumni, setAlumni] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [page, setPage] = useState(0);
  const [pageHistory, setPageHistory] = useState<(DocumentSnapshot | null)[]>([null]);


  const fetchAlumni = async (direction: 'next' | 'prev' | 'start' = 'start') => {
    if (!firestore) return;
    setLoading(true);
    setError(null);

    try {
        let alumniQuery;
        const baseQuery = query(
            collection(firestore, 'users'),
            where('designation', '==', 'Alumni'),
            orderBy('name')
        );

        if (direction === 'next' && lastVisible) {
            alumniQuery = query(baseQuery, startAfter(lastVisible), limit(PROFILES_PER_PAGE));
        } else if (direction === 'prev' && page > 0) {
            const prevCursor = pageHistory[page-1];
            alumniQuery = prevCursor ? query(baseQuery, startAfter(prevCursor), limit(PROFILES_PER_PAGE)) : query(baseQuery, limit(PROFILES_PER_PAGE));
        } else {
             alumniQuery = query(baseQuery, limit(PROFILES_PER_PAGE));
        }
        
        const documentSnapshots = await getDocs(alumniQuery);
        
        const alumniData: UserProfile[] = documentSnapshots.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as UserProfile));

        setAlumni(alumniData);

        const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lastDoc || null);

        if (direction === 'next') {
            setPage(p => p + 1);
            setPageHistory(h => [...h, lastDoc]);
        } else if (direction === 'prev' && page > 0) {
            setPage(p => p - 1);
            setPageHistory(h => h.slice(0, h.length -1));
        } else {
            setPage(0);
            setPageHistory([null, lastDoc]);
        }

    } catch (e: any) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni('start');
  }, [firestore]);


  const filteredAlumni = alumni?.filter(alum =>
    alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (alum.branch && alum.branch.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (alum.workingStatus && alum.workingStatus.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getInitials = (name?: string) => {
    if (!name) return "A";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  const nameToHslColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 80%)`;
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Alumni Network</CardTitle>
           <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni by name, branch, or company..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {loading && (
            Array.from({ length: PROFILES_PER_PAGE }).map((_, i) => <Skeleton key={i} className="h-56 w-full" />)
          )}

          {error && (
            <Alert variant="destructive" className="md:col-span-2 lg:col-span-5">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Could not load alumni data. Please try again later.</AlertDescription>
            </Alert>
          )}

          {!loading && !error && filteredAlumni && filteredAlumni.length > 0 && filteredAlumni.map((alum) => (
            <Link key={alum.id} href={`/dashboard/alumni/${alum.id}`} className="block transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:bg-card rounded-lg">
              <Card className="flex h-full flex-col items-center justify-center p-6 text-center border-0 shadow-none">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={alum.profileImageUrl} data-ai-hint="person face" />
                  <AvatarFallback style={{ backgroundColor: nameToHslColor(alum.name) }}>
                    {getInitials(alum.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{alum.name}</h3>
                <p className="text-sm text-muted-foreground">{alum.workingStatus || alum.designation}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {alum.passOutYear && <Badge variant="secondary">Batch of {alum.passOutYear}</Badge>}
                  {alum.branch && <Badge variant="secondary">{alum.branch}</Badge>}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  View Profile
                </Button>
              </Card>
            </Link>
          ))}
          
           {!loading && !error && (!filteredAlumni || filteredAlumni.length === 0) && (
            <div className="md:col-span-2 lg:col-span-5 text-center py-12">
                <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Alumni Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm ? "No alumni match your search." : "There are no alumni profiles to display yet."}
                </p>
            </div>
           )}
        </CardContent>
         <div className="flex justify-center items-center gap-4 p-4">
            <Button onClick={() => fetchAlumni('prev')} disabled={page === 0 || loading}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm font-medium">Page {page + 1}</span>
            <Button onClick={() => fetchAlumni('next')} disabled={alumni.length < PROFILES_PER_PAGE || loading}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </Card>
    </div>
  );
}
