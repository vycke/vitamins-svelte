<script context="module">
	import { DEFAULT_SIZE, ticketFilters } from '$lib/constants';
	import { combineCalls } from '$lib/helpers/api';

	export async function load({ fetch, stuff }) {
		const { project } = stuff;

		const result = await combineCalls({
			stats: fetch(`/api/projects/${project.id}/tickets/stats`),
			tickets: fetch(`/api/projects/${project.id}/tickets?size=${DEFAULT_SIZE}`)
		});

		if (result.error) return result;
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

	export let project, tickets, stats, loading, selected;

	let filter = 'all';
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

<div class="flex-row flex-g-1 justify-center | mb-2 mt-0">
	<div class="maxw-00 flex-col flex-g-000 | p-0">
		<span class="px-000 | text-gray-300 bold text-00 uppercase">Filters</span>
		<SearchBar bind:value={search} placeholder="ticket #id" class="mb-0" />
		{#each ticketFilters as item}
			<FilterItem on:filter={onFilter} {item} selected={filter} amount={stats[item.type]} />
		{/each}

		<button on:click={() => modal.send('TOGGLE')} class="w-full | mt-2">Create ticket</button>
	</div>
	<div class="maxw-3 | flow flow-g-00">
		{#await loading}
			<Spinner class="self-center | my-2" />
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
