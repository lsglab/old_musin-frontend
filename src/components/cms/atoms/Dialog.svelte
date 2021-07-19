<script>
	import { fade, fly } from 'svelte/transition';
	import Flex from '../../both/atoms/Flex.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let duration = 300;

	export let classes = '';

	function close() {
		dispatch('close', {});
	}
</script>

<style lang="scss">
	.card {
		box-shadow: rgba(0, 0, 0, 0.05) 0 2px 4px;

		> div {
			@apply px-4 py-2;
		}
	}

	.background {
		background-color: rgba(0, 0, 0, 0.15);
	}
</style>

<div class="fixed top-0 left-0 z-30 w-screen h-screen background" transition:fade="{{ duration: duration / 3 }}">
	<div class="{classes} max-w-2xl mx-auto mt-16 bg-white card" transition:fly="{{ duration, y: 100 }}">
		<div class="bg-gray-100">
			<Flex justify="between" align="center">
				<slot name="header" />
				<div class="text-gray-400 cursor-pointer material-icons" on:click="{close}">close</div>
			</Flex>
		</div>
		<div class="bg-white body">
			<slot />
		</div>
		<div class="bg-gray-200">
			<slot name="footer" />
		</div>
	</div>
</div>
