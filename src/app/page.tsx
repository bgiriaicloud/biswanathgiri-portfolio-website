import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Recognition from "@/components/Recognition";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Speaking from "@/components/Speaking";
import PhotoLibrary from "@/components/PhotoLibrary";
import Certifications from "@/components/Certifications";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground scroll-smooth antialiased selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <Hero />
      <Recognition />
      <About />
      <Expertise />
      <Projects />
      <Speaking />
      <PhotoLibrary />
      <Certifications />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
