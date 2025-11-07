
"use client";

import Image from "next/image";
import Link from "next/link";
import { Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { relatedVideos } from "@/lib/database/videos";

export default function RelatedVideos() {
    return (
        <section id="related-videos" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Youtube className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">More from AITAM Official</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {relatedVideos.map((video) => (
                <Link key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="group block">
                  <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
                      <div className="relative">
                        <Image 
                            src={video.thumbnail.url} 
                            alt={video.title} 
                            width={600} 
                            height={400} 
                            className="w-full h-48 object-cover"
                            data-ai-hint={video.thumbnail.dataAiHint}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <Youtube className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                      </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
    );
}
