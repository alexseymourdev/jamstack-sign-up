jQuery(document).on("click", ".validateFormStepPrev", function(event) {
    event.preventDefault();
    var fieldsetCounter = jQuery(this).data('fieldsetcounter');
    var fieldsets = jQuery('.application-form--fieldset.active');
    var fieldset = fieldsets[0];
    jQuery(fieldset).removeClass('active');
    var allFieldsets = jQuery('.application-form--fieldset');
    nextFieldSet = fieldsetCounter - 1;
    // console.log(allFieldsets);
    jQuery(allFieldsets[nextFieldSet]).addClass('active');
    scrollTo = jQuery(allFieldsets[nextFieldSet]).offset().top - 100;
    // console.log(allFieldsets[nextFieldSet]);
    // jQuery(allFieldsets[nextFieldSet]).focus();
    jQuery('html, body').animate({
            scrollTop: scrollTo
    }, 2000);
});
jQuery(document).on("click", ".validateFormStepNext, .submitApplication", function(event) {
    event.preventDefault();
    var fieldsetCounter = jQuery(this).data('fieldsetcounter');
    var fieldsets = jQuery('.application-form--fieldset.active');
    var fieldset = fieldsets[0];
    // console.log(fieldset);
    var fieldsetName = jQuery(fieldset).data('fieldset');
    var validationInputData = objInputs[fieldsetName];
    var validationInputs = objInputs[fieldsetName]['fields'];
    // console.log(objInputs);
    console.log(validationInputs);
    var objValues = {};
    var currentStepValidation = true;
    var scrollToElement;
    jQuery.each( validationInputs, function( key, value ) {
        var required = value.required;
        // console.log(required);
        var selector;
        var border = '#d2d6dc';
        switch(value.type){
            case 'radio':
                var checked = false;
                selector = 'input[name="'+key+'"]';
                console.log(selector);
                objValues[key] = '';
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                jQuery(selector).each(function( index ) {
                    if(jQuery(this).prop('checked')){
                        checked = true;
                        objValues[key] = jQuery(this).val();
                        console.log(jQuery(this).val());
                    }
                });
                if(required){
                    jQuery(selector).each(function( index ) {
                        if(!checked){
                            border = 'red';
                            currentStepValidation = false;
                            jQuery(errorMessageClass).removeClass('hidden');
                            if(!scrollToElement){
                                scrollToElement = jQuery(this);
                            }
                        }
                        jQuery(this).css('border-color',border);
                    });
                }
            break;
            case 'checkbox':
                var checked = false;
                selector = 'input[name="'+key+'[]"]';
                // console.log(selector);
                objValues[key] = [];
                // console.log(objValues);
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                jQuery(selector).each(function( index ) {
                    if(jQuery(this).prop('checked')){
                        checked = true;
                        // console.log(jQuery(this).val());
                        objValues[key].push(jQuery(this).val());
                    }
                });
                if(required){
                    jQuery(selector).each(function( index ) {
                        if(!checked){
                            border = 'red';
                            currentStepValidation = false;
                            jQuery(errorMessageClass).removeClass('hidden');
                            if(!scrollToElement){
                                scrollToElement = jQuery(this);
                            }
                        }
                        jQuery(this).css('border-color',border);
                    });
                }
            break;
            case 'text':
            case 'date_picker':
                selector = 'input#'+key;
                inputValue = jQuery(selector).val();
                // console.log(errorMessageClass);
                objValues[key] = inputValue;
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                if(!inputValue){
                    if(required){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                } else {
                    blnValidation = true;
                    switch(key){
                        case 'postcode':
                            blnValidation = isValidPostcode(inputValue);
                        break;
                        case 'email':
                            blnValidation = isValidateEmail(inputValue);
                        break;
                    }
                    if(!blnValidation){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                }
                jQuery(selector).css('border-color',border);
            break;
            case 'select':
                selector = 'select#'+key;
                // console.log(selector);
                inputValue = jQuery(selector).val();
                objValues[key] = inputValue;
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                if(!inputValue){
                    if(required){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                }
                jQuery(selector).css('border-color',border);
            break;
            case 'textarea':
                selector = 'textarea#'+key;
                // console.log(selector);
                inputValue = jQuery(selector).val();
                objValues[key] = inputValue;
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                if(!inputValue){
                    if(required){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                }
                jQuery(selector).css('border-color',border);
            break;
        }
    });
    // console.log(fieldsetCounter);
    if(currentStepValidation){
        var allFieldsets = jQuery('.application-form--fieldset');
        nextFieldSet = fieldsetCounter + 1;
        // console.log(allFieldsets);
        if(jQuery(event.target).hasClass('submitApplication')){
            jQuery('#applicationForm').submit();
        } else {
            jQuery(fieldset).removeClass('active');
            jQuery(allFieldsets[nextFieldSet]).addClass('active');
            scrollTo = jQuery(allFieldsets[nextFieldSet]).offset().top - 100;
        }
    } else {
        // console.log('scrollToElement');
        // console.log(scrollToElement);
        // console.log(scrollToElement[0]);
        // console.log(jQuery(scrollToElement));
        // console.log(jQuery(scrollToElement)[0]);
        scrollTo = scrollToElement.offset().top - 100;
        scrollToElement.focus();
    }
    
    jQuery('html, body').animate({
        scrollTop: scrollTo
    }, 2000);
    // console.log(objValues);
    // var data = {
	// 	'action': 'tcg_add_form_data',
	// 	'formData': objValues      // We pass php values differently!
	// };
	// // We can also pass the url value separately from ajaxurl for front end AJAX implementations
	// jQuery.post('/wp-admin/admin-ajax.php', data, function(response) {
	// 	// console.log(response);
	// });
});

function isValidPostcode(postcode) { 
    var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i; 
    return postcodeRegEx.test(postcode);
}

function isValidateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidateNationalInsurance(nationalInsurance) {
    const re = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/;
    return re.test(String(email).toLowerCase());
}

jQuery( document ).ready(function() {
    console.log(
    jQuery( "#date_of_birth" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0", // last hundred years
        defaultDate: '-20y',
        onSelect: function(dateText, inst) {
            jQuery(this).focus();
        }
    })
    );
});