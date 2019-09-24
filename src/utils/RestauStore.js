import Vue from 'vue'
import Vuex from 'vuex'
import restaurants from './restaurants.json'

Vue.use(Vuex)

const state = {
    restaurants: restaurants
}

const mutations = {
    FILTER: (state, restaurants) => {
        state.restaurants = restaurants
    },
    MAP: (state, map) => {
        state.map = map
    }
}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: {},
    actions: {}
})