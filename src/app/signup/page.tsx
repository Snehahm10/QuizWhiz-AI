import { SignUpForm } from '@/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-blue-100 dark:to-blue-950">
       <div className="w-full max-w-sm">
         <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline tracking-tight">
                QuizWhiz AI
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Your AI-powered partner for creating and taking quizzes.
            </p>
        </div>
        <SignUpForm />
       </div>
    </main>
  );
}
