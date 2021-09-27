<script lang="ts">
    import Map from './MapRendering/Map.svelte';
    import GameMarker from './MapRendering/Markers/GameMarker.svelte';
    import Sidebar from './Controls/Sidebar.svelte';
</script>

<Map>
    <GameMarker text="Hello World 1" position={[200,200]} draggable={true} icon="https://docs.fivem.net/blips/radar_level.png" />
    <GameMarker text="Hello World 2" position={[200,200]} draggable={true} icon="" />
    <GameMarker text="Hello World" position={[300,100]} />
    <GameMarker text="Hello World" position={[400,-400]} />
    <GameMarker text="Hello World" position={[500,100]} />
    <GameMarker text="Hello World" position={[600,700]} />
</Map>

<Sidebar />