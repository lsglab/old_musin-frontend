<script>
	/* eslint-disable import/first */
	import { layout } from '../../stores';
	import { onMount } from 'svelte';
	import Flex from '../../components/atoms/Flex.svelte';
	import Node from '../../components/cms/Node.svelte';

	let cUpdate = false;

	onMount(() => {
		window.document.addEventListener(
			'c_update',
			(e) => {
				console.log('main receiving c_updated', e.detail);
				cUpdate = true;
				layout.set(e.detail);
			},
			false
		);

		layout.subscribe((ele) => {
			if (!cUpdate) {
				console.log('main dispatching c_created', ele);
				const event = new CustomEvent('c_created', { detail: ele });
				document.getElementById('iframe').contentDocument.dispatchEvent(event);
			} else {
				cUpdate = false;
			}
		});
	});
</script>

<Flex>
	<div class="w-2/12 border-r-2 border-gray-300 border-solid"></div>
	<div id="site" class="w-7/12">
		<iframe id="iframe" src="cms/new" title="New site" class="w-full resize" style="height: 100vh"></iframe>
	</div>
	<div class="w-3/12 pr-2 border-l-2 border-gray-300 border-solid">
		{#if $layout !== 0}
			<Node component="{$layout}" recursive="{0}" />
		{/if}
	</div>
</Flex>
