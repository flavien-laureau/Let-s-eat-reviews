<template>
	<section @click="showModal" id="left"> <!-- Cette section contient l'instance de la MAP -->
		<b-modal id="addRestauModal">
			<template v-slot:modal-title>
				Ajout d'un nouveau restaurant
			</template>

			<div class="d-block text-center">
				<form>
					<label for="name" class="inp">
						<input class="styleInput" 
								v-model="name" 
								name="name" 
								id="name" 
								type="text" 
								placeholder=" "
								@keypress.enter.prevent="$bvModal.hide('addRestauModal'); addRestau()">
						<span class="label">Nom de l'établissement</span>
						<span class="border"></span>
					</label>

					<hr>

					<label for="address" class="inp">
						<input class="styleInput" 
								v-model="address" 
								name="address" 
								id="address" 
								type="text" 
								placeholder=" "
								@keypress.enter.prevent="$bvModal.hide('addRestauModal'); addRestau()">
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
import store from '../utils/restauStore';
import refreshMarkers from '../utils/refreshMarkers';
import refreshSearch from '../utils/refreshSearch';
import markers from '../utils/markers'
import key from '../utils/apikey'


export default {
	store: store,
	name: 'GoogleMap',
	props: ['eventBus'],
	data() {
		return{
			position: "",
			name: "",
			address: "",
    		API_KEY: key()
		}
	},
	mounted() {
		let selLocLat   = 0;
		let selLocLng   = 0; 
		
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		function success(pos) {
			var crd = pos.coords;
			selLocLat = crd.latitude
			selLocLng = crd.longitude
		}

		function error(err) {
			selLocLat   = 48.864716;
			selLocLng   = 2.349014;
			console.warn(`ERREUR (${err.code}): ${err.message}`);
			function setTime() {
				alert("Pour une meilleure experience utilisateur, veuillez autoriser l'accès à votre géolocalisation")
			}
			setTimeout(setTime, 3000)
		}

		navigator.geolocation.getCurrentPosition(success, error, options);

		try {
			const t = this

			function setTime() {
				const geocoder = new store.getters.google.maps.Geocoder();
				
				let position = new store.getters.google.maps.LatLng(selLocLat, selLocLng);
				
				new store.getters.google.maps.Marker({
					position: position,
					map: store.state.map,
					animation: store.getters.google.maps.Animation.DROP,
					icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png'
				});
				
				geocoder.geocode({ 'location' : position }, (results, status) => {
					if (status !== 'OK' || !results[0]) {
						throw new Error(status);
					}
					store.state.map.setCenter(results[0].geometry.location);

					refreshSearch()
				});

				setTimeout(refreshMarkers, 3000);

				store.state.map.addListener('click', function(e) {
					t.position = e.latLng
				});
			}

			setTimeout(setTime, 1000);

		} catch (error) {
			console.error("Error: ", error);
		}

		
		
	},
	methods: {
		showModal() {
			if(store.state.addRestau === true && this.position){
				this.$bvModal.show('addRestauModal')
			}
		},
		addRestau() {
			
			const restau = {
				name: this.name,
				vicinity: this.address,
				rating: 5,
				reviews: [],
				img: `https://maps.googleapis.com/maps/api/streetview?size=150x150&location=${this.position.lat()},${this.position.lng()}&key=${this.API_KEY}`
			}

			let restaurants = store.getters.restaurants
			restaurants.push(restau)

			store.commit('ADD_RESTAU_STATE', false)
			store.commit('UPDATE_RESTAU', restaurants)

			document.querySelector('#pAddRestau').style.display = 'none'
			this.addMarker(this.position);
			
			const t = this
			function setTime() {
				t.eventBus.$emit('add_restau', store.state.restaurants);
			}
			setTimeout(setTime, 1000);

			this.position = ""
			this.name = ""
			this.address = ""
		},
		addMarker(position) {				
			const marker = new store.getters.google.maps.Marker({
				position: position,
				map: store.state.map,
				animation: store.getters.google.maps.Animation.DROP,
        		icon: 'http://maps.google.com/mapfiles/kml/pal2/icon40.png'

			});
			markers.table.push(marker);
		},
		cancel() {
			store.commit('ADD_RESTAU_STATE', false)
			document.querySelector('#pAddRestau').style.display = 'none'
			this.position = ""
			this.name = ""
			this.address = ""
		}
	}
};
</script>

<style src="../utils/style.css" scoped>

</style>
