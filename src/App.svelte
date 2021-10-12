<script lang="ts">
    import { markers } from './stores/markerStore';
    import { MainMap } from './stores/main';

    import Map from './MapRendering/Map.svelte';
    import GameMarker from './MapRendering/Markers/GameMarker.svelte';
    import Sidebar from './Controls/Sidebar.svelte';
    import DebugMarker from './MapRendering/Markers/DebugMarker.svelte';
import { text } from 'svelte/internal';



</script>

<Map>
    {#each $markers as {type, x, y, label: text, content}}
        {#if type === 'game'}
            <GameMarker position={[x, y]} draggable={true} {text} {content}  />
        {/if}
    {/each}
    
    <DebugMarker />
</Map>

<Sidebar />