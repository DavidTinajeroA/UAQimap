(function() {
  'use strict';

  const state = {
    pois: [],
    categories: {},
    map: null,
    markersLayer: null,
    activeCategories: new Set(['servicios', 'academicos', 'administrativos', 'comunes', 'otros']),
    activeFloors: new Set([1, 2, 3]),
    selectedPOI: null,
    searchQuery: '',
    searchResults: [],
    selectedSearchIndex: -1,
    markerCache: new Map()
  };

  const CAMPUS_CENTER = [20.704466, -100.443938];
  const ZOOM_LEVEL = 18;

  const $ = (sel) => document.querySelector(sel);

  const elements = {
    app: $('#app'),
    mapContainer: $('#mapContainer'),
    searchInput: $('#searchInput'),
    searchDropdown: $('#searchDropdown'),
    searchClear: $('#searchClear'),
    floorsContainer: $('#floorsContainer'),
    glossary: $('#glossary'),
    glossaryContent: $('#glossaryContent'),
    glossaryToggle: $('#glossaryToggle')
  };

  // ==================== Initialization ====================
  async function init() {
    if (typeof initPOIData === 'function') {
      await initPOIData();
    }
    loadData();
    initMap();
    renderMarkers();
    updateCategoryCounts();
    bindEvents();
    $('#app').classList.add('app-loaded');
  }

  function loadData() {
    if (typeof getPOIData === 'function') {
      state.pois = getPOIData();
    }
    if (typeof getCategories === 'function') {
      state.categories = getCategories();
    }
  }

  // ==================== Map ====================
  function initMap() {
    console.log('Initializing map...');
    state.map = L.map('mapContainer', {
      center: CAMPUS_CENTER,
      zoom: ZOOM_LEVEL,
      zoomControl: false,
      attributionControl: true,
      minZoom: 10,
      maxZoom: 23
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 23,
      maxNativeZoom: 19,
      minZoom: 10
    }).addTo(state.map);

    state.markersLayer = L.layerGroup().addTo(state.map);
    console.log('Map initialized:', state.map);
  }

  // ==================== Markers ====================
  function renderMarkers() {
    state.markersLayer.clearLayers();
    state.markerCache.clear();

    state.pois.forEach(poi => {
      if (!poi.visible || !isPOIVisible(poi)) return;
      const marker = createMarker(poi);
      state.markerCache.set(poi.id, marker);
      marker.addTo(state.markersLayer);
    });
  }

  function darkenColor(color) {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 40);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 40);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 40);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  }

  function createMarker(poi) {
    const color = state.categories[poi.categoria]?.color || '#999';
    const darker = darkenColor(color);
    
    const icon = L.divIcon({
      className: 'custom-poi-marker',
      html: `
        <div class="marker-wrapper" style="position:relative;display:flex;flex-direction:column;align-items:center;">
          <div class="marker-pin" style="
            width:40px;height:40px;
            background:linear-gradient(135deg,${color} 0%,${darker} 100%);
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg) scale(0.9);
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 4px 16px ${color}55;
            border:3px solid white;
            transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          ">
            <svg style="width:20px;height:20px;transform:rotate(45deg);fill:white;" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
          </div>
          <div style="position:absolute;width:28px;height:10px;background:rgba(0,0,0,0.2);border-radius:50%;bottom:-2px;transform:scaleY(0.4);"></div>
        </div>
        <style>.custom-poi-marker:hover .marker-pin{transform:rotate(-45deg) scale(1.2);box-shadow:0 8px 28px ${color}77;}</style>
      `,
      iconSize: [40, 52],
      iconAnchor: [20, 52],
      popupAnchor: [0, -48]
    });

    const marker = L.marker([poi.coordenadas.lat, poi.coordenadas.lng], { icon });

    const popup = `
      <div style="font-family:'IBM Plex Sans',system-ui;padding:14px;min-width:220px;">
        <div style="font-size:18px;font-weight:600;color:#1a1a1a;margin-bottom:12px;padding-bottom:10px;border-bottom:3px solid ${color};">
          ${poi.nombre}
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <span style="font-size:13px;font-weight:600;color:white;background:#004A8F;padding:6px 16px;border-radius:18px;">
            PISO ${poi.piso}
          </span>
          <span style="width:16px;height:16px;border-radius:50%;background:${color};box-shadow:0 2px 8px ${color}44;"></span>
        </div>
        <div style="font-size:14px;color:#555;line-height:1.6;background:#f5f6f8;padding:12px;border-radius:12px;font-style:italic;">
          ${poi.detalles || 'Sin descripción disponible'}
        </div>
      </div>
    `;

    marker.bindPopup(popup, { className: 'custom-popup-wrapper', closeButton: true, maxWidth: 300, minWidth: 240 });
    return marker;
  }

  function updateCategoryCounts() {
    const counts = {};
    state.pois.forEach(poi => counts[poi.categoria] = (counts[poi.categoria] || 0) + 1);
    Object.keys(counts).forEach(cat => {
      const el = $(`.category-count[data-count="${cat}"]`);
      if (el) el.textContent = counts[cat];
    });
  }

  // ==================== Filtering ====================
  function isPOIVisible(poi) {
    const catMatch = state.activeCategories.has(poi.categoria);
    const floorMatch = state.activeFloors.size === 0 || state.activeFloors.has(poi.piso) || state.activeFloors.size === 3;
    const searchMatch = !state.searchQuery || poi.nombre.toLowerCase().includes(state.searchQuery.toLowerCase());
    return catMatch && floorMatch && searchMatch;
  }

  function filterMarkers() {
    state.pois.forEach(poi => {
      const marker = state.markerCache.get(poi.id);
      if (marker) {
        if (isPOIVisible(poi)) marker.addTo(state.markersLayer);
        else state.markersLayer.removeLayer(marker);
      }
    });
  }

  function toggleCategory(category) {
    state.activeCategories.has(category) ? state.activeCategories.delete(category) : state.activeCategories.add(category);
    updateCategoryUI();
    filterMarkers();
  }

  function updateCategoryUI() {
    elements.glossaryContent.querySelectorAll('.category-item').forEach(item => {
      const cat = item.getAttribute('data-category');
      item.classList.toggle('active', state.activeCategories.has(cat));
    });
  }

  function setActiveFloor(floor) {
    const chips = elements.floorsContainer.querySelectorAll('.floor-chip');
    state.activeFloors = floor === 'all' ? new Set([1,2,3]) : new Set([parseInt(floor)]);
    chips.forEach(chip => chip.classList.toggle('active', chip.dataset.floor === String(floor) || floor === 'all'));
    filterMarkers();
  }

  // ==================== Search ====================
  function handleSearch(query) {
    state.searchQuery = query;
    if (!query) { clearSearch(); return; }
    $('#searchClear').classList.add('visible');
    const results = state.pois.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    state.searchResults = results;
    state.selectedSearchIndex = -1;
    renderSearchResults(results);
  }

  function renderSearchResults(results) {
    const dropdown = elements.searchDropdown;
    if (!results.length) { dropdown.classList.remove('visible'); return; }
    dropdown.innerHTML = results.map((poi, i) => `
      <div class="search-result ${i === state.selectedSearchIndex ? 'selected' : ''}" data-id="${poi.id}">
        <span style="width:10px;height:10px;border-radius:50%;background:${state.categories[poi.categoria]?.color};"></span>
        <span>${poi.nombre}</span>
        <span style="color:#999;font-size:12px;">Piso ${poi.piso}</span>
      </div>
    `).join('');
    dropdown.classList.add('visible');
    dropdown.querySelectorAll('.search-result').forEach((el, i) => el.addEventListener('click', () => selectSearchResult(results[i])));
  }

  function selectSearchResult(poi) {
    if (!poi) return;
    state.map.setView([poi.coordenadas.lat, poi.coordenadas.lng], 19);
    const marker = state.markerCache.get(poi.id);
    if (marker) marker.openPopup();
    clearSearch();
  }

  function clearSearch() {
    state.searchQuery = '';
    state.searchResults = [];
    state.selectedSearchIndex = -1;
    elements.searchInput.value = '';
    $('#searchClear').classList.remove('visible');
    elements.searchDropdown.classList.remove('visible');
    filterMarkers();
  }

  // ==================== Events ====================
  function bindEvents() {
    elements.searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    elements.searchDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (item) selectSearchResult(state.pois.find(p => p.id === item.dataset.id));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') clearSearch();
    });
    
    window.addEventListener('storage', (e) => {
      if (e.key === 'topico_pois' && e.newValue) {
        state.pois = getPOIData();
        renderMarkers();
        updateCategoryCounts();
      }
    });
    
    elements.searchDropdown.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') navigateSearch(e.key === 'ArrowDown' ? 1 : -1);
      else if (e.key === 'Enter') selectSearchResult(state.selectedSearchIndex);
      else if (e.key === 'Escape') clearSearch();
    });
    $('#searchClear').addEventListener('click', clearSearch);

    elements.floorsContainer.addEventListener('click', e => {
      const chip = e.target.closest('.floor-chip');
      if (chip) setActiveFloor(chip.dataset.floor);
    });

    elements.glossaryContent.addEventListener('click', e => {
      const item = e.target.closest('.category-item');
      if (item) toggleCategory(item.dataset.category);
    });

    elements.glossaryToggle.addEventListener('click', () => elements.glossary.classList.toggle('expanded'));

    // Zoom controls
    const zoomInBtn = $('#zoomIn'), zoomOutBtn = $('#zoomOut');
    if (zoomInBtn) zoomInBtn.addEventListener('click', function() { state.map.setZoom(Math.min(23, state.map.getZoom() + 1)); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', function() { state.map.setZoom(Math.max(10, state.map.getZoom() - 1)); });

    state.map.on('zoomend moveend', () => {
      const zl = $('#zoomLevel');
      if (zl) zl.textContent = `${Math.round(state.map.getZoom() * 100 / 19)}%`;
    });
    
    document.addEventListener('keydown', e => { 
      if (e.key === 'Escape') state.selectedPOI = null; 
      if (e.key === 'r' || e.key === 'R') {
        loadData();
        renderMarkers();
        updateCategoryCounts();
      }
    });
  }

  function navigateSearch(dir) {
    if (!state.searchResults.length) return;
    state.selectedSearchIndex += dir;
    if (state.selectedSearchIndex < 0) state.selectedSearchIndex = state.searchResults.length - 1;
    if (state.selectedSearchIndex >= state.searchResults.length) state.selectedSearchIndex = 0;
    renderSearchResults(state.searchResults);
  }

  // Init
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  
  // Polling for localStorage changes (works for same-tab and cross-tab)
  let lastStoredHash = localStorage.getItem('topico_pois_hash');
  console.log('Initial hash:', lastStoredHash);
  setInterval(() => {
    const hash = localStorage.getItem('topico_pois_hash');
    console.log('Checking hash:', hash, 'vs', lastStoredHash);
    if (hash !== lastStoredHash) {
      console.log('Hash changed! Reloading markers...');
      lastStoredHash = hash;
      loadData();
      renderMarkers();
      updateCategoryCounts();
    }
  }, 2000);
})();