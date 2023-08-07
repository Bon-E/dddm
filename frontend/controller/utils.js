async function initPage() {
    await checkIsLogged();
    await checkAndInitModel();
    await loadHeader();
}

async function checkIsLogged() {
    let model = Model.getInstance();

    const logged = await $.get('/isLogged');
    if (! logged) {
        model.initData();
    }
}

async function checkAndInitModel() {
    let model = Model.getInstance();

    if (!Array.isArray(model.getPlatforms()) || ! model.getPlatforms().length) {
        await initPlatforms();
    }
    if (!Array.isArray(model.getCategories()) || ! model.getCategories().length) {
        await initCategories();
    }
    if (!Array.isArray(model.getVendors()) || ! model.getVendors().length) {
        await initVendors();
    }
}

async function initPlatforms() {
    let model = Model.getInstance();
    $.get('/get_platforms').done(platforms => {
        model.setPlatforms(platforms);
    });
}
async function initCategories() {
    let model = Model.getInstance();
    $.get('/get_categories').done(categories => {
        model.setCategories(categories);
    });
}

async function initVendors() {
    let model = Model.getInstance();
    $.get('/get_vendors').done(vendors => {
        model.setVendors(vendors);
    });
}
