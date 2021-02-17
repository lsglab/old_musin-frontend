<script>
	import Flex from './common/Flex.svelte';
	import Section from './Section.svelte';
</script>

<style lang="scss">
	nav {
		word-break: normal;
		word-wrap: normal;

		.dropdown {
			@apply relative inline-block cursor-pointer;

			&:hover > div.items {
				@apply opacity-100 pointer-events-auto;
				animation-name: slide-up;
				animation-duration: 0.3s;
			}

			p {
				@apply p-3 text-xs;
			}

			> .items {
				@apply opacity-0 transition duration-300 absolute z-50 pointer-events-none rounded-lg bg-white pb-1;
				box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.1);
				width: 200px;
				top: 95%;

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
					@apply font-bold uppercase;
				}

				> * {
					@apply py-1 px-2;
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
		<Flex align="center" justify="between" classes="relative z-90 w-full">
			<div class="mr-5 logo">LSG</div>
			<Flex align="center" classes="h-full">
				<div class="dropdown">
					<p>Die Schule</p>
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
					<p>Schulfamilie</p>
					<div class="items">
						<p>Schulfamilie</p>
						<a href="/schoolfamily/1-profile">Schulleitung</a>
						<a href="/schoolfamily/1-profile">Verwaltung</a>
						<a href="/schoolfamily/1-profile">Elternbeirat</a>
						<a href="/schoolfamily/1-profile">Förderverein</a>
					</div>
				</div>
				<div class="dropdown">
					<p>Profile</p>
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
					<p>Beratung</p>
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
					<p>Information</p>
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
			</Flex>
			<input type="checkbox" id="nav-open" class="absolute hidden pointer-events-none" />
		</Flex>
	</nav>
</Section>
