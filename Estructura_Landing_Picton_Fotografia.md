# Estructura de la Landing Page — First Look Photography (Picton & Blenheim)

Documento de trabajo para construir el sitio en Claude Code. Basado en el Web Strategy & Conversion Brief (julio 2026).

## Diseño visual

Decisión: diseño inspirado directamente en el estilo visual de Airbnb (colores, tipografía, layout), con las fotos de antes/después como elemento protagonista.

- **Color de acento:** coral tipo Airbnb (`#FF5A5F`) para CTAs, links y acentos. Fondo blanco/gris muy claro, texto en gris oscuro/negro para contraste.
- **Tipografía:** la fuente original de Airbnb (Cereal) es propietaria y no está disponible para uso de terceros. Usar una alternativa gratuita de la misma familia visual (sans-serif redondeada, humanista) — recomendado: Inter, Circular-alike, o Poppins. Da una sensación muy cercana sin depender de una fuente con licencia restringida.
- **Layout:** fotos grandes con esquinas redondeadas, mucho espacio en blanco, tarjetas con sombra sutil, navegación mínima. Jerarquía visual donde el texto es secundario a la imagen.
- **Antes/después como protagonista:** el slider o comparación de imágenes debe ocupar la mayor parte del viewport en la sección 3, con mínima interferencia de texto encima.
- **Nota:** el footer sigue incluyendo "Not affiliated with Airbnb, Booking.com or Vrbo" según el brief original — importante mantenerlo aunque el estilo visual esté inspirado en Airbnb.

## Stack recomendado

Landing de una sola página, mobile-first, HTML/CSS/JS simple (sin framework). Justificación del brief: público no técnico, prioridad en velocidad de carga, sin necesidad de backend salvo el formulario de contacto (puede ir a email, WhatsApp link, o un form handler tipo Formspree).

Componente especial a construir: **slider antes/después** (desktop) con alternativa apilada (mobile).

## Mensaje central

> Better listing photos for Picton and Blenheim hosts — clear, realistic and designed to make a stronger first impression.

Posicionamiento: *Independent listing photography for Airbnb, Booking.com and short-term rental hosts in Picton and Blenheim — helping properties look brighter, clearer and more inviting online.*

**Nota de alcance (agregada):** el proyecto amplía su foco de solo Picton a Picton y Blenheim (ambos en Marlborough). Todas las menciones de ubicación en el copy deben reflejar ambas ciudades, no solo Picton.

No es "vender una sesión de fotos". Es vender una mejora en cómo el alojamiento compite y genera confianza online.

---

## 1. Header (implícito, no listado como sección propia en el brief pero necesario)
- Nombre del servicio: **First Look Photography** (logo aún pendiente, ver Pendientes)
- CTA visible: "Send your listing for a free photo review"

## 2. Hero
**Objetivo:** pregunta de identificación + propuesta clara + CTA primario + CTA secundario.

- H1: "Does your property look better in person than it does online?"
- Subtítulo: "Listing photography for Airbnb, Booking.com and short-term rentals in Picton and Blenheim."
- Copy: "I help local hosts present their accommodation with brighter, clearer and more inviting images — so guests can understand the space and feel confident considering it."
- CTA primario: **"Send your listing for a free photo review"**
- CTA secundario (link): "See before & after examples" → ancla a sección 3
- Línea de especialización (badge corto, debajo del hero o en sección About): *"Specialised exclusively in short-term rental photography — not general real estate or portraits."*

## 3. Antes y después
**Objetivo:** prueba visual inmediata, debe verse sin mucho scroll desde el hero.

- Título: "Before and after"
- Copy: "Often, the property does not need to change. It simply needs to be shown better. Improved light, composition, colour and visual clarity can help the same space feel more welcoming and easier to understand online."
- Componente: slider antes/después (desktop) / apilado (mobile)
- Etiqueta por par: "Before / After realistic editing" + frase corta de qué cambió (light, colour, composition, visual clean-up)
- 4–8 comparaciones reales, mismo espacio y ángulo. Incluir interiores, exterior, detalle, vista, portada potencial.

## 4. El problema
**Objetivo:** justificar por qué importa, antes de vender la solución.

- Título: "Your photos are the first viewing"
- Copy: "Guests often compare several properties before reading every detail. When listing photos look dark, rushed, cluttered or outdated, a good accommodation can appear less comfortable and less valuable than it really is. The problem is not always the property. Sometimes, it is simply how the property is being presented."

## 5. "This service is for you if…"
**Objetivo:** autoidentificación del cliente ideal.

- Título: "This service may be right for you if:"
- Lista:
  - Your property looks better in person than in your current photos.
  - Your listing images were taken quickly or in poor light.
  - Your gallery feels outdated or inconsistent.
  - Similar properties appear more appealing online.
  - You are preparing for the upcoming visitor season.
  - You want better photos without managing the shooting, editing and image selection yourself.

## 6. Propuesta visual
- Título: "More than photos of rooms"
- Copy: "A strong listing gallery should show light, cleanliness, comfort, space, views and the small details guests care about. The goal is not to make the property look different. It is to show its real value more clearly."

## 7. Datos oficiales de Airbnb (prueba social)
**Objetivo:** respaldo externo, NUNCA presentar como resultado propio del servicio.

- Título: "Airbnb's data shows why professional photos matter"
- 3 tarjetas simples:
  - **21%** — higher host earnings
  - **19%** — more bookings
  - **85%** — covered the cost with one booked night
- Copy: "Airbnb reports that listings using its Professional Photography service saw, on average, 21% higher host earnings and 19% more bookings over the following 365 days. Airbnb also reports that 85% of hosts covered the cost of its professional photography service with the earnings from one booked night. Better photos are more than a visual improvement. They can help guests notice, understand and trust a property when comparing listings online."
- Disclaimer obligatorio: "Source: Airbnb Professional Photography Program. These results relate to Airbnb's own photography service and do not guarantee results for individual properties or independent photography services."
- Fuente: https://www.airbnb.com/e/pro-photography
- ⚠️ No usar como "my photos will increase bookings"
- **Nota de ubicación:** este bloque debe quedar inmediatamente antes de la tabla de precios (sección 8). Funciona como anclaje económico: el lector ve "una noche cubre el costo" justo antes de ver el número real, sin que haga falta prometer nada propio.

## 8. Qué incluye, paquetes y precios

**Paquetes:**

| Paquete | Fotos | Precio | Costo por foto |
|---|---|---|---|
| Básico | 10 fotos | NZ$129 | NZ$12.90 |
| Intermedio | 15 fotos | NZ$169 | NZ$11.27 |
| Completo | 20 fotos | NZ$199 — **Mejor valor** | NZ$9.95 |

Mostrar los tres paquetes lado a lado, con el de 20 fotos destacado bajo la etiqueta "Mejor valor" — justificada por el menor costo por foto (dato real), no por un descuento inventado. El bloque de datos de Airbnb (sección 7) va justo arriba o al lado de esta tabla para que el precio se lea en contexto.

**Bonus incluido en cualquier paquete:**
Guía corta (mini-ebook) con consejos para mejorar la visibilidad del anuncio — *"First Look Photography — Qué factores mejoran la visibilidad de tu anuncio en Airbnb y Booking.com"*.
Sin etiqueta de valor en dólares (evitar "$29 de valor, gratis hoy" — no encaja con el posicionamiento local y simple del proyecto). Presentar como: *"Con cualquier paquete te llevás además esta guía, sin costo adicional."*

⚠️ En el contenido del ebook, evitar cualquier frase que prometa revelar "el algoritmo" de Airbnb o Booking — ninguna plataforma lo publica. Enfocar en factores públicamente conocidos: calidad y orden de las fotos, tiempo de respuesta, reseñas, precio competitivo, información completa del anuncio.

**Entregables generales (todos los paquetes):**
- Photo session at the property
- Interior and exterior images
- Detail and amenity shots
- Brightness and colour correction
- Realistic editing
- Photos prepared for listing use
- Recommendation for the main cover image
- Suggested order for the opening gallery
- Free review of the current listing
- One editing revision for brightness, colour and image selection
- Mini preparation guide before the shoot

Incluir bloque de transparencia sobre edición:
> "Realistic editing — Every image is edited to improve brightness, colour and clarity while keeping the property true to life. Optional image enhancements are only used when they do not misrepresent the accommodation."

## 9. Cómo funciona (proceso, 4-5 pasos)
1. **Send your listing** — I review the current gallery and identify the most important opportunities.
2. **Prepare the property** — You receive a simple checklist to have the accommodation photo-ready.
3. **Photo session** — I photograph the main spaces, details, amenities, exterior and views.
4. **Realistic editing** — I improve light, colour and composition without misrepresenting the accommodation.
5. **Delivery and recommendations** — You receive the selected images plus guidance on the cover photo and opening gallery order.

## 10. Portfolio / galería
- Ejemplos reales: detalles, interiores, exteriores, portada
- **Diferencia con la sección 3 (Antes y después):** la sección 3 muestra pares comparativos (mismo espacio, antes vs. después) para demostrar el efecto de la edición. Esta sección 10 es una galería más amplia de trabajo terminado — variedad de propiedades y estilos, sin formato de comparación — para mostrar rango y calidad general, no el proceso de edición.
- Puede incluir alguna imagen ya usada en la sección antes/después (solo el "después"), pero no debe ser una repetición del mismo bloque de comparaciones.

## 11. About me
**Objetivo:** generar autoridad y confianza mostrando a la persona real detrás del servicio — clave para un proveedor local individual frente a un público que desconfía de agencias/tecnología.

- Foto real del fotógrafo (pendiente, ver checklist de pendientes)
- Nombre (pendiente de definir)
- Copy sugerido (a personalizar):
  > "Based in Marlborough, I work directly with local hosts in Picton and Blenheim — no agencies, no call centres. I specialise only in short-term rental photography, so every session is focused on what actually helps a listing perform: light, clarity and a first impression that matches the real property."
- Reforzar 2-3 puntos de autoridad concretos (hechos, no opiniones), por ejemplo:
  - "Specialised exclusively in short-term rental photography."
  - "Every listing reviewed personally before any shoot is booked."
  - "Based locally — serving Picton and Blenheim during August and September."
- Ubicación recomendada: justo antes de Testimonios, o integrada en el mismo bloque visual.

## 12. Testimonios
**Objetivo:** prueba social directa, y además usada para resolver objeciones frecuentes de anfitriones indecisos — cada cita apunta a una duda distinta en vez de repetir el mismo elogio genérico.

⚠️ **Importante:** las citas de abajo son plantillas de ejemplo para definir tono y estructura. No publicar como testimonios reales — reemplazar cada una por una cita real de un cliente antes de lanzar. Publicar citas inventadas como si fueran de clientes reales rompe la misma credibilidad que se cuida en el resto del proyecto.

Plantillas por objeción a resolver:

- **Objeción "¿va a verse falso/exagerado?"**
  > "I was worried the edited photos wouldn't match what guests see in person — but they look exactly like my place, just clearer and brighter." — [Nombre], [tipo de alojamiento]
- **Objeción "¿vale la pena el costo para un alojamiento chico?"**
  > "I have a small guest house, not a big holiday home, and I wasn't sure it was worth it. It was — the photos made it look as good as it actually feels to stay there." — [Nombre], [tipo de alojamiento]
- **Objeción "¿es una venta agresiva disfrazada de revisión gratis?"**
  > "I sent my listing expecting a sales pitch. Instead I got honest feedback about what was actually worth fixing." — [Nombre], [tipo de alojamiento]
- **Objeción "¿es fácil o me va a sacar mucho tiempo?"**
  > "The whole process took less time than I expected — a short checklist, one session, and the photos were ready to upload a few days later." — [Nombre], [tipo de alojamiento]

Formato: nombre + tipo de alojamiento (sin apellido completo por privacidad), ubicación general si el cliente lo autoriza. Si al lanzar todavía no hay testimonios reales, no publicar esta sección — mejor omitirla que mostrar citas vacías o inventadas.

## 13. Oferta local limitada
- Título: "Limited Picton & Blenheim availability"
- Copy: "I am currently working with a limited number of local properties across Picton and Blenheim during August and September. This is a practical opportunity to refresh your listing photos before the next busy visitor period."
- Urgencia real (disponibilidad local), sin temporizadores falsos

**CTA de bajo riesgo (bloque aparte):**
- Título: "Not sure what needs improving?"
- Copy: "Send me your Airbnb, Booking.com or holiday rental listing. I will review the current photos and explain the clearest opportunities before you decide anything."
- Línea de riesgo cero (agregada): *"If, after reviewing your listing, I don't think new photos would make a real difference, I'll tell you honestly — no pressure to book."*
- CTA: "Send your listing for a free photo review" (unificado, ver nota de CTA único más abajo)
- Nota: la revisión gratuita es de alcance controlado (observaciones generales sobre portada, iluminación, consistencia, orden) — no es una auditoría completa.

## 14. FAQ
- Do you only photograph Airbnb properties? → No. Suitable for Booking.com, holiday homes, guest houses, B&Bs, direct booking websites.
- Will the photos make the property look unrealistic? → No. Editing focuses on accurate brightness, colour, clarity, composition.
- How should I prepare the property? → Short checklist provided before the session.
- Can you help choose the main photo? → Yes, incluye recomendación de portada y orden de galería.
- Are more bookings guaranteed? → No. La fotografía es un factor entre varios (precio, ubicación, reseñas, disponibilidad, demanda).
- What happens if I want an edit changed? → Una revisión de edición incluida.
- How are the images delivered? → **Pendiente de definir** (formato, resolución, tiempo de entrega)

## 15. CTA final
- Repetir formulario/CTA: "Send your listing for a free photo review"
- Canal simple: WhatsApp / formulario / email

**CTA único en todo el sitio (definido):** "Send your listing for a free photo review" en Header, Hero, sección 13 (Oferta local) y CTA final. Se elige esta frase por sobre las alternativas porque es específica sobre la acción real que se pide (enviar el link del anuncio) y sobre el beneficio (revisión gratis) — reduce la fricción de "¿y ahora qué hago?" al hacer clic, que es donde suelen perderse conversiones con CTAs más genéricos como "See what could be improved".

**Qué pasa después de enviar el formulario:**
- Mensaje de confirmación en pantalla: *"Got it — I'll review your listing and get back to you within 48 hours."*
- Si se usa email, enviar además una confirmación automática con el mismo mensaje.
- Si el canal es WhatsApp, la confirmación es el propio mensaje enviado; no requiere pantalla adicional.
- Mantener la promesa de 48 horas como compromiso real, no como texto decorativo.

## Footer
- "Not affiliated with Airbnb, Booking.com or Vrbo."
- Datos de contacto
- Mencionar plataformas en texto neutral: Airbnb · Booking.com · Vrbo · Direct booking websites

---

## Formulario de contacto (mínimo, no agregar más campos)
- Name
- Email or mobile number
- Link to the listing
- Property location
- Optional message

No pedir presupuesto, cantidad de habitaciones ni fechas en el primer contacto.

---

## Reglas de marca y credibilidad

**Usar:**
- "Independent photography service"
- Nombres de plataformas en tipografía neutral (Airbnb · Booking.com · Vrbo · Direct booking websites)
- Atribución clara de las cifras a Airbnb

**Evitar:**
- Logos grandes en el hero / composición que parezca partnership oficial
- "Official Airbnb photographer", "Airbnb approved", "certified", "partner"
- "Get more bookings guaranteed", "My photos will increase your income by 21%", "AI-powered photography" como titular principal

**Nota (decisión del proyecto):** se prioriza que el diseño visual (color, tipografía, layout) sea muy similar al de Airbnb — ver sección "Diseño visual". Esto reemplaza la restricción original del brief de no copiar el estilo visual. Las reglas de arriba sobre no reclamar afiliación oficial siguen aplicando igual: el diseño se parece, pero el texto nunca debe sugerir que es un servicio oficial o certificado por Airbnb.

## Reglas de edición / IA
Principio: mejorar la presentación, no inventar el alojamiento. La IA no es eje de venta, puede mencionarse como herramienta secundaria.

| Aceptable | Evitar |
|---|---|
| Corrección de luz y color | Modificar tamaño/proporciones del espacio |
| Eliminar pequeños distractores | Inventar amenities, muebles o vistas |
| Mejorar cielo (si representa condiciones reales) | Cambiar una vista real por otra |
| Ajustar perspectiva y encuadre | Agregar elementos que el huésped no encontraría |
| Lifestyle staging opcional y acordado | Imágenes que generen expectativas falsas |

## Diseño / UX — checklist técnico
- Mobile-first (tráfico probable desde Facebook / teléfono)
- Tipografía grande, alto contraste, botones claros
- WhatsApp/Messenger/email visible
- Sin animaciones pesadas ni sliders confusos
- Repetir el CTA después de: portfolio, oferta y FAQ
- Tono: local, simple, confiable — no parecer agencia grande ni herramienta tecnológica

**Performance (prioridad alta):** el sitio es pesado en imágenes por naturaleza (portfolio, antes/después, galería) — sin optimización, la velocidad de carga se resiente justo en el elemento que más importa (mobile-first). Checklist:
- Lazy loading en todas las imágenes fuera del viewport inicial
- Formato WebP con fallback, comprimidas sin perder calidad visible
- Imágenes servidas en tamaño responsive (srcset) — no cargar la versión full-res en mobile
- Evitar librerías pesadas de JS para el slider antes/después; implementación liviana (vanilla JS o librería mínima)
- Medir con Lighthouse/PageSpeed antes de publicar; priorizar el puntaje mobile sobre desktop

---

## Pendientes antes de publicar (definir con el cliente/dueño del negocio)
- [x] Paquetes y precios — 10 fotos NZ$129 / 15 fotos NZ$169 / 20 fotos NZ$199
- [x] Cantidad de fotos por paquete — ver tabla en sección 8
- [x] Nombre comercial — First Look Photography
- [ ] Dominio (verificar disponibilidad — ej. firstlookphotography.co.nz / .com / .nz)
- [ ] Logo
- [ ] Contenido definitivo del mini-ebook bonus (factores de visibilidad)
- [ ] Plazo de entrega
- [ ] Política de pago y depósito
- [x] Área de cobertura — Picton y Blenheim (Marlborough)
- [ ] Radio exacto de desplazamiento / si se cobra extra fuera de estas dos ciudades
- [ ] Portfolio inicial y permisos de uso de las fotos
- [ ] Testimonios reales de anfitriones (sección 12 — no publicar con citas de ejemplo)
- [ ] Canal de contacto principal (WhatsApp / email / formulario)
- [ ] Términos básicos de servicio y licencia de uso
- [ ] Nombre y foto real para la sección "About me" (sección 11)
