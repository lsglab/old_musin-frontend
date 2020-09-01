<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';

	import DashBackground from '../components/dashBackground.svelte';

	import { goto } from '@sapper/app';

	async function toStart() {
		await goto('/');
	}

	let stack = error.stack ? true : false;
</script>

<style>
	.wrapper {
		max-width: 1000px;
		margin: auto;
		width: auto;
		margin-top: 60px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 0px 30px 30px;
	}

	/* .background{
		background: #f6f9fc;
		width: 100%;
		height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
	} */

	.stack {
		max-width: unset;
	}

	.card {
		margin-top: 180px;
		width: auto;
		min-width: 400px;
		min-height: 300px;
		box-shadow: 0 5px 5px 0 rgba(154, 160, 185, 0.05), 0 5px 30px 0 rgba(166, 173, 201, 0.22);
		margin-left: -90px;
		font-family: Open Sans, Segoe UI, sans-serif;
		background-color: white;
		z-index: 2;
		border-radius: 20px;
	}

	.wrap-content {
		margin: 50px 20px 50px 80px;
	}
	.card h2 {
		font-size: 2.5em;
		color: var(--big-header);
	}

	h1 {
		font-size: 15em;
		font-weight: 700;
		color: white;
		-webkit-text-stroke: 2px black;
		z-index: 3;
		margin: 0px;
	}

	button {
		margin-top: 40px;
		width: 250px;
		height: 40px;
	}

	@media (max-width: 810px) {
		.wrapper {
			flex-direction: column;
			padding: 30px 20px;
		}
		.card {
			min-width: unset;
			margin: 0;
			margin-top: 100px;
		}
		.wrap-content {
			margin: 20px;
		}
		h1 {
			font-size: 35vw;
			text-align: center;
			width: auto;
		}
	}

	@media (max-width: 400px) {
		button {
			width: 100%;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="wrapper" class:stack>
	<h1>{status}</h1>

	<div class="card">
		<div class="wrap-content">
			<h2>{status == '404' ? 'Seite nicht gefunden' : error.message}</h2>
			{#if (dev && error.stack) || status == '404'}
				{#if status == '404'}
					<p>
						Günde dafür könnten sein, dass Sie eine falsche oder veraltete URL
						aufgerufen haben - bitte überprüfen Sie diese noch einmal. Oder aber wir
						haben die betreffende Seite archiviert, verschoben oder umbennant.
					</p>
					<p>
						Vielleicht können Sie den von ihnen gewünscheten Inhalt über unsere
						Startseite finden
					</p>
				{:else}
					<pre>{error.stack}</pre>
				{/if}
			{/if}
			<div class="btn-wrap"><button on:click="{toStart}">Zur Startseite</button></div>
		</div>
	</div>
</div>
<!-- <div class = "background"></div> -->
<DashBackground />
