<script>
	export let selected = false;
</script>

<div
	class:border-gray-400={selected}
	class:bg-gray-500={selected}
	class:pointer={!selected}
	class="list-item | radius-00 p-0 transition-200"
	on:click
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
