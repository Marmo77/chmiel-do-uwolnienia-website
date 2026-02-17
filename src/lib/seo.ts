import metadata from "../data/metadata.json";

/**
 * Get structured data for Restaurant schema (JSON-LD)
 */
export const getRestaurantStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: metadata.business.legalName,
    image: `${metadata.site.url}/logo-full.png`,
    "@id": metadata.site.url,
    url: metadata.site.url,
    telephone: metadata.contact.phone,
    email: metadata.contact.email,
    priceRange: metadata.business.priceRange,
    servesCuisine: metadata.business.servesCuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: metadata.contact.address.street,
      addressLocality: metadata.contact.address.city,
      addressRegion: metadata.contact.address.region,
      postalCode: metadata.contact.address.postalCode,
      addressCountry: metadata.contact.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: metadata.contact.address.latitude,
      longitude: metadata.contact.address.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: null,
        closes: null,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "14:00",
        closes: "22:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "13:00",
        closes: "00:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "13:00",
        closes: "22:00",
      },
    ],
    acceptsReservations: "True",
    paymentAccepted: metadata.business.paymentAccepted,
    sameAs: [metadata.social.facebook, metadata.social.instagram],
    hasMenu: metadata.menu.menuUrl,
    aggregateRating: metadata.structuredData.aggregateRating,
  };
};

/**
 * Get FAQ structured data (JSON-LD)
 */
export const getFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: metadata.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

/**
 * Get LocalBusiness structured data (JSON-LD)
 */
export const getLocalBusinessStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": metadata.site.url,
    name: metadata.business.legalName,
    image: `${metadata.site.url}/logo-full.png`,
    description: metadata.site.description,
    url: metadata.site.url,
    telephone: metadata.contact.phone,
    email: metadata.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: metadata.contact.address.street,
      addressLocality: metadata.contact.address.city,
      addressRegion: metadata.contact.address.region,
      postalCode: metadata.contact.address.postalCode,
      addressCountry: metadata.contact.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: metadata.contact.address.latitude,
      longitude: metadata.contact.address.longitude,
    },
    areaServed: metadata.localBusiness.areaServed,
    knowsAbout: metadata.localBusiness.knowsAbout,
  };
};

/**
 * Get default SEO metadata
 */
export const getDefaultSEO = () => {
  return {
    title: metadata.seo.title,
    description: metadata.seo.description,
    keywords: metadata.seo.keywords.join(", "),
    canonical: metadata.seo.canonical,
    openGraph: {
      type: metadata.openGraph.type,
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      url: metadata.openGraph.url,
      siteName: metadata.openGraph.siteName,
      locale: metadata.openGraph.locale,
      images: metadata.openGraph.images,
    },
    twitter: {
      card: metadata.twitter.card,
      site: metadata.twitter.site,
      title: metadata.twitter.title,
      description: metadata.twitter.description,
      image: metadata.twitter.image,
      imageAlt: metadata.twitter.imageAlt,
    },
  };
};

/**
 * Generate page-specific SEO data
 */
export const getPageSEO = (
  title?: string,
  description?: string,
  path?: string,
) => {
  const defaultSEO = getDefaultSEO();
  const pageTitle = title
    ? `${title} | ${metadata.site.name}`
    : defaultSEO.title;
  const pageDescription = description || defaultSEO.description;
  const pageUrl = path ? `${metadata.site.url}${path}` : metadata.site.url;

  return {
    title: pageTitle,
    description: pageDescription,
    canonical: pageUrl,
    openGraph: {
      ...defaultSEO.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
    },
    twitter: {
      ...defaultSEO.twitter,
      title: pageTitle,
      description: pageDescription,
    },
  };
};
