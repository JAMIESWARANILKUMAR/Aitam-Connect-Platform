# AITAM Connect API Keys

This file documents the API keys and environment variables required for the AITAM Connect application to function correctly.

**Important:** For security reasons, the actual API keys are stored in the `.env` file and should never be committed to version control. This file serves as a reference for the required variables.

---

## 1. Google Gemini API Key

This key is used to authenticate with Google's Generative AI services for general application features, including the AI Chatbot and Answer Summarization tool.

-   **Environment Variable**: `GEMINI_API_KEY`
-   **File**: `.env`
-   **Usage**: Authenticates requests made through the Genkit library to the Gemini models.

```
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

## 2. PPT Maker API Key

This is a dedicated API key for the AI-powered PPT Maker feature. Using a separate key helps in monitoring and managing the API usage for this specific tool.

-   **Environment Variable**: `PPT_MAKER_API_KEY`
-   **File**: `.env`
-   **Usage**: Used exclusively by the `ppt-maker-flow.ts` to authenticate its requests to the Gemini model.

```
PPT_MAKER_API_KEY="YOUR_PPT_MAKER_API_KEY_HERE"
```

## 3. Firebase Web API Key

This key identifies your Firebase project and is used by the Firebase SDK to connect your application to Firebase services, primarily for user authentication (e.g., Google Sign-In, email/password login).

-   **Environment Variable**: `NEXT_PUBLIC_FIREBASE_API_KEY`
-   **File**: `.env`
-   **Usage**: Used in the Firebase configuration (`src/lib/firebase.ts`) to initialize the connection to your Firebase project. The `NEXT_PUBLIC_` prefix makes it accessible on the client-side, which is required for Firebase Authentication.

```
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY_HERE"
```
