import React, { FC } from "react";
import type { Metadata } from "next";
import PageSignUp from "@/modules/auth/signup";

export const metadata: Metadata = {
  title: "Create Account | WorldReader - Your Digital Reading Companion",
  description:
    "Join WorldReader today and get access to thousands of books, personalized recommendations, and a digital library that grows with you. Start your reading journey now.",
  keywords: [
    "WorldReader signup",
    "create account",
    "digital library",
    "ebook platform",
    "online reading",
    "free trial",
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Create Your WorldReader Account - Digital Reading Platform",
    description:
      "Join WorldReader today and get access to thousands of books and personalized recommendations. Start your reading journey now.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Signup - Digital Reading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your WorldReader Account - Digital Reading Platform",
    description:
      "Join WorldReader and start your digital reading journey today.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/signup",
  },
};

export default function SignUp() {
  return <PageSignUp />;
}
