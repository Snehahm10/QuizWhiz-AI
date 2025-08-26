# QuizWhiz AI

QuizWhiz AI is an intelligent, interactive, and user-friendly quiz application powered by Google's Generative AI. It allows users to test their knowledge across a wide range of subjects with dynamically generated multiple-choice questions (MCQs). The platform features user authentication, performance tracking, global leaderboards, and a modern, responsive interface with light and dark modes.

## ✨ Features

-   **AI-Powered MCQ Generation**: Dynamically creates unique questions for various subjects using Google's AI models via Genkit.
-   **User Authentication**: Secure sign-up and login functionality using Firebase Authentication.
-   **Customizable Quizzes**: Users can select the subject, difficulty level (Easy, Medium, Difficult), and language (English, Hindi, Kannada).
-   **Interactive Quiz Experience**: Each question is timed with a 30-second limit to keep the challenge engaging.
-   **Instant Feedback**: Receive immediate feedback on your answers with detailed explanations for the correct choice.
-   **Performance Tracking**:
    -   **Quiz History**: A log of all completed quizzes with scores.
    -   **Global Statistics**: View leaderboards and a chart of weekly activity for top players.
-   **Modern UI/UX**:
    -   A sleek, responsive design that works on all devices.
    -   A collapsible sidebar for easy navigation.
    -   **Light & Dark Mode**: Toggle between themes for your viewing comfort.
    -   Interactive components with subtle animations and hover effects.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI**: [Genkit](https://firebase.google.com/docs/genkit) (with Google AI)
-   **Authentication**: [Firebase](https://firebase.google.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Charts**: [Recharts](https://recharts.org/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or newer)
-   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/quizwhiz-ai.git
    cd quizwhiz-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add your Firebase configuration details and your Google AI API key.

    ```env
    # Firebase Configuration - Replace with your actual Firebase project config
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
    NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
    
    # Google AI API Key for Genkit
    GEMINI_API_KEY="your-google-ai-api-key"
    ```
    *Note: The project currently has Firebase config in `src/lib/firebase.ts`. For better security and management, moving it to `.env` is recommended.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📂 Project Structure

-   `src/app/`: Contains the pages and layouts for the Next.js App Router.
-   `src/components/`: Reusable React components, including UI elements from ShadCN.
-   `src/ai/`: Holds the Genkit flows for AI functionality.
-   `src/lib/`: Utility functions, constants, and Firebase configuration.
-   `src/hooks/`: Custom React hooks for authentication and toast notifications.
-   `public/`: Static assets.

## 📝 License

This project is open-source and available under the MIT License.
