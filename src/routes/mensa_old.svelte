<script>
    import DashBackground from "../components/dashBackground.svelte";
</script>


<svelte:head>
	<title>Mensa</title>
</svelte:head>

<div class="info-section">
    <div class="card-wrapper">
        <h1>Speiseplan der Woche</h1>
        <div class="card">
            <div id="left">
            </div>
        </div>
    </div>
    <div class="card-wrapper">
        <h1>Mensa Kräutergarten</h1>
        <div class="card">
            <div id="right">
            </div>
        </div>
    </div>
</div>
<DashBackground></DashBackground>

<style>

    .info-section{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0 15vw;
        font-family: Open Sans,Segoe UI,sans-serif;
    }

    .card-wrapper{
        min-width: 500px;
        margin: 10px;
        width: 48%;
        z-index: 2;
        margin: auto;
    }


    .card-wrapper h1{
        color: var(--mid-header);
        text-align: center;
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
        border-radius: 20px;
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
        height: 105%;
        cursor: pointer;
    }

    @media(max-width: 1428px){
        .card{
            width: 100%;
            max-width: 700px;
            min-width: unset;
            margin: auto;
        }
    }


</style>