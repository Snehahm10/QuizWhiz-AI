import QuizApp from '@/components/quiz-app';

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
                Welcome back! Ready for a new quiz?
            </p>
        </header>
        <QuizApp />
    </div>
  );
}
