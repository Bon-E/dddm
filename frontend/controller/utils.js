async function initPage() {
    await checkAndInitModel();
    await loadHeader();
}

async function checkAndInitModel() {
    let model = Model.getInstance();
    if (!Array.isArray(model.getPlatforms()) || ! model.getPlatforms().length) {
        await initPlatforms();
    }
    if (!Array.isArray(model.getCategories()) || ! model.getCategories().length) {
        await initCategories();
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
