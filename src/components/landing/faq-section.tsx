
'use client';

import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const generalFaqs = [
  {
    question: 'What is AITAM Connect?',
    answer: 'AITAM Connect is a dedicated community platform for the students, alumni, and faculty of the Aditya Institute of Technology and Management. It serves as a hub for asking questions, sharing knowledge, networking, and staying updated with college news.',
  },
  {
    question: 'Who can join the platform?',
    answer: 'The platform is exclusively for current students, registered alumni, and faculty members of AITAM. You can register using your college domain email or through other verified methods.',
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Currently, the AITAM Connect mobile app is under development and is not yet available on the Google Play Store. We are working hard to bring you a seamless mobile experience, and it will be released in a future update. Stay tuned for announcements!',
  },
  {
    question: 'How is my personal data handled?',
    answer: 'We prioritize your privacy. Your data is used to create your profile, facilitate community interaction, and personalize your experience. We do not share your personal information with third-party advertisers. For more details, please review our Privacy Policy.',
  },
];

const technicalFaqs = [
  {
    question: 'How does the AI Answer Summarization work?',
    answer: 'When multiple users answer a question, our AI system analyzes the responses to identify common themes and correct grammar. It then generates a single, comprehensive summary which is reviewed by an administrator before being published, ensuring accuracy and quality.',
  },
  {
    question: 'What does the AI Resume Builder do?',
    answer: 'The resume builder helps you create a professional resume by filling in your details. Its AI capabilities can suggest relevant courses to take and provide tips to help you prepare for job interviews based on your target company and role.',
  },
  {
    question: 'I forgot my password. How can I reset it?',
    answer: 'On the login page, click the "Forgot your password?" link. You will be prompted to enter your registered email address, and a password reset link will be sent to your inbox.',
  },
  {
    question: 'Who can I contact for technical support?',
    answer: "For general technical issues or questions, please reach out to our support team at support@aitamconnect.adityatekkali.in. For specific complaints, you can contact the administrator: Dr. D. Yugandhar (Professor & Associate Dean @ Alumni, C.G & SAC) at yugandhar.dasari@adityatekkali.edu.in.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center gap-4">
             <HelpCircle className="w-10 h-10 text-primary" />
             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
          </div>
          <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 mt-12">
            
            {/* General Questions Column */}
            <div className="grid gap-4">
                <h3 className="text-xl font-bold text-primary">General</h3>
                <Accordion type="single" collapsible className="w-full">
                    {generalFaqs.map((faq, index) => (
                        <AccordionItem key={`gen-${index}`} value={`item-${index}`}>
                            <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-slate-400">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Technical Questions Column */}
            <div className="grid gap-4">
                <h3 className="text-xl font-bold text-primary">Features & Technical</h3>
                 <Accordion type="single" collapsible className="w-full">
                    {technicalFaqs.map((faq, index) => (
                        <AccordionItem key={`tech-${index}`} value={`item-${index}`}>
                            <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-slate-400">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
      </div>
    </section>
  );
}
