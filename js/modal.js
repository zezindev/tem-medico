import { verificarEstadoVazio } from './empty-state.js';

const btForm = document.querySelector('.bt-form');
const modal = document.getElementById('formModal');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('form');
const cardsContainer = document.querySelector('.card-container');

document.querySelector('.clean-button').addEventListener('click', () => {
    const form = document.getElementById('form');
    form.reset();
});

// Função para formatar o horário para o formato HH:MM
function formatHourInput(event) {
    let value = event.target.value;

    value = value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2, 4);
    }
    if (value.length > 5) {
        value = value.slice(0, 5);
    }
    event.target.value = value;
}

const startHoursField = document.getElementById('start-hours');
const endHoursField = document.getElementById('end-hours');
startHoursField.addEventListener('input', formatHourInput);
endHoursField.addEventListener('input', formatHourInput);

function formatCityName(city) {
    return city
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

function formatSpecialtyName(specialty) {
    if (!specialty) return '';
    return specialty
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/\b\p{L}/gu, char => char.toUpperCase());
}

btForm.addEventListener('click', () => {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
        modal.querySelector('.modal-content').style.animation = 'slide-in-content 0.5s ease-out forwards';
    }, 10);
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slide-out-content 0.5s ease-out forwards';
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }, 200);
});

function checkOtherPlan(select) {
    const otherPlanInput = document.getElementById("otherPlan");
    if (select.value === "outros") {
        otherPlanInput.style.display = "block";
    } else {
        otherPlanInput.style.display = "none";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const specialty = document.getElementById('specialty').value;
    const name = document.getElementById('name').value;
    const plans = document.getElementById('plans').value;
    const city = document.getElementById('city').value;
    const formattedCity = formatCityName(city);
    const formattedSpecialty = formatSpecialtyName(specialty);
    const startHours = document.getElementById('start-hours').value;
    const endHours = document.getElementById('end-hours').value;
    const clinic = document.getElementById('clinic').value;

    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];
    const photoUrl = photoFile ? URL.createObjectURL(photoFile) : './Assets/Avatar.png';

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', Math.random().toString(36).substr(2, 9));

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = formattedSpecialty;

    const doctorInfo = document.createElement('div');
    doctorInfo.classList.add('doctor-info');

    const doctorPhoto = document.createElement('img');
    doctorPhoto.src = photoUrl;
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
    planImage.src = `./assets/${plans}.png`;
    planImage.alt = plans;
    insuranceLogos.appendChild(planImage);

    cardBody.appendChild(insuranceLogos);

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');

    const location = document.createElement('div');
    location.classList.add('location');

    const locationIcon = document.createElement('img');
    locationIcon.src = 'assets/icons/local pin.svg';
    locationIcon.alt = 'Localização';

    const locationText = document.createElement('span');
    locationText.textContent = formattedCity;

    location.appendChild(locationIcon);
    location.appendChild(locationText);

    const scheduleDiv = document.createElement('div');
    scheduleDiv.classList.add('schedule');

    const clockIcon = document.createElement('img');
    clockIcon.src = 'assets/icons/clock.svg';
    clockIcon.alt = 'Horário';

    const scheduleText = document.createElement('span');
    scheduleText.textContent = `${startHours} - ${endHours}`;

    scheduleDiv.appendChild(clockIcon);
    scheduleDiv.appendChild(scheduleText);

    const clinicDiv = document.createElement('div');
    clinicDiv.classList.add('clinic');

    const clinicName = document.createElement('span');
    clinicName.textContent = clinic;

    clinicDiv.appendChild(clinicName);

    const scClDiv = document.createElement('div');
    scClDiv.classList.add('sc-cl');
    scClDiv.appendChild(scheduleDiv);
    scClDiv.appendChild(clinicDiv);

    cardFooter.appendChild(location);
    cardFooter.appendChild(scClDiv);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    cardsContainer.appendChild(card);
    form.reset(); // limpa o formulário se quiser
    verificarEstadoVazio(); // atualiza contador e exibe/esconde empty state


    // Fecha o modal e limpa o formulário
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    form.reset();      
});
