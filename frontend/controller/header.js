const loadHeader = async () => {
    let model = Model.getInstance();
    if (model.getHeader() == undefined) {
        await $.get('/header').done((res_data) => {
            console.log('loaded!');
            model.setHeader(res_data);
        });
    }
    console.warn(model.getIsLogged());
    $('#_header').html(model.getHeader());
    hide_show_elements();
}

const routePages = () => {
    $("#loginBtn").on('click', () => {
        window.location.href = '/login';
    });

    $("#homeBtn").on('click', () => {
        window.location.href = '/';
    });

    $("#registerBtn").on('click', () => {
        window.location.href = '/register';
    });
}

const hide_show_elements = () => {
    let model = Model.getInstance();
    if (model.getIsLogged() == true) {
        $("#loginBtn").hide();
        $("#registerBtn").hide();
    } else {
        $("#loginBtn").show();
        $("#registerBtn").show();
    }
}
