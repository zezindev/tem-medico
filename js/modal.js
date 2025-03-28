const btForm = document.querySelector('.bt-form');
const modal = document.getElementById('formModal');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('form');
const cardsContainer = document.getElementById('cards-container');

// Função para formatar o horário para o formato HH:MM
function formatHourInput(event) {
    let value = event.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Adiciona o separador ":" após os dois primeiros dígitos
    if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2, 4);
    }

    // Limita o valor para 4 caracteres (HH:MM)
    if (value.length > 5) {
        value = value.slice(0, 5);
    }

    // Atualiza o valor do campo
    event.target.value = value;
}

// Seleciona os campos de horário
const startHoursField = document.getElementById('start-hours');
const endHoursField = document.getElementById('end-hours');

// Adiciona o evento de input nos campos de horário
startHoursField.addEventListener('input', formatHourInput);
endHoursField.addEventListener('input', formatHourInput);

// Abrir o modal
btForm.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fechar o modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Submeter o formulário e criar o card
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar o envio tradicional do formulário

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Criar o card
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;

    const cardDescription = document.createElement('p');
    cardDescription.textContent = description;

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);

    // Adicionar o card à área de cards
    cardsContainer.appendChild(card);

    // Fechar o modal
    modal.style.display = 'none';

    // Limpar o formulário
    form.reset();
});
