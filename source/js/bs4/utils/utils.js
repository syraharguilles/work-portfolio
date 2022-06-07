'use strict';

import { CLASSES, TEXT_BOX_EVENTS, } from './constants';
import { hasClass, addClass, removeClass, } from '../../bem/helper';

export function enableJsComponents() {
    [ CLASSES.JS_DISABLED, CLASSES.NO_JS, ].forEach((cls) => {
        const list = document.getElementsByClassName(cls);
        while (list.length) {
            list[0].classList.remove(cls);
        }
    });
}

export function isTouchDevice() {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
}

export function adjustModalIframeBodyHeight(e, className) {
    const heightLimit = window.innerHeight;

    if (className) {
        Array.from(document.querySelectorAll(className)).forEach(($item) => {
            $item.style.height = `${heightLimit * 0.7}px`;
        });
    }
}

export const debounce = (fn, delay, ...args) => {
    let id = null;
    return (...fnArgs) => {
        clearTimeout(id);
        id = setTimeout(fn, delay, ...fnArgs, ...args);
    };
};

export function mediaListener(width, callback) {
    const media = window.matchMedia('(' + width + 'px)'); // set view port to match

    callback(media); // Call listener function at run time

    return media.addListener(callback); // Attach listener function on state changes
}

export const textTruncate = (str = '', length = 100, ending = '...') =>
    str.length > length
        ? str.substring(0, length - ending.length) + ending
        : str;

export function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * Sets `tabIndex=-1` on affected nodes, this is to prevent affected nodes to be selected when pressing tab on a certain page.
 *
 * @param {String} selector - valid DOM selector for the affected nodes
 */
export function disableTabbing(selector) {
    const { slice, } = Array.prototype;
    const nodes = slice.call(document.querySelectorAll(selector) || []);

    nodes.forEach((node) => (node.tabIndex = -1));
}

/**
 * Restricts input for the given textbox to the given inputFilter.
 *
 * @param {HTMLElement} textbox - Target input element.
 * @param {function} inputFilter - A function that tests input value against regex and returns boolean.
 */
export function setInputFilter(textbox, inputFilter) {
    if (document.body.contains(textbox)) {
        TEXT_BOX_EVENTS.forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (
                    Object.prototype.hasOwnProperty.call(this, 'oldValue')
                ) {
                    this.value = this.oldValue;
                    this.setSelectionRange(
                        this.oldSelectionStart,
                        this.oldSelectionEnd
                    );
                } else {
                    this.value = '';
                }
            });
        });
    }
}

export const serverHostName = (hostnameOnly) => {
    var testServer = window.location.hostname.match(/qa\d|test|dev/);
    const server = testServer ? testServer[0] : 'www';
    return hostnameOnly ? server : 'https://' + server + '.legalmatch.com';
};

export const getCmswpUrl = () => {
    const subDomain = (
        window.location.hostname.match(/qa\d|test|dev|www/) || []
    ).shift();
    let server = '';

    if (subDomain === 'www') {
        server = 'cmswp';
    } else if (subDomain === 'dev') {
        server = 'cmswp' + subDomain;
    } else {
        server = (subDomain || '') + 'cmswp';
    }

    return 'https://' + server + '.legalmatch.com';
};

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const fixModalOnMobile = (modalClassName) => {
    const modal = document.querySelector(modalClassName);
    if (isMobile && modal && !modal.classList.contains(CLASSES.IS_MOBILE)) {
        modal.classList.add(CLASSES.IS_MOBILE);
    }
};

/**
 * Dropping down the menu or not.
 *
 * @link https://legalmatch.atlassian.net/browse/LMS-11465
 * @param {string} parentClass - The parent class that start in js.
 * @param {string} btnClass - The button class that start in js.
 * @param {string} menuClass - The menu class that start in js.
 *
 */
export function dropdownMenu(parentClass, btnClass, menuClass) {
    const parentElems = document.querySelectorAll(`.${parentClass}`);

    if (!parentElems) {
        console.error('No parents classes|elements found.');
        return;
    }

    Array.from(parentElems).forEach((parentElem) => {
        const btnElem = parentElem.querySelector(`.${btnClass}`);
            const menuElem = parentElem.querySelector(`.${menuClass}`);
            const showClass = 'show';

        if (!btnElem && !menuElem) {
            console.error('No button or menu classes|elements found.');
            return;
        }

        btnElem.addEventListener(
            'click',
            function () {
                if (!hasClass(menuElem, showClass)) {
                    addClass(menuElem, showClass);
                } else {
                    removeClass(menuElem, showClass);
                }
            },
            { passive: true, }
        );
    });
}

export const setClassToElements = (selectors = {}) => {
    const elements = {};

    for (let selector in selectors) {
        if (Object.prototype.hasOwnProperty.call(selectors, selector)) {
            elements[selector] = document.querySelector(
                '.' + selectors[selector]
            );
        }
    }

    return elements;
};

export const removeAllElements = (selector) => {
    let element = document.querySelectorAll(selector);

    if (element && element.length) {
        Array.prototype.forEach.call(
            document.querySelectorAll(selector),
            (node) => {
                node.remove();
            }
        );
    }
};

export const addSeparator = (string, index, separator) =>
    string.slice(0, index) + separator + string.slice(index);

export const pageOrientation = (windowWidth, screenWidthLimit, isMobile, isDesktop) => {
    const forMobileOnly = isMobile && isDesktop === false,
        forDesktopOnly = isDesktop && isMobile === false,
        forAll = isMobile && isDesktop;

    return forAll ? true
    : (forMobileOnly ? windowWidth <= screenWidthLimit
    : (forDesktopOnly ? windowWidth >= screenWidthLimit
    : false));
}

export const serialize = (formElem) => {
    let obj = {};
    let formData = new FormData(formElem);

    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }

    return obj;
};

/**
 * Capitalize with space and hypen
 */
export const capitalize = (string) => {
    return string
        .replace(/(^|-|\s)[a-z]/g, (str) => str.toUpperCase());
}
