'use strict';

import { hasClass, addClass, removeClass } from '../../bem/helper';

export default class EllipsisMoreOptions {
	constructor(options = {}){
		const defaultOptions = {
			ellipsisMoreOptionsOpenClass: 'js-ellipsis-more-options--open',
			hidingClass: 'ellipsis--hiding',
			containerClass: 'js-ellipsis-more-options-container',
			moreOptionsClass: 'js-ellipsis-more-options',
			groupingClass: 'js-ellipsis-more-options-group',
			ellipsisClass: 'js-ellipsis',
			fadeOutClass: 'fade-out',
			fadeInClass: 'fade-in'
		};

		this.options = Object.assign(defaultOptions, options);
	}

	init(){
		const { containerClass, ellipsisClass } = this.options;

		Array
			.from(document.querySelectorAll(`.${containerClass}`))
			.forEach((container) => {
				const ellipsis = container.querySelector(`.${ellipsisClass}`);

				if (ellipsis) {
					ellipsis.addEventListener('click', () => this._moreOptions(container, ellipsis));
				}
			});
	}

	_moreOptions = (container, ellipsis) => {
		const { ellipsisMoreOptionsOpenClass } = this.options;

		if (hasClass(container, ellipsisMoreOptionsOpenClass)) {
			this._hide(container, ellipsis);
		}
		else {
			this._hideGroup();
			this._show(container);
			
		}
	}

	_show = container => {
		const { ellipsisMoreOptionsOpenClass, moreOptionsClass, fadeInClass, fadeOutClass } = this.options;

		const moreOptions = container.querySelector(`.${moreOptionsClass}`);

		if (!hasClass(moreOptions, fadeInClass)) {
			addClass(container, ellipsisMoreOptionsOpenClass);
			addClass(moreOptions, fadeInClass);
			removeClass(moreOptions, fadeOutClass);
		}
	}

	_hide = container => {
		const { ellipsisMoreOptionsOpenClass, moreOptionsClass, fadeInClass, fadeOutClass } = this.options;
		
		const moreOptions = container.querySelector(`.${moreOptionsClass}`);

		if (!hasClass(moreOptions, fadeOutClass)) {
			removeClass(container, ellipsisMoreOptionsOpenClass);
			addClass(moreOptions, fadeOutClass);
			removeClass(moreOptions, fadeInClass);
		}
	}

	_hideGroup = () => {
		const { options } = this;

		Array
			.from(document.querySelectorAll(`.${options.groupingClass}.${options.ellipsisMoreOptionsOpenClass}`))
			.forEach((shown) => {

				const shownMoreOptions = shown.querySelector(`.${options.ellipsisClass}`);
				this._hide(shown, shownMoreOptions);
			});
	}

}


