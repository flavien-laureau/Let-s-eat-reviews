<template>
	<section id="restaurants">
		<div v-for="(restau, index) in filterRestau" :key="index" class="restau">
			<a class="more" @click="$bvModal.show(`listAvis${index}`)">Voir les avis</a>
			<div class="img-wrapper" @click="$bvModal.show(`listAvis${index}`)"><img class='img-restau' src="https://picsum.photos/150/150"/></div>
			<h2 class="name">{{ restau.restaurantName }}</h2>
			<hr class="hr">
			<p class="address">{{ restau.address }}</p>
			<p class="rating">{{ restau.average }}/5</p>

			<!-- Modal -->
			<b-modal :id="`listAvis` + index" :title=restau.restaurantName @hidden='hideModal'>
					<div v-for="(rating, i) in ratings[index]" :key="i">
						<p v-show="viewReview">{{ rating.stars }}/5 &#10132; {{ rating.comment }}</p>
					</div>
					<form v-show="viewForm">
						<p>Pour ajouter un avis, remplisser le formulaire ci-dessous:</p>
						<label for="rate" class="inp">
							<input class="styleInput" v-model="rate" name="rate" id="rate" type="text" placeholder=" ">
							<span class="label">Note :</span>
							<span class="border"></span>
						</label>
						<hr>
						<label for="comment" class="inp labelTextarea">
							<textarea 
								v-model="comment" 
								id="comment" 
								class="styleInput textarea"
								name="comment" 
								cols="50" 
								rows="5"
								placeholder=" "
								@keypress.enter.prevent="sendReview(index)">
							</textarea>
							<span class="label">Commentaire :</span>
							<span class="border"></span>
						</label>
						<br>
						<button :id="`btn` + index" 
								type="button" 
								class="button btnPrimary"  
								@click.prevent="sendReview(index)">
								Envoyer
						</button>
					</form>
					<template v-slot:modal-footer>
						<div class="w-100">
							<button type="button" class="button btnSecondary float-right" @click="$bvModal.hide(`listAvis${index}`)">Fermer</button>
							<button type="button" class="button btnPrimary float-right" @click.prevent="toggleReview">{{ btnReview }}</button>
						</div>
					</template>
					
			</b-modal>
			<!-- <div class="modal fade" :id="`listAvis` + index" tabindex="-1" role="dialog" aria-hidden="true">
				<div class="modal-dialog modal-dialog-scrollable" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h3 class="modal-title">{{ restau.restaurantName }}</h3>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div v-for="(rating, i) in ratings[index]" :key="i">
								<p v-show="viewReview">{{ rating.stars }}/5 &#10132; {{ rating.comment }}</p>
							</div>
							<form v-show="viewForm">
								<p>Pour ajouter un avis, remplisser le formulaire ci-dessous:</p>
								<label for="rate">Note :</label><input v-model="rate" name="rate" id="rate" type="text"><br>
								<label for="comment">Commentaire :</label><br>
								<textarea 
									v-model="comment" 
									id="comment" 
									name="comment" 
									cols="50" 
									rows="5"
									@keypress.enter.prevent="sendReview(index)">
								</textarea>
								<button :id="`btn` + index" 
										type="button" 
										class="button btnPrimary"  
										@click.prevent="sendReview(index)">
										Envoyer
								</button>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="button btnSecondary" data-dismiss="modal">Fermer</button>
							<button type="button" class="button btnPrimary" @click.prevent="toggleReview">{{ btnReview }}</button>
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</section>
</template>

<script>
import store from '../utils/restauStore';
import styleList from '../utils/styleList';
import displayReviews from '../utils/displayReviews';

export default {
	store : store,
	data() {
		return {
			ratings: [],
			viewReview: true,
			viewForm: false,
			btnReview: "Ajouter un avis",
			comment: "",
			rate: ""
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
		
		this.ratings = displayReviews()
		
	},
	mounted() {
		styleList()
	},
	beforeUpdate() {
		this.ratings = displayReviews()
	},
	updated() {
		styleList()
	},
	computed: {
		filterRestau() {
			return store.state.restaurants
		}
	},
	methods: {
		hideModal() {
			this.btnReview = "Ajouter un avis"
			this.viewReview = true
			this.viewForm = false
		},
		toggleReview() {
			if(this.btnReview === "Voir les avis"){
				this.btnReview = "Ajouter un avis"
				this.viewReview = true
				this.viewForm = false
			}else if(this.btnReview === "Ajouter un avis"){
				this.btnReview = "Voir les avis"
				this.viewReview = false
				this.viewForm = true			
			}
		},
		sendReview(index) {
			const review = {
				index: index,
				comment: this.comment,
				rate: this.rate
			}
			this.ratings[index].push(review)
			store.commit('ADD_REVIEW', review)
			this.comment = ""
			this.rate = ""
		}	
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style src='../utils/style.css' scoped>

</style>
