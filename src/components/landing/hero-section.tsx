
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';
import { motion } from 'framer-motion';

const backgroundImage = placeholderImages.hero.url;

export default function HeroSection() {
  return (
    <section id="about" className="w-full relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={backgroundImage}
          alt="AITAM Campus background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center space-y-4 text-center items-center lg:items-start lg:text-left"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.4)]"
              >
                Welcome to AITAM Connect
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="max-w-[600px] text-gray-200 md:text-xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
              >
                The ultimate platform for students, alumni, and faculty to
                connect, share knowledge, and grow together.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col gap-2 min-[400px]:flex-row pt-4"
            >
              <Button asChild size="lg" className="animate-pulse-glow">
                <Link href="/login">Get Started</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
