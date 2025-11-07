
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

export const users: UserProfile[] = [
  {
    id: 'user-rajesh-kumar',
    name: "Rajesh Kumar",
    designation: "Student",
    profileImageUrl: "https://picsum.photos/seed/Rajesh%20Kumar/100/100",
    totalRespondedQuestions: 5,
    email: "rajesh.kumar@example.com",
    branch: 'CSE',
    yearOfStudy: '3'
  },
  {
    id: 'user-priya-sharma',
    name: "Priya Sharma",
    designation: "Student",
    profileImageUrl: "https://picsum.photos/seed/Priya%20Sharma/100/100",
    totalRespondedQuestions: 2,
    email: "priya.sharma@example.com",
    branch: 'ECE',
    yearOfStudy: '2'
  },
  {
    id: 'user-amit-patel',
    name: "Amit Patel",
    designation: "Alumni",
    profileImageUrl: "https://picsum.photos/seed/Amit%20Patel/100/100",
    totalRespondedQuestions: 10,
    email: "amit.patel@example.com",
    branch: 'IT',
    passOutYear: '2020',
    workingStatus: 'Software Engineer @ TCS'
  },
  {
    id: 'user-anjali-singh',
    name: "Anjali Singh",
    designation: "Alumni",
    profileImageUrl: "https://picsum.photos/seed/Anjali%20Singh/100/100",
    totalRespondedQuestions: 15,
    email: "anjali.singh@example.com",
    branch: 'CSE',
    passOutYear: '2019',
    workingStatus: 'Senior Developer @ Google'
  },
   {
    id: 'user-dr-nair',
    name: "Dr. Nair",
    designation: "Faculty",
    profileImageUrl: "https://picsum.photos/seed/Dr.%20Nair/100/100",
    totalRespondedQuestions: 25,
    email: "dr.nair@adityatekkali.edu.in",
    branch: 'ECE',
  }
];
