const cms = "http://localhost:1337"
//importing these in order to make an graphql request and apolloClient
import fetch from 'node-fetch'
import ApolloClient from "apollo-boost";
//new ApolloClient --> uri has to be changed to the uri of our cms
const aclient = new ApolloClient({
    uri: `${cms}/graphql`,
    fetch: fetch,
})
aclient.url = cms

export const client = aclient
