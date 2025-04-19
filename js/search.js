document.addEventListener("DOMContentLoaded", () => {
  const openSearchBtn = document.getElementById("openSearchModalBtn");
  const closeSearchBtn = document.getElementById("closeSearchModalBtn");
  const searchModal = document.getElementById("searchModal");
  const modalContent = searchModal.querySelector(".search-modal-content");

  const animationDuration = 400; // tempo em milissegundos (0.4s)

  openSearchBtn.addEventListener("click", () => {
    searchModal.style.display = "block";
    void searchModal.offsetWidth;

    searchModal.classList.add("show");
    modalContent.style.animation = `slide-in-search ${animationDuration}ms ease-out forwards`;
  });

  closeSearchBtn.addEventListener("click", () => {
    modalContent.style.animation = `slide-out-search ${animationDuration}ms ease-out forwards`;

    setTimeout(() => {
      searchModal.classList.remove("show");
      searchModal.style.display = "none";
    }, animationDuration);
  });

  window.addEventListener("click", (event) => {
    if (event.target === searchModal) {
      closeSearchBtn.click();
    }
  });
});
