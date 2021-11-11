<script>
	export let item;
</script>

<div class="flex-row items-center w-full justify-self-start">
	<span class="badge | lh-000 py-000 px-00 radius-0" data-status={item.status}>
		{item.status}
	</span>
	<span class="flex-grow mx-0 monospace">{item.error.name}</span>
	<span class="text-00 bold text-gray-300 ml-0 text-right">
		{item.timestamp.slice(0, 10)}
	</span>
</div>
