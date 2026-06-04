import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import FeaturedCollection from "./components/FeaturedCollection";
import Story from "./components/Story";
import Spotlight from "./components/Spotlight";
import Ritual from "./components/Ritual";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <FeaturedCollection />
        <Story />
        <Spotlight />
        <Ritual />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
