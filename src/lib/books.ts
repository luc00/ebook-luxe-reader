import hollowCover from "@/assets/ebooks/hollow-vows.jpg.asset.json";
import hollowPdf from "@/assets/ebooks/hollow-vows.pdf.asset.json";
import ignoratoCover from "@/assets/ebooks/ignorato.jpeg.asset.json";
import ignoratoPdf from "@/assets/ebooks/ignorato.pdf.asset.json";
import teslaCover from "@/assets/ebooks/il-codice-tesla.jpg.asset.json";
import teslaPdf from "@/assets/ebooks/il-codice-tesla.pdf.asset.json";
import cuoreCover from "@/assets/ebooks/il-cuore-giovane.jpg.asset.json";
import cuorePdf from "@/assets/ebooks/il-cuore-giovane.pdf.asset.json";
import ederaCover from "@/assets/ebooks/la-lettera-sotto-ledera.jpg.asset.json";
import ederaPdf from "@/assets/ebooks/la-lettera-sotto-ledera.pdf.asset.json";
import scommessaCover from "@/assets/ebooks/la-scommessa-cover.jpg";
import scommessaPdf from "@/assets/ebooks/la-scommessa.pdf.asset.json";
import maltaCover from "@/assets/ebooks/la-torre-di-malta-cover.jpg";
import maltaPdf from "@/assets/ebooks/la-torre-di-malta.pdf.asset.json";
import manualeCover from "@/assets/ebooks/manuale-manipolazione-mentale.jpg.asset.json";
import manualePdf from "@/assets/ebooks/manuale-manipolazione-mentale.pdf.asset.json";
import padreCover from "@/assets/ebooks/padre-di-due-mondi-cover.jpg";
import padrePdf from "@/assets/ebooks/padre-di-due-mondi.pdf.asset.json";
import skyCover from "@/assets/ebooks/what-the-sky-couldnt-hold.jpg.asset.json";
import skyPdf from "@/assets/ebooks/what-the-sky-couldnt-hold.pdf.asset.json";

export type Book = {
  slug: string;
  title: string;
  author: string;
  cover: string;
  pdf: string;
  category: "Narrativa" | "Saggistica";
  language: "Italiano" | "English";
};

export const books: Book[] = [
  { slug: "padre-di-due-mondi", title: "Padre di due mondi", author: "Rino Tuzzanti", cover: padreCover, pdf: padrePdf.url, category: "Narrativa", language: "Italiano" },
  { slug: "la-scommessa", title: "La scommessa: I rampolli della Burberry Prep – Volume 1", author: "C.M. Stunich", cover: scommessaCover, pdf: scommessaPdf.url, category: "Narrativa", language: "Italiano" },
  { slug: "la-torre-di-malta", title: "La Torre di Malta: Catturata: Vol. 1", author: "Josie Litton", cover: maltaCover, pdf: maltaPdf.url, category: "Narrativa", language: "Italiano" },
  { slug: "il-cuore-giovane", title: "Il cuore giovane", author: "Rino Pistellato", cover: cuoreCover.url, pdf: cuorePdf.url, category: "Narrativa", language: "Italiano" },
  { slug: "what-the-sky-couldnt-hold", title: "What the Sky Couldn’t Hold", author: "Nico Featherwick", cover: skyCover.url, pdf: skyPdf.url, category: "Narrativa", language: "English" },
  { slug: "manuale-manipolazione-mentale", title: "Il Manuale di Manipolazione Mentale", author: "Zac Adams", cover: manualeCover.url, pdf: manualePdf.url, category: "Saggistica", language: "Italiano" },
  { slug: "ignorato", title: "IGNORATO", author: "Al Danks", cover: ignoratoCover.url, pdf: ignoratoPdf.url, category: "Narrativa", language: "Italiano" },
  { slug: "la-lettera-sotto-ledera", title: "La Lettera sotto L’Edera", author: "Nerissa Bellrose", cover: ederaCover.url, pdf: ederaPdf.url, category: "Narrativa", language: "Italiano" },
  { slug: "hollow-vows", title: "Hollow Vows (The Hemlock Court, #1)", author: "Sabine Marlowe", cover: hollowCover.url, pdf: hollowPdf.url, category: "Narrativa", language: "English" },
  { slug: "il-codice-tesla", title: "Il codice Tesla: Codex Secolarium vol 1", author: "Alessandro Falzani", cover: teslaCover.url, pdf: teslaPdf.url, category: "Narrativa", language: "Italiano" },
];