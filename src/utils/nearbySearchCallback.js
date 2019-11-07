import store from './restauStore';
import key from './apikey'

export default function nearbySearchCallback(results, status){
    const service = new store.getters.google.maps.places.PlacesService(store.state.map);
    const API_KEY = key()

    if (status == store.getters.google.maps.places.PlacesServiceStatus.OK){
        let restaurants = results

        if(restaurants.length > 9) {
            restaurants.length = 9
        }

        for (let i = 0; i < restaurants.length; i++){

            function getDetailsCallback(reviews, status){
                    restaurants[i].reviews = reviews
                    const lat = restaurants[i].geometry.location.lat()
                    const lng = restaurants[i].geometry.location.lng()
                    restaurants[i].img = `https://maps.googleapis.com/maps/api/streetview?size=150x150&location=${lat},${lng}&key=${API_KEY}`
            }
            const getDetailsRequest = {
                fields: ['reviews'],
                placeId: restaurants[i].place_id
            }


            service.getDetails(getDetailsRequest, getDetailsCallback)


            if(restaurants[i].rating == undefined){
                restaurants[i].rating = 'X'
            }else{
                restaurants[i].rating = restaurants[i].rating.toFixed(1)
            }

        } 
        store.commit('UPDATE_RESTAU', restaurants)
    }
}