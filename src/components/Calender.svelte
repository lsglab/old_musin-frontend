<script>
	import Flex from './common/Flex.svelte';
	import Link from './common/Link.svelte';
	import Section from './Section.svelte';
</script>

<style lang="scss">
	table tr {
		&:nth-child(even) {
			@apply bg-gray-100;
		}
		> th,
		> td {
			@apply p-2;
		}
		> th {
			@apply break-normal;
		}
	}
</style>

<Section fullscreen="true" classes="bg-gray-100 center" id="termine">
	<Flex cols="true" justify="center" align="center">
		<h2>Aktuelle Termine</h2>
		<p>Alle demnächst anstehenden Termine</p>
		<table
			class="mx-1 my-2 bg-white border-collapse divide-y divide-gray-400 rounded-md shadow-md table-auto
				md:rounded-lg md:shadow-xl md:mx-2 divide-solid">
			<thead>
				<tr>
					<th>Datum</th>
					<th>Uhrzeit</th>
					<th>Ort</th>
					<th></th>
				</tr>
			</thead>
			<tbody class="max-w-full divide-y divide-gray-400 divide-dashed">
				<tr>
					<td>20.09.</td>
					<td></td>
					<td></td>
					<td class="content">
						Buch-Gutschein-Aktion "Ich schenke dir eine Geschichte" zum Welttag des Buches
					</td>
				</tr>
				<tr>
					<td>22.09.</td>
					<td>19:00</td>
					<td>Kla.Zi.</td>
					<td class="content">08. Jgst.: Klassenelternversammlung</td>
				</tr>
				<tr>
					<td>23.09.</td>
					<td>08:45 - 9:30</td>
					<td>Mensa</td>
					<td class="content">Q12: Vollversammlung: Wahl der Jahrgangsstufensprecher</td>
				</tr>
				<tr class="hidden md:table-row">
					<td>24.09.</td>
					<td>19:00</td>
					<td>Kla.Zi.</td>
					<td class="content">09. Jgst.: Klassenelternversammlung</td>
				</tr>
				<tr class="hidden md:table-row">
					<td>29.09.</td>
					<td>8:00 - 8:45</td>
					<td>Mensa</td>
					<td class="content">Q11: Vollversammlung: Wahl der Jahrgangsstufensprecher</td>
				</tr>
				<tr class="hidden md:table-row">
					<td>29.09.</td>
					<td>19:00</td>
					<td>Kla.Zi.</td>
					<td class="content">10. Jgst.: Klassenelternversammlung</td>
				</tr>
			</tbody>
		</table>
		<Link href="http://example.com">Zur Termin&uuml;bersicht</Link>
	</Flex>
</Section>
