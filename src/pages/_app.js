import { useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { UserContextProvider } from "../context/UserContext";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("295744985240338"); // facebookPixelId
        ReactPixel.pageView();
        ReactPixel.track("Quiz do Desafio");

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

  return (
    <UserContextProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          <Header />
          <Component {...pageProps} />
          <ToastContainer />
        </div>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default MyApp;

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24 * 7, //1 week
  };
};
