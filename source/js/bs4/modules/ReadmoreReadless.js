'use strict';

import { CLASSES, TEXT } from '../utils/constants';
import { debounce } from '../utils/utils';
import { getParentByClassName } from "./traverse";
import { hasClass, addClass, removeClass } from '../../bem/helper';

const AUTHORS_BIOS_RAW = document.querySelectorAll('.js-authors-bio-raw');

export default class ReadmoreReadless { 
	constructor(options = {}) {
		const defaultOptions = {
			authorListClass: 'js-author-list',
			setEllipsisByWordClass: 'js-ellipsis-by-word--set',
			setEllipsisByCharClass: 'js-ellipsis-by-char--set',
			authorBioContClass: 'js-author-bio-container',
			authorBioClass: 'js-authors-bio',
			readMoreReadLessLinkClass: 'js-readmore-readless-link'
		}

		this.options = Object.assign(defaultOptions, options);

		this.$authorList = null;
		this.$authorsBios = null;
	}

	init() {
		const { authorListClass, authorBioClass } = this.options;

		this.$authorList = document.querySelector(`.${authorListClass}`);
		this.$authorsBios = document.querySelectorAll(`.${authorBioClass}`);
		
		if (this.$authorList && this.$authorsBios) {
			window.addEventListener('load', this._setContentEllipsis);
			window.addEventListener('resize', debounce(this._setContentEllipsis, 300));

			Array
				.from(this.$authorsBios)
				.forEach(($authorBioItem) => {
					$authorBioItem.addEventListener('click', this._readMoreReadLess);
				});
		}
	}

	_setContentEllipsis = () => {
		const windowWidth = window.innerWidth;

		if (windowWidth >= 768) {
			this._setContentEllipsisByWord();
		} else {
			this._setContentEllipsisByChar();
		}
	}
	
	_setContentEllipsisByWord = () => {
		const { $authorList, options} = this,
			{ setEllipsisByWordClass, setEllipsisByCharClass } = options;

		if (!hasClass($authorList, setEllipsisByWordClass)) {
			addClass($authorList, setEllipsisByWordClass);
			removeClass($authorList, setEllipsisByCharClass);

			this._ellipsisByWord();
		}
	}

	_setContentEllipsisByChar = () => {
		const { $authorList, options } = this,
			{ setEllipsisByWordClass, setEllipsisByCharClass } = options;

		if (!hasClass($authorList, setEllipsisByCharClass)) {
			addClass($authorList, setEllipsisByCharClass);
			removeClass($authorList, setEllipsisByWordClass);

			this._ellipsisByChar();
		}
	}

	_ellipsisByWord = () => {
		const { authorBioContClass, authorBioClass, readMoreReadLessLinkClass } = this.options,
			REGEX = /\S*<+?.*?>\S*|\S+/g, /* Tag with before and after with non white space | non white space */
			SHOW_WORDS = 100;

		if (AUTHORS_BIOS_RAW) {
			Array
				.from(AUTHORS_BIOS_RAW)
				.forEach(($authorBioItem) => {
					const AUTHOR_BIO_PARENT_NODE = getParentByClassName($authorBioItem, `${authorBioContClass}`);

					let content = $authorBioItem.innerHTML,
						contentLength = ((content || '').match(REGEX) || []).length;	

					if (contentLength > SHOW_WORDS) {
						const TRIMMED_STRING = content.match(REGEX).splice(0, SHOW_WORDS).join(' '),
							MORE_STRING = content.match(REGEX).splice(SHOW_WORDS, contentLength - SHOW_WORDS).join(' ');

							content = TRIMMED_STRING + `<span class="readmore-readless__ellipsis-icon">&nbsp;${TEXT.ELLIPSIS_ICON}&nbsp;</span>
							<span class="readmore-readless__content-wrapper">
								<span class="readmore-readless__content d-none">${MORE_STRING}</span>
								<span class="readmore-readless__link readmore ${readMoreReadLessLinkClass}">${TEXT.READ_MORE}</span>
							</span>`;
					}

					AUTHOR_BIO_PARENT_NODE.querySelector(`.${authorBioClass}`).innerHTML = content;
				});
		}
	}

	_ellipsisByChar = () => {
		const { authorBioContClass, authorBioClass, readMoreReadLessLinkClass } = this.options,
			SHOW_CHARS = 70,
			REGEX = /[^\s\\]<+?.*?>|<+?.*?>[^\s\\]|./g; /* Tag with before and after single character | all character */
		
		if (AUTHORS_BIOS_RAW) {
			Array
				.from(AUTHORS_BIOS_RAW)
				.forEach(($authorBioItem) => {
					const AUTHOR_BIO_PARENT_NODE = getParentByClassName($authorBioItem, `${authorBioContClass}`);
					let content = $authorBioItem.innerHTML,
						contentLength = ((content || '').match(REGEX) || []).length;

					if (contentLength > SHOW_CHARS) {

						const TRIMMED_STRING = content.match(REGEX).splice(0, SHOW_CHARS).join(''),
							MORE_STRING = content.match(REGEX).splice(SHOW_CHARS, contentLength - SHOW_CHARS).join('');

							content = `<span class="readmore-readless__trimmed">${TRIMMED_STRING}</span></span></spam><span class="readmore-readless__ellipsis-icon">&nbsp;${TEXT.ELLIPSIS_ICON}&nbsp;</span><span class="readmore-readless__content-wrapper"><span class="readmore-readless__content d-none">${MORE_STRING}</span><span class="readmore-readless__link readmore ${readMoreReadLessLinkClass}">${TEXT.READ_MORE}</span></span>`;
					} 
					
					AUTHOR_BIO_PARENT_NODE.querySelector(`.${authorBioClass}`).innerHTML = content;
				});
		}
	}

	_readMoreReadLess = ev => {
		const { readMoreReadLessLinkClass } = this.options;

		if (document.getElementsByClassName(readMoreReadLessLinkClass).length > 0 && hasClass(ev.target, readMoreReadLessLinkClass)){
			let READMORE_READLESS_LINK = ev.currentTarget.querySelector(`.${readMoreReadLessLinkClass}`);

			if (hasClass(READMORE_READLESS_LINK, `readmore`)){
				addClass(READMORE_READLESS_LINK, `readless`);
				removeClass(READMORE_READLESS_LINK, `readmore`);
				addClass(ev.currentTarget.querySelector(`.readmore-readless__ellipsis-icon`), CLASSES.DISPLAY_NONE);
				removeClass(ev.currentTarget.querySelector(`.readmore-readless__content`), CLASSES.DISPLAY_NONE);
				READMORE_READLESS_LINK.innerHTML = TEXT.READ_LESS;
			} else {
				addClass(READMORE_READLESS_LINK, `readmore`);
				removeClass(READMORE_READLESS_LINK, `readless`);
				removeClass(ev.currentTarget.querySelector(`.readmore-readless__ellipsis-icon`), CLASSES.DISPLAY_NONE);
				addClass(ev.currentTarget.querySelector(`.readmore-readless__content`), CLASSES.DISPLAY_NONE);
				READMORE_READLESS_LINK.innerHTML = TEXT.READ_MORE;
			}
		} 	
	}
}

