"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative h-full w-full">
        <div className="container mx-auto h-full px-6">
          <div className="flex h-full flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Text and CTA */}
            <div className="flex-1 text-center lg:text-left pt-20 lg:pt-0">
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 tracking-tight">
                Trust Without Compromise
              </h1>
              <p className="text-gray-300 text-xl lg:text-2xl mb-12 max-w-xl leading-relaxed">
                Your health journey begins with trust. Experience healthcare
                that puts you first.
              </p>
              <Link href="/dashboard" passHref>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-7 text-lg rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                  Launch App
                </Button>
              </Link>
            </div>

            {/* Right side - Doctor Image */}
            <div className="flex-1 relative h-[700px] w-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10 pointer-events-none"></div>
              <Image
                src="/doctor_img.png"
                alt="Trusted Healthcare Professional"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="drop-shadow-2xl scale-110 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-[30px] h-[50px] rounded-full border-2 border-gray-400 flex justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
