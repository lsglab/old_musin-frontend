<script>
	import Flex from './Flex.svelte';

	export let column = false;
	export let xcenter = false;
	export let ycenter = false;
	export let wrap = true;

	export const blueprint = {};

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

<Flex
	wrap="{wrap}"
	justify="{getJustify(xcenter, ycenter, column)}"
	align="{getAlign(xcenter, ycenter, column)}"
	cols="{column}"
	classes="w-full h-full">
	<slot />
</Flex>
