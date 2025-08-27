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
          <main>{children}</main>
          {/* <footer className="py-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Birthday AI
          </footer> */}
        </div>
      </body>
    </html>
  );
}
