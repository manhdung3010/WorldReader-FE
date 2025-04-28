import BookCollection from "@/modules/book";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books Collection | WorldReader",
  description:
    "Explore our vast collection of digital books across various genres. Find your next favorite read on WorldReader.",
  openGraph: {
    title: "Books Collection | WorldReader",
    description:
      "Explore our vast collection of digital books across various genres. Find your next favorite read on WorldReader.",
    type: "website",
    images: [
      {
        url: "/images/hero-right1.png",
        width: 1200,
        height: 630,
        alt: "WorldReader Books Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Books Collection | WorldReader",
    description:
      "Explore our vast collection of digital books across various genres.",
    images: ["/images/hero-right1.png"],
  },
  alternates: {
    canonical: "/books",
  },
};

export default function BookPage() {
  return <BookCollection />;
}
