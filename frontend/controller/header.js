const loadHeader = async () => {
    let model = Model.getInstance();
    if (model.getHeader() == undefined) {
        await $.get('/header').done((res_data) => {
            model.setHeader(res_data);
        });
    }
    $('#_header').html(model.getHeader());
    hide_show_elements();
};

const routePages = () => {
    $('#loginBtn').on('click', () => {
        window.location.href = '/login';
    });

    $('#homeBtn').on('click', () => {
        window.location.href = '/';
    });

    $('#cart').on('click', () => {
        window.location.href = '/cart';
    });

    $('#registerBtn').on('click', () => {
        window.location.href = '/register';
    });

    $('#maintainProductsBtn').on('click', () => {
        window.location.href = '/products_maint';
    });

    $('#disconnectBtn').on('click', () => {
        $.get('/disconnect').done((res) => {
            let model = Model.getInstance();
            model.initData();
            window.location.href = '/';
        });
    });

    $('#vendorsbtn').on('click', () => {
        window.location.href = '/maintain_vendors';
    });

    $('#maintainUsersBtn').on('click', () => {
        window.location.href = '/maintain_users';
    });

    $('#editAccount').on('click', () => {
        window.location.href = '/edit_details';
    });

    $('#maintainOrdersBtn').on('click', () => {
        window.location.href = '/maintainOrdersBtn';
    });

    $('#myOrders').on('click', () => {
        window.location.href = '/myOrders';
    });

    $('#sales_by_vendor').on('click', () => {
        window.location.href = '/vendorSalesReport';
    });

    $('#last_week_sales').on('click', () => {
        window.location.href = '/lastWeekSalesReport';
    });
};

const hide_show_elements = () => {
    let model = Model.getInstance();
    if (model.getIsLogged() == true) {
        $('#loginBtn').hide();
        $('#registerBtn').hide();
        $('#reports').hide();
        $('#disconnectBtn').show();
        $('#editAccount').show();
        $('#maintenance').hide();
        $('#myOrders').show();
        $('#cart').show();
        if (model.getIsAdmin()) {
            // user is admin
            $('#myOrders').hide();
            $('#cart').hide();
            $('#editAccount').hide();
            $('#maintenance').show();
            $('#reports').show();
            console.log('help mee');
        }
    } else {
        // user isn't logged in
        $('#reports').hide();
        $('#maintenance').hide();
        $('#myOrders').hide();
        $('#cart').hide();
        $('#disconnectBtn').hide();
        $('#loginBtn').show();
        $('#registerBtn').show();
        $('#editAccount').hide();
    }
};
