<script>
	import { page } from '$app/stores';

	export let title = '';
	export let href = '/';
	export let exact = false;
	$: selected = exact ? $page.path === href : $page.path.includes(href);
</script>

<li
	class:selected
	class:bg-gray-500={selected}
	class="mb-000 px-00 py-000 lh-000 radius-000 hover:bg-gray-500 transition-200 click-area"
>
	<a {href} class="no-decoration">{title}</a>
</li>

<style>
	.selected a {
		font-weight: 600;
	}
</style>
