<script>
	/* eslint-disable import/first */
	import { afterUpdate, tick } from 'svelte';
	import { layout, page, pageTable } from '../../../stores';
	import Flex from '../../both/atoms/Flex.svelte';
	// import ShortText from './shortText.svelte';

	export let component;

	const hasBlueprint = Object.keys(component.blueprint).length > 0;

	let rendered;
	const uuid = Date.now();
	const slotId = `slot-${uuid}`;

	let triggeredUpdate = false;

	function getPropertyIndex(name) {
		return rendered.$$.props[name];
	}

	function getProperty(name) {
		return rendered.$$.ctx[getPropertyIndex(name)];
	}

	function triggerLayoutUpdate() {
		const newList = $layout;
		layout.set(newList);
		triggeredUpdate = true;
	}

	function loopBlueprints(callback) {
		const blueprint = getProperty('blueprint');
		if (blueprint !== undefined) {
			Object.keys(blueprint).forEach((key) => {
				if (key !== 'children') callback(blueprint, key);
			});
		}
	}

	function triggerComponentUpdate() {
		rendered.$set({ blueprint: getProperty('blueprint') });
	}

	function insertFields() {
		loopBlueprints((blueprint, key) => {
			if ($pageTable.getColumnPermission($page.id, 'blueprint')) {
				blueprint[key].prepareInput(document, triggerComponentUpdate);
			}
		});
	}

	function advancedFields() {
		const props = {};

		const keys = Object.keys(rendered.$$.props);

		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];

			if (key === 'blueprint') {
				component.props = props;
				return;
			}

			const value = getProperty(key);

			props[key] = value;
		}
	}

	function checkForSlot() {
		const slot = document.getElementById(slotId);
		if (slot !== null) {
			component.slot = true;
		}
	}

	function childrenTypes() {
		const blueprint = getProperty('blueprint');
		if (blueprint && blueprint.children) {
			blueprint.children.forEach((child) => {
				component.childrenTypes.push(child.name);
			});
		}
	}

	function setBlueprint() {
		component.blueprint = getProperty('blueprint');
	}

	async function build() {
		if (rendered === undefined) {
			// wait for dom actions to finish, otherwise wont be created when buildComponent is called
			await tick();
			advancedFields();
			checkForSlot();
			await tick();
			childrenTypes();
			setBlueprint();
			triggerLayoutUpdate();
		}
	}

	$: build(component);

	afterUpdate(() => {
		if (triggeredUpdate === true) {
			insertFields();
			triggeredUpdate = false;
		}
	});
</script>

<!--This each/else statement is as of the 7.4.2021 the onliest way to fix an error (Outros undefined)
	that occurs when deleting a component
	See: https://github.com/sveltejs/svelte/issues/3165
-->
{#each [...[]] as _}
	<div></div>
{:else}
	{#if hasBlueprint}
		<svelte:component blueprint={component.blueprint} this="{component.component}" bind:this="{rendered}" {...component.props}>
			{#each component.children as child}
				<svelte:self component="{child}" />
			{:else}
				<div id="{slotId}" class="w-full p-10 h-60">
					<Flex classes="w-full border-4 border-gray-300 border-dashed rounded-lg h-full" justify="center" align="center">
						<div class="text-gray-300 material-icons" style="font-size: 5rem;">add</div>
					</Flex>
				</div>
			{/each}
		</svelte:component>
	{:else}
		<svelte:component this="{component.component}" bind:this="{rendered}" {...component.props}>
			{#each component.children as child}
				<svelte:self component="{child}" />
			{:else}
				<div id="{slotId}" class="w-full p-10 h-60">
					<Flex classes="w-full border-4 border-gray-300 border-dashed rounded-lg h-full" justify="center" align="center">
						<div class="text-gray-300 material-icons" style="font-size: 5rem;">add</div>
					</Flex>
				</div>
			{/each}
		</svelte:component>
	{/if}
{/each}
