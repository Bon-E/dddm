$(document).ready(() => {
    loadHeader().then(() => {
        routePages();
        fetchCities();
    });

    $('#phoneNumber').on('input', function () {
        var inputValue = $(this).val();
        if (inputValue.length > 7) {
            $(this).val(inputValue.slice(0, 7));
        }
    });

    $("#city").autocomplete({
        minLength: 2,
        source: function (request, resolve) {
            let model = Model.getInstance();
            // fetch new values with request.term
            const filteredCities = model.getCities().filter(function (city) {
                return city.toLowerCase().indexOf(request.term.toLowerCase()) === 0;
            });
            resolve(filteredCities);
        }
    });

});

$(function () {
    $('#firstName').on('input', function () {
        var inputValue = $(this).val();
        var sanitizedValue = sanitizeInput(inputValue);
        $(this).val(sanitizedValue);
    });
});

// Remove any non-letter characters using regular expression
function sanitizeInput(input) {
    var sanitized = input.replace(/[^a-zA-Z]/g, '');
    return sanitized;
}

const handle_register = (event) => {
    event.preventDefault();
    if (comparePasswords()) {
        addNewUser(createUserData());
    }
};

const createUserData = () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const email = $('#email').val();
    const fname = $('#firstName').val();
    const lname = $('#lastName').val();
    const phone = $('#phone_start').val() + '-' + $('#phoneNumber').val();
    const birthday = $('#dateOfBirth').val();
    const city = $('#city').val();
    const street = $('#street').val();
    const house_number = $('#homenumber').val();

    const address = {
        city,
        street,
        house_number
    };

    const userData = {
        username,
        password,
        fname,
        lname,
        email,
        phone,
        birthday,
        address
    };

    return userData;
};

const addNewUser = (userData) => {
    $.post('/create_user', userData).done(savedUser => { // TODO: redirect to login page
        alert('Successfully registered !');
        window.location.href = "/login";
    }).fail(error => { // TODO: show error message in page, not in the console
        console.error('Error registering user:', error);
    });
};

function comparePasswords() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    return password === confirmPassword;
}
