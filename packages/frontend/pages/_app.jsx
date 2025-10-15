import React from 'react';
//= Packages
import Script from 'next/script';
import Head from 'next/head';
//= Common Styles
import '@/styles/modal-video.css';
import 'swiper/css/bundle';
import '@/styles/globals.css';
import useEventTracker from '@/hooks/useEventTracker';
import appData from "@/data/app-data";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  useEventTracker();

  return getLayout(
    <>
      <Head>
        <title>{appData.company.name}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet"/>
        <link rel="preload" href="/assets/logo/arlioz.svg" as="image" type="image/svg+xml"/>
      </Head>

      <Component {...pageProps} />

      <Script strategy="beforeInteractive" src="/assets/js/plugins.js"></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/TweenMax.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/charming.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/countdown.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/parallax.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/ScrollTrigger.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/splitting.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/isotope.pkgd.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/imgReveal/imagesloaded.pkgd.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/ScrollSmoother.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/showcase/assets/js/anime.min.js"
      ></Script>
      <Script strategy="lazyOnload" src="/assets/js/imgReveal/demo.js"></Script>
      <Script strategy="lazyOnload" src="/assets/js/scripts.js"></Script>
    </>
  );
}

export default App;
