<template>
	<div class="container-fluid">
		<HeaderApp :event-bus="eventBus" class="row"></HeaderApp>
		<div class="main row">
			<GoogleMap :event-bus="eventBus" class="col"></GoogleMap>
			<ListRestaurants :event-bus="eventBus" class="col"></ListRestaurants>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import mapInit from './utils/mapInit';
import GoogleMap from './components/GoogleMap'
import ListRestaurants from './components/ListRestaurants.vue'
import HeaderApp from './components/HeaderApp.vue'

export default {
	data() {
		return{
			eventBus: new Vue()
		}
	},
	components: {
		ListRestaurants,
		GoogleMap,
		HeaderApp
	},
	async mounted() {
		await mapInit()
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
