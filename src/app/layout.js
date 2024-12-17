'use client'

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Moon, Sun } from "lucide-react"; // Import Lucide icons
import "./globals.css";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Add dark mode based on system preference on initial load
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');  // Apply dark mode if system prefers dark
    }
  }, []);

  // Toggle dark mode manually
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={darkMode ? 'dark' : ''}>
      <button 
          onClick={toggleDarkMode} 
          className="p-2 bg-primary text-primary-foreground rounded-md fixed bottom-4 right-4 z-50">
          {darkMode ? (
            <Sun className="w-6 h-6" /> // Sun icon when dark mode is active
          ) : (
            <Moon className="w-6 h-6" /> // Moon icon when light mode is active
          )}
        </button>
        {children}
      </body>
    </html>
  );
}
