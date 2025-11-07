
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import placeholderImages from '@/lib/placeholder-images.json';

export default function HeroSection() {

  return (
    <section id="about" className="w-full relative py-32 md:py-48 lg:py-64 overflow-hidden">
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
        <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center space-y-4 text-center items-center"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.4)]"
              >
                Welcome to AITAM Connect
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="max-w-[700px] text-gray-200 md:text-xl lg:text-2xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
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
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-transform duration-300 ease-in-out hover:scale-105">
                <Link href="https://www.easytourz.com/BT-EmabedTour/all/7f788f014369a2c3" target="_blank" rel="noopener noreferrer">Take me College Tour</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
