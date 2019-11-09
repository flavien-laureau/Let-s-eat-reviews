import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    restaurants: [],
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
    ADD_REVIEW: (state, review) => {
        if(!state.restaurants[review.index].reviews.reviews){
            state.restaurants[review.index].reviews.reviews = []
        }
        state.restaurants[review.index].reviews.reviews.push({
            "rating": review.rating,
            "text": review.text
        })
    },
    ADD_RESTAU_STATE: (state, value) => {
        state.addRestau = value
    }
}

const getters = {
    restaurants: state => {
        return state.restaurants
    },
    google: state => {
        return state.google
    },
}


export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: {}
})
