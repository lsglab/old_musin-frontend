<script context="module">
	export const preload = () => {
		const year = new Date().getFullYear();
		return { year };
	};
</script>

<script>
	export let year;
</script>

<section class="w-full p-4 text-center text-gray-900 bg-gray-200 center">
	<div class="grid grid-cols-1">
		<p>
			Diese Webseite ist freie Software und darf unter bestimmten Bedingungen ver&auml;ndert
			und weiterverbreitet werden.&nbsp;<a
				href="https://www.gnu.org/philosophy/free-software-even-more-important.de.html">Erfahren
				Sie mehr</a>
		</p>
		<div class="center">
			<a href="https://github.com/lsglab/frontend/blob/master/LICENSE.md" class="noa"><img
					src="/storage/agplv3.png"
					alt="AGPLv3 license logo" /></a>
		</div>
		<p>
			<a href="https://github.com/lsglab/frontend/">Der gesamte Quellcode ist auf GitHub
				einsehbar</a>
		</p>
		<p class="text-gray-600">Copyright (c) 2020-{year}</p>
	</div>
</section>
