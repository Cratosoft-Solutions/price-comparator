import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ScrollToTopButton from "@components/ScrollToTop";
import ProviderRedux from "./redux/provider/provider";
//import { usePathname } from "next/navigation";
import Terms from "@components/Terms";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "EncuéntraLo Fácil CR: Buscador de productos y servicios Costa Rica",
  description: "Explora EncuéntraLo Fácil CR, tu destino en línea en Costa Rica para descubrir y publicar una amplia variedad de bienes y servicios. Encuentra fácilmente autos, viviendas, productos y servicios.",
};

const RootLayout = ({ children }) => {
//  const pathname = usePathname();

  return (
    <html lang="en">

      <ProviderRedux>
        <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1295102561150808"
     crossorigin="anonymous"></script>
        </head>
        <body className="__variable_7dbc08 __variable_20951f">
          <Provider>
            <div className="site-background">
              <div />
            </div>
            <main className="app">
              {(1==1/*pathname != "/login" && pathname != "/register"*/) ? (
                <>
                  <Nav />
                  <div className="mt-[4rem]" />
                </>
              ) : null}
              {children}
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
