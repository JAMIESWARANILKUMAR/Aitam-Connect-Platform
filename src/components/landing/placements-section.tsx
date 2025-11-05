
"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";

const companies = [
    { name: "ADP", logo: "https://logo.clearbit.com/adp.com" },
    { name: "Amara Raja", logo: "https://logo.clearbit.com/amararaja.com" },
    { name: "Arcesium", logo: "https://logo.clearbit.com/arcesium.com" },
    { name: "Backbase", logo: "https://logo.clearbit.com/backbase.com" },
    { name: "Centific", logo: "https://logo.clearbit.com/centific.com" },
    { name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com" },
    { name: "Diebold Nixdorf", logo: "https://logo.clearbit.com/dieboldnixdorf.com" },
    { name: "FactSet", logo: "https://logo.clearbit.com/factset.com" },
    { name: "Federal Bank", logo: "https://logo.clearbit.com/federalbank.co.in" },
    { name: "Gartner", logo: "https://logo.clearbit.com/gartner.com" },
    { name: "HighRadius", logo: "https://logo.clearbit.com/highradius.com" },
    { name: "IBM", logo: "https://logo.clearbit.com/ibm.com" },
    { name: "INRY", logo: "https://logo.clearbit.com/inry.com" },
    { name: "JLL", logo: "https://logo.clearbit.com/jll.com" },
    { name: "KPMG", logo: "https://logo.clearbit.com/kpmg.com" },
    { name: "LTIMindtree", logo: "https://logo.clearbit.com/ltimindtree.com" },
    { name: "Micron", logo: "https://logo.clearbit.com/micron.com" },
    { name: "MYK Laticrete", logo: "https://logo.clearbit.com/myklaticrete.com" },
    { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com" },
    { name: "S&P Global", logo: "https://logo.clearbit.com/spglobal.com" },
    { name: "Reliance", logo: "https://logo.clearbit.com/ril.com" },
    { name: "Tech Mahindra", logo: "https://logo.clearbit.com/techmahindra.com" },
    { name: "Thoughtworks", logo: "https://logo.clearbit.com/thoughtworks.com" },
    { name: "UBS", logo: "https://logo.clearbit.com/ubs.com" },
    { name: "Polycab", logo: "https://logo.clearbit.com/polycab.com" },
    { name: "Aha", logo: "https://logo.clearbit.com/aha.io" },
    { name: "KPIT", logo: "https://logo.clearbit.com/kpit.com" },
    { name: "Silicon Labs", logo: "https://logo.clearbit.com/silabs.com" },
    { name: "CBRE", logo: "https://logo.clearbit.com/cbre.com" },
    { name: "Berkadia", logo: "https://logo.clearbit.com/berkadia.com" },
    { name: "Broadridge", logo: "https://logo.clearbit.com/broadridge.com" },
  ];

export default function PlacementsSection() {
    return (
        <section id="placements" className="w-full py-12 md:py-24 lg:py-32 bg-colorful-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Building2 className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Our Alumni Work At</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 mt-8 items-center">
              {companies.map((company, index) => (
                <div key={`${company.name}-${index}`} className="flex justify-center items-center">
                  <Image src={company.logo} alt={`${company.name} Logo`} width={150} height={75} className="transition-all object-contain" data-ai-hint="company logo"/>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
}
