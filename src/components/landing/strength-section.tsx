
"use client";

import { Users, GraduationCap, Briefcase, UserCheck } from "lucide-react";

const stats = [
    {
        icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
        value: "5.5K",
        label: "Student Strength",
        color: "text-blue-500"
    },
    {
        icon: <Users className="w-8 h-8 text-green-500" />,
        value: "11.5K",
        label: "Alumni as on Date",
        color: "text-green-500"
    },
    {
        icon: <Briefcase className="w-8 h-8 text-purple-500" />,
        value: "90%",
        label: "Job Offers",
        color: "text-purple-500"
    },
    {
        icon: <UserCheck className="w-8 h-8 text-red-500" />,
        value: "270+",
        label: "Faculties",
        color: "text-red-500"
    },
];

export default function StrengthSection() {
    return (
        <section id="strength" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex justify-center items-center gap-4 mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Our College Strength</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:bg-card rounded-lg border">
                            <div className="mb-4 rounded-full bg-muted p-4">
                                {stat.icon}
                            </div>
                            <h3 className={`text-4xl font-bold ${stat.color}`}>{stat.value}</h3>
                            <p className="text-muted-foreground mt-2 uppercase font-semibold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
