<script lang="ts">
    import Map from './MapRendering/Map.svelte';
    import GameMarker from './MapRendering/Markers/GameMarker.svelte';
    import Sidebar from './Controls/Sidebar.svelte';
    import DebugMarker from './MapRendering/Markers/DebugMarker.svelte';



</script>

<Map>
    <DebugMarker />
</Map>

<Sidebar />