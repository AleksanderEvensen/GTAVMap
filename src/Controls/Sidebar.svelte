<script lang="ts">
    import { addGameMarker, debugMarker, setDebugMarker, removeMarker, markers } from '../stores/markerStore';
    import _ from 'lodash';
    import { MainMap } from '../stores/main';
    import { gameToMap } from '../utils';
import MarkerItem from './MarkerItem.svelte';



    let sidebarOpen = true;

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }


    function hasElementFocus(element:HTMLElement | HTMLElement[]) {
        if(Array.isArray(element)) {
            return element.some(e => e === document.activeElement);
        }
        return document.activeElement === element;
    }

    
    // Updating the debug marker information
    $: setDebugMarker(debugPosX, debugPosY);
    let debugPosX = $debugMarker[0];
    let debugPosY = $debugMarker[1];
    let xPosElem:HTMLInputElement = null;
    let yPosElem:HTMLInputElement = null;    
    $: {
        if (debugPosX !== $debugMarker[0] && !hasElementFocus([xPosElem, yPosElem])) debugPosX = Math.round($debugMarker[0]*100000)/100000;
        if (debugPosY !== $debugMarker[1] && !hasElementFocus([xPosElem, yPosElem])) debugPosY = Math.round($debugMarker[1]*100000)/100000;
    }


    let newMarkerName = null;
    let newMarkerX = null;
    let newMarkerY = null;

    function addNewMarker() {
        if(newMarkerName === null || newMarkerX === null || newMarkerY === null || _.isEmpty(newMarkerName)) return;
        

        addGameMarker(newMarkerX, newMarkerY, newMarkerName);

        newMarkerName = null;
        newMarkerX = null;
        newMarkerY = null;
    }

    let multipleContent = null;

    function processMultiple() {
        multipleContent.split('\n').forEach(line => {
            let [x, y, name, content] = line.replace(/\s+,\s+/g, '').split(',');
            if(_.isEmpty(name) || _.isEmpty(x) || _.isEmpty(y)) return;

            addGameMarker(parseFloat(x) ?? 0, parseFloat(y) ?? 0, name, content);

        });
        multipleContent = null;
    }

    function gotoMarker(id: number) {
        let marker = $markers.find(marker => marker.id === id);
        $MainMap.flyTo(gameToMap(marker.x, marker.y));
    }


</script>


<sidebar class:open={sidebarOpen}>
    <sidebar-thumb on:click={toggleSidebar}>
        {#if sidebarOpen}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        {/if}
    </sidebar-thumb>

    <sidebar-content>
        <h1>GTA V Map</h1>

        <seperator>Debug Marker</seperator>
        <split>
            <input bind:value={debugPosX} bind:this={xPosElem} type="number" placeholder="x-position">
            <input bind:value={debugPosY} bind:this={yPosElem} type="number" placeholder="y-position">
        </split>

        
        <seperator>New Marker</seperator>
        <input class="fill" type="text" bind:value={newMarkerName} placeholder="Name">
        <split>
            <input type="number" bind:value={newMarkerX} placeholder="x-position">
            <input type="number" bind:value={newMarkerY} placeholder="y-position">
        </split>
        <button class="fill" on:click={addNewMarker}>Create Marker</button>
        
        
        <seperator>Multiple</seperator>
        <p>
            Syntax: (* means required)<br>
            x-coord*, y-coord*, name*, content
        </p>
        <textarea bind:value={multipleContent} class="fill" cols="30" rows="10" placeholder="Enter coords here..."></textarea>
        <button class="fill" on:click={processMultiple}>Create Marker(s)</button>
        

        <seperator>Active Markers</seperator>
        <button class="fill" on:click={()=>markers.update(()=>[])}>Clear All</button>
        {#each $markers as marker}
            <MarkerItem label={marker.label} on:delete={()=>removeMarker(marker.id)} on:goto={()=>gotoMarker(marker.id)} />
        {/each}
    </sidebar-content>
</sidebar>


<style lang="scss">
    sidebar {
        /* Position */
        position: fixed;
        right:0px;
        width: 20%;
        height: 100%;
        min-width: 400px;

        min-height: 0px;
        max-height: 100%;
        overflow-y: auto;
        overflow-x: hidden;

        /* Other */
        z-index: 100;
        transform: translateX(100%);

        /* Style */
        background: #222;
        box-shadow: -6px 0px 5px rgba(0,0,0,0.5);
        
        /* Animation */
        transition: 0.3s;


        
        
        &.open {
            transform: translateX(0%);
        }
    }

    sidebar-thumb {
        display: grid;
        place-items: center;
        position:absolute;
        top: 50%;
        left: 0%;
        transform: translatex(-100%);
        background-color: #222;

        width:40px;
        height:100px;

        border-radius: 10px 0px 0px 10px;
        color:white;

        transition: background 0.2s;
    
        &:hover {
            background-color: #444;
        }
    }

    sidebar-content {
        position: absolute;
        width: calc(100% - 4em);
        height: fit-content;
        margin: 0 2em;

        
    
        h1 {
            font-size: 2rem;
            color: #ccc;
            text-align: center;
            margin: 10%;
        }

        input.fill {
            /* - padding - border */
            width: calc(100% - 1em - 2px);
        }

        textarea.fill {
            width: calc(100% - 1em - 2px);
        }

        textarea {
            border: 1px solid white;
            background-color: rgba(255,255,255, 0.1);
            outline: none;

            padding: 0.5em;
            
            color:white;

            resize: vertical;
            
            &::placeholder {
                color: #bbb;
            }
        }

        p {
            color:#666;
        }

        

        input {
            border: none;
            margin:0;
            padding: 0;
            background-color: rgba(255,255,255,0.1);
            border: 1px solid white;
            outline: none;

            color:white;

            padding: 0.5em;

            &::placeholder {
                color: #bbb;
            }

        }

        button {
            border: none;
            height: 2em;
        }

        button.fill {
            width: calc(100%);
        }
    }
    split {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        input {
            width: 50%;
        }
    }


    seperator {
        width: 100%;
        display: table;
        white-space: nowrap;
        color: #aaa;
        font-family: 'Roboto', sans-serif;
        text-align: center;

        font-size: 1rem;
        margin: 2em 0 1em 0;

        &:before, &:after {
            border-top: 2px solid #aaa;

            content: '';
            display: table-cell;
            position: relative;
            top: 0.5em;
            width: 30%;
        }
        /* &:before { right: %; } */
        /* &:after { left: 1.5%; } */

    }
</style>