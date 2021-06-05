<script>
	/* eslint-disable import/first */
	import { layout } from '../../stores';
	import { onMount } from 'svelte';
	import Flex from '../../components/both/atoms/Flex.svelte';
	import Node from '../../components/cms/molecules/Node.svelte';
	import TopNav from '../../components/cms/molecules/TopNav.svelte';

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

<TopNav />
<Flex>
	<div id="site" class="w-9/12">
		<iframe id="iframe" src="/new" title="New site" class="w-full resize full-minus-nav"></iframe>
	</div>
	<div class="w-3/12 pr-2 border-l-2 border-gray-300 border-solid">
		{#if $layout !== 0}
			<Node component="{$layout}" />
		{/if}
	</div>
</Flex>
