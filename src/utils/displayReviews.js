import store from '../utils/restauStore';

export default function displayReviews(){
    /**
     * Gestion affichage avis et note
     */
    let reviews = []
    for (let i = 0; i < store.state.restaurants.length; i++) {
        reviews.push([])

        for (let j = 0; j < store.state.restaurants[i].ratings.length; j++) {
            reviews[i].push(store.state.restaurants[i].ratings[j])
        }
    }
    store.commit('SET_REVIEWS', reviews)
    return store.state.reviews
}
