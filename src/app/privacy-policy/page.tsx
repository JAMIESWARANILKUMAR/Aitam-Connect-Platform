
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
    Info,
    Database,
    Share2,
    Shield,
    UserCog,
    FileClock,
    Mail,
    FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const policySections = [
    {
        title: "1. Information We Collect",
        icon: <Database className="h-5 w-5 text-primary" />,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Personal Identification Information:</strong> Name, email address, student/alumni ID, profile picture, phone number, and other details you provide during registration.</li>
                <li><strong>Academic and Professional Information:</strong> Branch, year of study, pass-out year, and current employment details.</li>
                <li><strong>User-Generated Content:</strong> Questions you ask, answers you provide, comments, and any other content you post on the platform.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our service, such as pages visited, features used, and time spent on the site.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, and other technical details collected automatically.</li>
            </ul>
        )
    },
    {
        title: "2. How We Use Your Information",
        icon: <Info className="h-5 w-5 text-primary" />,
        content: (
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide, operate, and maintain our services.</li>
              <li>Create and manage your user account.</li>
              <li>Facilitate communication and networking between users.</li>
              <li>Personalize your experience and recommend relevant content.</li>
              <li>Improve our platform through analysis of usage patterns.</li>
              <li>Communicate with you, including sending service-related notifications and updates.</li>
            </ul>
        )
    },
    {
        title: "3. Data Sharing and Disclosure",
        icon: <Share2 className="h-5 w-5 text-primary" />,
        content: (
             <ul className="list-disc space-y-2 pl-5">
                <li><strong>With Other Users:</strong> Your profile information (name, designation, branch, etc.) and content you post will be visible to other registered users of the AITAM Connect community to facilitate interaction.</li>
                <li><strong>With Service Providers:</strong> We may share data with third-party vendors who perform services on our behalf, such as cloud hosting (Firebase) and AI model providers (Google), under strict confidentiality agreements.</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or in response to valid legal processes.</li>
            </ul>
        )
    },
    {
        title: "4. Data Security",
        icon: <Shield className="h-5 w-5 text-primary" />,
        content: "We implement a variety of security measures to maintain the safety of your personal information. All authentication is handled securely by Firebase, and we follow industry best practices to protect against unauthorized access, alteration, or destruction of your data."
    },
    {
        title: "5. User Rights and Controls",
        icon: <UserCog className="h-5 w-5 text-primary" />,
        content: "You have the right to access, update, or delete your personal information. You can manage your profile details through your account settings. For complete data deletion requests, please contact our support team."
    },
    {
        title: "6. Changes to This Privacy Policy",
        icon: <FileClock className="h-5 w-5 text-primary" />,
        content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. You are advised to review this page periodically for any changes."
    },
    {
        title: "7. Contact Us",
        icon: <Mail className="h-5 w-5 text-primary" />,
        content: (
            <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@aitamconnectadityatekkali.in" className="text-primary underline">support@aitamconnectadityatekkali.in</a>.
            </p>
        )
    }
];

export default function PrivacyPolicyPage() {
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
                        <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold mt-4">Privacy Policy</CardTitle>
                    <CardDescription>Last updated: September 13, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground mb-8">
                        Welcome to AITAM Connect. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform. Your privacy is of utmost importance to us.
                    </p>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                        {policySections.map((section, index) => (
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
