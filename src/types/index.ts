export type PurchaseMode = "whatsapp" | "cart";

export type ProductColor = {
  id: string;
  nombre: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  nombre: string;
  precio: number;
  descripcionCorta: string;
  descripcionLarga: string;
  materiales: string;
  cuidados: string;
  medidas: string;
  tallas: string[];
  colores: ProductColor[];
  imagenes: string[];
  coleccionSlug: string;
  categoriaSlug: string;
  etiquetas: string[];
  stockPorTalla: Record<string, number>;
  quoteDisenadora?: string;
  storyTitulo?: string;
  storyTexto?: string;
};

export type Collection = {
  id: string;
  slug: string;
  nombre: string;
  temporada: string;
  descripcion: string;
  manifiesto: string;
  heroImage: string;
  galeria: { src: string; caption?: string; productSlug?: string }[];
  productSlugs: string[];
  bts: { src: string; caption: string }[];
};

export type Category = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  heroImage: string;
  subcategorias?: { id: string; nombre: string }[];
};

export type BlogPost = {
  slug: string;
  titulo: string;
  extracto: string;
  categoria: string;
  autor: string;
  fecha: string;
  tiempoLectura: string;
  imagen: string;
  destacado?: boolean;
  contenido: {
    type: "p" | "h2" | "h3" | "quote" | "ul" | "img";
    text?: string;
    items?: string[];
    src?: string;
    caption?: string;
    id?: string;
  }[];
  bioAutora?: string;
};

export type CareGuide = {
  id: string;
  slug: string;
  titulo: string;
  extracto: string;
  imagen: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  nombre: string;
  ciudad: string;
  estrellas: number;
};

export type Founder = {
  id: string;
  nombre: string;
  rol: string;
  bio: string;
  imagen: string;
};
