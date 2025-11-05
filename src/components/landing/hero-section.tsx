
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import placeholderImages from "@/lib/placeholder-images.json";

export default function HeroSection() {
    return (
        <section id="about" className="w-full flex items-center justify-center bg-colorful-gradient py-20 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to AITAM Connect
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The ultimate platform for students, alumni, and faculty to connect, share knowledge, and grow together.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
               <div className="relative mx-auto w-full max-w-[550px] lg:order-last">
                <Image
                  src={placeholderImages.hero.url}
                  width="550"
                  height="550"
                  alt="AITAM College Campus"
                  className="aspect-video w-full overflow-hidden rounded-lg object-cover sm:w-full lg:aspect-square"
                  data-ai-hint={placeholderImages.hero.dataAiHint}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
    );
}
