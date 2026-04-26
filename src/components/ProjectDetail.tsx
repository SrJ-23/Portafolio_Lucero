import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { X, ArrowDown, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

interface ProjectDetailProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  scale: number;
  translateX: number;
  translateY: number;
}

export function ProjectDetail({ project, projects, onClose, onNavigate }: ProjectDetailProps) {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastTranslate = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setLightbox({
      isOpen: true,
      currentIndex: index,
      scale: 1,
      translateX: 0,
      translateY: 0,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false, scale: 1, translateX: 0, translateY: 0 }));
  };

  const resetZoom = () => {
    setLightbox((prev) => ({ ...prev, scale: 1, translateX: 0, translateY: 0 }));
    lastTranslate.current = { x: 0, y: 0 };
  };

  const zoomIn = () => {
    setLightbox((prev) => {
      const newScale = Math.min(prev.scale + 0.5, 4);
      if (newScale === 1) {
        lastTranslate.current = { x: 0, y: 0 };
        return { ...prev, scale: newScale, translateX: 0, translateY: 0 };
      }
      return { ...prev, scale: newScale };
    });
  };

  const zoomOut = () => {
    setLightbox((prev) => {
      const newScale = Math.max(prev.scale - 0.5, 1);
      if (newScale === 1) {
        lastTranslate.current = { x: 0, y: 0 };
        return { ...prev, scale: newScale, translateX: 0, translateY: 0 };
      }
      return { ...prev, scale: newScale };
    });
  };

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (!project) return;
      const allImages = [project.mainImage, ...project.images];
      const total = allImages.length;
      resetZoom();
      setLightbox((prev) => ({
        ...prev,
        currentIndex: direction === "next" ? (prev.currentIndex + 1) % total : (prev.currentIndex - 1 + total) % total,
      }));
    },
    [project]
  );

  // Mouse drag for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (lightbox.scale <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - lastTranslate.current.x, y: e.clientY - lastTranslate.current.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || lightbox.scale <= 1) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    lastTranslate.current = { x: newX, y: newY };
    setLightbox((prev) => ({ ...prev, translateX: newX, translateY: newY }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.isOpen, navigateLightbox]);

  if (!project) return null;

  const allImages = [project.mainImage, ...project.images];

  // Compute next project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={containerRef}
        className="fixed inset-0 z-[100] bg-white overflow-y-auto no-scrollbar cursor-none"
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
            className="w-full h-full object-cover filter brightness-90 grayscale-[0.05] cursor-pointer"
            referrerPolicy="no-referrer"
            onClick={() => openLightbox(0)}
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

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
                <div
                  key={i}
                  className="overflow-hidden bg-[#F7F7F7] border border-border group relative cursor-pointer"
                  onClick={() => openLightbox(i + 1)}
                >
                  <motion.img
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    src={img}
                    className="w-full h-auto aspect-[4/5] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
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
              <div
                key={i}
                className="overflow-hidden border border-border group relative cursor-pointer"
                onClick={() => openLightbox(i + 3)}
              >
                <motion.img
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src={img}
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-48 pt-24 border-t border-border flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted block mb-4 text-left">Siguiente Proyecto / Next</span>
              <h3
                onClick={() => {
                  resetZoom();
                  onNavigate(nextProject);
                  if (containerRef.current) {
                    containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                className="text-4xl md:text-7xl font-thin tracking-tighter hover:opacity-50 transition-opacity cursor-pointer italic font-serif"
              >
                {nextProject.name}
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

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {lightbox.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              {/* Top Controls */}
              <div className="fixed top-6 right-6 z-[310] flex items-center gap-3">
                <span className="text-white/50 text-xs font-mono mr-2">
                  {lightbox.currentIndex + 1} / {allImages.length}
                </span>
                <button
                  onClick={zoomOut}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors rounded-sm"
                  title="Alejar"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  onClick={zoomIn}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors rounded-sm"
                  title="Acercar"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  onClick={resetZoom}
                  className="px-3 h-10 bg-white/10 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold flex items-center justify-center hover:bg-white/20 transition-colors rounded-sm"
                  title="Restablecer zoom"
                >
                  {Math.round(lightbox.scale * 100)}%
                </button>
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors rounded-sm"
                  title="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateLightbox("prev")}
                    className="fixed left-6 top-1/2 -translate-y-1/2 z-[310] w-12 h-12 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors rounded-sm"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => navigateLightbox("next")}
                    className="fixed right-6 top-1/2 -translate-y-1/2 z-[310] w-12 h-12 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors rounded-sm"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div
                ref={imageContainerRef}
                className="w-full h-full flex items-center justify-center overflow-hidden select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                style={{ cursor: lightbox.scale > 1 ? "grab" : "default" }}
              >
                {/* motion.div handles the fade-in; plain img handles zoom via style to avoid framer-motion transform conflicts */}
                <motion.div
                  key={lightbox.currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                  style={{
                    transform: `scale(${lightbox.scale}) translate(${lightbox.translateX / lightbox.scale}px, ${lightbox.translateY / lightbox.scale}px)`,
                    transition: isDragging.current ? "none" : "transform 0.2s ease-out",
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={allImages[lightbox.currentIndex]}
                    alt={`${project.name} - Image ${lightbox.currentIndex + 1}`}
                    className="max-w-[90vw] max-h-[85vh] object-contain pointer-events-none"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                </motion.div>
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[310] flex gap-2 p-2 bg-black/50 backdrop-blur-md rounded-sm">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        resetZoom();
                        setLightbox((prev) => ({ ...prev, currentIndex: i }));
                      }}
                      className={`w-14 h-14 overflow-hidden rounded-sm border-2 transition-all ${
                        i === lightbox.currentIndex ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
