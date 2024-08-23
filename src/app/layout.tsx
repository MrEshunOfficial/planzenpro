import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MainHeader from "@/components/ui/MainHeader";
import { ReduxProvider } from "@/components/ReduxProvider";

// Define the Inter font with subsets
const inter = Inter({ subsets: ["latin"] });

// Define the metadata object with type safety
export const metadata: Metadata = {
  title: "PlanZen",
  description: "Plan, Track, and Prosper",
};

// RootLayout component with typed props
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} dark:text-white text-black min-h-screen flex flex-col gap-2`}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <MainHeader />
            <main className="w-full h-[91dvh] flex items-center justify-center p-2">
              {children}
            </main>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
