import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import { graphql, Link } from 'gatsby'

const Page = (props) => {
  const app = useApp(false)

  // FIXME: Makers is untranslated here
  return (
    <AppWrapper app={app} title="Makers" {...app.treeProps(props.path)} wide>
      <ul className="links">
        {props.data.allMakersPost.nodes.map(({ post }) => (
          <li key={post.slug}>
            <Link to={`/makers/${post.slug}/`}>{post.displayname}</Link>
          </li>
        ))}
      </ul>
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allMakersPost(sort: { order: ASC, fields: post___slug }) {
      nodes {
        post {
          displayname
          slug
        }
      }
    }
  }
`
