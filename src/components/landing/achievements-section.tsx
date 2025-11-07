
"use client";

import { Trophy, Rocket, ShieldCheck, UserCheck } from "lucide-react";

const achievements = [
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "NAAC A++ Grade",
      description: "Accredited with a CGPA of 3.78, the highest in the region.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "95% Placements",
      description: "Consistently achieving high placement rates in top companies.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Autonomous Status",
      description: "Granted by UGC for academic excellence and innovation.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "NBA Accreditation",
      description: "6 branches accredited, ensuring high-quality technical education.",
    },
];

export default function AchievementsSection() {
    return (
        <section id="achievements" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-12">
              <Trophy className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">Our Achievements</h2>
            </div>
            <div className="mx-auto grid justify-center gap-8 lg:grid-cols-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="group relative flex items-start gap-6 rounded-lg p-6 transition-all duration-300 hover:bg-card/50">
                    <div className="absolute -inset-px rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-primary"></div>
                    <div className="relative flex-shrink-0 rounded-full bg-primary/10 p-4">
                      {achievement.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{achievement.title}</h3>
                        <p className="text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
}
