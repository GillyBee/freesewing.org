import React from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import AppWrapper from '../components/app/wrapper'

import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import DocsIcon from '@material-ui/icons/ChromeReaderMode'
import ShowcaseIcon from '@material-ui/icons/CameraAlt'
import BlogIcon from '@material-ui/icons/RssFeed'
import CommunityIcon from '@material-ui/icons/Favorite'
import AccountIcon from '@material-ui/icons/Face'
import Icon from '@freesewing/components/Icon'

import Mdx from '../components/mdx'
import { graphql, Link } from 'gatsby'
import oc from 'open-color-js'
import Blob from '../components/blobs'
import contrast from 'get-contrast'
import LatestNews from '../components/LatestNews'

import Splash from '../components/homepage/splash'
import IconBar from '../components/homepage/iconbar'
import SupportBanner from '../components/homepage/support-banner'

// Style
import './homepage.scss'

const renderBlogPost = (node) => (
  <div className="post">
    <Link
      to={`/${node.node.parent.relativeDirectory}/`}
      title={node.node.frontmatter.linktitle}
      className="image"
    >
      <figure>
        <img
          src={node.node.frontmatter.img.childImageSharp.fluid.src}
          srcSet={node.node.frontmatter.img.childImageSharp.fluid.srcSet || ''}
          alt={node.node.frontmatter.title}
          className="shadow"
        />
      </figure>
    </Link>
    <Link
      to={`/${node.node.parent.relativeDirectory}/`}
      title={node.node.frontmatter.linktitle}
      className="text"
    >
      <h3>{node.node.frontmatter.title}</h3>
      <p>{node.node.excerpt}</p>
    </Link>
  </div>
)

const HomePage = (props) => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  const patrons = props.data.patrons.edges.map((node) => ({
    name: node.node.patron.username,
    img: node.node.patron.pictureUris.m
  }))

  return (
    <AppWrapper app={app} noLayout oNavbar>
      <div id="homepage">
        <Splash app={app} uiMdx={uiMdx} />
        <IconBar app={app} />

        <div className="news">
          <LatestNews />
        </div>

        <SupportBanner />

        {/* Latest blog posts */}
        <div id="blog">
          <div className="single">{renderBlogPost(props.data.blog.edges[0])}</div>
          <div className="many">
            {renderBlogPost(props.data.blog.edges[1])}
            {renderBlogPost(props.data.blog.edges[2])}
            {renderBlogPost(props.data.blog.edges[3])}
            <h3 style={{ textAlign: 'right', padding: '0 1rem' }}>
              <Link to="/blog/" className="more">
                <FormattedMessage id="app.browseBlogposts" /> &raquo;
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </AppWrapper>
  )
}

export default HomePage

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    blog: allMdx(
      limit: 4
      filter: { fileAbsolutePath: { regex: "//blog/[^/]*/[a-z]{2}.md/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          parent {
            ... on File {
              relativeDirectory
            }
          }
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date
            linktitle
            author
            img {
              childImageSharp {
                fluid(maxWidth: 400) {
                  src
                  srcSet
                  sizes
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
      }
    }
    patrons: allFsPatron {
      edges {
        node {
          patron {
            username
            pictureUris {
              m
            }
          }
        }
      }
    }
  }
`
