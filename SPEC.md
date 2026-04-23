# SPEC: Mapa Interactivo - Facultad de Informática UAQ

## 1. Información del Proyecto

- **Nombre:** Mapa Interactivo Facultad de Informática UAQ
- **Descripción:** Mapa navigable de la Facultad de Informática con puntos de interés categorizados y filtrables
- **Ubicación:** Campus Juriquilla, Av. de las Ciencias s/n, Colonia Juriquilla, Querétaro, C.P. 76230
- **Pisos:** 1, 2, 3

---

## 2. Estructura de Archivos

```
/Topico
├── index.html          # Mapa interactivo principal
├── admin.html          # Panel de administración de POI
├── css/
│   └── styles.css     # Estilos globales
├── js/
│   ├── app.js         # Lógica del mapa
│   ├── admin.js      # Lógica del panel admin
│   └── data.js       # Datos de POI (embedded)
├── data/
│   └── pois.json    # Datos de POI (exportable)
└── SPEC.md           # Esta especificación
```

---

## 3. UI/UX Specification

### Layout

- **Mapa:** Fondo completo,SVG interactivo como elemento raíz
- **UI overl ay:** Capa flotante superpuesta sobre el mapa (z-index: 100)
- **Glosario:** Panel flotante, posición superior-izquierda (top: 16px, left: 16px)
- **Barra de búsqueda:** Fija, posición superior-centrada (top: 16px)
- **Filtro de pisos:** Debajo de búsqueda (top: 60px)
- **Popup:** Posición dinámica según click, offset 12px del POI

### Breakpoints

| Breakpoint | Ancho | Cambios |
|------------|-------|---------|
| Mobile | < 640px | UI más pequeña, glosario colapsable |
| Tablet | 640-1024px | UI adaptada |
| Desktop | > 1024px | UI completa |

### Paleta de Colores

| Token | Hex | Uso |
|-------|-----|-----|
| `--uaq-blue` | #004A8F | Brand primary |
| `--bg-map` | #FAFAFA | Fondo del mapa |
| `--structure-light` | #E0E0E0 | Estructura pisos |
| `--structure-mid` | #BDBDBD | Detalles estructurales |
| `--text-primary` | #1A1A1A | Texto principal |
| `--text-secondary` | #666666 | Texto secundario |
| `--text-muted` | #999999 | Texto muted |
| `--cat-servicios` | #FF6B6B | Categoría: Servicios |
| `--cat-academicos` | #4A90D9 | Categoría: Académicos |
| `--cat-administrativos` | #9B59B6 | Categoría: Administrativos |
| `--cat-comunes` | #5CB85C | Categoría: Áreas comunes |
| `--cat-otros` | #F5A623 | Categoría: Otros |
| `--surface` | #FFFFFF | Superficies UI |
| `--border` | rgba(0,0,0,0.08) | Bordes sutiles |
| `--shadow` | rgba(0,0,0,0.12) | Sombras |

### Tipografía

- **Font family:** 'IBM Plex Sans', system-ui, sans-serif
- **Headings:**
  - H1: 600/24px
  - H2: 600/18px
  - H3: 500/14px
- **Body:** 400/14px
- **Labels:** 500/12px
- **Small:** 400/11px

### Sistema de espaciado

- **Base unit:** 4px
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64

---

## 4. Componentes

### 4.1 Glosario de Categorías

- **Container:** Panel flotante, bg-white, border-radius: 12px, shadow
- **Título:** "Categorías" - H3, text-secondary
- **Items:** Filter chips toggleables
- **Estado inactive:** bg-gray-100, text-muted
- **Estado active:** bg[categoría], text-white
- **Icono:** Circle pequeño con color de categoría

### 4.2 Barra de Búsqueda

- **Input:** Width: 320px (desktop), 100%-32px (mobile)
- **Height:** 44px
- **Border:** 1px solid border
- **Border-radius:** 8px
- **Placeholder:** "Buscar punto de interés..."
- **Icono:** Lupa a la izquierda
- **Autocomplete:** Dropdown con resultados matching

### 4.3 Filtro de Pisos

- **Container:** Row de pills debajo de búsqueda
- **Items:** "Piso 1", "Piso 2", "Piso 3", "Todos"
- **Estados:** Similar a categorías
- **Multi-select:** Permite múltiples pisos activos

### 4.4 Mapa Interactivo

- **Elemento:** SVG escalable
- **Fondo:** bg-map con patrón sutil
- **Estructura:** Polígonos para pisos 1, 2, 3
- **POI markers:** Círculos 12px, color según categoría
- **POI hover:** Scale 1.2, cursor pointer
- **Zoom:** Controles +/- en esquina inferior-derecha
- **Zoom range:** 0.5x - 3x
- **Pan:** Draggable

### 4.5 Popup de POI

- **Container:** bg-white, border-radius: 10px, shadow-md
- **Width:** 240px
- **Arrow:** Pequeño triángulo pointing al POI
- **Contenido:**
  - Nombre: H3, text-primary, bold
  - Piso: Badge pills (small)
  - Detalles: Body, text-secondary
- **Close:** X button top-right
- **Animation:** Fade-in + scale desde 0.95

### 4.6 Controles de Zoom

- **Container:** Vertical stack, bottom-right
- **Buttons:** +, -
- **Style:** Circle 36px, bg-white, shadow
- **States:** Hover, active, disabled (at limits)

---

## 5. Funcionalidad

### 5.1 Filtering

- **Categoría:** Click toggles, múltiples permitidas
- **Piso:** Click toggles, múltiples permitidas
- **Búsqueda:** Filtro por nombre (case-insensitive)
- **Combinación:** AND entre categorías y pisos
- **Sin filtros:** Todos los POI visibles

### 5.2 Búsqueda

- **Input:** Debounce 200ms
- **Matching:** Nombre contiene query
- **Resultados:** Dropdown con max 5 items
- **Click resultado:** Pan + zoom al POI, muestra popup
- **Enter:** Selecciona primer resultado

### 5.3 Navegación

- **Zoom buttons:** + / - con límites
- **Mouse wheel:** Zoom centered en cursor
- **Pinch:** Zoom en touch devices
- **Drag:** Pan el mapa
- **Double-click:** Zoom + centered

### 5.4 POI Interaction

- **Click:** Abre popup
- **Hover:** Highlight + tooltip nombre
- **Popup close:** Click outside, X, o ESC

---

## 6. Datos de POI

### Schema

```json
{
  "id": "string (unique)",
  "nombre": "string",
  "piso": 1 | 2 | 3,
  "categoria": "servicios|academicos|administrativos|comunes|otros",
  "detalles": "string",
  "coordenadas": { "x": number, "y": number },
  "visible": boolean
}
```

### Categorías por Defecto

| Categoría | Color | Ejemplos |
|-----------|-------|----------|
| servicios | #FF6B6B | Cafetería, Baño, Librería |
| academicos | #4A90D9 | Aulas 101-112, Lab 1, Biblioteca |
| administrativos | #9B59B6 | Dirección, Secretaría |
| comunes | #5CB85C | Estacionamiento, Patio |
| otros | #F5A623 | Salidas de emergencia |

---

## 7. Admin Panel

### Features

- **Listado:** Tabla de todos los POI
- **Crear:** Formulario para nuevo POI
- **Editar:** Click en row → abre formulario
- **Eliminar:** Botón en cada row con confirmación
- **Import/Export:** JSON file
- **Preview:** Botón para ver en mapa

### Form Fields

- ID (auto-generated, readonly)
- Nombre (text, required)
- Piso (select 1-3, required)
- Categoría (select, required)
- Detalles (textarea)
- Coordenadas X, Y (number inputs)
- Visible (checkbox)

---

## 8. Acceptance Criteria

- [ ] Mapa carga sin pantalla previa
- [ ] Glosario visible y funcional (superior-izquierda)
- [ ] Búsqueda filtra y navega a POI
- [ ] Filtro de pisos funciona
- [ ] Click en POI muestra popup con info correcta
- [ ] Popup muestra: Nombre, Piso, Detalles
- [ ] Zoom funciona (botones + wheel)
- [ ] Pan funciona (drag)
- [ ] Responsive en mobile/tablet/desktop
- [ ] Categorías filtran POI correctamente
- [ ] Admin CRUD funciona
- [ ] Diseño coherente con SPEC