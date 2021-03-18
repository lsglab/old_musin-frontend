<script>
	export let classes = '';
</script>

<style lang="scss">
	* {
		@apply text-xs;
	}
	table tr {
		> th,
		> td {
			@apply p-4;
			color: #445;
		}
		> td:nth-child(1) {
			color: black;
		}
		> th {
			@apply break-normal;
			color: #334;
			font-weight: 400;
		}
	}
</style>

<table
	class="{classes} shadow-equal my-10 overflow-hidden text-left bg-white divide-y divide-gray-400 rounded-lg divide-solid">
	<thead style="background: #fafbff;">
		<tr>
			<th>Datum</th>
			<th>Uhrzeit</th>
			<th>Ort</th>
			<th>Beschreibung</th>
		</tr>
	</thead>
	<tbody class="max-w-full divide-y divide-gray-400 divide-dashed">
		<tr>
			<td>20.09.</td>
			<td></td>
			<td></td>
			<td class="content">Buch-Gutschein-Aktion "Ich schenke dir eine Geschichte" zum Welttag des Buches</td>
		</tr>
		<tr>
			<td>22.09.</td>
			<td>19:00</td>
			<td>Kla.Zi.</td>
			<td class="content">08. Jgst.: Klassenelternversammlung</td>
		</tr>
		<tr>
			<td>23.09.</td>
			<td>08:45 - 09:30</td>
			<td>Mensa</td>
			<td class="content">Q12: Vollversammlung: Wahl der Jahrgangsstufensprecher</td>
		</tr>
		<tr>
			<td>24.09.</td>
			<td>19:00</td>
			<td>Kla.Zi.</td>
			<td class="content">09. Jgst.: Klassenelternversammlung</td>
		</tr>
		<tr>
			<td>29.09.</td>
			<td>08:00 - 08:45</td>
			<td>Mensa</td>
			<td class="content">Q11: Vollversammlung: Wahl der Jahrgangsstufensprecher</td>
		</tr>
		<tr>
			<td>29.09.</td>
			<td>19:00</td>
			<td>Kla.Zi.</td>
			<td class="content">10. Jgst.: Klassenelternversammlung</td>
		</tr>
	</tbody>
</table>
