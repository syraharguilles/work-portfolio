'use strict';

import 'devbridge-autocomplete';
import './intro1-redesign/plugins/legalmatch';

import './intro-pages-olddesign/components/_location.js';

import 'bootstrap.native/dist/bootstrap-native-v4';

import './bs4/utils/alias';

import OtherCategoriesModal from './bs4/modules/OtherCategoriesModal';
import OtherCategoriesModalLite from './bs4/modules/OtherCategoriesModalLite';

import CityStateCaseIntakeForm from './bem/CityStateCaseIntakeForm';
import BasicCategoryDropdown from './bem/BasicCategoryDropdown';
import Collapse from './bem/collapse/Collapse-v2';
import Slider from './bem/slider/Slider';
import './bem/tab-pills/tab-pills';
import ModalIframe from './bs4/modules/ModalIframe';
import './bs4/modules/StickyHeader.ButtonToggle';
import './bs4/modules/StickyHeader';

import { disableTabbing, } from './bs4/utils/utils';
import {
    initTrackingCategoryFromLink,
    initTrackingCategoryFromOldIntake,
} from './functions/caseintake-tracker';

import './lib/lazyload-img';

initTrackingCategoryFromLink();
initTrackingCategoryFromOldIntake();

new CityStateCaseIntakeForm().init();
new BasicCategoryDropdown().init();

new ModalIframe().init();

new OtherCategoriesModal().init();
new OtherCategoriesModalLite().init();

new Collapse().init();

const testimonialSlider = new Slider({
    jsClass: {
        dotContainer: 'js-testimonial-dots',
        slider: 'js-testimonial-slider',
    },
});

testimonialSlider.init();

const testimonialPrev = document.querySelector('.js-testimonial-prev');
const testimonialNext = document.querySelector('.js-testimonial-next');

if (testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener(
        'click',
        () => {
            testimonialSlider.slide('right');
        },
        { passive: true, }
    );

    testimonialNext.addEventListener(
        'click',
        () => {
            testimonialSlider.slide('left');
        },
        { passive: true, }
    );
}

const topRatedSlider = new Slider({
    jsClass: {
        dotContainer: 'js-top-rated-dots',
        slider: 'js-top-rated-slider',
    },
});

topRatedSlider.init();

disableTabbing('.js-subcat-content-disable-tab a');
