<script>
	import Nav from '../components/Nav.svelte';
	export let segment;

	//the url of the cms
	const uri = "http://localhost:8080"
	//importing these in order to make an graphql request and apolloClient
	import fetch from 'node-fetch'
	import ApolloClient from "apollo-boost";
	import {setClient} from "svelte-apollo"
	//new ApolloClient --> uri has to be changed to the uri of our cms
	const client = new ApolloClient({
		uri: `${uri}/graphql`,
		fetch: fetch,
	})
	//append an parameter to the client object in order to use the url of the cms later
	client.url = uri

	setClient(client)

</script>

<style>
	/* main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}*/
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
