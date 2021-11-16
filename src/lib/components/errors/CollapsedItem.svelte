<script>
	import { format } from '$lib/helpers/datetime';

	export let item;
</script>

<div class="flex-row items-center w-full justify-self-start">
	<span class="badge | py-000 px-00 | lh-000 radius-0" data-status={item.status}>
		{item.status}
	</span>
	<span class="flex-grow | mx-0 | monospace">{item.error.name}</span>
	<span class="ml-0 | text-00 bold text-gray-300 text-right">
		{format(item.timestamp)}
	</span>
</div>
