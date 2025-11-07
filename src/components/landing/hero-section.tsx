
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const images = [
  'https://adityatekkali.edu.in/assets/images/bg/bg-image-17.webp',
  'https://adityatekkali.edu.in/assets/images/bg/bg-image-11.webp',
  'https://adityatekkali.edu.in/assets/images/bg/bg-image-14.webp',
];

export default function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <section id="about" className="w-full relative py-12 md:py-24 lg:py-32 overflow-hidden">
        <Carousel
            plugins={[plugin.current]}
            className="absolute inset-0 w-full h-full -z-10"
            opts={{
                loop: true,
            }}
        >
            <CarouselContent>
                {images.map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full h-full relative">
                            <Image
                                src={src}
                                alt={`AITAM Campus background image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/50 -z-10"></div>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 text-white p-6 rounded-lg bg-black/30 backdrop-blur-sm">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                Welcome to AITAM Connect
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">
                The ultimate platform for students, alumni, and faculty to
                connect, share knowledge, and grow together.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
