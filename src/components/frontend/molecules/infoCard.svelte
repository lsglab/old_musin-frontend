<script>
	import Card from '../atoms/Card.svelte';
	import Flex from '../atoms/Flex.svelte';

	export let shadow = true;

	export let header;
	export let subHeader;
	export let content;
</script>

<Card shadow="{shadow}">
	<div slot="header">
		<Flex>
			<div>
				<h4>{header}</h4>
				<p>{subHeader}</p>
			</div>
		</Flex>
	</div>
	<div slot="body">
		{@html content}
	</div>
</Card>
