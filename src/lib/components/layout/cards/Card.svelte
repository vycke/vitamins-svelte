<script>
	export let clickable = true;
	let className = '';
	export let title = '';
	export let subtitle = '';
	export { className as class };
</script>

<div
	class:hover:border-gray-400={clickable}
	class={`flex-col minw-00 | click-area | bg-gray-500 border-gray-500 p-1 radius-000 transition-200 | ${className}`}
>
	<div class="flex-row items-start">
		<slot name="icon" />
		<div class="flex-col">
			<h2 class="uppercase text-0 text-gray-300">{title}</h2>
			<span class="bold mb-0 text-3">{subtitle}</span>
		</div>
	</div>
	<slot />
</div>
