
import type { User } from './users';
import type { Timestamp } from 'firebase/firestore';

export type Question = {
    id: string;
    authorId: string;
    createdAt: Timestamp | Date; // Can be either depending on if it's from server or client
    status: 'ACTIVE' | 'ARCHIVED' | 'DELETED';
    aiStatus: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
    title: string;
    description: string;
    answerCount: number;
    consolidatedAnswer?: string; // Markdown format
};

    