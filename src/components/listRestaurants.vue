<template>
	<section id="restaurants">
			<div v-for="restau in filterRestau" :key="restau.id" class="restau">
				<a class="more" data-toggle="modal" :data-target="`#modal` + restau.id" >Voir les avis</a>
				<div class="img-wrapper" data-toggle="modal" :data-target="`#modal` + restau.id"><img class='img-restau' src="https://picsum.photos/150/150"/></div>
				<h2 class="name">{{ restau.restaurantName }}</h2>
				<hr class="hr">
				<p class="address">{{ restau.address }}</p>
				<p class="rating">{{ restau.average }}/5</p>
				
				<!-- Modal -->
				<div class="modal fade" :id="`modal` + restau.id" tabindex="-1" role="dialog" aria-hidden="true">
					<div class="modal-dialog modal-dialog-scrollable" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h3 class="modal-title">{{ restau.restaurantName }}</h3>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
						<div class="modal-body" v-for="rating in ratings[restau.id-1]">
							<p>{{ rating.stars }}/5 &#10132; {{ rating.comment }}</p>
						</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
	</section>
</template>

<script>
import store from '../utils/restauStore';
import styleList from '../utils/styleList';

export default {
	store : store,
	data() {
		return {
			ratings: []
		}
	},

	created() {
		/**
		 * Parcours le json
		 */
		for (let i = 0; i < store.state.restaurants.length; i++) {
			const ratings = store.state.restaurants[i].ratings;
			/**
			 * Calcul de la moyenne des notes pour chaque restaurant et 
			 * ajoute la clé "average" qui contient cette moyenne
			 */
			let m = 0
			let n = 0
			ratings.forEach(rating => {
				m = m + rating.stars
				n++
			}); 
			store.state.restaurants[i].average = m/n
		}

		/**
		 * Push les commentaires des utilisateurs dans la data "ratings"
		 */
		for (let i = 0; i < store.state.restaurants.length; i++) {
			this.ratings.push([])

			for (let j = 0; j < store.state.restaurants[i].ratings.length; j++) {
				this.ratings[i].push(store.state.restaurants[i].ratings[j])
			}
		}
	},
	mounted() {
		styleList()
	},
	updated() {
		styleList()
	},
	computed: {
		filterRestau() {
			return store.state.restaurants
		}
	} 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src='../utils/listRestaurants.css'>

</style>
