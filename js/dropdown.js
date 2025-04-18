const menuDate = document.querySelector('.menu-date');
const dropdownMenu = document.getElementById('dropdownMenu');

// Alterna o dropdown ao clicar no menu
menuDate.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita o fechamento imediato
  dropdownMenu.classList.toggle('hidden');
});

// Lógica ao clicar em uma opção do dropdown
document.querySelectorAll('#dropdownMenu li').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita o fechamento antes da seleção

    document.querySelectorAll('#dropdownMenu li').forEach(li => {
      li.classList.remove('active');
      li.querySelector('input').checked = false;
    });

    item.classList.add('active');
    item.querySelector('input').checked = true;

    const textoSelecionado = item.innerText;
    document.querySelector('.date-text').textContent = textoSelecionado;

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

