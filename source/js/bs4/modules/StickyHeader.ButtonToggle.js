'use strict';

import { debounce } from '../utils/utils';

const header = document.querySelector('.js-sticky-header'),
    headerDesktopBtn = document.querySelector('.sticky-header__button--desktop'),
    headerMobileBtn = document.querySelector('.sticky-header__button--mobile');

function toggleButton() {
    if(header !== null && headerDesktopBtn !== null && headerMobileBtn !== null) {
        if (window.innerWidth < 576) {
            headerDesktopBtn.style.display = 'none';
            headerMobileBtn.style.display = 'block';
        } else {
            headerMobileBtn.style.display = 'none';
            headerDesktopBtn.style.display = 'block';
        }
    }
}

window.addEventListener('resize', debounce(toggleButton, 300));

toggleButton();