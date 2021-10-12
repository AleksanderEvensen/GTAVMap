<script lang="ts">
    import { getContext, onMount, onDestroy } from 'svelte';
    import L from 'leaflet';
    import { gameToMap, mapToGame } from '../../utils';
    import { debugMarker, setDebugMarker } from '../../stores/markerStore';
    import { DebugMarkerIcon } from '../MapIcons';
    import { MainMap } from '../../stores/main';

    type Position = [number, number];


    let marker: L.Marker;

    let position: Position = $debugMarker;

    $: {
        position = $debugMarker;
        if (marker != null) {
            marker.setLatLng(L.latLng(...gameToMap(...position)));
        }
    }

    onMount(() => {
        marker = L.marker(L.latLng(...gameToMap(...position)), {
            draggable: true,
            icon: DebugMarkerIcon,
            
        });
        marker.addTo($MainMap);
        marker.on('drag', () => {
            const latlng: L.LatLng = marker.getLatLng();
            setDebugMarker(...mapToGame(latlng.lat, latlng.lng));
        })
    });
    onDestroy(()=> {
        marker.remove();
    });
</script>