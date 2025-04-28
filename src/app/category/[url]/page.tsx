import CategoryProductPage from "@/modules/category-product";
import { getDetailCategoryProductByUrl } from "@/services/product.service";
import type { Metadata } from "next";

type Props = {
  params: { url: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category: any = await getDetailCategoryProductByUrl(params.url);

  if (!category) {
    return {
      title: "Category Not Found | WorldReader",
      description:
        "The requested book category could not be found on WorldReader.",
    };
  }

  const title = `${category.data.name} Books | WorldReader - Your Digital Reading Companion`;
  const description = `Explore our collection of ${category.data.name.toLowerCase()} books on WorldReader. Find the best digital books in ${category.name.toLowerCase()} category, from bestselling authors to new releases.`;

  return {
    title,
    description,
    keywords: [
      category.data.name,
      "digital books",
      "ebooks",
      "online reading",
      "WorldReader",
      "digital library",
      ...(category.data.keywords || []),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: category.data.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${category.data.name} Books - WorldReader Digital Reading Platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category.data.image || "/twitter-image.jpg"],
    },
    alternates: {
      canonical: `/category/${params.url}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CategoryProduct() {
  return <CategoryProductPage />;
}
