
'use client';

import Link from 'next/link';
import { MessageSquareQuote, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { questions as mockQuestions } from '@/lib/database/questions';
import { users as mockUsers } from '@/lib/database/users';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export default function FeaturedQuestions() {
  const featuredQuestions = mockQuestions.slice(0, 3);

  const getAuthor = (authorId: string) => {
    return mockUsers.find(user => user.id === authorId);
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section id="featured-questions" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 mb-8">
          <MessageSquareQuote className="w-10 h-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Featured Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {featuredQuestions.map((question) => {
            const author = getAuthor(question.authorId);
            return (
              <Card key={question.id} className="flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{question.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{question.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={author?.profileImageUrl} data-ai-hint="person face" />
                      <AvatarFallback>{getInitials(author?.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{author?.name || 'AITAM Member'}</p>
                      <p className="text-xs text-muted-foreground">{author?.designation || 'Student'}</p>
                    </div>
                  </div>
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="link" className="p-0">
                        <Link href="/dashboard/qna">
                            View Discussion <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/dashboard/qna">
                    See All Questions
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
