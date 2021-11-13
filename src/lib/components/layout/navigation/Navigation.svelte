<script>
	import NavItem from './NavItem.svelte';
	export let items = [];
</script>

<ul role="list" class="minw-00">
	{#each items as item}
		<NavItem {item} />
	{/each}
</ul>
