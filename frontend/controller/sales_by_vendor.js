$(document).ready(() => {
    initPage().then(() => {
        routePages();
    });
    $('#products').on('click', () => {
        window.location.href = '/products';
    });
});
