import img1 from "@/images/collections/1.png";
import img2 from "@/images/collections/5.png";
import img3 from "@/images/collections/4.png";
import img4 from "@/images/collections/3.png";
import { CardCategory3Props } from "./CardCategory3";

export const CATS_DISCOVER: CardCategory3Props[] = [
  {
    name: "New Releases",
    desc: "Discover the latest <br /> must-read books",
    featuredImage: img1,
    color: "bg-yellow-50",
  },
  {
    name: "Gift a Book",
    desc: "Perfect books to <br /> share and surprise",
    featuredImage: img2,
    color: "bg-red-50",
  },
  {
    name: "Deals & Discounts",
    desc: "Save up to <br /> 80% on select titles",
    featuredImage: img3,
    color: "bg-blue-50",
  },
  {
    name: "Top Picks",
    desc: "Editor’s choice <br /> and bestsellers",
    featuredImage: img4,
    color: "bg-green-50",
  },
];
