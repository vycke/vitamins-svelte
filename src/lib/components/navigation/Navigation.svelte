<script>
	import Item from './Item.svelte';
	export let items = [];
</script>

<ul role="list" class="minw-00">
	{#each items as item}
		<Item {...item} />
	{/each}
</ul>
