<script>
	export let items = [];
	let className = '';
	export { className as class };
</script>

<svelte:head>
	<title>{items.map((i) => i.title).join(' / ')}</title>
</svelte:head>

<ul role="list" class={`flex-row | ${className}`}>
	{#each items as item, i}
		<li
			class="item | text-00 flex-row items-center px-00 radius-000 hover:bg-gray-500 transition-200"
		>
			<a href={item.href} class="no-decoration lh-1">{item.title}</a>
		</li>
		{#if i !== items.length - 1}
			<span class="mx-000 text-gray-300">/</span>
		{/if}
	{/each}
</ul>

<style>
	.item {
		height: 2rem;
		line-height: 2rem;
	}
</style>
