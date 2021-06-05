<script>
	/* eslint-disable import/first */

	import { fade } from 'svelte/transition';
	import { layout } from '../../../stores';
	import ChooseComponent from '../organisms/ChooseComponent.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Input from '../../both/molecules/Input.svelte';

	export let component;

	console.log('component', component);

	let propsOpen = true;
	let open = true;

	function toggleOpen() {
		open = !open;
	}

	function togglePropsOpen() {
		propsOpen = !propsOpen;
	}

	function openTrue() {
		open = true;
	}

	function triggerUpdate() {
		console.log('props', JSON.parse(JSON.stringify(component.props)));
		// trigger a layout reload
		const newList = $layout;
		layout.set(newList);
	}

	function deleteComponent() {
		component.parent.deleteChild(component);
		triggerUpdate();
	}

	function isBoolean(ele) {
		if (typeof ele === 'boolean') {
			return true;
		}
		if (ele === 'false' || ele === 'true') {
			return true;
		}
		return false;
	}

	function getType(ele) {
		if (isBoolean(ele)) {
			return 'radio';
		}
		return 'text';
	}

	function blurUpdate(prop) {
		if (getType(prop) === 'text') triggerUpdate();
	}

	function inputUpdate(prop) {
		if (getType(prop) === 'radio') triggerUpdate();
	}
</script>

<style lang="scss">
	.rotate {
		transform: rotate(90deg);
	}

	.icon-dimens {
		@apply mx-2 text-base;
	}

	$curve-width: 15px;

	.curve {
		width: $curve-width;
		margin-left: -15px;
		@apply mr-4;
	}

	.content {
		width: calc(100% - #{$curve-width});
	}
</style>

<div
	class="mx-1 pl-2 py-3 {component.parent !== undefined ? 'border-l-4 border-gray-300 border-solid' : ''} cursor-pointer">
	<Flex>
		{#if component.parent !== undefined}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="self-start text-gray-300 fill-current curve"
				viewBox="0 0 21.08 21"><g>
					<path
						d="M2.58 2.5q-1.2 16 16 16"
						class="stroke-current"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="5"></path>
				</g></svg>
		{/if}
		<div class="{component.parent !== undefined ? 'content' : 'w-full'}">
			<div class="{propsOpen ? 'mb-2' : ''}">
				<Flex align="center" justify="between">
					<p class="text-xs font-bold" on:click="{toggleOpen}">
						{component.component === undefined || component.component === null ? 'Loading...' : component.component.name}
					</p>
					<Flex align="center">
						<div class="icon-dimens">
							{#if Object.keys(component.props).length > 0}
								<div
									on:click="{togglePropsOpen}"
									class="{propsOpen ? 'rotate' : ''} block duration-100 cursor-pointer material-icons">
									chevron_right
								</div>
							{/if}
						</div>
						<div class="w-5 h-5 icon-dimens">
							{#if component.slot}
								<ChooseComponent parent="{component}" on:click="{openTrue}" />
							{/if}
						</div>
						<div style="margin-right: 0;" class="icon-dimens">
							<div on:click="{deleteComponent}" class="material-icons text-cmsErrorRed">
								{#if component.parent !== undefined}delete{/if}
							</div>
						</div>
					</Flex>
				</Flex>
			</div>
			{#if propsOpen}
				<div transition:fade="{{ duration: 100 }}">
					{#each Object.keys(component.props) as key}
						<Input
							on:blur="{() => {
								blurUpdate(component.props[key]);
							}}"
							on:input="{() => {
								inputUpdate(component.props[key]);
							}}"
							id="{key}"
							justify="between"
							classes="w-full my-1"
							inputClasses="{getType(component.props[key]) === 'radio' ? 'h-3 w-6' : 'h-7'}"
							labelPos="left"
							bind:value="{component.props[key]}"
							type="{getType(component.props[key])}">
							{key}
						</Input>
					{/each}
				</div>
			{/if}
		</div>
	</Flex>
	{#if open}
		{#each component.children as child}
			<svelte:self component="{child}" />
		{/each}
	{/if}
</div>
