import store from './restauStore';
import markers from './markers'

function addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: store.state.map
    });
    markers.table.push(marker);
}

export default function addRestau(){
    
    store.state.map.addListener('click', function(e) {
        addMarker(e.latLng);
        store.state.restaurants.push({
            "id": store.state.restaurants.length + 1,
            "restaurantName":"Nouveau restau",
            "address":"nouvelle adresse",
            "lat":e.latLng.lat,
            "lng":e.latLng.lng,
            "ratings":[
               {
                  "stars":1,
                  "comment":"Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
               },
               {
                  "stars":1,
                  "comment":"Tout simplement mon restaurant préféré !"
               }
            ]
         })
    });
}