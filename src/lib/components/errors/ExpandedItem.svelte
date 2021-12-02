<script>
	import { format, time } from '$lib/helpers/datetime';
	import { toast } from '$lib/stores/toast';

	export let item;
	export let events = [];
	$: stack = item.error.stack.split('\r\n');
</script>

<div class="flex-col items-start">
	<div class="flex-row items-center w-full">
		<span class="badge | py-000 px-00 | lh-000 radius-0" data-status={item.status}>
			{item.status}
		</span>
		<span class="flex-grow | mx-0 | monospace">{item.error.name}</span>
		<span class="ml-0 | text-00 bold text-gray-300 text-right">
			{format(item.timestamp)}
		</span>
	</div>

	<div class="tiles tiles-w-00 tiles-g-00 | w-full | my-1">
		{#each Object.keys(item.metadata) as key}
			<div class="flex-col">
				<span class="text-gray-300 text-00 bold uppercase">{key}</span>
				<span class="break-word monospace text-00">{item.metadata[key]}</span>
			</div>
		{/each}
	</div>

	<span class="mb-00 | text-gray-300 text-00 bold uppercase">Stack trace</span>

	<pre
		class="w-full | mb-0 | bg-gray-600 radius-00">
		<code>
			{#each stack as line}
				<span>{line}</span>
			{/each}
		</code>
	</pre>

	<span class="mb-00 | text-gray-300 text-00 bold uppercase">Bread crumbs</span>
	<div class="grid | mb-1 text-00">
		{#each events as event}
			<span class="tag | self-start | monospace bg-gray-600 radius-000">{event.tag}</span>
			<span class="flex-grow | wrap">{event.message}</span>
			<span class="time | flex-grow | text-gray-300 text-right">
				{format(event.timestamp)}
				{time(item.timestamp)}
			</span>
		{/each}
	</div>

	<div class="flex-row justify-end items-center w-full">
		<button on:click|stopPropagation={() => toast.send('OPENED', { label: 'Ticket created' })}>
			Create ticket
		</button>
		<button
			data-type="secondary"
			class="ml-0"
			on:click|stopPropagation={() => toast.send('OPENED', { label: 'Archived' })}
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
