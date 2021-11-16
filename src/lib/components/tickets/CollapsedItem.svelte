<script>
	import { format } from '$lib/helpers/datetime';

	export let item;
</script>

<div class="flex-col items-start">
	<div class="flex-row items-center w-full">
		<span class="badge | py-000 px-00 | lh-000 radius-0" data-type={item.type}>{item.type}</span>
		<span class="ml-00 | text-00 bold" data-type={item.type}>ID: #{item.id}</span>
		<span class="flex-grow | ml-0 | text-00 bold text-gray-300 text-right">{format(item.date)}</span
		>
	</div>

	<span class="maxw-2 | mt-00 | ellipsis">{item.description}</span>
</div>
