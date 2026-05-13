import type { BlogPost, CareGuide, Category, Collection, Founder, Product, Testimonial } from "../types";
import productsData from "../data/products.json";
import collectionsData from "../data/collections.json";
import categoriesData from "../data/categories.json";
import blogPostsData from "../data/blogPosts.json";
import careData from "../data/care.json";
import testimonialsData from "../data/testimonials.json";
import foundersData from "../data/founders.json";

export const products = productsData as Product[];
export const collections = collectionsData as Collection[];
export const categories = categoriesData as Category[];
export const blogPosts = blogPostsData as BlogPost[];
export const careGuides = careData as CareGuide[];
export const testimonials = testimonialsData as Testimonial[];
export const founders = foundersData as Founder[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

export function getProductsByCollection(slug: string): Product[] {
  const col = getCollectionBySlug(slug);
  if (!col) return [];
  return col.productSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p));
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categoriaSlug === slug);
}

export function formatPrice(mx: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(mx);
}

export function collectionLabel(slug: string) {
  const c = getCollectionBySlug(slug);
  return c?.nombre ?? slug;
}
