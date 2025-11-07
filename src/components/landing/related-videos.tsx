
"use client";

import { Youtube } from "lucide-react";

export default function RelatedVideos() {
    return (
        <section id="related-videos" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Youtube className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">More from AITAM Official</h2>
            </div>
             <div className="relative mt-8" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                <iframe 
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/uUdYN2QsrEU?si=_thiz2Z37x3VjHtv" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                ></iframe>
            </div>
          </div>
        </section>
    );
}
