export let curLocationState = {
    lat : 1,
    lon : 1
}

navigator.geolocation.getCurrentPosition(function(pos) {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    curLocationState = {
        lat,
        lon
    }
});