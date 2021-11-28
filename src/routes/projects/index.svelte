<script context="module">
	import { combineCalls } from '$lib/helpers/api';

	export async function load({ fetch }) {
		return await combineCalls({ projects: fetch(`/api/projects`) });
	}
</script>

<script>
	import BreadCrumb from '$lib/components/layout/BreadCrumb.svelte';
	import Card from '$lib/components/layout/cards/Card.svelte';
	import EmptyState from '$lib/components/layout/EmptyState.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Logo from '$lib/components/layout/Logo.svelte';
	import Modal from '$lib/components/layout/modal/Modal.svelte';
	import { modal } from '$lib/stores/modal';

	export let projects;

	const crumbs = [
		{ href: '/', title: 'Vitamins' },
		{ href: '/projects', title: 'Projects' }
	];
</script>

<div class="flex-col">
	<Header>
		<Logo class="mr-0" />
		<BreadCrumb items={crumbs} class="flex-grow" />
	</Header>
</div>

<div class="center center-w-4 flex-grow | flow flow-g-0 items-center">
	<div class="flex-row items-center | m-1">
		<h1 class="flex-grow">Projects</h1>
		<button on:click={() => modal.send('TOGGLE')}>Create project</button>
	</div>
	{#if !projects.length}
		<EmptyState message="You do not have any projects yet" />
	{/if}

	<div class="cluster cluster-g-0 cluster-w-00 cluster-stretch | items-start">
		{#each projects as project}
			<Card
				title={`ID: ${project.id}`}
				href={`/projects/${project.id}`}
				subtitle={project.name}
				class="maxw-1"
			>
				<span class="text-gray-300 italic text-00">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie urna tortor. Etiam
					mattis at magna sit amet mattis.
				</span>
			</Card>
		{/each}
	</div>
</div>

<Footer />

<Modal title="Add project" />
