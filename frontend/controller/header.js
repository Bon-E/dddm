const loadHeader = async () => {
    let model = Model.getInstance();
    if (model.getHeader() == undefined) {
        await $.get('/header').done((res_data) => {
            model.setHeader(res_data);
        });
    }
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

    $("#maintainProductsBtn").on('click', () => {
        window.location.href = '/products_maint';
    });

    $("#disconnectBtn").on('click', () => {
        $.get('/disconnect').done((res) => {
            let model = Model.getInstance();
            model.initData();
            window.location.href = '/';
        });
    });

    $("#vendorsbtn").on('click', () => {
        window.location.href = '/vendors';
    });

}

const hide_show_elements = () => {
    let model = Model.getInstance();
    if (model.getIsLogged() == true) {
        $("#loginBtn").hide();
        $("#registerBtn").hide();
        $("#disconnectBtn").show();
        if (model.getIsAdmin()) {
            $("#maintainProductsBtn").show();
        } else {
            $("#maintainProductsBtn").hide();
        }
    } else {
        $("#maintainProductsBtn").hide();
        $("#disconnectBtn").hide();
        $("#loginBtn").show();
        $("#registerBtn").show();
    }
}
