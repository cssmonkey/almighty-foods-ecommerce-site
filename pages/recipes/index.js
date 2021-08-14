import React from 'react';
import { getStaticPage, imageMeta, ptContent } from '@lib/api';
import Layout from '@components/layout';
import Freeform from '@blocks/freeform';
import RecipeListing from '@modules/recipes-listing';
import PageHeader from '@components/page-header';
import PageContent from '@components/page-content';

const Recipes = ({ data }) => {
  const { site, page } = data;

  return (
    <Layout site={site} page={page}>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <PageContent>
        {page.introText?.content && (
          <div className="freeform-text freeform-text--intro">
            <Freeform data={page.introText} />
          </div>
        )}
        <RecipeListing recipes={page.allRecipes} showCta={false} />
      </PageContent>
    </Layout>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "allRecipesPage"] | order(_updatedAt desc)[0]{
      title,
      subtitle,
      "introText": {
        "content": introText
      },
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
