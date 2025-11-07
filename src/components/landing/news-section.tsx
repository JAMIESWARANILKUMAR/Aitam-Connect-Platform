
"use client";

import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { newsItems } from "@/lib/database/news";

export default function NewsSection() {
    return (
        <section id="news" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Newspaper className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Latest News</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="transition-colors">
                    <Image src={item.image.url} alt={item.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={item.image.dataAiHint} />
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.summary}</CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
    );
}
