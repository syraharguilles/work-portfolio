'use strict';

const filterFormClass = 'js-filter-form',
    filterSelectClass = 'js-filter-select',
    filterSelectOptionClass = 'js-filter-select-option',
    filterForm = document.querySelector(`.${filterFormClass}`);

if(filterForm) {
    Array
        .from(filterForm.querySelectorAll(`.${filterSelectClass}`))
        .forEach(filterSelect => {

            Array
                .from(filterSelect.querySelectorAll(`.${filterSelectOptionClass}`))
                .forEach(filterSelectOption => {
                    filterSelectOption.addEventListener('click', () => {
                        
                        const dataValue = filterSelectOption.getAttribute('data-value'),
                            filterRadioGroup = document.querySelector(`.${filterRadioGroupClass}[data-filter-name=${filterSelect.getAttribute('data-input-name')}]`);

                        filterForm
                            .querySelector(`[name=${filterSelect.getAttribute('data-input-name')}]`)
                            .value = dataValue;

                        filterRadioGroup
                            .querySelector('[type=checkbox]:checked')
                            .checked = false;

                        filterRadioGroup
                            .querySelector(`[type=checkbox][value='${dataValue}']`)
                            .checked = true;
                    });
                });
        });
}


const formResettableClass = 'js-form-resettable',
    formResettableInputClass = 'js-form-resettable-input',
    formResettableSelectButtonClass = 'js-form-resettable-select-button',
    formResettableButtonClass = 'js-form-resettable-button',
    formResettableRadioGroupClass = 'js-form-resettable-radio-group',
    formResettable = document.querySelector(`.${formResettableClass}`);

Array
    .from(document.querySelectorAll(`.${formResettableButtonClass}`))
    .forEach(formResettableButton => {

        formResettableButton.addEventListener('click', () => {

            Array
                .from(formResettable.querySelectorAll(`.${formResettableInputClass}`))
                .forEach(formResettableInput => {
                    formResettableInput.value = formResettableInput.getAttribute('data-default-value');
                });

            Array
                .from(formResettable.querySelectorAll(`.${formResettableSelectButtonClass}`))
                .forEach(formResettableSelectButton => {
                    formResettableSelectButton.innerHTML = formResettableSelectButton.getAttribute('data-default-value');
                });

            Array
                .from(document.querySelectorAll(`.${formResettableRadioGroupClass}`))
                .forEach(formResettableRadioGroup => {
                    
                    formResettableRadioGroup
                        .querySelector('[type=checkbox]:checked')
                        .checked = false;
                    
                    formResettableRadioGroup
                        .querySelector(`[type=checkbox][value='${formResettableRadioGroup.getAttribute('data-default-value')}']`)
                        .checked = true;
                });

        });

    });


const filterRadioGroupClass = 'js-filter-radio-group',
    filterRadioClass = 'js-filter-radio';

let filterRadios;

Array
    .from(document.querySelectorAll(`.${filterRadioGroupClass}`))
    .forEach(filterRadioGroup => {
        
        filterRadios = Array.from(filterRadioGroup.querySelectorAll(`.${filterRadioClass}`));

        filterRadios.forEach(filterRadio => {

            const radios = filterRadios;

            filterRadio.addEventListener('click', (ev) => {
                
                const radio = ev.currentTarget,
                    parentRadioGroup = filterRadioGroup;

                if(radio.checked) {

                    const filterName = filterRadioGroup.getAttribute('data-filter-name');

                    filterForm
                        .querySelector(`[name=${filterName}]`)
                        .value = radio.value;

                    filterForm
                        .querySelector(`[data-filter-name=${filterName}]`)
                        .innerHTML = radio.getAttribute('data-label');

                    Array
                        .from(parentRadioGroup.querySelectorAll(`.${filterRadioClass}:checked`))
                        .forEach(checkedRadio => {
                            if(radio !== checkedRadio) {
                                checkedRadio.checked = false;
                            }
                        });
                }
                else {
                    ev.preventDefault();
                }
            });
        });
    });


const filterApplyClass = 'js-filter-apply',
    filterApply = document.querySelector(`.${filterApplyClass}`);

if(filterApply) {
    
    filterApply
        .addEventListener('click', () => {
            filterForm.submit();
        });
}

const paginationPrevClass = 'js-pagination-prev',
	paginationNextClass = 'js-pagination-next',
	paginationPageClass = 'js-pagination-page';

const paginationHandler = ( e ) => {

	if (e.currentTarget.hasAttribute('data-author-type')) {
		filterForm
			.querySelector('[name=_type]')
			.value = e.currentTarget.getAttribute('data-author-type');
	}

	const increment = e.currentTarget.className.indexOf(paginationNextClass) !== -1
			? -1
			: 1;

	filterForm
		.querySelector('[name=_page]')
		.value = parseInt(e.currentTarget.getAttribute('data-page')) - increment;
	
	filterForm.submit();
};

Array
	.from(document.querySelectorAll(`.${paginationPrevClass}, .${paginationNextClass}`))
    .forEach(el => {
		el.addEventListener('click', (e) => { paginationHandler(e) });
	});
	
Array
	.from(document.querySelectorAll(`.${paginationPageClass}`))
	.forEach(el => {
		el.addEventListener('click', (e) => {
			const page = e.currentTarget.getAttribute('data-value');

			if (page) {
				filterForm
					.querySelector('[name=_page]')
					.value = page;
				filterForm.submit();
			}
		});
	});