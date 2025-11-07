
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';

export default function HeroSection() {

  return (
    <section id="about" className="w-full relative py-20 md:py-32 lg:py-48">
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={placeholderImages.hero.url}
          alt="A panoramic view of the AITAM college campus"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/20"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center items-center space-y-4 text-center">
            <div className="space-y-4">
              <h1 
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.4)]"
              >
                Welcome to AITAM Connect
              </h1>
              <p 
                className="max-w-[700px] text-gray-200 md:text-xl lg:text-lg [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
              >
                The ultimate platform for students, alumni, and faculty to
                connect, share knowledge, and grow together.
              </p>
            </div>
            <div 
              className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4"
            >
              <Button asChild size="lg" className="animate-pulse-glow">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-transform duration-300 ease-in-out hover:scale-105">
                <Link href="https://www.easytourz.com/BT-EmabedTour/all/7f788f014369a2c3" target="_blank" rel="noopener noreferrer">Take me College Tour</Link>
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
