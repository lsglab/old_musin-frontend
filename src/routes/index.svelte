<script>
    import {onMount} from "svelte";
    //moved DashBackground in an reusable component that can take a customHeight
    import DashBackground from "../components/dashBackground.svelte";
    import Home from "../components/home.svelte"

    function jump(h){
        var url = location.href;               //Save down the URL without hash.
        location.href = "#"+h;                 //Go to the target element.
        history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
        console.log("working");
    }

    let backgroundHeight = 0;
    function calculateBackgroundHeight() {
        var body = document.body,
            html = document.documentElement;
        backgroundHeight = Math.max( body.scrollHeight, body.offsetHeight,
                               html.clientHeight, html.scrollHeight, html.offsetHeight);
        console.log(backgroundHeight);
    }
    function recalculateHeight() {
        backgroundHeight = 0;
        setTimeout(() => calculateBackgroundHeight(), 100);
    }
    onMount(() => {
        calculateBackgroundHeight();
    });

</script>
<svelte:head>
	<title>Home - Louise Schroeder Gymnasium</title>
</svelte:head>

<!--The plain text is going to be replaced with the content fetched from the database later on-->
<Home mainHeader="Städtisches Louise Schroeder Gymnasium München" subHeader="Naturwissenschaftlich-technologisches und sprachliches Gymnasium." 
buttonText="Aktuelle Termine" buttonJump = "termine" 
desc="Referenzschule der TU München" mainImage="https://lsg.musin.de/homepage/images/header-images/schulhof_mini.jpg"
awards={["https://lsg.musin.de/homepage/images/LOGOsorsmc_SCREEN_80mm_RGB_mini.jpg","https://lsg.musin.de/homepage/images/delf.jpg",
"https://lsg.musin.de/homepage/images/cae.png","https://lsg.musin.de/homepage/images/cils.png",
"https://lsg.musin.de/homepage/images/KombiLogo.png"]}
></Home>
<div class="appointment-section" id="termine">
    <h1>Aktuelle Termine</h1>
    <p>Alle demnächst anstehende Termine des Louise-Schroeder-Gymnasiums:</p>
    <div class="appointments">
        <ul>
            <li>
                <div class="time">
                    <span style="font-weight: normal; color: #667">Uhrzeit</span>
                </div>
                <div class="date" style="align-items: left;color: #667">
                    Datum
                </div>
                <div class="content" style="justify-content: left;color: #667">
                    Inhalt
                </div>
            </li>
            <li>
                <div class="time">
                    <span>9:00</span>
                    <span>9:30</span>
                </div>
                <div class="date">
                    13.08.2020
                </div>
                <div class="content">
                    Einsichtnahme in die korrigierten schriftlichen Abituraufgaben unter Aufsicht
                </div>
            </li>
            <li>
                <div class="time">
                    <span>----</span>
                </div>
                <div class="date">
                    24.07.2020
                </div>
                <div class="content">
                    Q11/2: Vollversammlung: mit Zeugnisausgabe (ausgenommen Ersatzprüflinge)
                </div>
            </li>
            <li>
                <div class="time">
                    <span>----</span>
                </div>
                <div class="date">
                    24.07.2020
                </div>
                <div class="content">
                    05-10: Ausgabe der Jahreszeugnisse (ausgenommen Ersatzprüflinge)
                </div>
            </li>
            <li>
                <div class="time">
                    <span>10:00</span>
                </div>
                <div class="date">
                    24.07.2020
                </div>
                <div class="content">
                    Termin für die schriftliche Abmeldung von der Schule bei Schulwechsel oder Übertritt ins Berufsleben
                </div>
            </li>
            <li>
                <div class="time">
                    <span>10:00</span>
                </div>
                <div class="date">
                    24.07.2020
                </div>
                <div class="content">
                    Termin für die schriftliche Abmeldung vom Religionsunterricht, um am Ethikunterricht teilnehmen zu können.
                </div>
            </li>
        </ul>
    </div>
    <a href="#" style="margin-top: 30px;font-size: 18px;margin-bottom: 50px;">Zu allen Terminen</a>
</div>
<DashBackground customHeight="{backgroundHeight}px"></DashBackground>
<svelte:window on:resize={recalculateHeight}/>

<style>



* {
    box-sizing: border-box;
    scroll-behavior: smooth;
}

*:focus {
    outline: none;
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
    font-family: Open Sans,Segoe UI,sans-serif;
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
    font-family: Open Sans,Segoe UI,sans-serif;
    z-index: 999;
    padding: 0 20px;
}
.appointments {
    width: 80%;
    max-width: 1000px;
    height: auto;
    background: white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
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
    border-bottom: 1px solid rgba(0,0,0,0.1);
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
    transition: .3s;
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
}
</style>
