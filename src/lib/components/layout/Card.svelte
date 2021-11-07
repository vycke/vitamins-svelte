<script>
	let className = '';
	export { className as class };
</script>

<div class={`flex-col minw-00 | click-area | scale bg-gray-500 p-1 radius-000 | ${className}`}>
	<slot />
</div>
