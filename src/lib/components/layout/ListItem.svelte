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
	class="p-0 | radius-00 transition-200 border-gray-600 hover:border-gray-400 pointer"
	on:click={onclick}
>
	{#if selected}
		<slot name="selected" />
	{/if}
	{#if !selected}
		<slot name="not-selected" />
	{/if}
</div>
