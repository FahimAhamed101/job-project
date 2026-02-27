import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Qtech Job Board",
  description: "Browse openings and submit applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-pattern text-slate-900">
          <Navigation />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}