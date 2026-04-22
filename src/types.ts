export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  location: string;
  description: string;
  mainImage: string;
  images: string[];
  videoUrl?: string;
}
