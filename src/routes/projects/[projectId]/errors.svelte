<script context="module">
	import { sequential } from '$lib/helpers/api';
	import { DEFAULT_DAYS, DEFAULT_SIZE } from '$lib/constants';

	export async function load({ fetch, stuff }) {
		const { project } = stuff;

		const result = await sequential({
			grouped: fetch(`/api/projects/${project.id}/errors/grouped?days=${DEFAULT_DAYS}`),
			stats: fetch(`/api/projects/${project.id}/errors/stats`),
			errors: fetch(`/api/projects/${project.id}/errors?size=${DEFAULT_SIZE}`)
		});

		return { props: { project, ...result.props } };
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
	import Spinner from '$lib/components/layout/Spinner.svelte';

	const filters = [
		{ label: 'All', type: 'all', class: '' },
		{ label: 'Open', type: 'open', class: 'text-u-error' },
		{ label: 'Other', type: 'other', class: 'text-gray-300' }
	];

	export let errors = [],
		grouped,
		stats,
		project;

	let selected;
	let loading;
	let show = DEFAULT_SIZE;
	let filter = 'all';

	async function refetch() {
		let url = `/api/projects/${project.id}/errors?size=${show}`;
		if (filter && filter !== 'all') url += `&status=${filter}`;

		const result = await fetch(url);
		errors = await result.json();
	}

	function onFilter(event) {
		filter = event.detail.type;
		loading = refetch();
	}

	function onMore() {
		show = show + DEFAULT_SIZE;
		loading = refetch();
	}
</script>

<div class="flow flow-g-00 items-center | mt-0 mb-2 px-0">
	<Card class="maxw-4 mb-2" title="Errors last 30 days" subtitle={sum(grouped, 'count')}>
		<BarChart data={grouped || []} />
	</Card>

	<div class="flex-row justify-center w-full">
		<div role="list" class="maxw-00 p-0 flex-col flex-g-000">
			<span class="text-gray-300 bold text-00 uppercase px-000">Filters</span>
			{#each filters as item}
				<FilterItem on:filter={onFilter} {item} selected={filter} amount={stats[item.type]} />
			{/each}
		</div>
		<div class="px-0 maxw-3 | flow flow-g-00 ">
			{#await loading}
				<Spinner class="self-center my-2" />
			{/await}
			{#each errors as error}
				<ListItem
					on:click={(event) => (event.detail ? (selected = error.id) : (selected = null))}
					selected={error.id === selected}
				>
					<CollapsedItem slot="not-selected" item={error} />
					<ExpandedItem slot="selected" item={error} />
				</ListItem>
			{/each}
			{#if errors.length < stats[filter]}
				<button on:click={onMore} class="mt-2" data-type="secondary">Show more</button>
			{/if}
		</div>
	</div>
</div>
