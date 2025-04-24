import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: imageRightPng2,
    heading: "Meet the Minds Behind the Masterpieces",
    subHeading:
      "Discover the authors who shaped generations through their words 📖",
    btnText: "Browse Books",
    btnLink: "/books",
  },
  {
    image: imageRightPng3,
    heading: "Voices That Inspire Millions",
    subHeading:
      "From timeless classics to bold new stories — meet the creators ✨",
    btnText: "Explore Authors",
    btnLink: "/books",
  },
  {
    image: imageRightPng,
    heading: "Behind Every Great Book is a Great Author",
    subHeading: "Get to know the storytellers that made history 🔥",
    btnText: "Read Their Works",
    btnLink: "/books",
  },
];
