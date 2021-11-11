<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api/errors.json`);
		if (res.ok) {
			const { errors, errorsPerDay } = await res.json();
			return { props: { errors, errorsPerDay } };
		}

		return {
			status: res.status,
			error: new Error('Something went wrong')
		};
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/Card.svelte';
	import ListItem from '$lib/components/layout/ListItem.svelte';
	import CollapsedItem from '$lib/components/errors/CollapsedItem.svelte';
	import ExpandedItem from '$lib/components/errors/ExpandedItem.svelte';
	import { sum } from '$lib/helpers';
	export let errors, errorsPerDay;
	let selected;
	let show = 5;

	$: totalErrors = sum(errorsPerDay, 'count');
	$: showItems = errors.slice(0, show);
</script>

<div class="center center-w-3 center-g-0 | flow flow-g-00 | mt-0">
	<Card class="center-exception maxw-4 mb-2" hover={false}>
		<h2 class="uppercase text-0 text-gray-300">Errors last 30 days</h2>
		<span class="bold uppercase mb-0 text-1">Total: {totalErrors}</span>
		<BarChart data={errorsPerDay || []} class="center-exception maxw-4" />
	</Card>

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
