import { LoginForm } from '@/components/auth/login-form';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
       <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 flex flex-col items-center">
            <div className="bg-primary/10 text-primary rounded-full p-3 mb-4">
                <Bot className="h-10 w-10" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
                QuizWhiz AI
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Your AI partner for smarter quizzing.
            </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
