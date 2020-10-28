<script>
	import { onMount } from 'svelte';

	import Flex from '../components/common/Flex.svelte';
	import Text from '../components/common/Text.svelte';

	let sticky = false;
	let normOffset;
	let y;
	let active = 0;
	let checked = false;

	// THIS HARDCODED LIST/OBJECT IS ONLY TEMPORARELY NECCESARY!!!!!!!!!!

	const list = [
		{
			header: 'Ausbildungsrichtungen',
			html: `<meta itemprop="inLanguage" content="de-DE"><div class="page-header"></div><div itemprop="articleBody"><p>Am LSG werden die Ausbildungsrichtung Naturwissenschaftlich-Technologisches Gymnasium (NTG) mit der Sprachenfolge Englisch-Französisch oder Englisch-Latein und die Ausbildungsrichtung Sprachliches Gymnasium (SG) mit der Sprachenfolge Englisch-Latein-Italienisch oder Englisch-Französisch-Italienisch angeboten. <a href="http://www.isb.bayern.de/schulartspezifisches/lehrplan/gymnasium/" target="_blank">(Lehrpläne)<br></a>Die (<a href="/homepage/images/schulverwaltung/unterricht/wahlzweitefremdspracheFranz.pdf" target="_blank">Französisch</a> oder <a href="/homepage/images/schulverwaltung/unterricht/WahlzweiteFremdspracheLatein.pdf" target="_blank">Latein</a>) wird in Jahrgangsstufe 5, die Ausbildungsrichtung (NTG, SG) in Jahrgangsstufe 7 gewählt.</p><br><p><strong><span>Unterschiede</span>:</strong></p><p>In den Jahrgangsstufen 6 und 7 unterscheiden sich SG und NTG am LSG in der 2. Fremdsprache <a href="/homepage/images/schulverwaltung/unterricht/WahlzweiteFremdspracheLatein.pdf" target="_blank">Latein</a> oder <a href="/homepage/images/schulverwaltung/unterricht/wahlzweitefremdspracheFranz.pdf" target="_blank">Französisch</a>. Ab Jahrgangstufe 8 beginnt die eigentliche Differenzierung der Ausbildungsrichtungen.</p><table style="" border="1"><caption>&nbsp;</caption><tbody style="text-align: left;"><tr style="text-align: left;"><td style="text-align: left;"><span><strong>Unterschied</strong> in Wochenstunden</span><br><span>(am LSG)</span></td><td style="text-align: left;"><span><strong>Sprachliches Gymnasium </strong></span><span><strong>SG</strong></span></td><td colspan="3" style="text-align: left;"><span><strong>Naturwissenschaftlich - technologisches&nbsp; Gymnasium </strong></span><span><strong>NTG</strong></span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span>Jahrgangsstufe </span><span> (JgSt.)</span></td><td style="text-align: center;"><span><strong>Italienisch</strong></span></td><td style="text-align: center;"><span><strong>Physik</strong></span><span>(Profilstunde)</span></td><td style="text-align: center;"><span><strong>Chemie</strong></span><span>(Profilstunde)</span></td><td style="text-align: center;"><span><strong>Informatik</strong></span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span><strong>8</strong></span></td><td style="text-align: center;"><span>4 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>3 Std</span></td><td style="text-align: center;"><span>./.</span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span><strong>9</strong></span></td><td style="text-align: center;"><span>4 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>2 Std</span></td></tr><tr style="text-align: left;"><td style="text-align: center;"><span><strong>10</strong></span></td><td style="text-align: center;"><span>4 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>1 Std</span></td><td style="text-align: center;"><span>2 Std</span></td></tr></tbody></table><p>&nbsp;</p><p><strong><span>Anmerkungen </span></strong>(Stundentafeln<span class="external"> </span><a href="http://www.gesetze-bayern.de/Content/Document/BayGSO-ANL_1" target="_blank" rel="noopener noreferrer" class="external">Mittelstufe</a> und <a href="http://www.gymnasiale-oberstufe.bayern.de/faecherwahl-und-belegung/faecherwahl-q1112/erlaeuterungen-zur-stundentafel.html" target="_blank">Oberstufe</a>):</p><p><strong>Informatik</strong> wird in der 6. und 7. JgSt. in beiden Ausbildungsrichtungen innerhalb des Faches Natur- und Technik jeweils einstündig unterrichtet.</p><p><strong>Phys<span>ik</span></strong><span> wird in den JgSt. 8 bis 10 in beiden Ausbildungsrichtungen zweistündig unterrichtet. Für das NTG gibt es jeweils eine zusätzliche Profilstunde mit besonderen Inhalten und Möglichkeiten zum Experimentieren.</span></p><p><span><strong>Chemie</strong> wird am SG nur in den JgSt. 9 und 10 zweistündig unterrichtet.&nbsp;Für das NTG gibt es jeweils eine zusätzliche Profilstunde mit besonderen Inhalten und Möglichkeiten zum Experimentieren.In der 8. Jg.St. ist Chemie 3-stündig.</span></p>`,
		},
		{
			header: 'Schriftliche Leisungsnachweise',
			html: `<table><tbody><tr style="vertical-align: top;"><td><span style="font-size: 11pt;"><strong>Italienisch:</strong></span></td><td><span style="font-size: 11pt;">Als 3. Fremdsprache ist Italienisch 4-stündiges Kernfach im SG. Damit werden 4&nbsp;Schulaufgaben (große Leistungsnachweise) verlangt, wovon i.d.R. eine mündlich ist.</span></td></tr><tr style="vertical-align: top;"><td><span style="font-size: 11pt;"><strong>Physik</strong>: </span></td><td><span style="font-size: 11pt;">Da Physik in beiden Ausbildungsrichtungen Kernfach ist, werden jeweils 2&nbsp;Schulaufgaben im Schuljahr geschrieben.</span></td></tr><tr style="vertical-align: top;"><td><span style="font-size: 11pt;"><strong>Chemie</strong>:</span></td><td><span style="font-size: 11pt;">Ist nur im NTG Kernfach, so dass nur im NTG 2 Schulaufgaben geschrieben werden.&nbsp; Im SG werden kleine Leistungsnachweise (Stegreifaufgabe und/oder Kurzarbeit) verlangt.</span></td></tr><tr style="vertical-align: top;"><td><span style="font-size: 11pt;"><strong>Informatik: &nbsp;&nbsp; <br></strong></span></td><td><span style="font-size: 11pt;">Informatik ist kein Kernfach, es werden kleine Leistungsnachweise (z. B. Stegreifaufgabe und/oder Kurzarbeit) verlangt.</span></td></tr></tbody></table>`,
		},
		{
			header: 'Allgemeine Hochschulreife',
			html: `<p>Innerhalb aller Ausbildungsrichtungen wird nach BayEUG Art 9 die allgemeine Hochschulreife verliehen.</p><p><a href="/homepage/images/Dokumente/ausbildungsrichtungenamlsg.pdf" target="_self">PDF zu den Ausbildungsrichtungen am LSG</a></p></div>`,
		},
	];
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
					<h3>Ausbildungsrichtungen am LSG</h3>
					<p></p>
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
							{#each list as title, i}
								<li
									class="my-4 font-semibold list-none cursor-pointer leading-5 tracking-wide
										lg:text-sm xl:text-sm {active !== i ? '' : 'text-blue-400 list-square'}"
									id="{i}">
									<a href="article/#sect{i}" on:click="{() => {checked = false;}}">{i + 1}. {title.header}</a>
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
							Letzte Aktualisierung am 28.10.2020
						</p>
					</div>
					<!--Biespiel einer Artikel section-->
					{#each list as Section, i}
						<div class="pt-20 m-0 lg:pt-0 xl:pt-0 lg:mt-16 xl:mt-16 art-content-sect pt-10px" id="sect{i}">
							<header>
								<hr class="w-12 my-3 text-black border-t-0 border-b-2 border-black" />
								<h1 class="my-2 text-3xl font-normal">{i + 1}. {Section.header}</h1>
								<h2 class="mb-2 text-2xl font-normal"> </h2>
							</header>
							<Text html="{Section.html}"/>
						</div>
					{/each}
				</div>
			</Flex>
		</div>
	</Flex>
</div>
