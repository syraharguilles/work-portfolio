'use strict';

import { addClass, removeClass } from './../helper.js';
import deepmerge from 'deepmerge';

export default class Slider {
		
  constructor (options = {}) {
    const defaultOptions = {
      cssClass: {
        dot: 'slider-dot__dot',
        dotContainer: 'slider-dot__container',
        dotSelected: 'slider-dot__dot--selected',
        slide: 'slider__slide',
        slideFast: 'slider__slide--transition-fast',
        slider: 'slider',
        moveLeft: 'slider__slide--move-left',
        moveRight: 'slider__slide--move-right',
      },
      jsClass: {
        dot: 'js-dot',
        dotContainer: 'js-slider-dot',
        slider: 'js-slider',
        slide: 'js-slide',
      },
      attrID: 'data-id',
      slowTimeout: 600,
      fastTimeOut: 200,
      createDots: true,
      enableDots: true,
      allowSlideWidthLimit: 0,
      adjustHeightCallBack: () => {},
      adjustHeightBeforeCallBack: () => {},
    };

    this.options = deepmerge(defaultOptions, options);

    this.nodes = {
      dots: null,
      slider: null,
    }

    this.timeoutResize = 0;
    this.directions = { left: 'left', right: 'right' };
    this.allowMove = true;
    this.allowSwipe = true;
    this.touchStartX = null;
    this.scrollTop = null;
    this.previousDirection = null;
    this.allowance = 20;
  }

  init() {
    const {
        jsClass: { dotContainer, slider }
      } = this.options;
    
    this.nodes.slider = document.querySelector(`.${slider}`);
    this.nodes.dots = document.querySelector(`.${dotContainer}`);
    
    if(this.nodes.slider) {
      this.nodes.slider.addEventListener('mousedown', this._touchStart.bind(this), { passive: true });
      this.nodes.slider.addEventListener('touchstart', this._touchStart.bind(this), { passive: true });
      this.nodes.slider.addEventListener('mouseup', this._touchEnd.bind(this), { passive: true });
      this.nodes.slider.addEventListener('touchend', this._touchEnd.bind(this), { passive: true });

      this.injectClass();

      this.generateDots();

      window.addEventListener('resize', this._windowResize.bind(this));

      this._windowResize();

      this._selectDot('2');
      this.gotoSlide(1);
    }
  }

  enableSwipe () {
    this.allowSwipe = true;
  }

  disableSwipe () {
    this.allowSwipe = false;
  }

  injectClass () {
    const {
        cssClass: { slide: cssClassSlide, slider: cssClassSlider },
        jsClass: { slide: jsClassSlide },
        attrID
      } = this.options,
      {
        slider
      } = this.nodes;

    let i = 1;
    
    addClass(slider, cssClassSlider);
    
    Array
      .from(slider.children)
      .forEach(slide => {
        addClass(slide, cssClassSlide, jsClassSlide);
        slide.setAttribute(attrID, i++);
      });
  }

  generateDots () {
    const {
        cssClass: { dot: cssClassDot },
        jsClass: { dot: jsClassDot, slider: jsClassSlider, slide: jsClassSlide },
        attrID,
        createDots,
        enableDots
      } = this.options,
      { dots, slider } = this.nodes;

    if(enableDots) {
      if(createDots) {
        Array
          .from(slider.children)
          .forEach(slide => {
            
            const dot = document.createElement('SPAN');
            dot.className = cssClassDot + ' ' + jsClassDot;
            dot.setAttribute(attrID, slide.getAttribute(attrID));

            dot.addEventListener('click', (ev) => {
              this.gotoSlide(ev.currentTarget.getAttribute(attrID));
            });

            dots.appendChild(dot);
          });
      }
      else {
        Array
          .from(dots.children)
          .forEach((dot, i) => {
            const id = document.querySelector(`.${jsClassSlider} > .${jsClassSlide}:nth-child(${i + 1})`).getAttribute(attrID);
            dot.setAttribute(attrID, id);
            dot.addEventListener('click', (ev) => {
              this.gotoSlide(id);
            });
          });
      }
    }
  }

  slide (direction) {
    const { slowTimeout, allowSlideWidthLimit } = this.options;

    if(this.allowMove && (allowSlideWidthLimit === 0 || window.innerWidth <= allowSlideWidthLimit)) {
      this.allowMove = false;
      this._moveSlider(direction);
      this._selectDot(this.nodes.slider.children[1].getAttribute(this.options.attrID));

      setTimeout(() => { 
        this.allowMove = true;
      }, slowTimeout);
    }
  }

  _moveSlider (direction) {
    const { left, right } = this.directions,
      { slider } = this.nodes;

    if(this.previousDirection !== direction) {
      this.applyCSS(direction);
    }
    
    if(direction == left) {
      slider.appendChild(slider.firstElementChild);
    }
    else {
      slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
    }

    this.previousDirection = direction;
  }

  applyCSS (direction) {
    const { left, right } = this.directions,
      { 
        cssClass: { moveLeft, moveRight },
        jsClass: { slider: jsClassSlider, slide: jsClassSlide } 
      } = this.options,
      classToRemove = (direction == left ? moveRight : moveLeft),
      classToAdd = (direction == left ? moveLeft : moveRight);
      
      Array
        .from(document.querySelectorAll(`.${jsClassSlider} > .${jsClassSlide}`))
        .forEach(slide => { 
          removeClass(slide, classToRemove);
          addClass(slide, classToAdd);
        });

  }

  gotoSlide (id) {
    const { dots } = this.nodes,
      { 
        cssClass: { dotSelected, slideFast },
        jsClass: { slider: jsClassSlider, slide: jsClassSlide },
        attrID,
        fastTimeOut 
      } = this.options,
      { 
        left, 
        right 
      } = this.directions;
      
    let selectedId = +document.querySelector(`.${jsClassSlider} > .${jsClassSlide}:nth-child(2)`).getAttribute(attrID),
      interval, direction;

    id = +id;

    if(id != selectedId && this.allowMove) {
      this.allowMove = false;

      if(!(selectedId + 1 == id || selectedId - 1 == id)) {
        this._toggleFastTransition(true);
      }
      
      direction = id > selectedId ? left : right;

      selectedId = this._traverseSlide(selectedId, direction);

      if(selectedId != id) {
        interval = setInterval(() => {

          if(selectedId + 1 == id || selectedId - 1 == id) {
            this._toggleFastTransition(false);
          }
          selectedId = this._traverseSlide(selectedId, direction);
          
          if(selectedId == id) {
            clearInterval(interval);
            setTimeout(() => {
              this.allowMove = true; 
            }, fastTimeOut);
          }
        }, fastTimeOut);
      }
      else {
        setTimeout(() => { 
          this._toggleFastTransition(false);
          this.allowMove = true; 
        }, fastTimeOut);
      }

      this._selectDot(id);
    }
  }

  _toggleFastTransition (on = true) {
    const { cssClass: { slideFast } } = this.options,
      { slider } = this.nodes,
      children = Array.from(slider.children);

    if(on) {
      children.forEach(slide => { addClass(slide, slideFast) });
    }
    else {
      children.forEach(slide => { removeClass(slide, slideFast) });
    }
  }

  _traverseSlide (id, direction) {
    const { left, right } = this.directions;

    if(direction == left) {
      this._moveSlider(left);
      return id + 1;
    }
    else {
      this._moveSlider(right);
      return id - 1;
    }
  }

  _selectDot (id) {
    if(this.options.enableDots) {

      const { dots } = this.nodes,
        { cssClass: { dotSelected }, attrID } = this.options,
        selectedDot = dots.querySelector('.' + dotSelected);
      
      if(!selectedDot || selectedDot.getAttribute(attrID) != id) {
        
        if(selectedDot) {
          removeClass(selectedDot, dotSelected);
        }

        addClass(dots.querySelector(`[${attrID}="${id}"]`), dotSelected);
      }
    }
  }

  _windowResize () {

    clearTimeout(this.timeoutResize)

    this.timeoutResize = setTimeout(this.adjustHeight.bind(this), 500);
  }

  adjustHeight () {
    
    const {
      slider
    } = this.nodes;

    let height = 0;

    if(this.options.adjustHeightBeforeCallBack()) {
      this.options.adjustHeightBeforeCallBack();
    }

    Array
      .from(slider.children)
      .forEach(slide => {
        
        if(slide.offsetHeight > height) {
          height = slide.offsetHeight;
        }
      });

    slider.style.height = `${height}px`;

    if(this.options.adjustHeightCallBack()) {
      this.options.adjustHeightCallBack();
    }

    this.resetSlide();
  }

  _touchStart (ev) {
    if(this.allowSwipe) {
      this.touchStartX = (ev.type == 'touchstart') ? ev.touches[0].clientX : ev.pageX;
      this.scrollTop = this._getScrollTop();
    }
  }

  _touchEnd (ev) {
    if(this.allowSwipe) {
      const startX = this.touchStartX,
        endX = (ev.type == 'touchend') ? ev.changedTouches[0].clientX : ev.pageX,
        { left, right } = this.directions,
        scrollTop = this._getScrollTop();
      let direction = right;

      if(startX != null 
          && startX !== endX 
          && ((scrollTop >= this.scrollTop && scrollTo <= this.scrollTop + this.allowance)
            || (scrollTop <= this.scrollTop && scrollTop >= this.scrollTop - this.allowance) )) {
        this.touchStartX = null;

        if(startX > endX) {
          direction = left;
        }

        this.slide(direction);
      }
    }
  }

  _getScrollTop () {
    return document.body.scrollTop || document.documentElement.scrollTop || window.scrollY || 0;
  }

  //fix glitch on other browsers
  resetSlide () {
    const {
      slider
    } = this.nodes,
    {
      jsClass: { slide: jsClassSlide },
    } = this.options,
    slides = Array.prototype.slice.call(slider.querySelectorAll(`.${jsClassSlide}`));
    
    slides.forEach((s) => {
      s.style.left = '0';
      s.style.left = '';
    });
  }
}