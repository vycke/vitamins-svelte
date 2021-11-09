<script context="module">
	export async function load({ session }) {
		if (session.user) return { status: 302, redirect: '/projects' };
		return {};
	}
</script>

<script>
	import { goto } from '$app/navigation';

	async function submit() {
		await fetch('/api/login');
		goto('/projects');
	}
</script>

<div class="p-3 w-full">
	<button on:click={submit} class="bg-bace p-0">Login</button>
</div>
