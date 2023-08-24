$(document).ready(() => {
    initPage().then(() => {
        routePages();
    });
    $('#products').on('click', () => {
        window.location.href = '/products';
    });
    $('#reg').on('click', () => {
        window.location.href = '/register';
    });
});

function initMap() {
    // Branch 1 - Jerusalem
    var map1 = new google.maps.Map(document.getElementById('map1'), {
        center: { lat: 31.7683, lng: 35.2137 },
        zoom: 12
    });
    var marker1 = new google.maps.Marker({
        position: { lat: 31.7683, lng: 35.2137 },
        map: map1
    });

    // Branch 2 - Tel Aviv
    var map2 = new google.maps.Map(document.getElementById('map2'), {
        center: { lat: 32.0853, lng: 34.7818 },
        zoom: 12
    });
    var marker2 = new google.maps.Marker({
        position: { lat: 32.0853, lng: 34.7818 },
        map: map2
    });

    // Branch 3 - Ashdod
    var map3 = new google.maps.Map(document.getElementById('map3'), {
        center: { lat: 31.8079, lng: 34.6553 },
        zoom: 12
    });
    var marker3 = new google.maps.Marker({
        position: { lat: 31.8079, lng: 34.6553 },
        map: map3
    });

    // Branch 4 - Netanya
    var map4 = new google.maps.Map(document.getElementById('map4'), {
        center: { lat: 32.3329, lng: 34.8599 },
        zoom: 12
    });
    var marker4 = new google.maps.Marker({
        position: { lat: 32.3329, lng: 34.8599 },
        map: map4
    });
}
