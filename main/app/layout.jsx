import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ScrollToTopButton from "@components/ScrollToTop";
import ProviderRedux from "./redux/provider/provider";
//import { usePathname } from "next/navigation";
import Terms from "@components/Terms";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Encuéntralo Fácil Costa Rica",
  description: "Descubre de manera sencilla y rápida una selección diversa de productos y servicios en EncuentraLoFácilCR. Desde autos hasta viviendas, abarrotes, artículos de segunda mano y una amplia variedad de servicios, nuestra plataforma te permite explorar y publicar lo que necesitas. Navega con facilidad, encuentra lo que buscas al alcance de un clic y, si lo deseas, publica tus propios productos y servicios. ¡Haz tus búsquedas más eficientes y experimenta la comodidad de EncuentraLoFácilCR!",
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
