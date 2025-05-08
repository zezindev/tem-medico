document.addEventListener("DOMContentLoaded", () => {
  const openAboutBtn = document.querySelector(".about");
  const closeAboutBtn = document.getElementById("closeAboutModalBtn");
  const aboutModal = document.getElementById("aboutModal");
  const modalContent = aboutModal.querySelector(".about-modal-content");

  const animationDuration = 400;

  openAboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    aboutModal.style.display = "block";
    void aboutModal.offsetWidth;

    // Desativa scroll da página
    document.body.style.overflow = 'hidden';

    aboutModal.classList.add("show");
    modalContent.style.animation = `slide-in-about ${animationDuration}ms ease-out forwards`;
  });

  closeAboutBtn.addEventListener("click", () => {
    modalContent.style.animation = `slide-out-about ${animationDuration}ms ease-out forwards`;
    setTimeout(() => {
      aboutModal.classList.remove("show");
      aboutModal.style.display = "none";

      // Restaura scroll da página
      document.body.style.overflow = '';
    }, animationDuration);
  });

  window.addEventListener("click", (event) => {
    if (event.target === aboutModal) {
      closeAboutBtn.click();
    }
  });
});
