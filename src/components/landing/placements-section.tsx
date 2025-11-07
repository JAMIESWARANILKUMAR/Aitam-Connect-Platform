
'use client';

import Image from 'next/image';
import { Building2 } from 'lucide-react';

const companies = [
  'google.com',
  'tcs.com',
  'kpmg.com',
  'wipro.com',
  'smartbridge.com',
  'infosys.com',
  'axisbank.com',
  'ril.com',
  'pennanttech.com',
  'peopletech.com',
  'cisco.com',
  'trysol.com',
  'cognizant.com',
  'techmahindra.com',
  'ltimindtree.com',
  'persistent.com',
  'pinelabs.com',
  'accenture.com',
  'deloitte.com',
  'oracle.com',
  'dell.com',
  'capgemini.com',
  'amazon.com',
];

const MarqueeRow = ({ logos, reverse = false }: { logos: string[]; reverse?: boolean }) => (
  <div className="flex w-max animate-marquee items-center gap-24" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
    {logos.map((domain, index) => (
      <Image
        key={`${domain}-${index}`}
        src={`https://logo.clearbit.com/${domain}`}
        alt={`${domain} logo`}
        width={180}
        height={60}
        className="object-contain aspect-[3/1] w-48"
        unoptimized
      />
    ))}
  </div>
);

export default function PlacementsSection() {
  return (
    <section id="placements" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 mb-8">
          <Building2 className="w-10 h-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Our Alumni Work At</h2>
        </div>
        <div className="relative mt-8 flex h-48 w-full flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-background via-transparent to-background z-10"></div>
          <div className="flex flex-col gap-8">
            <div className="flex shrink-0">
               <MarqueeRow logos={[...companies, ...companies]} />
            </div>
             <div className="flex shrink-0">
               <MarqueeRow logos={[...companies.slice().reverse(), ...companies.slice().reverse()]} reverse />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
