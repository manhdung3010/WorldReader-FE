import LoginForm from "@/modules/auth/login/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | WorldReader - Your Digital Reading Companion",
  description:
    "Sign in to your WorldReader account to access your digital library, reading progress, bookmarks, and personalized recommendations. Start your reading journey today.",
  keywords: [
    "WorldReader login",
    "digital library",
    "ebook platform",
    "online reading",
    "account access",
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Login to WorldReader - Your Digital Reading Companion",
    description:
      "Sign in to your WorldReader account to access your digital library and personalized recommendations.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Login - Digital Reading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to WorldReader - Digital Reading Platform",
    description:
      "Access your digital library and personalized reading recommendations.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/login",
  },
};

const PageLogin = () => {
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <LoginForm />
    </div>
  );
};

export default PageLogin;
