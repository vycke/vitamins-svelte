<script context="module">
	import { loadHelper } from '$lib/helpers/load';
	export async function load({ stuff, fetch }) {
		const project = await stuff.project;
		const errors = await loadHelper(fetch, `/api/errors.json`, ['errorsPerDay']);
		const tickets = await loadHelper(fetch, `/api/tickets.json`, 'tickets');
		const sessions = await loadHelper(fetch, `/api/sessions.json`, [
			'sessionsPerDay',
			'topVisitedPages'
		]);
		return { props: { project, ...errors.props, ...tickets.props, ...sessions.props } };
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
	import { sum } from '$lib/helpers/numbers';

	export let project = {};
	export let errorsPerDay = [],
		tickets = [],
		sessionsPerDay = [],
		topVisitedPages = [];
</script>

<div class="center center-w-4">
	<h1 class="mb-2">{project?.name}</h1>
	<Card
		title="Errors last 30 days"
		subtitle={sum(errorsPerDay, 'count')}
		href={`/projects/${project.id}/errors`}
	>
		<CardIcon slot="icon">
			<BugIcon class="icon-2" />
		</CardIcon>
		<BarChart data={errorsPerDay} />
	</Card>
	<div class="tiles tiles-w-00 tiles-g-2 mt-2">
		<Card title="Open tickets" subtitle={tickets.length} href={`/projects/${project.id}/tickets`}>
			<CardIcon slot="icon">
				<TicketIcon class="icon-2" />
			</CardIcon>
		</Card>

		<Card
			title="Sessions last 30 days"
			subtitle={sum(sessionsPerDay, 'count')}
			href={`/projects/${project.id}/sessions`}
		>
			<CardIcon slot="icon">
				<ComputerIcon class="icon-2" />
			</CardIcon>
		</Card>
		<Card
			title="Visits last 30 days"
			subtitle={sum(topVisitedPages, 'count')}
			href={`/projects/${project.id}/sessions`}
		>
			<CardIcon slot="icon">
				<ViewIcon class="icon-2" />
			</CardIcon>
		</Card>
	</div>
</div>
