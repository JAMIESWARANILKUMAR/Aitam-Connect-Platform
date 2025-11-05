
"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";

export default function GallerySection() {
    return (
        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-colorful-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <ImageIcon className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Glimpses of Our Campus</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Image src={placeholderImages.galleryCampus.url} alt="Campus Image 1" width={600} height={400} className="rounded-xl object-cover transform transition-all hover:-translate-y-2 duration-300" data-ai-hint={placeholderImages.galleryCampus.dataAiHint} />
              <Image src={placeholderImages.galleryLibrary.url} alt="Campus Image 2" width={600} height={400} className="rounded-xl object-cover transform transition-all hover:-translate-y-2 duration-300" data-ai-hint={placeholderImages.galleryLibrary.dataAiHint} />
              <Image src={placeholderImages.galleryEvent.url} alt="Campus Image 3" width={600} height={400} className="rounded-xl object-cover transform transition-all hover:-translate-y-2 duration-300" data-ai-hint={placeholderImages.galleryEvent.dataAiHint} />
            </div>
          </div>
        </section>
    );
}
