
"use client";

import { useState, useMemo } from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share2,
  ChevronDown,
  Clock,
  Sparkles,
  Loader2
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import type { Question } from '@/lib/database/questions';
import type { UserProfile } from '@/lib/database/users';
import { useDoc, useUser, useFirebase } from '@/firebase';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import { doc, collection, addDoc, serverTimestamp, runTransaction } from 'firebase/firestore';


interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { firestore } = useFirebase();

  const authorDocRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'users', question.authorId);
  }, [firestore, question.authorId]);

  const { data: author } = useDoc<UserProfile>(authorDocRef);
  const { user } = useUser();
  const { toast } = useToast();

  const [answerText, setAnswerText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createdAt = useMemo(() => {
    if (question.createdAt && 'toDate' in question.createdAt) {
      return (question.createdAt as any).toDate().toLocaleDateString();
    }
    return '...';
  }, [question.createdAt]);


  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) {
        toast({ title: "Answer is empty", description: "Please write an answer before submitting.", variant: "destructive"});
        return;
    }
    if (!user || !firestore) {
        toast({ title: "Not logged in", description: "You must be logged in to submit an answer.", variant: "destructive"});
        return;
    }

    setIsSubmitting(true);

    const questionRef = doc(firestore, 'questions', question.id);
    const answersRef = collection(questionRef, 'answers');

    try {
        await runTransaction(firestore, async (transaction) => {
            const questionDoc = await transaction.get(questionRef);
            if (!questionDoc.exists()) {
                throw "Question does not exist!";
            }
            
            // Add the new answer
            transaction.set(doc(answersRef), {
                authorId: user.uid,
                answerText: answerText,
                createdAt: serverTimestamp(),
                status: 'PENDING_AI_ANALYSIS',
            });

            // Increment the answer count
            const newAnswerCount = (questionDoc.data().answerCount || 0) + 1;
            transaction.update(questionRef, { answerCount: newAnswerCount });
        });

        toast({ title: "Answer Submitted!", description: "Thank you for your contribution." });
        setAnswerText('');

    } catch (error) {
        console.error("Error submitting answer: ", error);
        toast({ title: "Submission Error", description: "Could not submit your answer.", variant: "destructive"});
    } finally {
        setIsSubmitting(false);
    }
  };

  const authorName = author?.name || 'Loading...';
  const authorDesignation = author?.designation || '...';
  const authorInitials = author?.name ? author.name.charAt(0) : 'U';


  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 bg-muted/30 p-4">
        <Avatar>
          <AvatarImage
            src={author?.profileImageUrl}
            data-ai-hint="person face"
          />
          <AvatarFallback>{authorInitials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{authorName}</p>
          <p className="text-xs text-muted-foreground">
            {authorDesignation} &middot; Asked on {createdAt}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{question.title}</h3>
        </div>
        <Badge variant={question.status === 'ACTIVE' ? 'default' : 'secondary'}>{question.status}</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{question.description}</p>
        
        <Collapsible className="mt-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1" disabled>
                  <ThumbsUp className="h-4 w-4" />
                  <span>...</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{question.answerCount || 0} Answers</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                View Answer <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            {question.aiStatus === 'COMPLETE' && question.consolidatedAnswer ? (
               <Alert className="bg-gradient-to-tr from-blue-50 via-cyan-50 to-sky-100 dark:from-blue-950/80 dark:via-cyan-950/80 dark:to-sky-950/80 border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle className="font-bold text-primary">Consolidated &amp; Reviewed Response</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert max-w-full">
                  <div dangerouslySetInnerHTML={{ __html: question.consolidatedAnswer }} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Generated by AI from multiple community contributions.
                  </p>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="default" className="text-center">
                 <Clock className="h-4 w-4" />
                <AlertTitle>Pending AI Analysis</AlertTitle>
                <AlertDescription>
                  An intelligent, consolidated answer will be generated once enough responses are collected.
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-6 flex gap-3">
               <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || undefined} data-ai-hint="profile picture" />
                  <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
              <Textarea 
                placeholder="Write your answer to contribute..." 
                className="flex-1"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                disabled={isSubmitting}
              />
              <Button onClick={handleSubmitAnswer} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Answer
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 bg-muted/30 p-2">
        <Button variant="ghost" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
