
export type UserProfile = {
  id?: string; // id is the doc id, so it's optional on the object itself
  name: string;
  designation: string;
  profileImageUrl?: string;
  totalRespondedQuestions: number;
  email?: string;
  branch?: string;
  passOutYear?: string;
  workingStatus?: string;
  yearOfStudy?: string;
  rollNumber?: string;
  linkedin?: string;
  specialization?: string;
  achievements?: string[];
  projects?: { name: string; description: string }[];
};
