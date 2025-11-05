
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateSlides } from '@/ai/flows/ppt-maker-flow';
import { Loader2, Download } from 'lucide-react';
import PptxGenJS from 'pptxgenjs';

type Slide = {
  title: string;
  content: string[];
};

export default function PptMakerPage() {
  const [topic, setTopic] = useState('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setSlides([]);
    setError(null);
    try {
      const result = await generateSlides({ topic });
      setSlides(result.slides);
      // Automatically trigger download after generating slides
      handleDownload(result.slides);
    } catch (error) {
      console.error("Error generating slides:", error);
      setError("Failed to generate slides. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (slidesToDownload: Slide[]) => {
    if (slidesToDownload.length === 0) return;

    let pptx = new PptxGenJS();
    
    // Add a title slide
    pptx.addSlide().addText(topic, {
      x: 0.5,
      y: 2.5,
      w: '90%',
      h: 1,
      align: 'center',
      fontSize: 36,
      bold: true,
      color: '363636'
    });

    // Add content slides
    slidesToDownload.forEach(slide => {
      let pptxSlide = pptx.addSlide();
      pptxSlide.addText(slide.title, {
        x: 0.5,
        y: 0.25,
        w: '90%',
        h: 1,
        fontSize: 24,
        bold: true,
        color: '0070C0'
      });
      pptxSlide.addText(slide.content.join('\n'), {
        x: 0.5,
        y: 1.5,
        w: '90%',
        h: 4,
        fontSize: 18,
        bullet: true
      });
    });

    pptx.writeFile({ fileName: `${topic.replace(/\s+/g, '_')}.pptx` });
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered PPT Maker</CardTitle>
          <CardDescription>Enter a topic, and we'll generate a presentation for you and download it as a .pptx file.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Textarea 
            placeholder="e.g., 'The Future of Artificial Intelligence'" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={loading || !topic}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Generating...' : 'Generate Slides'}
            </Button>
            {slides.length > 0 && (
                 <Button onClick={() => handleDownload(slides)} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download PPTX
                </Button>
            )}
          </div>
           {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {slides.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((slide, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Slide {index + 1}: {slide.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {slide.content.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
