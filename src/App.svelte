<script lang="ts">
    import L from 'leaflet';
    import { gameToMap, mapCenter, mapToGame } from './utils';
    import Map from './Map.svelte';
    import GameMarker from './Markers/GameMarker.svelte';
</script>

<Map>
    <GameMarker text="Hello World" position={[100,100]} draggable={true} />
    <GameMarker text="Hello World" position={[200,200]} />
    <GameMarker text="Hello World" position={[300,100]} />
    <GameMarker text="Hello World" position={[400,-400]} />
    <GameMarker text="Hello World" position={[500,100]} />
    <GameMarker text="Hello World" position={[600,700]} />
</Map>

<style>
</style>