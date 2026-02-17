import { Helmet } from "react-helmet-async";
import { getPageSEO } from "../../lib/seo";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  path,
  image,
}) => {
  const seo = getPageSEO(title, description, path);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.openGraph.type} />
      <meta property="og:url" content={seo.openGraph.url} />
      <meta property="og:title" content={seo.openGraph.title} />
      <meta property="og:description" content={seo.openGraph.description} />
      <meta property="og:site_name" content={seo.openGraph.siteName} />
      <meta property="og:locale" content={seo.openGraph.locale} />
      {(image || seo.openGraph.images[0]?.url) && (
        <>
          <meta
            property="og:image"
            content={image || seo.openGraph.images[0].url}
          />
          <meta
            property="og:image:width"
            content={seo.openGraph.images[0]?.width?.toString() || "1200"}
          />
          <meta
            property="og:image:height"
            content={seo.openGraph.images[0]?.height?.toString() || "630"}
          />
          <meta
            property="og:image:alt"
            content={seo.openGraph.images[0]?.alt || seo.title}
          />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitter.card} />
      <meta name="twitter:site" content={seo.twitter.site} />
      <meta name="twitter:title" content={seo.twitter.title} />
      <meta name="twitter:description" content={seo.twitter.description} />
      {(image || seo.twitter.image) && (
        <>
          <meta name="twitter:image" content={image || seo.twitter.image} />
          <meta
            name="twitter:image:alt"
            content={seo.twitter.imageAlt || seo.title}
          />
        </>
      )}
    </Helmet>
  );
};

export default SEOHead;
