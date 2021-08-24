<script>
	import Flex from '../components/both/atoms/Flex.svelte';

	const column = true;
	const xcenter = true;
	const ycenter = false;
	const wrap = true;

	function getAlign() {
		if (column) {
			return xcenter ? 'center' : 'start';
		}

		return ycenter ? 'center' : 'start';
	}

	function getJustify() {
		if (column) {
			return ycenter ? 'center' : 'between';
		}

		return xcenter ? 'center' : 'between';
	}
</script>

<style>
	div {
		@apply h-10 w-10;
	}
</style>

<Flex wrap="{wrap}" justify="{getJustify()}" align="{getAlign()}" cols="{column}" classes="w-full h-full">
	<div class="bg-blue-400"></div>
	<div class="bg-red-400"></div>
	<div class="bg-yellow-400"></div>
	<div class="bg-green-400"></div>
</Flex>
