# Análisis y decisiones de diseño — TemuLandia

> Se tomó la decisión de mantener un diseño **básico y simple**: la idea es que la interfaz no compita con los productos. La prioridad fue claridad, rapidez y que se vea bien en cualquier dispositivo.

## 📌 Resumen 
- Objetivo: mostrar productos de forma clara y permitir comprar sin complicaciones.
- Enfoque: minimalismo práctico — menos ruido visual, botones grandes, tipografía legible.
- Resultado buscado: experiencia usable desde móvil hasta escritorio sin sacrificar usabilidad.

## 🧱 Estructura de datos: 
- **Producto** (objeto):
  - `id`: string (ej. `producto-1`)
  - `titulo`: string
  - `imagen`: string (URL)
  - `categoria`: { `nombre`, `id` }
  - `precio`: number
- **Carrito**: array de productos con `cantidad` (number).
- **Persistencia**: usamos `localStorage` con la clave `productos-en-carrito` (JSON serializado).

## 🎨 Decisiones de diseño y por qué 
- Optamos por un look limpio porque la mayoría de tiendas online exitosas priorizan legibilidad y conversión. Si hay demasiado en pantalla, el usuario se pierde.
- Barra lateral (aside) para filtros: deja la parte principal libre para las tarjetas de producto.
- Grid de productos: adaptable (4→3→2→1 columnas) para que se vea bien en cualquier ancho.
- Contador del carrito visible en todo momento para dar feedback inmediato.
- Feedback claro: alertas simples al agregar productos y estados vacíos amigables.

## 🔍 Filtros, búsqueda y ordenamientos (UX)
- **Filtros por categoría (click)**: lo más directo para segmentar catálogo.
- **Búsqueda en tiempo real (input)**: el usuario que sabe qué busca lo quiere ya, sin pasos intermedios.
- **Ordenamientos**: se recomienda añadir (no está implementado) un `<select>` con `change` para ordenar por precio/nombre — útil para comparar precios y encontrar ofertas.

## ⚙️ Eventos y comportamiento esperado
- `click`: agregar/quitar productos, seleccionar categorías, acciones en carrito.
- `input`: búsqueda instantánea por título.
- `change`: recomendado para ordenamientos 

## ✅ Persistencia y sincronización
- El carrito se guarda y recupera desde `localStorage` — si recargas, tu carrito sigue ahí. Fácil y efectivo para proyectos de aprendizaje.

## ♿ Accesibilidad y responsividad
- Botones con contraste alto y tamaño táctil adecuado.
- Menú hamburguesa y aside ocultable en móvil para comprar sin distracciones.
- Tipografía Kanit: moderna y legible.

---
