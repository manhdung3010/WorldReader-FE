import ProductDetailPage from "@/modules/book/detail";
import { getDetailProductByUrl } from "@/services/product.service";
import type { Metadata } from "next";

type Props = {
  params: { url: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: any = await getDetailProductByUrl(params.url);

  if (!product) return {};

  return {
    title: product.seo?.title || product.name,
    description:
      product.seo?.description || `Mua ${product.name} với giá ưu đãi.`,
    openGraph: {
      title: product.seo?.title || product.name,
      description:
        product.seo?.description || `Mua ${product.name} với giá ưu đãi.`,
      images: product.image?.length
        ? product.image.map((url: string) => ({ url }))
        : [{ url: product.avatar }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.seo?.description,
      images: [product.avatar],
    },
  };
}

export default function ProductDetail() {
  return <ProductDetailPage />;
}
