import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ScrollToTopButton from "@components/ScrollToTop";
import ProviderRedux from "./redux/provider/provider";
import Terms from "@components/Terms";
import { Analytics } from "@vercel/analytics/react";
import SiteFooter from "@components/SiteFooter";
import HomeNavWrapper from "@components/HomeNavWrapper";

export const metadata = {
  title: "EncuéntraLo Fácil CR: Buscador de productos y servicios Costa Rica",
  description: "Explora EncuéntraLo Fácil CR, tu destino en línea en Costa Rica para descubrir y publicar una amplia variedad de bienes y servicios. Encuentra fácilmente autos, viviendas, productos y servicios.",
};

const RootLayout = ({ children }) => {

  return (
    <html lang="en">

      <ProviderRedux>
        <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1295102561150808"
     crossOrigin="anonymous"></script>
        </head>
        <body className="__variable_7dbc08 __variable_20951f">
          <Provider>
            <main className="app relative">
                <>
                  <Nav />
                  <div className="mt-[0.5rem]" />
                </>
              <div className="lg:mr-10 lg:ml-10 ">
                {children}
                <HomeNavWrapper/>
              </div>
              
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
