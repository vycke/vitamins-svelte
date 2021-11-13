<script context="module">
	import { loadHelper } from '$lib/helpers/load';
	export async function load({ stuff, fetch }) {
		const project = await stuff.project;
		const result = await loadHelper(fetch, `/api/errors.json`, ['errors', 'errorsPerDay']);
		return { props: { project, ...result.props } };
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/cards/Card.svelte';
	import CardIcon from '$lib/components/layout/cards/CardIcon.svelte';
	import BugIcon from '$lib/components/icons/BugIcon.svelte';
	import ComputerIcon from '$lib/components/icons/ComputerIcon.svelte';
	import TicketIcon from '$lib/components/icons/TicketIcon.svelte';
	import ViewIcon from '$lib/components/icons/ViewIcon.svelte';
	import Spinner from '$lib/components/layout/Spinner.svelte';
	export let project = {};
	export let errorsPerDay = [];
</script>

<h1 class="mb-2">{project?.name}</h1>
<div class="tiles tiles-w-1 tiles-g-2">
	<Card title="Open tickets" subtitle="0">
		<CardIcon slot="icon">
			<TicketIcon class="icon-2" />
		</CardIcon>
	</Card>
	<Card title="Errors last 30 days" subtitle="0">
		<CardIcon slot="icon">
			<BugIcon class="icon-2" />
		</CardIcon>
		<BarChart data={errorsPerDay} size="small" />
	</Card>
	<Card title="Sessions last 30 days" subtitle="0">
		<CardIcon slot="icon">
			<ComputerIcon class="icon-2" />
		</CardIcon>
	</Card>
	<Card title="Visits last 30 days" subtitle="0">
		<CardIcon slot="icon">
			<ViewIcon class="icon-2" />
		</CardIcon>
	</Card>
</div>
