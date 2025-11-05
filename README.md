
# AITAM Connect

<p align="center">
  <img src="https://adityatekkali.edu.in/assets/images/logo/logo3.webp" alt="AITAM Logo" width="200"/>
</p>

<h1 align="center">AITAM Connect</h1>

<p align="center">
  The ultimate community platform for students, alumni, and faculty of the Aditya Institute of Technology and Management (AITAM) to connect, share knowledge, and grow together.
</p>

## ✨ Key Features

AITAM Connect is designed to foster a strong, supportive, and engaging community with a rich set of features, including:

-   **Q&A Forum**: A central place for users to ask questions and receive answers from students, alumni, and faculty.
-   **AI-Powered Tools**:
    -   **Answer Summarization**: Utilizes generative AI to summarize discussions, correct grammar, and identify the most informative responses for administrator approval.
    -   **PPT Maker**: Automatically generates presentation slides on any given topic.
    -   **Resume Builder**: Helps students create professional resumes with AI-powered suggestions for courses and interview tips.
    -   **AI Chatbot**: An intelligent assistant to answer questions about AITAM, the platform, and general queries.
-   **Alumni Network**: A dedicated directory to find, connect with, and learn from AITAM alumni.
-   **User Profiles**: Customizable user profiles with profile pictures and roles (Student, Alumni, Admin).
-   **Secure Authentication**: Secure login and registration using college domain (`adityatekkali.edu.in`), Google, email, and phone options.
-   **Latest News & Information**: A live feed of the latest news and updates from the official AITAM website, summarized by AI.
-   **Automated Archiving**: Keeps the Q&A forum clean by archiving old questions, which remain accessible for a period.

## 🚀 Tech Stack

This application is built with a modern, robust, and scalable technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [Shadcn/ui](https://ui.shadcn.com/)
-   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models
-   **Backend & Authentication**: [Firebase](https://firebase.google.com/) (Authentication, App Hosting)
-   **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Environment Variables

Before running the application, you need to set up your environment variables. Create a file named `.env` in the root of the project and add the following keys:

```bash
# Your Google AI/Gemini API Key for AI features
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Your Firebase project's web app API key
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY_HERE"
```

Replace the placeholder values with your actual API keys.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/JAMIESWARANILKUMAR/Aitam-Connect-Platform.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd Aitam-Connect-Platform
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

The application will be available at `http://localhost:9002`.

### Building for Production

To create a production-ready build, run:

```sh
npm run build
```

This will generate an optimized version of your application in the `.next` folder. To run the production server, use:

```sh
npm start
```

## 📂 Project Structure

```
.
├── src
│   ├── ai                  # Genkit AI flows and configuration
│   ├── app                 # Next.js App Router pages and layouts
│   ├── components          # Reusable React components (UI, layout, etc.)
│   ├── hooks               # Custom React hooks
│   ├── lib                 # Utility functions, Firebase config, database mocks
│   └── styles              # Global styles and Tailwind CSS configuration
├── public                  # Static assets (images, fonts, etc.)
├── .env                    # Environment variables (API keys)
├── next.config.ts          # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

---

Developed & Designed by Vyntyra Consultancy Services Pvt. Ltd
# Aitam-Connect-Platform
# Aitam-Connect-Platform
