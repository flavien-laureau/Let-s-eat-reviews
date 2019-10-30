import store from './restauStore';
import markers from './markers'
import infoWindow from './infoWindow'


function addMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: store.state.map,
	    animation: google.maps.Animation.DROP
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
    
    for (let i = 0; i < store.state.restaurants.length; i++) {
        const lat = store.state.restaurants[i].geometry.location.lat()
        const lng = store.state.restaurants[i].geometry.location.lng()
        const position = {lat: lat, lng: lng}
        addMarker(position)		
    }

    infoWindow()
}