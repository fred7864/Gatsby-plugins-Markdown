const path = require (`path`)
const { createFilePath } = require (`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath:`content`})
        createNodeField({
            node,
            name: `slug`,
            value: `/blog ${slug}`
        })
    }
}

exports.createPages = async function ({ actions, graphql}) {
    const { data } = await graphql(`
            query {
                allMarkdownRemark {
                    edges {
                    node {
                        fields {
                        slug
                        }
                    }
                }
                totalCount
            }
        }
    `)
    data.allMarkdownRemark.edges.forEach(edge => {
        const { slug } = edge.node.fields
        actions.createPage({
            path: slug,
            component: require.resolve(`./src/templates/posts.js`),
            context: {slug: slug},
        })
     })

    const perPage =2;
    const nbPage = Math.ceil(data.allMarkdownRemark.totalCount/ perPage)
        // create index post
        for (let i =0; i < nbPage; i++) {
        actions.createPage({
            path: i < 1 ? "/blog" : `/blog/${i+1}`,
            //path: '/blog',
            component: require.resolve(`./src/templates/list.js`),
            context: {
                limit: perPage,
                skip: i * perPage,
            },
        })
    }    
}



