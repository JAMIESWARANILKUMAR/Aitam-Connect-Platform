
"use client";

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/lib/database/testimonials";
import placeholderImages from "@/lib/placeholder-images.json";

export function Testimonials() {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">What Our Community Says</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between">
                    <CardHeader>
                      <div className="flex items-center gap-0.5">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                           <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                        {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-muted-foreground/50" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <blockquote className="text-lg italic">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                    </CardContent>
                    <div className="flex items-center gap-4 p-6 pt-0">
                      <Avatar>
                        <AvatarImage src={(placeholderImages as any)[`testimonial${testimonial.name.split(' ').join('')}`]?.url} data-ai-hint="person face" />
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
