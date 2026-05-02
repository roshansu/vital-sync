import { useState } from "react";
import Navbar from '../components/home/Navbar'
import HeroSection from '../components/home/Hero'
import FeaturesSection from '../components/home/Features'
import AboutSection from '../components/home/About'
import CTASection  from '../components/home/Cta'
import Footer  from '../components/home/Footer'
import { customStyles, colors } from "../constant/style";


function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <style>{customStyles}</style>
      <div
        style={{
          backgroundColor: colors.surface,
          color: colors.onSurface,
          minHeight: "100vh",
        }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main style={{ paddingTop: 96 }}>
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
