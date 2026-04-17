import { useState } from "react";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import CTA from "../components/home/Cta"
import About from '../components/home/About'

function Home() {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({ name: "Roshan" });
  };

  const logout = () => {
    setUser(null);
  };

 return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen selection:bg-blue-100">
      <Navbar />
      <main className="pt-24">
        <Hero />
        <Features />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default Home;