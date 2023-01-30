import "../styles/globals.css";
import { Inter as FontSans } from "@next/font/google";

import { cn } from "~/utils/cn";
import { ReactNode } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <title>ShadCN + RHF</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Next.js - shadcn/ui - RHF" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50",
          fontSans.variable
        )}
      >
        <div className="flex min-h-screen flex-col">
          <div className="container px-4 flex-1 mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
