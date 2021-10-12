import { writable } from 'svelte/store';
import L from 'leaflet';


export const MainMap = writable(L.map(document.createElement('div')));
let zero = L.latLng([0,0]);