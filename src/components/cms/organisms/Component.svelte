<script>
	/* eslint-disable import/first */
	import { afterUpdate, createEventDispatcher, tick } from 'svelte';
	import { page, pageTable } from '../../../stores';
	import Flex from '../../both/atoms/Flex.svelte';

	const dispatch = createEventDispatcher();

	// import ShortText from './shortText.svelte';

	export let component;
	export let saving = false;

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

	function dispatchLayoutUpdate() {
		dispatch('update', {});
	}

	function triggerLayoutUpdate() {
		dispatchLayoutUpdate();
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

	function componentUpdate() {
		dispatch('component_update');
	}

	function triggerComponentUpdate() {
		rendered.$set({ blueprint: getProperty('blueprint') });
		component = component;
		componentUpdate();
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
		<svelte:component component={component} blueprint={component.blueprint} this="{component.component}" bind:this="{rendered}" {...component.props}>
			{#each component.children as child}
				<svelte:self saving={saving} on:component_update={triggerComponentUpdate} bind:component="{child}" on:update={dispatchLayoutUpdate} />
			{/each}
			{#if saving === false && component.children.length === 0}
				<div id="{slotId}" class="w-full p-10 h-60">
					<Flex classes="w-full border-4 border-gray-300 border-dashed rounded-lg h-full" justify="center" align="center">
						<div class="text-gray-300 material-icons" style="font-size: 5rem;">add</div>
					</Flex>
				</div>
			{/if}
		</svelte:component>
	{:else}
		<svelte:component component={component} this="{component.component}" bind:this="{rendered}" {...component.props}>
			{#each component.children as child}
				<svelte:self on:component_update={triggerComponentUpdate}  saving={saving} bind:component="{child}" on:update={dispatchLayoutUpdate} />
			{/each}
			{#if saving === false && component.children.length === 0}
				<div id="{slotId}" class="w-full p-10 h-60">
					<Flex classes="w-full border-4 border-gray-300 border-dashed rounded-lg h-full" justify="center" align="center">
						<div class="text-gray-300 material-icons" style="font-size: 5rem;">add</div>
					</Flex>
				</div>
			{/if}
		</svelte:component>
	{/if}
{/each}
