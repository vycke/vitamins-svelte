<script>
	import { format, time } from '$lib/helpers/datetime';
	import { toast } from '$lib/stores/toast';

	export let item;
	export let events = [];
	$: stack = item.error.stack.split('\r\n');
</script>

<div class="flex-col items-start">
	<div class="flex-row items-center w-full">
		<span class="badge | lh-000 py-000 px-00 radius-0" data-status={item.status}>
			{item.status}
		</span>
		<span class="flex-grow mx-0 monospace">{item.error.name}</span>
		<span class="text-00 bold text-gray-300 ml-0 text-right">
			{format(item.timestamp)}
		</span>
	</div>

	<div class="tiles tiles-w-00 tiles-g-00 w-full my-1">
		{#each Object.keys(item.metadata) as key}
			<div class="flex-col">
				<span class="text-gray-300 text-00 bold uppercase">{key}</span>
				<span class="break-word monospace text-00">{item.metadata[key]}</span>
			</div>
		{/each}
	</div>

	<span class="text-gray-300 text-00 bold uppercase mb-00">Stack trace</span>

	<pre
		class="bg-gray-600 w-full radius-00 mb-0">
		<code>
			{#each stack as line}
				<span>{line}</span>
			{/each}
		</code>
	</pre>

	<span class="text-gray-300 text-00 bold uppercase mb-00">Bread crumbs</span>
	<div class="grid | mb-1 text-00">
		{#each events as event}
			<span class="tag | monospace bg-gray-600 radius-000 self-start">{event.tag}</span>
			<span class="wrap flex-grow">{event.message}</span>
			<span class="time | text-gray-300 flex-grow text-right">
				{format(event.timestamp)}
				{time(item.timestamp)}
			</span>
		{/each}
	</div>

	<div class="flex-row justify-end items-center w-full">
		<button on:click|stopPropagation={() => toast.dispatch('CREATED', { label: 'Ticket created' })}>
			Create ticket
		</button>
		<button
			data-type="secondary"
			class="ml-0"
			on:click|stopPropagation={() => toast.dispatch('CREATED', { label: 'Archived' })}
		>
			Archive
		</button>
	</div>
</div>

<style>
	.tag {
		padding: 2px 6px;
		justify-self: start;
	}

	.time {
		min-width: 100px;
	}

	.grid {
		display: grid;
		grid-template-columns: auto 1fr auto;
		column-gap: var(--size-00);
		row-gap: var(--size-000);
	}

	.wrap {
		word-wrap: break-word;
		white-space: normal;
	}
</style>
