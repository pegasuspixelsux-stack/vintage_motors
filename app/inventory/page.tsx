import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InventoryBrowser from "@/components/InventoryBrowser";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vault Collection | Vintage Motors",
  description: "Browse every vintage automobile in the Vintage Motors vault with advanced search.",
};

export default function InventoryPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <InventoryBrowser />
      </main>
      <Footer />
    </>
  );
}
