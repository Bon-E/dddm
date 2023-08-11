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

    const isAdmin = $.get('/isAdmin');

    if (isAdmin) {
        if (!Array.isArray(model.getUserTypes()) || ! model.getUserTypes().length) {
            await initUserTypes();
        }
    }

}

async function initUserTypes() {
    let model = Model.getInstance();
    const userTypes = await $.get('/get_user_types');
    model.setUserTypes(userTypes);
}

async function initPlatforms() {
    let model = Model.getInstance();
    const platforms = await $.get('/get_platforms');
    model.setPlatforms(platforms);
}
async function initCategories() {
    let model = Model.getInstance();
    const categories = await $.get('/get_categories');
    model.setCategories(categories);
}

async function initVendors() {
    let model = Model.getInstance();
    const vendors = await $.get('/get_vendors');
    model.setVendors(vendors);
}
