$(document).ready(() => {
    initPage().then(() => {
        routePages();
        // console.log(Model.getInstance().getPlatforms());
        // console.log(Model.getInstance().getCategories());
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
                    model.saveData();
                    console.log('COOL!!! ', model.getIsLogged());
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
