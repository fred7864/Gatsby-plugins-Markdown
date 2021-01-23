import React from "react"
import { graphql , Link} from "gatsby"


import SEO from '../components/seo'
import Layout from '../components/layout'

const IndexPage = ({data}) => {
    const { nodes, pageInfo } = data.allMarkdownRemark
    console.log(pageInfo)
    return(
        <Layout>
            <SEO title="Blog Home"/>
            <h1>List posts</h1>
            {nodes.map((e) => (
                <div>
                <Link to={e.fields.slug}>{e.frontmatter.title}</Link>
                <p>{e.excerpt}</p>
                </div>
            ))}
            <div style={{
              padding:"20px 0",
              display: "flex",
              justifyContent: "space-between"
              }}>

              {pageInfo.hasPreviousPage ? (
                <Link
                to={`${pageInfo.currentPage === 2 ? "/blog" : `/blog/${pageInfo.currentPage -1}`}`}
                >
                Previous
                </Link>

              ):(
                <div />)
              }
              
              {pageInfo.hasNextPage && (
                <Link to={`/blog/${pageInfo.currentPage + 1}`}>Next</Link>
              )}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query getPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: ASC}
      limit: $limit
      skip: $skip
        ) {
      nodes {
        frontmatter {
          title
          date(formatString: "DD MM YYYY")
        }
        excerpt
        fields {
          slug
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
      }
    }
  }
`


export default IndexPage

