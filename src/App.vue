<template>
	<div class="container-fluid">
		<headerApp class="row"></headerApp>
		<div class="main row">
			<googleMap class="col"></googleMap>
			<listRestaurants class="col"></listRestaurants>
		</div>
	</div>
</template>

<script>
import GoogleMap from './components/GoogleMap'
import ListRestaurants from './components/ListRestaurants.vue'
import HeaderApp from './components/HeaderApp.vue'

export default {
	components: {
		ListRestaurants,
		GoogleMap,
		HeaderApp
	}
}
</script>

<style>
body, html{
	padding: 0;
	margin: 0;
	height: 100%;
}
.container-fluid{
	height: 100%;
}
.main{
	height: 90%;
}


</style>
