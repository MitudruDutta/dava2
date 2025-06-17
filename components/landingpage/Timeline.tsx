'use client';

import React from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { motion } from 'framer-motion';
import { Rocket, BrainCircuit, Smartphone, BarChartBig, Building } from 'lucide-react'; // Lucide icons

const timelineItems = [
  {
    date: "Q2 2025",
    title: "Public Beta Release",
    description: "Open access to V4 with core features including Course Manager, Task Manager, and basic AI assistance.",
    icon: Rocket, // Using Lucide icon component
    isActive: true
  },
  {
    date: "Q3 2025",
    title: "Full AI Integration",
    description: "Enhanced AI capabilities for personalized study plans, task prioritization, and content summarization.",
    icon: BrainCircuit,
    isActive: false
  },
  {
    date: "Q4 2025",
    title: "Mobile Apps Launch",
    description: "Native mobile applications for iOS and Android with cross-platform synchronization.",
    icon: Smartphone,
    isActive: false
  },
  {
    date: "Q1 2026",
    title: "Learning Analytics",
    description: "Advanced analytics to track study patterns, identify knowledge gaps, and optimize learning strategies.",
    icon: BarChartBig,
    isActive: false
  },
  {
    date: "Q2 2026",
    title: "V4 Enterprise",
    description: "Institutional version with group collaboration features, instructor tools, and administrative controls.",
    icon: Building,
    isActive: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger animation for each item
    },
  },
};

const itemVariants = (isEven: boolean) => ({
  hidden: { opacity: 0, x: isEven ? -50 : 50 }, // Slide from left or right
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
});

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Project <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-gray-300/90 max-w-2xl mx-auto text-base md:text-lg">
            Our development timeline and upcoming milestones for the V4 productivity platform.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Vertical line - ensure it spans the full height of its container */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 ml-[11px] md:-ml-0.5 bg-gradient-to-b from-v4-purple via-v4-blue to-v4-purple/20 rounded-full"></div>

          {timelineItems.map((item, index) => {
            const IconComponent = item.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={cn(
                  "relative flex flex-col md:items-center mb-10 md:mb-12 last:mb-0", // Reduced bottom margin slightly
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
                variants={itemVariants(isEven)}
              >
                {/* Timeline node */}
                <div className={cn(
                  "absolute left-4 md:left-1/2 top-1 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center z-10",
                  "ml-[1px] md:-ml-[11px]" // Fine-tune positioning
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-black", // Ring to make it pop from the line
                    item.isActive ? "bg-v4-purple animate-pulse" : "bg-slate-700" // Changed inactive color
                  )}>
                    {item.isActive && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </div>

                <div className={cn(
                  "pl-12 md:pl-0 md:w-[calc(50%-1.5rem)]", // Calculated width to create space for the node
                  isEven ? "md:pr-6" : "md:pl-6"
                )}>
                  <motion.div
                     whileHover={{ y: -4, boxShadow: `0 8px 25px rgba(${item.isActive ? 'var(--v4-purple-rgb, 168, 85, 247)' : 'var(--v4-blue-rgb, 59, 130, 246)'}, 0.15)`}}
                     className="h-full" // Ensure motion div takes full height for consistent hover area
                  >
                    <Card className={cn(
                      "glass-card border-white/10 overflow-hidden h-full flex flex-col", // Ensure card takes full height
                      item.isActive ? "border-v4-purple/60 shadow-v4-purple/20 shadow-lg" : "hover:border-white/20"
                    )}>
                      <CardContent className="p-5 md:p-6 flex-grow"> {/* flex-grow for description */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "p-2 rounded-lg inline-flex items-center justify-center",
                            item.isActive ? "bg-v4-purple/20" : "bg-white/10"
                          )}>
                            <IconComponent className={cn("h-5 w-5", item.isActive ? "text-v4-purple" : "text-v4-blue/80")} />
                          </div>
                          <div className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold">
                            {item.date}
                          </div>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-1.5 text-white/95">{item.title}</h3>
                        <p className="text-gray-300/80 text-sm leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-v4-purple/5 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-v4-blue/5 rounded-full filter blur-3xl animate-pulse [animation-delay:'1.5s'] pointer-events-none"></div>
    </section>
  );
};

export default Timeline;