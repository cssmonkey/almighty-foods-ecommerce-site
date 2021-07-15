import React from 'react';

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
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <Photo photo={page.image} className="page-content-image mb-12" />
      <PageContent>
        {page.introText && (
          <div className="freeform-text freeform-text--intro">
            <Freeform data={page.introText} />
          </div>
        )}
        {fullIngredientsList && fullIngredientsList.length > 0 && (
          <div className="freeform-text">
            <h4 className="freeform-text__title">Ingredients</h4>
            <ul className="freeform-text__list">
              {fullIngredientsList.map((ingredient, i) => {
                return <li key={i}>{ingredient.title}</li>;
              })}
            </ul>
          </div>
        )}
        {page.instructions && (
          <div className="freeform-text">
            <h4 className="freeform-text__title">Instructions</h4>
            <Freeform data={page.instructions} />
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
