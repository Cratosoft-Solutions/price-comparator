"use client";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ScrollToTopButton from "@components/ScrollToTop";
import ProviderRedux from "./redux/provider/provider";
import { usePathname } from "next/navigation";
import Terms from "@components/Terms";
import { Analytics } from '@vercel/analytics/react';

export const medatada = {
  title: "Cratosoft Comparador de Precios",
  description: "Compara precios entre productos y servicios de Costa Rica",
};

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <html lang="en">

      <ProviderRedux>
        <body className="__variable_7dbc08 __variable_20951f">
          <Provider>
            <div className="site-background">
              <div />
            </div>
            <main className="app">
              {(pathname != "/login" && pathname != "/register") ? (
                <>
                  <Nav />
                  <div className="mt-[4rem]" />
                </>
              ) : null}
              {children}
              <Analytics />
              <ScrollToTopButton />
              {pathname != "/termsandconditions"?<Terms/>:null}
            </main>
          </Provider>
        </body>
      </ProviderRedux>
    </html>
  );
};

export default RootLayout;
