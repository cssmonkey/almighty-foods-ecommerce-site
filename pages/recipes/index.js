import React from 'react';
import { getStaticPage, imageMeta } from '@lib/api';
import Layout from '@components/layout';
import RecipeListing from '@modules/recipes-listing';
import PageHeader from '@components/page-header';

const Recipes = ({ data }) => {
  const { site, page } = data;

  return (
    <Layout site={site} page={page}>
      <PageHeader title={page.title} introText={page.introText} />
      <RecipeListing recipes={page.allRecipes} />
    </Layout>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "allRecipesPage"] | order(_updatedAt desc)[0]{
      title,
      introText,
      seo,
      "allRecipes": *[_type == "recipePage"] | order(_updatedAt desc)[]{
        title,
        image {
          ${imageMeta}
        },
        "slug": slug.current
      }
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  );

  return {
    props: {
      data: pageData,
    },
  };
}

export default Recipes;
