
'use client';

import { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Share, Linkedin, FileType, FileText as FileTextIcon, Eye, PlusCircle, Trash2 } from 'lucide-react';
import { ResumePreview } from '@/components/dashboard/resume-preview';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Description is required"),
});

const internshipSchema = z.object({
  role: z.string().min(1, "Role is required"),
  companyName: z.string().min(1, "Company name is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
});

const educationSchema = z.object({
  degree: z.string().min(1, "Degree/Course is required"),
  year: z.string().min(1, "Year is required"),
  score: z.string().min(1, "Score is required"),
});

const skillSchema = z.object({ name: z.string().min(1, "Skill cannot be empty") });
const certificationSchema = z.object({ name: z.string().min(1, "Certification cannot be empty") });
const projectSchema = z.object({ name: z.string().min(1, "Project name cannot be empty"), description: z.string() });
const extracurricularSchema = z.object({ activity: z.string().min(1, "Activity cannot be empty"), description: z.string() });


const resumeFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  summary: z.string().min(1, 'Professional summary is required'),
  industry: z.string().optional(),
  jobPosition: z.string().optional(),
  
  experience: z.array(experienceSchema),
  internships: z.array(internshipSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillSchema),
  certifications: z.array(certificationSchema),
  extracurricular: z.array(extracurricularSchema),
});


export type ResumeData = z.infer<typeof resumeFormSchema>;
export type TemplateType = "classic" | "modern" | "creative";
export type ColorType = "blue" | "green" | "purple" | "gray" | "black";
export type ResumeColor = ColorType | string;


export default function ResumeBuilderPage() {
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
      industry: '',
      jobPosition: '',
      experience: [],
      internships: [],
      education: [],
      projects: [],
      skills: [],
      certifications: [],
      extracurricular: [],
    },
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: "experience" });
  const { fields: internFields, append: appendIntern, remove: removeIntern } = useFieldArray({ control: form.control, name: "internships" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: "education" });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: "projects" });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: "skills" });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control: form.control, name: "certifications" });
  const { fields: extraFields, append: appendExtra, remove: removeExtra } = useFieldArray({ control: form.control, name: "extracurricular" });
  
  const resumeData = form.watch();

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
                const contentToPrint = document.createElement('div');
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
            ...data.experience.flatMap(exp => [
                new Paragraph({ children: [new TextRun({ text: exp.companyName, bold: true }), new TextRun({ text: ` - ${exp.role}`}) ] }),
                new Paragraph({ text: exp.description, style: "ListParagraph" })
            ]),

            new Paragraph({ text: 'Internships', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            ...data.internships.flatMap(intern => [
                new Paragraph({ children: [new TextRun({ text: intern.role, bold: true }), new TextRun({ text: ` at ${intern.companyName} (${intern.duration})`}) ] }),
                new Paragraph({ text: intern.description, style: "ListParagraph" })
            ]),
            
            new Paragraph({ text: 'Projects', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            ...data.projects.flatMap(proj => [
                new Paragraph({ children: [new TextRun({ text: proj.name, bold: true })] }),
                new Paragraph({ text: proj.description, style: "ListParagraph" })
            ]),

            new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            ...data.education.map(edu => new Paragraph({ text: `${edu.degree} (${edu.year}) - ${edu.score}` })),

            new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            new Paragraph(data.skills.map(s => s.name).join(', ')),
           
            new Paragraph({ text: 'Certifications & Licenses', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
            ...data.certifications.map(cert => new Paragraph({ text: cert.name, bullet: { level: 0 } })),

            new Paragraph({ text: 'Extracurricular Activities', heading: HeadingLevel.HEADING_1, spacing: { before: 200 } }),
             ...data.extracurricular.flatMap(extra => [
                new Paragraph({ children: [new TextRun({ text: extra.activity, bold: true })] }),
                new Paragraph({ text: extra.description, style: "ListParagraph" })
            ]),
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
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Resume Builder</CardTitle>
            <CardDescription>Create your professional resume with AI-driven insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                
                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Details</h3>
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Enter your full name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="Enter your email address" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="Enter your phone number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="linkedin" render={({ field }) => (
                      <FormItem><FormLabel>LinkedIn Profile</FormLabel><FormControl><Input placeholder="Enter your LinkedIn profile URL" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <Separator />

                {/* Professional Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Professional Summary</h3>
                   <FormField control={form.control} name="summary" render={({ field }) => (
                      <FormItem><FormControl><Textarea placeholder="A brief summary about your professional background..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <Separator />

                {/* Work Experience */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Work Experience</h3>
                  {expFields.map((field, index) => (
                    <Card key={field.id} className="p-4 relative">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <FormField control={form.control} name={`experience.${index}.companyName`} render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="e.g., Google" {...field} /></FormControl><FormMessage /></FormItem> )} />
                         <FormField control={form.control} name={`experience.${index}.role`} render={({ field }) => (<FormItem><FormLabel>Your Role</FormLabel><FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl><FormMessage /></FormItem> )} />
                       </div>
                       <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => (<FormItem className="mt-4"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe your responsibilities and achievements..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                       <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </Card>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ companyName: '', role: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Experience</Button>
                </div>
                <Separator />

                {/* Internships */}
                <div className="space-y-4">
                   <h3 className="text-lg font-semibold">Internships</h3>
                   {internFields.map((field, index) => (
                      <Card key={field.id} className="p-4 relative">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name={`internships.${index}.role`} render={({ field }) => (<FormItem><FormLabel>Role</FormLabel><FormControl><Input placeholder="e.g., Frontend Developer Intern" {...field} /></FormControl><FormMessage /></FormItem> )} />
                          <FormField control={form.control} name={`internships.${index}.companyName`} render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="e.g., Microsoft" {...field} /></FormControl><FormMessage /></FormItem> )} />
                          <FormField control={form.control} name={`internships.${index}.duration`} render={({ field }) => (<FormItem><FormLabel>Duration</FormLabel><FormControl><Input placeholder="e.g., 3 Months" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        </div>
                        <FormField control={form.control} name={`internships.${index}.description`} render={({ field }) => (<FormItem className="mt-4"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe your tasks and what you learned..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeIntern(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </Card>
                   ))}
                   <Button type="button" variant="outline" size="sm" onClick={() => appendIntern({ role: '', companyName: '', duration: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Internship</Button>
                </div>
                <Separator />
                
                {/* Education */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Education</h3>
                    {eduFields.map((field, index) => (
                        <Card key={field.id} className="p-4 relative">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree/Course</FormLabel><FormControl><Input placeholder="e.g., B.Tech in CSE" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                <FormField control={form.control} name={`education.${index}.year`} render={({ field }) => (<FormItem><FormLabel>Year</FormLabel><FormControl><Input placeholder="e.g., 2020-2024" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                <FormField control={form.control} name={`education.${index}.score`} render={({ field }) => (<FormItem><FormLabel>Percentage/CGPA</FormLabel><FormControl><Input placeholder="e.g., 8.5 CGPA" {...field} /></FormControl><FormMessage /></FormItem> )} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ degree: '', year: '', score: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Education</Button>
                </div>
                <Separator />

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {skillFields.map((field, index) => (
                        <Card key={field.id} className="p-2 flex items-center gap-2">
                           <FormField control={form.control} name={`skills.${index}.name`} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input placeholder="e.g., React" {...field} /></FormControl><FormMessage /></FormItem> )} />
                           <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </Card>
                    ))}
                  </div>
                   <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Skill</Button>
                </div>
                <Separator />

                {/* Projects */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Projects</h3>
                  {projectFields.map((field, index) => (
                    <Card key={field.id} className="p-4 relative">
                       <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="e.g., E-commerce Website" {...field} /></FormControl><FormMessage /></FormItem> )} />
                       <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (<FormItem className="mt-4"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe the project..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                       <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeProject(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </Card>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendProject({ name: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Project</Button>
                </div>
                <Separator />

                {/* Certifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Certifications & Licenses</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certFields.map((field, index) => (
                        <Card key={field.id} className="p-2 flex items-center gap-2">
                           <FormField control={form.control} name={`certifications.${index}.name`} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input placeholder="e.g., Google Cloud Certified" {...field} /></FormControl><FormMessage /></FormItem> )} />
                           <Button type="button" variant="ghost" size="icon" onClick={() => removeCert(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </Card>
                    ))}
                  </div>
                   <Button type="button" variant="outline" size="sm" onClick={() => appendCert({ name: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Certification</Button>
                </div>
                <Separator />
                
                {/* Extracurricular */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Extracurricular Activities</h3>
                  {extraFields.map((field, index) => (
                    <Card key={field.id} className="p-4 relative">
                       <FormField control={form.control} name={`extracurricular.${index}.activity`} render={({ field }) => (<FormItem><FormLabel>Activity/Organization</FormLabel><FormControl><Input placeholder="e.g., Coding Club" {...field} /></FormControl><FormMessage /></FormItem> )} />
                       <FormField control={form.control} name={`extracurricular.${index}.description`} render={({ field }) => (<FormItem className="mt-4"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Your role and contributions..." {...field} /></FormControl><FormMessage /></FormItem> )} />
                       <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExtra(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </Card>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => appendExtra({ activity: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4"/>Add Activity</Button>
                </div>

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

    