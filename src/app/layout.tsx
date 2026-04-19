import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STM Portal | DevOp Technologies",
  description: "Interactive portal for STM - News, Reports, and System Visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-devop-blue text-white py-4 shadow-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">STM Portal</h1>
            <p className="text-sm opacity-90">DevOp Technologies</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 DevOp Technologies. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
