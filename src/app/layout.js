import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://rigourestate.cm"),

  title: {
    default:
      "Rigour Estate and Construction | Real Estate & Construction in Cameroon",
    template: "%s | Rigour Estate and Construction",
  },

  description:
    "Rigour Estate and Construction provides professional construction, estate development, renovation, remodeling, architectural drawing, and property solutions in Cameroon, including Limbe and Buea.",

  keywords: [
    "Rigour Estate and Construction",
    "Rigour Estate",
    "Rigour Construction",
    "real estate Cameroon",
    "real estate Limbe",
    "real estate Buea",
    "construction company Cameroon",
    "construction company Limbe",
    "construction company Buea",
    "estate development Cameroon",
    "estate development Limbe",
    "estate development Buea",
    "building construction Cameroon",
    "building construction Limbe",
    "building construction Buea",
    "property solutions Cameroon",
    "property solutions Limbe",
    "property solutions Buea",
    "houses for sale Cameroon",
    "houses for sale Limbe",
    "houses for sale Buea",
    "land for sale Cameroon",
    "land for sale Limbe",
    "land for sale Buea",
    "property development Cameroon",
    "renovation Cameroon",
    "renovation Limbe",
    "renovation Buea",
    "remodeling Cameroon",
    "remodeling Limbe",
    "remodeling Buea",
  ],

  authors: [
    {
      name: "Rigour Estate and Construction",
    },
  ],

  creator: "Rigour Estate and Construction",

  publisher: "Rigour Estate and Construction",

  alternates: {
    canonical: "https://rigourestate.cm/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "Rigour Estate and Construction | Real Estate & Construction in Cameroon",

    description:
      "Professional construction, estate development, renovation, remodeling, and property solutions in Cameroon, including Limbe and Buea.",

    type: "website",

    locale: "en_CM",

    url: "https://rigourestate.cm/",

    siteName: "Rigour Estate and Construction",

    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Rigour Estate and Construction",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Rigour Estate and Construction | Real Estate & Construction in Cameroon",

    description:
      "Professional construction, estate development, renovation, remodeling, and property solutions in Cameroon.",

    images: ["/logo.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Business Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",

              name: "Rigour Estate and Construction",

              description:
                "Professional construction, estate development, renovation, remodeling, and property solutions in Cameroon, including Limbe and Buea.",

              url: "https://rigourestate.cm/",

              logo: "https://rigourestate.cm/logo.jpg",

              image: "https://rigourestate.cm/logo.jpg",

              telephone: "+237652410607",

              email: "rigourestateandconstruction@gmail.com",

              address: {
                "@type": "PostalAddress",
                addressLocality: "Limbe",
                addressRegion: "South-West Region",
                addressCountry: "CM",
              },

              areaServed: [
                {
                  "@type": "City",
                  name: "Limbe",
                },
                {
                  "@type": "City",
                  name: "Buea",
                },
                {
                  "@type": "Country",
                  name: "Cameroon",
                },
              ],

              serviceType: [
                "Real Estate",
                "Construction",
                "Estate Development",
                "Property Development",
                "Building Construction",
                "Renovation",
                "Remodeling",
                "Property Solutions",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}