'use strict';
import BasicModule from '../bs4/modules/BasicModule';
import { CLASSES, } from '../bs4/utils/constants';
import { addClass, hasClass, removeClass, } from './helper';

export default class BasicCategoryDropdown extends BasicModule {
    constructor(options) {
        super(
            Object.assign(
                {
                    trigger: 'js-subcategory-dropdown-trigger',
                    list: 'js-subcategory-dropdown-list',
                    item: 'js-subcategory-dropdown-item',
                    supcatid: 'js-subcategory-dropdown-supcatid',
                    chosencat: 'js-subcategory-dropdown-chosencat',
                },
                options
            )
        );
    }

    init() {
        this.setSupCatId();
        this.triggerHandler();
        this.blurHander();
        this.itemHandler();
    }

    /**
     * set supcatid on hidden field 'js-subcategory-dropdown-supcatid'
     * from button data-supcatid value
     */
    setSupCatId() {
        const { trigger, supcatid, } = this.options;
        const btnTrigger = document.querySelector(`.${trigger}`);
        const inputSupCatId = document.querySelector(`.${supcatid}`);

        if (btnTrigger && inputSupCatId) {
            inputSupCatId.value = btnTrigger.dataset.supcatid;
        }
    }

    /**
     * button event handler
     */
    triggerHandler() {
        const trigger = document.querySelector(`.${this.options.trigger}`);

        if (trigger) {
            trigger.on('click', this.dropdownToggle.bind(this), {
                passive: true,
            });
        }
    }

    blurHander() {
        const { item, list, trigger, } = this.options;
        const dropdown = document.querySelector(`.${list}`);

        if (dropdown) {
            window.on(
                'click',
                (ev) => {
                    const target = ev.target;

                    /**
                     * if target is not dropdown item
                     * and not trigger button
                     * and dropdown is vissible
                     */
                    if (
                        !hasClass(target, item) &&
                        !hasClass(target, trigger) &&
                        !hasClass(dropdown, CLASSES.DISPLAY_NONE)
                    ) {
                        this.dropdownToggle();
                    }
                },
                { passive: true, }
            );
        }
    }

    /**
     * subcategory list toggle
     */
    dropdownToggle() {
        const { list, } = this.options;
        const dropdown = document.querySelector(`.${list}`);

        if (dropdown) {
            if (hasClass(dropdown, CLASSES.DISPLAY_NONE)) {
                removeClass(dropdown, CLASSES.DISPLAY_NONE);
            } else {
                addClass(dropdown, CLASSES.DISPLAY_NONE);
            }
        }
    }

    /**
     * subcategory item event handler
     */
    itemHandler() {
        const { item, } = this.options;
        const items = document.querySelectorAll(`.${item}`);

        if (items.length) {
            Array.from(items).forEach((node) => {
                node.on('click', this.itemEvent.bind(this), { passive: true, });
            });
        }
    }

    /**
     * set item events
     */
    itemEvent(item) {
        const subcat = item.target;
        const { trigger, } = this.options;
        const btn = document.querySelector(`.${trigger}`);

        if (subcat && btn) {
            const data = subcat.dataset;

            this.createChosenCat(data.id);
            btn.value = data.title;
            this.dropdownToggle();
        }
    }

    /**
     * check if chosen cat exist
     * if not create chosen cat hidden input
     * then assign value
     */
    createChosenCat(value) {
        const { chosencat, supcatid, } = this.options;
        const supCatIdInput = document.querySelector(`.${supcatid}`);
        const chosenCatInput = document.querySelector(`.${chosencat}`);

        if (chosenCatInput) {
            chosenCatInput.value = value;
        } else {
            const newChosenCat = document.createElement('input');

            newChosenCat.setAttribute('type', 'hidden');
            newChosenCat.setAttribute('name', 'chosenCat');
            newChosenCat.setAttribute('class', chosencat);
            newChosenCat.setAttribute('value', value);

            if (supCatIdInput) {
                supCatIdInput.parentNode.appendChild(newChosenCat);
            }
        }
    }
}
