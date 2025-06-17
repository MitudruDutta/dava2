'use client';

import React from 'react';
import { Github, Twitter, Mail, Send, ExternalLink } from "lucide-react"; // Added Send for mailing list
import Link from 'next/link'; // Import Link for Next.js navigation
import Image from 'next/image'; // For the logo, consistent with Navbar
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button } from "../../components/ui/button";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" }, // Assuming a future pricing section
      { label: "Changelog", href: "/changelog" }, // Assuming a future changelog page
      { label: "Roadmap", href: "#timeline" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" }, // Assuming future docs page
      { label: "API", href: "/developers/api" },
      { label: "Tutorials", href: "/blog/tutorials" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Kaushik2003/V4", icon: Github },
  { label: "Twitter", href: "#", icon: Twitter }, // Replace # with actual link
  { label: "Contact Us", href: "mailto:contact@v4.app", icon: Mail }, // Replace with actual email
];

const Footer = () => {
  return (
    <motion.footer
      className="bg-black py-16 md:py-20 border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Column 1: Logo and Description */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" passHref>
              <div className="flex items-center gap-2.5 mb-4 cursor-pointer group w-fit">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-v4-purple to-v4-blue flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image src="/logo.png" width={40} height={40} alt="V4 Logo" className="p-0.5" />
                </div>
                <span className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-v4-purple">V4</span>
              </div>
            </Link>
            <p className="text-gray-400/80 text-sm leading-relaxed mb-6 max-w-sm">
              AI-powered productivity platform for students. Manage courses, tasks, and study sessions intelligently.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label === "GitHub" || social.label === "Twitter" ? "_blank" : undefined}
                  rel={social.label === "GitHub" || social.label === "Twitter" ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-v4-purple p-2 rounded-full hover:bg-white/5 transition-all duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white/90 mb-4 md:mb-5 text-base">{section.title}</h3>
              <ul className="space-y-2.5 md:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} passHref>
                      <span className="text-gray-400/80 hover:text-v4-blue hover:underline underline-offset-4 decoration-v4-blue/50 transition-colors duration-200 text-sm cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400/70 text-xs sm:text-sm order-2 sm:order-1">
            © {new Date().getFullYear()} V4. All rights reserved. Designed & Developed with a dick.
          </p>
          <div className="order-1 sm:order-2">
            <Link href="#subscribe" passHref> {/* Placeholder href */}
              <Button
                variant="ghost"
                className="text-v4-blue hover:text-v4-blue hover:bg-v4-blue/10 text-sm px-3 py-1.5 group"
              >
                Join mailing list for updates
                <Send className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;