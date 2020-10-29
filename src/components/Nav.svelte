<script>
	import Flex from './common/Flex.svelte';
</script>

<style lang="scss">
	nav {
		backdrop-filter: blur(3px);
		word-break: normal;
		word-wrap: normal;
		div.dropdown {
			@apply w-full h-full relative flex justify-center items-center cursor-default;
			&:hover > div.items {
				@apply flex;
			}
			> div.items {
				@apply absolute left-0 bg-gray-100 rounded-b-lg transition-colors shadow-xl flex-col justify-between hidden min-w-full;
				top: 95%;
				> div {
					@apply w-full py-2 px-1;
					&:hover {
						@apply bg-gray-300;
						&:last-child {
							@apply rounded-b-lg transition-none;
						}
					}
				}
			}
		}
	}
</style>

<nav class="relative z-50 w-full p-1 text-center bg-transparent">
	<Flex justify="between" classes="w-full">
		<Flex both="center">
			<h4>Louise Schroeder Gymnasium</h4>
		</Flex>
		<Flex justify="evenly" classes="w-full">
			<div class="dropdown">
				<div>Die Schule</div>
				<div class="divide-y divide-gray-400 items divide-solid">
					<div>Leitbild</div>
					<div>Strukturdaten</div>
					<div>Ausbildungsrichtungen</div>
					<div>Mensa</div>
					<div>Erziehungspartnerschaft</div>
					<div>Schulentwicklungsplan</div>
					<div>Kontakt</div>
				</div>
			</div>
			<div class="dropdown">
				<div>Schulfamilie</div>
				<div class="divide-y divide-gray-400 items divide-solid">
					<div>Schulleitung</div>
					<div>Verwaltung</div>
					<div>Elternbeirat</div>
					<div>Förderverein</div>
				</div>
			</div>
			<div class="dropdown">
				<div>Profile</div>
				<div class="divide-y divide-gray-400 items divide-solid">
					<div>EVA</div>
					<div>Informationstechnik</div>
					<div>Kunst</div>
					<div>Musik</div>
					<div>MINT</div>
					<div>Schulsanitätsdienst</div>
					<div>Schülerzeitung</div>
					<div>Sport</div>
					<div>Sprachen</div>
					<div>Theater und literatur</div>
				</div>
			</div>
			<div class="dropdown">
				<div>Beratung</div>
				<div class="divide-y divide-gray-400 items divide-solid">
					<div>Schulberatung</div>
					<div>Nachhilfe</div>
					<div>Schulpsychologie</div>
					<div>Unterstufe</div>
					<div>Mittelstufe</div>
					<div>Oberstufe</div>
				</div>
			</div>
			<div class="dropdown">
				<div>Information</div>
				<div class="divide-y divide-gray-400 items divide-solid">
					<div>für Eltern</div>
					<div>für Schüler</div>
					<div>für Lehrer</div>
				</div>
			</div>
			<div class="dropdown">
				<div>Termine</div>
			</div>
		</Flex>
	</Flex>
</nav>
