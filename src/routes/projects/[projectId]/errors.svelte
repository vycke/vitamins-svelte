<script context="module">
	import { loadHelper } from '$lib/helpers/load';
	export async function load({ fetch }) {
		return await loadHelper(fetch, `/api/errors.json`, ['errors', 'errorsPerDay']);
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/cards/Card.svelte';
	import ListItem from '$lib/components/layout/ListItem.svelte';
	import CollapsedItem from '$lib/components/errors/CollapsedItem.svelte';
	import ExpandedItem from '$lib/components/errors/ExpandedItem.svelte';
	import { sum } from '$lib/helpers/numbers';
	import FilterItem from '$lib/components/layout/FilterItem.svelte';
	import delay from '$lib/helpers/delay';

	const filters = [
		{ label: 'All', type: 'all', class: '' },
		{ label: 'Open', type: 'open', class: 'text-u-error' },
		{ label: 'Other', type: 'other', class: 'text-gray-300' }
	];

	export let errors, errorsPerDay;
	let selected;
	let show = 5;
	let filter = 'all';

	$: totalErrors = sum(errorsPerDay, 'count');
	$: showItems = errors
		.filter((e) => {
			if (filter === 'all') return true;
			return e.status === filter;
		})
		.slice(0, show);

	function updateFilter(event) {
		filter = event.detail.type;
	}
</script>

<div class="flow flow-g-00 items-center | mt-0 px-0">
	<Card class="maxw-4 mb-2" title="Errors last 30 days" subtitle={totalErrors}>
		<BarChart data={errorsPerDay || []} />
	</Card>

	<div class="flex-row justify-center w-full">
		<div role="list" class="maxw-00 p-0 pt-3 mt-3">
			<span class="text-gray-300 bold text-00 uppercase px-000">Filters</span>
			{#each filters as item}
				<FilterItem on:filter={updateFilter} {item} selected={filter} />
			{/each}
		</div>
		<div class="px-0 maxw-3 | flow flow-g-00 | mt-0">
			<h2 class="text-1 uppercase mb-0 ml-0">Recent errors</h2>
			{#each showItems as error}
				<ListItem on:click={() => (selected = error.id)} selected={error.id === selected}>
					<CollapsedItem slot="not-selected" item={error} />
					<ExpandedItem slot="selected" item={error} />
				</ListItem>
			{/each}
		</div>
	</div>
</div>
