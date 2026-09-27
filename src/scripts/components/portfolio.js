/**
 * Portfolio Filtering & Case Study Modal Controller
 */

// Structured Case Study Data
const caseStudies = {
  apex: {
    title: "Apex Supply Chain Solutions",
    category: "Business Website Concept",
    challenge: "B2B logistics firms often suffer from dated, slow websites that create distrust with potential enterprise partners.",
    approach: "Designed a clean, content-first architecture prioritizing service clarity, instant load speed, and direct quote requests.",
    tech: ["HTML5", "Tailwind CSS", "Vanilla ES6 JavaScript"],
    features: [
      "Sub-second LCP optimization",
      "Interactive quote requirement estimator UI",
      "Semantic microdata schema for freight services"
    ],
    outcome: "Demonstrates an enterprise-grade web structure capable of achieving 98+ Lighthouse scores across all metrics."
  },
  lumina: {
    title: "Lumina SaaS Platform",
    category: "Landing Page Concept",
    challenge: "Complex tech platforms often struggle with high drop-off rates due to overwhelming technical copy and poor UX hierarchy.",
    approach: "Structured a streamlined single-page sales funnel focusing on visual feature demos, social proof placement, and clear pricing options.",
    tech: ["Tailwind CSS", "Vanilla JavaScript", "Custom SVG Animations"],
    features: [
      "Accessible interactive feature previews",
      "Zero-layout-shift (CLS = 0) pricing toggle",
      "Keyboard-accessible modal video triggers"
    ],
    outcome: "Specimen design showcasing ideal lead-conversion hierarchy for modern software companies."
  },
  veloce: {
    title: "Veloce Artisan Bakery",
    category: "WordPress Custom Theme Concept",
    challenge: "Small food service businesses need simple content administration without incurring site bloat or slow WordPress plugin stacks.",
    approach: "Engineered a custom, lightweight WordPress theme built with Elementor compatibility while strictly enforcing asset minification.",
    tech: ["WordPress Core", "Elementor Pro", "Custom CSS Utilities"],
    features: [
      "Custom Post Types for weekly artisan menus",
      "Integrated Schema.org/Bakery structured metadata",
      "Mobile-optimized tap targets for mobile orders"
    ],
    outcome: "Proves WordPress sites can maintain sub-second loading performance when built with disciplined code practices."
  }
};

export function initPortfolio() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.portfolio-card');
  const modal = document.getElementById('case-study-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCategory = document.getElementById('modal-category');
  const closeBtns = [document.getElementById('close-modal-btn'), document.getElementById('modal-bottom-close')];
  const openModalBtns = document.querySelectorAll('.open-case-study-btn');

  if (!modal || !modalBody) return;

  // Filter Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update Active Styles
      filterBtns.forEach(b => {
        b.classList.remove('active-filter', 'bg-brand-ink', 'text-brand-bg');
        b.classList.add('bg-brand-surface', 'text-brand-ink');
      });
      btn.classList.add('active-filter', 'bg-brand-ink', 'text-brand-bg');
      btn.classList.remove('bg-brand-surface');

      // Filter Cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Open Modal Logic
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = caseStudies[key];

      if (!data) return;

      modalCategory.textContent = data.category;
      modalBody.innerHTML = `
        <h3 id="modal-title" class="text-2xl font-bold text-brand-ink">${data.title}</h3>
        
        <div class="space-y-4 text-sm text-brand-ink/90">
          <div>
            <h4 class="font-bold text-brand-ink text-xs uppercase tracking-wider mb-1">The Challenge</h4>
            <p class="leading-relaxed">${data.challenge}</p>
          </div>

          <div>
            <h4 class="font-bold text-brand-ink text-xs uppercase tracking-wider mb-1">Engineering & Design Approach</h4>
            <p class="leading-relaxed">${data.approach}</p>
          </div>

          <div>
            <h4 class="font-bold text-brand-ink text-xs uppercase tracking-wider mb-1">Key Technical Features</h4>
            <ul class="list-disc pl-5 space-y-1">
              ${data.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-brand-ink text-xs uppercase tracking-wider mb-1">Technology Stack</h4>
            <div class="flex flex-wrap gap-2 mt-1">
              ${data.tech.map(t => `<span class="px-2 py-1 bg-brand-surface border border-brand-border rounded text-xs font-mono text-brand-dark">${t}</span>`).join('')}
            </div>
          </div>

          <div class="p-4 bg-brand-surface border border-brand-border rounded">
            <h4 class="font-bold text-brand-ink text-xs uppercase tracking-wider mb-1">Target Technical Outcome</h4>
            <p class="text-xs text-brand-dark leading-relaxed">${data.outcome}</p>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      closeBtns[0]?.focus();
    });
  });

  // Close Modal Handler
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  closeBtns.forEach(btn => btn?.addEventListener('click', closeModal));

  // Close on ESC key or background click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}