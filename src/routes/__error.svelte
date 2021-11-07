<script context="module">
	export const prerender = true;
	export async function load({ error, status }) {
		return { props: { status, error } };
	}
</script>

<svelte:head>
	<title>🙈🙉🙊</title>
</svelte:head>

<h1 class="mb-00 text-center">
	<span role="img" aria-label="Sorry emoji" aria-labelledby=""> 🙈🙉🙊 </span>
</h1>
<h2 class="text-center">Something went wrong...</h2>
<span class="text-gray-300 mb-2 text-0 text-center"> ... </span>
