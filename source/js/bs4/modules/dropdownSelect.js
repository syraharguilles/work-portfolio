'use strict';

const dropdownSelectClass ='js-dropdown-select',
    dropdownSelectButtonClass = 'js-dropdown-select-button',
    dropdownSelectOptionClass = 'js-dropdown-select-option';

Array
    .from(document.querySelectorAll(`.${dropdownSelectClass}`))
    .forEach(dropdownSelect => {
        
        const dropdownSelectButton = dropdownSelect.querySelector(`.${dropdownSelectButtonClass}`);

        Array
            .from(dropdownSelect.querySelectorAll(`.${dropdownSelectOptionClass}`))
            .forEach(dropdownSelectOption => {
                dropdownSelectOption.addEventListener('click', () => {
                    dropdownSelectButton.innerHTML = dropdownSelectOption.innerHTML;
                });
            });

    });