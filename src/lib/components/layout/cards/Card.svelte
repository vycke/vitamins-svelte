<script>
	export let href = '';
	let className = '';
	export let title = '';
	export let subtitle = '';
	export { className as class };
</script>

<div
	class:hover:border-gray-400={href.length}
	class={`flex-col minw-00 | click-area | bg-gray-500 border-gray-500 p-1 radius-000 transition-200 | ${className}`}
>
	<div class="flex-row items-start">
		<slot name="icon" />
		<div class="flex-col">
			<h2 class="uppercase text-0 text-gray-300">
				{#if href.length}
					<a {href} class="no-decoration">{title}</a>
				{/if}

				{#if !href.length}
					{title}
				{/if}
			</h2>
			<span class="bold mb-0 text-3">{subtitle}</span>
		</div>
	</div>
	<slot />
</div>
