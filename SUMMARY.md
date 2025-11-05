# AITAM Connect: Project Overview & Summary

This document provides a detailed overview of the AITAM Connect project, including its purpose, core features, technology stack, and architecture.

---

## 1. Project Purpose

**AITAM Connect** is a modern, full-stack community platform designed exclusively for the students, alumni, and faculty of the Aditya Institute of Technology and Management (AITAM). Its primary goal is to foster a strong, interconnected community by providing a centralized hub for knowledge sharing, networking, and accessing college-related information. The application leverages modern web technologies and generative AI to deliver an engaging and useful experience.

---

## 2. Core Features

The application is split into two main parts: a public-facing landing page and a secure user dashboard.

### Public Landing Page (`/`)

-   **College Showcase**: Displays key information about AITAM, including leadership, deans, major achievements (NAAC A++, Autonomous Status), and a gallery of campus images.
-   **Latest News**: Fetches and displays the latest news and updates about the college.
-   **Alumni & Placements**: Highlights notable alumni and the top companies where AITAM graduates work.
-   **Responsive Navigation**: Features a comprehensive header and footer with links to all major sections, including a mobile-friendly slide-out menu.
-   **Call to Action**: Prompts new users to either log in or register to access the full suite of features.

### Secure User Dashboard (`/dashboard`)

-   **User Authentication**:
    -   Secure login and registration system using Firebase Authentication.
    -   Supports multiple user roles: **Student**, **Alumni**, and **Admin**.
    -   Provides social sign-in with **Google**.
    -   Role-specific registration fields to capture relevant user data.
-   **Q&A Forum**:
    -   A central feature where users can post questions and receive answers from the community.
    -   Includes functionality to like, comment, and bookmark questions.
-   **Alumni Network**: A directory for users to find and connect with AITAM alumni, filterable by name, branch, or company.
-   **AI-Powered Tools (Powered by Google Gemini & Genkit)**:
    -   **AI Chatbot**: A floating chatbot assistant that can answer questions about AITAM, the platform, and general topics in real-time.
    -   **PPT Maker**: An automated tool that generates a multi-slide presentation on any given topic.
    -   **Resume Builder**: A tool to help students create professional resumes.
    -   **Answer Summarization**: An AI flow designed to summarize long threads of answers into concise, informative summaries.
-   **User Profile & Settings**: Allows users to manage their profile, including updating their profile picture.

---

## 3. Technology Stack

AITAM Connect is built using a modern, scalable, and type-safe technology stack.

-   **Framework**: **Next.js 15** (using the App Router)
-   **Language**: **TypeScript**
-   **UI Library**: **React**
-   **Styling**: **Tailwind CSS** for utility-first styling.
-   **Component Library**: **Shadcn/ui** for pre-built, accessible, and customizable React components.
-   **Generative AI**:
    -   **Genkit**: The core framework for building and managing AI flows.
    -   **Google Gemini**: The underlying Large Language Model (LLM) powering all AI features.
-   **Backend & Authentication**:
    -   **Firebase Authentication**: Manages user sign-up, login, and session management.
-   **Icons**: **Lucide React** for a clean and consistent icon set.
-   **Forms**: **React Hook Form** with **Zod** for robust form validation.

---

## 4. Project Structure

The project is organized following Next.js App Router conventions, with a clear separation of concerns.

```
/
├── src/
│   ├── ai/                 # Genkit AI Flows & Configuration
│   │   ├── flows/          # Individual AI features (chatbot, ppt-maker, etc.)
│   │   └── genkit.ts       # Genkit initialization
│   │
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── (public)/       # Routes for the public landing page
│   │   ├── dashboard/      # Secure routes for the user dashboard
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── layout.tsx      # Root layout
│   │
│   ├── components/         # Reusable React Components
│   │   ├── auth/           # Login and register forms
│   │   ├── chatbot/        # AI chatbot UI
│   │   ├── dashboard/      # Components specific to the dashboard
│   │   ├── layout/         # App header, footer, and sidebar
│   │   └── ui/             # Shadcn UI components
│   │
│   ├── hooks/              # Custom React hooks (e.g., useToast, useIsMobile)
│   │
│   ├── lib/                # Libraries, utilities, and mock data
│   │   ├── database/       # Mock data for users, questions, news, etc.
│   │   ├── firebase.ts     # Firebase initialization and configuration
│   │   └── utils.ts        # Utility functions (e.g., cn for classnames)
│
├── .env                    # Environment variables (API Keys)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

This structure ensures that UI components, server-side logic, AI flows, and application pages are well-organized and easy to maintain.

---

## 5. Next Steps for Full Functionality

While the UI and core structure are in place, the following steps are crucial to make the application fully functional and data-driven.

### 1. Full Firebase Integration

The application is currently using mock data from `/src/lib/database`. The next major step is to replace this with a live Firebase backend.

-   **Firebase Authentication**:
    -   Implement `createUserWithEmailAndPassword` in the registration form (`src/components/auth/register-form.tsx`) to create new users in Firebase.
    -   Implement `signInWithEmailAndPassword` in the login form (`src/components/auth/login-form.tsx`).
    -   Create a global auth state context to manage the logged-in user's data across the application.

-   **Firestore Database**:
    -   **Data Modeling**: Finalize the data structure for `users`, `questions`, and `answers` in Firestore.
    -   **Data Migration**: Write scripts to migrate existing mock data to Firestore collections or create new data.
    -   **Real-time Data Fetching**: Replace static imports from `/src/lib/database` with real-time Firestore queries (`onSnapshot` or `getDocs`) for the Q&A feed, user profiles, and alumni network.
    -   **Data Mutation**: Implement functions to add new questions and answers to Firestore from the user interface.

-   **Firebase Storage**:
    -   Implement file upload functionality in the Settings page (`src/app/dashboard/settings/page.tsx`) to allow users to upload their profile pictures to Firebase Storage.

### 2. Implement Core Application Logic

-   **Q&A Functionality**:
    -   Connect the "Raise Question" form on the dashboard to a function that adds a new document to the `questions` collection in Firestore.
    -   Enable the "Submit" button for answers on a `QuestionCard` to add an answer to the corresponding question document.
    -   Implement the "Like," "Bookmark," and "Share" functionalities, updating Firestore documents accordingly.

-   **Alumni Network**:
    -   Implement the search functionality on the Alumni page (`src/app/dashboard/alumni/page.tsx`) to filter alumni based on name, branch, or company from Firestore.

-   **User Profile**:
    -   Create a dynamic profile page that fetches and displays data for the currently logged-in user.
    -   Ensure the user's name and profile picture in the header and on the dashboard are dynamically loaded from the auth state.

### 3. Enhance AI Features

-   **Resume Builder**:
    -   Create a new Genkit flow (`resume-builder-flow.ts`) that takes user input from the form.
    -   The flow should use an AI model to analyze the user's details and suggest improvements, courses, and interview tips.
    -   Integrate this flow into the `src/app/dashboard/resume-builder/page.tsx` component.

-   **Answer Summarization**:
    -   The `summarize-answers-ai.ts` flow is currently unused.
    -   Create an "Admin Dashboard" where an administrator can view a question thread and trigger this flow to generate a summary.
    -   Implement a review and approval system for the generated summaries before they are displayed publicly.
