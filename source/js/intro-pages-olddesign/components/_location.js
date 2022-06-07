/* eslint-disable */
'use strict';

const $body = $('body');
const $locationField = $('.location-input');
const $locationChecker = $('.component-location-extended');
const errorLocationSubmitClass = 'location-submit-error';
const hasSuggestionClass = 'has-suggestion';
const classValid = 'valid';
const classInvalid = 'invalid';
const classLoader = 'loader';

$('.component-location').legalmatch('location');

$(window).on('load pageshow', function () {
    if ($locationField.val() !== '') {
        $locationField.val('');
        $locationField.removeClass(
            `${errorLocationSubmitClass} ${hasSuggestionClass}`
        );
        $locationChecker.removeClass(classInvalid);
    }

    $locationChecker.removeClass(`${classValid} ${classLoader}`);
    $body.trigger('legalmatch:location', {
        zip_select: '',
        state_select: '',
        city_select: '',
    });

    $('fieldset input[type="checkbox"], fieldset input[type="radio"]').prop(
        'checked',
        false
    );
});

$body.on('legalmatch:location', (e, result) => {
    const locData = result;
    let oForm = $('.location-input').closest('form');

    oForm.find('[name="zip_select"]').val(locData.zip_select);
    oForm.find('[name="state_select"]').val(locData.state_select);
    oForm.find('[name="city_select"]').val(locData.city_select);
});
