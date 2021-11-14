<script>
	import InfoIcon from '../icons/InfoIcon.svelte';
	import WarningIcon from '../icons/WarningIcon.svelte';

	// type = info | warning
	export let title = '';
	export let type = '';
	export let description = '';
</script>

<div
	class:bg-u-info={type === 'info'}
	class:bg-u-error={type === 'warning'}
	class="flex-col p-0 radius-0"
>
	<div class="flex-row items-center flex-g-00">
		<slot name="icon" />
		{#if type === 'info'}
			<InfoIcon class="text-info icon-1" />
		{/if}
		{#if type === 'warning'}
			<WarningIcon class="text-error icon-1" />
		{/if}
		<span
			class:text-info={type === 'info'}
			class:text-error={type === 'warning'}
			class="bold lh-000"
		>
			{title}
		</span>
	</div>
	<span class="text-gray-500 text-00 mt-00">{description}</span>
</div>
