<script>
	import Card from '../../components/common/Card.svelte';
	import Flex from '../../components/common/Flex.svelte';

	export let title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<h4 align="center" class="mb-2">{title} | {process.globals.title}</h4>
<Flex wrap="true" justify="center" align="center" classes="px-2 gap-4">
	<Card>
		<div slot="body" class="profile-card rounded-md bg-gray-400">
			<Flex
				cols="true"
				wrap="true"
				justify="evenly"
				align="left"
				classes="p-2 w-full h-full text-justify rounded overflow-hidden">
				<img class="w-40 pb-2" src="lsg.png" alt="" />
				<div class="font-bold text-lg">Herr Laslop</div>
				<div class="font-bold">Schulleiter</div>
			</Flex>
		</div>
		<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
	</Card>
	<Card>
		<div slot="body" class="profile-card rounded-md bg-gray-400">
			<Flex
				cols="true"
				wrap="true"
				justify="evenly"
				align="left"
				classes="p-2 w-full h-full text-justify rounded overflow-hidden">
				<img class="w-40 pb-2" src="lsg.png" alt="" />
				<div class="font-bold text-lg">Frau Karg</div>
				<div class="font-bold">Ständige Vertreterin</div>
			</Flex>
		</div>
		<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
	</Card>
	<Card>
		<div slot="body" class="profile-card rounded-md bg-gray-400">
			<Flex
				cols="true"
				wrap="true"
				justify="evenly"
				align="left"
				classes="p-2 w-full h-full text-justify rounded overflow-hidden">
				<img class="w-40 pb-2" src="lsg.png" alt="" />
				<div class="font-bold text-lg">Frau Scherff</div>
				<div class="font-bold">Mitarbeiterin</div>
			</Flex>
		</div>
		<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
	</Card>
	<Card>
		<div slot="body" class="profile-card rounded-md bg-gray-400">
			<Flex
				cols="true"
				wrap="true"
				justify="evenly"
				align="left"
				classes="p-2 w-full h-full text-justify rounded overflow-hidden">
				<img class="w-40 pb-2" src="lsg.png" alt="" />
				<div class="font-bold text-lg">Frau Büchler</div>
				<div class="font-bold">Mitarbeiterin</div>
			</Flex>
		</div>
		<div slot="footer" class="my-2 border-b-2 border-gray-500 border-dotted"></div>
	</Card>
</Flex>
