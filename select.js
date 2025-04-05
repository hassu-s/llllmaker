document.addEventListener('DOMContentLoaded', () => {
    const originalSelect = document.querySelector('.original-select');
    const customSelect = document.querySelector('.custom-select');
    const selectedOption = customSelect.querySelector('.selected-option');
    const optionsList = customSelect.querySelector('.options');
  
    selectedOption.addEventListener('click', () => {
      optionsList.style.display =
        optionsList.style.display === 'block' ? 'none' : 'block';
    });
  
    optionsList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const value = event.target.getAttribute('data-value');
        selectedOption.textContent = event.target.textContent;
        originalSelect.value = value;
        optionsList.style.display = 'none';
  
        console.log('選択された値:', originalSelect.value);
      }
    });
  
    originalSelect.addEventListener('change', () => {
      const value = originalSelect.value;
      const customOption = Array.from(optionsList.children).find(
        (option) => option.getAttribute('data-value') === value
      );
      if (customOption) {
        selectedOption.textContent = customOption.textContent;
      }
    });
  
    document.addEventListener('click', (event) => {
      if (!customSelect.contains(event.target)) {
        optionsList.style.display = 'none';
      }
    });
  });
  