<template>
	<div>
		<listRestaurants></listRestaurants>
	</div>
</template>

<script>
import listRestaurants from './components/listRestaurants.vue'

export default {
	components: {
		listRestaurants
	}
}
</script>

<style>
body, html{
	padding: 0;
	margin: 0;
}
</style>
