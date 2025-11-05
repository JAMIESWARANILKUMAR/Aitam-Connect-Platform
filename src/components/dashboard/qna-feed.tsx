"use client";

import { useCollection } from "@/firebase";
import { QuestionCard } from "@/components/dashboard/question-card";
import type { Question } from "@/lib/database/questions";
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";


export function QnaFeed() {
  const { data: questions, loading, error } = useCollection<Question>(
    (firestore) => query(collection(firestore, 'questions'), orderBy('createdAt', 'desc'))
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold font-headline">Community Questions</h2>
      
      {loading && (
        <>
          <Skeleton className="w-full h-48" />
          <Skeleton className="w-full h-48" />
        </>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not load the community feed. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {questions && questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
}
