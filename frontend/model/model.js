const Model = (function () {

    let instance;

    let data = {
        header: undefined,
        isLogged: false,
        cityArray: [],
        platforms: [],
        categories: [],
        vendors: []
    };

    function init_localStorage() {
        save_localStorage(); // initialize localStorage with initialized data variable
    }

    function load_localStorage() {
        let model = JSON.parse(sessionStorage.getItem('Model'));
        if (model === null || model === undefined || Object.keys(model).length === 0) {
            init_localStorage();
        }

        data = model;
    }

    function save_localStorage() {
        sessionStorage.setItem('Model', JSON.stringify(data));
    }

    function init() {
        load_localStorage();

        return {

            getCities: function () {
                return data.cityArray;
            },
            setCities: function (c) {
                data.cityArray = c;
            },

            getCategories: function () {
                return data.categories;
            },
            setCategories: function (c) {
                data.categories = c;
            },

            getVendors: function () {
                return data.vendors;
            },
            setVendors: function (v) {
                data.vendors = v;
            },

            getPlatforms: function () {
                return data.platforms;
            },
            setPlatforms: function (p) {
                data.platforms = p;
            },

            getHeader: function () {
                return data.header;
            },
            setHeader: function (h) {
                data.header = h;
            },

            getIsLogged: function () {
                return data.isLogged;
            },
            setIsLogged: function (l) {
                data.isLogged = l;
            },

            saveData: function () {
                save_localStorage();
            }
        }
    }

    return {
        getInstance: function () {
            if (! instance) {
                instance = init();
            }
            return instance;
        }
    }
})();
