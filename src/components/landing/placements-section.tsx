
"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";

export default function PlacementsSection() {
    return (
        <section id="placements" className="w-full py-12 md:py-24 lg:py-32 bg-colorful-gradient overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Building2 className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Our Alumni Work At</h2>
            </div>
            <div className="mt-8 relative flex justify-center">
               <Image 
                    src="https://ik.imagekit.io/dhpxoizeg/Screenshot_2025-11-05-11-15-01-519_com.canva.editor-ezgif.com-gif-maker.webp?updatedAt=1762549089490"
                    alt="Collage of company logos where AITAM alumni work" 
                    width={1200}
                    height={600}
                    className="object-contain rounded-lg shadow-2xl"
                    unoptimized
                />
            </div>
          </div>
        </section>
    );
}
