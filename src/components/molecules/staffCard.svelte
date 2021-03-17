<script>
	import Card from '../atoms/Card.svelte';
	import Flex from '../atoms/Flex.svelte';

	export let title;
	export let description = '';
	export let img;
	export let link;
	export let classes = '';
</script>

<Card classes="h-80 w-48 m-2 {link ? 'cursor-pointer' : ''} z-10 {classes}" link="{link}">
	<div slot="body" class="w-full overflow-hidden h-8/10">
		<img class="object-cover w-full h-full" src="{img}" alt="" />
	</div>
	<div slot="footer" class="h-2/10">
		<Flex align="center" classes="relative h-full bg-white rounded-tr-sm">
			<Flex justify="center" align="center" classes="h-full">
				<div class="mx-2 border-2 border-blue-400 h-7/10"></div>
			</Flex>
			<div>
				<p>{title}</p>
				<p class="text-xs">{description}</p>
			</div>
		</Flex>
	</div>
</Card>
