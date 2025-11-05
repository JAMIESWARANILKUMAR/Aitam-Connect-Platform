
'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, AlertCircle, FileCheck, Palette, Share, Linkedin, FileType, FileText as FileTextIcon, Eye } from 'lucide-react';
import { analyzeResume, type ResumeAnalysisOutput } from '@/ai/flows/resume-checker-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ResumePreview } from '@/components/dashboard/resume-preview';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const resumeFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  summary: z.string().min(1, 'Professional summary is required'),
  experience: z.string().min(1, 'Work experience is required'),
  education: z.string().min(1, 'Education is required'),
  skills: z.string().min(1, 'Skills are required'),
  industry: z.string().optional(),
  jobPosition: z.string().optional(),
  internships: z.string().optional(),
  extracurricular: z.string().optional(),
  certifications: z.string().optional(),
  projects: z.string().optional(),
});

export type ResumeData = z.infer<typeof resumeFormSchema>;
export type TemplateType = "classic" | "modern" | "creative";
export type ColorType = "blue" | "green" | "purple" | "gray" | "black";
export type ResumeColor = ColorType | string;


export default function ResumeBuilderPage() {
  const [analysis, setAnalysis] = useState<ResumeAnalysisOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateType>('classic');
  const [color, setColor] = useState<ResumeColor>('blue');
  const { toast } = useToast();
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      summary: '',
      experience: '',
      education: '',
      skills: '',
      industry: '',
      jobPosition: '',
      internships: '',
      extracurricular: '',
      certifications: '',
      projects: '',
    },
  });
  
  const resumeData = form.watch();

  const handleAnalyze = async () => {
    const values = form.getValues();
    const resumeText = Object.entries(values)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:\n${value}`)
      .join('\n\n');
      
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeResume({ resumeText });
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    const resumeElement = resumePreviewRef.current;
    if (resumeElement) {
        toast({
            title: "Printing Resume",
            description: "To save as PDF, please use your browser's print option (Ctrl+P or Cmd+P) and select 'Save as PDF' as the destination.",
        });
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const styles = Array.from(document.styleSheets)
              .map(styleSheet => {
                  try {
                      return Array.from(styleSheet.cssRules)
                          .map(rule => rule.cssText)
                          .join('');
                  } catch (e) {
                      console.log('Access to stylesheet %s is denied. Ignoring.', styleSheet.href);
                      return '';
                  }
              })
              .join('');

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Resume</title>
                        <style>${styles}</style>
                    </head>
                    <body>
                        <div id="print-container"></div>
                    </body>
                </html>
            `);
            const printContainer = printWindow.document.getElementById('print-container');
            if (printContainer) {
                // We need a div to mount the preview for printing
                const contentToPrint = document.createElement('div');
                // The ref is on a div that contains the ResumePreview component
                // So we need to clone the child of the ref's current element
                if (resumePreviewRef.current?.firstChild) {
                    contentToPrint.appendChild(resumePreviewRef.current.firstChild.cloneNode(true));
                    printContainer.appendChild(contentToPrint);
                }
            }
            printWindow.document.close();
            
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
            }, 500);
        } else {
            toast({
                title: "Popup Blocked",
                description: "Please allow popups for this site to print your resume.",
                variant: "destructive"
            });
        }
    } else {
         toast({
            title: "Error",
            description: "Could not find resume content to print. Generate a preview first.",
            variant: "destructive"
        });
    }
  };
  
    const handleDownloadDocx = async () => {
    const data = form.getValues();
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: data.fullName, heading: HeadingLevel.TITLE }),
            new Paragraph({ text: data.jobPosition || '', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({
              children: [
                new TextRun({ text: `Email: ${data.email}`, break: 1 }),
                new TextRun({ text: ` | Phone: ${data.phone}`, break: 0 }),
                ...(data.linkedin ? [new TextRun({ text: ` | LinkedIn: ${data.linkedin}`, break: 0 })] : []),
              ],
            }),
            new Paragraph({ text: 'Professional Summary', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            new Paragraph(data.summary),
            new Paragraph({ text: 'Work Experience', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            ...data.experience.split('\n').map(exp => new Paragraph({ text: exp, bullet: { level: 0 } })),
            ...(data.internships ? [
              new Paragraph({ text: 'Internships', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
              ...data.internships.split('\n').map(intern => new Paragraph({ text: intern, bullet: { level: 0 } }))
            ] : []),
             ...(data.projects ? [
                new Paragraph({ text: 'Projects', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
                ...data.projects.split('\n').map(proj => new Paragraph({ text: proj, bullet: { level: 0 } }))
            ] : []),
            new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            ...data.education.split('\n').map(edu => new Paragraph({ text: edu, bullet: { level: 0 } })),
            new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            new Paragraph(data.skills),
            ...(data.certifications ? [
                new Paragraph({ text: 'Certifications & Licenses', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
                ...data.certifications.split('\n').map(cert => new Paragraph({ text: cert, bullet: { level: 0 } }))
            ] : []),
            ...(data.extracurricular ? [
                new Paragraph({ text: 'Extracurricular Activities', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
                ...data.extracurricular.split('\n').map(extra => new Paragraph({ text: extra, bullet: { level: 0 } }))
            ] : []),
          ],
        },
      ],
    });

    try {
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${data.fullName.replace(' ', '_')}_Resume.docx`);
        toast({
            title: "DOCX Generated",
            description: "Your resume has been downloaded as a .docx file."
        });
    } catch(e) {
        console.error(e);
        toast({
            title: "Error Generating DOCX",
            description: "Could not create the .docx file. Please try again.",
            variant: "destructive"
        });
    }
  };

  const handleShareWithAlumni = () => {
    const subject = `Request for Resume Review from AITAM Student: ${resumeData.fullName}`;
    const body = `Dear Alumnus,\n\nI am a current student at AITAM and would be grateful if you could review my attached resume and provide any feedback.\n\nThank you for your time and guidance.\n\nBest regards,\n${resumeData.fullName}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  const handleShareToLinkedIn = () => {
      const linkedInPostUrl = `https://www.linkedin.com/feed/?share=`;
      window.open(linkedInPostUrl, '_blank');
  };

  const TemplatePreviewCard = ({ type, label }: { type: TemplateType; label: string }) => (
    <div
      onClick={() => setTemplate(type)}
      className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${template === type ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
    >
      <div className="bg-muted aspect-[3/4] rounded-md p-2 flex flex-col gap-1">
        <div className={`h-3 w-1/2 rounded-sm ${type === 'classic' ? 'mx-auto bg-gray-400' : 'bg-primary'}`}></div>
        <div className="h-1 w-2/3 rounded-sm bg-gray-300 mx-auto"></div>
        {type === 'modern' ? (
          <div className="flex gap-2 flex-grow mt-2">
            <div className="w-1/3 bg-gray-300/50 rounded-sm p-1 flex flex-col gap-1">
              <div className="h-2 w-full rounded-sm bg-gray-400/50"></div>
              <div className="h-1 w-full rounded-sm bg-gray-400/30"></div>
              <div className="h-1 w-2/3 rounded-sm bg-gray-400/30"></div>
            </div>
            <div className="w-2/3 bg-transparent p-1 flex flex-col gap-1">
              <div className="h-2 w-full rounded-sm bg-gray-400/50"></div>
              <div className="h-1 w-full rounded-sm bg-gray-400/30"></div>
              <div className="h-1 w-2/3 rounded-sm bg-gray-400/30"></div>
            </div>
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-1">
            <div className="h-2 w-full rounded-sm bg-gray-400/50"></div>
            <div className="h-1 w-full rounded-sm bg-gray-400/30"></div>
            <div className="h-1 w-2/3 rounded-sm bg-gray-400/30"></div>
          </div>
        )}
      </div>
      <p className="text-center text-sm font-medium mt-2">{label}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Column 1: Form */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Resume Builder</CardTitle>
            <CardDescription>Create your professional resume with AI-driven insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jami Eswar Anil Kumar" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="jami.eswar@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="+91 98765 43210" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="linkedin" render={({ field }) => (
                    <FormItem><FormLabel>LinkedIn Profile</FormLabel><FormControl><Input placeholder="linkedin.com/in/jamieswar" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="industry" render={({ field }) => (
                    <FormItem><FormLabel>Target Industry</FormLabel><FormControl><Input placeholder="e.g., Software Engineering" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="jobPosition" render={({ field }) => (
                    <FormItem><FormLabel>Target Job Position</FormLabel><FormControl><Input placeholder="e.g., Frontend Developer" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="summary" render={({ field }) => (
                    <FormItem><FormLabel>Professional Summary</FormLabel><FormControl><Textarea placeholder="A brief summary about your professional background..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="experience" render={({ field }) => (
                    <FormItem><FormLabel>Work Experience</FormLabel><FormControl><Textarea placeholder="Your work experience (use bullet points for details)..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="internships" render={({ field }) => (
                    <FormItem><FormLabel>Internships</FormLabel><FormControl><Textarea placeholder="Details about your internships..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="projects" render={({ field }) => (
                    <FormItem><FormLabel>Projects</FormLabel><FormControl><Textarea placeholder="Key projects you've worked on..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="education" render={({ field }) => (
                    <FormItem><FormLabel>Education</FormLabel><FormControl><Textarea placeholder="Your educational qualifications..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem><FormLabel>Skills</FormLabel><FormControl><Input placeholder="e.g., React, Next.js, TypeScript, Tailwind CSS" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="certifications" render={({ field }) => (
                    <FormItem><FormLabel>Certifications & Licenses</FormLabel><FormControl><Textarea placeholder="Any relevant certifications..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="extracurricular" render={({ field }) => (
                    <FormItem><FormLabel>Extracurricular Activities</FormLabel><FormControl><Textarea placeholder="Clubs, sports, volunteering, etc." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Column 2: Customization, Analysis, and Download */}
      <div className="lg:col-span-1 space-y-6">
        <div className="absolute -left-[9999px] top-auto w-[800px]">
          <div ref={resumePreviewRef}>
            <ResumePreview data={resumeData} template={template} color={color} />
          </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Customize Your Resume</CardTitle>
            </CardHeader>
              <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Choose a Template</Label>
                    <div className="grid grid-cols-3 gap-4">
                        <TemplatePreviewCard type="classic" label="Classic" />
                        <TemplatePreviewCard type="modern" label="Modern" />
                        <TemplatePreviewCard type="creative" label="Creative" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Choose a Color</Label>
                    <RadioGroup 
                        defaultValue="blue" 
                        value={typeof color === 'string' && ['blue', 'green', 'purple', 'gray', 'black'].includes(color) ? color : 'custom'} 
                        onValueChange={(value) => { if (value !== 'custom') setColor(value as ColorType); }} 
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Label className="flex items-center gap-2 cursor-pointer border rounded-md p-3 hover:bg-muted has-[:checked]:bg-blue-600 has-[:checked]:text-white has-[:checked]:border-blue-600">
                            <RadioGroupItem value="blue" id="c-blue" />
                            Blue
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer border rounded-md p-3 hover:bg-muted has-[:checked]:bg-green-600 has-[:checked]:text-white has-[:checked]:border-green-600">
                            <RadioGroupItem value="green" id="c-green" />
                            Green
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer border rounded-md p-3 hover:bg-muted has-[:checked]:bg-purple-600 has-[:checked]:text-white has-[:checked]:border-purple-600">
                            <RadioGroupItem value="purple" id="c-purple" />
                            Purple
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer border rounded-md p-3 hover:bg-muted has-[:checked]:bg-gray-800 has-[:checked]:text-white has-[:checked]:border-gray-800">
                            <RadioGroupItem value="gray" id="c-gray" />
                            Gray
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer border rounded-md p-3 hover:bg-muted has-[:checked]:bg-black has-[:checked]:text-white has-[:checked]:border-black">
                            <RadioGroupItem value="black" id="c-black" />
                            Black
                        </Label>
                        <div className="relative">
                            <Label 
                                htmlFor="custom-color-picker" 
                                className="flex items-center gap-2 cursor-pointer border rounded-md p-3 hover:bg-muted has-[:checked]:ring-2 has-[:checked]:ring-primary"
                                onClick={() => colorInputRef.current?.click()}
                                style={{
                                    backgroundColor: typeof color !== 'string' || !['blue', 'green', 'purple', 'gray', 'black'].includes(color) ? color : undefined,
                                    color: typeof color === 'string' && color.startsWith('#') && parseInt(color.substring(1, 3), 16) < 128 ? 'white' : 'black',
                                }}
                            >
                                <RadioGroupItem value="custom" id="c-custom" className="sr-only"/>
                                Custom
                            </Label>
                            <Input 
                                id="custom-color-picker"
                                ref={colorInputRef}
                                type="color" 
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => setColor(e.target.value)}
                                value={typeof color === 'string' ? color : '#000000'}
                            />
                        </div>
                    </RadioGroup>
              </div>
              </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileCheck className="h-6 w-6 text-primary" /> ATS Resume Analyzer</CardTitle>
                <CardDescription>Get AI-powered feedback on the resume you've built.</CardDescription>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-4">
                <Button onClick={handleAnalyze} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Analyze Resume
                </Button>
                {loading && <p className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Analyzing your resume...</p>}
                {error && <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Analysis Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    </Alert>
                }
                {analysis && (
                    <Alert className="border-primary/20 bg-gradient-to-tr from-blue-50 via-cyan-50 to-sky-100 dark:from-blue-950/80 dark:via-cyan-950/80 dark:to-sky-950/80">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-bold text-primary">Analysis Complete</AlertTitle>
                    <AlertDescription className="prose prose-sm max-w-full dark:prose-invert">
                        <h4>Overall Score: {analysis.overallScore}/100</h4>
                        <p>{analysis.overallFeedback}</p>
                        <h5>Suggestions for Improvement:</h5>
                        <ul>
                            {analysis.suggestions.map((suggestion, i) => (
                                <li key={i}>{suggestion}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>

        <Card>
            <CardHeader><CardTitle>Preview, Download & Share</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline"><Eye className="mr-2 h-4 w-4" />Preview</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Resume Preview</DialogTitle>
                      </DialogHeader>
                      <div className="flex-grow overflow-auto">
                        <div className="w-[800px] mx-auto">
                            <ResumePreview data={resumeData} template={template} color={color} />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={handleDownloadPdf} type="button"><FileType className="mr-2 h-4 w-4" />Save as PDF</Button>
                  <Button onClick={handleDownloadDocx} type="button"><FileTextIcon className="mr-2 h-4 w-4" />Save as DOCX</Button>
                  <Button onClick={handleShareWithAlumni} type="button" variant="secondary"><Share className="mr-2 h-4 w-4" />Share with Alumni</Button>
                  <Button onClick={handleShareToLinkedIn} type="button" variant="secondary" className="bg-[#0077B5] hover:bg-[#0077B5]/90 text-white">
                    <Linkedin className="mr-2 h-4 w-4" /> Share to LinkedIn
                  </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    