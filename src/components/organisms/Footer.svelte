<script>
	import Flex from '../atoms/Flex.svelte';
	import Link from '../atoms/Link.svelte';
	import Logo from '../atoms/Logo.svelte';
	import Section from '../atoms/Section.svelte';

	const startYear = 2020;
	const currentYear = new Date().getFullYear();
</script>

<!--
	@component
	The footer of the webpage. Includes contact information copyright and links to github. Used at the bottom of each page

-->
<style>
	p {
		text-align: left;
	}
</style>

<Section classes="p-4 text-center bg-gray-100 shadow-equal">
	<Flex justify="between" wrap="true" classes="mt-5">
		<Flex cols="true" justify="between" classes="h-40 mb-5" align="start">
			<Logo />
			<Flex cols="true" align="start">
				<p>Pfarrer-Grimm-Straße 1</p>
				<p>80999 München</p>
				<p>Telefon: 089 233-64200</p>
				<p>
					Email:
					<Link noArrow="true" href="mailto:sekretariat@lsg.musin.de">sekretariat@lsg.musin.de</Link>
				</p>
				<Link noArrow="true">Impressum</Link>
			</Flex>
		</Flex>
		<Flex cols="true" justify="between" align="start" classes="h-40 mb-5">
			<Flex cols="true" align="start">
				<p>
					Diese Webseite ist freie Software.
					<Link href="https://www.gnu.org/philosophy/free-software-even-more-important.de.html">
						Erfahren Sie mehr
					</Link>
				</p>
				<p>
					<Link href="https://github.com/lsglab/frontend/">
						Der gesamte Quellcode ist auf GitHub einsehbar
					</Link>
				</p>
			</Flex>
			<p class="text-gray-600">
				Copyright (c)
				{startYear === currentYear ? currentYear : `${startYear}-${currentYear}`}
				LSG Admins
			</p>
		</Flex>
	</Flex>
</Section>
