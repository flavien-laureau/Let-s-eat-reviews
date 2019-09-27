<template>
	<header id="header">
		<h1 id="h1">Let's Eat Reviews</h1>
		<form id="form-header">
			<label id="label-header">Affiner la recherche :</label>
			<select v-model='keyMin' class="custom-select custom-select-sm select">
				<option value="0">0</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</select>
			<select v-model='keyMax' class="custom-select custom-select-sm select">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<button @click.prevent='search' class="button btnPrimary">Rechercher</button>
			<button @click.prevent='clg' class="button btnPrimary">console.log</button>
		</form>
	</header>
</template>

<script>
import store from '../utils/restauStore';
import refresh from '../utils/refresh';
import displayReviews from '../utils/displayReviews';


export default {
	store : store,
	data() {
		return {
			restaurants: store.state.restaurants,
			keyMin: "0",
			keyMax: "5"
		}
	},
	methods: {
		search(){
			store.commit('FILTER', this.restaurants.filter(restau => restau.average >= this.keyMin && restau.average <= this.keyMax))
			refresh()
			displayReviews()
		},
		clg() {
			console.log(store.state.restaurants)
		}
	}
}
</script>

<style src="../utils/style.css" scoped>

</style>