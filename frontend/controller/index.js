$(document).ready(() => {
    initPage().then(() => {
        routePages();
        // console.log(Model.getInstance().getPlatforms());
        // console.log(Model.getInstance().getCategories());
    });
});
