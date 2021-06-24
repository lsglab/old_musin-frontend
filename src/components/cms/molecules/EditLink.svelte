<script context="module">
	import { createEventDispatcher, onMount } from 'svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Input from '../../both/molecules/Input.svelte';
</script>

<script>
	export let data;
	export let id;
	export let href = '';
	export let document;

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
			data,
			href,
		});
		visible = false;
	}

	function checkBoundaries() {
		const ele = document.getElementById(id);
		const boundaries = ele.getBoundingClientRect();
		let translate = 0;
		const padding = 10;
		const transDirection = [];

		const windowHeight = document.documentElement.scrollHeight;
		const windowWidth = document.documentElement.scrollWidth;

		if (boundaries.x < 0) {
			transDirection.push('left');
			translate = Math.abs(boundaries.x) + padding;
		}
		if (boundaries.x > windowWidth) {
			transDirection.push('right');
			translate = boundaries.x - windowWidth + padding;
		}
		if (boundaries.y < 0) {
			transDirection.push('top');
			translate = Math.abs(boundaries.y) + padding;
		}
		if (boundaries.y > windowHeight) {
			transDirection.push('bottom');
			translate = boundaries.y - windowHeight + padding;
		}

		transDirection.forEach((direction) => {
			ele.style[direction] = `${translate}px`;
		});

		if (transDirection.length === 0) {
			ele.style.left = '50%';
			ele.style.top = '50%';
		}
	}

	onMount(() => {
		checkBoundaries();
	});
</script>

<style>
	.material-icons {
		@apply cursor-pointer ml-1;
	}
</style>

<div
	id="{id}"
	class="absolute rounded-sm z-50 cursor-default p-2 origin-center bg-white border border-gray-400 border-solid shadow-md pos {visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
	style="transform: translate(-50%,-50%)">
	<Flex align="center">
		<Input id="text-{id}" classes="mx-2" type="text" bind:value="{data}" />
		<Input id="link-{id}" classes="mx-2" type="url" bind:value="{href}" placeholder="Url des Links" />
		<div on:click="{save}" class="material-icons text-cmsSuccessGreen">done</div>
		<div on:click="{close}" class="material-icons text-cmsErrorRed">close</div>
	</Flex>
</div>
