<script>
	import Flex from '../atoms/Flex.svelte';
	import Section from '../atoms/Section.svelte';
</script>

<style lang="scss">
	nav {
		backdrop-filter: blur(3px);
		word-break: normal;
		word-wrap: normal;
		div.dropdown {
			@apply h-auto relative flex justify-center items-center cursor-default;
			&:hover > div.items {
				@apply flex;
			}
			> div.items {
				@apply absolute left-0 bg-gray-100 rounded-b-lg transition-colors flex-col justify-between hidden min-w-full;
				top: 95%;
				> a {
					@apply w-full py-2 px-1 block text-black;
					&:hover {
						@apply bg-gray-300;
						&:last-child {
							@apply rounded-b-lg;
						}
					}
				}
			}
		}
	}
</style>

<Section>
	<nav class="relative z-50 w-full text-center bg-transparent">
		<Flex justify="between" classes="w-full">
			<Flex both="center">
				<p>Louise Schroeder Gymnasium</p>
			</Flex>
			<Flex justify="evenly" classes="w-full">
				<div class="dropdown">
					<div>Die Schule</div>
					<div class="divide-y divide-gray-400 items divide-solid">
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
					<div>Schulfamilie</div>
					<div class="divide-y divide-gray-400 items divide-solid">
						<a href="/schoolfamily/1-profile">Schulleitung</a>
						<a href="/schoolfamily/1-profile">Verwaltung</a>
						<a href="/schoolfamily/1-profile">Elternbeirat</a>
						<a href="/schoolfamily/1-profile">Förderverein</a>
					</div>
				</div>
				<div class="dropdown">
					<div>Profile</div>
					<div class="divide-y divide-gray-400 items divide-solid">
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
					<div>Beratung</div>
					<div class="divide-y divide-gray-400 items divide-solid">
						<a href="/">Schulberatung</a>
						<a href="/">Nachhilfe</a>
						<a href="/">Schulpsychologie</a>
						<a href="/">Unterstufe</a>
						<a href="/">Mittelstufe</a>
						<a href="/">Oberstufe</a>
					</div>
				</div>
				<div class="dropdown">
					<div>Information</div>
					<div class="divide-y divide-gray-400 items divide-solid">
						<a href="/information/1-information">für Eltern</a>
						<a href="/information/1-information">für Schüler</a>
						<a href="/information/1-information">für Lehrer</a>
					</div>
				</div>
				<div class="dropdown">
					<div>Termine</div>
					<div class="divide-y divide-gray-400 items divide-solid"><a href="/">Termine</a></div>
				</div>
			</Flex>
		</Flex>
	</nav>
</Section>
