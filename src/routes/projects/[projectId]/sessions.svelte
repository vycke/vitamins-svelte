<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api/sessions.json`);
		if (res.ok) {
			const { sessionsPerDay, topVisitedPages } = await res.json();
			return { props: { sessionsPerDay, topVisitedPages } };
		}

		return {
			status: res.status,
			error: new Error('Something went wrong')
		};
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/Card.svelte';
	import { sum } from '$lib/helpers';
	export let topVisitedPages, sessionsPerDay;

	$: totalPages = sum(topVisitedPages, 'count');
	$: totalSessions = sum(sessionsPerDay, 'count');
</script>

<div class="center center-w-3 center-g-0 | flow flow-g-00 | mt-0">
	<Card class="center-exception maxw-4 mb-2" hover={false}>
		<h2 class="uppercase text-0 text-gray-300">Sessions last 30 days</h2>
		<span class="bold uppercase mb-0 text-1">Total: {totalSessions}</span>
		<BarChart data={sessionsPerDay || []} class="center-exception maxw-4" />
	</Card>

	<h2 class="text-1 uppercase">Top 20 visited pages of the last 30 days</h2>
	<span class="text-gray-300 uppercase mb-0">Total: {totalPages}</span>
	<ol>
		{#each topVisitedPages as page}
			<li>
				<div class="flex-row items-center px-0">
					<span class="flex-grow">{page.path}</span>
					<span class="bold">{page.count}</span>
				</div>
			</li>
		{/each}
	</ol>
</div>
