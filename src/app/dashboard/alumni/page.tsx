
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserX } from "lucide-react";
import type { UserProfile } from "@/lib/database/users";
import { alumni as mockAlumni } from "@/lib/database/alumni"; // Using mock data
import { Skeleton } from '@/components/ui/skeleton';

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // Can be set to true to simulate loading

  // Using mock data for demonstration
  const alumni: UserProfile[] = mockAlumni;

  const filteredAlumni = useMemo(() => {
    if (!alumni) return [];
    return alumni.filter(alum =>
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alum.branch && alum.branch.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alum.workingStatus && alum.workingStatus.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [alumni, searchTerm]);

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
            Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-56 w-full" />)
          )}

          {!loading && filteredAlumni && filteredAlumni.length > 0 && filteredAlumni.map((alum) => (
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
          
           {!loading && (!filteredAlumni || filteredAlumni.length === 0) && (
            <div className="md:col-span-2 lg:col-span-5 text-center py-12">
                <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Alumni Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm ? "No alumni match your search." : "There are no alumni profiles to display yet."}
                </p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
