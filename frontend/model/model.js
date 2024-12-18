const Model = (function () {
    let instance;
    let data;

    let header = undefined;
    let cityArray = [];
    let addressesArray = [];
    let platforms = [];
    let categories = [];
    let vendors = [];
    let products = [];
    let users = [];
    let userTypes = [];
    let orders = [];
    let statuses = [];

    function init_sessionStorage() {
        data = {
            isLogged: false,
            isAdmin: false,
            cart: []
        };
        save_sessionStorage();
    }

    function load_sessionStorage() {
        let model = JSON.parse(sessionStorage.getItem('Model'));
        if (model === null || model === undefined || Object.keys(model).length === 0) {
            init_sessionStorage();
        }
        data = model;
    }
    function save_sessionStorage() {
        sessionStorage.setItem('Model', JSON.stringify(data));
    }
    function init() {
        load_sessionStorage();
        return {
            getCities: function () {
                return cityArray;
            },
            setCities: function (c) {
                cityArray = c;
            },
            getAddresses: function () {
                return addressesArray;
            },
            setAddresses: function (c) {
                addressesArray = c;
            },
            getCategories: function () {
                return categories;
            },
            setCategories: function (c) {
                categories = c;
            },

            getVendors: function () {
                return vendors;
            },
            setVendors: function (v) {
                vendors = v;
            },
            getPlatforms: function () {
                return platforms;
            },
            setPlatforms: function (p) {
                platforms = p;
            },
            getHeader: function () {
                return header;
            },
            setHeader: function (h) {
                header = h;
            },
            getProducts: function () {
                return products;
            },
            setProducts: function (p) {
                products = p;
            },
            getIsLogged: function () {
                return data.isLogged;
            },
            setIsLogged: function (l) {
                data.isLogged = l;
            },
            getIsAdmin: function () {
                return data.isAdmin;
            },
            setIsAdmin: function (a) {
                data.isAdmin = a;
            },
            getUsers: function () {
                return users;
            },
            setUsers: function (u) {
                users = u;
            },
            getUserTypes: function () {
                return userTypes;
            },
            setUserTypes: function (u) {
                userTypes = u;
            },
            AddToCart: function (a) {
                data.cart.push(a);
            },
            SetCart: function (a) {
                data.cart = a;
            },
            GetCart: function () {
                return data.cart;
            },
            getOrders: function () {
                return orders;
            },
            setOrders: function (ords) {
                orders = ords;
            },
            getStatuses: function () {
                return statuses;
            },
            setStatuses: function (s) {
                statuses = s;
            },
            saveData: function () {
                save_sessionStorage();
            },
            initData: function () {
                init_sessionStorage();
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
