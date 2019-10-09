import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    restaurants: '',
    addRestau: false
}

const mutations = {
    UPDATE_RESTAU: (state, restaurants) => {
        state.restaurants = restaurants
    },
    MAP: (state, map) => {
        state.map = map
    },
    GOOGLE: (state, google) => {
        state.google = google
    },
    SERVICE: (state, service) => {
        state.service = service
    },
    SET_REVIEWS: (state, reviews) => {
        state.restaurants = reviews
    },
    ADD_REVIEW: (state, review) => {
        state.restaurants[review.index].reviews.push({
            "rating": review.rating,
            "text": review.text
        })
    },
    ADD_RESTAU: (state, value) => {
        state.addRestau = value
    }
}


export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: {},
    actions: {}
})