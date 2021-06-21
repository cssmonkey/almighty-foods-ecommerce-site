import React from 'react';

import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';
import Layout from '@components/layout';
import { getAllDocSlugs, getRecipe } from '@lib/api';

import Freeform from '@blocks/freeform';

const RecipePage = ({ data }) => {
  const { site, page } = data;
  const ingredientProducts = page.ingredientProducts
    ? page.ingredientProducts
    : [];

  const fullIngredientsList = ingredientProducts
    .concat(page.ingredients.map((title) => ({ title })))
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
    <div>
      <h1>{page.title}</h1>
      <Freeform data={page.instructions} />
      <ul>
        {fullIngredientsList.map((ingredient, i) => {
          return <li key={i}>{ingredient.title}</li>;
        })}
      </ul>
      <BlockContent
        renderContainerOnSingleChild
        className=""
        blocks={page.intro}
        serializers={serializers}
      />
    </div>
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
