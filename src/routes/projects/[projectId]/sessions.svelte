<script context="module">
	import { combineCalls } from '$lib/helpers/api';
	import { dayTabs, DEFAULT_DAYS } from '$lib/constants';

	export async function load({ fetch, stuff }) {
		const { project } = stuff;
		const result = await combineCalls({
			sessions: fetch(`/api/projects/${project.id}/sessions/grouped?days=${DEFAULT_DAYS}`),
			visits: fetch(`/api/projects/${project.id}/visits/stats?days=${DEFAULT_DAYS}`)
		});

		if (result.error) return result;
		return { props: { project, ...result.props } };
	}
</script>

<script>
	import BarChart from '$lib/components/BarChart.svelte';
	import Card from '$lib/components/layout/cards/Card.svelte';
	import { sum } from '$lib/helpers/numbers';
	import Tabbar from '$lib/components/layout/Tabbar.svelte';
	import Spinner from '$lib/components/layout/Spinner.svelte';
	import { concurrent } from '$lib/helpers/async';

	export let sessions, visits, project, loading;
	let days = DEFAULT_DAYS;

	async function refetch() {
		const result = await concurrent({
			sessions: fetch(`/api/projects/${project.id}/sessions/grouped?days=${days}`),
			visits: fetch(`/api/projects/${project.id}/visits/stats?days=${days}`)
		});
		sessions = await result.sessions.json();
		visits = await result.visits.json();
	}

	function onSelect(event) {
		days = event.detail.value;
		loading = refetch();
	}
</script>

{#await loading}
	<Spinner class="self-center | my-2" />
{/await}
<div class="center center-w-3 center-g-0 | flow flow-g-00 | mt-0">
	<Card
		class="center-exception maxw-4 mb-2"
		hover={false}
		title="Sessions last 30 days"
		subtitle={sum(sessions, 'count')}
	>
		<BarChart data={sessions || []} />
		<Tabbar slot="top-right" items={dayTabs} selected={days} on:select={onSelect} />
	</Card>

	<h2 class="text-1 uppercase">Top 20 visited pages of the last 30 days</h2>
	<span class="mb-0 | text-gray-300 uppercase">Total: {sum(visits, 'count')}</span>
	<ol>
		{#each visits as page}
			<li>
				<div class="flex-row items-center | px-0">
					<span class="flex-grow | break-word">{page.path}</span>
					<span class="bold">{page.count}</span>
				</div>
			</li>
		{/each}
	</ol>
</div>
