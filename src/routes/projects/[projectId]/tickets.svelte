<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api/tickets.json`);
		if (res.ok) {
			const tickets = await res.json();
			return { props: { tickets } };
		}

		return {
			status: res.status,
			error: new Error('Something went wrong')
		};
	}
</script>

<script>
	import ListItem from '$lib/components/layout/ListItem.svelte';
	import CollapsedItem from '$lib/components/tickets/CollapsedItem.svelte';
	import FullItem from '$lib/components/tickets/FullItem.svelte';

	export let tickets = [];
	let selected;
	let show = 5;
	$: showItems = tickets.slice(0, show);
</script>

<div class="flex-row">
	<div role="list" class="maxw-00 p-0 pt-3 mt-3">
		<span class="text-gray-300 bold text-00 uppercase">Filters</span>
		<div class="flex-row items-center w-full mt-0">
			<span class="flex-grow">All</span>
			<span>0</span>
		</div>
		<div class="flex-row items-center w-full text-u-info">
			<span class="flex-grow">Ideas</span>
			<span>0</span>
		</div>
		<div class="flex-row items-center w-full text-u-error">
			<span class="flex-grow">Bugs</span>
			<span>0</span>
		</div>
		<div class="flex-row items-center w-full text-gray-300">
			<span class="flex-grow">Other</span>
			<span>0</span>
		</div>
	</div>
	<div class="px-0 maxw-3 | flow flow-g-00 | mt-0">
		<h2 class="text-1 uppercase mb-0 ml-0">Recent tickets</h2>
		{#each showItems as item}
			<ListItem on:click={() => (selected = item.id)} selected={item.id === selected}>
				<CollapsedItem slot="not-selected" {item} />
				<FullItem slot="selected" {item} />
			</ListItem>
		{/each}
	</div>
</div>
