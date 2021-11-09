<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch(`/api/${page.params.projectId}.json`);
		if (res.ok) {
			const project = await res.json();
			return { props: { project }, stuff: { project } };
		}

		return {
			status: res.status,
			error: new Error('Something went wrong')
		};
	}
</script>

<script>
	import { routes } from '$lib/constants';
	import { page } from '$app/stores';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import BreadCrumb from '$lib/components/BreadCrumb.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Logo from '$lib/components/layout/Logo.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	export let project = {};

	$: navItems = routes.map((r) => ({ ...r, href: `/projects/${$page.params.projectId}${r.href}` }));
	$: breadItems = [
		{ href: '/projects', title: 'Projects' },
		{ href: `/projects/${$page.params.projectId}`, title: project?.name },
		navItems.find((i) => i.href === $page.path)
	];
</script>

<div class="flex-row">
	<div class="flex-col p-00 sticky self-start post-0">
		<Logo class="mb-1" />
		<Navigation items={navItems} />
	</div>
	<div class="flex-col flex-grow mh-full border-l-gray-500">
		<Header>
			<BreadCrumb items={breadItems} class="flex-grow" />
		</Header>

		<main class="flex-grow p-00"><slot {project} /></main>
		<Footer />
	</div>
</div>
