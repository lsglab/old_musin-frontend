<script>
	import Awards from '../components/Awards.svelte';
	import Calender from '../components/Calender.svelte';
	import Section from '../components/Section.svelte';
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
					<h1 class="break-normal text-heading text-3xl" style="line-height: 52px;">
						Städtisches Louise Schroeder Gymnasium München
					</h1>
					<h3 class="my-4 text-xl" style="font-weight: 900; line-height: 30px;">
						Naturwissenschaftlich-technologisches<br />und sprachliches Gymnasium.
					</h3>
					<button
						class="text-white border-none cursor-pointer bg-btnBlue"
						style="height: 40px; width: 250px; border-radius: 10px; font-size: 14px;">Aktuelle Termine</button>
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
<div
	class="flex flex-col items-center justify-center w-full h-full bg-white appointment-section"
	style="min-height: 80vh; z-index: -1;"
	id="termine">
	<div class="flex flex-col items-center w-full">
		<h1
			class="font-bold text-center text-heading2"
			style="font-size: 45px; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 99;">
			Aktuelle Termine
		</h1>
		<p
			class="mt-0 font-hairline text-center text-purpleAccent"
			style="font-size: 24px; line-height: 40px; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 999; padding: 0 20px;margin-top: 10px;">
			Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums:
		</p>
		<Calender />
		<a href="/termine" style="margin-top: 10px;font-size: 18px;" class="text-sm">Zu allen Terminen</a>
	</div>
</div>
