<template>
	<div class="map">
	</div>
</template>

<script>
import gmapsInit from '../utils/gmaps';
import restaurants from './restaurants.json'

export default {
	data() {
		return{
			restaurants: restaurants
		}
	},
	async mounted() {
		try {
			const google = await gmapsInit();
			const geocoder = new google.maps.Geocoder();
			const map = new google.maps.Map(this.$el);
			for (let i = 0; i < this.restaurants.length; i++) {
				const lat = this.restaurants[i].lat
				const lng = this.restaurants[i].lng
				const position = {lat: lat, lng: lng}
				const marker = new google.maps.Marker({position: position, map: map});		
			}

			geocoder.geocode({ address: '52 rue antoine masson, 21130 auxonne' }, (results, status) => {
				if (status !== 'OK' || !results[0]) {
					throw new Error(status);
				}

				map.setCenter(results[0].geometry.location);
				map.fitBounds(results[0].geometry.viewport);
			});
		} catch (error) {
			console.error(error);
		}
	},
};
</script>

<style>
html,
body {
	margin: 0;
	padding: 0;
}

.map {
	width: 100vw;
	height: 100%;
}
</style>