'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For future mobile menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For future mobile menu
  // const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 sm:px-6 md:px-16",
        isScrolled ? "bg-v4-dark/85 backdrop-blur-lg shadow-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-v4-purple to-v4-blue flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <Image src="/logo.png" width={40} height={40} alt="V4 Logo"/>
            </div>
            <span className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-v4-purple">DAVA</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-3"> {/* Reduced space slightly for padded items */}
          {[
            { href: "#features", label: "Features" },
            { href: "#timeline", label: "Timeline" },
            { href: "#contribute", label: "Contribute" },
            { href: "#about", label: "About" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "text-gray-300 rounded-md px-3 py-1.5 transition-all duration-200", // Base styling for padding and rounded corners
                "hover:text-v4-purple hover:bg-white/5 focus:bg-white/10 focus:text-v4-purple focus:outline-none" // New hover and focus effect
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button - Placeholder for future implementation */}
        {/* <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div> */}

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link href="/#early-access-signup" passHref>
            <Button className="bg-v4-purple hover:bg-v4-purple/80 text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-v4-purple/30">
              Request Early Access
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu - Placeholder for future implementation */}
      {/* {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-v4-dark/95 backdrop-blur-md shadow-lg py-4"
        >
          <nav className="flex flex-col items-center space-y-4">
            <a href="#features" className="text-gray-300 hover:text-v4-purple px-3 py-2 rounded-md hover:bg-white/5" onClick={toggleMobileMenu}>Features</a>
            <a href="#timeline" className="text-gray-300 hover:text-v4-purple px-3 py-2 rounded-md hover:bg-white/5" onClick={toggleMobileMenu}>Timeline</a>
            <a href="#contribute" className="text-gray-300 hover:text-v4-purple px-3 py-2 rounded-md hover:bg-white/5" onClick={toggleMobileMenu}>Contribute</a>
            <a href="#about" className="text-gray-300 hover:text-v4-purple px-3 py-2 rounded-md hover:bg-white/5" onClick={toggleMobileMenu}>About</a>
            <Link href="/#early-access-signup" passHref>
              <Button className="bg-v4-purple hover:bg-v4-purple/80 text-white w-full max-w-xs" onClick={toggleMobileMenu}>
                Request Early Access
              </Button>
            </Link>
          </nav>
        </motion.div>
      )} */}
    </header>
  );
};

export default Navbar;