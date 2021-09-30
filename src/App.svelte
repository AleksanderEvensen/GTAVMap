<script lang="ts">
    import { markers, addGameMarker } from './stores/markerStore';

    import Map from './MapRendering/Map.svelte';
    import GameMarker from './MapRendering/Markers/GameMarker.svelte';
    import Sidebar from './Controls/Sidebar.svelte';
    import DebugMarker from './MapRendering/Markers/DebugMarker.svelte';




</script>

<Map>
    {#each $markers as marker}
        {#if marker.type === 'game'}
            <GameMarker position={[marker.x, marker.y]} draggable={true}  />
        {/if}
    {/each}
    
    <DebugMarker />
</Map>

<Sidebar />