export interface Review {
  author: string;
  timeAgo: string;
  text: string;
}

export type ServiceSlug =
  | 'instalaciones-fontaneria'
  | 'reparaciones-urgentes'
  | 'reparacion-fugas'
  | 'griferia'
  | 'termos-calentadores'
  | 'atascos-desagues';

export interface Service {
  slug: ServiceSlug;
  title: string;
  description: string;
}

export const business = {
  // Nombre exacto de la ficha de Google Maps (consistencia NAP para SEO local).
  name: 'Inst. Fontaneria Diego Mora',
  legalActivity:
    'Fontanero autónomo especializado en instalaciones y reparaciones de fontanería',
  telephone: '685 24 96 08',
  telephoneE164: '+34685249608',
  telephoneHref: 'tel:+34685249608',
  // Negocio de área de servicio: la ficha de Google Maps no muestra dirección
  // pública. TODO pendiente: confirmar localidad base con el cliente
  // (ver CLAUDE.md > Pendiente).
  address: {
    addressLocality: 'Sevilla',
    addressRegion: 'Sevilla',
    addressCountry: 'ES',
  },
  areaServed: 'Sevilla y provincia',
  priceRange: '$$',
  ratingValue: '5.0',
  reviewCount: '30',
  googleMapsUrl: 'https://maps.app.goo.gl/jmG5b1vB3vvroDNz5',
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '15:00',
    },
  ],
  openingHoursDisplay: [
    { label: 'Lunes a viernes', hours: '8:00–15:00' },
    { label: 'Sábado y domingo', hours: 'Cerrado' },
  ],
} as const;

// Reseñas reales extraídas de la ficha de Google Maps del negocio.
export const reviews: Review[] = [
  {
    author: 'Lucas Mora Cabiedes',
    timeAgo: 'hace 4 meses',
    text: 'Cuando detrás de un profesional hay años de experiencia, formalidad y profesionalidad, el resultado es el que todos buscamos cuando tenemos un problema. Muy recomendable y sin duda nuestro fontanero de referencia.',
  },
  {
    author: 'Javier Oejo Tendero',
    timeAgo: 'hace 7 meses',
    text: 'Llamé para pedirle cita por un problema con la lavadora. Me dijo que no tenía disponibilidad, pero me pidió unas fotos y en cuestión de 5 minutos me dijo el problema y la solución, sin pedir nada a cambio. Agradecido y desde luego le tengo como referencia para cualquier tipo de trabajo. Muchas gracias Diego por la ayuda y la solución.',
  },
  {
    author: 'Pedro Jose Nuñez Martin',
    timeAgo: 'hace 9 meses',
    text: 'Buen servicio, buena atención, muy profesional. Todo perfecto. Nos apuntamos el teléfono por si fuera necesaria su intervención más adelante.',
  },
];

export const services: Service[] = [
  {
    slug: 'instalaciones-fontaneria',
    title: 'Instalaciones de fontanería',
    description:
      'Realizo instalaciones de fontanería completas y parciales en viviendas de Sevilla y provincia: sustitución de tuberías, nuevas tomas de agua, instalación de sanitarios y conexión de electrodomésticos como lavadoras y lavavajillas. Estudio cada instalación antes de empezar y la dejo probada y funcionando antes de dar el trabajo por terminado, con materiales de calidad y un acabado limpio.',
  },
  {
    slug: 'reparaciones-urgentes',
    title: 'Reparaciones y averías del hogar',
    description:
      'Una avería de fontanería no espera, por eso priorizo las visitas urgentes y, siempre que puedo, te adelanto el diagnóstico por teléfono o con unas fotos para que sepas qué le pasa a tu instalación antes incluso de la visita. Reparo cisternas, válvulas, latiguillos, llaves de paso y cualquier avería del día a día, buscando siempre la solución que resuelve el origen del problema, no solo el síntoma.',
  },
  {
    slug: 'reparacion-fugas',
    title: 'Reparación de fugas de agua',
    description:
      'Localizo y reparo fugas de agua en tuberías, juntas y conexiones antes de que se conviertan en un problema mayor para tu vivienda: humedades, manchas en el techo o facturas de agua disparadas. Trabajo tanto en fugas visibles como en fugas más difíciles de localizar, buscando siempre solucionar el origen y no solo el síntoma. Servicio disponible en Sevilla y provincia.',
  },
  {
    slug: 'griferia',
    title: 'Instalación y reparación de grifería',
    description:
      'Instalo y reparo grifos de cocina, baño y lavadero, desde una simple sustitución de grifo hasta la resolución de goteos, presión baja o piezas desgastadas. Trabajo con cuidado para dejar la zona limpia y el grifo funcionando de forma silenciosa y sin fugas, comprobando la instalación antes de finalizar el servicio.',
  },
  {
    slug: 'termos-calentadores',
    title: 'Termos eléctricos y calentadores',
    description:
      'Instalo, reparo y sustituyo termos eléctricos y calentadores de todas las marcas y capacidades. Antes de recomendar un equipo valoro el espacio disponible, la instalación existente y el consumo real de agua caliente de tu casa, para que no pagues ni más ni menos de lo que necesitas. La instalación incluye conexiones, purgado y prueba de funcionamiento.',
  },
  {
    slug: 'atascos-desagues',
    title: 'Desatascos y desagües',
    description:
      'Soluciono atascos en fregaderos, lavabos, platos de ducha y bajantes de la vivienda, y reviso los desagües para que el problema no se repita a las pocas semanas. Si el atasco esconde un problema mayor en la instalación, te lo explico con claridad y te propongo la solución más razonable antes de tocar nada.',
  },
];
