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

		try {
			const googleMap = await gmapsInit();
			const geocoder = new googleMap.maps.Geocoder();
			const map = new googleMap.maps.Map(this.$el);
			store.commit('MAP', map) //Envoie l'instance de la carte dans le store
			const service = new google.maps.places.PlacesService(store.state.map);
			/* setTimeout(refresh, 1000);

			const t = this
			store.state.map.addListener('click', function(e) {
				t.location = e.latLng
			});
			*/
			let selLocLat   = 0;
			let selLocLng   = 0; 
		
			function nearbySearchCallback(results, status){
				if (status == google.maps.places.PlacesServiceStatus.OK){
					let restaurants = results
					console.log(restaurants)
					for (let i = 0; i < restaurants.length; i++){
						function getDetailsCallback(reviews, status){
							if (status == google.maps.places.PlacesServiceStatus.OK){
								restaurants[i].reviews = reviews
							}else {
								restaurants[i].reviews = []
							}
						}
						const getDetailsRequest = {
							fields: ['reviews'],
							placeId: restaurants[i].place_id
						}
						service.getDetails(getDetailsRequest, getDetailsCallback)
					} 
					store.commit('UPDATE_RESTAU', restaurants)
				}
			}

			

			geocoder.geocode({ address: '52 rue antoine masson, 21130 auxonne' }, (results, status) => {
				if (status !== 'OK' || !results[0]) {
					throw new Error(status);
				}
				store.state.map.setCenter(results[0].geometry.location);
				store.state.map.fitBounds(results[0].geometry.viewport);

				selLocLat   = results[0].geometry.location.lat();
				selLocLng   = results[0].geometry.location.lng();
				
                const htdburgers = new google.maps.LatLng(selLocLat, selLocLng);

				const nearbySearchRequest = {
                    location: htdburgers,
					radius: 500,
					types: ['restaurant']
				};

				//infowindow = new google.maps.InfoWindow();

				
				service.nearbySearch(nearbySearchRequest, nearbySearchCallback);

			});
		} catch (error) {
			console.error(error);
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