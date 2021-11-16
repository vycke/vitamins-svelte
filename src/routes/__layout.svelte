<script context="module">
	export async function load({ session }) {
		return { stuff: { user: session.user } };
	}
</script>

<script>
	import Toast from '$lib/components/layout/Toast.svelte';
	import '../styles/index.scss';
</script>

<svelte:head>
	<meta name="color-scheme" content="dark" />
</svelte:head>

<div class="flex-col mh-full | bg-gray-600 text-gray-100">
	<slot />
</div>
<Toast />
