import QuizApp from '@/components/quiz-app';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background flex flex-col items-center p-4 sm:p-8 md:p-12">
      <header className="w-full max-w-4xl mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline tracking-tight">
            QuizWhiz AI
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your AI-powered partner for creating and taking quizzes.
          </p>
        </div>
      </header>
      <div className="w-full flex-1 flex justify-center items-start">
        <QuizApp />
      </div>
    </main>
  );
}
