<script>
	import { onMount } from 'svelte';

	import Flex from '../components/common/Flex.svelte';
	import Text from '../components/common/Text.svelte';

	let sticky = false;
	let normOffset;
	let y;
	// is the dom loaded or not
	let dom = false;

	// functions checks if the content-table is on the top or not
	function isSticky() {
		if (dom) {
			// set the Offset the content table has when the page is first loaded
			if (normOffset === undefined) {
				normOffset = document.getElementById('content-table').offsetTop;
			} else if (y >= normOffset && sticky === false) {
				sticky = true;
			} else if (y <= normOffset && sticky === true) {
				sticky = false;
			}
		}
	}

	onMount(() => {
		dom = true;
	});
</script>

<style>
	#article {
		hyphens: auto;
		max-width: 1466px;
		overflow-anchor: none;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.header-sect {
		display: grid;
		height: 25rem;
		grid-template-columns: 25rem 25rem;
		justify-content: center;
		align-items: center;
	}

	.img-wrapper {
		display: flex;
		justify-content: center;

		/* overflow hidden --> das überstehende vom bild wird weggeschnitten */
		width: 100%;
		max-width: max-content;
		height: 100%;

		/* übernimm die höhe vom parent element,width so breit wie möglich --> so breit wie die grid */
	}

	/* --------------------styling of the article content-------------------- */

	.art-content-sect {
		margin: 0;
		margin-top: 5rem;
	}

	.art-content-sect hr {
		width: 50px;
		color: black;
		margin: 10px 0;
		border: 1px solid black;
	}

	.art-content-sect header > h1 {
		font-size: 1.9rem;
		font-weight: 500;
		margin: 10px 0;
	}

	.art-content-sect header > h2 {
		font-size: 1.5rem;
		margin: 20px 0;
		font-weight: 400;
	}

	/* --------------styling of the article ends here------------------- */

	/* --------------styling of the content table---------------------- */

	@media (max-width: 1104px) {
		#article {
			padding-right: 0;
			padding-left: 0;
		}

		.header-sect {
			display: flex;
			flex-direction: column-reverse;
		}

		#table-checkbox:checked ~ * .content-table-ul {
			max-height: 1000px;
			opacity: 1;
		}

		#table-checkbox:checked ~ * label {
			transform: rotate(90deg);
		}
	}
</style>

<svelte:window
	bind:scrollY="{y}"
	on:scroll="{() => {
		isSticky();
	}}" />

<div id="article" class="px-8 mx-auto break-words">
	<div class="header-sect">
		<div class="img-wrapper">
			<img src="https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-Jungle-Image.jpg" alt="" />
		</div>
		<div class="m-8 text-center">
			<h1>LSG</h1>
			<p>Cooler shit</p>
		</div>
	</div>
	<div>
		<Flex justify="center" wrap="true" classes="m-auto lg:flex-no-wrap xl:flex-no-wrap">
			<!--Das Inhaltsverzeichnis-->
			<div class="sticky py-5 top-0 w-full bg-white lg:p-4 xl:p-4 lg:shadow-xl px-8 lg:top-4 xl:top-4 xl:shadow-xl lg:m-0 xl:m-0 lg:mr-4 lg:w-auto xl:w-auto xl:mr-4 lg:-mt-12 xl:-mt-12 h-min-content {sticky ? "shadow-xl" : ""}" id = "content-table">
				<input class="hidden" type="checkbox" id = "table-checkbox">
				<div>
					<Flex justify="between" wrap="true" align="center">
						<h5>INHALTSVERZEICHNIS</h5>
						<label class="md:hidden lg:hidden"for="table-checkbox">Click</label>
					</Flex>
					<ul class = "content-table-ul">
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
						<li>test</li>
					</ul>
				</div>
			</div>
			<!--Der Body vom Artikel-->
			<div class = "max-w-2xl px-8">
				<!--section mit der reading time und eventuell einer Artikel beschreibung-->
				<div class="my-5">
					<Flex align="center" classes="border-b border-solid border-gray-500">
						<img src="../../clock.svg" alt="">
						<p>10min</p>
					</Flex>
					<p class = "text-gray-700">Wrote by me</p>
				</div>
				<!--Biespiel einer Artikel section-->

					<div class="art-content-sect">
						<header>
							<hr>
							<h1>Cooler tiel</h1>
							<h2>Section</h2>
						</header>
						<Text><p>Das Münchner Städt. Louise-Schroeder-Gymnasium (LSG) ist an seinem jetzigen Standort eine verhältnis­mäßig junge Schule. Das koedukativ geführte Gymnasium wurde 1983 als Teil des Schulzentrums an der Pfarrer-Grimm-Straße eingerichtet, wodurch dem gestiegenen Bedarf im Nordwesten Münchens Rechnung getragen wurde. Das LSG erfreut sich großen Zuspruchs und unverminderter Nachfrage - insbesondere aus dem Haupteinzugsbereich Allach-Untermenzing, also aus sich kontinuierlich weiterentwickelnden und anwachsenden Wohngebieten. Die Kombination aus einem naturwissenschaftlich-technologischen Zweig mit der Sprachenfolge Englisch - Französisch oder Englisch - Latein und einem sprachlichen Zweig mit der Sprachenfolge Englisch - Latein - Italienisch oder Englisch - Französisch - Italienisch gewährleistet ein breit gefächertes Unterrichtsangebot.</p></Text>
					</div>

			</div>
		</Flex>
	</div>
</div>
