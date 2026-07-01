export interface Review {
  author: string;
  timeAgo: string;
  text: string;
}

export type ServiceSlug =
  | 'instalacion-termos'
  | 'reparacion-termos'
  | 'sustitucion-urgente'
  | 'reparacion-fugas'
  | 'griferia'
  | 'fontaneria-general';

export interface Service {
  slug: ServiceSlug;
  title: string;
  description: string;
}

export const business = {
  name: 'Fontanero Termos Eléctricos Leonardo Ruiz',
  legalActivity:
    'Fontanero especializado en instalación y reparación de termos eléctricos',
  telephone: '651 91 25 07',
  telephoneE164: '+34651912507',
  telephoneHref: 'tel:+34651912507',
  address: {
    streetAddress: 'San Luis, Casco Antiguo',
    postalCode: '41003',
    addressLocality: 'Sevilla',
    addressRegion: 'Sevilla',
    addressCountry: 'ES',
  },
  areaServed: 'Sevilla',
  priceRange: '$$',
  ratingValue: '5.0',
  reviewCount: '45',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Fontanero+Termos+Electricos+Leonardo+Ruiz+San+Luis+Casco+Antiguo+Sevilla',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '20:00' },
    { days: ['Friday'], opens: '09:00', closes: '14:00' },
  ],
  openingHoursDisplay: [
    { label: 'Lunes a jueves', hours: '9:00–20:00' },
    { label: 'Viernes', hours: '9:00–14:00' },
    { label: 'Sábado y domingo', hours: 'Cerrado' },
  ],
} as const;

export const reviews: Review[] = [
  {
    author: 'cara biglang-awa',
    timeAgo: 'hace 1 mes',
    text: 'Instalación rápida y profesional. El grifo quedó perfecto y funcionando sin problemas. Muy recomendable.',
  },
  {
    author: 'Jesús Domínguez',
    timeAgo: 'hace 3 meses',
    text: 'Solo tengo palabras de agradecimiento a la labor de Leonardo. Rapidez, profesionalidad, responsabilidad y empatía. Solo un día después de contactar con él, tenía instalado el nuevo termo.',
  },
  {
    author: 'Ana Mª Gavira Muñoz',
    timeAgo: 'hace 9 meses',
    text: 'La experiencia con Leo ha sido maravillosa. Resolutivo, rápido, cuidadoso, trato inmejorable. Me ha solucionado en menos de una semana lo que otros no habían podido solucionar en dos meses.',
  },
];

export const services: Service[] = [
  {
    slug: 'instalacion-termos',
    title: 'Instalación de termos eléctricos',
    description:
      'Instalo termos eléctricos de todas las marcas y capacidades, adaptados al consumo real de tu vivienda en Sevilla. Antes de instalar, valoro el espacio, la instalación eléctrica existente y tus necesidades de agua caliente para recomendarte el equipo adecuado, ni más grande ni más pequeño de lo que necesitas. La instalación incluye conexiones de agua y electricidad, purgado y prueba de funcionamiento antes de darla por terminada, para que tengas agua caliente sin sorpresas desde el primer día.',
  },
  {
    slug: 'reparacion-termos',
    title: 'Reparación y mantenimiento de termos eléctricos',
    description:
      'Si tu termo eléctrico no calienta, gotea o hace ruidos extraños, reviso la resistencia, el termostato, el ánodo y las conexiones para encontrar la avería real, no solo el síntoma. Muchas averías se solucionan con una reparación sencilla sin necesidad de cambiar el equipo completo. También ofrezco mantenimiento preventivo periódico para alargar la vida útil de tu termo y evitar averías justo cuando más lo necesitas, típicamente en pleno invierno.',
  },
  {
    slug: 'sustitucion-urgente',
    title: 'Sustitución urgente de termos averiados',
    description:
      'Un termo que deja de funcionar es de las averías que menos pueden esperar, por eso priorizo estas visitas y suelo tener disponibilidad para instalaciones urgentes en Sevilla en cuestión de días, a veces el mismo día siguiente a tu llamada. Retiro el termo averiado, instalo el nuevo equipo y dejo la zona probada y funcionando, minimizando el tiempo que tu casa está sin agua caliente.',
  },
  {
    slug: 'reparacion-fugas',
    title: 'Reparación de fugas de agua',
    description:
      'Localizo y reparo fugas de agua en tuberías, juntas y conexiones antes de que se conviertan en un problema mayor para tu vivienda: humedades, manchas en el techo o facturas de agua disparadas. Trabajo tanto en fugas visibles como en fugas más difíciles de localizar, buscando siempre solucionar el origen y no solo el síntoma. Servicio disponible en Sevilla capital y alrededores.',
  },
  {
    slug: 'griferia',
    title: 'Instalación y reparación de grifería',
    description:
      'Instalo y reparo grifos de cocina, baño y lavadero, desde una simple sustitución de grifo hasta la resolución de goteos, presión baja o piezas desgastadas. Trabajo con cuidado para dejar la zona limpia y el grifo funcionando de forma silenciosa y sin fugas, comprobando la instalación antes de finalizar el servicio.',
  },
  {
    slug: 'fontaneria-general',
    title: 'Fontanería general para vivienda',
    description:
      'Además de termos eléctricos, atiendo revisiones y pequeñas averías de fontanería en el día a día de tu vivienda en Sevilla: atascos, cisternas, válvulas, pequeñas reparaciones de tuberías y todo lo que necesites resolver en casa sin tener que buscar un fontanero distinto para cada cosa.',
  },
];
