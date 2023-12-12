<script>
    import { onMount } from "svelte";
    import { items } from "../stores";
    import TodoApi from "../TodoApi"
    import Item from "./Item.svelte";
    import NewItem from "./NewItem.svelte";
    import {v4 as uuidv4} from "uuid";

    let itemsSorted = [];

    $: {
        itemsSorted = [...$items]
        itemsSorted.sort((a, b) => {
            if(a.completed && b.completed) return 0;
            if(a.completed) return 1;
            if(b.completed) return -1;
        });
    }

    function handleNewItem(e){
        $items = [
        {
            id:uuidv4(),
            text:e.detail,
            completed: false
        },
        ...$items
        ];
        TodoApi.save($items);
    }

    function handleUpdate(e){
        const index = $items.findIndex(x => x.id === e.detail.id);
        $items[index] = e.detail;
        TodoApi.save($items);
    }

    function handleDelete(e){
        $items = $items.filter(x => x.id !== e.detail);
        TodoApi.save($items);
    }

    onMount(async () => {
        $items = await TodoApi.getAll();                
    });

</script>


<div class="list">
    <NewItem on:newItem={handleNewItem} />
    {#each itemsSorted as item (item) }
        <Item {...item} on:update={handleUpdate} on:delete={handleDelete}/>
        {:else}
        <p class="list-status">No items</p>
    {/each}
</div>

<style>
    .list{
        padding: 15px;
    }

    .list-status{
        margin: 0;
        text-align: center;
        color: white;
        font-weight: bold;
        font-size: 1.1em;
    }
</style>