const POI_DATA = [
  // SERVICIOS
  {
    id: "cafeteria",
    nombre: "Cafetería Principal",
    piso: 1,
    categoria: "servicios",
    detalles: "Cafetería principal de la facultad. Horario: 7:00 - 20:00",
    coordenadas: { lat: 20.7044, lng: -100.4439 },
    visible: true
  },
  {
    id: "banio-h",
    nombre: "Baño Caballeros",
    piso: 1,
    categoria: "servicios",
    detalles: "Baño para caballeros",
    coordenadas: { lat: 20.7047, lng: -100.4438 },
    visible: true
  },
  {
    id: "banio-m",
    nombre: "Baño Damas",
    piso: 1,
    categoria: "servicios",
    detalles: "Baño para damas",
    coordenadas: { lat: 20.7046, lng: -100.4438 },
    visible: true
  },
  {
    id: "libreria",
    nombre: "Librería",
    piso: 1,
    categoria: "servicios",
    detalles: "Venta de libros de texto y material escolar",
    coordenadas: { lat: 20.7043, lng: -100.4437 },
    visible: true
  },
  {
    id: "copias",
    nombre: "Copias e Impresiones",
    piso: 1,
    categoria: "servicios",
    detalles: "Servicio de copias, impresiones y encuadernación",
    coordenadas: { lat: 20.7042, lng: -100.4437 },
    visible: true
  },
  {
    id: "seguridad",
    nombre: "Protección Civil",
    piso: 1,
    categoria: "servicios",
    detalles: "Oficina de protección civil y emergencias",
    coordenadas: { lat: 20.7049, lng: -100.4436 },
    visible: true
  },

  // ACADÉMICOS
  {
    id: "aula-101",
    nombre: "Aula 101",
    piso: 1,
    categoria: "academicos",
    detalles: "Aula de clases capacidad 40 alumnos",
    coordenadas: { lat: 20.7044, lng: -100.4440 },
    visible: true
  },
  {
    id: "aula-102",
    nombre: "Aula 102",
    piso: 1,
    categoria: "academicos",
    detalles: "Aula de clases capacidad 40 alumnos",
    coordenadas: { lat: 20.7044, lng: -100.4439 },
    visible: true
  },
  {
    id: "aula-103",
    nombre: "Aula 103",
    piso: 1,
    categoria: "academicos",
    detalles: "Aula de clases capacidad 40 alumnos",
    coordenadas: { lat: 20.7043, lng: -100.4440 },
    visible: true
  },
  {
    id: "lab-1",
    nombre: "Laboratorio de Cómputo 1",
    piso: 1,
    categoria: "academicos",
    detalles: "Laboratorio con 30 computadoras para prácticas",
    coordenadas: { lat: 20.7043, lng: -100.4439 },
    visible: true
  },
  {
    id: "lab-2",
    nombre: "Laboratorio de Cómputo 2",
    piso: 1,
    categoria: "academicos",
    detalles: "Laboratorio con 30 computadoras para prácticas",
    coordenadas: { lat: 20.7042, lng: -100.4439 },
    visible: true
  },
  {
    id: "aula-104",
    nombre: "Aula 104",
    piso: 1,
    categoria: "academicos",
    detalles: "Aula de clases capacidad 35 alumnos",
    coordenadas: { lat: 20.7042, lng: -100.4440 },
    visible: true
  },
  {
    id: "lab-redes",
    nombre: "Laboratorio de Redes",
    piso: 1,
    categoria: "academicos",
    detalles: "Laboratorio especializado para redes y telecomunicaciones",
    coordenadas: { lat: 20.7041, lng: -100.4440 },
    visible: true
  },
  {
    id: "sala-juntas",
    nombre: "Sala de Juntas",
    piso: 1,
    categoria: "academicos",
    detalles: "Sala de reuniones para 12 personas",
    coordenadas: { lat: 20.7041, lng: -100.4437 },
    visible: true
  },
  {
    id: "biblioteca",
    nombre: "Biblioteca",
    piso: 1,
    categoria: "academicos",
    detalles: "Biblioteca con sala de estudio y recursos digitales",
    coordenadas: { lat: 20.7040, lng: -100.4439 },
    visible: true
  },

  // ADMINISTRATIVOS
  {
    id: "direccion",
    nombre: "Dirección",
    piso: 1,
    categoria: "administrativos",
    detalles: "Oficina de la Dirección de la Facultad",
    coordenadas: { lat: 20.7049, lng: -100.4438 },
    visible: true
  },
  {
    id: "secretaria",
    nombre: "Secretaría Académica",
    piso: 1,
    categoria: "administrativos",
    detalles: "Trámites escolares y constancias",
    coordenadas: { lat: 20.7048, lng: -100.4438 },
    visible: true
  },
  {
    id: "control-escolar",
    nombre: "Control Escolar",
    piso: 1,
    categoria: "administrativos",
    detalles: "Gestión de inscripciones y calificaciones",
    coordenadas: { lat: 20.7048, lng: -100.4439 },
    visible: true
  },
  {
    id: "subdireccion",
    nombre: "Subdirección",
    piso: 1,
    categoria: "administrativos",
    detalles: "Oficina de la Subdirección",
    coordenadas: { lat: 20.7049, lng: -100.4439 },
    visible: true
  },

  // ÁREAS COMUNES
  {
    id: "estacionamiento",
    nombre: "Estacionamiento",
    piso: 1,
    categoria: "comunes",
    detalles: "Estacionamiento para visitantes y personal",
    coordenadas: { lat: 20.7050, lng: -100.4441 },
    visible: true
  },
  {
    id: "entrada",
    nombre: "Entrada Principal",
    piso: 1,
    categoria: "comunes",
    detalles: "Acceso principal al edificio",
    coordenadas: { lat: 20.7045, lng: -100.4440 },
    visible: true
  },
  {
    id: "patio",
    nombre: "Patio Central",
    piso: 1,
    categoria: "comunes",
    detalles: "Área común al aire libre con jardines",
    coordenadas: { lat: 20.7046, lng: -100.4438 },
    visible: true
  },
  {
    id: "areas-verdes",
    nombre: "Áreas Verdes",
    piso: 1,
    categoria: "comunes",
    detalles: "Jardines y espacios verdes",
    coordenadas: { lat: 20.7047, lng: -100.4440 },
    visible: true
  },

  // OTROS
  {
    id: "salida-1",
    nombre: "Salida de Emergencia 1",
    piso: 1,
    categoria: "otros",
    detalles: "Salida de emergencia",
    coordenadas: { lat: 20.7040, lng: -100.4441 },
    visible: true
  },
  {
    id: "salida-2",
    nombre: "Salida de Emergencia 2",
    piso: 1,
    categoria: "otros",
    detalles: "Salida de emergencia",
    coordenadas: { lat: 20.7045, lng: -100.4435 },
    visible: true
  },
  {
    id: "elevador",
    nombre: "Elevador",
    piso: 1,
    categoria: "otros",
    detalles: "Acceso a pisos superiores",
    coordenadas: { lat: 20.7044, lng: -100.4438 },
    visible: true
  },
  {
    id: "escaleras-1",
    nombre: "Escaleras 1",
    piso: 1,
    categoria: "otros",
    detalles: "Escaleras principales",
    coordenadas: { lat: 20.7043, lng: -100.4438 },
    visible: true
  },
  {
    id: "escaleras-2",
    nombre: "Escaleras 2",
    piso: 1,
    categoria: "otros",
    detalles: "Escaleras secundarias",
    coordenadas: { lat: 20.7041, lng: -100.4438 },
    visible: true
  },

  // ============ PISO 2 ============
  {
    id: "aula-201",
    nombre: "Aula 201",
    piso: 2,
    categoria: "academicos",
    detalles: "Aula de clases capacidad 40 alumnos",
    coordenadas: { lat: 20.7044, lng: -100.4440 },
    visible: true
  },
  {
    id: "aula-202",
    nombre: "Aula 202",
    piso: 2,
    categoria: "academicos",
    detalles: "Aula de clases capacidad 40 alumnos",
    coordenadas: { lat: 20.7044, lng: -100.4439 },
    visible: true
  },
  {
    id: "lab-investigacion",
    nombre: "Lab. Investigación",
    piso: 2,
    categoria: "academicos",
    detalles: "Laboratorio de investigación en IA y Big Data",
    coordenadas: { lat: 20.7043, lng: -100.4439 },
    visible: true
  },
  {
    id: "lab-ciberseguridad",
    nombre: "Lab. Ciberseguridad",
    piso: 2,
    categoria: "academicos",
    detalles: "Laboratorio especializado en ciberseguridad",
    coordenadas: { lat: 20.7043, lng: -100.4440 },
    visible: true
  },
  {
    id: "sala-video",
    nombre: "Sala de Video",
    piso: 2,
    categoria: "academicos",
    detalles: "Sala de videoconferencias",
    coordenadas: { lat: 20.7042, lng: -100.4439 },
    visible: true
  },
  {
    id: "aula-203",
    nombre: "Aula 203",
    piso: 2,
    categoria: "academicos",
    detalles: "Aula de clases capacidad 35 alumnos",
    coordenadas: { lat: 20.7042, lng: -100.4440 },
    visible: true
  },
  {
    id: "lab-web",
    nombre: "Lab. Desarrollo Web",
    piso: 2,
    categoria: "academicos",
    detalles: "Laboratorio de desarrollo web y móvil",
    coordenadas: { lat: 20.7041, lng: -100.4440 },
    visible: true
  },
  {
    id: "sala-estudio-2",
    nombre: "Sala de Estudio",
    piso: 2,
    categoria: "academicos",
    detalles: "Espacio de estudio grupal",
    coordenadas: { lat: 20.7040, lng: -100.4439 },
    visible: true
  },

  // ============ PISO 3 ============
  {
    id: "aula-301",
    nombre: "Aula 301",
    piso: 3,
    categoria: "academicos",
    detalles: "Aula de posgrado",
    coordenadas: { lat: 20.7044, lng: -100.4440 },
    visible: true
  },
  {
    id: "aula-302",
    nombre: "Aula 302",
    piso: 3,
    categoria: "academicos",
    detalles: "Aula de posgrado",
    coordenadas: { lat: 20.7044, lng: -100.4439 },
    visible: true
  },
  {
    id: "lab-bigdata",
    nombre: "Lab. Big Data",
    piso: 3,
    categoria: "academicos",
    detalles: "Laboratorio de análisis de datos",
    coordenadas: { lat: 20.7043, lng: -100.4439 },
    visible: true
  },
  {
    id: "seminario",
    nombre: "Sala de Seminarios",
    piso: 3,
    categoria: "academicos",
    detalles: "Sala para presentaciones y seminarios",
    coordenadas: { lat: 20.7043, lng: -100.4440 },
    visible: true
  },
  {
    id: "tesoteca",
    nombre: "Tesoteca",
    piso: 3,
    categoria: "academicos",
    detalles: "Repositorio de proyectos de titulación",
    coordenadas: { lat: 20.7042, lng: -100.4439 },
    visible: true
  },
  {
    id: "lab-ml",
    nombre: "Lab. Machine Learning",
    piso: 3,
    categoria: "academicos",
    detalles: "Laboratorio de aprendizaje automático",
    coordenadas: { lat: 20.7041, lng: -100.4440 },
    visible: true
  },
  {
    id: "lab-iot",
    nombre: "Lab. IoT",
    piso: 3,
    categoria: "academicos",
    detalles: "Laboratorio de Internet de las Cosas",
    coordenadas: { lat: 20.7041, lng: -100.4439 },
    visible: true
  },
  {
    id: "cubiculos",
    nombre: "Cubículos",
    piso: 3,
    categoria: "academicos",
    detalles: "Espacios individuales de investigación",
    coordenadas: { lat: 20.7040, lng: -100.4440 },
    visible: true
  },
  {
    id: "coord-posgrado",
    nombre: "Coord. Posgrado",
    piso: 3,
    categoria: "administrativos",
    detalles: "Coordinación de programas de posgrado",
    coordenadas: { lat: 20.7049, lng: -100.4438 },
    visible: true
  }
];

const CATEGORIES = {
  servicios: { color: "#FF6B6B", label: "Servicios" },
  academicos: { color: "#4A90D9", label: "Académicos" },
  administrativos: { color: "#9B59B6", label: "Administrativos" },
  comunes: { color: "#5CB85C", label: "Áreas comunes" },
  otros: { color: "#F5A623", label: "Otros" }
};

function getPOIData() {
  return POI_DATA;
}

function getCategories() {
  return CATEGORIES;
}

function getPOIById(id) {
  return POI_DATA.find(poi => poi.id === id);
}

function getPOIsByFloor(floor) {
  return POI_DATA.filter(poi => poi.piso === floor);
}

function getPOIsByCategory(category) {
  return POI_DATA.filter(poi => poi.categoria === category);
}