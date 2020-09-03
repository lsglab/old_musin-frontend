<script>
	import DashBackground from '../components/dashBackground.svelte';
</script>

<svelte:head>
	<title>Louise Schroeder Gymnasium | Startseite</title>
</svelte:head>

<div class="wrapper">
	<header>
		<div class="left">
			<div>
				<h1>Städtisches Louise Schroeder Gymnasium München</h1>
				<h3>Naturwissenschaftlich-technologisches <br /> und sprachliches Gymnasium.</h3>
				<button>Aktuelle Termine</button>
				<p>Referenzschule der TU München</p>
			</div>
		</div>
		<div class="right">
			<div class="image">
				<img
					src="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
					alt="" />
			</div>
		</div>
	</header>
	<div class="awards" id="logo-section">
		<img
			class="logo"
			src="https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg"
			alt="" />
		<img class="logo" src="https://lsg.musin.de/homepage/images/delf.jpg" alt="" />
		<img class="logo" src="https://lsg.musin.de/homepage/images/cae.png" alt="" />
		<img class="logo" src="https://lsg.musin.de/homepage/images/cils.png" alt="" />
		<img class="logo" src="https://lsg.musin.de/homepage/images/KombiLogo.png" alt="" />
	</div>
</div>
<div class="appointment-section" id="termine">
	<h1>Aktuelle Termine</h1>
	<p>Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums:</p>
	<div class="appointments">
		<ul>
			<li>
				<div class="time"><span style="font-weight: 400; color: #667">Uhrzeit</span></div>
				<div class="date" style="align-items: left;color: #667">Datum</div>
				<div class="content" style="justify-content: left;color: #667">Inhalt</div>
			</li>
			<li>
				<div class="time"><span>9:00</span> <span>9:30</span></div>
				<div class="date">13.08.2020</div>
				<div class="content">
					Einsichtnahme in die korrigierten schriftlichen Abituraufgaben unter Aufsicht
				</div>
			</li>
			<li>
				<div class="time"><span>----</span></div>
				<div class="date">24.07.2020</div>
				<div class="content">
					Q11/2: Vollversammlung: mit Zeugnisausgabe (ausgenommen Ersatzprüflinge)
				</div>
			</li>
			<li>
				<div class="time"><span>----</span></div>
				<div class="date">24.07.2020</div>
				<div class="content">
					05-10: Ausgabe der Jahreszeugnisse (ausgenommen Ersatzprüflinge)
				</div>
			</li>
			<li>
				<div class="time"><span>10:00</span></div>
				<div class="date">24.07.2020</div>
				<div class="content">
					Termin für die schriftliche Abmeldung von der Schule bei Schulwechsel oder
					Übertritt ins Berufsleben
				</div>
			</li>
			<li>
				<div class="time"><span>10:00</span></div>
				<div class="date">24.07.2020</div>
				<div class="content">
					Termin für die schriftliche Abmeldung vom Religionsunterricht, um am
					Ethikunterricht teilnehmen zu können.
				</div>
			</li>
		</ul>
	</div>
	<a style="margin-top: 30px;font-size: 18px;margin-bottom: 50px;" href>Zu allen Terminen</a>
</div>
