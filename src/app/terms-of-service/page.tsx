
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AppFooter } from '@/components/layout/app-footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Handshake,
  UserCircle2,
  ShieldAlert,
  FileCheck2,
  XCircle,
  AlertTriangle,
  ShieldOff,
  Landmark,
  FileClock,
  Mail,
  Gavel,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    icon: <Handshake className="h-5 w-5 text-primary" />,
    content:
      'By accessing and using our Service, you accept and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Service.',
  },
  {
    title: '2. User Accounts',
    icon: <UserCircle2 className="h-5 w-5 text-primary" />,
    content:
      'To access most features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your password and for all activities that occur under your account.',
  },
  {
    title: '3. Acceptable Use Policy',
    icon: <ShieldAlert className="h-5 w-5 text-primary" />,
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Post any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
        <li>Harass, abuse, or harm another person or group.</li>
        <li>Impersonate any person or entity.</li>
        <li>Engage in any activity that interferes with or disrupts the Service.</li>
        <li>Attempt to gain unauthorized access to any portion of the Service, other accounts, or any other systems or networks connected to the Service.</li>
        <li>Maliciously alter, tamper with, or delete any data on the platform. Unauthorized attempts to access, modify, or corrupt data will result in immediate account termination and potential legal action under applicable cybercrime laws.</li>
      </ul>
    ),
  },
  {
    title: '4. User-Generated Content',
    icon: <FileCheck2 className="h-5 w-5 text-primary" />,
    content:
      'You retain ownership of the content you post on the Service. By posting content, you grant AITAM Connect a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with the Service.',
  },
  {
    title: '5. Termination',
    icon: <XCircle className="h-5 w-5 text-primary" />,
    content:
      'We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
  },
  {
    title: '6. Disclaimers',
    icon: <AlertTriangle className="h-5 w-5 text-primary" />,
    content:
      'The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, regarding the operation or availability of the Service or the information, content, or materials included therein.',
  },
  {
    title: '7. Limitation of Liability',
    icon: <ShieldOff className="h-5 w-5 text-primary" />,
    content:
      'In no event shall AITAM Connect, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.',
  },
  {
    title: '8. Governing Law',
    icon: <Landmark className="h-5 w-5 text-primary" />,
    content:
      'These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.',
  },
  {
    title: '9. Changes to Terms',
    icon: <FileClock className="h-5 w-5 text-primary" />,
    content:
      'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.',
  },
  {
    title: '10. Contact Us',
    icon: <Mail className="h-5 w-5 text-primary" />,
    content: (
      <p>
        If you have any questions about these Terms, please contact us at{' '}
        <a href="mailto:support@aitamconnect.adityatekkali.in" className="text-primary underline">
          support@aitamconnect.adityatekkali.in
        </a>.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-center border-b w-full sticky top-0 bg-background/90 backdrop-blur-sm z-20">
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="https://cdn.jumpshare.com/images/AtpYWE8GBPEVfWnMRei1.png"
                alt="AITAM Connect Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
            />
             <span className="font-bold text-xl text-primary">
              AITAM Connect
            </span>
        </Link>
      </header>
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Gavel className="h-8 w-8 text-primary" />
                </div>
              <CardTitle className="text-3xl font-bold mt-4">Terms of Service</CardTitle>
              <CardDescription>Last updated: September 13, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-8">
                Please read these Terms of Service ("Terms") carefully before using the AITAM Connect platform ("the Service") operated by Aditya Institute of Technology and Management.
              </p>
              <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {termsSections.map((section, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-3">
                        {section.icon}
                        <span>{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground pl-10">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                            {section.content}
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
