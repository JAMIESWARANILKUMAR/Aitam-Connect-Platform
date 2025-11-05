
"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholderImages from "@/lib/placeholder-images.json";

export default function AlumniSection() {
    return (
        <section id="alumni" className="w-full py-12 md:py-24 lg:py-32 bg-colorful-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Users className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Meet Our Alumni</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <Card className="text-center transform transition-all hover:-translate-y-2 duration-300">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={placeholderImages.alumni1.url} data-ai-hint="person face" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">Rajesh Kumar</h3>
                    <p className="text-sm text-muted-foreground">Software Engineer @ Google</p>
                  </CardContent>
                </Card>
                <Card className="text-center transform transition-all hover:-translate-y-2 duration-300">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={placeholderImages.alumni2.url} data-ai-hint="person face" />
                      <AvatarFallback>VR</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">Vikram Reddy</h3>
                    <p className="text-sm text-muted-foreground">Product Manager @ Microsoft</p>
                  </CardContent>
                </Card>
                <Card className="text-center transform transition-all hover:-translate-y-2 duration-300">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={placeholderImages.alumni3.url} data-ai-hint="person face" />
                      <AvatarFallback>LA</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">L. Akhil</h3>
                    <p className="text-sm text-muted-foreground">Data Scientist @ Amazon</p>
                  </CardContent>
                </Card>
                 <Card className="text-center transform transition-all hover:-translate-y-2 duration-300">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={placeholderImages.alumni4.url} data-ai-hint="person face" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">Priya Sharma</h3>
                    <p className="text-sm text-muted-foreground">Hardware Engineer @ Intel</p>
                  </CardContent>
                </Card>
            </div>
          </div>
        </section>
    );
}
