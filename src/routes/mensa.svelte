<script>
    import {onMount} from "svelte";
    //moved DashBackground in an reusable component that can take a customHeight
    import DashBackground from "../components/dashBackground.svelte";
    import Home from "../components/home.svelte"

    function goTo(location){
        window.location.href = location;
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


<Home mainHeader="Mensa" subHeader="im Schulzentrum an der Pfarrer-Grimm-Straße" buttonText="Informationen"
buttonJump = "infos" desc="Die Foto Ag oder auch die Admins müssen dann nen Bild von der Mensa von außen machen, weil so eines noch nicht existiert" 
mainImage="https://www.wipperbuerodesign.de/uploads/images/cafeteria/cafeteria-02.jpg"
awards={["https://lsg.musin.de/homepage/images/Mensa/Mensa-Logo.jpg"]}
></Home>
<div class="info-section" id="infos">
    <h1>Informationen</h1>
    <div>
        <div class="card-wrapper">
            <h2>Speiseplan der Woche</h2>
            <div class="card" on:click="{()=> goTo("https://lsg.musin.de/homepage/images/Mensa/speiseplan.pdf")}">
                <div id="left">
                </div>
            </div>
        </div>
        <div class="card-wrapper">
            <h2>Mensa Kräutergarten</h2>
            <div class="card" on:click="{()=> goTo("https://lsg.musin.de/homepage/9-home/92-kraeutergarten")}">
                <div id="right">
                </div>
            </div>
        </div>
    </div>
    <a href="https://lsg.musin.de/homepage/images/Mensa/aktuelles.pdf" style="margin-top: 40px;font-size: 21px;margin-bottom: 50px; font-family: Arial, sans serif;">Aktuelle Informationen</a>
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

.info-section{
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: Open Sans,Segoe UI,sans-serif;
    margin-bottom: 70px;
    padding: 0 15vw;
}

.info-section > button {
    height: 40px;
    width: 250px;
    margin-top: 40px;
}

.info-section > h1{
    font-size: 45px;
    color: var(--mid-header);
    margin-top: 80px;
}

.info-section > div{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.card-wrapper{
    min-width: 500px;
    margin: 10px;
    width: 48%;
    z-index: 2;
    margin: auto;
}


.card-wrapper > h2{
    color: var(--small-header);
    text-align: center;
    font-size: 27px;
    font-weight: 100;
}

.card{
    width: 100%;
    max-width: 100%;
    z-index: 2;
}

.card > div{
    width: 100%;
    padding-bottom: 56.25%; /**Aspect Ratio**/
    z-index: 2;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    transition: .2s ease;
    background-position: center;
    background-size: cover;
}

#left{
    background-image: url("https://lsg.musin.de/homepage/images/Mensa/_N4O8600_mini.jpg");
}

#right{
    background-image: url("https://lsg.musin.de/homepage/images/Mensa/Artikel-9_mini.jpg");
}

.card div:hover{
    cursor: pointer;
    padding-bottom: 58%;
}

/* Responsive */

@media(max-width: 1428px){
    .card-wrapper{
        width: 100%;
        max-width: 600px;
        min-width: unset;
        margin: auto;
    }
}

@media screen and (max-width: 1050px) {
  nav {
    padding: 0;
    justify-content: space-around;
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
  .info-section{
      margin-bottom: 50px;
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

@media screen and (max-width: 600px){
    .info-section{
        padding: 0 30px;
    }
}

@media screen and (max-width: 440px) {
    .info-section {
        padding: 0 20px;
    }
    .card-wrapper h2{
      font-size: 23px;
    }

    .info-section > h1{
        margin-top: 50px;
        font-size: 39px;
    }
}
</style>
