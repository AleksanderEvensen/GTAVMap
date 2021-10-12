<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Airplane from 'svelte-material-icons/Airplane.svelte';
    import Delete from 'svelte-material-icons/Delete.svelte';
    import Edit from 'svelte-material-icons/Pen.svelte';

    const emit = createEventDispatcher();

    export let label: string;
</script>


<marker-item>
    <marker-name>{label}</marker-name>
    <controls>
        <button on:click={()=>emit('edit')}  ><Edit     color="#2ecc71" /></button>
        <button on:click={()=>emit('goto')}  ><Airplane color="#3498db" /></button>
        <button on:click={()=>emit('delete')}><Delete   color="#e74c3c" /></button>
    </controls>
</marker-item>


<style lang="scss">
    marker-item {
        height: 40px;
        background-color: rgba(255,255,255,0.1);
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: white;
        margin: 10px 0;

        align-items: center;

        font-size: 20px;

        controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            
            font-size: 27px;

            button {
                width: 27px;
                height: 27px;
                margin:0;
                padding:0;
                outline:none;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 27px;
            }

            button:hover {
                filter: brightness(120%);
            }
            
            button:active {
                filter: brightness(90%);

            }
        }
    }

    marker-name {
        margin-left: 2%;
    }
</style>