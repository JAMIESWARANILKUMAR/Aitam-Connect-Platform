
'use client';

import { Rocket, Users, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    value: '2',
    label: 'Successful Seasons',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    value: '2000+',
    label: 'Participants',
  },
  {
    icon: <FolderKanban className="w-8 h-8 text-primary" />,
    value: '90+',
    label: 'Projects Built',
  },
];

export default function RelatedVideos() {
  return (
    <section id="avishkaar" className="w-full py-12 md:py-24 lg:py-32 bg-muted overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 md:px-6">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl flex items-center gap-3">
                <Rocket className="w-10 h-10 text-primary" />
                Avishkaar 3.0
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Aavishkar is a 48-hour innovation marathon that challenges bright minds to turn bold ideas into real-world solutions. After two successful seasons, Aavishkar returns bigger and better — now in two phases: a 24-hour online hackathon and an on-campus 48-hour grand finale.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Join us as we push boundaries, prototype the future, and shape ideas that can make a difference. Because at Aavishkar — innovation never sleeps.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="text-center p-4">
                        <div className="flex justify-center">{stat.icon}</div>
                        <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </Card>
                ))}
            </div>
            <div className="mt-6">
                <Button asChild size="lg">
                    <Link href="https://avishkaar.co/" target="_blank" rel="noopener noreferrer">
                        Visit Avishkaar Website
                    </Link>
                </Button>
            </div>
          </motion.div>
          <motion.div 
            className="relative" style={{ paddingTop: '56.25%' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
              src="https://www.youtube.com/embed/uUdYN2QsrEU?si=_thiz2Z37x3VjHtv"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
    </section>
  );
}
