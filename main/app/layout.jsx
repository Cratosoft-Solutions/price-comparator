import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ScrollToTopButton from "@components/ScrollToTop";
import ProviderRedux from "./redux/provider/provider";
import Terms from "@components/Terms";
import { Analytics } from "@vercel/analytics/react";
import SiteFooter from "@components/SiteFooter";
import HomeNavWrapper from "@components/HomeNavWrapper";
import SiteMapWrapper from "@components/SiteMapWrapper";

export const metadata = {
  title: "EncuéntraLoFácilCR - Buscador de Productos y Servicios",
  description: "Explora EncuéntraLo Fácil CR, el sitio en Costa Rica para encontrar y publicar autos, viviendas, productos y servicios",
  openGraph: {
    images: "https://encuentralofacilcr.com/assets/images/default-social-media-image.png",
  }, 
};


const RootLayout = ({ children }) => {

  return (
    <html lang="en">

      <ProviderRedux>
        <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1295102561150808"
     crossOrigin="anonymous"></script>

<script src="https://sdk.onvopay.com/sdk.js"/>
        </head>
        <body className="__variable_7dbc08 __variable_20951f">
          <Provider>
            <main className="light  app relative">
                <>
                  <Nav />
                  <SiteMapWrapper/>
                </>
              <>
                {children}
                <HomeNavWrapper/>                 
              </>
              
              <SiteFooter/>
              <Analytics />
              <ScrollToTopButton />
              {/*pathname != "/termsandconditions"*/1==1?<Terms/>:null}
            </main>
          </Provider>
        </body>
      </ProviderRedux>
    </html>
  );
};

export default RootLayout;
