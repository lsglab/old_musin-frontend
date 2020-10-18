<script>
	import { onMount } from 'svelte';

	import Flex from '../components/common/Flex.svelte';
	import Text from '../components/common/Text.svelte';

	let sticky = false;
	let normOffset;
	let y;
	let active = 0;
	// is the dom loaded or not
	let dom = false;

	// functions checks if the content-table is on the top or not
	function isSticky() {
		// set the Offset the content table has when the page is first loaded
		if (normOffset === undefined) {
			normOffset = document.getElementById('content-table').offsetTop;
		} else if (y >= normOffset && sticky === false) {
			sticky = true;
		} else if (y <= normOffset && sticky === true) {
			sticky = false;
		}
	}

	function setActive() {
		console.log('ACTIVE', active);
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
		console.log('NA HAALOOOO');
		if (dom) {
			isSticky();
			setActive();
		}
	}

	// THIS SCROLL HAS TO BE MADE WITH JAVA SCRIPT, OTHERWISE IT WOULDNT CORRECTLY WORK ON MOBILE
	function scrollTo(target) {
		const targetId = `sect${target}`;
		// close nav in case the user is on mobile
		document.getElementById('table-checkbox').checked = false;

		let offsetTop = document.getElementById(targetId).offsetTop;
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		// correction = 10 --> now there is a little space above the hr
		let correction = 20;
		if (vw <= 1048) {
			// if the user is mobile the height of the content-table needs to be added cause it is fixed and thus is not part of offsetTop
			correction += document.getElementById('content-table').offsetHeight;
		}

		offsetTop -= correction;
		// IMPORTANT: window.scroll is not being supported in safari
		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: offsetTop,
		});
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

<div id="article" class="mx-auto break-words">
	<Flex align="center" classes="w-full" cols="true">
		<div
			class="flex w-full flex-col-reverse justify-center align-center lg:grid lg:grid-cols-2 xl:grid
				lg:grid-cols-2 lg:w-200 xl:w-200 lg:h-100 xl:h-100">
			<Flex justify="center" classes="w-full h-full overflow-hidden">
				<img
					class="lg:h-full xl:h-full w-full object-cover"
					src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
					alt="" />
			</Flex>
			<Flex justify="center" align="center" classes="w-full h-full">
				<div class="m-8 text-center">
					<h1>LSG</h1>
					<p>Cooler shit</p>
				</div>
			</Flex>
		</div>
		<div>
			<Flex justify="center" wrap="true" classes="m-auto lg:flex-no-wrap xl:flex-no-wrap">
				<!--Das Inhaltsverzeichnis-->
				<div
					class="sticky py-5 top-0 w-full bg-white lg:p-4 xl:p-4 lg:shadow-xl px-8 lg:top-4 xl:top-4
						xl:shadow-xl lg:m-0 xl:m-0 lg:mr-4 lg:w-auto xl:w-auto xl:mr-4 lg:-mt-12 xl:-mt-12 h-min-content {sticky ? 'shadow-xl' : ''}"
					id="content-table">
					<input class="hidden" type="checkbox" id="table-checkbox" />
					<div>
						<Flex justify="between" wrap="true" align="center">
							<h5 class="truncate">INHALTSVERZEICHNIS</h5>
							<label
								class="lg:hidden xl:hidden bg-arrowIcon bg-auto h-8 w-8 bg-center cursor-pointer"
								for="table-checkbox"></label>
						</Flex>
						<ul
							class="content-table-ul pl-4 transition-300 opacity-0 lg:opacity-100 xl:opacity-100
								overflow-hidden max-h-0 lg:max-h-full xl:max-h-full">
							{#each ['test', 'test', 'test', 'test'] as title, i}
								<li
									class="my-4 font-semibold list-none cursor-pointer leading-5 tracking-wide
										lg:text-sm xl:text-sm {active !== i ? '' : 'text-blue-400 list-square'}"
									id="{i}"
									on:click="{() => {
										scrollTo(i);
									}}">
									{i + 1}. title
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
						<div class="art-content-sect m-0 mt-20 pt-10px" id="sect{i}">
							<header>
								<hr class="text-black w-12 my-3 border-black border-b-2 border-t-0" />
								<h1 class="text-3xl my-2 font-normal">{i + 1}. Leitbild des LSG</h1>
								<h2 class="text-2xl mb-2 font-normal">test</h2>
							</header>
							<Text>
								<p>
									Das Münchner Städt. Louise-Schroeder-Gymnasium (LSG) ist an seinem jetzigen Standort
									eine verhältnis­mäßig junge Schule. Das koedukativ geführte Gymnasium wurde 1983 als
									Teil des Schulzentrums an der Pfarrer-Grimm-Straße eingerichtet, wodurch dem
									gestiegenen Bedarf im Nordwesten Münchens Rechnung getragen wurde. Das LSG erfreut
									sich großen Zuspruchs und unverminderter Nachfrage - insbesondere aus dem
									Haupteinzugsbereich Allach-Untermenzing, also aus sich kontinuierlich
									weiterentwickelnden und anwachsenden Wohngebieten. Die Kombination aus einem
									naturwissenschaftlich-technologischen Zweig mit der Sprachenfolge Englisch -
									Französisch oder Englisch - Latein und einem sprachlichen Zweig mit der
									Sprachenfolge Englisch - Latein - Italienisch oder Englisch - Französisch -
									Italienisch gewährleistet ein breit gefächertes Unterrichtsangebot.
								</p>
							</Text>
						</div>
					{/each}
				</div>
			</Flex>
		</div>
	</Flex>
</div>
