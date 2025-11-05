import Link from "next/link";
import { newsItems } from "@/lib/database/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function NewsUpdates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News & Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {newsItems.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 p-2 rounded-lg hover:bg-muted">
            <h3 className="font-semibold text-primary">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.summary}</p>
            <Link href={item.link} className="text-xs text-primary/80 hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              Read More <ArrowRight className="h-3 w-3"/>
            </Link>
          </div>
        ))}
         <Button variant="outline" size="sm" className="mt-2">View All News</Button>
      </CardContent>
    </Card>
  );
}
