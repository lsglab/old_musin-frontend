<script>
</script>

<style lang="scss">
	table tr {
		&:nth-child(even) {
			@apply bg-gray-100;
		}
		> th,
		> td {
			@apply p-3;
		}
		> th {
			@apply break-normal;
		}
	}
</style>

<table class="my-10 bg-white divide-y divide-gray-400 shadow-xl divide-solid">
	<thead class="bg-gray-100">
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
			<td>08:45 - 9:30</td>
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
			<td>8:00 - 8:45</td>
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
