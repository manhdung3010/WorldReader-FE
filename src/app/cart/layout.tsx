import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | WorldReader - Your Digital Reading Companion",
  description:
    "Review and checkout your selected books from WorldReader. Complete your purchase securely with our trusted payment system. Start reading your new books today.",
  keywords: [
    "WorldReader cart",
    "shopping cart",
    "checkout",
    "digital books",
    "ebook purchase",
    "secure payment",
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Shopping Cart | WorldReader - Digital Reading Platform",
    description:
      "Review and checkout your selected books from WorldReader. Complete your purchase securely.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Shopping Cart - Digital Reading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart | WorldReader - Digital Reading Platform",
    description: "Review and checkout your selected books from WorldReader.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
