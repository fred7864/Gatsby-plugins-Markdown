import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const pagetest = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from  page test</h1>
    <p>Welcome to page test</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default pagetest