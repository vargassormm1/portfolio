import { Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Socials from "@/components/Socials/Socials";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Ralph Vargas Sormillon",
  description: "Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>
        <div className="container">
          <Navbar />
          <Socials />
          {children}
        </div>
      </body>
    </html>
  );
}
