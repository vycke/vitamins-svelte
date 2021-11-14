<script>
	import { format } from '$lib/helpers/datetime';
	import { max } from '$lib/helpers/numbers';
	import * as Pancake from '@sveltejs/pancake';

	// size = small | medium
	export let size = 'medium';
	export let data = [];
	let className = '';
	export { className as class };
	const _max = max(data, 'count');
</script>

<div class={`chart ${className}`} data-size={size}>
	{#if data.length > 0}
		<Pancake.Chart y1={0} y2={_max} x1={data[data.length - 1].day + 0.5} x2={data[0].day - 0.5}>
			<Pancake.Grid horizontal count={size === 'small' ? 2 : 5} let:value>
				<div class="grid-line horizontal" />
				<span class="label y-label">{value}</span>
			</Pancake.Grid>

			<Pancake.Grid vertical count={size === 'small' ? 7 : 15} let:value>
				<div class="grid-line vertical" />
				<span class="label x-label">{format(data.find((d) => d.day === value).date)}</span>
			</Pancake.Grid>

			{#each data as d}
				<Pancake.Box y1={0} y2={d.count} x1={d.day - 0.5} x2={d.day + 0.5}>
					<div class="box transition-200 bg-bace hover:bg-u-bace" data-tooltip={`${d.count}`} />
				</Pancake.Box>
			{/each}
		</Pancake.Chart>
	{/if}
</div>

<style>
	.chart[data-size='medium'] {
		height: 18rem;
		padding: 2rem;
		padding-bottom: 80px;
	}

	.chart[data-size='small'] {
		height: 12rem;
		padding: 1rem;
		padding-left: 2rem;
		padding-bottom: 75px;
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
		border-top-left-radius: var(--size-000);
		border-top-right-radius: var(--size-000);
	}
</style>
