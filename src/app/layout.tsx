import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

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
        <Sidebar />
        <div className="ml-64 transition-all duration-300">
          {/* Mobile header - hidden on desktop */}
          <header className="lg:hidden bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">STM</span>
                </div>
                <span className="font-semibold text-gray-900">Portal</span>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="p-6 lg:p-8">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="border-t border-gray-200 bg-white py-6 px-8">
            <div className="text-center text-sm text-gray-600">
              <p>&copy; 2026 DevOp Technologies. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
