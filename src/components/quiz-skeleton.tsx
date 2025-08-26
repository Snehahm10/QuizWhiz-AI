import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuizSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 flex-1" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 flex-1" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 flex-1" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}
