<script>
	import SearchIcon from '../icons/SearchIcon.svelte';

	export let value = '';
	export let placeholder = 'search';
	let className = '';
	export { className as class };
</script>

<div class={`relative ${className}`}>
	<input bind:value {placeholder} class="w-full bg-gray-500 border-gray-400 lh-000 px-1" />
	<div class="icon"><SearchIcon class="icon-1 text-gray-300" /></div>
</div>

<style>
	input {
		padding-right: 3rem;
	}
	input::placeholder {
		color: var(--color-gray-300);
	}

	.icon {
		position: absolute;
		top: 0.6rem;
		right: var(--size-0);
	}
</style>
