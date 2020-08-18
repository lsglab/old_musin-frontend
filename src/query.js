import {gql} from 'apollo-boost'

export const ARTICLE = (slug) => gql`
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
`