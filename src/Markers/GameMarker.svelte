<script lang="ts">
    import { getContext, onMount, onDestroy } from 'svelte';
    import L from 'leaflet';
    import { gameToMap } from '../utils';
    import _ from 'lodash';

    type Position = [number, number];

    export let text:string = "";
    export let position:Position;
    export let draggable:boolean = false;

    const context:any = getContext('gtavmap');
    let marker: L.Marker;
    
    onMount(() => {
        const map: L.Map = context.getMap();
        marker = L.marker(L.latLng(...gameToMap(...position)), {
            draggable: draggable,
            icon: new L.Icon.Default(),
        });
        if(!_.isEmpty(text)) {
            marker.bindPopup(text);
        }
        marker.addTo(map);
    });
    onDestroy(()=> {
        marker.remove();
    });
</script>