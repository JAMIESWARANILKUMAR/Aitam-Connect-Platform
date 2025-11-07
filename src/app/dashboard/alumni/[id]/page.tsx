
'use client';

import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Award,
  ChevronLeft,
  Construction,
  Lightbulb,
  Linkedin,
  Mail,
  Rss,
  UserX,
} from 'lucide-react';
import Link from 'next/link';
import { alumni as mockAlumni } from "@/lib/database/alumni";
import type { UserProfile } from '@/lib/database/users';

export default function AlumniProfilePage({ params }: { params: { id: string } }) {
  const { alumni, loading, error } = useMemo(() => {
    const foundAlumni = mockAlumni.find(a => a.id === params.id);
    return { alumni: foundAlumni, loading: false, error: !foundAlumni };
  }, [params.id]);


  const getInitials = (name?: string) => {
    if (!name) return 'A';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error || !alumni) {
    return (
       <div className="text-center py-12">
          <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Alumni Not Found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
              The profile you are looking for does not exist in the mock data.
          </p>
           <Button asChild variant="outline" className="mt-4">
               <Link href="/dashboard/alumni">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Alumni Network
               </Link>
           </Button>
      </div>
    );
  }

  const ProfileSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => {
    const hasContent = React.Children.count(children) > 0 && React.Children.toArray(children).some(child => child);
    if (!hasContent) return null;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                {icon}
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                {children}
            </CardContent>
        </Card>
    );
  };


  return (
    <div className="flex flex-col gap-8">
        <Button asChild variant="outline" className="self-start">
           <Link href="/dashboard/alumni">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Alumni Network
           </Link>
       </Button>
      <Card>
        <CardHeader className="flex flex-col items-center text-center gap-4 p-6 md:p-8">
          <Avatar className="h-32 w-32 border-4 border-primary">
            <AvatarImage src={alumni.profileImageUrl} data-ai-hint="person face" />
            <AvatarFallback className="text-4xl">{getInitials(alumni.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-3xl">{alumni.name}</CardTitle>
            <CardDescription className="text-lg">{alumni.workingStatus}</CardDescription>
             <div className="flex flex-wrap justify-center gap-2 pt-2">
                {alumni.branch && <Badge variant="secondary">{alumni.branch}</Badge>}
                {alumni.passOutYear && <Badge variant="secondary">Batch of {alumni.passOutYear}</Badge>}
                {alumni.specialization && <Badge variant="outline">{alumni.specialization}</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            {alumni.email && (
                <Button asChild variant="outline" size="sm">
                    <a href={`mailto:${alumni.email}`}><Mail className="mr-2 h-4 w-4"/> Email</a>
                </Button>
            )}
             <Button variant="outline" size="sm">
                <Rss className="mr-2 h-4 w-4"/> Follow
             </Button>
            {alumni.linkedin && (
                <Button asChild size="sm">
                    <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4"/> LinkedIn</a>
                </Button>
            )}
          </div>
        </CardHeader>
      </Card>

        <ProfileSection title="Specialization" icon={<Lightbulb className="h-6 w-6 text-primary" />}>
           {alumni.specialization && <p>{alumni.specialization}</p>}
        </ProfileSection>

        <ProfileSection title="Achievements" icon={<Award className="h-6 w-6 text-primary" />}>
            {alumni.achievements && alumni.achievements.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                    {alumni.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                </ul>
            )}
        </ProfileSection>

        <ProfileSection title="Projects" icon={<Construction className="h-6 w-6 text-primary" />}>
             {alumni.projects && alumni.projects.length > 0 && (
                <div className="space-y-4">
                    {alumni.projects.map((proj, index) => (
                        <div key={index} className="not-prose">
                            <h4 className="font-semibold">{proj.name}</h4>
                            <p className="text-sm text-muted-foreground">{proj.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </ProfileSection>
    </div>
  );
}
