
import type { UserProfile } from './users';

// This file is temporarily adjusted to provide mock data.
// In a real implementation, this should fetch alumni users from Firestore.

export const alumni: UserProfile[] = [
  {
    id: 'user-vikram-reddy',
    name: 'Vikram Reddy',
    designation: 'Alumni',
    profileImageUrl: 'https://picsum.photos/seed/alumni2/100/100',
    totalRespondedQuestions: 5,
    branch: 'CSE',
    passOutYear: '2018',
    workingStatus: 'Product Manager @ Microsoft',
  },
  {
    id: 'user-l-akhil',
    name: 'L. Akhil',
    designation: 'Alumni',
    profileImageUrl: 'https://picsum.photos/seed/alumni3/100/100',
    totalRespondedQuestions: 2,
    branch: 'ECE',
    passOutYear: '2020',
    workingStatus: 'Data Scientist @ Amazon',
  },
    {
    id: 'user-priya-sharma',
    name: 'Priya Sharma',
    designation: 'Alumni',
    profileImageUrl: 'https://picsum.photos/seed/alumni4/100/100',
    totalRespondedQuestions: 8,
    branch: 'EEE',
    passOutYear: '2019',
    workingStatus: 'Hardware Engineer @ Intel',
  },
];
