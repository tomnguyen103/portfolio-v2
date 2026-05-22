import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
