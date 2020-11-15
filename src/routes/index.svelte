<!--<Hero
	header="Städtisches Louise Schroeder Gymnasium München"
	subHeader="Naturwissenschaftlich-technologisches und sprachliches Gymnasium"
	buttonText="Aktuelle Termine"
	href="#termine"
	note="Referenzschule der TU München"
	image="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
	awards="{['https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg', 'https://lsg.musin.de/homepage/images/delf.jpg', 'https://lsg.musin.de/homepage/images/cae.png', 'https://lsg.musin.de/homepage/images/cils.png']}" />
<HeroDown
	header="Aktuelle Termine"
	subHeader="Alle demnächst anstehenden Termine des Louise-Schroeder-Gynasiums"
	linkText="Zur Terminübersicht"
	href="http://example.com/"
	id="termine">
	<Calender />
</HeroDown>-->
<script>
	import { fly } from 'svelte/transition';

	export let segment;
	const dashedSegments = [undefined, 'blog'];
	const dashed = dashedSegments.includes(segment);


	// The order is important !!!
    const menus = [
      {
        name: null,
        title: "Home",
        onclick: () => { alert("Home"); }
      },
      {
      name: "theschool",
      title: "Die Schule",
      contents: [
        {
          title: "Leitbild",
          onclick: () => { alert(); }
        },
        {
          title: "Strukturdaten",
          onclick: () => { alert(); }
        },
        {
          title: "Ausbildungsrichtungen",
          onclick: () => { alert(); }
        },
        {
          title: "Mensa",
          onclick: () => { alert(); }
        },
        {
          title: "Erziehungspartnerschaft",
          onclick: () => { alert(); }
        },
        {
          title: "Schulentwicklungsplan",
          onclick: () => { alert(); }
        },
        {
          title: "Kontakt",
          onclick: () => { alert(); }
        },
      ]
    },
    {
      name: "schoolfamily",
      title: "Schulfamilie",
      contents: [
        {
          title: "Schulleitung",
          onclick: () => { alert(); }
        },
        {
          title: "Verwaltung",
          onclick: () => { alert(); }
        },
        {
          title: "Elternbeirat",
          onclick: () => { alert(); }
        },
        {
          title: "Förderverein",
          onclick: () => { alert(); }
        }
      ]
    },
    {
      name: "profiles",
      title: "Profile",
      contents: [
        {
          title: "EVA",
          onclick: () => { alert(); }
        },
        {
          title: "Informationstechnik",
          onclick: () => { alert(); }
        },
        {
          title: "Kunst",
          onclick: () => { alert(); }
        },
        {
          title: "Musik",
          onclick: () => { alert(); }
        },
        {
          title: "MINT",
          onclick: () => { alert(); }
        },
        {
          title: "Schulsanitätsdienst",
          onclick: () => { alert(); }
        },
        {
          title: "Schülerzeitung",
          onclick: () => { alert(); }
        },
        {
          title: "Sport",
          onclick: () => { alert(); }
        },
        {
          title: "Sprachen",
          onclick: () => { alert(); }
        },
        {
          title: "Theater und Literatur",
          onclick: () => { alert(); }
        },
      ]
    },
    {
      name: "consulting",
      title: "Beratung",
      contents: [
        {
          title: "Schulberatung",
          onclick: () => { alert(); }
        },
        {
          title: "Nachhilfe",
          onclick: () => { alert(); }
        },
        {
          title: "Schulpsychologie",
          onclick: () => { alert(); }
        },
        {
          title: "Unterstufe",
          onclick: () => { alert(); }
        },
        {
          title: "Mittelstufe",
          onclick: () => { alert(); }
        },
        {
          title: "Oberstufe",
          onclick: () => { alert(); }
        }
      ]
    },
    {
      name: "informations",
      title: "Informationen",
      contents: [
        {
          title: "für Eltern",
          onclick: () => { alert(); }
        },
        {
          title: "für Schüler",
          onclick: () => { alert("Schülerinfos"); }
        },
        {
          title: "für Lehrer",
          onclick: () => { alert(); }
        }
      ]
    },
    {
        name: null,
        title: "Termine",
        onclick: () => { alert("Termine"); }
    }];


	const cardPosition = { x: -200 };
	let cardVisible = false;
	let cardHeight = 0;
	let currentMenu = '';
	function menuHover(e, menu) {
		const rect = e.target.getBoundingClientRect();
		cardPosition.x = rect.left - (200 - e.target.offsetWidth) / 2;
		cardHeight = menu.contents.length * 40 + 45;
		cardVisible = true;
		currentMenu = menu.name;
	}
	let menuCard;
	function mousemove(e) {
		if (e.target.getAttribute('link-content') != null || (e.path || e.composedPath()).includes(menuCard)) {
		} else {
			cardVisible = false;
		}
	}
	function onresize(e) {
		vletrect = menuCard.getBoundingClientRect();
		if (rect.left + 200 > window.innerWidth) {
			if (!cardVisible) {
				cardPosition.x = -200;
			} else {
				cardPosition.x = window.innerWidth - 200;
			}
		}
	}
</script>

<style>
	* {
		word-break: normal;
	}
	nav {
		width: 100%;
		height: 80px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 15vw;
		position: relative;
		z-index: 990;
	}
	.dashed::before {
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		top: 80px;
		left: 0;
		background: linear-gradient(
			90deg,
			rgba(66, 71, 112, 0.09),
			rgba(66, 71, 112, 0.09) 50%,
			transparent 0,
			transparent
		);
		background-size: 8px 1px;
	}
	nav > .logo {
		margin-right: 20px;
	}
	nav > ul {
		list-style: none;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	nav > ul > li {
		padding: 15px;
		cursor: pointer;
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
	}
	nav > ul > li:last-child {
		margin-right: 0;
		padding-right: 0;
	}
	.menuCard {
		background: white;
		border-radius: 10px;
		width: 200px;
		height: 200px;
		position: absolute;
		top: 70px;
		left: -200px;
		opacity: 0;
		box-shadow: rgba(184, 194, 215, 0.4) 0px 10px 20px 2px;
		transition: 0.3s;
		display: grid;
		overflow: hidden;
		pointer-events: none;
		z-index: 999;
	}
	.menuCard ul {
		grid-column: 1;
		grid-row: 1;
		transition: 0.3s;
		padding: 0;
		margin: 0;
		list-style: none;
		/*animation: slide-up 0.2s ease;*/
	}
	.menuCard ul > li {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 15px;
		font-size: 14px;
		color: #334;
		transition: 0.3s ease;
	}
	.menuCard ul > li:hover {
		background: #f4f4f4;
	}
	.menuCard ul > li:first-child:hover {
		background: #fff;
	}
	.menuCard ul > li:first-child {
		color: #99a;
		text-transform: uppercase;
		font-family: Arial, sans-serif;
		font-size: 12px;
		font-weight: 600;
		padding-top: 20px;
		cursor: default;
	}
	.fadeIn {
		opacity: 1 !important;
		transform: translateX(0) !important;
	}
	@keyframes slide-up {
		0% {
			opacity: 0;
			transform: translateX(20px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
	/* Responsive navbar */
	@media screen and (max-width: 1050px) {
		nav {
			padding: 0 75px;
		}
	}
	@media screen and (max-width: 810px) {
		nav > ul {
			display: none;
		}
		.menuCard {
			left: -300px !important;
			opacity: 0 !important;
			pointer-events: none !important;
		}
	}
	@media screen and (min-width: 811px) {
		.burger-wrp {
			display: none;
		}
		.res-menu {
			opacity: 0 !important;
			pointer-events: none !important;
		}
	}
	#nav-open {
		visibility: hidden;
		position: absolute;
		opacity: 0;
	}
	.burger-wrp {
		padding: 16px 12px;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 20px;
		cursor: pointer;
	}
	.burger {
		position: relative;
		height: 2px;
		width: 20px;
		background: black;
	}
	.burger::before {
		content: '';
		width: 100%;
		height: 2px;
		background: black;
		position: absolute;
		top: -5px;
		left: 0;
		transition: 0.3s;
	}
	.burger::after {
		content: '';
		width: 100%;
		height: 2px;
		background: black;
		position: absolute;
		bottom: -5px;
		left: 0;
		transition: 0.3s;
	}
	.res-menu {
		position: absolute;
		top: 15px;
		left: 15px;
		right: 15px;
		max-height: calc(100vh - 30px);
		background: white;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		opacity: 0;
		pointer-events: none;
		box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.1);
		overflow: auto;
		z-index: 999;
		transition: 0.3s ease;
	}
	#nav-open:checked ~ .res-menu {
		opacity: 1;
		pointer-events: auto;
	}
	.res-menu > div {
		margin: 10px 0;
		transform: translateY(15px);
		transition: 0.3s ease;
	}
	#nav-open:checked ~ .res-menu > div {
		transform: translateY(0);
	}
	.res-menu .title {
		cursor: pointer;
		flex-basis: 100%;
		color: #99a;
		text-transform: uppercase;
		font-family: Arial, sans-serif;
		font-size: 12px;
		font-weight: 600;
		margin-top: 15px;
		position: relative;
		margin: 10px 20px;
		width: 80%;
		display: block;
	}
	.res-menu .title::after {
		content: '<';
		position: absolute;
		left: 130px;
		top: 0;
		transform: rotate(270deg) translateX(1px);
		transition: 0.3s ease;
	}
	.res-menu label[for='nav-open'] {
		position: fixed;
		top: 32.5px;
		right: 30px;
		cursor: pointer;
		height: 10px;
		width: 17px;
		z-index: 999;
	}
	.res-menu label[for='nav-open']::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: black;
		transform: rotate(45deg) translateY(6px);
	}
	.res-menu label[for='nav-open']::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: black;
		transform: rotate(-45deg) translateY(-6px);
	}
	.res-menu input[type='checkbox'] {
		visibility: hidden;
		position: absolute;
		opacity: 0;
	}
	.res-menu .nav-container {
		width: 100%;
		max-height: 0px;
		overflow: hidden;
		margin: 0;
		transition: 0.3s ease;
	}
	.res-menu .nav-container > div {
		transform: translateY(20px);
		opacity: 0;
		cursor: pointer;
		padding: 10px 20px;
		transition: 0.3s ease;
	}
	.res-menu .nav-container > div:nth-child(odd) {
		background: rgba(0, 0, 0, 0.02);
	}
	.res-menu input[type='checkbox']:checked ~ .nav-container {
		max-height: 300px;
	}
	.res-menu input[type='checkbox']:checked ~ .nav-container > div {
		transform: translateY(0px);
		opacity: 1;
	}
	.res-menu input[type='checkbox']:checked + label::after {
		transform: rotate(90deg);
	}
	.res-menu label:last-child {
		/* margin-bottom: 20px;*/
	}
	.single-title {
		color: #555 !important;
	}
	.single-title::after {
		display: none;
	}
	@media screen and (max-width: 440px) {
		nav {
			padding: 0 20px;
		}
	}
</style>

<svelte:head>
	<title>Startseite | {process.globals.title}</title>
</svelte:head>

<nav class="{dashed ? 'dashed' : undefined}">
	<div class="logo">LSG</div>
	<ul>
		{#each menus as menu}
			<li
				class="nav-link"
				on:click="{menu.onclick ? menu.onclick : undefined}"
				link-content="{menu.contents ? 'true' : null}"
				on:mousemove="{menu.contents ? (e) => menuHover(e, menu) : undefined}">
				{menu.title}
			</li>
		{/each}
	</ul>
	<input type="checkbox" id="nav-open" />
	<label for="nav-open" class="burger-wrp">
		<div class="burger" for="nav-open"></div>
	</label>
	<div class="res-menu">
		<label for="nav-open"></label>
		{#each menus as menu, i}
			<div>
				<input type="checkbox" id="t{i}" />
				<label
					for="t{i}"
					class="title {!menu.contents ? 'single-title' : ''}"
					on:click="{menu.onclick ? menu.onclick : () => null}">{menu.title}</label>
				{#if menu.contents}
					<div class="nav-container">
						{#each menu.contents as content}
							<div on:click="{content.onclick}">{content.title}</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</nav>

<div
	class="menuCard"
	bind:this="{menuCard}"
	style="height:{cardHeight}px;left:{cardPosition.x}px;{cardVisible ? 'opacity: 1;pointer-events: auto;' : ''}">
	{#each menus.filter((f) => f.contents) as menu}
		{#if menu.name == currentMenu}
			<ul transition:fly="{{ xduration: 400, x: 3 }}">
				<li>{menu.title}</li>
				{#each menu.contents as content}
					<li on:click="{content.onclick}">{content.title}</li>
				{/each}
			</ul>
		{/if}
	{/each}
</div>

<svelte:window on:mousemove="{mousemove}" on:touchmove="{mousemove}" on:resize="{onresize}" />

<div class="" style="background: #f6f9fc;margin-top: -80px;">
	<header
		class="w-full"
		style="min-height: calc(100vh - 90px); display: flex; flex-wrap: nowrap; padding: 0 15vw; padding-top: 40px; justify-content: space-between;">
		<div class="flex w-auto items-center justify-center flex-col w-1/2 z-10">
			<div class="m-12 mr-24 ml-0" style="max-width: 500px">
				<h1 class="break-normal" style="font-size: 45px; line-height: 48px; color: #0a2540;">
					Städtisches Louise Schroeder Gymnasium München
				</h1>
				<h3 class="my-4" style="font-weight: 900; font-size: 20px; line-height: 26px;">
					Naturwissenschaftlich-technologisches<br />und sprachliches Gymnasium.
				</h3>
				<button
					style="height: 40px; width: 250px; background: rgb(0, 119, 255); color: white; border-radius: 10px; border: none; cursor: pointer; font-size: 14px;">Aktuelle
					Termine</button>
				<p style="margin-top: 40px; color: #778; font-size: 14px">Referenzschule der TU München</p>
			</div>
		</div>
		<div class="w-full flex items-center justify-center flex-col z-10">
			<div>
				<img
					class="w-full rounded-lg shadow-lg"
					src="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
					alt="" />
			</div>
		</div>
	</header>
	<div
		class="awards w-full flex"
		id="logo-section"
		style="height: auto; flex-wrap: wrap; justify-content: space-between; padding: 0 15vw; padding-bottom: 30px; position: relative;">
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/delf.jpg"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/cae.png"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/cils.png"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/KombiLogo.png"
			alt="" />
	</div>
</div>
<div
	class="appointment-section w-full h-auto"
	style="min-height: 80vh; background: white; z-index: -1; display: flex; align-items: center; flex-direction: column;"
	id="termine">
	<h1
		style="margin-top: 80px; font-size: 45px; color: #336; font-weight: 700; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 99; text-align: center;">
		Aktuelle Termine
	</h1>
	<p
		style="font-size: 24px; font-weight: 100; line-height: 40px; text-align: center; color: #447; margin-top: 0; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 999; padding: 0 20px;">
		Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums:
	</p>
	<div
		class="appointments"
		style="width: 80%; max-width: 1000px; height: auto; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.2); border-radius: 10px; margin-top: 40px; z-index: 999;">
		<ul style="width: 100%; height: 100%; list-style: none; padding-left: 0; margin: 0;">
			<li
				style="background: #fafbff;width: 100%; min-height: 50px; margin-left: 0; padding-left: 0; border-bottom: 1px solid rgba(0,0,0,0.1); display: flex; flex-wrap: nowrap;">
				<div
					class="time"
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px; font-weight: 400; color: #667">Uhrzeit</span>
				</div>
				<div
					class="date"
					style="min-width: 120px; font-size: 16px; display: flex; align-items: left;color: #667; padding: 20px; font-weight: 500;">
					Datum
				</div>
				<div
					class="content flex align-center w-full"
					style="font-size: 16px;justify-content: left;color: #667; padding: 20px; font-weight: 500;">
					Inhalt
				</div>
			</li>
			<li
				style="width: 100%; min-height: 50px; margin-left: 0; padding-left: 0; border-bottom: 1px solid rgba(0,0,0,0.1); display: flex; flex-wrap: nowrap;">
				<div
					class="time text-base"
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">9:00</span>
					<span style="font-size: 16px;">9:30</span>
				</div>
				<div
					class="date text-base"
					style="font-size: 16px;display: flex; align-items: left;color: #667; width: 130px; padding: 20px; font-weight: 500;">
					13.08.2020
				</div>
				<div
					class="content text-base flex align-center w-full"
					style="font-size: 16px;justify-content: left;color: #667; padding: 20px; font-weight: 500;">
					Einsichtnahme in die korrigierten schriftlichen Abituraufgaben unter Aufsicht
				</div>
			</li>
			<li
				style="width: 100%; min-height: 50px; margin-left: 0; padding-left: 0; border-bottom: 1px solid rgba(0,0,0,0.1); display: flex; flex-wrap: nowrap;">
				<div
					class="time"
					style="font-size: 16px;display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">----</span>
				</div>
				<div
					class="date"
					style="width: 130px; font-size: 16px;display: flex; align-items: left;color: #667; width: 130px; padding: 20px; font-weight: 500;">
					24.07.2020
				</div>
				<div
					class="content flex align-center w-full"
					style="font-size: 16px;justify-content: left;color: #667; padding: 20px; font-weight: 500;">
					Q11/2: Vollversammlung: mit Zeugnisausgabe (ausgenommen Ersatzprüflinge)
				</div>
			</li>
			<li
				style="width: 100%; min-height: 50px; margin-left: 0; padding-left: 0; border-bottom: 1px solid rgba(0,0,0,0.1); display: flex; flex-wrap: nowrap;">
				<div
					class="time"
					style="font-size: 16px;display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">----</span>
				</div>
				<div
					class="date"
					style="font-size: 16px;display: flex; align-items: left;color: #667; width: 130px; padding: 20px; font-weight: 500;">
					24.07.2020
				</div>
				<div
					class="content flex align-center w-full"
					style="font-size: 16px;justify-content: left;color: #667; padding: 20px; font-weight: 500;">
					05-10: Ausgabe der Jahreszeugnisse (ausgenommen Ersatzprüflinge)
				</div>
			</li>
			<li
				style="width: 100%; min-height: 50px; margin-left: 0; padding-left: 0; border-bottom: 1px solid rgba(0,0,0,0.1); display: flex; flex-wrap: nowrap;">
				<div
					class="time"
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">10:00</span>
				</div>
				<div
					class="date"
					style="font-size: 16px;display: flex; align-items: left;color: #667; width: 130px; padding: 20px; font-weight: 500;">
					24.07.2020
				</div>
				<div
					class="content flex align-center w-full"
					style="font-size: 16px;justify-content: left;color: #667; padding: 20px; font-weight: 500;">
					Termin für die schriftliche Abmeldung von der Schule bei Schulwechsel oder Übertritt ins Berufsleben
				</div>
			</li>
			<li
				style="width: 100%; min-height: 50px; margin-left: 0; padding-left: 0; border-bottom: 1px solid rgba(0,0,0,0.1); display: flex; flex-wrap: nowrap;">
				<div
					class="time"
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">10:00</span>
				</div>
				<div
					class="date"
					style="font-size: 16px;display: flex; align-items: left;color: #667; width: 130px; padding: 20px; font-weight: 500;">
					24.07.2020
				</div>
				<div
					class="content flex align-center w-full"
					style="font-size: 16px;justify-content: left;color: #667; padding: 20px; font-weight: 500;">
					Termin für die schriftliche Abmeldung vom Religionsunterricht, um am Ethikunterricht teilnehmen zu
					können.
				</div>
			</li>
		</ul>
	</div>
	<a href="#" style="margin-top: 30px;font-size: 18px;margin-bottom: 50px;">Zu allen Terminen</a>
</div>
