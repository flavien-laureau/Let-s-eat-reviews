import store from './restauStore';
import markers from './markers'
import infoWindow from './infoWindow'


function addMarker(location) {
    const marker = new store.getters.google.maps.Marker({
        position: location,
        map: store.state.map,
        animation: store.getters.google.maps.Animation.DROP,
        icon: 'http://maps.google.com/mapfiles/kml/pal2/icon40.png'
    });
    markers.table.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.table.length; i++) {
        markers.table[i].setMap(map);
    }
}

export default function refreshMarkers(){

    setMapOnAll(null);
    markers.table = []
    
    for (let i = 0; i < store.getters.restaurants.length; i++) {
        const lat = store.getters.restaurants[i].geometry.location.lat()
        const lng = store.getters.restaurants[i].geometry.location.lng()
        const position = {lat: lat, lng: lng}
        addMarker(position)		
    }

    infoWindow()
}