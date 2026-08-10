/**
 * Work Grid Module — Asymmetrical Portfolio Showcase & List/Grid View Toggle
 */

const PROJECTS = [
  {
    id: 'deviate',
    title: 'DEVIATE',
    client: 'PUMA',
    year: '2025',
    category: 'film',
    gradient: ['#1e293b', '#0f172a'],
    accent: '#ef4444',
  },
  {
    id: '80-winters',
    title: '80 WINTERS',
    client: 'AUCLAIR',
    year: '2025',
    category: 'photography',
    gradient: ['#334155', '#1e293b'],
    accent: '#38bdf8',
  },
  {
    id: 'milimani',
    title: 'MILIMANI',
    client: 'SALOMON',
    year: '2025',
    category: 'film',
    gradient: ['#451a03', '#1c1917'],
    accent: '#f97316',
  },
  {
    id: 'not-quite-gone',
    title: 'NOT QUITE GONE',
    client: 'LE BRAQUET CYCLING',
    year: '2026',
    category: 'commercial',
    gradient: ['#854d0e', '#3f2c06'],
    accent: '#eab308',
  },
  {
    id: 'apex-runner',
    title: 'APEX RUNNER',
    client: 'NIKE',
    year: '2025',
    category: 'commercial',
    gradient: ['#065f46', '#022c22'],
    accent: '#10b981',
  },
  {
    id: 'kinetic-edge',
    title: 'KINETIC EDGE',
    client: 'OAKLEY',
    year: '2026',
    category: 'photography',
    gradient: ['#581c87', '#3b0764'],
    accent: '#a855f7',
  },
];

export function initWorkGrid() {
  const gridEl = document.getElementById('work-grid');
  const viewToggleBtn = document.getElementById('view-toggle');
  const viewToggleText = document.getElementById('view-toggle-text');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!gridEl) return;

  let currentView = 'grid'; // 'grid' or 'list'
  let currentFilter = 'all';

  /**
   * Render Card Canvas Thumbnail Animation
   */
  function createCardCanvas(project) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    let time = Math.random() * 10;

    function render() {
      time += 0.03;
      ctx.clearRect(0, 0, 400, 300);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 400, 300);
      grad.addColorStop(0, project.gradient[0]);
      grad.addColorStop(1, project.gradient[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 300);

      // Dynamic graphic shapes (Sports motion effect)
      ctx.strokeStyle = project.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const y = 80 + i * 35 + Math.sin(time + i) * 12;
        ctx.moveTo(30, y);
        ctx.lineTo(370, y - 20);
      }
      ctx.stroke();

      // Bold Title watermark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.font = '900 36px Syne, sans-serif';
      ctx.fillText(project.title, 20, 260);

      requestAnimationFrame(render);
    }

    render();
    return canvas;
  }

  /**
   * Render Projects into Grid/List DOM
   */
  function renderProjects() {
    gridEl.innerHTML = '';

    const filtered = PROJECTS.filter((p) => currentFilter === 'all' || p.category === currentFilter);

    filtered.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.id = p.id;

      if (currentView === 'grid') {
        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = 'project-media-wrapper';
        mediaWrapper.appendChild(createCardCanvas(p));
        card.appendChild(mediaWrapper);
      }

      const info = document.createElement('div');
      info.className = 'project-info';
      info.innerHTML = `
        <h3 class="project-title">${p.title}</h3>
        <span class="project-meta">${p.year} &nbsp; ${p.client}</span>
      `;
      card.appendChild(info);

      gridEl.appendChild(card);
    });
  }

  // Filter Buttons Click
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProjects();
    });
  });

  // View Toggle Button (LIST VIEW vs GRID VIEW)
  if (viewToggleBtn && viewToggleText) {
    viewToggleBtn.addEventListener('click', () => {
      if (currentView === 'grid') {
        currentView = 'list';
        gridEl.classList.remove('grid-mode');
        gridEl.classList.add('list-mode');
        viewToggleText.textContent = 'GRID VIEW';
      } else {
        currentView = 'grid';
        gridEl.classList.remove('list-mode');
        gridEl.classList.add('grid-mode');
        viewToggleText.textContent = 'LIST VIEW';
      }
      renderProjects();
    });
  }

  // Initial render
  renderProjects();
}
