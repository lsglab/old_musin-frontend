<script context = "module">
    let slug
    export async function preload({ params, query }) {       
        //get the slug 
        slug = params.slug
	}
</script>

<script>
    import { gql } from "apollo-boost";
    import { getClient, query } from 'svelte-apollo'; 
    //get the client we declared earlier in _layout.svelte
    const client = getClient();
    //new query to fetch the article depending on the given slug
    const article = query(client, {query: gql`
        query {
            articles (where: { slug: "${slug}" }){
                title
                subTitle
                image{
                    url
                }
                section{
                    title
                    subTitle
                    content
                }
            }
        }
    `})
</script>

{#await $article}
  Loading...
{:then result}
    <!--If there are results -> build the article -->
    {#if result.data.articles.length > 0}
        <p>{result.data.articles[0].subTitle}</p>
    {:else}
    <!--otherwise show error message-->
        <p>Seems like this isn't the page you are looking for</p>
    {/if}
{:catch error}
  Error: {error}
{/await}

<style></style>