<template>
	<section id="restaurants">
			<div v-for="restau in restaurants" class="restau">
				<a href="#" class="more">Voir les avis</a>
				<div class="img-wrapper"><img class='img-restau' src="http://lorempixel.com/150/150/fashion" alt="" /></div>
				<h1 class="name">{{ restau.restaurantName }}</h1>
				<hr class="hr">
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
	},
	mounted() {
		const imgs = document.querySelectorAll('.img-restau')
		const imgsWrapper = document.querySelectorAll('.img-wrapper')
		const links = document.querySelectorAll('.more')
		
		imgs.forEach(img => {
			img.addEventListener('mouseover', function() {
				img.parentElement.previousElementSibling.style.opacity = "1";
				img.style.width = "160px";
			});
			img.addEventListener('mouseout', function() {
				img.parentElement.previousElementSibling.style.opacity = "0";
				img.style.width = "150px";
			});
		});

		imgsWrapper.forEach(wrapper => {
			wrapper.addEventListener('mouseover', function() {
				wrapper.style.padding = "5px";
				wrapper.style.transform = "rotate(5deg)";
			});
			wrapper.addEventListener('mouseout', function() {
				wrapper.style.padding = "10px";
				wrapper.style.transform = "rotate(0deg)";
				
			});
		});

		links.forEach(link => {
			link.addEventListener('mouseover', function() {
				link.style.opacity = "1";
				link.nextElementSibling.firstChild.style.width = "160px";
				link.nextElementSibling.style.padding = "5px";
				link.nextElementSibling.style.transform = "rotate(5deg)";

			});
			link.addEventListener('mouseout', function() {
				link.style.opacity = "0";
				link.nextElementSibling.firstChild.style.width = "150px";
				link.nextElementSibling.style.padding = "10px";
				link.nextElementSibling.style.transform = "rotate(0deg)";
			});
		});

		/**
		 * padding:5px;
    		transform: rotate(5deg);
		 */
	}

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src='./listRestaurants.css'>

</style>
