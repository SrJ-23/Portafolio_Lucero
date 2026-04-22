import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { X, ArrowDown } from "lucide-react";

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-white overflow-y-auto no-scrollbar cursor-default"
      >
        <motion.button 
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-8 right-8 z-[110] w-12 h-12 bg-ink text-white flex items-center justify-center hover:scale-110 transition-transform cursor-none shadow-xl"
        >
          <X size={24} />
        </motion.button>

        {/* Hero Section */}
        <section className="h-screen w-full relative">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            src={project.mainImage} 
            alt={project.name}
            className="w-full h-full object-cover filter brightness-90 grayscale-[0.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute bottom-24 left-8 md:left-[160px] text-white">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-6xl md:text-[120px] font-thin tracking-tighter leading-none mb-6 font-serif italic"
            >
              {project.name}
            </motion.h2>
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.7 }}
               className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold opacity-80"
            >
              <span>{project.location}</span>
              <span>{project.year}</span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 right-8 md:right-24 text-white flex items-center gap-4 animate-bounce"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll para detalles</span>
            <ArrowDown size={16} />
          </motion.div>
        </section>

        {/* Editorial Content */}
        <section className="max-w-7xl mx-auto px-8 md:px-[160px] py-24 md:py-48">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start mb-32">
            <div className="sticky top-24">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted block mb-6">El Concepto / Concept</span>
              <p className="text-2xl md:text-5xl font-light leading-tight tracking-tighter">
                {project.description}
              </p>
            </div>
            <div className="space-y-24">
              {project.images.slice(0, 2).map((img, i) => (
                <div key={i} className="overflow-hidden bg-[#F7F7F7] border border-border">
                  <motion.img 
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    src={img} 
                    className="w-full h-auto aspect-[4/5] object-cover grayscale-[0.1]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          {project.videoUrl && (
            <div className="mb-32 aspect-video bg-black overflow-hidden flex items-center justify-center border border-border shadow-2xl">
               <iframe 
                width="100%" 
                height="100%" 
                src={project.videoUrl} 
                title={project.name} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {project.images.slice(2).map((img, i) => (
              <div key={i} className="overflow-hidden border border-border">
                <motion.img 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src={img} 
                  className="w-full h-[500px] object-cover grayscale-[0.05]"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          <footer className="mt-48 pt-24 border-t border-border flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted block mb-4 text-left">Siguiente Proyecto / Next</span>
              <h3 className="text-4xl md:text-7xl font-thin tracking-tighter hover:opacity-50 transition-opacity cursor-pointer italic font-serif">
                Museo Estrato
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="px-12 py-5 bg-ink text-white text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-zinc-800 transition-all cursor-none"
            >
              Cerrar Galería
            </button>
          </footer>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
