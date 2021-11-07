<script>
	import { goto } from '$app/navigation';

	async function submit() {
		await fetch('/api/login', { method: 'POST' });
		goto('/');
	}
</script>

<div class="p-3 w-full">
	<button on:click={submit} class="bg-bace p-0">Login</button>
</div>
