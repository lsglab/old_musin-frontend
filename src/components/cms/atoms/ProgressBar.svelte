<script context="module">
	import { linear } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const progress = tweened(0, {
		duration: 50,
		easing: linear,
	});
</script>

<script>
	export let value = 0;
	export let color = 'cmsBtnColor';
	// must be rem
	export let height = 5;
	// can be anything
	export let width = 'w-full';

	function valueChanged() {
		progress.set(value);
	}

	$: valueChanged(value);
</script>

<style lang="scss">
	.box {
		// Correct by 2 pixel because of border width
		transform: translate(calc(100% - 2px), -50%);
	}

	.text {
		// center the text
		transform: translateX(-50%);
	}
</style>

<div class="flex {width} mt-{height} flex-row h-{height} m-6 rounded-full progress-bar shadow-cms-equal">
	<div
		style="width: {$progress}%;"
		class="slider rounded-l-full relative {value === 100 ? 'rounded-r-full' : ''} bg-{color}">
		<div class="absolute bottom-0 right-0 box">
			<div class="text-{color} text text-xs font-bold whitespace-nowrap">{Math.round(value)}%</div>
			<div class="border-l-2 h-{Math.round(height / 2)} border-{color} border-solid text-{color}"></div>
		</div>
	</div>
	<div style="width: {100 - $progress}%"></div>
</div>
