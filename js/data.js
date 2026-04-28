const POI_DATA = [];

const CATEGORIES = {
  servicios: { color: '#FF6B6B', label: 'Servicios' },
  academicos: { color: '#2E5BFF', label: 'Académicos' },
  administrativos: { color: '#45B7D1', label: 'Administrativos' },
  comunes: { color: '#00A86B', label: 'Áreas comunes' },
  otros: { color: '#DDA0DD', label: 'Otros' }
};

const STORAGE_KEY = 'topico_pois';

async function initPOIData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        POI_DATA.length = 0;
        POI_DATA.push(...parsed);
        console.log('Loaded', POI_DATA.length, 'POIs from localStorage');
        return;
      }
    }
    const response = await fetch('data/pois.json');
    if (response.ok) {
      const data = await response.json();
      POI_DATA.length = 0;
      POI_DATA.push(...data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(POI_DATA));
      console.log('Loaded', POI_DATA.length, 'POIs from pois.json');
    }
  } catch (e) {
    console.warn('Failed to load POIs:', e);
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(POI_DATA));
    localStorage.setItem(STORAGE_KEY + '_hash', JSON.stringify(POI_DATA).length);
  } catch (e) {
    console.warn('Failed to save POIs:', e);
  }
}

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