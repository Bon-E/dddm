$(document).ready(() => {
    // document.getElementById('loginBtn').addEventListener('click', function () {
    //     window.location.href = '/login';
    // });
    document.getElementById('homeBtn').addEventListener('click', function () {
        window.location.href = '/';
    });
    document.getElementById('registerBtn').addEventListener('click', function () {
        window.location.href = '/register';
    });
    // document.getElementById('console').addEventListener('click', function() {
    // window.location.href = '/consoles';
    // );
    // document.getElementById('allGames').addEventListener('click', function() {
    // window.location.href = '/games';
    // });

    $('#phoneNumber').on('input', function () {
        var inputValue = $(this).val();
        if (inputValue.length > 7) {
            $(this).val(inputValue.slice(0, 7));
        }
    });

    fetchCities();

    $("#city").autocomplete({
        minLength: 2,
        source: function (request, resolve) { // fetch new values with request.term
            const filteredCities = getCities().filter(function (city) {
                return city.toLowerCase().indexOf(request.term.toLowerCase()) === 0;
            });
            resolve(filteredCities);
        }
    });

    function sanitizeInput(input) { // Remove any non-letter characters using regular expression
        var sanitized = input.replace(/[^a-zA-Z]/g, '');
        return sanitized;
    };

    $(function () {
        $('#lastName').on('input', function () {
            var inputValue = $(this).val();
            var sanitizedValue = sanitizeInput(inputValue);
            $(this).val(sanitizedValue);
        });
    });

    $(function () {
        $('#firstName').on('input', function () {
            var inputValue = $(this).val();
            var sanitizedValue = sanitizeInput(inputValue);
            $(this).val(sanitizedValue);
        });
    });

});

const handle_register = (event) => {
    event.preventDefault();
    if (comparePasswords(event)) {
        const userData = createUserData();
        addNewUser(userData);
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
        phone: phone,
        birthday,
        address
    };


    return userData;
};

const addNewUser = (userData) => {
    $.post('/create_user', userData).done(savedUser => {
        console.log('User registered successfully:', savedUser);
    }).fail(error => {
        console.error('Error registering user:', error);
    });
};

function comparePasswords(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    return password === confirmPassword;
}
