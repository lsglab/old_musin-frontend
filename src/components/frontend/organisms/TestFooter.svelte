<script>
	import BlueprintLink from '../../../cms/SiteEditor/Inputs/Link';
	import ShortText from '../../../cms/SiteEditor/Inputs/ShortText';

	import Flex from '../atoms/Flex.svelte';
	import Link from '../atoms/Link.svelte';
	import Logo from '../atoms/Logo.svelte';
	import Section from '../atoms/Section.svelte';

	export let blueprint = {
		address: new ShortText('Pfarrer-Grimm-Straße 1'),
		email: new BlueprintLink('sekreteriat@lsg.musin.de', 'mailto:sekreteriat@lsg.musin.de'),
		freeSoftware: new BlueprintLink(
			'Erfahren sie mehr',
			'https://www.gnu.org/philosophy/free-software-even-more-important.de.html'
		),
		github: new BlueprintLink(
			'Der gesamte Quellcode ist auf GitHub einsehbar',
			'https://github.com/lsglab/frontend/'
		),
		legal: new BlueprintLink('Legal Notice'),
		location: new ShortText('80999 München'),
		phone: new ShortText('Telefon: 089 233-64200'),
	};

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
				<p id="{blueprint.address.id}">{blueprint.address.data}</p>
				<p id="{blueprint.location.id}">{blueprint.location.data}</p>
				<p id="{blueprint.phone.id}">{blueprint.phone.data}</p>
				<p>
					Email:
					<Link id="{blueprint.email.id}" href="{blueprint.email.href}" noArrow="true">
						{blueprint.email.data}
					</Link>
				</p>
				<Link noArrow="true" id="{blueprint.legal.id}" href="{blueprint.legal.href}">
					{blueprint.legal.data}
				</Link>
			</Flex>
		</Flex>
		<Flex cols="true" justify="between" align="start" classes="h-40 mb-5">
			<Flex cols="true" align="start">
				<p>
					Diese Webseite ist freie Software.
					<Link href="{blueprint.freeSoftware.href}" id="{blueprint.freeSoftware.id}">
						{blueprint.freeSoftware.data}
					</Link>
				</p>
				<p>
					<Link href="{blueprint.github.id}" id="{blueprint.github.id}">{blueprint.github.data}</Link>
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

<svelte:options accessors="{true}" />
