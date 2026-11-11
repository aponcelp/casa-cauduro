export const es = {
  siteName: "Casa Estudio Rafael Cauduro",
  shortName: "Casa Cauduro",
  monogram: "RC",
  nav: {
    casa: "Casa",
    obra: "Obra",
    visita: "Visita",
    cartelera: "Cartelera",
    tienda: "Tienda",
    contacto: "Contacto",
    biografia: "Biografía",
  },
  footer: {
    terms: "Términos",
    privacy: "Privacidad",
    support: "WhatsApp (apoyo, no caja)",
    instagram: "Instagram",
    facebook: "Facebook",
  },
  language: {
    es: "ES",
    en: "EN",
    switchTo: "English",
  },
  home: {
    kicker: "Cuernavaca",
    title: "Casa Estudio Rafael Cauduro",
    lead: "Casa-museo bilingüe: fotografía, obra y visitas prepagadas. El archivo editorial vive en git, no en un CMS.",
    ctaVisita: "Reservar visita",
    ctaObra: "Ver obra",
  },
  obra: {
    title: "Obra",
    intro:
      "Murales, gran formato, vidrio, dibujo, giclées y escultórico. Cada pieza es un archivo MDX en el repositorio.",
    categories: {
      murales: "Murales",
      "gran-formato": "Gran formato",
      vidrio: "Vidrio",
      dibujo: "Dibujo",
      giclees: "Giclées",
      escultorico: "Escultórico",
    },
    inquire: "Consultar disponibilidad",
  },
  casa: {
    title: "Casa Cauduro",
    intro: "Espacios de la casa-estudio. Las fotos web van en public/media/.",
  },
  visita: {
    title: "Visita guiada",
    intro:
      "Cupos prepagados en Cal.com. WhatsApp es apoyo el día de la visita, no la caja.",
    embedMissing:
      "El widget de Cal.com aparece cuando NEXT_PUBLIC_CALCOM_EMBED_URL está definido. Mientras tanto, el texto de la visita vive en content/pages/visita.mdx.",
    whatsapp: "Escribir por WhatsApp",
  },
  cartelera: {
    title: "Cartelera",
    intro: "Exposiciones y fechas. Un archivo por muestra.",
  },
  tienda: {
    title: "Tienda",
    intro:
      "Catálogo pequeño (giclées, libros). Comprar abre Stripe Checkout. Las obras únicas se consultan por correo o WhatsApp.",
    buy: "Comprar",
    unavailable: "No disponible",
    inquire: "Consultar",
    stripeMissing: "Stripe Checkout no está configurado (STRIPE_SECRET_KEY).",
  },
  contacto: {
    title: "Contacto",
    intro: "Mensajes a estudio@cauduro.com. Respuesta humana, no inmediata.",
    name: "Nombre",
    email: "Correo",
    message: "Mensaje",
    send: "Enviar",
    sent: "Mensaje enviado.",
    error: "No se pudo enviar. Escribe a estudio@cauduro.com.",
  },
  legal: {
    terms: "Términos",
    privacy: "Privacidad",
  },
  common: {
    year: "Año",
    medium: "Técnica",
    price: "Precio",
    available: "Disponible",
    unavailable: "No disponible",
  },
} as const;
