
'use client';

import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Info, Newspaper, Users, Calendar, ImageIcon, Handshake, Smartphone, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import HeroSection from '@/components/landing/hero-section';
import GallerySection from '@/components/landing/gallery-section';
import RelatedVideos from '@/components/landing/related-videos';
import FeaturedQuestions from '@/components/landing/featured-questions';
import NewsSection from '@/components/landing/news-section';
import AlumniSection from '@/components/landing/alumni-section';
import LeadershipSection from '@/components/landing/leadership-section';
import DeansSection from '@/components/landing/deans-section';
import StrengthSection from '@/components/landing/strength-section';
import AchievementsSection from '@/components/landing/achievements-section';
import PlacementsSection from '@/components/landing/placements-section';
import FaqSection from '@/components/landing/faq-section';
import { AppFooter } from '@/components/layout/app-footer';


export default function LandingPage() {
   const navItems = [
    { name: "About Us", href: "#about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "News", href: "#news", icon: <Newspaper className="w-4 h-4 mr-2" /> },
    { name: "Alumni", href: "#alumni", icon: <Users className="w-4 h-4 mr-2" /> },
    { name: "Events", href: "#events", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Gallery", href: "#gallery", icon: <ImageIcon className="w-4 h-4 mr-2" /> },
    { name: "Engage", href: "/qna", icon: <Handshake className="w-4 h-4 mr-2" /> },
    { name: "Mobile App", href: "#mobile", icon: <Smartphone className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b w-full sticky top-0 bg-background/90 backdrop-blur-sm z-20">
        <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="https://adityatekkali.edu.in/assets/images/logo/logo3.webp"
                    alt="AITAM Connect Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                />
            </Link>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Image
                    src="https://adityatekkali.edu.in/assets/images/logo/logo3.webp"
                    alt="AITAM Connect Logo"
                    width={120}
                    height={120}
                  />
                  <span className="sr-only">AITAM Connect</span>
                </Link>
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                 <div className="flex flex-col gap-4 mt-4 pt-4 border-t">
                    <Button asChild variant="outline">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <Button asChild variant="outline">
                  <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                  <Link href="/register">Register</Link>
              </Button>
          </div>
        </div>
      </header>
       <nav className="hidden md:flex items-center justify-center w-full bg-primary text-primary-foreground shadow-lg sticky top-16 z-10">
        <div className="flex flex-wrap justify-center gap-1 p-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center text-sm font-medium px-3 py-2 lg:px-4 lg:py-2.5 lg:text-base rounded-md hover:bg-primary-foreground/10 active:bg-primary-foreground/20 transition-all duration-300 ease-in-out transform hover:scale-105">
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <main className="flex-1">
        <HeroSection />
        <hr className="my-0 border-border" />
        <GallerySection />
        <hr className="my-0 border-border" />
        <RelatedVideos />
        <hr className="my-0 border-border" />
        <FeaturedQuestions />
        <hr className="my-0 border-border" />
        <NewsSection />
        <hr className="my-0 border-border" />
        <AlumniSection />
        <hr className="my-0 border-border" />
        <LeadershipSection />
        <hr className="my-0 border-border" />
        <DeansSection />
        <hr className="my-0 border-border" />
        <StrengthSection />
        <AchievementsSection />
        <hr className="my-0 border-border" />
        <PlacementsSection />
        <hr className="my-0 border-border" />
        <FaqSection />
      </main>
      <AppFooter />
    </div>
  );
}
