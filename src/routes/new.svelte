<script context="module">
	import { componentConfig, components } from '../cms/SiteEditor/Components';
	import { errorRequest } from '../Utils/requests';
	import { files, page, pageTable } from '../stores';
	import { onMount, tick } from 'svelte';
	import Component from '../components/cms/organisms/Component.svelte';
	import ComponentClass from '../cms/SiteEditor/Component';
	import DisplayComponent from '../components/cms/atoms/DisplayComponent.svelte';
	import EditComponent from '../cms/SiteEditor/EditComponent';
</script>

<script>
	let initialized = false;
	let reload = false;
	let layout;

	let site = false;

	let singleComponent = false;

	let customComponents = [];

	async function fetchData() {
		const res = await errorRequest(
			`${process.globals.apiUrl}/files?_norelations=true&public=true`,
			'get',
			{},
			true,
			window
		);

		if (!res.error) {
			files.set(res.data.files);
		}
	}

	function sendLayoutUpdate() {
		const event = new CustomEvent('c_update', { detail: layout });
		window.parent.document.dispatchEvent(event);
	}

	function siteLoaded() {
		const event = new CustomEvent('site_loaded', {});
		window.parent.document.dispatchEvent(event);
	}
	function iframeMounted(mode) {
		const mountEvent = new CustomEvent(`${mode}_iframe_mounted`, { detail: {} });
		window.parent.document.dispatchEvent(mountEvent);
	}

	function newEmptyEditComponent() {
		return new EditComponent(
			components.Empty,
			undefined,
			componentConfig.find((comp) => comp.component === 'Empty').name
		);
	}

	onMount(async () => {
		layout = undefined;
		initialized = false;

		const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());

		if (params.component !== undefined) {
			singleComponent = components[params.component];
			iframeMounted('component');
			return;
		}

		if (params.blueprint) {
			window.document.addEventListener(
				'create_blueprint',
				(e) => {
					customComponents = e.detail.customComponents;
					if (e.detail.createNew === false) {
						site = e.detail.blueprint;
						return;
					}

					site = new ComponentClass().createFromData(
						e.detail.blueprint,
						components,
						customComponents,
						componentConfig,
						null
					);
				},
				false
			);

			iframeMounted('blueprint');
			return;
		}

		window.document.addEventListener(
			'c_created',
			(e) => {
				layout = e.detail;
			},
			false
		);

		window.document.addEventListener(
			'c_resume',
			(e) => {
				const blueprint = e.detail.blueprint;
				layout = new EditComponent().createFromData(
					blueprint,
					components,
					customComponents,
					componentConfig,
					null
				);
				initialized = true;
			},
			false
		);
		window.document.addEventListener(
			'c_base_new',
			() => {
				const component = customComponents.find((comp) => comp.name === 'Base');

				if (component === undefined) {
					layout = newEmptyEditComponent();
					initialized = true;
					return;
				}

				const id = component.id;

				const base = {
					children: [],
					id,
					isCustomComponent: true,
				};

				layout = new EditComponent().createFromData(base, components, customComponents, componentConfig, null);
				initialized = true;
			},
			false
		);

		window.document.addEventListener(
			'c_new',
			() => {
				layout = newEmptyEditComponent();
				initialized = true;
			},
			false
		);

		window.document.addEventListener(
			'c_fetched',
			async (e) => {
				pageTable.set(e.detail.table);
				page.set(e.detail.page);
				customComponents = e.detail.customComponents;
			},
			false
		);

		window.document.addEventListener(
			'c_reload',
			async () => {
				reload = true;
				await tick();
				reload = false;
			},
			false
		);

		fetchData();

		const compEvent = new CustomEvent('components', { detail: components });
		window.parent.document.dispatchEvent(compEvent);

		iframeMounted('default');
	});
</script>

{#if initialized === true && singleComponent === false}
	{#if reload === false}
		<Component bind:component="{layout}" on:update="{sendLayoutUpdate}" />
	{/if}
{:else if singleComponent !== false}
	<div class="m-4 pointer-events-none">
		<svelte:component this="{singleComponent}" />
	</div>
{:else if site !== false}
	<DisplayComponent component="{site}" on:loaded="{siteLoaded}" />
{/if}
