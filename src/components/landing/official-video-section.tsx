
"use client";

import { Youtube } from "lucide-react";

export default function OfficialVideoSection() {
  return (
    <section id="official-video" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 mb-8">
          <Youtube className="w-10 h-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">AITAM Official Video</h2>
        </div>
        <div className="relative mt-8" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <iframe 
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
            width="560" 
            height="315" 
            src="https://www.youtube-nocookie.com/embed/RXKIN6eHjBc?si=lQ8ew8ZLCCcCvSL_&amp;controls=0&amp;autoplay=1&amp;loop=1&amp;rel=0&amp;playlist=RXKIN6eHjBc" 
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
