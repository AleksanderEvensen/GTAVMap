<script lang="ts">
    import { getContext, onMount, onDestroy } from 'svelte';
    import L from 'leaflet';
    import { gameToMap } from '../../utils';
    import _ from 'lodash';
    import { MainMap } from '../../stores/main';

    type Position = [number, number];

    export let text:string = "";
    export let content: string = "";
    export let position:Position;
    export let draggable:boolean = false;
    export let icon:L.Icon = null;

    let marker: L.Marker;

    $: {
        marker?.setLatLng(L.latLng(...gameToMap(...position)));
    }
    onMount(() => {
        let defaultIcon = new L.Icon.Default({
            imagePath: 'https://unpkg.com/leaflet@1.7.1/dist/images/'
        });

        let gamePos = gameToMap(...position)

        marker = L.marker(L.latLng(...gamePos), {
            draggable: draggable,
            icon: (icon ? icon : defaultIcon),
            
        });
        if(!_.isEmpty(text)) {
            marker.bindPopup(`<h2>${text}</h2>${!_.isEmpty(content) ? `<h3>${content}</h3>`:''}`);
        }
        marker.addTo($MainMap);
    });
    onDestroy(()=> {
        marker.remove();
    });
</script>