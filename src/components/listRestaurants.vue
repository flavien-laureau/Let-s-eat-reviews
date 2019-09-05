<template>
	<section id="restaurants">
		<div v-for="restau in restaurants" class="restau">
			<h1 class="name">{{ restau.restaurantName }}</h1>
			<p class="address">{{ restau.address }}</p>
			<p class="rating">{{ restau.average }}</p>
		</div>
	</section>
</template>

<script>

export default {
	data() {
		return {
			restaurants: [
				{
				"restaurantName":"Bronco",
				"address":"39 Rue des Petites Écuries, 75010 Paris",
				"lat":48.8737815,
				"long":2.3501649,
				"ratings":[
					{
						"stars":4,
						"comment":"Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
					},
					{
						"stars":5,
						"comment":"Tout simplement mon restaurant préféré !"
					}
				]
				},
				{
				"restaurantName":"Babalou",
				"address":"4 Rue Lamarck, 75018 Paris",
				"lat":48.8865035,
				"long":2.3442197,
				"ratings":[
					{
						"stars":5,
						"comment":"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
					},
					{
						"stars":3,
						"comment":"J'ai trouvé ça correct, sans plus"
					}
				]
				},
				{
				"restaurantName":"HTD Burgers",
				"address":"52 rue Antoine Masson",
				"lat":50.8865915,
				"long":3.3442037,
				"ratings":[
					{
						"stars":5,
						"comment":"Un bon burger"
					},
					{
						"stars":5,
						"comment":"Au top"
					}
				]
				}
			]
		}
	},

	created() {
		/**
		 * Parcours le json
		 */
		for (let i = 0; i < this.restaurants.length; i++) {
			const ratings = this.restaurants[i].ratings;
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
			this.restaurants[i].average = m/n
		}
	}

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src='./listRestaurants.css'>

</style>
