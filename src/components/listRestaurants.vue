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
import restaurants from './restaurants.json';
import store from '../utils/RestauStore';

export default {
	store : store,
	data() {
		return {
			restaurants: restaurants,
			ratings: []
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

		/**
		 * Push les commentaires des utilisateurs dans la data "ratings"
		 */
		for (let i = 0; i < this.restaurants.length; i++) {
			this.ratings.push([])

			for (let j = 0; j < this.restaurants[i].ratings.length; j++) {
				this.ratings[i].push(this.restaurants[i].ratings[j])
			}
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
	},
	computed: {
		filterRestau() {
			return this.restaurants.filter(restau => restau.average >= store.state.filterMin && restau.average <= store.state.filterMax)
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src='./listRestaurants.css'>

</style>
