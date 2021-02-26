<script>
	import { onMount } from 'svelte';

	import Flex from '../components/atoms/Flex.svelte';
	import Section from '../components/atoms/Section.svelte';
	import Text from '../components/atoms/Text.svelte';

	let sticky = false;
	let normOffset;
	let y;
	let active = 0;
	let checked = false;

	// THIS HARDCODED LIST/OBJECT IS ONLY TEMPORARELY NECCESARY!!!!!!!!!!

	const list = [
		{
			header: 'Ausbildungsrichtungen',
			html: `<meta itemprop="inLanguage" content="de-DE"><div class="page-header"></div><div itemprop="articleBody"><p>Am LSG werden die Ausbildungsrichtung Naturwissenschaftlich-Technologisches Gymnasium (NTG) mit der Sprachenfolge Englisch-Französisch oder Englisch-Latein und die Ausbildungsrichtung Sprachliches Gymnasium (SG) mit der Sprachenfolge Englisch-Latein-Italienisch oder Englisch-Französisch-Italienisch angeboten. <a href="http://www.isb.bayern.de/schulartspezifisches/lehrplan/gymnasium/" target="_blank">(Lehrpläne)<br></a>Die (<a href="/homepage/images/schulverwaltung/unterricht/wahlzweitefremdspracheFranz.pdf" target="_blank">Französisch</a> oder <a href="/homepage/images/schulverwaltung/unterricht/WahlzweiteFremdspracheLatein.pdf" target="_blank">Latein</a>) wird in Jahrgangsstufe 5, die Ausbildungsrichtung (NTG, SG) in Jahrgangsstufe 7 gewählt.</p><br><p><strong><span>Unterschiede</span>:</strong></p><p>In den Jahrgangsstufen 6 und 7 unterscheiden sich SG und NTG am LSG in der 2. Fremdsprache <a href="/homepage/images/schulverwaltung/unterricht/WahlzweiteFremdspracheLatein.pdf" target="_blank">Latein</a> oder <a href="/homepage/images/schulverwaltung/unterricht/wahlzweitefremdspracheFranz.pdf" target="_blank">Französisch</a>. Ab Jahrgangstufe 8 beginnt die eigentliche Differenzierung der Ausbildungsrichtungen.</p><table style="" border="1"><caption>&nbsp;</caption><tbody style="text-align: left;"><tr style="text-align: left;"><td style="text-align: left;"><span><strong>Unterschied</strong> in Wochenstunden</span><br><span>(am LSG)</span></td><td style="text-align: left;"><span><strong>Sprachliches Gymnasium </strong></span><span><strong>SG</strong></span></td><td colspan="3" style="text-align: left;"><span><strong>Naturwissenschaftlich - technologisches&nbsp; Gymnasium </strong></span><span><strong>NTG</strong></span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span>Jahrgangsstufe </span><span> (JgSt.)</span></td><td style="text-align: center;"><span><strong>Italienisch</strong></span></td><td style="text-align: center;"><span><strong>Physik</strong></span><span>(Profilstunde)</span></td><td style="text-align: center;"><span><strong>Chemie</strong></span><span>(Profilstunde)</span></td><td style="text-align: center;"><span><strong>Informatik</strong></span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span><strong>8</strong></span></td><td style="text-align: center;"><span>4 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>3 Std</span></td><td style="text-align: center;"><span>./.</span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span><strong>9</strong></span></td><td style="text-align: center;"><span>4 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>2 Std</span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span><strong>10</strong></span></td><td style="text-align: center;"><span>4 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>2 Std</span></td></tr></tbody></table><p>&nbsp;</p><p><strong><span>Anmerkungen </span></strong>(Stundentafeln<span class="external"> </span><a href="http://www.gesetze-bayern.de/Content/Document/BayGSO-ANL_1" target="_blank" rel="noopener noreferrer" class="external">Mittelstufe</a> und <a href="http://www.gymnasiale-oberstufe.bayern.de/faecherwahl-und-belegung/faecherwahl-q1112/erlaeuterungen-zur-stundentafel.html" target="_blank">Oberstufe</a>):</p><br><p><strong>Informatik</strong> wird in der 6. und 7. JgSt. in beiden Ausbildungsrichtungen innerhalb des Faches Natur- und Technik jeweils einstündig unterrichtet.</p><p><strong>Phys<span>ik</span></strong><span> wird in den JgSt. 8 bis 10 in beiden Ausbildungsrichtungen zweistündig unterrichtet. Für das NTG gibt es jeweils eine zusätzliche Profilstunde mit besonderen Inhalten und Möglichkeiten zum Experimentieren.</span></p><p><span><strong>Chemie</strong> wird am SG nur in den JgSt. 9 und 10 zweistündig unterrichtet.&nbsp;Für das NTG gibt es jeweils eine zusätzliche Profilstunde mit besonderen Inhalten und Möglichkeiten zum Experimentieren.In der 8. Jg.St. ist Chemie 3-stündig.</span></p>`,
		},
		{
			header: 'Schriftliche Leisungsnachweise',
			html: `<table><tbody><tr style="vertical-align: top;"><td><span><strong>Italienisch:</strong></span></td><td><span>Als 3. Fremdsprache ist Italienisch 4-stündiges Kernfach im SG. Damit werden 4&nbsp;Schulaufgaben (große Leistungsnachweise) verlangt, wovon i.d.R. eine mündlich ist.</span></td></tr><tr style="vertical-align: top;"><td><span><strong>Physik</strong>: </span></td><td><span>Da Physik in beiden Ausbildungsrichtungen Kernfach ist, werden jeweils 2&nbsp;Schulaufgaben im Schuljahr geschrieben.</span></td></tr><tr style="vertical-align: top;"><td><span><strong>Chemie</strong>:</span></td><td><span>Ist nur im NTG Kernfach, so dass nur im NTG 2 Schulaufgaben geschrieben werden.&nbsp; Im SG werden kleine Leistungsnachweise (Stegreifaufgabe und/oder Kurzarbeit) verlangt.</span></td></tr><tr style="vertical-align: top;"><td><span><strong>Informatik: &nbsp;&nbsp; <br></strong></span></td><td><span>Informatik ist kein Kernfach, es werden kleine Leistungsnachweise (z. B. Stegreifaufgabe und/oder Kurzarbeit) verlangt.</span></td></tr></tbody></table>`,
		},
		{
			header: 'Allgemeine Hochschulreife',
			html: `<p>Innerhalb aller Ausbildungsrichtungen wird nach BayEUG Art 9 die allgemeine Hochschulreife verliehen.</p><p><a href="/homepage/images/Dokumente/ausbildungsrichtungenamlsg.pdf" target="_self">PDF zu den Ausbildungsrichtungen am LSG</a></p></div>`,
		},
	];
	// is the dom loaded or not
	let dom = false;

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
		console.log('normOffset', normOffset);
		// set the Offset the content table has when the page is first loaded
		if (normOffset == null) {
			normOffset = getOffsetTop(document.getElementById('content-table'));
		} else if (y >= normOffset && sticky === false) {
			sticky = true;
		} else if (y <= normOffset && sticky === true) {
			sticky = false;
		}
	}

	function calcReadingTime(sections) {
		let txt;
		// get whole text
		sections.forEach((ele) => {
			txt += ele.html;
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
</style>

<svelte:window
	bind:scrollY="{y}"
	on:scroll="{() => {
		scroll();
	}}" />

<Section classes="my-10">
	<div
		class="flex flex-col-reverse justify-center transition-none lg:h-80 align-center article lg:grid lg:grid-cols-2">
		<Flex justify="center" classes="w-full h-inherit">
			<img
				class="object-cover w-full h-full rounded-md shadow-equal lg:w-auto"
				src="https://www.tagesschau.de/multimedia/bilder/schule-153~_v-videowebl.jpg"
				alt="" />
		</Flex>
		<Flex justify="center" align="center" classes="w-full h-full">
			<div class="m-8 text-center">
				<h3 class="text-2xl text-heading md:text-2.5xl">Ausbildungsrichtungen am LSG</h3>
				<p class="mt-3 text-heading2">Das ist ein sub-header</p>
			</div>
		</Flex>
	</div>
</Section>
<Section classes="dashedTopBorder pb-20">
	<div class="w-full">
		<Flex justify="between" wrap="true" classes="m-auto lg:flex-nowrap">
			<!--Content table-->
			<div
			class="sticky lg:mr-4 top-0 z-10 w-full bg-white rounded-md table-transition lg:top-4 lg:p-4 lg:shadow-equal lg:m-0 lg:w-auto h-min-content {sticky ? "py-0" : "py-4"} "
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
							{#each list as title, i}
								<li
									class="my-4 lg:my-3 font-semibold list-none cursor-pointer tracking-wide
										{active !== i ? '' : 'text-blue-400 list-square'}"
									id="{i}">
									<a class = "lg:text-sm" href="article/#sect{i}" on:click="{() => {checked = false;}}">{i + 1}. {title.header}</a>
								</li>
							{/each}
						</ul>
					</Section>
				</div>
			</div>
			<!--Body of the article-->
			<div class="w-full lg:w-2/3 lg:ml-4" >
				<!--Section with reading time and article description-->
				<div class="mt-2 -mb-5">
					<Flex align="center" classes="border-b border-solid border-gray-500 pb-1">
						<svg
							class="w-5 h-5 mr-1"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 0 24 24"
							width="24"><path d="M0 0h24v24H0z" fill="none"></path>
							<path
								d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
							<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
						</svg>
						<p>{calcReadingTime(list)}</p>
					</Flex>
					<p class="text-sm text-gray-700">
						Letzte Aktualisierung am 28.10.2020
					</p>
				</div>
				<!--Build loop for the article sections-->
				{#each list as section, i}
					<div class="pt-16 m-0 art-content-sect" id="sect{i}">
						<header>
							<hr class="w-12 my-3 text-black border-t-0 border-b-2 border-black" />
							<h4 class="my-4 font-normal">{i + 1}. {section.header}</h4>
						</header>
						<Text html="{section.html}"/>
					</div>
				{/each}
			</div>
		</Flex>
	</div>
</Section>
