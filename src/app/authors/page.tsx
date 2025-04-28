import AuthorsPage from "@/modules/author";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors | WorldReader",
  description: "Discover authors and their works on WorldReader",
};

export default function Authors() {
  return <AuthorsPage/>;
}
