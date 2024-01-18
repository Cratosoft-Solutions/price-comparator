import { DefaultSeo } from "next-seo";
const defaultSEOConfig = {
  title: "Encuentralofacil CR ",
  description: "Encuentralofacil CR donde puedes encontrar los productos mas populares como vehículos, terrenos, entre otros.",
  canonical: "https://www.encuentralofacilcr.com",
};
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />
      <Component {...pageProps} />
    </>
  );
}