<script context="module">
	export async function load({ page, fetch }) {
		const result = await combineCalls({
			project: fetch(`/api/projects/${page.params.projectId}`)
		});

		if (result.error) return result;
		const { project } = result.props;
		return { ...result, stuff: { project } };
	}
</script>

<script>
	import { routes } from '$lib/constants';
	import { page } from '$app/stores';
	import Navigation from '$lib/components/layout/navigation/Navigation.svelte';
	import BreadCrumb from '$lib/components/layout/BreadCrumb.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Logo from '$lib/components/layout/Logo.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { combineCalls } from '$lib/helpers/api';

	export let project = {};

	$: navItems = routes.map((r) => ({ ...r, href: `/projects/${$page.params.projectId}${r.href}` }));
	$: breadItems = [
		{ href: '/projects', title: 'Projects' },
		{ href: `/projects/${$page.params.projectId}`, title: project?.name },
		navItems.find((i) => i.href === $page.path)
	];
</script>

<div class="flex-row">
	<nav class="sticky post-0 | flex-col self-start | p-00">
		<Logo class="mb-1" />
		<Navigation items={navItems} />
	</nav>
	<div class="flex-col flex-grow mh-full | border-l-gray-500">
		<Header>
			<BreadCrumb items={breadItems} class="flex-grow" />
		</Header>

		<main class="flex-grow flex-col | p-00"><slot {project} /></main>
		<Footer />
	</div>
</div>
