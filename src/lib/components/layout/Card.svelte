<script>
	export let clickable = true;
	let className = '';
	export { className as class };
</script>

<div
	class:hover:border-gray-400={clickable}
	class={`flex-col minw-00 | click-area | bg-gray-500 border-gray-500 p-1 radius-000 transition-200 | ${className}`}
>
	<slot />
</div>
