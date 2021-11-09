<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api/projects.json`);
		if (res.ok) {
			const projects = await res.json();
			return { props: { projects } };
		}

		return {
			status: res.status,
			error: new Error('Something went wrong')
		};
	}
</script>

<script>
	import BreadCrumb from '$lib/components/BreadCrumb.svelte';

	import Card from '$lib/components/layout/Card.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Logo from '$lib/components/layout/Logo.svelte';

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
	<h1 class="m-1">Projects</h1>
</div>
<div class="cluster cluster-g-0 cluster-w-0 p-2 flex-grow items-start">
	{#each projects as project}
		<Card>
			<a href={`/projects/${project.id}`} class="text-1 no-decoration bold">{project.name}</a>
			<span class="text-gray-400 italic text-00">Created at: {project.created_at.slice(0, 10)}</span
			>
		</Card>
	{/each}
</div>
<Footer />
