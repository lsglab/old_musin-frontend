<script>
	import AboutSection from '../../components/frontend/molecules/aboutSection.svelte';
	import BioCard from '../../components/frontend/molecules/bioCard.svelte';
	import Flex from '../../components/both/atoms/Flex.svelte';
	import StaffCard from '../../components/frontend/molecules/staffCard.svelte';
</script>

<svelte:head>
	<title>{process.globals.title} Schulleitung</title>
</svelte:head>

<AboutSection header="Schulleitung" subHeader="Sample text">
	<Flex cols="true" align="center">
		<BioCard
			title="Herr Laslop"
			description="Schulleiter"
			img="https://lsg.musin.de/homepage/images/LSG/Menschen/Schulleitung/herrlaslop7.jpg"
			bio="<p>Nach meinem Studium der Wirtschaftswissenschaften und des Sports absolvierte ich in Regensburg und Unterschleißheim das Referendariat. Da ich nach dieser Zeit keine dauerhafte Arbeit als Lehrer bekommen konnte, entspricht mein weiterer Werdegang vielleicht nicht ganz dem Bild eines verbeamteten Schulmannes. Ich musste mich umorientieren und erhielt bald die Chance, bei einer großen Stuttgarter Unternehmensberatung einzusteigen. Dort war ich in der Systemanalyse und Konzeption für EDV-Lösungen, EDV-Fortbildungen und in klassischen Beratungsbereichen wie der Kosten- und Leistungsrechnung tätig. Ein völlig unerwartetes Angebot der Stadt München wieder als Lehrer zu arbeiten, stellte mich vor eine schwierige Entscheidung. Mit einem lachenden und weinenden Auge zog es mich nach diesem Abstecher, bei dem ich nicht nur in fachlicher Hinsicht viel gelernt habe, doch wieder in den Schuldienst nach München zurück.</p>
<p>Zunächst war ich hier mehrere Jahre als Lehrer am Heinrich-Heine-Gymnasium tätig und wurde dann in das Schulreferat abgeordnet, wo ich im Rahmen der Verwaltungsreform für das Pilotprojekt „Gymnasien“ und den Haushalt der Münchner Gymnasien verantwortlich war. Als stellvertretender Schulleiter wechselte ich vier Jahre später an das Münchenkolleg, einem Gymnasium für Erwachsene. Im August  des Jahres 2004 wurde mir schließlich die Verantwortung für das Louise-Schroeder-Gymnasium übertragen.</p>
<p>Dem Louise-Schroeder-Gymnasium fühle ich mich schon deshalb verbunden, weil dort viele Aktivitäten stattfinden, die meinen persönlichen Neigungen und Interessen entsprechen. So hat mir als ehemaliger Handballspieler imponiert, dass am LSG so viele Handballmannschaften an Schulsportwettkämpfen teilnehmen, dass das LSG in der Informations- und Kommunikationstechnologie eine Art Vorreiterrolle spielt und last but not least finde ich, der selbst ein musisches Gymnasium besucht hat, die Einrichtung der Bläserklassen am LSG für außergewöhnlich und bewahrenswert.</p>
<p>Auch ich gehe gerne in die Schule. Doch bei aller Spannung, die Schule und Arbeit vermitteln können, finde ich dennoch, dass die Ferien eine der schönsten Einrichtungen an der Schule sind. Ich nutze sie gerne dazu, um diese Zeit meinen beiden Kindern und meiner Frau zu widmen oder zusammen mit einem Freund meinem Hobby zu frönen - große Radtouren in ganz Europa.</p>	" />
		<BioCard
			title="Frau Karg"
			description="Ständige Vertreterin"
			img="https://lsg.musin.de/homepage/images/LSG/Menschen/Schulleitung/fraukarg.jpg"
			bio="<p>Nach meinem Studium der Chemie und Biologie an der Ludwig-Maximilians-Universität war ich im Referendariat in meiner Geburtsstadt Landshut und in Türkheim im Allgäu. Nach einem Jahr an einer Privatschule kam ich 1985 ans Städtische Louise-Schroeder-Gymnasium, dem ich zehn Jahre lang angehörte, bis ich nach einem dreijährigen Erziehungsurlaub ans Städtische St.- Anna-Gymnasium im Münchner Lehel wechselte.</p>
<p>Von Anfang an engagierte ich mich dort besonders im Bereich der Schul - und Unterrichtsentwicklung, entwickelte zusammen mit Kolleginnen und Kollegen Projekte, gehörte dem MODUS-Team an, betreute Praktikanten/innen der TU und der LMU... 2005 wurde ich am SAG Mitglied der Schulleitung und mit allen Facetten der Schulverwaltung vertraut. Ich freue mich ans Louise-Schroeder-Gymnasium zurückkehren zu können, freue mich auf neue Aufgaben und über die Chance zur persönlichen Weiterentwicklung an dieser Schule. Mein besonderes Anliegen ist die Persönlichkeitsentwicklung von Schülerinnen und Schülern durch individuelle Förderung, durch Förderung fachlicher, aber auch durch die Vermittlung sozialer und methodischer Kompetenzen zu begleiten.</p>
<p>Am LSG möchte ich mitwirken die Schule so zu gestalten, dass sie den Anforderungen von Gesellschaft, Wirtschaft und Kultur des 21. Jahrhunderts bzw. der sich kontinuierlich wandelnden Umwelt gerecht wird. Mein Ziel ist es zusammen mit meinen Kolleginnen und Kollegen die Entwicklung der Schülerinnen und Schüler zu verantwortungsbewussten, gegenüber Anderen wertschätzenden, mündigen Menschen zu unterstützen. Privat verbringe ich die Zeit mit meiner Familie, mit meinen beiden Kindern, die studieren und „handballinfiziert“ sind, sodass ein Großteil meiner Freizeit in Handballhallen stattfindet. Als Ausgleich pflege ich unseren Garten und liebe es fremde Länder zu bereisen.</p>" />
	</Flex>
</AboutSection>

<AboutSection
	header="Verwaltung"
	subHeader="Die guten Geister des LSG. Ohne sie und ihre Mitarbeiter hätten wir in der Pause nichts zu essen und unsere handwerklichen, technischen und hungrigen Probleme würden nicht so schnell und freundlich gelöst werden."
	classes="bg-backgroundDark"
	center="true"
	id="custody">
	<Flex classes="w-full my-16 justify-center md:justify-between" wrap="true" align="center">
		<StaffCard
			title="Herr und Frau Niederlöhner"
			description="Hausmeister"
			img="https://lsg.musin.de/homepage/images/LSG/Personal/herrundfrauniederlhner4.jpg" />
		<StaffCard
			title="Frau Gombocz"
			description="Sekreteriat"
			img="https://lsg.musin.de/homepage/images/LSG/Personal/fraugombocz2.jpg" />
		<StaffCard
			title="Frau Diepold"
			description="Sekreteriat"
			img="https://lsg.musin.de/homepage/images/LSG/Personal/fraudiepold3.jpg" />
		<StaffCard
			title="Frau Keller"
			description="Sekreteriat"
			img="https://lsg.musin.de/homepage/images/LSG/Personal/fraukeller2.jpg" />
	</Flex>
</AboutSection>
