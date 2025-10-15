import React, {useEffect} from 'react';
//= Packages
import Head from 'next/head';
//= Layout
import Layout from '@/layouts/default';
//= Components
import Loader from '@/components/Common/Loader';
import Header from '@/components/OnePage/Header';
import About from '@/components/OnePage/About';
import Marq from '@/components/OnePage/Marq';
import Services from '@/components/OnePage/Services';
import Portfolio from '@/components/Architecture/Portfolio';
import Contact from '@/components/OnePage/Contact';
import Footer from '@/components/OnePage/Footer';
import Navigation from '@/components/Showcases/Navigation';
import Menu from '@/components/Showcases/Menu';
import appData from '@/data/app-data';
import useMenu from '@/hooks/useMenu';
import Team from "@/components/OnePage/Team";

function HomeOnePageLight() {
  const { isOpen, toggle, close: closeDrawer } = useMenu(true, true)

  useEffect(() => {
    document.body.classList.add('sub-bg');
    return () => document.body.classList.remove('sub-bg');
  }, []);

  return (
    <>
      <Head>
        <title>{appData.website.name}</title>
      </Head>

      <Loader />
      <Navigation isOpen={isOpen} toggle={toggle} darkOnScroll />
      <Menu closeDrawer={closeDrawer} lightMode={false} />
      <main className="main-bg">
        <Header />
        <About />
        <Marq />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer lightMode />
    </>
  )
}

HomeOnePageLight.getLayout = page => <Layout lightMode>{page}</Layout>

export default HomeOnePageLight;
