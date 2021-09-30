<script lang="ts">
    import { getContext, onMount, onDestroy } from 'svelte';
    import L from 'leaflet';
    import { gameToMap, mapToGame } from '../../utils';
    import { debugMarker, setDebugMarker } from '../../stores/markerStore';
    import { DebugMarkerIcon } from '../MapIcons';

    type Position = [number, number];


    const context:any = getContext('gtavmap');
    let marker: L.Marker;

    let position: Position = $debugMarker;

    $: {
        position = $debugMarker;
        if (marker != null) {
            marker.setLatLng(L.latLng(...gameToMap(...position)));
        }
    }

    onMount(() => {
        const map: L.Map = context.getMap();
        marker = L.marker(L.latLng(...gameToMap(...position)), {
            draggable: true,
            icon: DebugMarkerIcon,
            
        });
        marker.addTo(map);
        marker.on('drag', () => {
            const latlng: L.LatLng = marker.getLatLng();
            setDebugMarker(...mapToGame(latlng.lat, latlng.lng));
        })
    });
    onDestroy(()=> {
        marker.remove();
    });
</script>