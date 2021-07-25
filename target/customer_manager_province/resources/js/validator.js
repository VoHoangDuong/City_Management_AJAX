$("#form").validate({
    rules: {
        upName: {
            required: true,
            minlength: 5,
        },
        upCountry: {
            required: true,
        },
        upAcreage: {
            required: true,
            min: 5,
        },
        upPopulation: {
            required: true,
            min: 1,
        },
        upGDP: {
            required: true,
            min: 5,
        },
        upDescription: {
            required: true,
            minlength: 5,
            maxlength: 50,
        },
    },

    messages: {
        upName: {
            required:"Please enter your City name !!!",
            minlength:"Minimum length of 5 characters !!",
        },
        upCountry: {
            required: "Please choose a country !!",
        },
        upAcreage: {
            required: "Please enter the area !!",
            min: "Area greater than 5 and other than 0 !!"
        },
        upPopulation: {
            required: "Please enter the population !!",
            min: "Population greater than 1 !!"
        },
        upGDP: {
            required: "Please enter the GDP !!",
            min: "Population greater than 5 !!"
        },
        upDescription: {
            required: "Please enter the description !!",
            minlength: "Minimum length of 5 characters !!",
            maxlength: "Maximum length 50 characters !!"
        },
    },
    submitHandler: function(form) {
        form.submit();
    }
});
