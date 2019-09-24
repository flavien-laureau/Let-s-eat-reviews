<template>
	<div class="container-fluid">
		<headerApp class="row"></headerApp>
		<div class="main row">
			<GoogleMap class="col"></GoogleMap>
			<listRestaurants class="col"></listRestaurants>
		</div>
	</div>
</template>

<script>
import GoogleMap from './components/GoogleMap'
import ListRestaurants from './components/ListRestaurants.vue'
import HeaderApp from './components/HeaderApp.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
	components: {
		ListRestaurants,
		GoogleMap,
		HeaderApp
	},
	updated() {
		
	}
}
</script>

<style>
body, html{
	padding: 0;
	margin: 0;
	height: 100%;
	overflow: hidden;
}
.container-fluid{
	height: 100%;
}
.main{
	height: 90%;
}


</style>
