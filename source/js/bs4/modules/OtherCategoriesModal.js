'use strict';

import { addClass, hasClass, removeClass, } from '../../bem/helper';
import BasicCaseIntakeForm from './BasicCaseIntakeForm';
import { trackCategory, } from './../../functions/caseintake-tracker';
import { serverHostName, } from './../utils/utils';
import { CLASSES, } from '../utils/constants';

export default class OtherCategoriesModal extends BasicCaseIntakeForm {
    init() {
        this.buildOptions({
            locationInput: 'js-case-intake-location-input',
            otherCategoriesModal: 'js-other-categories',
            otherCategoriesLink: 'js-other-categories-link',
            otherCategoriesBody: 'js-other-categories-body',
            otherCategoriesWrapper: 'js-other-categories-wrapper',
            otherCategoriesFooterIcon: 'js-other-categories-modal-footer-icon',
            otherCategoriesFooterScrollText:
                'js-other-categories-modal-footer-scroll-text',
            otherCategoriesModalTrigger: 'js-other-category-modal-trigger',
            otherCategoriesSubModalTrigger:
                'js-other-category-sub-modal-trigger',
            otherCategoriesModalBtnClose: 'js-modal-generic-btn-close',
        });

        this.currentModalTrigger = null;
        this.otherCategoriesHandler();
        this.otherCategoriesScrollHandler();
        this.initModalTriggerListener();
        this.subModalTriggerHandler();
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

                    this.parentForm = null;
                    this.setParentForm(this.currentModalTrigger);
                    const locationData =
                        BasicCaseIntakeForm.getLocationData(this.parentForm) ||
                        {};
                    const ids = {
                        supCatIds: e.target.dataset.value,
                        catType: e.target.dataset.type,
                        ai: e.target.dataset.ai,
                    };
                    const params = new URLSearchParams(
                        Object.assign({}, submitParams, locationData, ids)
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

    initModalTriggerListener() {
        Array.prototype.forEach.call(
            document.querySelectorAll(
                `.${this.options.otherCategoriesModalTrigger}`
            ),
            (trigger) => {
                trigger.addEventListener(
                    'click',
                    (ev) => (this.currentModalTrigger = ev.currentTarget),
                    { passive: true, }
                );
            }
        );
    }

    subModalTriggerHandler() {
        const {
            otherCategoriesModal,
            otherCategoriesSubModalTrigger,
            otherCategoriesModalBtnClose,
        } = this.options;
        const modals = document.querySelectorAll('.' + otherCategoriesModal);
        const subModalTrigger = document.querySelectorAll(
            '.' + otherCategoriesSubModalTrigger
        );

        if (subModalTrigger.length) {
            Array.from(subModalTrigger).forEach((trigger) => {
                trigger.addEventListener(
                    'click',
                    (elem) => {
                        const $this = elem.target;
                        const modal = document.querySelector(
                            $this.dataset.target
                        );

                        if (
                            modal &&
                            hasClass($this, otherCategoriesSubModalTrigger)
                        ) {
                            const closeBtn = modal.querySelector(
                                '.' + otherCategoriesModalBtnClose
                            );
                            const closeBtnSub = modal.querySelector(
                                '.' + otherCategoriesModalBtnClose + '-sub'
                            );

                            if (closeBtn && closeBtnSub) {
                                addClass(closeBtn, CLASSES.DISPLAY_NONE);
                                removeClass(closeBtnSub, CLASSES.DISPLAY_NONE);
                            }
                        }
                    },
                    { passive: true, }
                );
            });
        }
        if (modals.length) {
            Array.from(modals).forEach((modal) => {
                modal.on('hide.bs.modal', () => {
                    const closeBtn = modal.querySelector(
                        '.' + otherCategoriesModalBtnClose
                    );
                    const closeBtnSub = modal.querySelector(
                        '.' + otherCategoriesModalBtnClose + '-sub'
                    );

                    if (closeBtn && closeBtnSub) {
                        removeClass(closeBtn, CLASSES.DISPLAY_NONE);
                        addClass(closeBtnSub, CLASSES.DISPLAY_NONE);
                    }
                });
            });
        }
    }
}
