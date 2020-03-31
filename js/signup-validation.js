$("form.login-form").validate({
    rules: {
        email: {
            required: true,
            email: true,
            nonTest: true,
            normalizer: function( value ) {
                return $.trim( value );
            }
        },
        password: {
            required: true,
            minlength: 4
        },
        confirmPassword: {
            equalTo: "#password",
            required: true,
            minlength: 4
        }
    },
    wrapper: "div",
    submitHandler: function(form) {
        
        // form.submit();
        fetch('http://localhost:8080/signup',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: $("#email").val(),
                password: $("#password").val(),
                confirmPassword: $("#confirmPassword").val()
            })
        })
        .then(res => {
            //console.log(res.status);
            if(res.status === 200 || res.status === 201) {
                const sucMsg = `<div class="user-message">רישום הסתיים בהצלחה!</div>`;
                $(sucMsg).insertBefore(".login-form");
            }
            return res.json();
        }).then(jsonRes => {
            if(jsonRes.validationErrors){
                jsonRes.validationErrors.forEach(error => {
                    const errMsg = `<div class="user-message user-message__error"><label id="${error.param}-error" class="invalid" for="${error.param}" style="">${error.msg}</label></div>`;
                    $(errMsg).insertAfter(`#${error.param}`);
                    console.log(error.param);
                });
            }
            console.log(jsonRes);
        }).catch(err => {
            console.error(err);
        })
    }, 
});