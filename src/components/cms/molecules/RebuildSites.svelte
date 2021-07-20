<script>
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import Button from '../atoms/Button.svelte';
	import Dialog from '../atoms/Dialog.svelte';
	import Flex from '../../both/atoms/Flex.svelte';
	import ProgressBar from '../atoms/ProgressBar.svelte';
	import request from '../../../cms/Utils/requests';

	export let visible = false;
	export let sites;

	let currentSite;

	let finished = false;

	let progress = 0;
	let progressText = '';

	async function updateFile() {
		const html = document.getElementById('iframe').contentWindow.document.children[0].innerHTML;

		const res = await request(`${process.globals.apiUrl}/sites?id=${currentSite.id}`, 'put', { html }, true);

		if (res.status === 200) {
			return true;
		}

		return false;
	}

	async function buildOneSite(site, i) {
		const baseProgess = 100 / sites.length;
		const partProgress = baseProgess / 2;

		currentSite = site;
		progressText = 'Building site';

		// wait for the site to be loaded
		await new Promise((resolve) => {
			window.document.addEventListener(
				'site_loaded',
				() => {
					resolve();
				},
				false
			);
		});

		progressText = 'Uploading file to server...';
		progress += partProgress;

		const result = await updateFile();

		if (result) {
			progress += partProgress;
		}

		if (i === sites.length - 1) {
			finished = true;
		}
	}

	async function build() {
		if (visible === false) return;

		await tick();

		finished = false;
		progressText = '';
		progress = 0;
		currentSite = undefined;

		for (let i = 0; i < sites.length; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			await buildOneSite(sites[i], i);
		}
	}

	$: build(visible);
</script>

<style lang="scss">
	.notice {
		@apply text-gray-600 text-xss mx-2;
	}
</style>

{#if visible}
	<Dialog
		classes="{!finished ? 'pointer-events-none' : ''}"
		on:close="{() => {
			visible = false;
		}}">
		<div slot="header">
			<p class="font-bold text-xss">Neu generieren...</p>
		</div>
		<div slot="default">
			<Flex justify="center" align="center" cols="true">
				{#if currentSite !== undefined && finished === false}
					<p class="my-2 text-xs font-bold text-black">Building: {currentSite.path}</p>
					<ProgressBar value="{progress}" />
					<p class="notice">{progressText}</p>
					<div class="hidden"><iframe id="iframe" src="/new?site={currentSite.id}" title=""></iframe></div>
				{:else if finished === true}
					<div class="my-5" transition:fade="{{ duration: 100 }}">
						<div
							class="flex flex-row w-20 h-20 mb-5 bg-white border-2 rounded-full border-cmsSuccessGreen circle shadow-cms-equal">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 30 30"
								width="50%"
								height="50%"
								class="m-auto fill-current text-cmsSuccessGreen">
								<path
									stroke-width="4"
									d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
							</svg>
						</div>
						<p class="text-xs font-bold text-center text-cmsSuccessGreen">Completed</p>
					</div>
				{/if}
			</Flex>
		</div>
		<div slot="footer">
			<Flex classes="w-full" justify="end" align="center">
				<Button
					disabled="{!finished}"
					buttonFunction="{() => {
						visible = false;
					}}">
					Schließen
				</Button>
			</Flex>
		</div>
	</Dialog>
{/if}
