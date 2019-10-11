<template>
	<section id="restaurants">
		<div v-for="(restau, index) in filterRestau" :key="index" class="restau">
			<a class="more" @click="$bvModal.show(`listAvis${index}`)">Voir les avis</a>
			<div class="img-wrapper" @click="$bvModal.show(`listAvis${index}`)"><img class='img-restau' /></div>
			<h2 class="name">{{ restau.name }}</h2>
			<hr class="hr">
			<p class="address">{{ restau.vicinity }}</p>
			<p class="rating">{{ restau.rating }}/5</p>

			<!-- Modal -->
			<b-modal :id="`listAvis` + index" :title=restau.name @hidden='hideModal'>
					<div v-for="(rating, i) in restau.reviews.reviews" :key="i">
						<p v-show="viewReview">{{ rating.rating }}/5 &#10132; {{ rating.text }}</p>
					</div>
					<form v-show="viewForm">
						<p>Pour ajouter un avis, remplissez le formulaire ci-dessous:</p>
						<label for="rate" class="inp">
							<input class="styleInput" v-model="rate" name="rate" id="rate" type="text" placeholder=" ">
							<span class="label">Note</span>
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
								@keypress.enter.prevent="toggleReview(); sendReview(index)">
							</textarea>
							<span class="label">Commentaire</span>
							<span class="border"></span>
						</label>
						<br>
						<button :id="`btn` + index" 
								type="button" 
								class="button btnPrimary btnSend"  
								@click.prevent="toggleReview(); sendReview(index)">
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
		</div>
	</section>
</template>

<script>
import store from '../utils/restauStore';
import styleList from '../utils/styleList';
import displayReviews from '../utils/displayReviews';

export default {
	store : store,
	name: 'ListRestaurants',
	props: ['eventBus'],
	data() {
		return {
			restaurants: [],
			viewReview: true,
			viewForm: false,
			btnReview: "Ajouter un avis",
			comment: "",
			rate: ""
		}
	},

	created() {
		const t = this
		this.eventBus.$on('search', function(msg) {
			t.restaurants = msg

		})
		
	},
	mounted() {
		
		const t = this
		function setTime() {
			t.restaurants = store.state.restaurants
		}

		setTimeout(setTime, 2000);

		styleList()
	},
	beforeUpdate() {
	},
	updated() {
		styleList()
	},
	computed: {
		filterRestau() {
			return this.restaurants
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
			/* const review = {
				text: this.comment,
				rating: this.rate
			}
			this.ratings[index].push(review)
			//store.commit('ADD_REVIEW', review)
			this.comment = ""
			this.rate = "" */
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style src='../utils/style.css' scoped>

</style>
