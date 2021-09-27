<script lang="ts">
    import { getContext, onMount, onDestroy } from 'svelte';
    import L from 'leaflet';
    import { gameToMap } from '../../utils';
    import _ from 'lodash';

    type Position = [number, number];

    export let text:string = "";
    export let position:Position;
    export let draggable:boolean = false;
    export let icon:string = "";

    const context:any = getContext('gtavmap');
    let marker: L.Marker;
    
    onMount(() => {
        const map: L.Map = context.getMap();
        let defaultIcon = new L.Icon.Default({
            imagePath: 'https://unpkg.com/leaflet@1.7.1/dist/images/'
        });


        marker = L.marker(L.latLng(...gameToMap(...position)), {
            draggable: draggable,
            icon: (!_.isEmpty(icon) ? L.icon({iconUrl: icon, iconAnchor:[36/2,36/2]}) : defaultIcon),
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