'use strict';

import './bs4/utils/alias';
import {enableJsComponents} from "./bs4/utils/utils";

enableJsComponents();

// LMS-7902
if (/ipad|iphone/i.test(navigator.userAgent)) {
    Array.prototype.forEach.call(
        document.getElementsByClassName('page-link__value'),
        node => {
            node.removeAttribute('readonly');
        });
}