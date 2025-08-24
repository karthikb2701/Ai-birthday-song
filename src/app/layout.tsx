import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Birthday Song",
  description: "Generate custom birthday lyrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="">
          {/* <header className="py-6 text-center">
            <h1 className="text-2xl font-bold">🎂 AI Birthday Song</h1>
          </header> */}
          <main>{children}</main>
          {/* <footer className="py-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Birthday AI
          </footer> */}
        </div>
      </body>
    </html>
  );
}
