<script>
	import { toast, unset } from '$lib/stores/toast';
</script>

<div
	class="toast | bold py-000 px-0 lh-00 bg-bace text-gray-100 radius-00"
	data-state={$toast.state}
>
	<span>{$toast.label}</span>
	<button on:click={unset} class="ml-1" data-type="link">x</button>
</div>

<style>
	.toast {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 999;
		transition: var(--transition-300);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18);
	}

	.toast button {
		padding: 0;
	}

	.toast[data-state='notvisible'] {
		transform: translateY(20rem) scale(1);
	}
</style>
