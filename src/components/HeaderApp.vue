<template>
	<header id="header">
		<h1 id="h1">Let's Eat Reviews</h1>
		<div id="midHeader">
			<button @click="showPAddRestau(true)" id="btnAddRestau" class="button btnPrimary">Ajouter un restaurant</button>
			<p id="pAddRestau">Cliquer sur la carte ! <button @click="showPAddRestau(false)" class="button btnPrimary">x</button></p>
		</div>

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
	name: 'HeaderApp',
	data() {
		return {
			restaurants: [],
			keyMin: "0",
			keyMax: "5",
			pAddRestau: store.state.pAddRestau
		}
	},
	mounted() {
		const t = this
		function setTime() {
			t.restaurants = store.state.restaurants
			console.log("test",store.state.restaurants)
		 }
		setTimeout(setTime, 2000);

		document.querySelector('#pAddRestau').style.display = 'none'
	},
	methods: {
		search(){
			store.commit('UPDATE_RESTAU', this.restaurants.filter(restau => restau.rating >= this.keyMin && restau.rating <= this.keyMax))
			refresh()
			//displayReviews() 
		},
		clg() {
			console.log(store.state.restaurants)
		},
		showPAddRestau(value){
			store.commit('ADD_RESTAU', value)
			if(value) {
				document.querySelector('#pAddRestau').style.display = 'block'
			}else{
				document.querySelector('#pAddRestau').style.display = 'none'
			}
			this.pAddRestau = store.state.pAddRestau

		}
	}
}
</script>

<style src="../utils/style.css" scoped>

</style>