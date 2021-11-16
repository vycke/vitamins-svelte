<script context="module">
	import { DEFAULT_DAYS } from '$lib/constants';
	import { combineCalls } from '$lib/helpers/api';

	export async function load({ stuff, fetch }) {
		const { project } = await stuff;
		const result = await combineCalls({
			sessions: fetch(`/api/projects/${project.id}/sessions/grouped?days=${DEFAULT_DAYS}`),
			visits: fetch(`/api/projects/${project.id}/visits/stats?days=${DEFAULT_DAYS}`),
			tickets: fetch(`/api/projects/${project.id}/tickets/stats`),
			errors: fetch(`/api/projects/${project.id}/errors/grouped?days=${DEFAULT_DAYS}`)
		});

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
	import { sum } from '$lib/helpers/numbers';

	export let project, errors, tickets, sessions, visits;
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
