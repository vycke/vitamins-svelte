<script>
	let className = '';
	export { className as class };
</script>

<svg
	aria-hidden="true"
	focusable="false"
	class={`spinner ${className}`}
	role="img"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 512 512"
>
	<path
		d="M255.92 0C126.201 0 19.9941 93.6 0.160352 215.52C-1.11925 223.2 5.43869 230.4 13.4362 230.4H498.564C506.561 230.4 513.119 223.2 511.84 215.52C491.846 93.6 385.639 0 255.92 0ZM498.404 281.6H13.4362C5.43869 281.6 -1.11925 288.8 0.160352 296.48C19.9941 418.4 126.201 512 255.92 512C385.639 512 491.846 418.4 511.68 296.48C512.959 288.8 506.401 281.6 498.404 281.6Z"
		fill="currentColor"
	/>
</svg>

<style>
	.spinner {
		height: 2rem;
		width: 2rem;
		z-index: 900;
		color: var(--color-bace);
		animation: rotate 1.5s infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
