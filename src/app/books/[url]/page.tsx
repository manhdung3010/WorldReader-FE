import ProductDetailPage from "@/modules/book/detail";
import { getDetailProductByUrl } from "@/services/product.service";
import type { Metadata } from "next";

type Props = {
  params: { url: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: any = await getDetailProductByUrl(params.url);

  if (!product) {
    return {
      title: "Book Not Found | WorldReader",
      description: "The requested book could not be found on WorldReader.",
    };
  }

  const title = product.seo?.title || `${product.name} | WorldReader`;
  const description =
    product.seo?.description ||
    `Read ${product.name}${
      product.author ? ` by ${product.author}` : ""
    } on WorldReader. ${product.description || ""}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.author,
      "ebook",
      "digital book",
      "online reading",
      "WorldReader",
      ...(product.categories || []),
    ],
    openGraph: {
      title,
      description,
      type: "book",
      images: product.image?.length
        ? product.image.map((url: string) => ({
            url,
            width: 1200,
            height: 630,
            alt: product.name,
          }))
        : [
            {
              url: product.avatar || "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ],
      authors: product.author ? [product.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image?.[0] || product.avatar || "/twitter-image.jpg",
    },
    alternates: {
      canonical: `/books/${params.url}`,
    },
    other: {
      "og:price:amount": product.price?.toString(),
      "og:price:currency": "USD",
      "og:availability": product.inStock ? "instock" : "outofstock",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ProductDetail() {
  return <ProductDetailPage />;
}
