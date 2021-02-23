<script>
	import Flex from './atoms/Flex.svelte';
	import Section from './atoms/Section.svelte';
</script>

<style lang="scss">
	input {
		@apply hidden;
	}

	$trans-duration: 0.3s;
	nav {
		word-break: normal;
		word-wrap: normal;

		@apply py-2;

		.menu-wrp {
			//mobile
			@apply opacity-0 top-0 w-full left-0 absolute pointer-events-none z-40 bg-white rounded-lg;
			//normal styling
			@apply xl:opacity-100 xl:w-auto xl:relative xl:pointer-events-auto xl:rounded-none;
			.menu {
				//mobile
				@apply flex-col flex relative;
				//normal styling
				@apply xl:flex-row align-middle;

				.dropdown {
					@apply relative inline-block cursor-pointer;

					&:hover > div.items {
						@apply xl:opacity-100 xl:pointer-events-auto;
						animation-name: slide-up;
						animation-duration: $trans-duration;
					}

					p {
						@apply p-3 text-xs xl:normal-case uppercase xl:font-normal;
					}

					label {
						@apply relative cursor-pointer;

						&::after {
							@apply xl:hidden left-40 visible absolute text-gray-400;
							content: '<';
							top: 110%;
							transform: rotate(270deg);
							transition: $trans-duration ease;
						}

						> p {
							@apply xl:text-black text-gray-400;
						}
					}

					> .items {
						@apply xl:opacity-0 shadow-none xl:shadow-equal-xl max-h-0 xl:max-h-screen overflow-hidden xl:h-auto transition duration-300 xl:absolute z-40 xl:pointer-events-none xl:rounded-lg bg-white xl:pb-1;
						width: 200px;
						top: 95%;
						transition: max-height $trans-duration ease;

						> a {
							@apply w-full block text-black;
							font-size: 14px;
							text-decoration: none;

							&:hover {
								background: #f4f4f4;
							}
						}

						> p {
							color: #99a;
							font-size: 12px;
							@apply font-bold uppercase xl:block hidden;
						}

						> * {
							@apply xl:px-2 px-3 py-1;
						}
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

		#nav-open-2:checked ~ .menu-wrp {
			@apply opacity-100 pointer-events-auto;
			box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.1);

			.dropdown {
				p {
					font-size: 0.65rem;
					font-weight: 600;
				}

				> p {
					@apply text-gray-700;
				}
				input:checked ~ .items {
					max-height: 1000px;
				}

				input:checked ~ label::after {
					transform: rotate(90deg);
				}

				.items {
					@apply w-full divide-y divide-gray-400 divide-solid;
				}
			}
		}
	}

	@keyframes slide-up {
		0% {
			transform: translateX(40px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>

<Section>
	<nav class="w-full">
		<Flex align="center" justify="between" classes="relative w-full">
			<div class="mr-5 logo">LSG</div>
			<input id="nav-open-2" type="checkbox" />
			<div class="menu-wrp">
				<div class="menu">
					<label for="nav-open-2" class="absolute right-0 z-50 block w-10 h-10 p-2 cursor-pointer">
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
					<div class="dropdown">
						<p>Home</p>
					</div>
					<div class="dropdown">
						<input id="t-0" type="checkbox" />
						<label for="t-0"><p>Die Schule</p></label>
						<div class="items">
							<p>Die Schule</p>
							<a href="/">Leitbild</a>
							<a href="/">Strukturdaten</a>
							<a href="/">Ausbildungsrichtungen</a>
							<a href="/mensa">Mensa</a>
							<a href="/">Erziehungspartnerschaft</a>
							<a href="/">Schulentwicklungsplan</a>
							<a href="/">Kontakt</a>
						</div>
					</div>
					<div class="dropdown">
						<input id="t-1" type="checkbox" />
						<label for="t-1"><p>Schulfamilie</p></label>
						<div class="items">
							<p>Schulfamilie</p>
							<a href="/schoolfamily/1-profile">Schulleitung</a>
							<a href="/schoolfamily/1-profile">Verwaltung</a>
							<a href="/schoolfamily/1-profile">Elternbeirat</a>
							<a href="/schoolfamily/1-profile">Förderverein</a>
						</div>
					</div>
					<div class="dropdown">
						<input id="t-2" type="checkbox" />
						<label for="t-2"><p>Profile</p></label>
						<div class="items">
							<p>Profile</p>
							<a href="/">EVA</a>
							<a href="/">Informationstechnik</a>
							<a href="/">Kunst</a>
							<a href="/">Musik</a>
							<a href="/">MINT</a>
							<a href="/">Schulsanitätsdienst</a>
							<a href="/">Schülerzeitung</a>
							<a href="/">Sport</a>
							<a href="/">Sprachen</a>
							<a href="/">Theater und literatur</a>
						</div>
					</div>
					<div class="dropdown">
						<input id="t-3" type="checkbox" />
						<label for="t-3"><p>Beratung</p></label>
						<div class="items">
							<p>Beratung</p>
							<a href="/">Schulberatung</a>
							<a href="/">Nachhilfe</a>
							<a href="/">Schulpsychologie</a>
							<a href="/">Unterstufe</a>
							<a href="/">Mittelstufe</a>
							<a href="/">Oberstufe</a>
						</div>
					</div>
					<div class="dropdown">
						<input id="t-4" type="checkbox" />
						<label for="t-4"><p>Information</p></label>
						<div class="items">
							<p>Information</p>
							<a href="/information/1-information">für Eltern</a>
							<a href="/information/1-information">für Schüler</a>
							<a href="/information/1-information">für Lehrer</a>
						</div>
					</div>
					<div class="dropdown">
						<p>Termine</p>
					</div>
				</div>
			</div>
			<label
				class="visible px-2.5 py-3 bg-gray-200 cursor-pointer rounded-2xl xl:hidden burger-wrp"
				for="nav-open-2">
				<div class="relative bg-black burger"></div>
			</label>
		</Flex>
	</nav>
</Section>
