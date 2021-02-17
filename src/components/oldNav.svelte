<script>
	import { fly } from 'svelte/transition';

	export let segment;
	const dashedSegments = [undefined, 'blog'];
	const dashed = dashedSegments.includes(segment);
	// The order is important !!!
	const menus = [
		{
			name: null,
			onclick: () => {
				alert('Home');
			},
			title: 'Home',
		},
		{
			contents: [
				{
					onclick: () => {
						alert();
					},
					title: 'Leitbild',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Strukturdaten',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Ausbildungsrichtungen',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Mensa',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Erziehungspartnerschaft',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Schulentwicklungsplan',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Kontakt',
				},
			],
			name: 'theschool',
			title: 'Die Schule',
		},
		{
			contents: [
				{
					onclick: () => {
						alert();
					},
					title: 'Schulleitung',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Verwaltung',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Elternbeirat',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Förderverein',
				},
			],
			name: 'schoolfamily',
			title: 'Schulfamilie',
		},
		{
			contents: [
				{
					onclick: () => {
						alert();
					},
					title: 'EVA',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Informationstechnik',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Kunst',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Musik',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'MINT',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Schulsanitätsdienst',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Schülerzeitung',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Sport',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Sprachen',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Theater und Literatur',
				},
			],
			name: 'profiles',
			title: 'Profile',
		},
		{
			contents: [
				{
					onclick: () => {
						alert();
					},
					title: 'Schulberatung',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Nachhilfe',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Schulpsychologie',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Unterstufe',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Mittelstufe',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'Oberstufe',
				},
			],
			name: 'consulting',
			title: 'Beratung',
		},
		{
			contents: [
				{
					onclick: () => {
						alert();
					},
					title: 'für Eltern',
				},
				{
					onclick: () => {
						alert('Schülerinfos');
					},
					title: 'für Schüler',
				},
				{
					onclick: () => {
						alert();
					},
					title: 'für Lehrer',
				},
			],
			name: 'informations',
			title: 'Informationen',
		},
		{
			name: null,
			onclick: () => {
				alert('Termine');
			},
			title: 'Termine',
		},
	];

	const cardPosition = { x: -200 };
	let cardVisible = true;
	const cardValues = {
		opacity: '0',
		pointer_events: 'none',
	};
	let cardHeight = 0;
	let currentMenu = '';

	$: {
		if (cardVisible) {
			cardValues.opacity = '1';
			cardValues.pointer_events = 'auto';
		} else {
			cardValues.opacity = '0';
			cardValues.pointer_events = 'none';
		}
	}

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
	function onresize() {
		const rect = menuCard.getBoundingClientRect();
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
		box-sizing: border-box;
	}
	nav {
		width: 100%;
		height: 80px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 10%;
		position: relative;
		z-index: 9;
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
		font-size: 19px;
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
		font-size: 19px;
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
		box-shadow: rgba(184, 194, 215, 0.4) 0 10px 20px 2px;
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

		/* animation: slide-up 0.2s ease; */
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
		background: white;
	}
	.menuCard ul > li:first-child {
		color: #99a;
		text-transform: uppercase;
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
		box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.1);
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
		font-size: 12px;
		font-weight: 600;
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
		max-height: 0;
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
		transform: translateY(0);
		opacity: 1;
	}
	.res-menu input[type='checkbox']:checked + label::after {
		transform: rotate(90deg);
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
	style="height:{cardHeight}px;left:{cardPosition.x}px;opacity:{cardValues.opacity};pointer-events:{cardValues.pointer_events}">
	{#each menus.filter((f) => f.contents) as menu}
		{#if menu.name === currentMenu}
			<ul transition:fly="{{ duration: 400, x: 30 }}">
				<li>{menu.title}</li>
				{#each menu.contents as content}
					<li on:click="{content.onclick}">{content.title}</li>
				{/each}
			</ul>
		{/if}
	{/each}
</div>

<svelte:window on:mousemove="{mousemove}" on:touchmove="{mousemove}" on:resize="{onresize}" />
