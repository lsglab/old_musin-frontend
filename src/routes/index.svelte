<script>
	import Calender from '../components/frontend/molecules/Calender.svelte';
	import Hero from '../components/frontend/organisms/Hero.svelte';
	import SectionWrapper from '../components/frontend/molecules/sectionWrapper.svelte';
</script>

<a href="/auth/login" class="hidden" alt="">d</a>
<Hero
	header="Städtisches Louise Schroeder Gymnasium München"
	subHeader="Naturwissenschaftlich-technologisches und sprachliches Gymnasium."
	note="Referenzschule der TU München"
	img="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
	awards="{['https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg', 'https://lsg.musin.de/homepage/images/cils.png', 'https://lsg.musin.de/homepage/images/cae.png', 'https://lsg.musin.de/homepage/images/delf.jpg']}"
	buttonText="Aktuelle Termine"
	buttonLink="#termine" />
<SectionWrapper
	fullscreen="true"
	header="Aktuelle Termine"
	subHeader="Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums"
	linkText="Zu allen Terminen"
	link="/termine"
	id="termine">
	<Calender classes="w-full" />
</SectionWrapper>
<a href="/cms" style="opacity: 0;position: absolute;pointer-events:none">d</a>
<a href="/auth/login" style="opacity: 0;position: absolute;pointer-events:none">d</a>
