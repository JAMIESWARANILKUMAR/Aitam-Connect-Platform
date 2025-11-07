
"use client";

import { useCollection, useFirestore } from "@/firebase";
import { QuestionCard } from "@/components/dashboard/question-card";
import type { Question } from "@/lib/database/questions";
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useMemo } from "react";


export function QnaFeed() {
  const firestore = useFirestore();
  const questionsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'questions'), orderBy('createdAt', 'desc'))
  }, [firestore]);
  
  const { data: questions, loading, error } = useCollection<Question>(questionsQuery);

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
