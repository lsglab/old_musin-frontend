<script>
	import { onMount } from 'svelte';
	import Flex from '../components/common/Flex.svelte';
	import Text from '../components/common/Text.svelte';
	import Accordion from '../components/Accordion.svelte';
	import GalleryImage from '../components/common/GalleryImage.svelte';
	import Modal from '../components/common/Modal.svelte';

	export let title;

	//variables for modal creation
	let modal;

	//For testing purposes only!
	const textList = {
		artText1: {
			header: 'Louise 2020 ist da - der Kunstkalender des LSG!',
			html: `<p>Herzlichen Dank den vielen großzügigen Spendern und Sponsoren, die uns zum Teil schon seit Jahren unterstützen. 
				Dank auch an das Team der Fachschaft Kunst und des Fördervereins, das so viel Zeit, Ideen und Energie in das Projekt investiert hat. 
				Und danke natürlich an alle Künstlerinnen und Künstler, die sich sicher auch freuen, dass ihre Arbeiten hier so wirkungsvoll einem großen Publikum präsentiert werden. 
				Der gesamte Reinerlös dieses Kalenders kommt wie immer der Fachschaft Kunst zugute, für viele neue kreative und fantasievolle Projekte an unserer Schule.
				Wie in den vergangenen Jahren ist "Louise 2020" in der Stadtbücherei Allach/Untermenzing, im Café "Zimt und Zucker" , beim Vollkorner Biomarkt in Allach, 
				im Musikforum Blutenburg e.V. sowie bei den Freunden des LSG e.V. und bei diversen Schulveranstaltungen für 10 € erhältlich.</p>`,
		},
	};

	//For testing purposes only!
	const accordionList = [
		{
			title: 'Kunstkalender 2020',
			id: 'art1',
			images: [
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description',
				},
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description 2',
				},
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description 3',
				},
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description 4',
				},
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description 6',
				},
			],
		},
		{
			title: 'Kunstkalender 2019',
			id: 'art2',
			images: [
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description 7',
				},
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description 8',
				},
				{
					src: 'https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg',
					description: 'Test description 9',
				},
			],
		},
	];

	function createModal() {
		if (modal !== undefined) {
			//assign image
			//(dis-)apply css classes
			console.log(modal.GalleryImage);
		}
	}

	onMount(() => {
		modal = document.getElementById('modal');
	});
</script>

<style lang="scss">
	h4 {
		@apply text-center text-lg;
	}
	.banner {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.art-text-content {
		text-align: justify;
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div id="artcollection" class="m-4">
	<div
		class="banner h-56 rounded-md shadow-md"
		style="background-image: url('https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg')"></div>
	<h4 align="center" class="my-2">{title} | {process.globals.title}</h4>
	<div class="art-text-content pt-10px" id="{textList.artText1.id}">
		<header>
			<h3 class="my-4 font-normal">{textList.artText1.header}</h3>
		</header>
		<Text html="{textList.artText1.html}" />
	</div>
	<Modal id="modal" title="Test content" footer="Test content">
		<GalleryImage description="" image="" />
	</Modal>
	<!--Generation of accordion sections-->
	{#each accordionList as flex}
	<Accordion title={flex.title} id={flex.id}>
		<Flex wrap="true" justify="center" align="center">
			{#each flex.images as image}
			<div on:click={() => createModal()}>
				<GalleryImage description={image.description} image={image.src}></GalleryImage>
			</div>
			{/each}	
		</Flex>
	</Accordion>
	{/each}
	<Accordion title="Kunstkalender 2018" id="art3">
		<Flex wrap="true" justify="center" align="center">
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
		</Flex>
	</Accordion>
	<Accordion title="Kunstkalender 2017" id="art4">
		<Flex wrap="true" justify="center" align="center">
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
		</Flex>
	</Accordion>
	<Accordion title="Kunstkalender 2016" id="art5">
		<Flex wrap="true" justify="center" align="center">
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
			<GalleryImage image="https://lsg.musin.de/homepage/images/LSG/Schulleben/kunstprojekte/Louise2020.jpg" />
		</Flex>
	</Accordion>
</div>
