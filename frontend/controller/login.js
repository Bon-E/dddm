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
                    model.setIsLogged(true);
                    model.saveData(); // save model data to local storage before redirecting
                    alert("Successfully logged in");
                    window.location.href = "/"; // redirect back to main screen
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
