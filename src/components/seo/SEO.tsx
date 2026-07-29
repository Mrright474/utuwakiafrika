import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

const SITE = "https://utuwakiafrika.lovable.app";
const DEFAULT_IMAGE = `${SITE}/lovable-uploads/688ac280-0ee5-48ac-8a44-82ad202140e7.png`;

const SEO = ({ title, description, path, type = "website", image, jsonLd, noindex = false }: SEOProps) => {
  const url = `${SITE}${path}`;
  const img = image ? (image.startsWith("http") ? image : `${SITE}${image}`) : DEFAULT_IMAGE;
  const ld = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
