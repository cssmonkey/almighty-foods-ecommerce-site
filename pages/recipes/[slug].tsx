import React from 'react';

import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';
import { getAllDocSlugs, getRecipe } from '@lib/api';
import Layout from '@components/layout';
import Freeform from '@blocks/freeform';
import PageHeader from '@components/page-header';
import Photo from '@components/photo';
import PageContent from '@components/page-content';

const RecipePage = ({ data }) => {
  const { site, page } = data;
  const ingredients = page.ingredients ? page.ingredients : [];
  const ingredientProducts = page.ingredientProducts
    ? page.ingredientProducts
    : [];

  const fullIngredientsList = ingredientProducts
    .concat(ingredients.map((title) => ({ title })))
    .sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

  return (
    <Layout site={site} page={page}>
      <PageHeader title={page.title} introText={page.introText} />
      <Photo photo={page.image} className="page-content-image mb-6" />
      <PageContent>
        {page.instructions && (
          <div className="text-center mb-12 text-2xl">
            <Freeform data={page.instructions} />
          </div>
        )}
        <div className="text-center mb-12">
          <h4 className="font-bold mb-4">Ingredients</h4>
          <ul className="text-xl">
            {fullIngredientsList.map((ingredient, i) => {
              return <li key={i}>{ingredient.title}</li>;
            })}
          </ul>
        </div>
        {page.intro && (
          <div className="mb-8">
            <h4 className="font-bold text-center mb-4">Instructions</h4>
            <BlockContent
              renderContainerOnSingleChild
              className=""
              blocks={page.intro}
              serializers={serializers}
            />
          </div>
        )}
      </PageContent>
    </Layout>
  );
};

export async function getStaticProps({ params, preview, previewData }) {
  const recipeData = await getRecipe(params.slug, {
    active: preview,
    token: previewData?.token,
  });

  return {
    props: {
      data: recipeData,
    },
  };
}

export async function getStaticPaths() {
  const allRecipes = await getAllDocSlugs('recipePage');

  return {
    paths:
      allRecipes?.map((page) => {
        return {
          params: {
            slug: page.slug,
          },
        };
      }) || [],
    fallback: false,
  };
}

export default RecipePage;
