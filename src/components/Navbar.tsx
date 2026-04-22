import { motion } from "motion/react";

interface NavbarProps {
  onLogoClick: () => void;
}

export function Navbar({ onLogoClick }: NavbarProps) {
  return (
    <motion.nav 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 left-0 h-full w-[80px] z-50 hidden md:flex flex-col justify-between items-center py-12 border-r border-border bg-white"
    >
      <div 
        onClick={onLogoClick}
        className="text-xl font-bold tracking-[0.2em] vertical-rl rotate-180 cursor-none hover:text-muted transition-colors select-none"
      >
        LUCERO
      </div>
      
      <div className="vertical-rl rotate-180 text-[9px] uppercase tracking-[0.4em] text-muted font-medium">
        Arquitectura Moderna
      </div>

      <div className="flex flex-col gap-8 items-center cursor-none">
        <div className="w-px h-16 bg-ink"></div>
        <div className="text-[10px] uppercase rotate-90 w-full whitespace-nowrap mb-4">Scroll</div>
      </div>
    </motion.nav>
  );
}
