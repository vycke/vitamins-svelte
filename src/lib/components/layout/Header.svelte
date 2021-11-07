<script>
	import { goto } from '$app/navigation';

	async function submit() {
		await fetch('/api/logout', { method: 'POST' });
		goto('/login');
	}
</script>

<div class="flex-row items-center p-00 border-b-gray-500">
	<slot />
	<button href="/logout" class="text-00 text-gray-100 underline" on:click={submit}>Logout</button>
</div>
