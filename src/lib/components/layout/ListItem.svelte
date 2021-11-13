<script>
	import { createEventDispatcher } from 'svelte';
	export let selected = false;
	const dispatch = createEventDispatcher();
	function onclick() {
		dispatch('click', !selected);
	}
</script>

<div
	class:border-gray-500={selected}
	class:bg-gray-500={selected}
	class:pointer={!selected}
	class="list-item | radius-00 p-0 transition-200 border-gray-600 hover:border-gray-400"
	on:click={onclick}
>
	{#if selected}
		<slot name="selected" />
	{/if}
	{#if !selected}
		<slot name="not-selected" />
	{/if}
</div>

<style>
	.list-item {
		cursor: pointer;
	}
</style>
