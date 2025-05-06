document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.querySelector(".date-text");

    // Define e insere a data atual no elemento .date-text
    const options = { day: "numeric", month: "long" };
    const today = new Date().toLocaleDateString("pt-BR", options);
    if (dateElement) {
        dateElement.textContent = today;
    }

    // Hover do ícone de calendário
    const menuDate = document.querySelector('.menu-date');
    if (menuDate) {
        const icon = menuDate.querySelector('.calendar-icon');

        if (icon) {
            menuDate.addEventListener('mouseenter', () => {
                icon.src = 'assets/icons/calendar-hover.svg';
            });

            menuDate.addEventListener('mouseleave', () => {
                icon.src = 'assets/icons/calendar.svg';
            });
        }
    }
});



