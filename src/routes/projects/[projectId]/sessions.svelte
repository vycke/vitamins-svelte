<script context="module">
	import { apiError } from '$lib/helpers/api';
	import { DEFAULT_DAYS } from '$lib/constants';

	export async function load({ fetch, stuff }) {
		const { project } = stuff;
		const sessions = await fetch(
			`/api/projects/${project.id}/sessions/grouped?days=${DEFAULT_DAYS}`
		);
		const visits = await fetch(`/api/projects/${project.id}/visits/stats?days=${DEFAULT_DAYS}`);

		if (visits.ok && sessions.ok) {
			return {
				props: {
					visits: await visits.json(),
					sessions: await sessions.json()
				}
			};
		}

		return apiError(sessions, visits);
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/cards/Card.svelte';
	import { sum } from '$lib/helpers/numbers';

	export let sessions, visits;

	$: totalPages = sum(visits, 'count');
	$: totalSessions = sum(sessions, 'count');
</script>

<div class="center center-w-3 center-g-0 | flow flow-g-00 | mt-0">
	<Card
		class="center-exception maxw-4 mb-2"
		hover={false}
		title="Sessions last 30 days"
		subtitle={totalSessions}
	>
		<BarChart data={sessions || []} />
	</Card>

	<h2 class="text-1 uppercase">Top 20 visited pages of the last 30 days</h2>
	<span class="text-gray-300 uppercase mb-0">Total: {totalPages}</span>
	<ol>
		{#each visits as page}
			<li>
				<div class="flex-row items-center px-0">
					<span class="flex-grow break-word">{page.path}</span>
					<span class="bold">{page.count}</span>
				</div>
			</li>
		{/each}
	</ol>
</div>
