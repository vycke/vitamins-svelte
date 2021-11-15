<script>
	import { format } from '$lib/helpers/datetime';

	export let item;
</script>

<div class="flex-col items-start">
	<div class="flex-row items-center w-full">
		<span class="badge | lh-000 py-000 px-00 radius-0" data-type={item.type}>{item.type}</span>
		<span class="ml-00 text-00 bold" data-type={item.type}>ID: #{item.id}</span>
		<span class="text-00 bold text-gray-300 ml-0 flex-grow text-right">{format(item.date)}</span>
	</div>

	<span class="ellipsis maxw-2 mt-00">{item.description}</span>
</div>
