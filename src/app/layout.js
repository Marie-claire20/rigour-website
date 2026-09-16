import "./globals.css";

export const metadata = {
  title: "Rigour Estate and Construction | Building Legacies",
  description:
    "Rigour Estate and Construction provides professional construction, estate development, renovation, remodeling, and property solutions.",
  keywords: [
    "Rigour Estate and Construction",
    "construction Cameroon",
    "estate development Cameroon",
    "building construction",
    "property solutions",
    "construction company",
  ],

  openGraph: {
    title: "Rigour Estate and Construction | Building Legacies",

    description: "Professional real estate and construction services in Cameroon.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
