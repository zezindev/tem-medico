document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.querySelector(".date-text");

    const options = { day: "numeric", month: "long" };
    const today = new Date().toLocaleDateString("pt-BR", options);

    dateElement.textContent = today; // Atualiza o texto com a data atual
});
