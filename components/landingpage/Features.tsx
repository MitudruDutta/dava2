'use client'; 

import React from 'react';
import { Calendar, Clock, BookOpen, Focus, BookMarked, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const features = [
  {
    icon: BookOpen,
    title: "Course Manager",
    description: "Organize all your course materials, tasks, notes, and resources in one place."
  },
  {
    icon: Calendar,
    title: "Planner",
    description: "Drag-and-drop weekly calendar for planning study sessions and exams."
  },
  {
    icon: Clock,
    title: "Focus Mode",
    description: "Pomodoro timer with background music and optional webcam for accountability."
  },
  {
    icon: BookMarked,
    title: "Notes & Flashcards",
    description: "Markdown-based editor with flashcard creation linked to your courses."
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Get help with summarizing notes, creating study plans, and breaking down assignments."
  },
  {
    icon: Focus, 
    title: "Task Manager",
    description: "Prioritize tasks with drag-and-drop interface and deadline tracking."
  }
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const Features = () => {
  return (
    <section id="features" className="py-20  md:py-28 bg-gradient-to-b from-v4-dark to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Supercharge Your <span className="text-gradient">Academic Success</span>
          </h2>
          <p className="text-gray-300/90 max-w-2xl mx-auto text-base md:text-lg">
            Designed specifically for students, V4 combines powerful productivity tools with AI to help you excel in your studies.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon; // Assign component to a capitalized variable
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(var(--v4-purple-rgb, 168, 85, 247), 0.1)"}} // Added v4-purple-rgb for shadow color
                className={cn(
                  "glass-card border-white/10 rounded-xl transition-all duration-300", // Ensure glass-card provides bg
                  "hover:border-v4-purple/50" // Existing hover border
                )}
              >
                <Card className="bg-transparent border-none h-full flex flex-col"> {/* Ensure card takes full height and is transparent */}
                  <CardHeader className="pb-3 pt-6 px-5 md:px-6"> {/* Adjusted padding */}
                    <div className="mb-3 md:mb-4 p-2.5 rounded-lg bg-white/10 inline-block ring-1 ring-white/5">
                      <IconComponent className="h-6 w-6 text-v4-purple" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-white/95">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 md:px-6 pb-6 flex-grow"> {/* Adjusted padding and flex-grow */}
                    <CardDescription className="text-gray-300/80 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Background elements - kept subtle */}
      <div className="absolute top-1/3 right-0 w-64 h-64 md:w-80 md:h-80 bg-v4-blue/5 rounded-full filter blur-3xl animate-pulse [animation-delay:'1s'] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 md:w-80 md:h-80 bg-v4-purple/5 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
    </section>
  );
};

export default Features;
