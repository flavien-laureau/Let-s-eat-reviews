import Vue from 'vue'
import Vuex from 'vuex'
import restaurants from './restaurants.json'

Vue.use(Vuex)

const state = {
    restaurants: restaurants,
    reviews: []
}

const mutations = {
    FILTER: (state, restaurants) => {
        state.restaurants = restaurants
    },
    MAP: (state, map) => {
        state.map = map
    },
    SET_REVIEWS: (state, reviews) => {
        state.reviews = reviews
    },
    ADD_REVIEW: (state, review) => {
        state.restaurants[review.index].ratings.push({
            "stars": review.rate,
            "comment": review.comment
        })
    },
}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: {},
    actions: {}
})