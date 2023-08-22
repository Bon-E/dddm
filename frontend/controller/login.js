$(document).ready(() => {
    initPage().then(() => {
        routePages();
        $('#errors').hide();
    });
});

function login(event) {
    event.preventDefault();
    $('#errors').hide();
    let model = Model.getInstance();
    let username = $('#username').val();
    let password = $('#password').val();

    if (check_input(username, password)) {
        $.ajax({
            url: '/authenticate',
            type: 'get',
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                if (res) {
                    $.get('/isAdmin').done((res) => {
                        model.setIsAdmin(res);
                        model.setIsLogged(true);
                        // save model data to local storage before redirecting
                        model.saveData();
                        alert('Successfully logged in');
                        window.location.href = '/';
                    });
                } else {
                    // Authentication failed, show an alert
                    showErrorAlert('Incorrect username or password.');
                }
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function showErrorAlert(message) {
    $('#errors').text(message).addClass('alert-danger').show();
}

function check_input(username, password) {
    return true;
}
