"use strict";

import {CLASSES, ERROR_MSG} from "../bs4/utils/constants";
import {getParentByClassName, getParentByTagName} from "./traverse";
import BasicCaseIntakeForm, { locationContainer, classPreloader } from "../bs4/modules/BasicCaseIntakeForm";
import autoComplete from "js-autocomplete";
import {addClass, hasClass, removeClass} from "./helper";
import {cifErrorTracker} from '../functions/caseintake-tracker';

const body = document.body;
const zipUI = body.dataset ? (typeof body.dataset['zipUi'] !== 'undefined') : false;

export default class CityStateCaseIntakeForm extends BasicCaseIntakeForm {
  constructor(options) {
    super(Object.assign({
      categoryData: '/ssi/intake-categories/data/all-categories.json',
      categoryInput: 'js-case-intake-category-input',
      categoryKeys: ['supCatIds', 'chosenCat'],
      caseIntakeError: "js-case-intake-form-modal",
      caseIntakeErrorMsg: "js-case-intake-modal-subtitle",
      caseIntakeErrorOverlay: "case-intake-form__modal-overlay",
      caseIntakeErrorClose: "modal-generic__close"
    }, options));

    this.autocompleteInputs.push('js-case-intake-category-input');

    this.xhrCached = null;
  }

  init() {
    Array.prototype.forEach.call(
      document.getElementsByClassName(this.options.caseIntakeErrorOverlay),
      cont => {
        cont.on('click', e => this.addCloseEvent(e))
      }
    );

    Array.prototype.forEach.call(
      document.getElementsByClassName(this.options.caseIntakeErrorClose),
      cont => {
        cont.on('click', e => this.addCloseEvent(e))
      }
    );

    this.formInputHandler(this.options.categoryInput, this.options.categoryKeys);
    this.categoryAutocompleteCreator();

    this.options.submitParams.supCatIds = "";
  }

  addCloseEvent(e) {
    let modalErr = getParentByClassName(e.target, this.options.caseIntakeError);
    if (modalErr) {
      let isModalConnecting = hasClass(modalErr,this.options.modalZipQueryInProgress);
      let caseIntakeForm = isModalConnecting ? getParentByClassName(modalErr,this.options.form) : modalErr.previousElementSibling;
      let dataFocus = "." + modalErr.dataset['focus'];
      addClass(modalErr, 'hide');
      if (!isModalConnecting){
        modalErr.dataset['focus'] = '';
      }
      caseIntakeForm.querySelector(dataFocus).focus();
    }
  }

  categoryAutocompleteCreator() {
    Array.prototype.forEach.call(
      document.getElementsByClassName(this.options.categoryInput),
      (input, i) => {
        //data indicator to show proper Autocomplete menu
        let menuClassName = 'menuCategory--'+i;
        input.dataset['menuClassName'] = menuClassName;

        new autoComplete({
          cache: false,
          delay: 300,
          selector: input,
          minChars: 0,
          menuClass:menuClassName,
          source: (term, success) => {
            const formData = new FormData();
            formData.append('query', term);
            removeClass(input,CLASSES.HAS_SUGGESTION);



            if (this.xhrCached == null) {
              try {
                this.xhr.abort();
              } catch (e) {
              }
              this.xhr = new XMLHttpRequest();
              this.xhr.onload = () => {
                this.xhrCached = this.xhr.responseText;
                this.filterCatSuggestions();
                this.processCatSuggestions(success, input);
              };
              this.xhr.open('GET', this.options.categoryData);
              this.xhr.send(formData);
            } else {
              this.processCatSuggestions(success, input);
            }
          },
          renderItem: (item, search) => {
            if(search == "" && (item.chosenCat || this.getCommonCategoryIds().indexOf(item.id) === -1)) {
                return "";
            }
            
            const div = document.createElement('div');
            addClass(div, 'autocomplete-suggestion');
            let supCatName = "";
            if (typeof item.supCatName !== "undefined") {
              supCatName = ` <span class='autocomplete-suggestion__main_cat'>(${item.supCatName})</span>`;
            }
            div.innerHTML = item.catname + supCatName;
            Object.keys(item).forEach((key) => div.dataset[key] = item[key]);
            return div.outerHTML;
          },
          onSelect: (event, term, item) => {
            const form = getParentByTagName(input, 'form');
            
            input.value = item.dataset['catname'];
            this.options.categoryKeys.forEach(key => {
              const name = `${key}`;
              const el = form.querySelector(`input[type=hidden][name=${name}]`) || document.createElement('input');
              el.value = typeof item.dataset[key] !== 'undefined' ? item.dataset[key] : "";
              if (el.name !== name && el.value !== '') {
                el.name = name;
                el.type = 'hidden';
                form.appendChild(el);
              }
            });

            removeClass(input,this.options.classInputError);
            removeClass(input,CLASSES.HAS_SUGGESTION);
          }
        });

        if('focusHandler' in input) {
          input.removeEventListener('focus', input.focusHandler);
          input.addEventListener('focus', (e) => {
            if(input.value.length === 0) {
              input.last_val = '\n';
              input.keyupHandler(e);
            }
          });
        }

      });
  }

  formInputHandler(formInput, inputKeys) {
    Array.prototype.forEach.call(
      document.getElementsByClassName(formInput),
      node => {
        node.addEventListener('change', e => {
          let input = e.target;
          if (input.value.trim() === '') {
            removeClass(input,CLASSES.IS_INVALID);
            BasicCaseIntakeForm.clearInputs(getParentByTagName(input, 'form'), inputKeys, '');
          }
        });
        node.addEventListener('keydown', e => {
          if (e.target.value !== '') {
            removeClass(e.target, "case-intake-form__input--error");
          }
        });
        node.addEventListener('focus', e => {
          const input = e.target;
          const autoCompDrop = body.querySelector('.'+input.dataset['menuClassName']);

          if ( hasClass(input, CLASSES.HAS_SUGGESTION) && autoCompDrop){
            autoCompDrop.style.display = "block";
          }
        });
      });
  }
  
  getCommonCategoryIds() {
    return [287, 293, 286, 295, 285, 290, 291, 64, 288, 289, 294, 292];
  }

  filterCatSuggestions() {
    try {
      const commonCategoryIds = this.getCommonCategoryIds(),
        json = JSON.parse(this.xhrCached),
        commonCategoryList = [],
        otherCategoryList = [];

      json.forEach((item) => {
        let i;
        if('id' in item) {
          i = commonCategoryIds.indexOf(item.id);

          if(i >= 0) {
            item.common = true;
            if('text' in item) {
              item.description = item.text;
            }
            commonCategoryList[i] = item;
          }
          else if('common' in item && item.common === true) {
            otherCategoryList.push(item);
          }
        }
        else {
          return;
        }
      });

      this.xhrCached = JSON.stringify(commonCategoryList.concat(otherCategoryList));
    }
    catch (err) {}
  }

  processCatSuggestions(success, input) {
    let mainList = [];
    const inpVal = input.value.toLowerCase();
    addClass(input,CLASSES.IS_INVALID);

    try {
      const json = JSON.parse(this.xhrCached);
      json.forEach((item) => {
        if (typeof item.common === "undefined" && item.common !== true) {
          return;
        }
        let catName = item.description.toLowerCase();
        let childCat = false;
        if (catName.indexOf(inpVal) !== -1) {
          mainList.push({
            id: item.id,
            catname: item.description,
            supCatIds: item.id
          });
          childCat = true;
        }
        item.categories.forEach(item_sub => {
          let subCatName = item_sub.description.toLowerCase();
          if (subCatName.indexOf(inpVal) !== -1 || childCat === true) {
            mainList.push({
              id: item_sub.id,
              catname: item_sub.description,
              supCatIds: item.id,
              chosenCat: item_sub.id,
              supCatName: item.description
            });
          }
        });
      });
    } catch (e) {
    }
    if (mainList.length > 0) {
      removeClass(input,CLASSES.IS_INVALID);
      addClass(input,CLASSES.HAS_SUGGESTION);
    }
    success(mainList);
  }

  validate(form, params) {
    const locationInput = this.getInput(form, this.options.locationInput);
    const categoryInput = this.getInput(form, this.options.categoryInput);
    const errorModal = form.nextElementSibling;
    const locInput = "location-input", catChosen = "chosenCat";
    const locCont = getParentByClassName(locationInput,locationContainer);

    let err_msg_loc = '',err_msg = '', err_focus = '', err_name='', err_value="",
      err_loc = false, err_cat = false;

    if (locationInput !== null || categoryInput !== null) {
      err_focus = this.options.locationInput;

      // display connecting to server modal when zipcode not yet ready
      if ( hasClass(locCont,classPreloader) ) {
        this.locationZipModalEventHandler(locationInput);
        return false;
      }

      if (hasClass(locationInput,CLASSES.HAS_SUGGESTION)){
        err_msg_loc = ERROR_MSG.ERR_SELECT_CITY;
        err_name = locInput;
        err_value = "invalid:"+locationInput.value+":04"; 
        err_loc = true;

      } else if (!params.has('zip_select') || params.get('zip_select').trim() === '' ) {
        err_msg_loc = ERROR_MSG.ERR_LOC;
        err_name = locInput;
        err_value = ( (!params.has('zip_select') || params.get('zip_select').trim() === '') && locationInput.value === "" ) ? "required" : "invalid:"+locationInput.value+":01";
        err_loc = true;
      }

      if (hasClass(categoryInput, CLASSES.HAS_SUGGESTION)){
        err_msg = ERROR_MSG.ERR_CAT_LIST;
        err_focus = this.options.categoryInput;
        err_name = catChosen;
        err_value = "invalid:"+categoryInput.value+":03";
        err_cat = true;
      }else if (hasClass(categoryInput, CLASSES.IS_INVALID) || (!params.has('supCatIds') || params.get('supCatIds').trim() === '') ) {
        err_msg = ERROR_MSG.ERR_CAT_ENTER;
        err_focus = this.options.categoryInput;
        err_name = catChosen;
        err_value = "invalid:"+categoryInput.value+":02";
        err_cat = true;
      }else{
        err_msg = err_msg_loc;
      }

      if (err_cat && err_loc) {
        err_focus = this.options.locationInput;
        if (err_msg_loc === ERROR_MSG.ERR_SELECT_CITY){
          err_msg = ERROR_MSG.ERR_SELECT_CITY_CAT;
          err_name = locInput;
          err_value = "invalid:"+locationInput.value+":05";
        }else{
          err_msg = ERROR_MSG.ERR_LOC_CAT;
          err_name = locInput;
          err_value = ( locationInput.value === "" ) ? "required" : "invalid:"+locationInput.value+":01";
        }
      }
    }

    if (err_msg !== '') {
      removeClass(errorModal, 'hide');
      errorModal.dataset['focus'] = err_focus;
      errorModal.querySelector("." + this.options.caseIntakeErrorMsg).innerText = err_msg;
      addClass(form.querySelector('.' + err_focus), "case-intake-form__input--error");

      // LMS-8214 - error message tracking (function found in html/php)
      cifErrorTracker(err_name,err_value);
      this.options.wasSubmitted = false; // reset wasSubmitted to prevent auto submit when re input on zipcode
      return false;
    }

    return true;
  }
}
