(function() {
  'use strict';

  // ==================== State ====================
  const state = {
    pois: [],
    categories: {},
    editingId: null,
    deletingId: null,
    sortColumn: 'nombre',
    sortAsc: true,
    filters: {
      search: '',
      floor: 'all',
      category: 'all'
    }
  };

  // ==================== DOM Elements ====================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const elements = {
    app: $('#adminApp'),
    tableBody: $('#poiTableBody'),
    emptyState: $('#emptyState'),
    tableContainer: $('.admin-table-container'),
    searchInput: $('#adminSearchInput'),
    filterFloor: $('#filterFloor'),
    filterCategory: $('#filterCategory'),
    importBtn: $('#importBtn'),
    exportBtn: $('#exportBtn'),
    addPOIBtn: $('#addPOIBtn'),
    emptyAddBtn: $('#emptyAddBtn'),
    poiModal: $('#poiModal'),
    modalBackdrop: $('#modalBackdrop'),
    modalClose: $('#modalClose'),
    modalTitle: $('#modalTitle'),
    poiForm: $('#poiForm'),
    cancelBtn: $('#cancelBtn'),
    deleteModal: $('#deleteModal'),
    deleteBackdrop: $('#deleteBackdrop'),
    cancelDeleteBtn: $('#cancelDeleteBtn'),
    confirmDeleteBtn: $('#confirmDeleteBtn'),
    deletePoiName: $('#deletePoiName'),
    importFile: $('#importFile')
  };

  // ==================== Initialization ====================
  function init() {
    loadData();
    renderTable();
    bindEvents();
  }

  function loadData() {
    if (typeof getPOIData === 'function') {
      state.pois = [...getPOIData()];
    }
    if (typeof getCategories === 'function') {
      state.categories = getCategories();
    }
  }

  function saveData() {
    if (typeof POI_DATA !== 'undefined') {
      POI_DATA.length = 0;
      POI_DATA.push(...state.pois);
    }
  }

  // ==================== Rendering ====================
  function renderTable() {
    const filtered = getFilteredPOIs();
    const sorted = sortPOIs(filtered);
    
    if (sorted.length === 0) {
      elements.tableContainer.style.display = 'none';
      elements.emptyState.style.display = 'block';
      return;
    }

    elements.tableContainer.style.display = 'block';
    elements.emptyState.style.display = 'none';

    elements.tableBody.innerHTML = sorted.map(poi => `
      <tr data-id="${poi.id}">
        <td><code>${poi.id}</code></td>
        <td><strong>${poi.nombre}</strong></td>
        <td><span class="floor-badge">Piso ${poi.piso}</span></td>
        <td><span class="category-badge ${poi.categoria}">${state.categories[poi.categoria]?.label || poi.categoria}</span></td>
        <td class="truncate" style="max-width: 200px;">${poi.detalles || '-'}</td>
        <td><code>${poi.coordenadas.x}, ${poi.coordenadas.y}</code></td>
        <td>
          <button class="visibility-toggle ${poi.visible ? 'active' : ''}" data-id="${poi.id}" aria-label="Toggle visibility">
          </button>
        </td>
        <td>
          <div class="admin-table-actions">
            <button class="admin-btn admin-btn-icon admin-btn-outline edit-btn" data-id="${poi.id}" aria-label="Editar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="admin-btn admin-btn-icon admin-btn-outline delete-btn" data-id="${poi.id}" aria-label="Eliminar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function getFilteredPOIs() {
    return state.pois.filter(poi => {
      const searchMatch = !state.filters.search || 
        poi.nombre.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        poi.id.toLowerCase().includes(state.filters.search.toLowerCase());
      
      const floorMatch = state.filters.floor === 'all' || poi.piso === parseInt(state.filters.floor);
      const categoryMatch = state.filters.category === 'all' || poi.categoria === state.filters.category;
      
      return searchMatch && floorMatch && categoryMatch;
    });
  }

  function sortPOIs(pois) {
    return [...pois].sort((a, b) => {
      let aVal = a[state.sortColumn];
      let bVal = b[state.sortColumn];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return state.sortAsc ? -1 : 1;
      if (aVal > bVal) return state.sortAsc ? 1 : -1;
      return 0;
    });
  }

  // ==================== Modal ====================
  function openModal(poi = null) {
    state.editingId = poi?.id || null;
    
    elements.modalTitle.textContent = poi ? 'Editar Punto de Interés' : 'Nuevo Punto de Interés';
    
    $('#poiId').value = poi?.id || '';
    $('#poiNombre').value = poi?.nombre || '';
    $('#poiPiso').value = poi?.piso || '';
    $('#poiCategoria').value = poi?.categoria || '';
    $('#poiDetalles').value = poi?.detalles || '';
    $('#poiCoordX').value = poi?.coordenadas?.x || '';
    $('#poiCoordY').value = poi?.coordenadas?.y || '';
    $('#poiVisible').checked = poi?.visible !== false;
    
    if (poi) {
      $('#poiId').readOnly = true;
    } else {
      $('#poiId').readOnly = false;
    }
    
    elements.poiModal.classList.add('visible');
    $('#poiNombre').focus();
  }

  function closeModal() {
    state.editingId = null;
    elements.poiModal.classList.remove('visible');
    elements.poiForm.reset();
  }

  function openDeleteModal(poi) {
    state.deletingId = poi.id;
    elements.deletePoiName.textContent = poi.nombre;
    elements.deleteModal.classList.add('visible');
  }

  function closeDeleteModal() {
    state.deletingId = null;
    elements.deleteModal.classList.remove('visible');
  }

  function confirmDelete() {
    if (!state.deletingId) return;
    
    state.pois = state.pois.filter(poi => poi.id !== state.deletingId);
    saveData();
    renderTable();
    closeDeleteModal();
    showToast('POI eliminado correctamente', 'success');
  }

  // ==================== CRUD ====================
  function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
      id: $('#poiId').value.trim() || generateId($('#poiNombre').value),
      nombre: $('#poiNombre').value.trim(),
      piso: parseInt($('#poiPiso').value),
      categoria: $('#poiCategoria').value,
      detalles: $('#poiDetalles').value.trim(),
      coordenadas: {
        x: parseInt($('#poiCoordX').value),
        y: parseInt($('#poiCoordY').value)
      },
      visible: $('#poiVisible').checked
    };
    
    if (state.editingId) {
      const index = state.pois.findIndex(p => p.id === state.editingId);
      if (index !== -1) {
        state.pois[index] = { ...state.pois[index], ...formData };
      }
      showToast('POI actualizado correctamente', 'success');
    } else {
      if (state.pois.some(p => p.id === formData.id)) {
        showToast('Ya existe un POI con ese ID', 'error');
        return;
      }
      state.pois.push(formData);
      showToast('POI creado correctamente', 'success');
    }
    
    saveData();
    renderTable();
    closeModal();
  }

  function generateId(name) {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .substring(0, 30);
  }

  function toggleVisibility(poiId) {
    const poi = state.pois.find(p => p.id === poiId);
    if (poi) {
      poi.visible = !poi.visible;
      saveData();
      renderTable();
      showToast(poi.visible ? 'POI visible' : 'POI oculto', 'success');
    }
  }

  // ==================== Import/Export ====================
  function exportData() {
    const data = JSON.stringify(state.pois, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pois.json';
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('Datos exportados correctamente', 'success');
  }

  function importData(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        
        if (!Array.isArray(data)) {
          throw new Error('Formato inválido');
        }
        
        state.pois = data;
        saveData();
        renderTable();
        showToast(`${data.length} POI importados`, 'success');
      } catch (err) {
        showToast('Error al importar: formato inválido', 'error');
      }
    };
    
    reader.readAsText(file);
  }

  // ==================== Toast ====================
  function showToast(message, type = 'success') {
    const existing = $('.admin-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `admin-toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  }

  // ==================== Events ====================
  function bindEvents() {
    elements.searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      renderTable();
    });
    
    elements.filterFloor.addEventListener('change', (e) => {
      state.filters.floor = e.target.value;
      renderTable();
    });
    
    elements.filterCategory.addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      renderTable();
    });
    
    elements.addPOIBtn.addEventListener('click', () => openModal());
    elements.emptyAddBtn.addEventListener('click', () => openModal());
    
    elements.modalBackdrop.addEventListener('click', closeModal);
    elements.modalClose.addEventListener('click', closeModal);
    elements.cancelBtn.addEventListener('click', closeModal);
    
    elements.poiForm.addEventListener('submit', handleSubmit);
    
    elements.tableBody.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.edit-btn');
      const deleteBtn = e.target.closest('.delete-btn');
      const visibilityBtn = e.target.closest('.visibility-toggle');
      
      if (editBtn) {
        const poi = state.pois.find(p => p.id === editBtn.dataset.id);
        if (poi) openModal(poi);
      }
      
      if (deleteBtn) {
        const poi = state.pois.find(p => p.id === deleteBtn.dataset.id);
        if (poi) openDeleteModal(poi);
      }
      
      if (visibilityBtn) {
        toggleVisibility(visibilityBtn.dataset.id);
      }
    });
    
    elements.deleteBackdrop.addEventListener('click', closeDeleteModal);
    elements.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    elements.confirmDeleteBtn.addEventListener('click', confirmDelete);
    
    elements.exportBtn.addEventListener('click', exportData);
    
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        importData(e.target.files[0]);
        e.target.value = '';
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeDeleteModal();
      }
    });
  }

  // ==================== Initialize ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();