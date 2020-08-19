import {gql} from 'apollo-boost'

export const ARTICLE = (slug) => gql`
    query {
        articles (where: { slug: "${slug}" }){
            title
            subTitle
            description
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
`