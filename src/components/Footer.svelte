<script>
	const startYear = 2020;
	const currentYear = new Date().getFullYear();
</script>

<section class="w-full p-4 text-center text-gray-900 bg-gray-200 center">
	<div class="grid grid-cols-1">
		<p>
			Diese Webseite ist freie Software. <a href="https://www.gnu.org/philosophy/free-software-even-more-important.de.html">Erfahren
				Sie mehr</a>
		</p>
		<p><a href="https://github.com/lsglab/frontend/">Der gesamte Quellcode ist auf GitHub einsehbar</a></p>
		<p class="text-gray-600">
			Copyright (c) {startYear === currentYear ? currentYear : `${startYear}-${currentYear}`} the admin lab team
		</p>
	</div>
</section>
