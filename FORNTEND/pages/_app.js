import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import AOS from "aos";
import 'aos/dist/aos.css'

export default function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleComplate = () => {
      setIsLoading(false);
    }

    setTimeout(handleComplate, 3000);

    return () => {
      clearTimeout(handleComplate);
    }

  }, [])

  useEffect(() => {

    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      offset: 100,
      delay: 0,
      duration: 900,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom'
    })
  }, [])

  return <>
    <Preloader isLoading={isLoading} />
    <Header />
    {!isLoading && (
      <main id="site-wrapper">
        <Component {...pageProps} />
      </main>
    )}
    <Footer />
  </>
}
