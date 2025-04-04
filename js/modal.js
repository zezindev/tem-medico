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
        .replace(/\b\p{L}/gu, char => char.toUpperCase()); // Capitaliza cada palavra
}

// Abrir o modal com animação suave
btForm.addEventListener('click', () => {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show'); // Ativa o fade-in do fundo
        modal.querySelector('.modal-content').style.animation = 'slide-in-content 0.5s ease-out forwards'; // Animação do conteúdo
    }, 10); // Pequeno atraso para garantir que o display 'block' tenha efeito antes da animação
    document.body.classList.add('modal-open'); // Impede o scroll quando o modal estiver aberto
    document.body.style.overflow = 'hidden'; // Desativa o scroll quando o modal está visível
});

// Fechar o modal com animação suave
closeBtn.addEventListener('click', () => {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slide-out-content 0.5s ease-out forwards'; // Animação de saída do conteúdo

    // Esconde o modal após a animação terminar 
    setTimeout(() => {
        modal.classList.remove('show'); // Remove o fade-in do fundo
        modal.style.display = 'none'; // Esconde o modal
        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; // Restaura o scroll após o modal ser fechado
    }, 200); // Tempo da animação (0.5s)
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

    // Criando a localização (com ícone de pin)
    const location = document.createElement('div');
    location.classList.add('location');

    const locationIcon = document.createElement('img');
    locationIcon.src = 'Assets/Icons/local pin.svg';  // Caminho para o ícone
    locationIcon.alt = 'Localização';  // Texto alternativo para o ícone

    const locationText = document.createElement('span');
    locationText.textContent = formattedCity;  // Cidade formatada

    location.appendChild(locationIcon);
    location.appendChild(locationText);  // Adiciona o ícone e o texto à localização

    // Criando a seção de horário e clínica
    const scheduleDiv = document.createElement('div');
    scheduleDiv.classList.add('schedule');

    const clockIcon = document.createElement('img');
    clockIcon.src = 'Assets/Icons/clock.svg';  // Caminho para o ícone de relógio
    clockIcon.alt = 'Horário';  // Texto alternativo para o ícone de relógio

    const scheduleText = document.createElement('span');
    scheduleText.textContent = `${startHours} - ${endHours}`;  // Exibe o horário

    scheduleDiv.appendChild(clockIcon);
    scheduleDiv.appendChild(scheduleText);  // Adiciona o ícone e o horário

    const clinicDiv = document.createElement('div');
    clinicDiv.classList.add('clinic');

    const clinicName = document.createElement('span');
    clinicName.textContent = clinic;  // Nome da clínica

    clinicDiv.appendChild(clinicName);  // Adiciona o nome da clínica

    const scClDiv = document.createElement('div');
    scClDiv.classList.add('sc-cl');
    scClDiv.appendChild(scheduleDiv);
    scClDiv.appendChild(clinicDiv);

    // Adicionando todos os elementos ao cardFooter
    cardFooter.appendChild(location);
    cardFooter.appendChild(scClDiv);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    cardsContainer.appendChild(card); // Adiciona o novo card à página

    // Fechar o modal
    closeBtn.click(); // Simula um clique no botão de fechar
});
