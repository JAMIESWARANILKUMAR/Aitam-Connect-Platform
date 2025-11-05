
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QnaFeed } from "@/components/dashboard/qna-feed";

export default function QnaPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Ask the Community</CardTitle>
          <CardDescription>Have a question? Post it here to get help from students, alumni, and faculty.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Question Title" />
          <Textarea placeholder="Type your detailed question here..." />
        </CardContent>
        <CardFooter>
          <Button>Raise Question</Button>
        </CardFooter>
      </Card>

      <QnaFeed />
    </div>
  );
}
