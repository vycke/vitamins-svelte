<script context="module">
	export async function load({ page }) {
		return {
			status: 301,
			redirect: `/projects/${page.params.projectId}/overview`
		};
	}
</script>
