
"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Info, Newspaper, Users, Calendar, ImageIcon, Handshake, Smartphone, Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import placeholderImages from "@/lib/placeholder-images.json";

// Dynamically import heavy components
const HeroSection = dynamic(() => import('@/components/landing/hero-section'));
const GallerySection = dynamic(() => import('@/components/landing/gallery-section'));
const NewsSection = dynamic(() => import('@/components/landing/news-section'));
const AlumniSection = dynamic(() => import('@/components/landing/alumni-section'));
const LeadershipSection = dynamic(() => import('@/components/landing/leadership-section'));
const DeansSection = dynamic(() => import('@/components/landing/deans-section'));
const AchievementsSection = dynamic(() => import('@/components/landing/achievements-section'));
const PlacementsSection = dynamic(() => import('@/components/landing/placements-section'));
const AppFooter = dynamic(() => import('@/components/layout/app-footer').then(mod => mod.AppFooter));


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
                    src="https://cdn.jumpshare.com/images/AtpYWE8GBPEVfWnMRei1.png"
                    alt="AITAM Connect Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                />
                 <span className="font-bold text-xl text-primary group-data-[collapsible=icon]:hidden">
                  AITAM Connect
                </span>
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
                    src="https://cdn.jumpshare.com/images/AtpYWE8GBPEVfWnMRei1.png"
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
       <nav className="hidden md:flex items-center justify-center w-full bg-primary/5 border-b shadow-sm sticky top-16 z-10">
        <div className="flex gap-6 lg:gap-8 py-3">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
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
        <NewsSection />
        <hr className="my-0 border-border" />
        <AlumniSection />
        <hr className="my-0 border-border" />
        <LeadershipSection />
        <hr className="my-0 border-border" />
        <DeansSection />
        <hr className="my-0 border-border" />
        <AchievementsSection />
        <hr className="my-0 border-border" />
        <PlacementsSection />
      </main>
      <AppFooter />
    </div>
  );
}
