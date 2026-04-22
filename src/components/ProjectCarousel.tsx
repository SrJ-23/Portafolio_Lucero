import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { Project } from "../types";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectCarousel({ projects, onProjectClick }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="relative h-screen bg-white md:pl-[80px] flex overflow-hidden border-t border-border">
      {/* Main Image View */}
      <div className="flex-1 relative bg-[#F7F7F7] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={activeProject.mainImage} 
              alt={activeProject.name}
              className="w-full h-full object-cover filter contrast-[1.05] grayscale-[0.1]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Strip (Thumbnails) */}
        <div className="absolute bottom-8 left-8 right-8 flex gap-4 z-10 overflow-x-auto no-scrollbar pb-2">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-32 md:w-48 aspect-[16/10] overflow-hidden border transition-all duration-300 ${
                index === activeIndex ? "border-ink border-2" : "border-transparent"
              }`}
            >
              <div className="absolute top-0 left-0 bg-black text-white text-[8px] px-2 py-1 z-10 font-bold uppercase tracking-widest">
                0{index + 1}
              </div>
              <img 
                src={project.mainImage} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${index === activeIndex ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>

        {/* Floating Page Number */}
        <div className="absolute top-8 right-8 text-[120px] font-bold text-white/10 select-none uppercase tracking-tighter leading-none pointer-events-none">
          0{activeIndex + 1}
        </div>
      </div>

      {/* Info Sidebar */}
      <aside className="w-full md:w-[380px] bg-white border-l border-border p-12 flex flex-col justify-between">
        <div className="flex flex-col gap-12">
          <header className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
            <span className="text-muted italic font-serif">Trabajos / Works</span>
            <div className="flex gap-4">
              <button onClick={prevProject} className="hover:opacity-50 transition-opacity cursor-none"><ChevronLeft size={16} /></button>
              <button onClick={nextProject} className="hover:opacity-50 transition-opacity cursor-none"><ChevronRight size={16} /></button>
            </div>
          </header>

          <div className="mt-8">
            <motion.div
              key={`num-${activeProject.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.1, y: 0 }}
              className="font-serif text-8xl leading-none mb-4"
            >
              0{activeIndex + 1}
            </motion.div>
            
            <motion.h2 
              key={`title-${activeProject.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-light tracking-tighter leading-tight mb-6"
            >
              {activeProject.name}
            </motion.h2>
            
            <motion.p 
              key={`desc-${activeProject.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted leading-relaxed mb-8 max-w-[280px]"
            >
              {activeProject.description}
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4 mb-4">
            <div className="flex justify-between text-[9px] uppercase tracking-widest border-b border-border pb-3 text-muted font-bold">
              <span>Ubicación</span>
              <span className="text-ink">{activeProject.location}</span>
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest border-b border-border pb-3 text-muted font-bold">
              <span>Año</span>
              <span className="text-ink">{activeProject.year}</span>
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest border-b border-border pb-3 text-muted font-bold">
              <span>Categoría</span>
              <span className="text-ink">{activeProject.category}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ backgroundColor: "#000", color: "#fff" }}
            onClick={() => onProjectClick(activeProject)}
            className="w-full py-5 bg-ink text-white text-[9px] uppercase tracking-[0.3em] font-bold transition-all cursor-none"
          >
            Ver Detalles del Proyecto
          </motion.button>
        </div>
      </aside>
    </div>
  );
}
