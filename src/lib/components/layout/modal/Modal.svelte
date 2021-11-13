<script>
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import { modal, trigger } from '$lib/stores/modal';
	const { state } = modal;

	export let title = '';
</script>

{#if $state === 'visible'}
	<div class="dimmer" />
{/if}

<div class="modal | p-0 bg-gray-500 border-gray-400 radius-00" data-state={$state}>
	<div class="flex-row items-center bold">
		<span class="flex-grow">{title}</span>
		<button on:click={trigger} data-type="styleless">
			<CloseIcon class="text-gray-100 icon-1" />
		</button>
	</div>
	<slot />
</div>

<style>
	.dimmer {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: fixed;
		top: 2rem;
		min-width: 20rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		transition: var(--transition-300);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18);
	}

	.modal[data-state='notvisible'] {
		transform: translateY(-20rem) translateX(-50%) scale(1);
	}
</style>
