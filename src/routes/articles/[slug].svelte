<script context = "module">
    let slug
    import { gql } from "apollo-boost";
    import {client} from '../../data.js'
    
    export async function preload({ params, query }) {       
        //get the slug 
        slug = params.slug
        
        const result = await client.query({
            query: gql`
            query {
                articles (where: { slug: "${slug}" }){
                    title
                    subTitle
                    description
                    slug
                    image {
                        url
                    }
                    section{
                        title
                        subTitle
                        content
                    }
                }
            }`
        })

        return { result: result.data.articles[0] }
	}
</script>

<script>
    export let result
    
    let y
    let sticky = false;
    let normOffset;
    let active = 0;

    function scrollTo(target){
        
        let target_id = `sect${target}`
        //close nav in case the user is on mobile
        document.getElementById("table-checkbox").checked = false;
        
        let offsetTop = document.getElementById(target_id).offsetTop;

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        //correction = 10 --> now there is a little space above the hr 
        let correction = 10;

        if(vw <= 1048){
            //if the user is mobile the height of the content-table needs to be added cause it is fixed and thus is not part of offsetTop
            correction += document.getElementById("content-table").offsetHeight;
        }
        
        offsetTop = offsetTop - correction;
        //IMPORTANT: window.scroll is not being supported in safari
        window.scroll({
            top: offsetTop,
            left: 0,
            behavior: "smooth",
        });

    }

    function calcReadingTime(sections){
        let txt;
        //get whole text
        sections.forEach(ele => {
            txt += ele.content
        })
        //split txt into words
        let wordCount = txt.replace( /[^\w ]/g, "" ).split( /\s+/ ).length;
        //calculate reading time (here is the average count of words used an adult is capable of reading in 1 min)
        var readingTimeInMinutes = Math.floor(wordCount / 228) + 1;
        var readingTimeAsString = `${readingTimeInMinutes} Min. Lesezeit`;

        return readingTimeAsString;        
    }

    function setActive(){
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        let sections = document.getElementsByClassName("art-content-sect");
        //get height of viewport
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        //add 1/4 vh to scrollTop thereby the top is no longer the reference
        scrollTop += vh/4;
        //loop through art-content-sections
        for(let i = 0; i < Object.keys(sections).length;i++){
            //get offset top of ele
            let ele_top = sections[i.toString()].offsetTop;
            //get offset top of next ele --> if the list reached its end, set next_top higher than own offset --> if statemnt is till true
            let next_top = (i != Object.keys(sections).length - 1) ? sections[(i + 1).toString()].offsetTop : scrollTop + 1;
            //wenn die momentane position zwischen dem offset von i und i + 1 ist: 
            if(scrollTop > ele_top && scrollTop < next_top){
                //set active equal to i
                active = i
                return;
            }
        }
    }

    function isSticky(y){
        //set the Offset the content table has when the page is first loaded
        if(normOffset == undefined){
                normOffset = document.getElementById("content-table").offsetTop
            }
            else if(y >= normOffset && sticky == false){
                sticky = true
            }
            else if(y <= normOffset && sticky == true){
                sticky = false
        }
    }

    $: y,scroll(y)

    function scroll(){
        //y == undefined --> means component isn't rendered to the dom yet --> document would throw an error
        if(y != undefined){
            isSticky(y)
            setActive()
        } else {return}
    }
</script>

<svelte:head>
    <title>{result == undefined ? "Not found" : result.slug}</title>
</svelte:head>
<svelte:window bind:scrollY="{y}" on:resize="{() => normOffset = undefined}"></svelte:window>

{#if result != undefined}
    <div id = "article">
        <div id = "header-sect">
            <div class = "img-wrapper">
                <img src={client.url + result.image[0].url} alt="">
            </div>
            <div class = "mob-text-wrapper text-center">
                <h1 id = "art-header">{result.title}</h1>
                <p id = "sub-header">{result.subTitle}</p>
            </div>
        </div>
        <div>
            <div class = "flex-row" id = "content-wrapper">
                <!--Das Inhaltsverzeichnis-->
                <div class="{sticky === true? "content-table-sticky-active content-table mob-text-wrapper" : "content-table mob-text-wrapper"}"  id = "content-table">
                    <input type="checkbox" id = "table-checkbox">
                    <div>
                        <div class = "flex-row justify-content-between align-center flex-wrap">
                            <h3>INHALTSVERZEICHNIS</h3>
                            <label for="table-checkbox"></label>
                        </div>
                        <ul class = "content-table-ul" id = "content-table-ul">
                            {#each result.section as section, i}
                                <li id={i} class="{active === i ? 'li-active' : ''} "on:click="{ () => scrollTo(i)}">{i + 1}. {section.title}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
                <!--Der Body vom Artikel-->
                <div class = "art-content mob-text-wrapper" id = "art-content">
                    <!--section mit der reading time und eventuell einer Artikel beschreibung-->
                    <div>
                        <div class = "flex-row align-center reading-time">
                            <img src="../../clock.svg" alt="" id = "clock">
                            <p id = "reading-time">{calcReadingTime(result.section)}</p>
                        </div>
                        <p id = "art-desc">{result.description}</p>
                    </div>
                    <!--Biespiel einer Artikel section-->
                    {#each result.section as section, i}
                        <div class="art-content-sect" id="sect{i}">
                            <hr> 
                            <h2>{section.title}</h2> 
                            <h4>{section.subTitle == null ? "" : section.subTitle}</h4>
                            <div>{@html section.content}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{:else}
<!--otherwise show error message-->
    <notFound></notFound>
{/if}

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
#article{
    max-width: 1466px;
    margin: 0px auto;
    padding: 0 2rem;
    font-family: Open Sans,Segoe UI,sans-serif;
    overflow-anchor: none;
}

#header-sect{
    /* grid layout höhe Xrem, jede grid Xrem breit --> bild wird quadratisch */
    display: grid;                  
    height: 31rem;
    grid-template-columns: 31rem 31rem;
    /* items werden horizontal und vertical mittig plaziert */
    justify-content: center;
    align-items: center;
}

.img-wrapper{
    /* flex-damit das bild gecenterd werden kann */
    display: flex;
    justify-content: center;
    /* overflow hidden --> das überstehende vom bild wird weggeschnitten */
    width: 100%;
    height: 100%;
    /* übernimm die höhe vom parent element,width so breit wie möglich --> so breit wie die grid */
}

img{
    /* übernimm breite und höhe vom parent */
    object-fit: cover;
    width: inherit;
    height: inherit;
}


.justify-content-between{
    justify-content: space-between;
}



.flex-row{
    display: flex;
    flex-direction: row;
}



.flex-wrap{
    flex-wrap: wrap;
}


.align-center{
    align-items: center;
}

/*--------------------styling of the article content--------------------*/
.art-content{
    margin: 3rem 0;
    max-width: 650px;
    min-width: 0px;
}

.art-content-sect{
    margin: 0;
    margin-top: 5rem;
}

.reading-time{
    border-bottom: 2px solid #d8dee9;
}

.reading-time p{
    margin: 0.5rem !important;
}

.art-content-sect hr{
    width: 50px;
    color: black;
    margin: 10px 0;
    border: 1px solid black;
}

.art-content-sect h2{
    font-size: 1.5rem;
    margin: 10px 0;
}

.art-content-sect h4{
    font-size: 1.2rem;
    margin: 20px 0;
}

.art-content p{
    font-weight: 400;
    line-height: 1.5625;
    letter-spacing: normal;
    font-size: 1rem;
    margin-bottom: 1rem;
}

.text-center{
    text-align: center;
}
/*--------------styling of the article ends here-------------------*/

/*--------------styling of the content table----------------------*/

/*element wird benutzt um rauszufinden ob der content-table sticky ist oder nicht (siehe article style/index.html) */
#nav-container-top {
	height: 1px;
    visibility: hidden;
}

.content-table{
    top: 1rem;
    position: -webkit-sticky;
    position: sticky;
    margin-top: -3rem;
    margin-right: 80px;
    box-shadow: 0 0 2rem rgba(0,0,0,.1);
    padding: 0rem 1rem 1rem 1rem; 
    z-index: 1;
    background-color: white;
    height: min-content;
    width: 300px;
    max-width: 400px;
    border-radius: 10px;
}

.content-table h3{
    margin: 0;
    padding: 1rem 0;
    padding-bottom: 0.5rem;
    font-size: 18px;
    word-break: break-all;
}

.content-table .flex-row{
    border-bottom: 1px solid #d8dee9;
}

.content-table input[type="checkbox"]{
    display: none;
} 

.content-table-ul{
    padding-left: 1rem;
    transition: .3s ease; 
}

.content-table-ul li{
    margin: 1rem 0;
    list-style-type: none;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
}

.li-active{
    list-style-type: square !important;
    color: #5e81ac;
}

/*--------------styling of the content table ends here----------------------*/
#content-wrapper{
    margin: auto;
    justify-content: center;
}

@media(max-width:1104px){
    #content-wrapper{
        flex-wrap: wrap;
    }

    #article{
        padding-right: 0px;
        padding-left: 0px;
    }

    #header-sect{
        /* ab bestimmter größe grid zum Flex-container machen, column reverse --> titel kommt nach oben */
        display: flex;
        flex-direction: column-reverse;
        height: auto;
    }

    .img-wrapper{
        /*notwendig um das strechten des Bildes zu verhindern (in sAfaRi)*/
        align-items: flex-start;
    }

    .mob-text-wrapper{
        max-width: 600px;
        margin: 50px auto !important;
        padding: 0 2rem !important;
    }

    .content-table{
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        top: 0px;
        box-shadow: none;
        width: 100%;
        min-width: 0px;
        max-width: none;
    }

    .content-table-ul{
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        margin: 0px !important;
    }

    .content-table-sticky-active{
        margin: 0 !important;
        width: 100vw !important;
        padding-bottom: 0px !important;
        box-shadow: 0 10px 1rem rgba(0,0,0,.1) !important;
    }

    .content-table-sticky-active h3{
        padding-bottom: 1rem !important;
    }

    .content-table-sticky-active .flex-row{
        border-bottom: none !important;
    }

    .content-table label{
        display: block;
        width: 30px;
        height: 30px;
        background-image: url("../../arrow.svg");
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: 0.2s;
    }

    #table-checkbox:checked ~ * .content-table-ul{
        max-height: 1000px;
        opacity: 1;
    }

    #table-checkbox:checked ~ * label{
        transform: rotate(90deg);
    }
}
</style>