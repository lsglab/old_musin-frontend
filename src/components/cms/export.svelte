<script>
	import { componentConfig, components } from '../../cms/SiteEditor/Components';
	import Component from '../../cms/SiteEditor/Component';
	import DisplayComponent from './atoms/DisplayComponent.svelte';

	export let customComponents;

	export let data;

	const layout = new Component().createFromData(data, components, customComponents, componentConfig, null);
</script>

<DisplayComponent component="{layout}" />
