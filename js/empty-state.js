export function verificarEstadoVazio() {
    const container = document.querySelector('#card-container');
    const cards = container.querySelectorAll('.card');
    const emptyState = document.getElementById('empty-state');
    const contadorSection = document.querySelector('.counting-md');
    const contadorSpan = document.getElementById('medico-count');
  
    if (cards.length === 0) {
      emptyState.classList.remove('hidden');
      contadorSection.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      contadorSection.classList.remove('hidden');
      contadorSpan.textContent = cards.length;
    }
  }
  