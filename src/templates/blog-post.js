import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import prevGraphic from "../images/icon-prev.svg"
import nextGraphic from "../images/icon-next.svg"
import listGraphic from "../images/icon-list-square.svg"
import shareGraphic from "../images/icon-share.svg"

const BlogPost = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <article className="post-wrapper">
        <header>
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <nav className="post-nav">
        <ul className="post-nav-list">
          <li className="posts-all">
            <Link to={"/blog/"} rel="All posts" aria-label="All posts">
              <img src={listGraphic} alt="All posts" className="nav-icon" />
            </Link>
          </li>

          <li className="posts-share">
            <span aria-label="No Next Post">
              <img src={shareGraphic} alt="Share" className="nav-icon" />
            </span>
          </li>

          {previous ? (
            <li className="posts-prev">
              <Link
                to={"blog" + previous.fields.slug}
                rel="prev"
                aria-label="Previous Post: {previous.frontmatter.title}"
              >
                <img src={prevGraphic} alt="Previous" className="nav-icon" />
              </Link>
            </li>
          ) : (
            <li className="posts-prev disabled">
              <span aria-label="No Previous Post">
                <img src={prevGraphic} alt="Previous" className="nav-icon" />
              </span>
            </li>
          )}

          {next ? (
            <li className="posts-next">
              <Link
                to={"blog" + next.fields.slug}
                rel="next"
                aria-label="Next Post: {next.frontmatter.title}"
              >
                <img src={nextGraphic} alt="Next" className="nav-icon" />
              </Link>
            </li>
          ) : (
            <li className="posts-next disabled">
              <span aria-label="No Next Post">
                <img src={nextGraphic} alt="Next" className="nav-icon" />
              </span>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
