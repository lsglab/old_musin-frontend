<script>
	import Button from '../atoms/Button.svelte';
	import Card from '../atoms/Card.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import Img from '../../../cms/SiteEditor/Inputs/Img';
	import LongText from '../../../cms/SiteEditor/Inputs/LongText';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	// blueprint for the component
	export const blueprint = {
		bio: new LongText('Biographie der Person'),
		description: new ShortText('Beschreibung der Person'),
		img: new Img('http://aeda.gov.gh/wp-content/uploads/2016/11/placeholder-person.jpg'),
		title: new ShortText('Titel'),
	};

	export let editing = false;
	// additional classes for card styling
	export let classes = '';
	// data
	let collapsed = false;

	function click() {
		collapsed = !collapsed;
	}
</script>

<style>
	.collapsed {
		overflow: visible !important;
		max-height: 500vh;
	}
</style>

<Card classes="w-full lg:w-3/4 my-10 p-5 pt-3 z-10 {classes}">
	<div slot="body" class="w-full overflow-hidden h-4/10">
		<Flex classes="md:flex-row flex-col">
			<img
				class="object-cover max-w-50 md:max-w-full mx-auto mb-4 md:w-3/12 h-40 mt-2.5 rounded-sm"
				alt=""
				id="{blueprint.img.id}"
				src="{blueprint.img.data}" />
			<div class="w-full h-full sm:px-5 md:w-9/12 card-body">
				<div class="h-20">
					<h3 class="text-heading" id="{blueprint.title.id}">{blueprint.title.data}</h3>
					<p class="mt-1 text-xs font-bold uppercase text-heading2" id="{blueprint.description.id}">
						{blueprint.description.data}
					</p>
				</div>
				<div
					id="{blueprint.bio.id}"
					class="overflow-hidden text-xs leading-6 text-gray-600 {!editing ? 'max-h-40' : ''}"
					class:collapsed>
					{blueprint.bio.data}
				</div>
				<Button classes="h-8 lg:h-7 mt-5 md:w-20" buttonFunction="{click}">
					{collapsed ? 'Weniger' : 'Mehr'}
				</Button>
			</div>
		</Flex>
	</div>
</Card>
