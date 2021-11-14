<script context="module">
	export async function load({ stuff }) {
		const project = await stuff.project;
		return { props: { project } };
	}
</script>

<script>
	import { toast } from '$lib/stores/toast';
	export let project = {};

	function onSubmit() {
		console.log(project);
		toast.dispatch('CREATED', { label: 'Updated' });
	}
</script>

<div class="center center-w-3 | flow flow-g-0">
	<h1 class="flex-grow mb-2">Settings for {project.name}</h1>
	<form class="flow" on:submit|preventDefault={onSubmit}>
		<label for="name">Project name</label>
		<input id="name" type="text" bind:value={project.name} placeholder="Enter project name here." />
		<div class="flex-row flex-g-0 mt-0 self-start">
			<button type="submit">Update</button>
			<button
				type="button"
				data-type="error"
				on:click|stopPropagation={() => toast.dispatch('CREATED', { label: 'Deleted' })}
			>
				Delete
			</button>
		</div>
	</form>
</div>
