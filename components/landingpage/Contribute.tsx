'use client';

import React from 'react';
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { motion } from 'framer-motion';
import Link from 'next/link';

// Import Lucide icons
import { Code2, BrainCircuit, Palette, FileText, Github, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import standard Card components

const contributionAreas = [
  {
    title: "Frontend Development",
    description: "Help build the UI and implement interactive features with modern web technologies.",
    skills: ["React", "TypeScript",  "Tailwind CSS", "Next.js"],
    icon: Code2,
    iconColor: "text-v4-purple",
  },
  {
    title: "AI Integration",
    description: "Contribute to our AI assistance features, NLP, and machine learning capabilities.",
    skills: ["Python", "NLP", "Machine Learning", "APIs"],
    icon: BrainCircuit,
    iconColor: "text-v4-blue",
  },
  {
    title: "UX/UI Design",
    description: "Design intuitive, accessible, and engaging user experiences for students.",
    skills: ["Figma", "User Research", "Prototyping"],
    icon: Palette,
    iconColor: "text-v4-purple/90", // Slightly different purple
  },
  {
    title: "Documentation & Guides",
    description: "Create clear guides, API documentation, and helpful user tutorials to empower users.",
    skills: ["Technical Writing", "Markdown", "Tutorials"],
    icon: FileText,
    iconColor: "text-v4-blue/90", // Slightly different blue
  }
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Contribute = () => {
  return (
    <section id="contribute" className="py-24 bg-gradient-to-b from-black to-v4-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Open Source <span className="text-gradient">Contribution</span>
          </h2>
          <p className="text-gray-300/90 max-w-2xl mx-auto text-base md:text-lg">
            V4 is an open source project. Join our community and help us build the future of student productivity.
          </p>
        </motion.div>

        {/* Card Grid for Contributions */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto" // 2 columns for lg as well for better content fit
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {contributionAreas.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(var(--v4-purple-rgb, 168, 85, 247), 0.1)" }}
                className="h-full" // Ensure motion div takes full height of grid cell
              >
                <Card className="glass-card border-white/10 hover:border-v4-purple/40 transition-all duration-300 h-full flex flex-col overflow-hidden rounded-xl">
                  <CardHeader className="pb-4 pt-6 px-6">
                    <div className={cn("mb-3 p-3 rounded-lg bg-white/10 inline-flex items-center justify-center ring-1 ring-white/5", `hover:bg-${item.iconColor.replace('text-','')}//20`)}>
                      <IconComponent className={cn("h-7 w-7", item.iconColor)} />
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-white/95">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 flex-grow flex flex-col justify-between">
                    <CardDescription className="text-gray-300/80 text-sm md:text-base leading-relaxed mb-4">
                      {item.description}
                    </CardDescription>
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-white/10">
                        {item.skills.map((skill) => (
                          <span key={skill} className="text-xs py-1 px-2.5 rounded-full bg-v4-purple/15 text-v4-purple/90 font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Existing "Ready to contribute?" section */}
        <motion.div
          className="glass-card max-w-3xl mx-auto rounded-2xl mt-16 md:mt-20 p-8 md:p-12 border border-white/10 hover:border-v4-purple/50 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white/95">Ready to contribute?</h3>
              <p className="text-gray-300/80">
                Check out our GitHub repository for issues, documentation, and contribution guidelines.
              </p>
            </div>
            <Link href="https://github.com/Kaushik2003/V4" target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
              <Button asChild className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold group flex items-center cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">
                <a> {/* Anchor tag for legacyBehavior */}
                  <Github className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  View on GitHub
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 md:w-96 md:h-96 bg-v4-purple/5 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-80 h-80 md:w-96 md:h-96 bg-v4-blue/5 rounded-full filter blur-3xl animate-pulse [animation-delay:'1s'] pointer-events-none"></div>
    </section>
  );
};

export default Contribute;