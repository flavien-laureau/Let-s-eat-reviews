import store from './restauStore';
import nearbySearchCallback from './nearbySearchCallback';
import refreshMarkers from './refreshMarkers';


export default function refreshSearch(){
    const service = new store.getters.google.maps.places.PlacesService(store.state.map);
    const center = store.state.map.getCenter() //==> latLng

    const nearbySearchRequest = {
        location: center,
        radius: 650,
        types: ['restaurant']
    };
    
    service.nearbySearch(nearbySearchRequest, nearbySearchCallback);

    setTimeout(refreshMarkers, 1000);
}
