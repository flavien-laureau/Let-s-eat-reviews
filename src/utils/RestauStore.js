import Vue from 'vue'
import Vuex from 'vuex'/* 
import restaurants from '../components/restaurants.json' */

Vue.use(Vuex)

const state = {/* 
    restaurants: restaurants, */
    filterMin: 0,
	filterMax: 5
}

const mutations = {
    /* FILTER: (state, restaurants) => {
        state.restaurants = restaurants
    }, */
    CHANGE_MIN: (state, value) => {
        state.filterMin = value
    },
    CHANGE_MAX: (state, value) => {
        state.filterMax = value
    }
}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: {},
    actions: {},
    strict: true
})