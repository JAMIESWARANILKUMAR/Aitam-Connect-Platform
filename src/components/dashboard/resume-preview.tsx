
'use client';

import React from 'react';
import type { ResumeData, TemplateType, ResumeColor } from '@/app/dashboard/resume-builder/page';
import { Mail, Phone, Linkedin, Briefcase, GraduationCap, Star, Award, Code, Construction } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  color: ResumeColor;
}

const predefinedColorSchemes: Record<string, { main: string; muted: string, text: string, mutedText: string }> = {
  blue: { main: 'hsl(var(--primary))', muted: '#eef6ff', text: '#1e40af', mutedText: '#3b82f6'},
  green: { main: '#059669', muted: '#f0fdf4', text: '#065f46', mutedText: '#10b981' },
  purple: { main: '#7c3aed', muted: '#f5f3ff', text: '#5b21b6', mutedText: '#8b5cf6' },
  gray: { main: '#4b5563', muted: '#f3f4f6', text: '#1f2937', mutedText: '#6b7280' },
  black: { main: '#111827', muted: '#f3f4f6', text: '#000000', mutedText: '#4b5563'},
};

// Function to convert hex to HSL
const hexToHsl = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

// Function to generate shades from a main color
const generateSchemeFromHex = (hex: string) => {
    const [h, s, l] = hexToHsl(hex);
    return {
        main: hex,
        muted: `hsla(${h}, ${s}%, ${Math.min(95, l + 30)}%, 0.3)`,
        text: `hsl(${h}, ${s}%, ${Math.max(10, l - 25)}%)`,
        mutedText: `hsl(${h}, ${s}%, ${Math.max(20, l - 10)}%)`,
    };
};

const templates = {
  classic: {
    container: 'p-8 bg-white font-serif text-gray-800',
    header: 'text-center border-b-2 pb-4 mb-6',
    name: 'text-4xl font-bold',
    jobPosition: 'text-lg text-gray-600 tracking-wider',
    contact: 'flex justify-center items-center gap-x-4 gap-y-1 flex-wrap mt-2 text-sm text-gray-600',
    sectionTitle: 'text-xl font-bold uppercase tracking-wider border-b-2 pb-1 mb-4',
    section: 'mb-6'
  },
  modern: {
    container: 'bg-white font-sans flex text-gray-800 min-h-[1056px]',
    sidebar: 'w-1/3 p-6',
    main: 'w-2/3 p-6',
    header: 'text-left mb-8',
    name: 'text-4xl font-bold',
    jobPosition: 'text-lg',
    contact: 'flex flex-col gap-2 mt-4 text-sm',
    sectionTitle: 'text-lg font-bold uppercase tracking-wider pb-2 mb-4',
    section: 'mb-6'
  },
  creative: {
    container: 'p-8 bg-white font-mono text-gray-800',
    header: 'relative text-left pb-4 mb-6',
    name: 'text-5xl font-extrabold tracking-tight',
    jobPosition: 'text-xl font-light tracking-widest uppercase',
    contact: 'flex items-start gap-x-4 gap-y-1 flex-wrap mt-3 text-sm',
    sectionTitle: 'text-lg font-semibold uppercase border-l-4 pl-4 mb-4',
    section: 'mb-6'
  },
};

const Section: React.FC<{ title: string; icon?: React.ReactNode; className?: string; styles: { title: React.CSSProperties; icon?: React.CSSProperties }; children: React.ReactNode }> = ({ title, icon, className, styles, children }) => {
    const hasChildren = React.Children.count(children) > 0 && 
        React.Children.toArray(children).some(child => {
            if (React.isValidElement(child)) {
                // Check for arrays with items, or non-empty strings/elements
                if (Array.isArray(child.props.children) && child.props.children.length === 0) return false;
                if (child.props.children === null || child.props.children === undefined) return false;
                return true;
            }
            return false;
        });

    if (!hasChildren) return null;

    return (
        <section className={className}>
            <h2 className="flex items-center gap-3" style={styles.title}>
                {icon && styles.icon && <span className="p-1 rounded-full bg-white" style={styles.icon}>{icon}</span>}
                {title}
            </h2>
            <div className="mt-3 prose prose-sm max-w-none text-gray-700">
              {children}
            </div>
        </section>
    );
};


const TemplateRenderer = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, template, color }, ref) => {
    if (!data) {
        return null;
    }
    const t = templates[template] || templates.classic;
    const c = typeof color === 'string' && predefinedColorSchemes[color]
        ? predefinedColorSchemes[color]
        : generateSchemeFromHex(typeof color === 'string' ? color : '#000000');


    const dynamicStyles = {
        name: { color: c.text },
        jobPosition: { color: c.mutedText },
        sectionTitle: { color: c.text, borderColor: c.main },
        icon: { color: c.main },
        link: { color: c.main },
        sidebar: { backgroundColor: c.main },
        headerLine: { backgroundColor: c.main },
        sectionIcon: { backgroundColor: c.main, color: 'white' }
    };

    const contactInfo = (
        <div className={t.contact}>
            {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:underline" style={{color: t.container.includes('font-sans') ? 'white' : c.main}}>
                <Mail size={14} /> <span>{data.email}</span>
            </a>}
            {data.phone && <span className="flex items-center gap-2" style={{color: t.container.includes('font-sans') ? 'white' : ''}}>
                <Phone size={14} /> <span>{data.phone}</span>
            </span>}
            {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline" style={{color: t.container.includes('font-sans') ? 'white' : c.main}}>
                    <Linkedin size={14} /> <span>{data.linkedin.replace(/^https?:\/\//, '')}</span>
                </a>
            )}
        </div>
    );
    
    const skillsSection = (
      <div className="flex flex-wrap gap-2 mt-2">
          {data.skills?.map((skill, index) => (
              <span key={index} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{backgroundColor: c.muted, color: c.text}}>
                  {skill.name.trim()}
              </span>
          ))}
      </div>
    );

    const mainContent = (
      <>
        <Section title="Professional Summary" icon={<Briefcase size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
          <p className="whitespace-pre-line">{data.summary}</p>
        </Section>
        <Section title="Work Experience" icon={<Briefcase size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
             <div className="space-y-4">
                {data.experience?.map((exp, i) => (
                    <div key={i}>
                        <h3 className="font-bold">{exp.companyName} - <span className="font-medium italic">{exp.role}</span></h3>
                        <p className="whitespace-pre-line text-sm text-gray-600">{exp.description}</p>
                    </div>
                ))}
            </div>
        </Section>
        <Section title="Internships" icon={<Briefcase size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
            <div className="space-y-4">
                {data.internships?.map((intern, i) => (
                    <div key={i}>
                         <h3 className="font-bold">{intern.role} at {intern.companyName} - <span className="font-medium italic">{intern.duration}</span></h3>
                        <p className="whitespace-pre-line text-sm text-gray-600">{intern.description}</p>
                    </div>
                ))}
            </div>
        </Section>
        <Section title="Projects" icon={<Construction size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
            <div className="space-y-4">
                {data.projects?.map((proj, i) => (
                     <div key={i}>
                        <h3 className="font-bold">{proj.name}</h3>
                        <p className="whitespace-pre-line text-sm text-gray-600">{proj.description}</p>
                    </div>
                ))}
            </div>
        </Section>
        <Section title="Education" icon={<GraduationCap size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
            <div className="space-y-2">
                {data.education?.map((edu, i) => (
                     <div key={i}>
                        <h3 className="font-bold">{edu.degree} ({edu.year})</h3>
                        <p className="text-sm text-gray-600">Score: {edu.score}</p>
                    </div>
                ))}
            </div>
        </Section>
        {template !== 'modern' && (
          <Section title="Skills" icon={<Code size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
            {skillsSection}
          </Section>
        )}
         <Section title="Certifications & Licenses" icon={<Award size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
            <ul className="list-disc list-inside">
                {data.certifications?.map((cert, i) => <li key={i}>{cert.name}</li>)}
            </ul>
        </Section>
        <Section title="Extracurricular Activities" icon={<Star size={14}/>} className={t.section} styles={{ title: dynamicStyles.sectionTitle, icon: dynamicStyles.sectionIcon }}>
            <div className="space-y-4">
                {data.extracurricular?.map((extra, i) => (
                    <div key={i}>
                        <h3 className="font-bold">{extra.activity}</h3>
                        <p className="whitespace-pre-line text-sm text-gray-600">{extra.description}</p>
                    </div>
                ))}
            </div>
        </Section>
      </>
    );

    const header = (
      <header className={t.header}>
        {data?.fullName && <h1 className={t.name} style={dynamicStyles.name}>{data.fullName}</h1>}
        {data.jobPosition && <p className={t.jobPosition} style={dynamicStyles.jobPosition}>{data.jobPosition}</p>}
        {template !== 'modern' && contactInfo}
        {template === 'creative' && <div className="absolute bottom-0 left-0 w-full h-1" style={dynamicStyles.headerLine}></div>}
      </header>
    );

    return (
        <div id="resume-preview-content" ref={ref} className={cn(t.container, 'w-[800px] min-h-[1131px]')}>
            {template === 'modern' ? (
                <>
                    <aside className={t.sidebar} style={dynamicStyles.sidebar}>
                       <header className={t.header}>
                          {data?.fullName && <h1 className={cn(t.name, "text-white")}>{data.fullName}</h1>}
                          {data.jobPosition && <p className={cn(t.jobPosition, "text-white/80")}>{data.jobPosition}</p>}
                        </header>
                        <div className="text-white/90">
                           <Section title="Contact" icon={<Mail size={14}/>} className={t.section} styles={{ title: {color: 'white', borderBottom: '1px solid rgba(255,255,255,0.3)', ...templates.modern.sectionTitle}, icon: { backgroundColor: 'white', color: c.main } }}>
                             {contactInfo}
                           </Section>
                            <Section title="Skills" icon={<Code size={14}/>} className={t.section} styles={{ title: {color: 'white', borderBottom: '1px solid rgba(255,255,255,0.3)', ...templates.modern.sectionTitle}, icon: { backgroundColor: 'white', color: c.main } }}>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {data.skills?.map((skill, index) => (
                                      <span key={index} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 text-white">
                                          {skill.name.trim()}
                                      </span>
                                  ))}
                                </div>
                            </Section>
                        </div>
                    </aside>
                    <main className={t.main}>{mainContent}</main>
                </>
            ) : (
                <>
                    {header}
                    {mainContent}
                </>
            )}
        </div>
    );
});
TemplateRenderer.displayName = 'TemplateRenderer';


export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, template, color }, ref) => {
    if (!data) return null;
    return <TemplateRenderer ref={ref} data={data} template={template} color={color} />;
});
ResumePreview.displayName = 'ResumePreview';

    