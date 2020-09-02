<script>

    function jump(h){
        var url = location.href;               //Save down the URL without hash.
        location.href += "#"+h;                 //Go to the target element.
        history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
    }
    
    export let mainHeader;
    export let subHeader;
    export let buttonText;
    export let buttonJump;
    export let desc;
    export let mainImage;
    export let awards;
</script>

<div class="wrapper">
    <header>
        <div class="left">
            <div>
                <h1>{mainHeader}</h1>
                <h3>{subHeader}</h3>
                <button on:click="{() => jump(`${buttonJump}`)}">{buttonText}</button>
                <p>{desc}</p>
            </div>
        </div>
        <div class="right">
            <div class="image">
                <img src={mainImage} alt="">
            </div>
        </div>
    </header>
    <div class="awards" id="logo-section">
        {#each awards as link}
            <!--center the image with margin: auto if its only one-->
            <img class="logo" src={link} alt="" style={awards.length == 1 ? "margin: auto" : ""}>
        {/each}
    </div>
</div>

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
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
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
        margin-toP: 40px;
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
        width:100%;
        height: 1px;
        position: absolute;
        top: -20px;
        left: 0px;
        background: linear-gradient(90deg, rgba(66,71,112,0.09), rgba(66,71,112,0.09) 50%, transparent 0, transparent);
        background-size: 8px 1px;
    }

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
        .res-menu {
            opacity: 0 !important;
            pointer-events: none !important;
        }
    }
    @media screen and (max-width: 440px) {
        header {
            padding: 0 20px;
        }
    }
</style>