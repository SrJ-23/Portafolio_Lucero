import { motion } from "motion/react";

interface HeroProps {
  onScrollClick: () => void;
}

export function Hero({ onScrollClick }: HeroProps) {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center bg-white overflow-hidden md:pl-[80px]">
      {/* Background large text */}
      <div className="absolute top-[15%] left-[20%] pointer-events-none z-0">
        <span className="text-[12vw] md:text-[18vw] font-bold text-black/[0.03] select-none uppercase tracking-tighter block leading-none">
          Lucero
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-start w-full px-8 md:px-24">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted mb-8"
        >
          Bienvenido / Welcome
        </motion.p>
        <div className="flex flex-col md:flex-row items-end gap-12">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="text-7xl md:text-[140px] font-thin leading-none tracking-tight italic font-serif"
          >
            Forma & <br />
            Entorno
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xs text-muted max-w-[200px] leading-relaxed mb-4"
          >
            Arquitectura contemporánea en armonía con el entorno, donde la forma y la función se integran de manera natural.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="absolute -right-24 bottom-24 w-1/2 h-[60%] z-0"
      >
        <img
          src="https://res.cloudinary.com/dce2ocsnr/image/upload/v1777233944/1.1_crkbu0.jpg"
          alt="Architectural Render"
          className="w-full h-full object-cover brightness-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 border-[24px] border-white" />
      </motion.div>

      <motion.button
        onClick={onScrollClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 flex items-center gap-12 group cursor-none"
      >
        <div className="flex flex-col items-end">
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-ink">Ver Obras</span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-muted">2022 — 2024</span>
        </div>
        <div className="w-16 h-px bg-ink group-hover:w-24 transition-all duration-500"></div>
      </motion.button>
    </section>
  );
}
