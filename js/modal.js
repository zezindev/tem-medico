const btForm = document.querySelector('.bt-form');
const modal = document.getElementById('formModal');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('form');
const cardsContainer = document.querySelector('.card-container');

// Função para formatar o horário para o formato HH:MM
function formatHourInput(event) {
    let value = event.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Adiciona o separador ":" após os dois primeiros dígitos
    if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2, 4);
    }

    // Limita o valor para 5 caracteres (HH:MM)
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

// Função para formatar o nome da cidade corretamente
function formatCityName(city) {
    return city
        .replace(/-/g, ' ') // Substitui hífens por espaços
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza cada palavra
}

// Função para formatar a especialidade corretamente (capitalize cada palavra)
function formatSpecialtyName(specialty) {
    if (!specialty) return ''; // Se a especialidade for undefined ou null, retorna string vazia
    return specialty
        .toLowerCase() // Garante que todas as letras comecem minúsculas
        .replace(/-/g, ' ') // Substitui hífens por espaços
        .replace(/\b\p{L}/gu, char => char.toUpperCase()); // Capitaliza cada palavra, suportando caracteres acentuados
}

// Abrir o modal com animação suave
btForm.addEventListener('click', () => {
    modal.style.display = 'block';
    modal.style.animation = "slide-in 0.5s ease-out forwards";
    document.body.classList.add("modal-open"); // Impede o scroll quando o modal estiver aberto
    document.body.style.overflow = 'hidden';  // Desativa o scroll quando o modal está visível
});

// Fechar o modal com animação suave
closeBtn.addEventListener('click', () => {
    modal.style.animation = "slide-out 0.5s ease-in forwards";
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove("modal-open");
        document.body.style.overflow = ''; // Restaura o scroll após o modal ser fechado
    }, 500);
});

// Função para verificar se o usuário escolheu "Outros" no select de planos e exibir o campo adicional
function checkOtherPlan(select) {
    const otherPlanInput = document.getElementById("otherPlan");
    if (select.value === "outros") {
        otherPlanInput.style.display = "block";
    } else {
        otherPlanInput.style.display = "none";
    }
}

// Submeter o formulário e criar o card
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar o envio tradicional do formulário

    // Pegar as informações do formulário
    const specialty = document.getElementById('specialty').value;
    const name = document.getElementById('name').value;
    const plans = document.getElementById('plans').value;
    const city = document.getElementById('city').value;
    const formattedCity = formatCityName(city); // Formata a cidade corretamente
    const formattedSpecialty = formatSpecialtyName(specialty); // Aplica a formatação correta à especialidade
    const startHours = document.getElementById('start-hours').value;
    const endHours = document.getElementById('end-hours').value;
    const clinic = document.getElementById('clinic').value;

    // Pegar a foto do médico (se houver)
    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];
    const photoUrl = photoFile ? URL.createObjectURL(photoFile) : './Assets/Avatar.png'; // Caso não tenha foto, usa a foto padrão

    // Criar o card
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = formattedSpecialty; // ✅ Exibe a especialidade formatada corretamente

    const doctorInfo = document.createElement('div');
    doctorInfo.classList.add('doctor-info');

    const doctorPhoto = document.createElement('img');
    doctorPhoto.src = photoUrl; // Usa a foto do arquivo ou a padrão
    doctorPhoto.alt = 'Foto do médico';
    doctorPhoto.classList.add('doctor-photo');

    const doctorName = document.createElement('span');
    doctorName.textContent = name;

    doctorInfo.appendChild(doctorPhoto);
    doctorInfo.appendChild(doctorName);

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(doctorInfo);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const insuranceLogos = document.createElement('div');
    insuranceLogos.classList.add('insurance-logos');
    const planImage = document.createElement('img');
    planImage.src = `./Assets/${plans}.png`; // Certifique-se de que as imagens dos planos de saúde estão no diretório correto
    planImage.alt = plans;
    insuranceLogos.appendChild(planImage);

    cardBody.appendChild(insuranceLogos);

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');

    const location = document.createElement('div');
    location.classList.add('location');
    const locationIcon = document.createElement('i');
    locationIcon.classList.add('bi', 'bi-geo-alt');
    const locationText = document.createElement('span');
    locationText.textContent = formattedCity; // Usa o nome formatado da cidade
    location.appendChild(locationIcon);
    location.appendChild(locationText);

    const scCl = document.createElement('div');
    scCl.classList.add('sc-cl');

    const schedule = document.createElement('div');
    schedule.classList.add('schedule');
    const scheduleIcon = document.createElement('i');
    scheduleIcon.classList.add('bi', 'bi-alarm');
    const scheduleText = document.createElement('span');
    scheduleText.textContent = `${startHours} - ${endHours}`;
    schedule.appendChild(scheduleIcon);
    schedule.appendChild(scheduleText);

    const clinicInfo = document.createElement('div');
    clinicInfo.classList.add('clinic');
    const clinicText = document.createElement('span');
    clinicText.textContent = clinic;
    clinicInfo.appendChild(clinicText);

    scCl.appendChild(schedule);
    scCl.appendChild(clinicInfo);

    cardFooter.appendChild(location);
    cardFooter.appendChild(scCl);

    // Adicionar o header, body e footer ao card
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    // Adicionar o card à área de cards
    cardsContainer.appendChild(card);

    // Fechar o modal
    modal.style.display = 'none';

    // Restaurar o scroll
    document.body.style.overflow = 'auto'; // Restaura o scroll da página

    // Limpar o formulário
    form.reset();
});
