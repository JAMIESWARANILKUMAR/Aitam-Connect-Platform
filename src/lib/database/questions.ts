
import type { Timestamp } from 'firebase/firestore';

export type Question = {
    id: string;
    authorId: string;
    createdAt: Timestamp | Date | string; // Can be any depending on if it's from server, client, or mock
    status: 'ACTIVE' | 'ARCHIVED' | 'DELETED';
    aiStatus: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
    title: string;
    description: string;
    answerCount: number;
    consolidatedAnswer?: string; // Markdown format
};


export const questions: Question[] = [
    {
        id: 'q-1',
        authorId: 'user-rajesh-kumar',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE',
        aiStatus: 'COMPLETE',
        title: "How to best prepare for campus placements as a CSE student?",
        description: "I'm in my third year and want to start preparing for campus placements. What are the key subjects to focus on, and what kind of projects will make my resume stand out? Any advice from seniors would be appreciated!",
        answerCount: 3,
        consolidatedAnswer: `
        <p>Based on community feedback, here is a synthesized guide to prepare for campus placements:</p>
        <ul>
            <li><strong>Data Structures and Algorithms (DSA):</strong> This is the most critical area. Consistent practice on platforms like LeetCode or GeeksforGeeks is highly recommended.</li>
            <li><strong>Projects:</strong> Aim for 1-2 significant projects using modern technology stacks (e.g., MERN, Next.js). This demonstrates practical skills.</li>
            <li><strong>System Design:</strong> Basic knowledge of system design principles is increasingly expected, even for freshers.</li>
            <li><strong>Communication Skills:</strong> Practice explaining your thought process clearly. Mock interviews are invaluable for this.</li>
        </ul>
        `
    },
    {
        id: 'q-2',
        authorId: 'user-priya-sharma',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE',
        aiStatus: 'PENDING',
        title: "Best resources for learning Embedded Systems and IoT?",
        description: "I'm an ECE student interested in IoT. What are the best online courses, books, or hardware kits (like Arduino, Raspberry Pi) to get started with embedded systems development?",
        answerCount: 1,
    },
    {
        id: 'q-3',
        authorId: 'user-amit-patel',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ARCHIVED',
        aiStatus: 'FAILED',
        title: "What's the difference between React Native and Flutter?",
        description: "I want to get into mobile app development. Which framework is better to learn for a beginner in terms of job prospects and ease of learning? What are the pros and cons of each?",
        answerCount: 0
    }
];
