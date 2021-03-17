<script>
	import Button from '../atoms/Button.svelte';
	import Card from '../atoms/Card.svelte';
	import Flex from '../atoms/Flex.svelte';

	export let title;
	export let description = '';
	export let bio = '';
	export let img;
	export let classes = '';

	let collapsed = false;

	function click() {
		collapsed = !collapsed;
	}
</script>

<style>
	.collapsed {
		overflow: visible !important;
		max-height: 500vh;
	}
</style>

<Card classes="w-full lg:w-3/4 mt-10 p-5 pt-3 z-10 {classes}">
	<div slot="body" class="w-full overflow-hidden h-4/10">
		<Flex classes="md:flex-row flex-col">
			<img
				class="object-cover max-w-50 md:max-w-full mx-auto mb-4 md:w-3/12 h-40 mt-2.5 rounded-sm"
				src="{img}"
				alt="" />
			<div class="w-full h-full sm:px-5 md:w-9/12 card-body">
				<div class="h-20">
					<h3 class="text-heading">{title}</h3>
					<p class="mt-1 text-xs font-bold uppercase text-heading2">{description}</p>
				</div>
				<p class="overflow-hidden text-xs leading-6 text-gray-600 max-h-40" class:collapsed>
					{@html bio}
				</p>
				<Button
					classes="h-8 lg:h-7 mt-5 md:w-20"
					buttonText="{collapsed ? 'Weniger' : 'Mehr'}"
					buttonFunction="{click}" />
			</div>
		</Flex>
	</div>
</Card>
