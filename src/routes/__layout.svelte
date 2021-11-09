<script context="module">
	export async function load({ session, page }) {
		if (!session.user?.id && page.path !== '/login')
			return {
				status: 301,
				redirect: '/login'
			};

		return { stuff: { user: session.user } };
	}
</script>

<script>
	import '../styles/index.scss';
</script>

<svelte:head>
	<title>Vitamins</title>
</svelte:head>

<main class="bg-gray-600 text-gray-100 flex-col mh-full"><slot /></main>
