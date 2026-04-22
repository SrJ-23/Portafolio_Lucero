/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProjectCarousel } from "./components/ProjectCarousel";
import { ProjectDetail } from "./components/ProjectDetail";
import { StudioView } from "./components/StudioView";
import { projects } from "./data/projects";
import { Project } from "./types";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const scrollToCarousel = () => {
    carouselRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject || isStudioOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject, isStudioOpen]);

  return (
    <main className="relative min-h-screen bg-white selection:bg-black selection:text-white cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-ink z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <Navbar onLogoClick={() => setIsStudioOpen(true)} />

      <section id="hero">
        <Hero onScrollClick={scrollToCarousel} />
      </section>

      <section ref={carouselRef} id="projects">
        <ProjectCarousel
          projects={projects}
          onProjectClick={(p) => setSelectedProject(p)}
        />
      </section>

      <ProjectDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <StudioView
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />

      <footer className="bg-white px-8 md:px-24 py-12 flex justify-between items-center border-t border-black/5">
        <div className="text-[10px] uppercase tracking-widest font-bold opacity-30">
          © 2026 Lucero Mayta
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold opacity-30">
          <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
          <a 
            href="https://www.linkedin.com/in/lucero-mayta-969960345/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}


