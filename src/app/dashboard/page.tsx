import QuizApp from '@/components/quiz-app';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const user = auth.currentUser;
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome, {user?.displayName || user?.email?.split('@')[0] || 'Quizzer'}! 👋</h1>
            <p className="text-muted-foreground mt-1">
                Ready for a new challenge? Let's get started.
            </p>
        </header>
        <QuizApp />
    </div>
  );
}
