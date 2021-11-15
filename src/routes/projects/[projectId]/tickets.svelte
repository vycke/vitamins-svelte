<script context="module">
	import { DEFAULT_SIZE } from '$lib/constants';
	import { apiError } from '$lib/helpers/api';

	export async function load({ fetch, stuff }) {
		const { project } = stuff;
		const stats = await fetch(`/api/projects/${project.id}/tickets/stats`);
		const tickets = await fetch(`/api/projects/${project.id}/tickets?size=${DEFAULT_SIZE}`);

		if (stats.ok && tickets.ok) {
			return {
				props: {
					stats: await stats.json(),
					tickets: await tickets.json()
				}
			};
		}

		return apiError(stats, tickets);
	}
</script>

<script>
	import ListItem from '$lib/components/layout/ListItem.svelte';
	import CollapsedItem from '$lib/components/tickets/CollapsedItem.svelte';
	import ExpandedItem from '$lib/components/tickets/ExpandedItem.svelte';
	import { modal } from '$lib/stores/modal';
	import Modal from '$lib/components/layout/modal/Modal.svelte';
	import FilterItem from '$lib/components/layout/FilterItem.svelte';
	import SearchBar from '$lib/components/layout/SearchBar.svelte';

	const filters = [
		{ label: 'All', type: 'all', class: '' },
		{ label: 'Ideas', type: 'idea', class: 'text-u-info' },
		{ label: 'Bugs', type: 'bug', class: 'text-u-error' },
		{ label: 'Other', type: 'other', class: 'text-gray-300' }
	];

	export let tickets = [],
		stats = {};

	let filter = 'all';
	let selected;
	let search = '';

	$: showItems = tickets.filter((t) => {
		if (search) return t.id === search;
		if (filter === 'all') return true;
		return t.type === filter;
	});

	async function updateFilter(event) {
		filter = event.detail.type;
	}
</script>

<div class="flex-row justify-center">
	<div class="maxw-00 p-0 flex-col flex-g-000">
		<span class="text-gray-300 bold text-00 uppercase px-000">Filters</span>
		<SearchBar bind:value={search} placeholder="ticket #id" class="mb-0" />
		{#each filters as item}
			<FilterItem on:filter={updateFilter} {item} selected={filter} amount={stats[item.type]} />
		{/each}

		<button on:click={() => modal.dispatch('TOGGLE')} class="mt-2 w-full">Create ticket</button>
	</div>
	<div class="px-0 maxw-3 | flow flow-g-00">
		{#each showItems as item}
			<ListItem
				on:click={(event) => (event.detail ? (selected = item.id) : (selected = null))}
				selected={item.id === selected}
			>
				<CollapsedItem slot="not-selected" {item} />
				<ExpandedItem slot="selected" {item} />
			</ListItem>
		{/each}
	</div>
</div>

<Modal title="Add ticket" />
