<script>
    import {items} from "../stores"

    $: itemCount = $items.length;
    $: completedItemCount = $items.filter(x => x.completed).length;

</script>

<div class="header">
    <span>Guilherme To-Do List</span>
    <span>{completedItemCount}/{itemCount}</span>
</div>

<style>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        color: #ffffff;
        font-weight: bold;
        font-size: 1.5em;
        background: rgba(0,0,0,0.1);
    }
</style>