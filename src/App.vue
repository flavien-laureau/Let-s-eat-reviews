<template>
	<div class="container-fluid">
		<HeaderApp class="row"></HeaderApp>
		<div class="main row">
			<GoogleMap class="col"></GoogleMap>
			<ListRestaurants class="col"></ListRestaurants>
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
	overflow: hidden;
}
.container-fluid{
	height: 100%;
}
.main{
	height: 90%;
}


</style>
