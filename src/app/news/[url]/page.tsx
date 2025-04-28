import BlogDetailPage from "@/modules/blog/detail";
import { getDetailPostByUrl } from "@/services/post.service";
import type { Metadata } from "next";

type Props = {
  params: { url: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getDetailPostByUrl(params.url);

  if (!post?.data) {
    return {
      title: "News Not Found",
      description: "The requested news article could not be found.",
    };
  }

  return {
    title: post.data.seo?.title || post.data.name,
    description:
      post.data.seo?.description ||
      post.data.description ||
      `Read ${post.data.name} on WorldReader`,
    openGraph: {
      title: post.data.seo?.title || post.data.name,
      description:
        post.data.seo?.description ||
        post.data.description ||
        `Read ${post.data.name} on WorldReader`,
      type: "article",
      publishedTime: post.data.createdAt,
      authors: [post.data.author],
      images: post.data.image?.length
        ? post.data.image.map((url: string) => ({ url }))
        : [{ url: post.data.thumbnail || "/og-image.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.seo?.title || post.data.name,
      description: post.data.seo?.description || post.data.description,
      images:
        post.data.image?.[0] || post.data.thumbnail || "/twitter-image.jpg",
    },
    alternates: {
      canonical: `/news/${params.url}`,
    },
  };
}

const BlogDetail = () => {
  return <BlogDetailPage />;
};

export default BlogDetail;
