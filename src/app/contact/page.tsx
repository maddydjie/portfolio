import type { Metadata } from "next";
import { ContactBoard } from "@/components/contact/contact-board";

export const metadata: Metadata = {
  title: "Contact — BVS Madhavi",
  description:
    "Reach BVS Madhavi for clinical AI roles, research collaborations, and bedside systems work.",
};

export default function ContactPage() {
  return <ContactBoard />;
}
