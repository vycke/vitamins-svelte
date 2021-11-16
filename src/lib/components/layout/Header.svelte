<script>
	import { goto, invalidate } from '$app/navigation';

	async function submit() {
		await fetch('/api/logout');
		await invalidate();
		goto('/login', { replaceState: true });
	}
</script>

<header class="flex-row items-center | p-00 | border-b-gray-500">
	<slot />
	<button data-type="link" class="text-00 text-gray-100 underline" on:click={submit}>Logout</button>
</header>
