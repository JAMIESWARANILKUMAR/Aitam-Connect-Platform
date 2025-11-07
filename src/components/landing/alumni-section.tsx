
'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { alumni as mockAlumni } from '@/lib/database/alumni';

export default function AlumniSection() {
  const featuredAlumni = mockAlumni.slice(0, 4);

  const getInitials = (name?: string) => {
    if (!name) return 'A';
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
    <section id="alumni" className="w-full py-12 md:py-24 lg:py-32 bg-colorful-gradient">
      <div className="container px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 mb-8">
          <Users className="w-10 h-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Meet Our Alumni</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredAlumni.map((alumnus) => (
            <Link key={alumnus.id} href={`/dashboard/alumni/${alumnus.id}`} className="block group">
                <div className="relative flex h-full flex-col items-center justify-center p-6 text-center rounded-lg transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2 group-hover:scale-105 group-hover:ring-4 group-hover:ring-primary/50 overflow-hidden">
                    <div className="absolute inset-0 bg-card/30 backdrop-blur-lg -z-10"></div>
                    <Avatar className="h-24 w-24 mb-4 border-2 border-white/50">
                    <AvatarImage src={alumnus.profileImageUrl} data-ai-hint="person face" />
                    <AvatarFallback style={{ backgroundColor: nameToHslColor(alumnus.name) }}>
                        {getInitials(alumnus.name)}
                    </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">{alumnus.name}</h3>
                    <p className="text-sm text-muted-foreground">{alumnus.workingStatus}</p>
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                        {alumnus.passOutYear && <Badge variant="secondary">Batch of {alumnus.passOutYear}</Badge>}
                        {alumnus.branch && <Badge variant="secondary">{alumnus.branch}</Badge>}
                    </div>
                    <Button variant="link" size="sm" className="mt-4 text-primary">
                        View Profile
                    </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
