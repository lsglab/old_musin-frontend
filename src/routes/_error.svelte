<script>
	import Button from '../components/atoms/Button.svelte';
	import DashBackground from '../components/atoms/DashBackground.svelte';
	import Flex from '../components/atoms/Flex.svelte';
	import Section from '../components/atoms/Section.svelte';

	export let error;
	export let status;

	const stack = error.stack;
</script>

<style>
	.h1 {
		font-size: 11rem;
		word-break: keep-all;
		-webkit-text-stroke: 2px black;
	}

	.card {
		border-radius: 15px;
	}

	.stack {
		@apply flex-wrap;
	}

	p {
		@apply lg:text-sm;
	}
</style>

<svelte:head>
	<title>{status} | {process.globals.title}</title>
</svelte:head>

<Section fullscreen="true">
	<Flex justify="center" align="center">
		<div class="flex flex-wrap items-center justify-center py-5 lg:flex-nowrap" class:stack>
			<h1 class="z-20 hidden mb-20 text-white lg:mb-0 lg:-mt-48 sm:block h1">{status}</h1>

			<div class="z-10 h-auto mt-0 bg-white shadow-equal lg:-ml-6 card">
				<div class="m-5 lg:ml-10">
					<h3 class="font-normal">{status === 404 ? 'Seite nicht gefunden' : error.message}</h3>
					<div class="my-5">
						{#if error.stack || status === 404}
							{#if status === 404}
								<div>
									<p>
										Gründe dafür könnten sein, dass Sie eine falsche oder veraltete URL aufgerufen
										haben - bitte überprüfen Sie diese noch einmal. Oder aber wir haben die
										betreffende Seite archiviert, verschoben oder umbennant.
									</p>
									<p>
										Vielleicht können Sie den von ihnen gewünscheten Inhalt über unsere Startseite
										finden
									</p>
								</div>
							{:else}
								<pre>{error.stack}</pre>
							{/if}
						{/if}
					</div>
					<Button buttonText="Zur Startseite" href="/" />
				</div>
			</div>
		</div>
	</Flex>
</Section>
<DashBackground />
