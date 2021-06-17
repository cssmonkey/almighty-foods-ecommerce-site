import React from 'react'

import Layout from '@components/layout'
import { getStaticPage } from '@lib/api'

import BlockContent from '@sanity/block-content-to-react'
import { serializers } from '@lib/serializers'

const Recipes = ({ data }) => {
  const { site, page } = data

  return (
    <Layout site={site} page={page}>
      <h1>{page.title}</h1>
      <BlockContent
        renderContainerOnSingleChild
        className="intro-text"
        blocks={page.introText}
        serializers={serializers}
      />
      {page.allRecipes &&
        page.allRecipes.map((recipe, i) => <p>{recipe.title}</p>)}
    </Layout>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "allRecipesPage"] | order(_updatedAt desc)[0]{
      title,
      introText,
      seo,
      "allRecipes": *[_type == "recipePage"] | order(_updatedAt desc)[]{
        title   
      }
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  )

  return {
    props: {
      data: pageData,
    },
  }
}

export default Recipes
