// src/app/components/common/StructuredData.jsx
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    name: "Hare Krishna Marwar Mandir",
    alternateName: "Hare Krishna Marwar Mandir",
    url: "https://harekrishnamarwar.org",
    logo: "https://harekrishnamarwar.org/icons/hkmmLogo.svg",
    image: "https://harekrishnamarwar.org/og-image.jpg",
    description:
      "Hare Krishna Marwar Mandir is a Hare Krishna temple in Jodhpur, Rajasthan offering daily darshan, aartis, and spiritual programs.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chopasani, Near Vastra Mantralay",
      addressLocality: "Jodhpur",
      addressRegion: "Rajasthan",
      postalCode: "342024",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.273491,
      longitude: 72.928083,
    },
    telephone: "+919116139371",
    email: "nljd@hkmjodhpur.org",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "04:30",
        closes: "13:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "16:00",
        closes: "20:30",
      },
    ],
    sameAs: [
      "https://www.facebook.com/Harekrishnamarwar",
      "https://www.instagram.com/harekrishnamarwar/",
      "https://www.youtube.com/@HareKrishnaJodhpur",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}