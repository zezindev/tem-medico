import { verificarEstadoVazio } from './empty-state.js';

const btForm = document.querySelector('.bt-form');
const modal = document.getElementById('formModal');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('form');
const cardsContainer = document.querySelector('.card-container');

document.querySelector('.clean-button').addEventListener('click', () => {
    form.reset();
});

// Máscara para telefone brasileiro
function formatPhoneInput(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }
    event.target.value = value;
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', formatPhoneInput);
}

// Máscara de horário
function formatHourInput(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + ':' + value.slice(2, 4);
    if (value.length > 5) value = value.slice(0, 5);
    event.target.value = value;
}

const startHoursField = document.getElementById('start-hours');
const endHoursField = document.getElementById('end-hours');
startHoursField.addEventListener('input', formatHourInput);
endHoursField.addEventListener('input', formatHourInput);

function formatCityName(city) {
    return city.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function formatSpecialtyName(specialty) {
    if (!specialty) return '';
    return specialty.toLowerCase().replace(/-/g, ' ').replace(/\b\p{L}/gu, char => char.toUpperCase());
}

btForm.addEventListener('click', () => {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
        modal.querySelector('.modal-content').style.animation = 'slide-in-content 0.5s ease-out forwards';
    }, 10);
    document.body.classList.add('modal-open');
});

closeBtn.addEventListener('click', () => {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slide-out-content 0.5s ease-out forwards';
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }, 200);
});

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
    const phone = document.getElementById('phone').value.replace(/\D/g, '');

    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', Math.random().toString(36).substr(2, 9));

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = formattedSpecialty;

    const doctorInfo = document.createElement('div');
    doctorInfo.classList.add('doctor-info');

    const doctorName = document.createElement('span');
    doctorName.textContent = name;

    // Exibe a imagem apenas se o usuário tiver enviado uma
    if (photoFile) {
        const photoUrl = URL.createObjectURL(photoFile);
        const doctorPhoto = document.createElement('img');
        doctorPhoto.src = photoUrl;
        doctorPhoto.alt = 'Foto do médico';
        doctorPhoto.classList.add('doctor-photo');
        doctorInfo.appendChild(doctorPhoto);
    }

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

    // Redireciona para WhatsApp ao clicar no card
    card.addEventListener('click', () => {
        window.open(`https://wa.me/55${phone}`, '_blank');
    });

    cardsContainer.appendChild(card);
    verificarEstadoVazio();
    form.reset();

    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
});

const formFields = [
    'specialty',
    'name',
    'plans',
    'city',
    'start-hours',
    'end-hours',
    'clinic',
    'phone'
].map(id => document.getElementById(id));

const submitButton = form.querySelector('button');

// Verifica se todos os campos estão preenchidos
function verificarCamposPreenchidos() {
    const todosPreenchidos = formFields.every(field => field && field.value.trim() !== '');
    
    if (todosPreenchidos) {
        submitButton.classList.add('enabled');
        submitButton.disabled = false;
    } else {
        submitButton.classList.remove('enabled');
        submitButton.disabled = true;
    }
}

// Verifica os campos em tempo real
formFields.forEach(field => {
    field.addEventListener('input', verificarCamposPreenchidos);
});

// Desabilita botão ao carregar página
window.addEventListener('DOMContentLoaded', () => {
    verificarCamposPreenchidos();
});
