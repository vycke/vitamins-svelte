<script context="module">
	import { DEFAULT_SIZE } from '$lib/constants';
	import { sequential } from '$lib/helpers/api';

	export async function load({ fetch, stuff }) {
		const { project } = stuff;

		const result = await sequential({
			stats: fetch(`/api/projects/${project.id}/tickets/stats`),
			tickets: fetch(`/api/projects/${project.id}/tickets?size=${DEFAULT_SIZE}`)
		});

		return { props: { project, ...result.props } };
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
	import Spinner from '$lib/components/layout/Spinner.svelte';
	import { fix_and_destroy_block } from 'svelte/internal';

	const filters = [
		{ label: 'All', type: 'all', class: '' },
		{ label: 'Ideas', type: 'idea', class: 'text-u-info' },
		{ label: 'Bugs', type: 'bug', class: 'text-u-error' },
		{ label: 'Other', type: 'other', class: 'text-gray-300' }
	];

	export let project = {};
	export let tickets = [],
		stats = {};

	let filter = 'all';
	let loading;
	let selected;
	let show = DEFAULT_SIZE;
	let search = '';

	async function refetch() {
		let url = `/api/projects/${project.id}/tickets?size=${show}`;
		if (filter && filter !== 'all') url += `&type=${filter}`;
		if (search && search.length > 0) url += `&id=${search}`;

		const result = await fetch(url);
		tickets = await result.json();
	}

	function onFilter(event) {
		filter = event.detail.type;
		loading = refetch();
	}

	function invokeRefetch() {
		loading = refetch();
	}

	function onMore() {
		show = show + DEFAULT_SIZE;
	}

	$: search, show, invokeRefetch();
</script>

<div class="flex-row justify-center mb-2">
	<div class="maxw-00 p-0 flex-col flex-g-000">
		<span class="text-gray-300 bold text-00 uppercase px-000">Filters</span>
		<SearchBar bind:value={search} placeholder="ticket #id" class="mb-0" />
		{#each filters as item}
			<FilterItem on:filter={onFilter} {item} selected={filter} amount={stats[item.type]} />
		{/each}

		<button on:click={() => modal.dispatch('TOGGLE')} class="mt-2 w-full">Create ticket</button>
	</div>
	<div class="px-0 maxw-3 | flow flow-g-00">
		{#await loading}
			<Spinner class="self-center my-2" />
		{/await}
		{#each tickets as item}
			<ListItem
				on:click={(event) => (event.detail ? (selected = item.id) : (selected = null))}
				selected={item.id === selected}
			>
				<CollapsedItem slot="not-selected" {item} />
				<ExpandedItem slot="selected" {item} />
			</ListItem>
		{/each}

		{#if tickets.length < stats[filter] && tickets.length >= DEFAULT_SIZE}
			<button on:click={onMore} class="mt-2" data-type="secondary">Show more</button>
		{/if}
	</div>
</div>

<Modal title="Add ticket" />
