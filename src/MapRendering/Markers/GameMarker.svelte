<script lang="ts">
    import { getContext, onMount, onDestroy } from 'svelte';
    import L from 'leaflet';
    import { gameToMap } from '../../utils';
    import _ from 'lodash';

    type Position = [number, number];

    export let text:string = "";
    export let position:Position;
    export let draggable:boolean = false;
    export let icon:L.Icon = null;

    const context:any = getContext('gtavmap');
    let marker: L.Marker;

    $: {
        marker?.setLatLng(L.latLng(...gameToMap(...position)));
    }
    onMount(() => {
        const map: L.Map = context.getMap();
        let defaultIcon = new L.Icon.Default({
            imagePath: 'https://unpkg.com/leaflet@1.7.1/dist/images/'
        });

        let gamePos = gameToMap(...position)

        marker = L.marker(L.latLng(...gamePos), {
            draggable: draggable,
            icon: (icon ? icon : defaultIcon),
            
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