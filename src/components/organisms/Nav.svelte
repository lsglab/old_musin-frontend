<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Flex from '../atoms/Flex.svelte';
	import Logo from '../atoms/Logo.svelte';
	import Section from '../atoms/Section.svelte';

	const menus = [
		{
			href: '/',
			tid: null,
			title: 'Home',
		},
		{
			contents: [
				{
					href: '/',
					title: 'Leitbild',
				},
				{
					href: '/',
					title: 'Strukturdaten',
				},
				{
					href: '/',
					title: 'Ausbildungsrichtungen',
				},
				{
					href: '/schule/mensa',
					title: 'Mensa',
				},
				{
					href: '/',
					title: 'Erziehungspartnerschaft',
				},
				{
					href: '/',
					title: 'Schulentwicklungsplan',
				},
				{
					href: '/',
					title: 'Kontakt',
				},
			],
			id: 'theschool',
			title: 'Die Schule',
		},
		{
			contents: [
				{
					href: '/schulfamilie/schule',
					title: 'Schulleitung',
				},
				{
					href: '/schulfamilie/schule#custody',
					title: 'Verwaltung',
				},
				{
					href: '/schulfamilie/elternbeirat',
					title: 'Elternbeirat',
				},
				{
					href: '/schulfamilie/foerderverein',
					title: 'Förderverein',
				},
			],
			id: 'schoolfamily',
			title: 'Schulfamilie',
		},
		{
			contents: [
				{
					href: '/',
					title: 'EVA',
				},
				{
					href: '/',
					title: 'Informationstechnik',
				},
				{
					href: '/',
					title: 'Kunst',
				},
				{
					href: '/',
					title: 'Musik',
				},
				{
					href: '/',
					title: 'MINT',
				},
				{
					href: '/',
					title: 'Schulsanitätsdienst',
				},
				{
					href: '/',
					title: 'Schülerzeitung',
				},
				{
					href: '/',
					title: 'Sport',
				},
				{
					href: '/',
					title: 'Sprachen',
				},
				{
					href: '/',
					title: 'Theater und Literatur',
				},
			],
			id: 'profiles',
			title: 'Profile',
		},
		{
			contents: [
				{
					href: '/',
					title: 'Schulberatung',
				},
				{
					href: '/',
					title: 'Nachhilfe',
				},
				{
					href: '/',
					title: 'Schulpsychologie',
				},
				{
					href: '/',
					title: 'Unterstufe',
				},
				{
					href: '/',
					title: 'Mittelstufe',
				},
				{
					href: '/',
					title: 'Oberstufe',
				},
			],
			id: 'consulting',
			title: 'Beratung',
		},
		{
			contents: [
				{
					href: '/information/xy',
					title: 'für Eltern',
				},
				{
					href: '/information/xy',
					title: 'für Schüler',
				},
				{
					href: '/information/xy',
					title: 'für Lehrer',
				},
			],
			id: 'informations',
			title: 'Informationen',
		},
		{
			href: '/termine',
			id: null,
			title: 'Termine',
		},
	];

	const cardPosition = { x: -200 };
	let cardVisible = false;
	const cardValues = {
		opacity: '0',
		pointer_events: 'none',
	};
	let menuCard;
	let cardHeight = 0;
	let currentMenu = 'theschool';

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
		cardPosition.x = rect.left - (menuCard.offsetWidth - e.target.offsetWidth) / 2;
		cardHeight = (menu.contents.length + 1) * document.getElementsByClassName('menuCardLink')[0].offsetHeight;
		cardVisible = true;
		currentMenu = menu.id;
	}

	function mousemove(e) {
		if (e.target.getAttribute('link-content') != null || (e.path || e.composedPath()).includes(menuCard)) {
			cardVisible = true;
		} else {
			cardVisible = false;
		}
	}

	function onresize() {
		const rect = menuCard.getBoundingClientRect();
		if (rect.left + menuCard.offsetWidth > window.innerWidth) {
			if (!cardVisible) {
				cardPosition.x = -menuCard.offsetWidth;
			} else {
				cardPosition.x = window.innerWidth - menuCard.offsetWidth;
			}
		}
	}

	function setListener() {
		const tags = document.querySelectorAll('.dropdown a');
		Object.keys(tags).forEach((key) => {
			tags[key].addEventListener('click', () => {
				const inputs = document.querySelectorAll('nav input[type = checkbox]');
				Object.keys(inputs).forEach((box) => {
					inputs[box].checked = false;
				});
			});
		});
	}

	function closeMenuCard() {
		cardVisible = false;
	}

	onMount(() => {
		setListener();
	});
</script>

<style lang="scss">
	input {
		@apply hidden;
	}

	$expand-trans-duration: 0.3s;
	nav {
		word-break: normal;
		word-wrap: normal;

		@apply py-2;
		.menu-wrp {
			//mobile
			@apply opacity-0 top-0 w-full left-0 z-50 absolute pointer-events-none  bg-white rounded-lg shadow-equal-xl;
			//normal styling
			@apply lg:opacity-100 lg:w-auto lg:relative lg:z-auto lg:pointer-events-auto lg:rounded-none lg:shadow-none lg:bg-transparent;
			.menu {
				//mobile
				@apply flex-col flex relative;
				//normal styling
				@apply lg:flex-row align-middle;

				.dropdown {
					@apply relative cursor-pointer;

					p,
					> a {
						font-size: 0.65rem;
						@apply p-3 lg:text-xs lg:normal-case uppercase lg:font-normal font-bold;
					}

					> a {
						@apply lg:text-black w-3/4 text-gray-700 block;
					}

					label {
						@apply relative cursor-pointer flex flex-row items-center justify-between;
						> p {
							@apply lg:text-black text-gray-400;
						}

						> svg {
							@apply text-gray-400 fill-current block lg:hidden mr-20;
							transform: rotate(0deg);
							transition: $expand-trans-duration ease;
						}
					}

					> .items {
						@apply shadow-none max-h-0 overflow-hidden transition duration-300  bg-white;
						top: 95%;
						transition: $expand-trans-duration ease;
						> * {
							@apply px-3 py-2;
						}
						> a {
							@apply w-full block text-xs text-gray-800;
							text-decoration: none;
							transition: 0.2s ease;
							&:nth-child(even) {
								@apply bg-gray-50;
							}
						}
					}
				}
			}
		}
		#nav-open:checked ~ .menu-wrp {
			@apply opacity-100 pointer-events-auto;

			.dropdown {
				input:checked ~ .items {
					max-height: 1000px;
				}

				input:checked ~ label > svg {
					transform: rotate(90deg);
				}
			}
		}
	}
	.burger {
		height: 2px;
		width: 20px;

		&::after,
		&::before {
			content: '';
			width: 100%;
			height: 2px;
			@apply bg-black left-0 absolute;
		}

		&::before {
			top: -5px;
		}

		&::after {
			bottom: -5px;
		}
	}

	.menuCard {
		@apply hidden top-12 overflow-hidden w-32 shadow-equal-xl lg:grid max-h-screen h-auto absolute z-40 rounded-lg bg-white pb-1;
		transition: 0.3s;
		> div {
			@apply flex flex-col;
			grid-column: 1;
			grid-row: 1;
		}

		a {
			@apply text-gray-800;
			font-size: 0.6rem;
			text-decoration: none;
		}

		a:hover {
			@apply bg-gray-200;
		}

		a,
		p {
			@apply px-2 py-0.5;
		}

		p {
			color: #99a;
			font-size: 12px;
			@apply font-bold uppercase;
		}
	}
</style>

<Section classes="dashedBottomBorder z-30">
	<nav class="w-full">
		<Flex align="center" justify="between" classes="relative w-full">
			<Logo classes="mr-5" />
			<input id="nav-open" type="checkbox" />
			<div class="menu-wrp" id="menu-wrap">
				<div class="menu" id="menu">
					<label
						for="nav-open"
						class="absolute right-0 z-50 visible block w-10 h-10 p-2 cursor-pointer lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							enable-background="new 0 0 24 24"
							class="w-full h-full"
							viewBox="0 0 24 24"><g>
								<path d="M0,0h24v24H0V0z" fill="none"></path>
							</g>
							<g>
								<g>
									<path
										d="M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89 c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z"></path>
								</g>
							</g>
						</svg>
					</label>
					{#each menus as menu, i}
						<div
							id="dropdown"
							class="dropdown"
							on:mousemove="{menu.contents ? (e) => menuHover(e, menu) : undefined}">
							{#if menu.contents}
								<input id="t-{i}" type="checkbox" />
								<label for="t-{i}" id="label" type="checkbox">
									<p link-content="{menu.contents ? 'true' : null}">{menu.title}</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 0 24 24"
										width="24"><path d="M0 0h24v24H0V0z" fill="none"></path>
										<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>
								</label>
								<div class="items lg:hidden">
									{#each menu.contents as content}<a href="{content.href}">{content.title}</a>{/each}
								</div>
							{:else}<a href="{menu.href}">{menu.title}</a>{/if}
						</div>
					{/each}
				</div>
			</div>
			<label
				class="visible px-2.5 py-3.5 bg-gray-200 z-40 cursor-pointer rounded-2xl lg:hidden burger-wrp"
				for="nav-open">
				<div class="relative bg-black burger"></div>
			</label>
		</Flex>
	</nav>
</Section>

<div
	bind:this="{menuCard}"
	class="menuCard"
	style="height:{cardHeight}px;left:{cardPosition.x}px;opacity:{cardValues.opacity};pointer-events:{cardValues.pointer_events}">
	{#each menus.filter((f) => f.contents) as menu}
		{#if menu.id === currentMenu}
			<div transition:fly="{{ duration: 400, x: 30 }}">
				<p>{menu.title}</p>
				{#each menu.contents as content}
					<a class="menuCardLink" on:click="{closeMenuCard}" href="{content.href}">{content.title}</a>
				{/each}
			</div>
		{/if}
	{/each}
</div>

<svelte:window on:mousemove="{mousemove}" on:touchmove="{mousemove}" on:resize="{onresize}" />

<svelte:options accessors="{true}" />
