import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    restaurants: '',
    reviews: [],
    addRestau: false
}

const mutations = {
    UPDATE_RESTAU: (state, restaurants) => {
        state.restaurants = restaurants
    },
    MAP: (state, map) => {
        state.map = map
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

const actions = {

}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: {},
    actions: {}
})