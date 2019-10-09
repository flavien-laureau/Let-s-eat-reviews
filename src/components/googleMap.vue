<template>
	<section @click="showModal" id="left">
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
import mapInit from '../utils/mapInit';
import store from '../utils/restauStore';
import nearbySearchCallback from '../utils/nearbySearchCallback';
import refreshMarkers from '../utils/refreshMarkers';
import markers from '../utils/markers'

export default {
	store: store,
	name: 'GoogleMap',
	data() {
		return{
			location: "",
			name: "",
			address: ""
		}
	},
	async mounted() {
		//let infowindow;
		let selLocLat   = 0;
		let selLocLng   = 0; 
		

		/* function createMarker(place) {
			const placeLoc = place.geometry.location;

			var marker = new google.maps.Marker({
				map: store.state.map,
				position: place.geometry.location,
				animation: google.maps.Animation.DROP
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(place.name + '<br>' + place.vicinity);
				infowindow.open(store.state.map, this);
			});
		} */

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
			console.warn(`ERREUR (${err.code}): ${err.message}`);
			alert("Pour une meilleure experience utilisateur, veuillez autoriser l'accès à la localisation")
		}

		navigator.geolocation.getCurrentPosition(success, error, options);

		 

		try {
			await mapInit()
	
			function setTime() {
				const geocoder = new store.state.google.maps.Geocoder();
				const service = new store.state.google.maps.places.PlacesService(store.state.map);
				
				let position = new store.state.google.maps.LatLng(selLocLat, selLocLng);
				
				/* setTimeout(refreshMarkers, 1000);

				const t = this
				store.state.map.addListener('click', function(e) {
					t.location = e.latLng
				});
				*/


				geocoder.geocode({ 'location' : position }, (results, status) => {
					if (status !== 'OK' || !results[0]) {
						throw new Error(status);
					}
					store.state.map.setCenter(results[0].geometry.location);
					
					const center = results[0].geometry.location //==> latLng

					const nearbySearchRequest = {
						location: center,
						radius: 2000,
						types: ['restaurant']
					};

					//infowindow = new google.maps.InfoWindow();

					service.nearbySearch(nearbySearchRequest, nearbySearchCallback);
					
					setTimeout(refreshMarkers, 500);

				});
				
			}

			setTimeout(setTime, 1000);

			

		} catch (error) {
			console.error("Error: ", error);
		}

		
		
	},
	methods: {
		showModal() {
			/* if(store.state.addRestau === true){
				this.$bvModal.show('addRestauModal')
			} */
		},
		addRestau() {
			/* store.commit('ADD_RESTAU', false)
			document.querySelector('#pAddRestau').style.display = 'none'
			this.addMarker(this.location);
			store.state.restaurants.push({
					"name": this.name,
      				"vicinity": this.address,
					"lat":this.location.lat(),
					"lng":this.location.lng(),
					"rating": 5,
					"ratings":[]
				})
			this.location = ""
			this.name = ""
			this.address = "" */
		},
		addMarker(location) {				
			/* const marker = new google.maps.Marker({
				position: location,
				map: store.state.map
			});
			markers.table.push(marker); */
		},
		cancel() {
			/* store.commit('ADD_RESTAU', false)
			document.querySelector('#pAddRestau').style.display = 'none'
			this.location = ""
			this.name = ""
			this.address = "" */
		}
	}
};
</script>

<style src="../utils/style.css" scoped>

</style>