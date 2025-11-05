
"use client";

import { Trophy, Rocket, ShieldCheck, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const achievements = [
    {
      icon: <Trophy className="w-12 h-12 text-primary" />,
      title: "NAAC A++ Grade",
      description: "Accredited with a CGPA of 3.78, the highest in the region.",
    },
    {
      icon: <Rocket className="w-12 h-12 text-primary" />,
      title: "95% Placements",
      description: "Consistently achieving high placement rates in top companies.",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: "Autonomous Status",
      description: "Granted by UGC for academic excellence and innovation.",
    },
    {
      icon: <UserCheck className="w-12 h-12 text-primary" />,
      title: "NBA Accreditation",
      description: "6 branches accredited, ensuring high-quality technical education.",
    },
];

export default function AchievementsSection() {
    return (
        <section id="achievements" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Trophy className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Our Achievements</h2>
            </div>
            <div className="mx-auto grid justify-center gap-6 text-center lg:grid-cols-2 lg:gap-12 mt-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:bg-card">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      {achievement.icon}
                    </div>
                    <h3 className="text-xl font-bold">{achievement.title}</h3>
                    <p className="text-muted-foreground mt-2">{achievement.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
    );
}
