"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/firebase";
import { collection, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import type { Question } from "@/lib/database/questions";
import { ArrowRight, MessageSquareQuote } from "lucide-react";

export function QuestionPopup() {
  const [open, setOpen] = useState(false);
  
  // Get questions created in the last 10 days
  const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  const { data: recentQuestions, loading } = useCollection<Question>(
    (firestore) =>
      query(
        collection(firestore, "questions"),
        where("createdAt", ">=", Timestamp.fromDate(tenDaysAgo)),
        orderBy("createdAt", "desc"),
        limit(5) // Show up to 5 recent questions
      )
  );

  useEffect(() => {
    // Only show the popup if there are recent questions and it hasn't been shown in this session
    const hasBeenShown = sessionStorage.getItem("questionPopupShown");
    if (!loading && recentQuestions && recentQuestions.length > 0 && !hasBeenShown) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("questionPopupShown", "true");
      }, 2000); // Wait 2 seconds before showing
      return () => clearTimeout(timer);
    }
  }, [recentQuestions, loading]);

  if (!recentQuestions || recentQuestions.length === 0) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <MessageSquareQuote className="text-primary" />
            Recently Asked Questions
          </AlertDialogTitle>
          <AlertDialogDescription>
            Can you help answer these questions from the community?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-3">
          {recentQuestions.map((q) => (
            <Link key={q.id} href="/dashboard/qna">
                <div className="p-3 rounded-md border hover:bg-muted transition-colors">
                    <p className="font-semibold text-sm">{q.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{q.description}</p>
                </div>
            </Link>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="/dashboard/qna">
              View All Questions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
