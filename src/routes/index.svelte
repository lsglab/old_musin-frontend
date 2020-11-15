<style>
	* {
		word-break: normal;
	}

	.awards::before {
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		top: -20px;
		left: 0;
		background: linear-gradient(
			90deg,
			rgba(66, 71, 112, 0.09),
			rgba(66, 71, 112, 0.09) 50%,
			transparent 0,
			transparent
		);
		background-size: 8px 1px;
	}
</style>

<svelte:head>
	<title>Startseite | {process.globals.title}</title>
</svelte:head>

<div class="" style="background: #f6f9fc;margin-top: -80px;">
	<header
		class="w-full flex flex-no-wrap justify-between"
		style="min-height: calc(100vh - 90px); padding: 0 15vw; padding-top: 40px;">
		<div class="flex w-auto items-center justify-center flex-col w-1/2 z-10">
			<div class="m-12 mr-24 ml-0" style="max-width: 500px">
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
		<div class="w-full flex items-center justify-center flex-col z-10">
			<div>
				<img
					class="w-full rounded-lg shadow-lg"
					src="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
					alt="" />
			</div>
		</div>
	</header>
	<div
		class="awards w-full flex h-auto flex-wrap justify-between relative"
		id="logo-section"
		style="padding: 0 15vw; padding-bottom: 30px;">
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/delf.jpg"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/cae.png"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/cils.png"
			alt="" />
		<img
			class="logo"
			style="height: 60px; filter: grayscale(1); mix-blend-mode: multiply;"
			src="https://lsg.musin.de/homepage/images/KombiLogo.png"
			alt="" />
	</div>
</div>
<div
	class="appointment-section w-full h-auto bg-white flex items-center flex-col"
	style="min-height: 80vh; z-index: -1;"
	id="termine">
	<h1
		class="text-center font-bold"
		style="margin-top: 80px; font-size: 45px; color: #336; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 99;">
		Aktuelle Termine
	</h1>
	<p
		class="font-hairline text-center mt-0"
		style="font-size: 24px; line-height: 40px; color: #447; font-family: 'Open Sans', 'Segoe UI', sans-serif; z-index: 999; padding: 0 20px;">
		Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums:
	</p>
	<div
		class="appointments h-auto bg-white"
		style="width: 80%; max-width: 1000px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); border-radius: 10px; margin-top: 40px; z-index: 999;">
		<ul class="w-full h-full list-none pl-0 m-0">
			<li
				class="w-full ml-0 pl-0 flex flex-no-wrap"
				style="background: #fafbff; min-height: 50px; border-bottom: 1px solid rgba(0,0,0,0.1);">
				<div class="time flex flex-col items-center justify-center" style="min-width: 100px; padding: 20px;">
					<span class="font-normal" style="font-size: 16px; color: #667">Uhrzeit</span>
				</div>
				<div
					class="date flex items-start font-medium"
					style="min-width: 120px; font-size: 16px; color: #667; padding: 20px;">
					Datum
				</div>
				<div
					class="content flex align-center w-full justify-start font-medium"
					style="font-size: 16px;color: #667; padding: 20px;">
					Inhalt
				</div>
			</li>
			<li
				class="ml-0 w-full flex flex-no-wrap pl-0"
				style="min-height: 50px; border-bottom: 1px solid rgba(0,0,0,0.1);">
				<div
					class="time text-base flex flex-col items-center justify-center"
					style="min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">9:00</span>
					<span style="font-size: 16px;">9:30</span>
				</div>
				<div
					class="date text-base flex items-start font-medium"
					style="font-size: 16px;color: #667; width: 130px; padding: 20px;">
					13.08.2020
				</div>
				<div
					class="content text-base flex align-center justify-start w-full font-medium"
					style="font-size: 16px;color: #667; padding: 20px;">
					Einsichtnahme in die korrigierten schriftlichen Abituraufgaben unter Aufsicht
				</div>
			</li>
			<li
				class="w-full ml-0 pl-0 flex flex-no-wrap"
				style="min-height: 50px; border-bottom: 1px solid rgba(0,0,0,0.1);">
				<div
					class="time flex flex-col items-center justify-center"
					style="font-size: 16px; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">----</span>
				</div>
				<div
					class="date text-base flex items-start font-medium"
					style="font-size: 16px;color: #667; width: 130px; padding: 20px;">
					24.07.2020
				</div>
				<div
					class="content text-base flex align-center justify-start w-full font-medium"
					style="font-size: 16px;color: #667; padding: 20px;">
					Q11/2: Vollversammlung: mit Zeugnisausgabe (ausgenommen Ersatzprüflinge)
				</div>
			</li>
			<li
				class="w-full ml-0 pl-0 flex flex-no-wrap"
				style="min-height: 50px; border-bottom: 1px solid rgba(0,0,0,0.1);">
				<div
					class="time flex flex-col items-center justify-center"
					style="font-size: 16px; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">----</span>
				</div>
				<div
					class="date text-base flex items-start font-medium"
					style="font-size: 16px;color: #667; width: 130px; padding: 20px;">
					24.07.2020
				</div>
				<div
					class="content text-base flex align-center justify-start w-full font-medium"
					style="font-size: 16px;color: #667; padding: 20px;">
					05-10: Ausgabe der Jahreszeugnisse (ausgenommen Ersatzprüflinge)
				</div>
			</li>
			<li
				class="w-full ml-0 pl-0 flex flex-no-wrap"
				style="min-height: 50px; border-bottom: 1px solid rgba(0,0,0,0.1);">
				<div
					class="time flex flex-col items-center justify-center"
					style="font-size: 16px; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">10:00</span>
				</div>
				<div
					class="date text-base flex items-start font-medium"
					style="font-size: 16px;color: #667; width: 130px; padding: 20px;">
					24.07.2020
				</div>
				<div
					class="content text-base flex align-center justify-start w-full font-medium"
					style="font-size: 16px;color: #667; padding: 20px;">
					Termin für die schriftliche Abmeldung von der Schule bei Schulwechsel oder Übertritt ins Berufsleben
				</div>
			</li>
			<li
				class="w-full ml-0 pl-0 flex flex-no-wrap"
				style="min-height: 50px; border-bottom: 1px solid rgba(0,0,0,0.1);">
				<div
					class="time flex flex-col items-center justify-center"
					style="font-size: 16px; min-width: 100px; padding: 20px;">
					<span style="font-size: 16px;">10:00</span>
				</div>
				<div
					class="date text-base flex items-start font-medium"
					style="font-size: 16px;color: #667; width: 130px; padding: 20px;">
					24.07.2020
				</div>
				<div
					class="content text-base flex align-center justify-start w-full font-medium"
					style="font-size: 16px;color: #667; padding: 20px;">
					Termin für die schriftliche Abmeldung vom Religionsunterricht, um am Ethikunterricht teilnehmen zu
					können.
				</div>
			</li>
		</ul>
	</div>
	<a href="/termine" style="margin-top: 30px;font-size: 18px;margin-bottom: 50px;">Zu allen Terminen</a>
</div>
