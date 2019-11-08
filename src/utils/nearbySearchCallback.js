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
                //console.log(reviews)
                //console.log(reviews.reviews)

                    if(reviews == null || reviews == undefined) {
                        //console.log("boucle")
                        function setTime() { 
                            service.getDetails(getDetailsRequest, getDetailsCallback)
                        }
                        setTimeout(setTime, 250); 
                    }
                    if(reviews.reviews == undefined) {
                        //console.log('undefined !!!!!!!!!!!')
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

        /* for (let i = 0; i < restaurants.length; i++){

            function getDetailsCallback(reviews){
                console.log(reviews)
                console.log(reviews.reviews)

                    if(reviews == null) {
                        console.log("boucle")
                        function setTime() { 
                            service.getDetails(getDetailsRequest, getDetailsCallback)
                        }
                        setTimeout(setTime, 300); 
                    }
                    if(reviews.reviews == undefined) {
                        console.log('undefined !!!!!!!!!!!')
                        reviews.reviews = []
                    }
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


        }  */
        store.commit('UPDATE_RESTAU', restaurants)
    }
}