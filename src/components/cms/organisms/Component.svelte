<script>
	/* eslint-disable import/first */
	import { afterUpdate, tick } from 'svelte';
	import { layout } from '../../../stores';
	import Flex from '../../both/atoms/Flex.svelte';
	// import ShortText from './shortText.svelte';

	export let component;

	let rendered;
	const uuid = Date.now();
	const slotId = `slot-${uuid}`;

	function getPropertyIndex(name) {
		return rendered.$$.props[name];
	}

	function getProperty(name) {
		return rendered.$$.ctx[getPropertyIndex(name)];
	}

	function loopBlueprints(callback) {
		const blueprint = getProperty('blueprint');
		if (blueprint !== undefined) {
			Object.keys(blueprint).forEach((key) => {
				callback(blueprint, key);
			});
		}
	}

	function insertFields() {
		console.log('inserting fields');
		loopBlueprints((blueprint, key) => {
			blueprint[key].prepareInput(document);
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

	let triggeredUpdate = false;

	function triggerUpdate() {
		const newList = $layout;
		layout.set(newList);
		triggeredUpdate = true;
	}

	async function build() {
		if (rendered === undefined) {
			// wait for dom actions to finish, otherwise wont be created when buildComponent is called
			await tick();
			advancedFields();
			checkForSlot();
			await tick();
			triggerUpdate();
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
	<svelte:component this="{component.component}" bind:this="{rendered}" {...component.props}>
		{#each component.children as child}
			<svelte:self component="{child}" />
		{:else}
			<div id="{slotId}" class="w-full p-10 h-60">
				<Flex classes="w-full border-4 border-gray-300 border-dashed rounded-lg h-full" justify="center" align="center">
					<svg style="width: 10%" class="text-gray-300 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 512 512" xml:space="preserve">
						<g>
							<g>
								<polygon points="0,0 0,173.419 49.548,173.419 49.548,49.548 173.419,49.548 173.419,0 		"/>
							</g>
						</g>
						<g>
							<g>
								<polygon points="338.581,0 338.581,49.548 462.452,49.548 462.452,173.419 512,173.419 512,0 		"/>
							</g>
						</g>
						<g>
							<g>
								<polygon points="462.452,338.581 462.452,462.452 338.581,462.452 338.581,512 512,512 512,338.581 		"/>
							</g>
						</g>
						<g>
							<g>
								<polygon points="49.548,462.452 49.548,338.581 0,338.581 0,512 173.419,512 173.419,462.452 		"/>
							</g>
						</g>
						<g>
							<g>
								<polygon points="280.774,231.226 280.774,140.387 231.226,140.387 231.226,231.226 140.387,231.226 140.387,280.774
									231.226,280.774 231.226,371.613 280.774,371.613 280.774,280.774 371.613,280.774 371.613,231.226 		"/>
							</g>
						</g>
					</svg>
				</Flex>
			</div>
		{/each}
	</svelte:component>
{/each}
