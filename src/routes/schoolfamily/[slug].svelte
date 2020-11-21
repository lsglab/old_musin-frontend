<script>
	import Card from '../../components/common/Card.svelte';
	import DashBackground from '../../components/DashBackground.svelte';
	import Flex from '../../components/common/Flex.svelte';
	import SectionWrapper from '../../components/sectionWrapper.svelte';
</script>

<style>
	.body:hover {
		width: 102%;
	}
</style>

<svelte:head>
	<title>{process.title} Schulleitung</title>
</svelte:head>
<SectionWrapper header="Schulfamilie" subHeader="Louise-Schroeder-Gymnasium">
	<Flex justify="evenly" wrap="true" align="center" classes="h-full w-full">
		<Card
			classes="h-80 w-48 cursor-pointer z-50 m-4"
			link="https://lsg.musin.de/homepage/19-menschen/55-steckbrief-herr-laslop">
			<div slot="body" class="w-full overflow-hidden h-8/10">
				<img
					class="object-cover w-full h-full"
					src="https://lsg.musin.de/homepage/images/LSG/Menschen/Schulleitung/fraukarg.jpg"
					alt="" />
			</div>
			<div slot="footer" class="h-2/10">
				<Flex align="center" classes="relative h-full bg-white rounded-tr-sm">
					<Flex justify="center" align="center" classes="h-full">
						<div class="mx-2 border-2 border-blue-400 h-7/10"></div>
					</Flex>
					<div>
						<p>Frau Karg</p>
						<p class="text-xs">Ständige Vertreterin</p>
					</div>
				</Flex>
			</div>
		</Card>
		<Card
			classes="h-80 w-48 cursor-pointer z-50 m-4"
			link="https://lsg.musin.de/homepage/19-menschen/57-steckbrief-frau-karg">
			<div slot="body" class="w-full overflow-hidden h-8/10">
				<img
					class="object-cover w-full h-full"
					src="https://lsg.musin.de/homepage/images/LSG/Menschen/Schulleitung/herrlaslop7.jpg"
					alt="" />
			</div>
			<div slot="footer" class="h-2/10">
				<Flex align="center" classes="relative h-full bg-white rounded-tr-sm">
					<Flex justify="center" align="center" classes="h-full">
						<div class="mx-2 border-2 border-blue-400 h-7/10"></div>
					</Flex>
					<div>
						<p>Herr Laslop</p>
						<p class="text-xs">Schulleiter</p>
					</div>
				</Flex>
			</div>
		</Card>
	</Flex>
</SectionWrapper>
<DashBackground />
