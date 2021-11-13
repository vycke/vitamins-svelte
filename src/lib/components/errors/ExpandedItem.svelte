<script>
	import { format } from '$lib/helpers/datetime';

	import { set } from '$lib/stores/toast';

	export let item;
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

	<span class="text-gray-300 text-00 bold uppercase">Stack trace</span>

	<pre
		class="bg-gray-600 w-full radius-00 mb-0">
		<code>
			{#each stack as line}
				<span>{line}</span>
			{/each}
		</code>
	</pre>

	<div class="flex-row justify-end items-center w-full">
		<button on:click|stopPropagation={() => set('Ticket created')}>Create ticket</button>
		<button data-type="secondary" class="ml-0" on:click|stopPropagation={() => set('Archived')}>
			Archive
		</button>
	</div>
</div>
