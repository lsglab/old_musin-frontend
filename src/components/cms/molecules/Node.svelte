<script>
	/* eslint-disable no-param-reassign */
	import { chooseComponent, currentNodeActive, currentNodeDetached, currentNodeHovered } from '../../../stores';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Flex from '../atoms/Flex.svelte';
	import Input from '../inputs/Input.svelte';

	const dispatch = createEventDispatcher();

	export let component;
	export let table;
	export let page;

	const Id = component.id;
	const headerId = `node-header-${Id}`;
	const bodyId = `node-body-${Id}`;

	let propsOpen = true;
	let close = false;

	let detached = false;

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

	let divheight;
	let active = false;
	let hovered = false;

	function getSelfTopParentNode(node) {
		const split = node.id.split('node-body-');
		const currentNodeBaseId = split[split.length - 1];
		const currentNodeBase = document.getElementById(currentNodeBaseId);
		return currentNodeBase;
	}

	function dropeNode(currentActive, currentHovered) {
		// get the nodes by id
		const activeNode = document.getElementById(currentActive);
		const hoveredNode = document.getElementById(currentHovered);

		let position = 0;

		// if hovered is active the position is always 0
		if (currentHovered !== currentActive) {
			// get the top node
			const activeParent = getSelfTopParentNode(activeNode);
			const hoveredParent = getSelfTopParentNode(hoveredNode);
			// get all children of the active node and delete the detached node if it is in the list
			let children = Object.values(activeParent.querySelectorAll('.comp-node'));
			children = children.filter((ele) => ele.id !== Id);
			// get the index of the hovered node, it deteremines the position
			const index = children.findIndex((ele) => ele.id === hoveredParent.id);
			position = index + 1;
		}

		// dispatch event to notify all nodes that the component was dropped
		const event = new CustomEvent('node_dropped', { detail: { component, position } });
		document.dispatchEvent(event);
	}

	function nodeDropped() {
		document.addEventListener('node_dropped', (e) => {
			if (active === true) {
				const comp = e.detail.component;
				const position = e.detail.position;

				comp.parent.deleteChild(comp);
				// set new parent and insert the component at the right position
				comp.parent = parentComponent;
				parentComponent.children.splice(position, 0, comp);
				// event that component was inserted
			}
		});
	}

	let mouseY = 0;
	let mouseX = 0;
	let elmntY = 0;
	let elmntX = 0;
	let currentActive;
	let currentHovered;

	function closeDragElement() {
		// stop moving when mouse button is released:
		// drop the node
		dropeNode(currentActive, currentHovered);
		// reset events
		document.onmouseup = null;
		document.onmousemove = null;
		// reset vars
		detached = false;
		close = false;
		// reset stores
		currentNodeHovered.set(null);
		currentNodeActive.set(null);
		currentNodeDetached.set(null);
		// reset actives
		currentActive = undefined;
		currentHovered = undefined;
		triggerUpdate();
	}

	function checkOutOfBounds(x, y) {
		// get elmnt
		const elmnt = document.getElementById(Id);
		// get the container --> the relative element
		const container = document.getElementById('node-container').getBoundingClientRect();
		// check if it is out of bounds and if it is set the new x / y position
		if (y + elmnt.offsetHeight > container.height) {
			y = container.height - elmnt.offsetHeight;
		}
		if (y < 0) {
			y = 0;
		}
		if (x < 0) {
			x = 0;
		}
		if (x + elmnt.offsetWidth > container.right) {
			x = container.right - elmnt.offsetWidth;
		}

		return { x, y };
	}

	function getNodeHovered(elmnt) {
		// get all bodies of the nodes
		let nodes = Object.values(document.getElementsByClassName('comp-node-body'));
		// get boundclientrect of the detached rect
		const elmntRect = elmnt.getBoundingClientRect();

		const topPadding = 50;
		const leftPadding = 8;

		// function returns difference between the top of the detached element and bottom of ele.
		// if the difference is negative --> make it a very high positive
		function getBottomTopDifference(ele) {
			const diff = ele.getBoundingClientRect().bottom + topPadding - elmntRect.top;
			if (diff < 0) {
				return 10000 - diff;
			}

			return diff;
		}

		// remove detached node from the list
		nodes = nodes.filter((e) => e.id !== bodyId);
		// sort nodes by bottomTop difference
		nodes = nodes.sort((a, b) => (getBottomTopDifference(a) > getBottomTopDifference(b) ? 1 : -1));

		const currentNode = nodes[0];

		if (currentNode === undefined) {
			return;
		}

		// default is -> active Node = currentNode
		let activeNode = currentNode;
		// if the detached node is positioned right to the hovered Element it becomes the active Element
		// --> active element is always the new parent
		if (elmntRect.left + leftPadding < currentNode.getBoundingClientRect().left) {
			const currentNodeBase = getSelfTopParentNode(currentNode);
			activeNode = document.getElementById(`node-body-${currentNodeBase.parentNode.id}`);
			// if no parent is found reset to default
			if (activeNode === null) {
				activeNode = currentNode;
			}
		}
		// if the nodes have change set the new values;
		if (currentNode.id !== currentHovered) {
			currentNodeHovered.set(currentNode);
			currentHovered = currentNode.id;
		}

		if (activeNode.id !== currentActive) {
			currentNodeActive.set(activeNode);
			currentActive = activeNode.id;
		}
	}

	function elementDrag(e) {
		const elmnt = document.getElementById(Id);

		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:

		elmntY = elmnt.offsetTop - (mouseY - e.clientY);
		elmntX = elmnt.offsetLeft - (mouseX - e.clientX);
		mouseY = e.clientY;
		mouseX = e.clientX;

		const check = checkOutOfBounds(elmntX, elmntY);
		elmntX = check.x;
		elmntY = check.y;
		// set the element's new position:
		elmnt.style.top = `${elmntY}px`;
		elmnt.style.left = `${elmntX}px`;

		getNodeHovered(elmnt);
	}

	function dragMouseDown(e) {
		const elmnt = document.getElementById(Id);

		elmnt.style.top = 'auto';
		elmnt.style.left = 'auto';
		detached = true;
		close = true;

		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		mouseY = e.clientY;
		mouseX = e.clientX;

		currentNodeDetached.set({ component, node: elmnt });

		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	let detachedNode = null;

	currentNodeDetached.subscribe((ele) => {
		detachedNode = ele;
	});

	function validChild() {
		if (detachedNode === null) return false;
		return component.childrenTypes.length > 0
			? component.childrenTypes.includes(detachedNode.component.component.name)
			: true;
	}

	currentNodeHovered.subscribe((ele) => {
		if (ele !== undefined && ele !== null && ele.id === bodyId && validChild()) {
			hovered = true;
			divheight = detachedNode.node.offsetHeight;
		} else {
			hovered = false;
		}
	});

	currentNodeActive.subscribe((ele) => {
		if (ele !== undefined && ele !== null && ele.id === bodyId && component.slot && validChild()) {
			active = true;
		} else {
			active = false;
		}
	});

	onMount(() => {
		active = false;
		hovered = false;
		nodeDropped();
	});
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

	.active {
		@apply border-cmsBtnColor border-b-2;
	}

	.drag-drop-transition {
		@apply duration-75 transition-all;
	}
</style>

<div
	id="{Id}"
	class="pl-2 {component.belongsToCustomComponent ? 'hidden' : ''}
	{detached ? 'absolute z-20 shadow-cms-equal-sm cursor-move px-2 bg-white' : ''}
	py-3
	{component.parent !== undefined ? 'border-l-4 border-gray-300 border-solid' : ''} comp-node cursor-pointer"
	style="transition: top 0s;">
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
		<div class="{component.parent !== undefined ? 'content' : 'w-full'} comp-node-body" id="{bodyId}" class:active>
			<div class="{propsOpen ? 'mb-2' : ''}">
				<Flex align="center" justify="between">
					{#if component.component !== undefined && component.component !== null}
						<p class="text-xs font-bold" id="{headerId}" on:mousedown="{dragMouseDown}">{component.name}</p>
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
	{#if close === false}
		<div class="w-full bg-white drag-drop-transition" style="height: {hovered && active ? divheight : 0}px;"></div>
		{#each parentComponent.children as child}
			<svelte:self bind:component="{child}" table="{table}" page="{page}" on:update="{triggerUpdate}" />
		{/each}
	{/if}
</div>
<div
	class="w-full bg-white drag-drop-transition"
	style="height: {hovered && active === false ? divheight : 0}px;"></div>
