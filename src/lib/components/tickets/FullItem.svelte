<script>
	export let item;
</script>

<div class="flex-col items-start">
	<div class="flex-row items-center w-full">
		<span class="badge | lh-000 py-000 px-00 radius-0" data-type={item.type}>{item.type}</span>
		<span class="text-00 bold text-gray-300 ml-0 flex-grow text-right"
			>{item.date.slice(0, 10)}</span
		>
	</div>

	<span class="mt-00">{item.description}</span>

	<div class="tiles tiles-w-00 tiles-g-0 w-full my-1">
		<div class="flex-col">
			<span class="text-gray-300 text-00 bold uppercase">Version</span>
			<span>{item.version}</span>
		</div>
		<div class="flex-col">
			<span class="text-gray-300 text-00 bold uppercase">Location</span>
			<span>{item.location}</span>
		</div>
		<div class="flex-col">
			<span class="text-gray-300 text-00 bold uppercase">Agent</span>
			<span>{item.agent}</span>
		</div>
	</div>

	<div class="flex-row justify-end items-center w-full">
		<button>Email</button>
		<button data-type="secondary" class="ml-0">Archive</button>
	</div>
</div>
