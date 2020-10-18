<script>
	import Flex from './common/Flex.svelte';
	import Link from './common/Link.svelte';
	import Section from './Section.svelte';

	const startYear = 2020;
	const currentYear = new Date().getFullYear();
</script>

<Section classes="p-4 text-center text-gray-900 bg-gray-200">
	<Flex cols="true" justify="evenly" align="center">
		<p>
			Diese Webseite ist freie Software.
			<Link href="https://www.gnu.org/philosophy/free-software-even-more-important.de.html">
				Erfahren Sie mehr
			</Link>
		</p>
		<p>
			<Link href="https://github.com/lsglab/frontend/">Der gesamte Quellcode ist auf GitHub einsehbar</Link>
		</p>
		<p class="text-gray-600">
			Copyright (c)
			{startYear === currentYear ? currentYear : `${startYear}-${currentYear}`}
			LSG Admins
		</p>
	</Flex>
</Section>
