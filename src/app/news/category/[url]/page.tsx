import CategoryBlogDetailPage from "@/modules/blog/category";
import { getDetailCategoryPostByUrl } from "@/services/post.service";
import type { Metadata } from "next";

type Props = {
  params: { url: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category: any = await getDetailCategoryPostByUrl(params.url);

  if (!category) {
    return {
      title: "News Category Not Found | WorldReader",
      description:
        "The requested news category could not be found on WorldReader.",
    };
  }

  const title = `${category.data.name} News | WorldReader - Your Digital Reading Companion`;
  const description = `Stay updated with the latest ${category.data.name.toLowerCase()} news and articles on WorldReader. Discover insights, trends, and updates from the digital reading world.`;

  return {
    title,
    description,
    keywords: [
      category.data.name,
      "digital reading news",
      "ebook industry",
      "publishing news",
      "WorldReader",
      "reading trends",
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
          alt: `${category.data.name} News - WorldReader Digital Reading Platform`,
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
      canonical: `/news/category/${params.url}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const CategoryBlogDetail = () => {
  return <CategoryBlogDetailPage />;
};

export default CategoryBlogDetail;
