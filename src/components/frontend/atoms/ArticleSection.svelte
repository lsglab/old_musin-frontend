<script>
	import LongText from '../../../cms/SiteEditor/Inputs/LongText';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	export let blueprint = {
		content: new LongText('Text...'),
		header: new ShortText('Titel der Section'),
	};

	export let component;
</script>

<div class="pt-16 m-0 art-content-sect" id="{component !== undefined ? `${component.id}` : ''}">
	<header>
		<hr class="w-12 my-3 text-black border-t-0 border-b-2 border-black" />
		<h4 class="my-4 font-normal" id="{blueprint.header.id}">{blueprint.header.data}</h4>
	</header>
	<div id="{blueprint.content.id}">{blueprint.content.data}</div>
</div>
