<script context="module">
	import { DEFAULT_DAYS } from '$lib/constants';
	import { apiError } from '$lib/helpers/api';

	export async function load({ stuff, fetch }) {
		const { project } = await stuff;

		const sessions = await fetch(
			`/api/projects/${project.id}/sessions/grouped?days=${DEFAULT_DAYS}`
		);
		const visits = await fetch(`/api/projects/${project.id}/visits/stats?days=${DEFAULT_DAYS}`);
		const tickets = await fetch(`/api/projects/${project.id}/tickets/stats`);
		const errors = await fetch(`/api/projects/${project.id}/errors/grouped?days=${DEFAULT_DAYS}`);

		if (errors.ok && visits.ok && sessions.ok && tickets.ok) {
			return {
				props: {
					project,
					errors: await errors.json(),
					tickets: await tickets.json(),
					sessions: await sessions.json(),
					visits: await visits.json()
				}
			};
		}

		return apiError(errors, tickets, sessions, visits);
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
	export let errors = [],
		tickets = {},
		sessions = [],
		visits = [];
</script>

<div class="center center-w-4">
	<h1 class="mb-2">{project?.name}</h1>
	<Card
		title="Errors last 30 days"
		subtitle={sum(errors, 'count')}
		href={`/projects/${project.id}/errors`}
	>
		<CardIcon slot="icon">
			<BugIcon class="icon-1" />
		</CardIcon>
		<BarChart data={errors} />
	</Card>
	<div class="tiles tiles-w-00 tiles-g-2 mt-2">
		<Card title="Open tickets" subtitle={tickets.all} href={`/projects/${project.id}/tickets`}>
			<CardIcon slot="icon">
				<TicketIcon class="icon-1" />
			</CardIcon>
		</Card>

		<Card
			title="Sessions last 30 days"
			subtitle={sum(sessions, 'count')}
			href={`/projects/${project.id}/sessions`}
		>
			<CardIcon slot="icon">
				<ComputerIcon class="icon-1" />
			</CardIcon>
		</Card>
		<Card
			title="Visits last 30 days"
			subtitle={sum(visits, 'count')}
			href={`/projects/${project.id}/sessions`}
		>
			<CardIcon slot="icon">
				<ViewIcon class="icon-1" />
			</CardIcon>
		</Card>
	</div>
</div>
