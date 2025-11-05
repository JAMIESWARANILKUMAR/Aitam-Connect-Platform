
import type { UserProfile } from './users';

export type Answer = {
  id: string;
  questionId: string;
  authorId: string; // Changed from author: User to authorId: string
  createdAt: string; // ISO 8601 format
  answerText: string;
  status: 'PENDING_AI_ANALYSIS' | 'PROCESSED';
};

export const answers: Answer[] = [
    // Answers for Question 1
    {
        id: 'ans-1-1',
        questionId: 'q-1',
        authorId: 'user-rajesh-kumar',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10000).toISOString(),
        answerText: "Focus on Data Structures and Algorithms. LeetCode is your best friend. Also, make sure your resume highlights your projects clearly.",
        status: 'PROCESSED'
    },
    {
        id: 'ans-1-2',
        questionId: 'q-1',
        authorId: 'user-anjali-singh',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 20000).toISOString(),
        answerText: "I agree with Rajesh. DS & Algo are key. Also, do at least one or two projects with modern tech stacks like MERN or Next.js. System Design basics are also being asked for freshers now.",
        status: 'PROCESSED'
    },
    {
        id: 'ans-1-3',
        questionId: 'q-1',
        authorId: 'user-vikram-reddy',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30000).toISOString(),
        answerText: "Data structures are a must. Also, don't neglect your communication skills. Mock interviews can really help with that.",
        status: 'PROCESSED'
    },
    // Answers for Question 2
    {
        id: 'ans-2-1',
        questionId: 'q-2',
        authorId: 'user-dr-nair',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 10000).toISOString(),
        answerText: "The official documentation for Arduino and Raspberry Pi are excellent starting points. We also have several books in the library. Check out 'Embedded Systems Architecture' by Tammy Noergaard.",
        status: 'PENDING_AI_ANALYSIS'
    }
];
