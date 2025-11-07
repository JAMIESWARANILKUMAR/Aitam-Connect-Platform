import type { UserProfile } from './users';

// This file provides mock data for alumni profiles for testing purposes.
// In a real implementation, this data would be fetched from Firestore.

export const alumni: UserProfile[] = Array.from({ length: 15 }, (_, i) => ({
  id: `user-alumni-${i + 1}`,
  name: `Alumni User ${i + 1}`,
  designation: 'Alumni',
  profileImageUrl: `https://picsum.photos/seed/alumni${i + 1}/100/100`,
  totalRespondedQuestions: Math.floor(Math.random() * 10),
  branch: ['CSE', 'ECE', 'IT', 'MECH', 'EEE'][i % 5],
  passOutYear: `${2015 + (i % 8)}`,
  workingStatus: [
    'Software Engineer @ Google',
    'Product Manager @ Microsoft',
    'Data Scientist @ Amazon',
    'Hardware Engineer @ Intel',
    'UX Designer @ Apple',
  ][i % 5],
}));
