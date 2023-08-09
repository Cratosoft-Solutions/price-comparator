import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ScrollToTopButton from "@components/ScrollToTop";

export const medatada = {
  title: "Cratosoft Comparador de Precios",
  description: "Compara precios entre productos y servicios de Costa Rica",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>

      </head>
      <body className="__variable_7dbc08 __variable_20951f">
        <Provider>
          <div  className="site-background">
           <div />
          </div>
          <main className="app">
            <Nav />
            <div className="mt-[7rem]" />
               {children}
               <ScrollToTopButton/>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
