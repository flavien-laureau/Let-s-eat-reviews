<template>
	<section id="left" @click="$bvModal.show('bv-modal')">
		<div class="map">
		</div>

		<b-modal id="bv-modal">
			<template v-slot:modal-title>
			Ajout d'un nouveau restaurant
			</template>

			<div class="d-block text-center">
				<form>
					<label for="name" class="inp">
						<input class="styleInput" v-model="name" name="name" id="name" type="text" placeholder=" ">
						<span class="label">Nom de l'établissement</span>
						<span class="border"></span>
					</label>
					<hr>
					<label for="address" class="inp">
						<input class="styleInput" v-model="address" name="address" id="address" type="text" placeholder=" ">
						<span class="label">Adresse</span>
						<span class="border"></span>
					</label>
					
				</form>
			</div>

			<template v-slot:modal-footer>
				<div class="w-100">
					<button type="button" class="button btnSecondary float-right" @click="$bvModal.hide('bv-modal')">Annuler</button>
					<button type="button" class="button btnPrimary float-right">Ajouter</button>
				</div>
			</template>
		</b-modal>
	</section>
</template>

<script>
import gmapsInit from '../utils/gmaps';
import store from '../utils/restauStore';
import addRestau from '../utils/addRestau';
import refresh from '../utils/refresh';

export default {
	store: store,
	data() {
		return{
			name: "",
			address: ""
		}
	},
	async mounted() {
		try {
			const google = await gmapsInit();
			const geocoder = new google.maps.Geocoder();
			const map = new google.maps.Map(this.$el);
			store.commit('MAP', map)
			addRestau()
			refresh()
			/* for (let i = 0; i < store.state.restaurants.length; i++) {
				const lat = store.state.restaurants[i].lat
				const lng = store.state.restaurants[i].lng
				const position = {lat: lat, lng: lng}
				const marker = new google.maps.Marker({position: position, map: map});		
			} */

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
	methods: {
	}
};
</script>

<style src="../utils/style.css" scoped>

</style>