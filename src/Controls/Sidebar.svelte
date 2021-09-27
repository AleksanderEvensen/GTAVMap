<script lang="ts">
    let sidebarOpen = true;

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
</script>


<div class="sidebar-container" class:open={sidebarOpen}>
    <div on:click={toggleSidebar} class="sidebar-thumb">
        {#if sidebarOpen}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        {/if}
    </div>
</div>


<style>
    .sidebar-container {
        /* Position */
        position: fixed;
        right:0px;
        width: 20%;
        height:100%;
        z-index: 100;
        transform: translateX(100%);

        /* Style */
        background: #222;
        box-shadow: -6px 0px 5px rgba(0,0,0,0.5);
        
        /* Animation */
        transition: 0.3s;
    }

    .sidebar-container.open {
        transform: translateX(0%);
    }

    .sidebar-thumb {
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
    }

    .sidebar-thumb:hover {
        background-color: #444;
    }

</style>