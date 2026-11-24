export const en = {
  siteName: "Casa Estudio Rafael Cauduro",
  shortName: "Casa Cauduro",
  monogram: "RC",
  nav: {
    casa: "House",
    obra: "Works",
    visita: "Visit",
    cartelera: "Exhibitions",
    tienda: "Shop",
    contacto: "Contact",
    biografia: "Biography",
  },
  footer: {
    terms: "Terms",
    privacy: "Privacy",
    support: "WhatsApp (support, not checkout)",
    instagram: "Instagram",
    facebook: "Facebook",
  },
  language: {
    es: "ES",
    en: "EN",
    switchTo: "Español",
  },
  home: {
    kicker: "Cuernavaca",
    title: "Casa Estudio Rafael Cauduro",
    lead: "A bilingual house-museum: photography, works, and prepaid visits. Editorial truth lives in git, not a CMS.",
    ctaVisita: "Book a visit",
    ctaObra: "See works",
  },
  obra: {
    title: "Works",
    intro:
      "Murals, large format, glass, drawing, giclées, and sculpture. Each piece is an MDX file in the repo.",
    categories: {
      murales: "Murals",
      "gran-formato": "Large format",
      vidrio: "Glass",
      dibujo: "Drawing",
      giclees: "Giclées",
      escultorico: "Sculpture",
    },
    inquire: "Inquire",
  },
  casa: {
    title: "Casa Cauduro",
    intro: "Rooms and spaces of the house-studio. Web images live in public/media/.",
  },
  visita: {
    title: "Guided visit",
    intro:
      "Prepaid slots on Cal.com. WhatsApp is day-of support, not the cash register.",
    embedMissing:
      "The Cal.com widget appears when NEXT_PUBLIC_CALCOM_EMBED_URL is set. Visit copy lives in content/pages/visita.en.mdx.",
    whatsapp: "WhatsApp support",
  },
  cartelera: {
    title: "Exhibitions",
    intro: "Shows and dates. One file per exhibition.",
  },
  tienda: {
    title: "Shop",
    intro:
      "A small catalog (giclées, books). Buy opens Stripe Checkout. Unique works are inquiry-only.",
    buy: "Buy",
    unavailable: "Unavailable",
    inquire: "Inquire",
    stripeMissing: "Stripe Checkout is not configured (STRIPE_SECRET_KEY).",
  },
  contacto: {
    title: "Contact",
    intro: "Mail goes to estudio@cauduro.com. Slow, human replies.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sent: "Message sent.",
    error: "Could not send. Write to estudio@cauduro.com.",
  },
  legal: {
    terms: "Terms",
    privacy: "Privacy",
  },
  common: {
    year: "Year",
    medium: "Medium",
    price: "Price",
    available: "Available",
    unavailable: "Unavailable",
  },
} as const;
