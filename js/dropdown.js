const menuDate = document.querySelector('.menu-date');
const dropdownMenu = document.getElementById('dropdownMenu');
const itens = document.querySelectorAll('#dropdownMenu li');
const dateText = document.querySelector('.date-text');

// Alterna o dropdown ao clicar no menu
menuDate.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita o fechamento imediato
  dropdownMenu.classList.toggle('hidden');
});

// Lógica ao clicar em uma opção do dropdown
itens.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();

    // Remove active e uncheck apenas dos outros itens
    itens.forEach(li => {
      if (li !== item) {
        li.classList.remove('active');
        li.querySelector('input').checked = false;
      }
    });

    // Marca o item clicado como ativo
    item.classList.add('active');
    item.querySelector('input').checked = true;

    // Atualiza o texto
    dateText.textContent = item.innerText;

    // Fecha o dropdown
    dropdownMenu.classList.add('hidden');

    // Aqui você pode chamar sua função de filtragem
    console.log(`Filtrar médicos para: ${item.getAttribute('data-dia')}`);
  });
});

// Fecha o dropdown ao clicar fora dele e do botão
document.addEventListener('click', (e) => {
  if (!menuDate.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add('hidden');
  }
});
