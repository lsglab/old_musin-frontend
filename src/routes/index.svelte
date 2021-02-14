<script>
	import Awards from '../components/Awards.svelte';
	import Button from '../components/common/Button.svelte';
	import Calender from '../components/Calender.svelte';
	import Section from '../components/Section.svelte';
	import SectionWrapper from '../components/sectionWrapper.svelte';
</script>

<style lang="scss">
	* {
		word-break: normal;
	}

	.school-img {
		background-image: resolve('bg.jpg');
		border-radius: 0.75rem;
	}
</style>

<svelte:head>
	<title>Startseite | {process.globals.title}</title>
</svelte:head>

<div class="" style="background: #f6f9fc;margin-top: -80px;">
	<Section>
		<header class="flex flex-no-wrap justify-between w-full" style="min-height: 80vh; padding-top: 40px;">
			<div class="z-10 flex flex-col items-center justify-center w-1/2">
				<div class="m-12 ml-0 mr-24" style="max-width: 500px">
					<h1 class="text-3xl break-normal text-heading" style="line-height: 52px;">
						Städtisches Louise Schroeder Gymnasium München
					</h1>
					<h3 class="my-4 text-xl" style="font-weight: 900; line-height: 30px;">
						Naturwissenschaftlich-technologisches<br />und sprachliches Gymnasium.
					</h3>
					<Button buttonText="Aktuelle Termine" href="#termine" classes="w-40" />
					<p style="margin-top: 40px; font-size: 14px" class="text-gray-700">Referenzschule der TU München</p>
				</div>
			</div>
			<div class="z-10 flex flex-col items-center justify-center w-full">
				<div class="w-full" style="padding: 10vh 0;height:85vh;">
					<img class="w-full h-full bg-cover shadow-lg school-img" alt="" />
				</div>
			</div>
		</header>
	</Section>

	<Awards />
</div>
<SectionWrapper
	header="Aktuelle Termine"
	subHeader="Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums"
	linkText="Zu allen Terminen"
	href="/termine"
	id="termine">
	<Calender />
</SectionWrapper>
