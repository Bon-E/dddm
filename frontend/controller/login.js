$(document).ready(() => {
    initPage().then(() => {
        routePages();
    });
});

function login(event) {
    event.preventDefault();
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
                    $.get('/isAdmin').done(res => {
                        model.setIsAdmin(res);
                        model.setIsLogged(true);
                        // save model data to local storage before redirecting
                        model.saveData();
                        alert("Successfully logged in");
                        window.location.href = "/";
                    });
                }
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function check_input(username, password) {
    return true;
}
