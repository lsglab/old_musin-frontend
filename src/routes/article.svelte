<script>
	import { onMount } from 'svelte';

	import Flex from '../components/common/Flex.svelte';
	import Text from '../components/common/Text.svelte';

	let sticky = false;
	let normOffset;
	let y;
	let active = 0;
	let checked = false;
	// is the dom loaded or not
	let dom = false;
	// functions checks if the content-table is on the top or not
	function isSticky() {
		// set the Offset the content table has when the page is first loaded
		if (normOffset == null) {
			normOffset = document.getElementById('content-table').offsetTop;
		} else if (y >= normOffset && sticky === false) {
			sticky = true;
		} else if (y <= normOffset && sticky === true) {
			sticky = false;
		}
	}

	function setActive() {
		let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		const sections = document.getElementsByClassName('art-content-sect');
		// get height of viewport
		const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

		// add 1/4 vh to scrollTop thereby the top is no longer the reference
		scrollTop += vh / 4;

		// loop through art-content-sections
		for (let i = 0; i < Object.keys(sections).length; i += 1) {
			// get offset top of ele
			const eleTop = sections[i.toString()].offsetTop;
			// get offset top of next ele --> if the list reached its end, set next_top higher than own offset --> if statemnt is till true
			const nextTop =
				i !== Object.keys(sections).length - 1 ? sections[(i + 1).toString()].offsetTop : scrollTop + 1;
			// wenn die momentane position zwischen dem offset von i und i + 1 ist:
			if (scrollTop > eleTop && scrollTop < nextTop) {
				// set active equal to i
				active = i;
				return;
			}
		}
	}

	function scroll() {
		if (dom) {
			isSticky();
			setActive();
		}
	}

	onMount(() => {
		dom = true;
	});
</script>

<style>
	#article {
		hyphens: auto;
		overflow-anchor: none;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	#table-checkbox:checked ~ * .content-table-ul {
		max-height: 100vh;
		opacity: 1;
	}

	#table-checkbox:checked ~ * label {
		transform: rotate(90deg);
	}
</style>

<svelte:window
	bind:scrollY="{y}"
	on:scroll="{() => {
		scroll();
	}}" />

<div id="article" class="pb-20 mx-auto break-words">
	<Flex align="center" classes="w-full" cols="true">
		<div
			class="flex flex-col-reverse justify-center w-full transition-none align-center lg:grid lg:grid-cols-2 xl:grid lg:w-200 xl:w-200 lg:h-100 xl:h-100">
			<Flex justify="center" classes="w-full h-full overflow-hidden">
				<img
					class="object-cover w-full lg:h-full xl:h-full"
					src="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
					alt="" />
			</Flex>
			<Flex justify="center" align="center" classes="w-full h-full">
				<div class="m-8 text-center">
					<h1>LSG</h1>
					<p>Cooler [EXPLETIVE DELETED]</p>
				</div>
			</Flex>
		</div>
		<div class="w-full">
			<Flex justify="center" wrap="true" classes="m-auto lg:flex-no-wrap xl:flex-no-wrap">
				<!--Das Inhaltsverzeichnis-->
				<div
					class="sticky top-0 w-full px-8 py-5 transition-none bg-white lg:p-4 xl:p-4 lg:shadow-xl lg:top-4 xl:top-4 xl:shadow-xl lg:m-0 xl:m-0 lg:mr-4 lg:w-auto xl:w-auto xl:mr-4 lg:-mt-12 xl:-mt-12 h-min-content"
					id="content-table">
					<input class="hidden" type="checkbox" id="table-checkbox" bind:checked="{checked}"  />
					<div class="{sticky ? "lg:relative xl:relative  px-8 py-5 transition-none absolute top-0 shadow-xl lg:p-0 xl:p-0 lg:shadow-none w-full xl:shadow-none left-0 bg-white" : ""}">
						<Flex justify="between" wrap="true" align="center">
							<h5 class="truncate">INHALTSVERZEICHNIS</h5>
							<label
								class="w-8 h-8 bg-center bg-auto cursor-pointer lg:hidden xl:hidden bg-arrowIcon"
								for="table-checkbox"></label>
						</Flex>
						<ul
							class="pl-4 overflow-hidden opacity-0 content-table-ul transition-300 lg:opacity-100 xl:opacity-100 max-h-0 lg:max-h-full xl:max-h-full">
							{#each ['test', 'test', 'test', 'test'] as title, i}
								<li
									class="my-4 font-semibold list-none cursor-pointer leading-5 tracking-wide
										lg:text-sm xl:text-sm {active !== i ? '' : 'text-blue-400 list-square'}"
									id="{i}">
									<a href="article/#sect{i}" on:click="{() => {checked = false;}}">{i + 1}. {title}</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
				<!--Der Body vom Artikel-->
				<div class="max-w-2xl px-8">
					<!--section mit der reading time und eventuell einer Artikel beschreibung-->
					<div class="my-5">
						<Flex align="center" classes="border-b border-solid border-gray-500 pb-2 mb-1">
							<svg
								class="mr-1"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 0 24 24"
								width="24"><path d="M0 0h24v24H0z" fill="none"></path>
								<path
									d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
								<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
							</svg>
							<p>10min</p>
						</Flex>
						<p class="text-gray-700">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Id earum officia nemo ratione ullam
							odio non aperiam inventore porro nostrum facere, culpa fugiat soluta commodi quo est tenetur
							atque praesentium?
						</p>
					</div>
					<!--Biespiel einer Artikel section-->
					{#each [0, 0, 0, 0] as Section, i}
						<div class="pt-20 m-0 art-content-sect pt-10px" id="sect{i}">
							<header>
								<hr class="w-12 my-3 text-black border-t-0 border-b-2 border-black" />
								<h1 class="my-2 text-3xl font-normal">{i + 1}. Leitbild des LSG</h1>
								<h2 class="mb-2 text-2xl font-normal">test</h2>
							</header>
							<Text html="as Münchner Städt. Louise-Schroeder-Gymnasium (LSG) ist an seinem jetzigen Standort
									eine verhältnis­mäßig junge Schule. Das koedukativ geführte Gymnasium wurde 1983 als
									Teil des Schulzentrums an der Pfarrer-Grimm-Straße eingerichtet, wodurch dem
									gestiegenen Bedarf im Nordwesten Münchens Rechnung getragen wurde. Das LSG erfreut
									sich großen Zuspruchs und unverminderter Nachfrage - insbesondere aus dem
									Haupteinzugsbereich Allach-Untermenzing, also aus sich kontinuierlich
									weiterentwickelnden und anwachsenden Wohngebieten. Die Kombination aus einem
									naturwissenschaftlich-technologischen Zweig mit der Sprachenfolge Englisch -
									Französisch oder Englisch - Latein und einem sprachlichen Zweig mit der
									Sprachenfolge Englisch - Latein - Italienisch oder Englisch - Französisch -
									Italienisch gewährleistet ein breit gefächertes Unterrichtsangebot."/>
						</div>
					{/each}
				</div>
			</Flex>
		</div>
	</Flex>
</div>
