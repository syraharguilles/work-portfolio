'use strict';

import { addClass, hasClass, removeClass } from './../helper.js';

const tabPillClass = 'js-tab-pills',
    navPillClass = 'js-nav-pill',
    isSelectedClass = 'is-selected',
    isActiveClass = 'is-active';

Array
    .from(document.querySelectorAll(`.${tabPillClass}`))
    .forEach(tabPill => {
        const $tabPill = tabPill;
        
        Array
            .from(tabPill.querySelectorAll(`.${navPillClass}`))
            .forEach(navPill => {
                
                navPill.addEventListener('click', (e) => {
                    const el = e.currentTarget;

                    if(!hasClass(el, isSelectedClass)) {
                        removeClass($tabPill.querySelector(`.${isSelectedClass}`), isSelectedClass);
                        addClass(el, isSelectedClass);

                        removeClass($tabPill.querySelector(`.${isActiveClass}`), isActiveClass);
                        addClass($tabPill.querySelector(el.getAttribute('data-target')), isActiveClass);
                    }
                })
            });
    });