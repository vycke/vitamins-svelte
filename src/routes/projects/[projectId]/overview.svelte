<script context="module">
	let project = '';
	export async function load({ stuff }) {
		project = stuff.project;
		return true;
	}
</script>

<h1 class="text-2">{project?.name}</h1>
