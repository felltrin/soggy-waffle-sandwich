import { Theme } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import { Provider } from "@/components/ui/provider";

function App() {
  return (
    <Provider>
      <Theme appearance="light">
        <NavBar />
        <Hero />
        <FeatureSection />
        <AboutUs />
        <Footer />
      </Theme>
    </Provider>
  );
}

export default App;
