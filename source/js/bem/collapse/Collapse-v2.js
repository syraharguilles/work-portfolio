'use strict';

import { addClass, hasClass, outerHeight, removeClass, } from './../helper';
import { debounce, } from './../../bs4/utils/utils';

export default class Collapse {
    constructor(options = {}) {
        const defaultOptions = {
            collapseInClass: 'js-collapse--in',
            collapseTimeout: 0,
            collapsingClass: 'collapse--collapsing',
            containerClass: 'js-collapse',
            groupingClass: 'js-collapse-group',
            scrollToShow: false,
            scrollToShowOffset: -100,
            toggleClass: 'js-collapse-toggle',
        };

        this.options = Object.assign(defaultOptions, options);

        this.timeoutResize = null;
    }

    init() {
        const { options, } = this;

        Array.from(
            document.querySelectorAll(`.${options.containerClass}`)
        ).forEach((container) => {
            const toggle = container.querySelector(`.${options.toggleClass}`);

            if (toggle) {
                toggle.addEventListener('click', () => {
                    this._toggle(container, toggle);
                });
            }
        });

        window.addEventListener(
            'resize',
            debounce(this._windowResize.bind(this), 500)
        );

        this._windowResize();

        // run aother delayed '_windowResize' to fix error due to slow rendering of font
        setTimeout(() => {
            this._windowResize();
        }, 1000);
    }

    _toggle(container, toggle) {
        if (hasClass(container, this.options.collapseInClass)) {
            this._hide(container, toggle);
        } else {
            const hasShown = this._hasShown();

            this._hideGroup();
            this._show(container, hasShown);
        }
    }

    _show(container, hasShown = true) {
        const { options, } = this;
        const {
            collapseInClass,
            collapseTimeout,
            collapsingClass,
            scrollToShow,
        } = options;

        if (!hasClass(container, collapsingClass)) {
            addClass(container, collapsingClass);
            addClass(container, collapseInClass);

            container.style.height = `${container.scrollHeight}px`;

            setTimeout(() => {
                removeClass(container, collapsingClass);
                container.style.height = `${container.scrollHeight}px`;

                if (hasShown && scrollToShow) {
                    this._scrollToShow(container);
                }
            }, collapseTimeout);
        }
    }

    _showAll() {
        if (window.innerWidth > 767) {
            Array.from(
                document.querySelectorAll(`.${this.options.containerClass}`)
            ).forEach((container) => {
                this._show(container);
            });
        }
    }

    _hide(container, toggle) {
        const { options, } = this;
        const { collapseInClass, collapseTimeout, collapsingClass, } = options;

        if (!hasClass(container, collapsingClass)) {
            container.style.height = `${container.scrollHeight}px`;

            addClass(container, collapsingClass);
            removeClass(container, collapseInClass);

            container.style.height = `${outerHeight(toggle)}px`;

            setTimeout(() => {
                removeClass(container, collapsingClass);
            }, collapseTimeout);
        }
    }

    _hideGroup() {
        const { options, } = this;

        Array.from(
            document.querySelectorAll(
                `.${options.groupingClass}.${options.collapseInClass}`
            )
        ).forEach((shown) => {
            const shownToggle = shown.querySelector(`.${options.toggleClass}`);

            this._hide(shown, shownToggle);
        });
    }

    _windowResize() {
        const { containerClass, collapseInClass, toggleClass, } = this.options;

        Array.from(document.querySelectorAll(`.${containerClass}`)).forEach(
            (container) => {
                const toggle = container.querySelector(`.${toggleClass}`);

                if (toggle) {
                    if (hasClass(container, collapseInClass)) {
                        container.style.height = null;
                    } else {
                        container.style.height = `${outerHeight(toggle)}px`;
                    }
                }
            }
        );
    }

    _scrollToShow(target) {
        setTimeout(() => {
            const y =
                target.getBoundingClientRect().top +
                window.pageYOffset +
                this.options.scrollToShowOffset;

            if (
                window.pageYOffset > 0 &&
                !(y > window.pageYOffset && y < window.innerHeight)
            ) {
                window.scrollTo({ top: y, behavior: 'smooth', });
            }
        }, 500);
    }

    _hasShown() {
        const { options, } = this;

        return !!document.querySelectorAll(
            `.${options.groupingClass}.${options.collapseInClass}`
        ).length;
    }
}
