<script>
	import Flex from './Flex.svelte';
	import Icon from './Icon.svelte';

	export let classes = '';

	export let img = '';

	export let header = '';
	export let content = '';
</script>

<Flex classes="{classes} p-4">
	<Icon classes="mt-1 mr-2" img="{img}" />
	<div>
		<p class="font-bold text-gray-500">{header}</p>
		<p class="text-xs font-bold text-gray-400">{content}</p>
	</div>
</Flex>
