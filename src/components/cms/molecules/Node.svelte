<script>
	import { chooseComponent } from '../../../stores';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Flex from '../../both/atoms/Flex.svelte';
	import Input from '../inputs/Input.svelte';

	const dispatch = createEventDispatcher();

	export let component;
	export let table;
	export let page;

	let propsOpen = true;
	let open = true;

	let parentComponent;

	function getParent() {
		if (component.isCustomComponent) {
			const comp = component.searchForComponent('Slot');
			parentComponent = comp;
			return;
		}

		parentComponent = component;
	}

	// the component that acts as a parent for other components. This is usually the same as the component

	function toggleOpen() {
		open = !open;
	}

	function togglePropsOpen() {
		propsOpen = !propsOpen;
	}

	function triggerUpdate() {
		dispatch('update', {});
	}

	function triggerChooseComponent() {
		const data = {
			parent: parentComponent,
		};

		chooseComponent.set(data);
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

	$: getParent(component);
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
	class="pl-2 {component.belongsToCustomComponent ? 'hidden' : ''} py-3 {component.parent !== undefined ? 'border-l-4 border-gray-300 border-solid' : ''} cursor-pointer">
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
					{#if component.component !== undefined && component.component !== null}
						<p class="text-xs font-bold" on:click="{toggleOpen}">
							{component.isCustomComponent ? component.customComponent.name : component.component.name}
						</p>
					{/if}
					<Flex align="center">
						<div class="icon-dimens">
							{#if Object.keys(component.props).length > 0 && !component.isCustomComponent}
								<div
									on:click="{togglePropsOpen}"
									class="{propsOpen ? 'rotate' : ''} block duration-100 cursor-pointer material-icons">
									chevron_right
								</div>
							{/if}
						</div>
						<div class="w-5 h-5 icon-dimens">
							{#if (!component.isCustomComponent && component.slot && table.getColumnPermission(page.id, 'blueprint')) || (component.isCustomComponent && component.customComponent.slot === true)}
								<div on:click="{triggerChooseComponent}" class="w-full h-full">
									<Flex
										justify="center"
										align="center"
										classes="w-full h-full text-center text-white rounded-full cursor-pointer bg-cmsBtnColor">
										<div class="text-white material-icons">add</div>
									</Flex>
								</div>
							{/if}
						</div>
						<div style="margin-right: 0;" class="icon-dimens">
							{#if table.getColumnPermission(page.id, 'blueprint') && component.parent !== null}
								<div on:click="{deleteComponent}" class="material-icons text-cmsErrorRed">
									{#if component.parent !== undefined}delete{/if}
								</div>
							{/if}
						</div>
					</Flex>
				</Flex>
			</div>
			{#if propsOpen}
				<div transition:fade="{{ duration: 100 }}">
					{#each Object.keys(component.props) as key}
						<Input
							on:blur="{triggerUpdate}"
							id="{key}"
							readonly="{table.getReadOnly(page.id, 'blueprint')}"
							justify="between"
							classes="w-full my-1"
							labelClasses="min-w-max"
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
		{#each parentComponent.children as child}
			<svelte:self bind:component="{child}" table="{table}" page="{page}" on:update="{triggerUpdate}" />
		{/each}
	{/if}
</div>
