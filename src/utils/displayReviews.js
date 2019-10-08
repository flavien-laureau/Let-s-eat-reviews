import store from '../utils/restauStore';

export default function displayReviews(){
    /**
     * Gestion affichage avis et note
     */



    let reviews = []

    for (let i = 0; i < store.state.restaurants.length; i++) {
        reviews.push([])
        getDetailsRequest.push({
            fields: ['reviews'],
            placeId: store.state.restaurants[i].place_id
        })
        service.getDetails(getDetailsRequest[i], callback)

        function callback(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK){
                for (let j = 0; j < results.reviews.length; j++) {
                    reviews[i].push( results.reviews[j])
                }
            }
        }
    }
    
    console.log(reviews)
    return store.state.reviews
    
}
