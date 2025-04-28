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

  const title =
    product?.data.seo?.title || `${product?.data.name} | WorldReader`;
  const description =
    product?.data.seo?.description ||
    `Read ${product?.data.name}${
      product?.data.author ? ` by ${product?.data.author}` : ""
    } on WorldReader. ${product?.data.description || ""}`;

  return {
    title,
    description,
    keywords: [
      product?.data.name,
      product?.data.author,
      "ebook",
      "digital book",
      "online reading",
      "WorldReader",
      ...(product?.data.categories || []),
    ],
    openGraph: {
      title,
      description,
      type: "book",
      images: product?.data.image?.length
        ? product?.data.image.map((url: string) => ({
            url,
            width: 1200,
            height: 630,
            alt: product?.data.name,
          }))
        : [
            {
              url: product?.data.avatar || "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: product?.data.name,
            },
          ],
      authors: product?.data.author ? [product?.data.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images:
        product?.data.image?.[0] ||
        product?.data.avatar ||
        "/twitter-image.jpg",
    },
    alternates: {
      canonical: `/books/${params.url}`,
    },
    other: {
      "og:price:amount": product?.data.price?.toString(),
      "og:price:currency": "USD",
      "og:availability": product?.data.inStock ? "instock" : "outofstock",
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
