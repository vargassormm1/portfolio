import { Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Socials from "@/components/Socials/Socials";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Ralph Vargas Sormillon - Software Developer",
  description:
    "Ralph Vargas Sormillon, a dedicated Software Developer from New Jersey, USA. Explore my portfolio to see how I blend technology and creativity to build smooth, responsive web and mobile experiences. From engaging web applications to dynamic websites, delve into my projects and find out how I develop scalable solutions to meet modern digital needs. Let's connect and transform ideas into reality.",
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
