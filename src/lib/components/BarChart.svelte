<script>
	import { getMax } from '$lib/helpers/numbers';
	import * as Pancake from '@sveltejs/pancake';

	export let data = [];
	let className = '';
	export { className as class };
	const max = getMax(data, 'count');
</script>

<div class={`chart ${className}`}>
	<Pancake.Chart y1={0} y2={max} x1={data[data.length - 1].day + 0.5} x2={data[0].day - 0.5}>
		<Pancake.Grid horizontal count={5} let:value>
			<div class="grid-line horizontal" />
			<span class="label y-label">{value}</span>
		</Pancake.Grid>

		<Pancake.Grid vertical count={10} let:value>
			<div class="grid-line vertical" />
			<span class="label x-label">{data.find((d) => d.day === value).date}</span>
		</Pancake.Grid>

		{#each data as d}
			<Pancake.Box y1={0} y2={d.count} x1={d.day - 0.5} x2={d.day + 0.5}>
				<div class="box" data-tooltip={`${d.count}`} />
			</Pancake.Box>
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 20rem;
		padding: 2rem;
		padding-bottom: 80px;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: 100%;
		border-top: 1px dashed var(--color-gray-400);
	}

	.grid-line.vertical {
		height: calc(100% + 3em);
		top: -3em;
	}

	.label {
		font-size: var(--size-00);
		color: var(--gray-200);
		text-align: right;
	}

	.x-label {
		position: absolute;
		width: 75px;
		left: -5.25em;
		bottom: -50px;
		transform: rotate(-45deg);
	}

	.y-label {
		position: absolute;
		width: 4em;
		bottom: -0.65rem;
		left: -60px;
	}

	.box {
		position: absolute;
		top: 0;
		left: 2px;
		width: calc(100% - 4px);
		height: 100%;
		border-radius: 2px;
		background-color: var(--color-bace);
	}
</style>
