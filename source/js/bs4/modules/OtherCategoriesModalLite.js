'use strict';

/* global aiValue*/

import { addClass, removeClass, } from '../../bem/helper';
import { trackCategory, } from './../../functions/caseintake-tracker';
import { serverHostName, } from './../utils/utils';
import BasicModule from './BasicModule';

import otherCategories from '../../../../ssi/intake-categories/data/other-categories.json';

export default class OtherCategoriesModalLite extends BasicModule {
    constructor(options) {
        super(
            Object.assign(
                {
                    otherCategoriesModal: 'js-other-categories',
                    otherCategoriesLink: 'js-other-categories-link',
                    otherCategoriesBody: 'js-other-categories-body',
                    otherCategoriesWrapper: 'js-other-categories-wrapper',
                    otherCategoriesList: 'js-other-categories-list',
                    otherCategoriesFooterIcon:
                        'js-other-categories-modal-footer-icon',
                    otherCategoriesFooterScrollText:
                        'js-other-categories-modal-footer-scroll-text',
                    submitParams: {
                        ar: '/home/start.do',
                        catBypass: true,
                        combo_loc: 1,
                        require_loc: 1,
                        ai: typeof aiValue !== 'undefined' ? aiValue : '',
                    },
                },
                options
            )
        );
    }

    init(params) {
        this.generateOtherCategoriesLink();
        this.otherCategoriesHandler(params);
        this.otherCategoriesScrollHandler();
    }

    otherCategoriesScrollHandler() {
        const {
            otherCategoriesModal,
            otherCategoriesBody,
            otherCategoriesFooterScrollText,
            otherCategoriesFooterIcon,
            otherCategoriesWrapper,
        } = this.options;
        Array.prototype.forEach.call(
            document.getElementsByClassName(otherCategoriesModal),
            (el) => {
                const modalBody = el.querySelector('.' + otherCategoriesBody);
                const modalFooterScrollText = el.querySelector(
                    '.' + otherCategoriesFooterScrollText
                );
                const modalFooterIcon = el.querySelector(
                    '.' + otherCategoriesFooterIcon
                );
                const bodyWrapper = el.getElementsByClassName(
                    otherCategoriesWrapper
                );
                Array.prototype.forEach.call(bodyWrapper, (elem) => {
                    elem.addEventListener(
                        'scroll',
                        (e) => {
                            const targetElem = e.target;
                            const scrollHeight =
                                targetElem.scrollHeight -
                                Math.floor(targetElem.scrollTop);

                            if (
                                scrollHeight >= targetElem.clientHeight - 1 &&
                                scrollHeight <= targetElem.clientHeight + 1
                            ) {
                                addClass(modalBody, 'isScrollEnd');
                                addClass(modalFooterIcon, 'fa-chevron-up');
                                removeClass(modalFooterIcon, 'fa-chevron-down');
                                modalFooterScrollText.innerText = 'up';
                            } else {
                                removeClass(modalBody, 'isScrollEnd');
                                removeClass(modalFooterIcon, 'fa-chevron-up');
                                addClass(modalFooterIcon, 'fa-chevron-down');
                                modalFooterScrollText.innerText = 'down';
                            }
                        },
                        { passive: true, }
                    );
                });
            }
        );
    }

    otherCategoriesHandler() {
        const { otherCategoriesLink, submitParams, } = this.options;
        Array.prototype.forEach.call(
            document.getElementsByClassName(otherCategoriesLink),
            (el) => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();

                    const ids = {
                        supCatIds: e.target.dataset.value,
                        catType: e.target.dataset.type,
                        ai: e.target.dataset.ai,
                    };
                    const params = new URLSearchParams(
                        Object.assign({}, submitParams, ids)
                    );
                    const urlRedirect = `${serverHostName()}/link.php?${params.toString()}`;

                    trackCategory(
                        params.get('supCatIds'),
                        params.get('catType')
                    );
                    window.location.href = urlRedirect;
                });
            }
        );
    }

    generateOtherCategoriesLink() {
        Array.prototype.forEach.call(
            document.getElementsByClassName(this.options.otherCategoriesModal),
            (modal) => {
                const list = modal.querySelector(
                    `.${this.options.otherCategoriesList}`
                );

                if (!list) {
                    return;
                }

                const links = list.getElementsByClassName(
                    this.options.otherCategoriesLink
                );

                if (links.length === 0) {
                    otherCategories.forEach((otherCategory) => {
                        const link = document.createElement('li');
                        link.className = 'other-categories__item';
                        link.dataset.aut = 'ci_otherCategories-list';

                        const span = document.createElement('span');
                        span.className =
                            'other-categories__link js-other-categories-link';
                        span.dataset.ai =
                            typeof aiValue !== 'undefined' ? aiValue + '' : '0';
                        span.dataset.type = 'Sup_Cat';
                        span.dataset.value = otherCategory.id + '';
                        span.appendChild(
                            document.createTextNode(otherCategory.text)
                        );

                        link.appendChild(span);
                        list.appendChild(link);
                    });
                }
            }
        );
    }
}
