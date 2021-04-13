<script>
	/* eslint-disable import/first */

	import { fade } from 'svelte/transition';
	import { layout } from '../../stores';
	import ChooseComponent from './ChooseComponent.svelte';
	import Flex from '../atoms/Flex.svelte';

	export let component;

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
</script>

<style lang="scss">
	.switch > .slider::before {
		width: 45%;
		height: 90%;
		transform: translateY(-50%);
		content: '';
		border-radius: 50%;
		top: 50%;
		left: 5%;
		@apply duration-100 bg-white absolute;
	}

	.switch > input:checked + .slider {
		@apply bg-btnBlue;
	}

	.switch > input:focus + .slider {
		box-shadow: 0 0 1px #2196f3;
	}

	.switch > input:checked + .slider::before {
		-webkit-transform: translate(100%, -50%);
		-ms-transform: translate(100%, -50%);
		transform: translate(100%, -50%);
	}

	.rotate {
		transform: rotate(90deg);
	}

	.icon-dimens {
		@apply h-5 w-5 mx-2;
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
									class="{propsOpen ? 'rotate' : ''} block duration-100 bg-center bg-no-repeat bg-cover cursor-pointer w-inherit h-inherit icon-dimes bg-arrowIcon"></div>
							{/if}
						</div>
						<div class="icon-dimens">
							{#if component.slot}
								<ChooseComponent parent="{component}" on:click="{openTrue}" />
							{/if}
						</div>
						<div class="icon-dimens" style="margin-right: 0;">
							{#if component.parent !== undefined}
								<svg
									on:click="{deleteComponent}"
									xmlns="http://www.w3.org/2000/svg"
									height="100%"
									viewBox="0 0 24 24"
									width="100%"
									class="text-red-600 fill-current"><path d="M0 0h24v24H0V0z" fill="none"></path>
									<path
										d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>
							{/if}
						</div>
					</Flex>
				</Flex>
			</div>
			{#if propsOpen}
				<div transition:fade="{{ duration: 100 }}">
					{#each Object.keys(component.props) as key}
						<Flex justify="between" align="center">
							<p class="font-bold text-gray-500 uppercase" style="font-size: 0.6rem;">{key}</p>
							{#if isBoolean(component.props[key])}
								<label class="relative inline-block w-6 h-3 cursor-pointer switch">
									<input
										type="checkbox"
										bind:checked="{component.props[key]}"
										on:change="{triggerUpdate}"
										class="w-0 h-0 opacity-0 pointer-events-none" />
									<span class="absolute inset-0 bg-gray-300 rounded-2xl slider transition-100"></span>
								</label>
							{:else}
								<input
									on:blur="{triggerUpdate}"
									type="text"
									class="text-right text-xss"
									bind:value="{component.props[key]}"
									placeholder="special value" />
							{/if}
						</Flex>
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
