document.addEventListener("DOMContentLoaded", () => {
  const openSearchBtn = document.getElementById("openSearchModalBtn");
  const closeSearchBtn = document.getElementById("closeSearchModalBtn");
  const searchModal = document.getElementById("searchModal");
  const modalContent = searchModal.querySelector(".search-modal-content");

  const animationDuration = 400; // tempo em milissegundos (0.4s)

  // Abrir modal
  openSearchBtn.addEventListener("click", () => {
    searchModal.style.display = "block";
    void searchModal.offsetWidth;

    searchModal.classList.add("show");
    modalContent.style.animation = `slide-in-search ${animationDuration}ms ease-out forwards`;
  });

  // Fechar modal
  closeSearchBtn.addEventListener("click", () => {
    modalContent.style.animation = `slide-out-search ${animationDuration}ms ease-out forwards`;

    setTimeout(() => {
      searchModal.classList.remove("show");
      searchModal.style.display = "none";
    }, animationDuration);
  });

  // Fechar clicando fora
  window.addEventListener("click", (event) => {
    if (event.target === searchModal) {
      closeSearchBtn.click();
    }
  });

  // 👇 Função adicional: troca do ícone no hover
  const searchTrigger = document.querySelector('.search-trigger');

  if (searchTrigger) {
    const icons = searchTrigger.querySelectorAll('img');
    const normalIcon = icons[0];
    const hoverIcon = icons[1];

    // Oculta o ícone hover inicialmente
    hoverIcon.style.display = 'none';

    searchTrigger.addEventListener('mouseenter', () => {
      normalIcon.style.display = 'none';
      hoverIcon.style.display = 'inline';
    });

    searchTrigger.addEventListener('mouseleave', () => {
      normalIcon.style.display = 'inline';
      hoverIcon.style.display = 'none';
    });
  }
});
