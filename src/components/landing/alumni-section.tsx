
"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { alumni as mockAlumni } from "@/lib/database/alumni";

export default function AlumniSection() {
    const featuredAlumni = mockAlumni.slice(0, 4);

    return (
        <section id="alumni" className="w-full py-12 md:py-24 lg:py-32 bg-colorful-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Users className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Meet Our Alumni</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {featuredAlumni.map((alumnus) => (
                <Card key={alumnus.id} className="text-center transform transition-all hover:-translate-y-2 duration-300">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={alumnus.profileImageUrl} data-ai-hint="person face" />
                      <AvatarFallback>{alumnus.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">{alumnus.name}</h3>
                    <p className="text-sm text-muted-foreground">{alumnus.workingStatus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
    );
}
