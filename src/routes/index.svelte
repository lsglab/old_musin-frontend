<script>
	import DashBackground from '../components/dashBackground.svelte';
</script>

<style>
	* {
		box-sizing: border-box;
		scroll-behavior: smooth;
	}
	*:focus {
		outline: none;
	}
	.wrapper {
		background: #f6f9fc;
		margin-top: -80px;
	}

	/*** Header ***/
	header {
		width: 100%;
		min-height: calc(100vh - 90px);
		display: flex;
		flex-wrap: nowrap;
		padding: 0 15vw;
		padding-top: 40px;
		justify-content: space-between;
	}

	header > div {
		display: flex;
		align-items: center;
		justify-content: safe center;
		flex-direction: column;
		width: 50%;
		z-index: 99;
	}

	/* header > .left {
    width: 400px;
}

header > .right {
    width: 400px;
} */

	header > .right > div > img {
		width: 100%;
		border-radius: 10px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
		max-height: 60vh;
		object-fit: cover;
	}
	header > .right {
		width: 100%;
	}

	header > .left {
		width: auto;
	}

	header > .left > div {
		margin: 50px;
		margin-right: 80px;
		max-width: 500px;
		margin-left: 0;
	}

	header > .left h1 {
		font-size: 45px;
		line-height: 48px;
		color: var(--big-header);
	}

	header > .left h3 {
		font-weight: 500;
		font-size: 20px;
	}

	header > .left button {
		height: 40px;
		width: 250px;
	}

	header > .left p {
		margin-top: 40px;
		color: var(--ligt-text);
		font-size: 14px;
	}

	/*** Awards ***/
	.awards {
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 15vw;
		padding-bottom: 30px;
		position: relative;
	}

	.awards > img {
		height: 60px;
		filter: grayscale(1);
		mix-blend-mode: multiply;
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

	.appointment-section {
		width: 100%;
		height: auto;
		min-height: 80vh;
		background: white;
		z-index: -1;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.appointment-section > h1 {
		margin-top: 80px;
		font-size: 45px;
		color: var(--mid-header);
		font-weight: bold;
		font-family: Open Sans, Segoe UI, sans-serif;
		z-index: 999;
		text-align: center;
	}
	.appointment-section > p {
		font-size: 24px;
		font-weight: 100;
		line-height: 40px;
		text-align: center;
		color: var(--small-header);
		margin-top: 0;
		font-family: Open Sans, Segoe UI, sans-serif;
		z-index: 999;
		padding: 0 20px;
	}
	.appointments {
		width: 80%;
		max-width: 1000px;
		height: auto;
		background: white;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		margin-top: 20px;
		z-index: 999;
	}
	.appointments > ul {
		width: 100%;
		height: 100%;
		list-style: none;
		margin-left: 0;
		padding-left: 0;
		margin: 0;
	}
	.appointments > ul > li {
		width: 100%;
		min-height: 50px;
		margin-left: 0;
		padding-left: 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		flex-wrap: nowrap;
	}
	.appointments > ul > li:last-child {
		border-bottom: none;
	}
	.appointments > ul > li:first-child {
		background: #fafbff;
	}
	.appointments .time {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 100px;
		padding: 20px;
	}
	.appointments .time > span:first-child {
		font-weight: bold;
	}

	.appointments .date {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 100px;
	}

	.appointments .content {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 20px;
		font-weight: 500;
	}

	/***
 * Link style
***/
	a {
		text-decoration: none;
		color: var(--link);
		transform: translateX(-20px);
		text-decoration: none;
		z-index: 99;
	}
	a::after {
		content: '>';
		font-weight: bold;
		position: absolute;
		right: -20px;
		top: 1px;
		transition: 0.3s;
	}
	a:hover::after {
		right: -25px;
	}

	/* Responsive */
	@media screen and (max-width: 1050px) {
		nav {
			padding: 0;
			justify-content: space-around;
		}

		header {
			padding: 0 75px;
		}
	}
	@media screen and (max-width: 810px) {
		nav > ul {
			display: none;
		}
		.menuCard {
			left: -300px !important;
			opacity: 0 !important;
			pointer-events: none !important;
		}
		header {
			flex-wrap: wrap;
		}
		.left {
			margin-top: 30px;
		}
		.awards {
			margin-top: 30px;
			justify-content: center;
		}
		.awards > img {
			margin: 20px;
		}
		.left > div {
			margin-right: 0 !important;
		}
	}

	@media screen and (min-width: 811px) {
		.burger-wrp {
			display: none;
		}
		.res-menu {
			opacity: 0 !important;
			pointer-events: none !important;
		}
	}
	@media screen and (max-width: 440px) {
		#termine > p {
			font-size: 24px;
		}
		.appointments {
			width: 100%;
		}

		.appointments > ul > li {
			flex-wrap: wrap;
		}
		.time {
			align-items: start !important;
		}
		header {
			padding: 0 20px;
		}
	}
</style>

<svelte:head>
	<title>Louise Schroeder Gymnasium | Startseite</title>
</svelte:head>

<div class="wrapper">
	<header>
		<div class="left">
			<div>
				<h1>Städtisches Louise Schroeder Gymnasium München</h1>
				<h3>Naturwissenschaftlich-technologisches <br /> und sprachliches Gymnasium.</h3>
				<button on:click="{() => jump('termine')}">Aktuelle Termine</button>
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
				<div class="time">
					<span style="font-weight: normal; color: #667">Uhrzeit</span>
				</div>
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
	<a href="#" style="margin-top: 30px;font-size: 18px;margin-bottom: 50px;">Zu allen Terminen</a>
</div>
