'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  // Add dark mode based on system preference on initial load
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');  // Apply dark mode class if system prefers dark mode
    } else {
      document.documentElement.classList.remove('dark');  // Remove dark mode class if system prefers light mode
    }
  }, []);

  // Function to toggle dark mode manually
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <button onClick={toggleDarkMode} className="p-2 bg-primary text-primary-foreground rounded-md">
          Toggle Dark Mode
        </button>
        {children}
      </body>
    </html>
  );
}
