import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "AI Birthday Song",
  description: "Generate custom birthday lyrics",
};

const dairyMilkFont = localFont({
  src: "../fonts/DairyMilkFont.otf", // relative to this file
  variable: "--font-dairyMilk",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dairyMilkFont.variable}>
      <body>
        <div className="">
          <header className="w-full flex items-center justify-between px-4 py-1 bg-[#4B0082]">
            <img src="/Cadbury Logo.png" alt="Cadbury" className="h-8" />
            <img src="/2d logo.png" alt="#mybirthdaysong" className="w-40" />
            <button>
              <img src="/Hamburger.png" alt="Menu" className="h-5 md:h-8" />
            </button>
          </header>
          <main>{children}</main>
          {/* <footer className="py-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Birthday AI
          </footer> */}
        </div>
      </body>
    </html>
  );
}
