import store from './restauStore';

export default function nearbySearchCallback(results, status){
    const service = new store.state.google.maps.places.PlacesService(store.state.map);
    
    if (status == store.state.google.maps.places.PlacesServiceStatus.OK){
        let restaurants = results
        for (let i = 0; i < restaurants.length; i++){
            function getDetailsCallback(reviews, status){
                if (status == store.state.google.maps.places.PlacesServiceStatus.OK){
                    restaurants[i].reviews = reviews
                }else {
                    restaurants[i].reviews = []
                }
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