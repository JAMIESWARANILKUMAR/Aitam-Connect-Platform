
"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholderImages from "@/lib/placeholder-images.json";

const leadership = [
    { name: "Dr. K. Someswara Rao", role: "Director", image: placeholderImages.leadershipDirector.url, avatar: "SR" },
    { name: "Dr. A. S. Srinivasa Rao", role: "Principal", image: placeholderImages.leadershipPrincipal.url, avatar: "ASR" },
    { name: "Sri. K. Seetha Ram", role: "President", image: placeholderImages.leadershipPresident.url, avatar: "KSR" },
];

export default function LeadershipSection() {
    return (
        <section id="leadership" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <User className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Our Leadership</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
              {leadership.map((leader) => (
                <Card key={leader.name} className="text-center transform transition-all hover:-translate-y-2 duration-300">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={leader.image} data-ai-hint="person face" />
                      <AvatarFallback>{leader.avatar}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-md text-muted-foreground">{leader.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
    );
}
