<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function select(value) {
		dispatch('select', { value });
	}

	export let items = [];
	export let selected;
</script>

<ul role="list" class="flex-row bg-gray-400 radius-00 p-000">
	{#each items as item}
		<li
			class:bg-bace={selected === item.value}
			on:click={() => select(item.value)}
			class="text-00 px-00 py-000 lh-000 hover:bg-gray-500"
		>
			{item.label}
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 4px;
		gap: 2px;
	}

	li {
		border-radius: 9px;
	}
</style>
