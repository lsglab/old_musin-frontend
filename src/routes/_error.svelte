<script>
	import Button from '../components/common/Button.svelte';
	import DashBackground from '../components/DashBackground.svelte';
	import Section from '../components/Section.svelte';

	export let error;
	export let status;

	const stack = error.stack;
</script>

<style>
	.h1 {
		font-size: 14rem;
		word-break: keep-all;
		-webkit-text-stroke: 2px black;
	}

	.card {
		border-radius: 15px;
	}

	.stack {
		@apply flex-wrap;
	}
</style>

<svelte:head>
	<title>{status} | {process.globals.title}</title>
</svelte:head>

<Section fullscreen="true">
	<div
		class="flex flex-wrap items-center justify-center p-5 m-auto md:p-10 lg:p-20 xl:p-20 lg:flex-no-wrap xl:flex-no-wrap"
		class:stack>
		<h1 class="z-20 text-white {!stack ? 'lg:-mt-48' : ''} h1">{status}</h1>

		<div class="z-10 h-auto mt-10 bg-white shadow-2xl md:-ml-6 card">
			<div class="m-5 ml-10">
				<h2>{status === 404 ? 'Seite nicht gefunden' : error.message}</h2>
				<div class="my-6">
					{#if error.stack || status === 404}
						{#if status === 404}
							<div>
								<p>
									Gründe dafür könnten sein, dass Sie eine falsche oder veraltete URL aufgerufen haben
									- bitte überprüfen Sie diese noch einmal. Oder aber wir haben die betreffende Seite
									archiviert, verschoben oder umbennant.
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
				<div class="btn-wrap">
					<Button buttonText="Zur Startseite" link="true" href="/" />
				</div>
			</div>
		</div>
	</div>
</Section>
<DashBackground />
