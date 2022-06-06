'use strict';

import './bs4.base';
import './bs4.header';

import './bs4/modules/StickyHeader.ButtonToggle';
import './bs4/modules/StickyHeader';

import ModalIframe from './bs4/modules/ModalIframe';
import EllipsisMoreOptions from './bs4/modules/EllipsisMoreOptions';
import OtherCategoriesModal from './bs4/modules/OtherCategoriesModal';
import ReadmoreReadless from './bs4/modules/ReadmoreReadless';
import './bs4/modules/dropdownSelect';
import './bs4/modules/filterSortPagination';

new ModalIframe().init();
new EllipsisMoreOptions().init();
new OtherCategoriesModal().init();
new ReadmoreReadless().init();
