import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Workshop from "@/components/Workshop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Grid />
        <Workshop />
      </main>
      <Footer />
    </>
  );
}
