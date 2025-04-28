import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | WorldReader - Your Digital Reading Companion",
  description:
    "Complete your purchase securely on WorldReader. Choose your payment method and finalize your order. Get instant access to your new digital books.",
  keywords: [
    "WorldReader checkout",
    "secure payment",
    "digital books",
    "ebook purchase",
    "payment processing",
    "instant access",
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Checkout | WorldReader - Digital Reading Platform",
    description:
      "Complete your purchase securely on WorldReader. Choose your payment method and finalize your order.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Checkout - Digital Reading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout | WorldReader - Digital Reading Platform",
    description: "Complete your purchase securely on WorldReader.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
