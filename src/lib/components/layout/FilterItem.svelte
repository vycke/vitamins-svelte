<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let selected;
	export let amount = 0;
	export let item = {};

	function filter() {
		dispatch('filter', {
			type: item.type
		});
	}
</script>

<div
	on:click={filter}
	class={`flex-row items-center w-full p-000 radius-000 lh-000 transition-200 hover:bg-gray-500 pointer ${item.class}`}
	class:bg-gray-500={selected === item.type}
>
	<span class="flex-grow">{item.label}</span>
	<span>{amount}</span>
</div>
