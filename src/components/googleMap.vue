<template>
	<section @click="showModal" id="left">
		<div class="map">
		</div>

		<b-modal id="addRestauModal">
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
					<button type="button" class="button btnSecondary float-right" @click.prevent="$bvModal.hide('addRestauModal'); cancel()">Annuler</button>
					<button type="button" class="button btnPrimary float-right" @click.prevent="$bvModal.hide('addRestauModal'); addRestau()">Ajouter</button>
				</div>
			</template>
		</b-modal>
	</section>
</template>

<script>
import gmapsInit from '../utils/gmaps';
import store from '../utils/restauStore';
import refresh from '../utils/refresh';
import markers from '../utils/markers'

export default {
	store: store,
	data() {
		return{
			location: "",
			name: "",
			address: ""
		}
	},
	async mounted() {
		try {
			const google = await gmapsInit();
			const geocoder = new google.maps.Geocoder();
			const map = new google.maps.Map(this.$el);
			store.commit('MAP', map) //Envoie l'instance de la carte dans le store
			refresh()

			const t = this
			store.state.map.addListener('click', function(e) {
				t.location = e.latLng
			});

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
		showModal() {
			if(store.state.addRestau === true){
				this.$bvModal.show('addRestauModal')
			}
		},
		addRestau() {
			store.commit('ADD_RESTAU', false)
			document.querySelector('#pAddRestau').style.display = 'none'
			this.addMarker(this.location);
			store.state.restaurants.push({
					"restaurantName": this.name,
      				"address": this.address,
					"lat":this.location.lat(),
					"lng":this.location.lng(),
					"average": 0,
					"ratings":[
					]
				})
			this.location = ""
			this.name = ""
			this.address = ""
		},
		addMarker(location) {				
			const marker = new google.maps.Marker({
				position: location,
				map: store.state.map
			});
			markers.table.push(marker);
		},
		cancel() {
			store.commit('ADD_RESTAU', false)
			document.querySelector('#pAddRestau').style.display = 'none'
			this.location = ""
			this.name = ""
			this.address = ""
		}
	}
};
</script>

<style src="../utils/style.css" scoped>

</style>