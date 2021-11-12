<script>
	import { page } from '$app/stores';
	export let items = [];
</script>

<ul role="list" class="minw-00">
	{#each items as item}
		<li
			class:bold={$page.path.includes(item.href)}
			class:bg-gray-500={$page.path.includes(item.href)}
			class="mb-000 px-00 py-000 lh-000 radius-000 hover:bg-gray-500 transition-200 click-area"
		>
			<a href={item.href} class="no-decoration">{item.title}</a>
		</li>
	{/each}
</ul>
