import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="keywords" content="frontend, development, vue, react, angular"/>
        <meta name="description" content="Passionated software developer"/>
        <meta name="author" content="Amaury Lapaque"/>

        {/* ------ Images ------ */}
        <link rel='preload' href='/assets/images/portfolio/gallery/easyorderapp/hawaiian/1.png' as='image'/>
        <link rel='preload' href='/assets/images/portfolio/gallery/easyorderapp/marketplace/1.png' as='image'/>
        <link rel='preload' href='/assets/images/portfolio/gallery/messenger/1.png' as='image'/>
        <link rel='preload' href='/assets/images/portfolio/gallery/my-planning/1.png' as='image'/>
        <link rel='preload' href='/assets/images/portfolio/gallery/jk-studio/1.png' as='image'/>
        <link rel='preload' href='/assets/images/portfolio/gallery/tesla/1.png' as='image'/>
        <link rel='preload' href='/assets/images/confetti.gif' as='image'/>
        <link rel='preload' href='/assets/images/hero_1.jpg' as='image'/>
        <link rel='preload' href='/assets/images/hero_2.jpg' as='image'/>

        {/* ------ Favicon ------ */}
        <link rel="shortcut icon" href="/favicon.ico"/>

        {/* ------ Google Fonts ------ */}
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"/>
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"/>
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"/>
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"/>
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Epilogue:wght@100;200;300;400;500;600;700;800;900&display=swap"/>
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap"/>

        {/* ------ bootstrap icons cdn ------ */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"/>

        {/* ------ Plugins ------ */}
        <link rel="stylesheet" href="/dark/assets/css/plugins.css"/>

        {/* ------ Core Style Css ------ */}
        <link rel="stylesheet" href="/dark/assets/css/style.css"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}
