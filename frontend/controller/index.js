$(document).ready(() => {
    initPage().then(() => {
        routePages();
    });
    const routePages = () => {
        $("#products").on('click', () => {
            window.location.href = '/products';
        });
    }
});