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

        restaurants.forEach(restaurant => {
            function getDetailsCallback(reviews){

                    if(reviews == null || reviews == undefined) {
                        function setTime() { 
                            service.getDetails(getDetailsRequest, getDetailsCallback)
                        }
                        setTimeout(setTime, 250); 
                    }
                    if(reviews.reviews == undefined) {
                        reviews.reviews = []
                    }

                    restaurant.reviews = reviews
                    const lat = restaurant.geometry.location.lat()
                    const lng = restaurant.geometry.location.lng()
                    restaurant.img = `https://maps.googleapis.com/maps/api/streetview?size=150x150&location=${lat},${lng}&key=${API_KEY}`
            }

            const getDetailsRequest = {
                fields: ['reviews'],
                placeId: restaurant.place_id
            }

            service.getDetails(getDetailsRequest, getDetailsCallback)

            if(restaurant.rating == undefined){
                restaurant.rating = 'X'
            }else{
                restaurant.rating = restaurant.rating.toFixed(1)
            }
            
        });

        store.commit('UPDATE_RESTAU', restaurants)
    }
}