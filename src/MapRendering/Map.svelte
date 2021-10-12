<script lang="ts">
    import { setContext } from "svelte";
    import L from 'leaflet';
    import { mapCenter } from '../utils';

    import { MainMap } from '../stores/main';
    
    //#region Map
    function initMap(container: HTMLDivElement) {
        $MainMap = L.map(container, {
            center: mapCenter,
            // preferCanvas: true,
            crs: L.CRS.Simple  
        }).setView(mapCenter, 5);

        L.tileLayer('https://s.rsg.sc/sc/images/games/GTAV/map/game/{z}/{x}/{y}.jpg', {
            attribution: 'Map provided by <a href="https://www.rockstargames.com/" target="_blank">Rockstar Games</a>',
            maxZoom: 7,
            minZoom: 3,
            bounds: L.latLngBounds(L.latLng(0.0,128.0), L.latLng(-192.0,0.0)),
        }).addTo($MainMap);

        return {
            destroy: () => {
                $MainMap.remove();
                $MainMap = null;
            }
        };
    }

    function resizeMap() {
        if($MainMap) { $MainMap.invalidateSize(); }
    }

    //#endregion

    

</script>

<svelte:window on:resize={resizeMap} />

<div id="main-map" use:initMap>
    <slot />
</div>


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossorigin=""/>
<style>
    #main-map {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        /* z-index: -1000; */
    }
</style>