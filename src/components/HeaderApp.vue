<template>
	<header>
		<h1>Let's Eat Reviews</h1>
		<form>
			<label>Affiner la recherche :</label>
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
			<button @click.prevent='search' class="btnPrimary">Rechercher</button>
			<button @click.prevent='clg' class="btnPrimary">console.log</button>
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

<style scoped>

header {
	height: 80px;
	max-height: 80px;
	background-color: #333;
}

h1{
	color: #FAFAFA;
	margin: auto 0;
	width: 50%;
	text-align: center;
	white-space:nowrap;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

form{
	display: flex;
	width: 50%;
	justify-content: center;
}

label{
	color: #FAFAFA;
	margin: auto 15px;
	font-size: 1.1em;
}

.select{
	width: 50px;
	height: 50%;
	margin: auto 15px;
}

.btnPrimary{
	color: white;
    background-color: #428bca;
	margin: auto 15px;
	height: 50%;
    border: 2px solid #0088ff;
    
}

.btnPrimary:hover{
    background-color: #317ab9;
}
</style>