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

## 🚀 Getting the Code and Running Locally

Follow these steps to get the project from this environment onto your computer and push it to your GitHub repository.

### Prerequisites

-   **Node.js**: Make sure you have Node.js version 18 or newer installed. You can download it from [nodejs.org](https://nodejs.org/).
-   **Git**: Make sure you have Git installed. You can download it from [git-scm.com](https://git-scm.com/).
-   **A GitHub Account** and an empty repository ready to receive the code. Your repository URL is: `https://github.com/Snehahm10/MCQ-Generator-Firebase.git`

### Step 1: Set Up a Local Folder

Open the terminal or command prompt on your own computer and navigate to where you want to save the project.

```bash
# Create a new folder for your project and move into it
mkdir MCQ-Generator-Firebase
cd MCQ-Generator-Firebase
```

### Step 2: Initialize Git and Connect to GitHub

Now, turn this folder into a Git repository and tell it where your GitHub repository is.

```bash
# Initialize a new Git repository
git init

# Set the main branch name (optional but good practice)
git branch -M main

# Add your GitHub repository as the remote origin
git remote add origin https://github.com/Snehahm10/MCQ-Generator-Firebase.git
```
*If you get an error that the remote already exists, run this command instead:* `git remote set-url origin https://github.com/Snehahm10/MCQ-Generator-Firebase.git`

### Step 3: Pull the Code From Firebase Studio

This is the key step. You will pull all the project files from this environment directly into your local folder.

```bash
# This special URL points to this project's repository
git pull https://source.cloud.google.com/p/quizwhiz-ai-55j1g/r/studio-project-Snehahm10-MCQ-Generator main --allow-unrelated-histories
```
*If that command fails with a "fatal: unable to update url base from redirection" error, it means you may not be authenticated correctly. Please ensure you are logged in with the same Google account you are using for Firebase Studio.*

### Step 4: Push the Code to Your GitHub

After the pull is successful, all the files will be on your computer. Now, send them up to your GitHub repository.

```bash
git push -u origin main
```
*You may need to use `git push --force -u origin main` if the repository on GitHub is not completely empty.*

### Step 5: Install Dependencies and Run

Once the code is on your computer and on GitHub, you're ready to run it.

```bash
# Install all the necessary packages
npm install
```

### Step 6: Set Up Environment Variables

For the application to connect to Firebase and Google AI services, you need to provide your API keys.

1.  Create a new file named `.env` in the root of your project.
2.  Copy the following content into it and replace the placeholders with your actual credentials.

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

### Step 7: Run the Development Server

```bash
npm run dev
```
Open your web browser to [http://localhost:9002](http://localhost:9002) to see your application running!

## 📂 Project Structure

-   `src/app/`: Contains the pages and layouts for the Next.js App Router.
-   `src/components/`: Reusable React components, including UI elements from ShadCN.
-   `src/ai/`: Holds the Genkit flows for AI functionality.
-   `src/lib/`: Utility functions, constants, and Firebase configuration.
-   `src/hooks/`: Custom React hooks for authentication and toast notifications.
-   `public/`: Static assets.

## 📝 License

This project is open-source and available under the MIT License.
