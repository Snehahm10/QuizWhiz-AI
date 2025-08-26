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

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

-   **Node.js**: Make sure you have Node.js version 18 or newer installed. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm**: npm (Node Package Manager) is included with Node.js.

### 1. Clone the Repository

First, clone the project repository to your local machine using Git.

```bash
git clone https://github.com/your-username/quizwhiz-ai.git
cd quizwhiz-ai
```

### 2. Install Dependencies

Next, install all the necessary project dependencies using npm. This command reads the `package.json` file and downloads the required libraries.

```bash
npm install
```

### 3. Set Up Environment Variables

For the application to connect to Firebase and Google AI services, you need to provide your API keys and configuration details.

1.  Create a new file named `.env` in the root directory of your project.
2.  Copy the following content into the `.env` file and replace the placeholder values with your actual credentials.

```env
# Firebase Configuration
# You can get these values from your Firebase project's settings page.
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"

# Google AI API Key for Genkit
# You can generate this from Google AI Studio.
GEMINI_API_KEY="your-google-ai-api-key"
```

*Note: The project also has a fallback Firebase configuration in `src/lib/firebase.ts`. However, using a `.env` file is the recommended and more secure approach.*

### 4. Run the Development Server

Now you're ready to start the application. Run the following command to launch the development server:

```bash
npm run dev
```

This command starts the Next.js application with Turbopack for faster performance. It also starts the Genkit AI flows required for generating quiz questions.

### 5. Open the Application

Once the server is running, you'll see a message in your terminal. Open your web browser and navigate to:

[http://localhost:9002](http://localhost:9002)

You should now see the QuizWhiz AI login page. You can create an account and start using the app!

## 📂 Project Structure

-   `src/app/`: Contains the pages and layouts for the Next.js App Router.
-   `src/components/`: Reusable React components, including UI elements from ShadCN.
-   `src/ai/`: Holds the Genkit flows for AI functionality.
-   `src/lib/`: Utility functions, constants, and Firebase configuration.
-   `src/hooks/`: Custom React hooks for authentication and toast notifications.
-   `public/`: Static assets.

## 📝 License

This project is open-source and available under the MIT License.
