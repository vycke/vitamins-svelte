<script>
	import { format } from '$lib/helpers/datetime';
	import { toast } from '$lib/stores/toast';

	export let item;
</script>

<div class="flex-col items-start">
	<div class="flex-row items-center w-full">
		<span class="badge | py-000 px-00 | lh-000 radius-0" data-type={item.type}>{item.type}</span>
		<span class="ml-00 | text-00 bold" data-type={item.type}>ID: #{item.id}</span>
		<span class="flex-grow | ml-0 | text-00 bold text-gray-300 text-right">{format(item.date)}</span
		>
	</div>

	<span class="mt-00">{item.description}</span>

	<div class="tiles tiles-w-00 tiles-g-0 | w-full | my-1">
		<div class="flex-col">
			<span class="text-gray-300 text-00 bold uppercase">Version</span>
			<span class="break-word">{item.version}</span>
		</div>
		<div class="flex-col">
			<span class="text-gray-300 text-00 bold uppercase">Location</span>
			<span class="break-word">{item.location}</span>
		</div>
		<div class="flex-col">
			<span class="text-gray-300 text-00 bold uppercase">Agent</span>
			<span class="break-word">{item.agent}</span>
		</div>
	</div>

	<div class="flex-row justify-end items-center w-full">
		{#if item.email}
			<a
				data-type="button"
				href={`mailto:${item.email}?subject=Regarding your feedback (#${item.id})&body=Hi,`}
				on:click|stopPropagation
			>
				Email
			</a>
		{/if}
		<button
			data-type="secondary"
			class="ml-0"
			on:click|stopPropagation={() => toast.dispatch('CREATED', { label: 'Archived' })}
			>Archive</button
		>
	</div>
</div>
