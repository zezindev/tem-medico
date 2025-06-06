const menuDate = document.querySelector('.menu-date');
const dropdownMenu = document.getElementById('dropdownMenu');
const itens = document.querySelectorAll('#dropdownMenu li');
const dateText = document.querySelector('.date-text');

let itemSelecionado = document.querySelector('#dropdownMenu li.active');

// Alterna visibilidade do dropdown
menuDate.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('hidden');
});

// Clique nas opções
itens.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();

    if (item === itemSelecionado) {
      dropdownMenu.classList.add('hidden');
      return;
    }

    // Remove seleção anterior
    if (itemSelecionado) {
      itemSelecionado.classList.remove('active');
    }

    // Adiciona nova seleção
    item.classList.add('active');
    itemSelecionado = item;

    // Atualiza texto visível
    const texto = item.querySelector('span:last-child').textContent.trim();
    dateText.textContent = texto;

    dropdownMenu.classList.add('hidden');

    console.log(`Filtrar médicos para: ${item.getAttribute('data-dia')}`);
  });
});

// Fecha dropdown ao clicar fora
document.addEventListener('click', (e) => {
  if (!menuDate.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add('hidden');
  }
});
