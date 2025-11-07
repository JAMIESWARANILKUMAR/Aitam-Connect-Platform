
"use client";

import Image from "next/image";
import { Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholderImages from "@/lib/placeholder-images.json";

const deans = [
    { name: "Dr. B. V. Ramana", role: "Dean (Academics)", image: placeholderImages.dean1.url, avatar: "BVR" },
    { name: "Dr. Ch. Ramesh", role: "Dean (R&D)", image: placeholderImages.dean2.url, avatar: "CR" },
    { name: "Dr. G. Vasanthi", role: "Dean (Student Affairs)", image: placeholderImages.dean3.url, avatar: "GV" },
    { name: "Dr. D. Yugandhar", role: "Associate Dean (Finishing School)", image: placeholderImages.dean4.url, avatar: "DY" },
];

export default function DeansSection() {
    return (
        <section id="deans" className="w-full py-12 md:py-24 lg:py-32 bg-colorful-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Users2 className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Deans &amp; Heads of Departments</h2>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              {deans.map((dean) => (
                <Card key={dean.name} className="text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={dean.image} data-ai-hint="person face" />
                      <AvatarFallback>{dean.avatar}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">{dean.name}</h3>
                    <p className="text-sm text-muted-foreground">{dean.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
    );
}
