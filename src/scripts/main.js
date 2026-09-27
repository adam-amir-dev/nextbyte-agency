import { initNavigation } from './components/navigation.js';
import { initPortfolio } from './components/portfolio.js';
import { initForm } from './components/form.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPortfolio();
  initForm();
});