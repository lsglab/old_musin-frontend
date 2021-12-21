<script>
	import { onMount } from 'svelte';
	import Img from '../../../cms/SiteEditor/Inputs/Img';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	import ArticleSection from '../atoms/ArticleSection.svelte';
	import Flex from '../atoms/Flex.svelte';
	import Section from '../atoms/Section.svelte';

	export let img = true;

	export let blueprint = {
		children: [ArticleSection],
		header: new ShortText('Titel'),
		img: new Img('https://i.stack.imgur.com/y9DpT.jpg'),
		subHeader: new ShortText('sub Header'),
	};

	export let component = false;

	let sticky = false;
	let normOffset;
	let y;
	let active = 0;
	let checked = false;

	// is the dom loaded or not
	let dom = false;
	let currentLocation = '';
	let readingTime = '';

	function getOffsetTop(ele) {
		let offsetTop = 0;

		let element = ele;

		while (element) {
			offsetTop += element.offsetTop;
			element = element.offsetParent;
		}

		return offsetTop;
	}
	// functions checks if the content-table is on the top or not
	function isSticky() {
		// set the Offset the content table has when the page is first loaded
		if (normOffset == null) {
			normOffset = getOffsetTop(document.getElementById('content-table'));
		} else if (y >= normOffset && sticky === false) {
			sticky = true;
		} else if (y <= normOffset && sticky === true) {
			sticky = false;
		}
	}

	function calcReadingTime() {
		if (!dom) return '';

		let txt = '';

		const sections = Object.values(document.getElementsByClassName('art-content-sect'));
		// get whole text
		sections.forEach((ele) => {
			txt += ele.innerHtml;
		});
		// split txt into words
		const wordCount = txt.replace(/[^\w ]/g, '').split(/\s+/).length;
		// calculate reading time (here is the average count of words used an adult is capable of reading in 1 min)
		const readingTimeInMinutes = Math.floor(wordCount / 228) + 1;
		const readingTimeAsString = `${readingTimeInMinutes} Min. Lesezeit`;

		return readingTimeAsString;
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
			const eleTop = getOffsetTop(sections[i.toString()]);
			// get offset top of next ele --> if the list reached its end, set next_top higher than own offset --> if statemnt is till true
			const nextTop =
				i !== Object.keys(sections).length - 1 ? getOffsetTop(sections[(i + 1).toString()]) : scrollTop + 1;
			// if the scroll position is between the offset of i and i + 1:
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
		// remove parameters and anchors
		currentLocation = window.location.href.split(/[?#]/)[0];
		readingTime = calcReadingTime();
	});
</script>

<style>
	#table-checkbox:checked ~ * .content-table-ul {
		max-height: 100vh;
		opacity: 1;
	}

	#table-checkbox:checked ~ * .arrow {
		transform: rotate(90deg);
	}

	.table-transition {
		transition: all 0.3s ease, padding 0s;
	}

	.mobile-sticky {
		transition: margin 0s;
	}

	.article-width {
		@apply w-full lg:w-2/3;
	}
</style>

<svelte:window
	bind:scrollY="{y}"
	on:scroll="{() => {
		scroll();
	}}" />

<Section classes="mb-10 mt-5">
	<div
		class="flex flex-col-reverse justify-center transition-none align-center article lg:grid {img ? 'lg:grid-cols-2 lg:h-80' : 'lg:grid-cols-1 h-52'}">
		<Flex justify="center" classes="w-full h-inherit {img === false ? 'hidden' : ''}">
			<img
				id="{blueprint.img.id}"
				class="object-cover w-full h-full rounded-md shadow-equal lg:w-auto"
				src="{blueprint.img.data}"
				alt="" />
		</Flex>
		<div class="{img ? 'w-auto' : 'article-width justify-self-end'}">
			<Flex justify="{img ? 'center' : 'start'}" align="center" classes="w-full h-full">
				<div class="m-8 {img ? 'text-center' : 'text-left ml-0'}">
					<h3 class="text-2xl text-heading md:text-2.5xl" id="{blueprint.header.id}">
						{blueprint.header.data}
					</h3>
					<p class="mt-3 text-heading2" id="{blueprint.subHeader.id}">{blueprint.subHeader.data}</p>
				</div>
			</Flex>
		</div>
	</div>
</Section>
<Section classes="dashedTopBorder pb-20">
	<div class="w-full">
		<Flex justify="between" wrap="true" classes="m-auto lg:flex-nowrap">
			<!--Content table-->
			<div
			class="sticky lg:mr-4 top-0 z-10 w-full bg-white rounded-md table-transition lg:max-w-1/3 lg:top-4 lg:p-4 lg:shadow-equal lg:m-0 lg:w-auto h-min-content {sticky ? "py-0" : "py-4"} "
			id="content-table">
				<input class="hidden" type="checkbox" id="table-checkbox" bind:checked="{checked}"  />
				<div class="{sticky ? "relative left-center lg:left-0 w-screen lg:w-auto mobile-sticky top-0 bg-white lg:py-0 py-2 table-transition shadow-xl lg:shadow-none" : ""}">
					<Section customStyles="{sticky ? "" : "padding: 0px"}" classes="lg:px-unset xl:px-unset 2xl:px-unset">
						<label for="table-checkbox" class="cursor-pointer">
						<Flex justify="between" wrap="true" align="center">
								<h5 class="text-lg truncate text-heading">INHALTSVERZEICHNIS</h5>
								<div
									class="w-8 h-8 bg-center bg-auto cursor-pointer arrow lg:hidden xl:hidden bg-arrowIcon"
								></div>
						</Flex>
						</label>
						<ul
							class="pl-4 overflow-hidden opacity-0 content-table-ul transition-300 lg:opacity-100 xl:opacity-100 max-h-0 lg:max-h-full xl:max-h-full">
							{#if component !== false}
								{#each component.children as child, i}
									<li
										class="my-4 lg:my-3 font-semibold list-none cursor-pointer tracking-wide
											{active !== i ? '' : 'text-blue-400 list-square'}"
										id="{i}">
										{#if child.blueprint.header !== undefined}
											<a class = "lg:text-sm" href="{currentLocation}#{child.id}" on:click="{() => {checked = false;}}">{i + 1}. {child.blueprint.header.data}</a>
										{/if}
									</li>
								{/each}
							{/if}
						</ul>
					</Section>
				</div>
			</div>
			<!--Body of the article-->
			<div class="article-width lg:ml-4" >
				<!--Section with reading time and article description-->
				<div class="mt-2 -mb-5">
					<Flex align="center" classes="border-b border-solid border-gray-500 pb-1">
						<div class="mr-1.5 material-icons">schedule</div>
						<p>{readingTime}</p>
					</Flex>
					<p class="text-sm text-gray-700">
						Letzte Aktualisierung am 28.10.2020
					</p>
				</div>
				<slot/>
			</div>
		</Flex>
	</div>
</Section>
