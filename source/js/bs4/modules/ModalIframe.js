'use strict';

import BasicModule from "./BasicModule";
import { adjustModalIframeBodyHeight, debounce } from '../utils/utils';
import closeModalIframe from '../../lib/close-modal-iframe';

export default class ModalIframe extends BasicModule {
    constructor(options) {
        super(Object.assign({
            links: 'js-modal-iframe-toggle',
            close: 'js-modal-iframe-close'
        }, options));
    }

    init() {
        Array.prototype.forEach.call(
            document.getElementsByClassName(this.options.links),
            (link, i) => link.on('click', ModalIframe.onClick));
        Array.prototype.forEach.call(
            document.getElementsByClassName(this.options.close),
            (link, i) => link.on('click', closeModalIframe));

        window.addEventListener('resize', debounce(adjustModalIframeBodyHeight, 500, '.modal-iframe__body'));
    }

    static onClick(e) {
        const targetId = e.target.dataset.target.substr(1, e.target.dataset.target.length);
        const modal = document.getElementById(targetId);
        const url = e.target.href;
        const heightLimit = window.innerHeight;
        if (!modal) {
            return false;
        }
        const iframe = modal.getElementsByTagName('iframe')[0];
        if (!iframe) {
            return false;
        }
        (modal.getElementsByClassName('modal-body')[0]).style.height = `${heightLimit * 0.7}px`;
        if (iframe.src !== url) {
            iframe.src = e.target.href;
        }
        return false;
    }
}