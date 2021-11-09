<script>
	export let hover = true;
	let className = '';
	export { className as class };
</script>

<div
	class:scale={hover}
	class:border-gray-400={!hover}
	class={`flex-col minw-00 | click-area | bg-gray-500 p-1 radius-000 | ${className}`}
>
	<slot />
</div>
