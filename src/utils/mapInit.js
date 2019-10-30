import gmapsInit from './gmaps';
import store from './restauStore';

export default async function mapInit(){
    const google = await gmapsInit();
    store.commit('GOOGLE', google)

    const map = new store.state.google.maps.Map(document.querySelector('#left'), { zoom: 15 });
    store.commit('MAP', map) 
}