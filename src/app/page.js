import MainContent from "@/components/MainContent/MainContent";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <MainContent />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
