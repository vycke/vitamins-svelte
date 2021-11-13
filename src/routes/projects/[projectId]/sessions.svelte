<script context="module">
	import { loadHelper } from '$lib/helpers/load';

	export async function load({ fetch }) {
		return loadHelper(fetch, `/api/sessions.json`, ['sessionsPerDay', 'topVisitedPages']);
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/cards/Card.svelte';
	import { sum } from '$lib/helpers/numbers';
	export let topVisitedPages, sessionsPerDay;

	$: totalPages = sum(topVisitedPages, 'count');
	$: totalSessions = sum(sessionsPerDay, 'count');
</script>

<div class="center center-w-3 center-g-0 | flow flow-g-00 | mt-0">
	<Card
		class="center-exception maxw-4 mb-2"
		hover={false}
		title="Sessions last 30 days"
		subtitle={totalSessions}
	>
		<BarChart data={sessionsPerDay || []} />
	</Card>

	<h2 class="text-1 uppercase">Top 20 visited pages of the last 30 days</h2>
	<span class="text-gray-300 uppercase mb-0">Total: {totalPages}</span>
	<ol>
		{#each topVisitedPages as page}
			<li>
				<div class="flex-row items-center px-0">
					<span class="flex-grow break-word">{page.path}</span>
					<span class="bold">{page.count}</span>
				</div>
			</li>
		{/each}
	</ol>
</div>
