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

    $("#disconnectBtn").on('click', () => {
        $.get('/disconnect').done((res) => {
            let model = Model.getInstance();
            model.initData();
            window.location.href = '/';
        });
    });
}

const hide_show_elements = () => {
    let model = Model.getInstance();
    if (model.getIsLogged() == true) {
        $("#loginBtn").hide();
        $("#registerBtn").hide();
        $("#disconnectBtn").show();
    } else {
        $("#disconnectBtn").hide();
        $("#loginBtn").show();
        $("#registerBtn").show();
    }
}
