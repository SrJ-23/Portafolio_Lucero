import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "casa-brisa",
    name: "Casa Brisa",
    category: "Residencial",
    year: "2023",
    location: "Malibu, California",
    description: "Una exploración de la transparencia y la luz natural. Casa Brisa se integra perfectamente con su entorno costero mediante el uso de grandes planos de vidrio y concreto blanco.",
    mainImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687940-47a04b62975e?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "museo-estrato",
    name: "Museo Estrato",
    category: "Cultural",
    year: "2024",
    location: "Bilbao, España",
    description: "Inspirado en las formaciones geológicas, el Museo Estrato utiliza concreto pigmentado para crear una estructura que parece emerger directamente de la tierra.",
    mainImage: "https://images.unsplash.com/photo-1518005020250-68a0443fb752?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "torre-prisma",
    name: "Torre Prisma",
    category: "Corporativo",
    year: "2022",
    location: "Ciudad de México, México",
    description: "Un hito de sostenibilidad en el corazón financiero. La Torre Prisma utiliza una fachada inteligente que optimiza la ganancia térmica mientras mantiene vistas panorámicas.",
    mainImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "galeria-lucero",
    name: "Galería Lucero",
    category: "Arte",
    year: "2023",
    location: "Oaxaca, México",
    description: "Ubicada en un edificio histórico restaurado, la galería combina muros de adobe tradicionales con intervenciones modernas de acero y vidrio.",
    mainImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1541829081735-83a589cc8227?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541829081735-83a589cc8227?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
