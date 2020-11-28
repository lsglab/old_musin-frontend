<script>
	import Awards from '../components/Awards.svelte';
	import Calender from '../components/Calender.svelte';
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
	<header
		class="flex flex-no-wrap justify-between w-full"
		style="min-height: 100vh; padding: 0 15vw; padding-top: 40px;">
		<div class="z-10 flex flex-col items-center justify-center w-1/2">
			<div class="m-12 ml-0 mr-24" style="max-width: 500px">
				<h1 class="break-normal" style="font-size: 45px; line-height: 48px; color: #0a2540;">
					Städtisches Louise Schroeder Gymnasium München
				</h1>
				<h3 class="my-4" style="font-weight: 900; font-size: 20px; line-height: 26px;">
					Naturwissenschaftlich-technologisches<br />und sprachliches Gymnasium.
				</h3>
				<button
					class="text-white border-none cursor-pointer"
					style="height: 40px; width: 250px; background: rgb(0, 119, 255); border-radius: 10px; font-size: 14px;">Aktuelle
					Termine</button>
				<p style="margin-top: 40px; color: #778; font-size: 14px">Referenzschule der TU München</p>
			</div>
		</div>
		<div class="z-10 flex flex-col items-center justify-center w-full">
			<div class="w-full" style="padding: 10vh 0;height:90vh;">
				<img class="w-full h-full bg-cover shadow-lg school-img" alt="" />
			</div>
		</div>
	</header>
	<Awards />
</div>
<div
	class="flex flex-col items-center justify-center w-full h-full bg-white appointment-section"
	style="min-height: 80vh; z-index: -1;"
	id="termine">
	<div class="flex flex-col items-center w-full">
		<h1
			class="font-bold text-center"
			style="font-size: 45px; color: #336; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 99;">
			Aktuelle Termine
		</h1>
		<p
			class="mt-0 font-hairline text-center"
			style="font-size: 24px; line-height: 40px; color: #447; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 999; padding: 0 20px;margin-top: 10px;">
			Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums:
		</p>
		<Calender />
		<a href="/termine" style="margin-top: 10px;font-size: 18px;">Zu allen Terminen</a>
	</div>
</div>
