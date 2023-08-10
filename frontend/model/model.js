const Model = (function () {
    let instance;
    let data;

    let header = undefined;
    let cityArray = [];
    let addressesArray = [,];
    let platforms = [];
    let categories = [];
    let vendors = [];
    let products = [];

    function init_localStorage() {
        data = {
            isLogged: false,
            isAdmin: false
        };
        save_localStorage(); // initialize localStorage with initialized data variable
    }

    function load_localStorage() {
        let model = JSON.parse(sessionStorage.getItem("Model"));
        if (model === null || model === undefined || Object.keys(model).length === 0) {
            init_localStorage();
        }

        data = model;
    }

    function save_localStorage() {
        sessionStorage.setItem("Model", JSON.stringify(data));
    }

    function init() {
        load_localStorage();

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

            saveData: function () {
                save_localStorage();
            },
            initData: function () {
                init_localStorage();
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
