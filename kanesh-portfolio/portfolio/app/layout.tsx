import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { ReadyProvider } from "@/components/providers/ReadyProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Loader } from "@/components/ui/Loader";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.siteDescription,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "AI portfolio",
    "machine learning",
    "computer vision",
    "RAG",
    "robotics",
    "embedded systems",
    "UTM",
    "Malaysia",
    profile.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    title,
    description: profile.siteDescription,
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

/** Runs before paint so the saved (or system) theme applies without a flash. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JavaScript, show all content and hide the loading screen. */}
        <noscript>
          <style>{`#loader{display:none!important}[data-reveal],[data-split],[data-split] *{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bg"
        >
          Skip to content
        </a>
        <ReadyProvider>
          <Loader />
          <CustomCursor />
          {children}
        </ReadyProvider>
      </body>
    </html>
  );
}
