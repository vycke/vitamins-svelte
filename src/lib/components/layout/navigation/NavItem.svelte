<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let item = {};
	export let Icon;

	$: selected = $page.path.includes(item.href);

	onMount(async () => {
		Icon = (await import(`../../icons/${item.icon}.svelte`)).default;
	});
</script>

<li
	class:text-bace={selected}
	class:bg-gray-500={selected}
	class="mb-000 px-00 py-000 lh-000 radius-000 hover:bg-gray-500 transition-200 click-area flex-row items-center"
>
	{#if Icon}
		<svelte:component this={Icon} class="mr-0 icon-1 text-gray-300" />
	{/if}

	<a href={item.href} class="no-decoration">{item.title}</a>
</li>
