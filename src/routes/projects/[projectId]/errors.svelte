<script context="module">
	import { loadHelper } from '$lib/helpers/load';
	export async function load({ fetch }) {
		return loadHelper(fetch, `/api/errors.json`, ['errors', 'errorsPerDay']);
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/Card.svelte';
	import ListItem from '$lib/components/layout/ListItem.svelte';
	import CollapsedItem from '$lib/components/errors/CollapsedItem.svelte';
	import ExpandedItem from '$lib/components/errors/ExpandedItem.svelte';
	import { sum } from '$lib/helpers/numbers';

	export let errors, errorsPerDay;
	let selected;
	let show = 5;

	$: totalErrors = sum(errorsPerDay, 'count');
	$: showItems = errors.slice(0, show);
</script>

<div class="flow flow-g-00 items-center | mt-0 px-0">
	<Card class="maxw-4 mb-2" clickable={false}>
		<h2 class="uppercase text-0 text-gray-300">Errors last 30 days</h2>
		<span class="bold uppercase mb-0 text-1">Total: {totalErrors}</span>
		<BarChart data={errorsPerDay || []} />
	</Card>

	<div class="flex-row justify-center w-full">
		<div role="list" class="maxw-00 p-0 pt-3 mt-3">
			<span class="text-gray-300 bold text-00 uppercase">Filters</span>
			<div class="flex-row items-center w-full mt-0">
				<span class="flex-grow">All</span>
				<span>0</span>
			</div>
			<div class="flex-row items-center w-full text-u-error">
				<span class="flex-grow">Open</span>
				<span>0</span>
			</div>
			<div class="flex-row items-center w-full text-gray-300">
				<span class="flex-grow">Archived</span>
				<span>0</span>
			</div>
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
