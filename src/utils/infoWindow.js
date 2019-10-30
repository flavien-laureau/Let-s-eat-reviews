import store from './restauStore';
import markers from './markers'

export default async function mapInit(){
	let infowindow;

	infowindow = new store.state.google.maps.InfoWindow();

	markers.table.forEach((marker, i) => {
		store.state.google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(`
				<strong>${store.state.restaurants[i].name}</strong>
				<br>
				${store.state.restaurants[i].vicinity}`);
			infowindow.open(store.state.map, this);
		});
	});
}