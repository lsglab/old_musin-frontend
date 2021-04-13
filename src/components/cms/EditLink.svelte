<script>
	import { createEventDispatcher } from 'svelte';
	import Flex from '../atoms/Flex.svelte';

	export let placeholder;
	export let id;
	export let href = '';

	const dispatch = createEventDispatcher();

	export let visible = false;

	function close() {
		dispatch('close', {
			href: false,
		});
		visible = false;
	}

	function save() {
		dispatch('save', {
			href,
			placeholder,
		});
		visible = false;
	}
</script>

<div
	id="{id}"
	class="absolute rounded-sm cursor-default z-50 p-4 origin-center bg-white border border-gray-400 border-solid shadow-md top-1/2 left-1/2 pos {visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
	style="transform: translate(-50%,-50%);">
	<Flex>
		<input class="mx-2" type="text" bind:value="{placeholder}" />
		<input class="mx-2" type="url" bind:value="{href}" placeholder="Url des Links" />
		<svg
			on:click="{save}"
			xmlns="http://www.w3.org/2000/svg"
			class="w-5 h-5 mx-2 text-green-600 cursor-pointer fill-current "
			viewBox="0 0 24 24"
			fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path>
			<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>

		<svg
			on:click="{close}"
			xmlns="http://www.w3.org/2000/svg"
			class="w-5 h-5 mx-2 text-red-600 cursor-pointer fill-current"
			viewBox="0 0 24 24"
			fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path>
			<path
				d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>
	</Flex>
</div>
