import { motion, AnimatePresence } from "motion/react";
import { X, Award, Briefcase, GraduationCap, ChevronRight, Languages, Settings, Linkedin } from "lucide-react";

interface StudioViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudioView({ isOpen, onClose }: StudioViewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 z-[200] bg-white overflow-y-auto no-scrollbar"
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed top-8 right-8 z-[210] w-12 h-12 bg-ink text-white flex items-center justify-center hover:scale-110 transition-transform cursor-none shadow-xl"
          >
            <X size={24} />
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] min-h-screen">
            {/* Left Column: Profile & Contact */}
            <aside className="bg-[#F7F7F7] p-12 md:p-24 flex flex-col justify-between border-r border-border">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted block mb-4">Bachiller en arquitectura </span>
                  <h2 className="text-6xl font-thin tracking-tighter font-serif italic mb-6">Lucero Mayta</h2>
                  <p className="text-sm text-muted text-justify leading-relaxed max-w-[300px]">
                    Arquitecta egresada con formación en Arquitectura y Urbanismo, complementada con experiencia académica internacional en Brasil. Me caracterizo por ser una profesional analítica, adaptable y comprometida con el trabajo colaborativo.

                    Tengo un fuerte interés en el diseño arquitectónico, el modelado 3D, la sostenibilidad y la gestión de proyectos, áreas en las que busco aportar soluciones innovadoras y funcionales. Disfruto desarrollar ideas creativas que optimicen los espacios y generen valor tanto estético como urbano.

                    Cuento con dominio de AutoCAD, Revit, SketchUp y Photoshop, herramientas que aplico para materializar propuestas con precisión, eficiencia y enfoque en la calidad del diseño.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted block mb-4">Contacto</span>
                  <div className="text-xs space-y-3 font-medium">
                    <p className="hover:text-muted cursor-none">lucerovictoriadelosangeles@gmail.com</p>
                    <a
                      href="https://wa.me/51987410909"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-muted cursor-none block transition-colors"
                    >
                      +(51) 987 410 909
                    </a>
                    <a
                      href="https://www.linkedin.com/in/lucero-mayta-969960345/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-muted cursor-none transition-colors"
                    >
                      <Linkedin size={12} />
                      <span>LinkedIn Profile</span>
                    </a>
                    <p className="hover:text-muted cursor-none">Lima, Perú</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                className="font-serif text-[120px] leading-none select-none -mb-12 -ml-12"
              >
                LCR
              </motion.div>
            </aside>

            {/* Right Column: CV & Accreditations */}
            <main className="p-12 md:p-24 space-y-24">
              {/* Experience */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <Briefcase size={18} className="text-muted" />
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Experiencia Profesional</h3>
                </div>
                <div className="space-y-12 max-w-2xl">
                  <div className="border-l-2 border-border pl-8 relative">
                    <div className="absolute w-3 h-3 bg-ink rounded-full -left-[7px] top-0" />
                    <span className="text-[10px] font-bold text-muted mb-2 block">2018 — Presente</span>
                    <h4 className="text-xl font-medium mb-1">Founder / Principal Architect</h4>
                    <p className="text-sm text-muted italic mb-4">Lucero Arquitectura Moderna</p>
                    <p className="text-xs leading-relaxed text-muted">Liderando proyectos residenciales y corporativos de alta gama, centrados en la sostenibilidad y el diseño minimalista.</p>
                  </div>
                  <div className="border-l-2 border-border pl-8 relative">
                    <div className="absolute w-3 h-3 bg-border rounded-full -left-[7px] top-0" />
                    <span className="text-[10px] font-bold text-muted mb-2 block">2014 — 2017</span>
                    <h4 className="text-xl font-medium mb-1">Senior Architect</h4>
                    <p className="text-sm text-muted italic mb-4">Herzog & de Meuron</p>
                    <p className="text-xs leading-relaxed text-muted">Colaboración en el desarrollo de proyectos culturales internacionales a gran escala.</p>
                  </div>
                </div>
              </section>
              {/* Experiencia Académica Relevante */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <GraduationCap size={18} className="text-muted" />
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Experiencia Académica Relevante</h3>
                </div>
                <div className="space-y-12 max-w-2xl">
                  <div className="border-l-2 border-border pl-8 relative">
                    <div className="absolute w-3 h-3 bg-ink rounded-full -left-[7px] top-0" />
                    <span className="text-[10px] font-bold text-muted mb-2 block">2021 — 2025</span>
                    <h4 className="text-xl font-medium mb-1">Proyectos universitarios</h4>
                    <p className="text-sm text-muted italic mb-4">Universidad Privada del Norte</p>
                    <ul className="text-xs leading-relaxed text-muted list-disc list-outside ml-4 space-y-2">
                      <li>Desarrollé propuestas arquitectónicas de vivienda social, equipamientos urbanos y espacios públicos.</li>
                      <li>Implementé criterios de sostenibilidad, confort ambiental y accesibilidad en el diseño.</li>
                      <li>Apliqué metodologías de análisis urbano y planificación territorial para la elaboración de diagnósticos.</li>
                    </ul>
                  </div>
                  <div className="border-l-2 border-border pl-8 relative">
                    <div className="absolute w-3 h-3 bg-border rounded-full -left-[7px] top-0" />
                    <span className="text-[10px] font-bold text-muted mb-2 block">2024</span>
                    <h4 className="text-xl font-medium mb-1">Intercambio académico</h4>
                    <p className="text-sm text-muted italic mb-4">Universidade do Estado do Rio de Janeiro</p>
                    <ul className="text-xs leading-relaxed text-muted list-disc list-outside ml-4 space-y-2">
                      <li>Participé en proyectos enfocados en arquitectura sostenible y gestión de proyectos.</li>
                      <li>Fortalecí mis habilidades de comunicación intercultural y trabajo en equipo (en portugués).</li>
                      <li>Me adapté exitosamente a un nuevo entorno académico y cultural, cumpliendo con metas de diseño colaborativo.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {/* Education */}
                <section>
                  <div className="flex items-center gap-4 mb-12">
                    <GraduationCap size={18} className="text-muted" />
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Educación</h3>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-bold mb-1 uppercase tracking-wider text-ink">Bachiller en Arquitectura y Urbanismo</h4>
                      <p className="text-xs text-muted">Universidad Privada del Norte/ 2025</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-1 uppercase tracking-wider text-ink">Intercambio académico internacional</h4>
                      <p className="text-xs text-muted">Universidade do Estado do Rio de Janeiro – Brasil/ 2024</p>
                      <p className="text-xs text-muted">Asignaturas cursadas: diseño arquitectónico, sostenibilidad y gestión de proyectos.</p>
                    </div>
                  </div>
                </section>

                {/* Accreditations */}
                <section>
                  <div className="flex items-center gap-4 mb-12">
                    <Award size={18} className="text-muted" />
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Acreditaciones & Certificaciones</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Modelador de proyectos arquitectónicos e interiores con SketchUp Pro", school: "Instituto Arqonio" },
                      { title: "Photoshop para Arquitectos", school: "Instituto Arqonio" },
                      { title: "Programa de Intercambio Académico Internacional 2024-2", school: "Universidade do Estado do Rio de Janeiro" },
                      { title: "Fundamentos de Modelado BIM con Revit", school: "CTIC UNI" },
                      { title: "Modelador BIM", school: "UPN" }
                    ].map((cert, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-border group hover:bg-ink hover:text-white transition-all cursor-none">
                        <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#F7F7F7] group-hover:bg-white/10">
                          <ChevronRight size={14} />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest leading-tight">{cert.title}</h4>
                          <p className="text-[9px] opacity-60 mt-1 uppercase tracking-tighter">{cert.school}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {/* Habilidades Técnicas */}
                <section>
                  <div className="flex items-center gap-4 mb-12">
                    <Settings size={18} className="text-muted" />
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Habilidades Técnicas</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { name: "AutoCAD", level: "Avanzado" },
                      { name: "Revit", level: "Intermedio" },
                      { name: "V-Ray", level: "Avanzado" },
                      { name: "Excel", level: "Básico" },
                      { name: "Photoshop", level: "Avanzado" },
                      { name: "Adobe InDesign", level: "Intermedio" },
                      { name: "SketchUp", level: "Avanzado" },
                      { name: "D5 Render", level: "Intermedio" },
                    ].map((skill) => (
                      <div key={skill.name} className="flex justify-between items-center border-b border-border/50 pb-2">
                        <span className="text-[11px] font-medium uppercase tracking-wider">{skill.name}</span>
                        <span className="text-[9px] text-muted uppercase tracking-[0.2em] font-bold">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Idiomas */}
                <section>
                  <div className="flex items-center gap-4 mb-12">
                    <Languages size={18} className="text-muted" />
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Idiomas</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      { lang: "Español", level: "Nativo" },
                      { lang: "Portugués", level: "Intermedio" },
                      { lang: "Inglés", level: "Básico" },
                    ].map((item) => (
                      <div key={item.lang} className="flex items-center justify-between border-l-2 border-ink/10 pl-4 py-1 hover:border-ink transition-colors">
                        <div>
                          <h4 className="text-sm font-medium">{item.lang}</h4>
                          <p className="text-[10px] text-muted uppercase tracking-widest mt-1 font-bold">{item.level}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
