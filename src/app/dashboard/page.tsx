
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QnaFeed } from '@/components/dashboard/qna-feed';
import { NewsUpdates } from '@/components/dashboard/news-updates';
import { Testimonials } from '@/components/dashboard/testimonials';
import { GraduationCap, ExternalLink, Loader2 } from 'lucide-react';
import { QuestionPopup } from '@/components/dashboard/question-popup';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirebase } from '@/firebase'; // Updated imports
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const courseRecommendations = [
  {
    title: 'Advanced React & Next.js',
    description:
      'Master the latest features of Next.js for building high-performance web applications.',
    link: '#',
  },
  {
    title: 'Data Structures & Algorithms in Python',
    description: 'Strengthen your foundational knowledge, crucial for technical interviews.',
    link: '#',
  },
  {
    title: 'Introduction to Machine Learning',
    description:
      'Get started with the basics of ML, a highly in-demand skill in the tech industry.',
    link: '#',
  },
];

const questionFormSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters.").max(150, "Title is too long."),
  description: z.string().min(20, "Description must be at least 20 characters."),
});

export default function DashboardPage() {
  const { toast } = useToast();
  
  const { user } = useUser();
  const { firestore } = useFirebase();

  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });


  async function onQuestionSubmit(values: z.infer<typeof questionFormSchema>) {
    if (!user || !firestore) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to ask a question.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await addDoc(collection(firestore, 'questions'), {
        authorId: user.uid,
        title: values.title,
        description: values.description,
        createdAt: serverTimestamp(),
        status: 'ACTIVE',
        aiStatus: 'PENDING',
        answerCount: 0,
      });

      toast({
        title: "Question Submitted!",
        description: "Your question has been posted to the community.",
      });
      form.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        toast({
          title: "Error",
          description: "Could not submit your question. Please try again.",
          variant: "destructive",
        });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <QuestionPopup />
      <Card className="border-0 bg-colorful-gradient">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome back, {user ? user.displayName?.split(' ')[0] : 'Guest'}!</CardTitle>
          <CardDescription className="text-foreground/80">
            Ready to learn, connect, and grow? Here's what's happening in the AITAM community.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onQuestionSubmit)}>
            <CardHeader>
              <CardTitle>Raise a Question</CardTitle>
              <CardDescription>Have a question for the community? Ask away!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'How to prepare for campus placements?'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>Detailed Question</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Type your detailed question here. Be as specific as possible." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Question
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <CardTitle>Course Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {courseRecommendations.map((course, index) => (
              <div key={index} className="flex flex-col gap-1 rounded-lg p-2 hover:bg-muted">
                <h3 className="font-semibold text-primary">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <a
                  href={course.link}
                  className="flex items-center gap-1 text-xs text-primary/80 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Course <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <QnaFeed />
        </div>
        <div className="lg:col-span-1">
          <NewsUpdates />
        </div>
      </div>

      <Testimonials />
    </div>
  );
}
