import React from 'react';

import { getAllDocSlugs, getRecipe } from '@lib/api';
import Layout from '@components/layout';
import Freeform from '@blocks/freeform';
import PageHeader from '@components/page-header';
import Photo from '@components/photo';
import PageContent from '@components/page-content';
import { ProductAdd } from '@blocks/product';
import Icon from '@components/icon';

const getIngredientList = (ingredientList) => {
  const ingredients = ingredientList.ingredients || [];
  const ingredientProducts = ingredientList.ingredientProducts || [];

  return ingredientProducts
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
};

const RecipePage = ({ data }) => {
  const { site, page } = data;
  const ingredientLists = page.ingredientLists.map((ingredientList, i) => {
    return {
      key: ingredientList._key,
      title: ingredientList.title,
      list: getIngredientList(ingredientList),
    };
  });

  return (
    <Layout site={site} page={page}>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <Photo photo={page.image} className="page-content-image" />
      <PageContent>
        {page.introText?.content && (
          <div className="freeform-text freeform-text--intro">
            <Freeform data={page.introText} />
          </div>
        )}
        {ingredientLists.map(({ list, title, key }, indx) => {
          return (
            <div key={indx}>
              {list && list.length > 0 && (
                <div className="freeform-text">
                  <h4 className="freeform-text__title">{title}</h4>
                  <ul className="freeform-text__list ingredients-list">
                    {list.map(({ title, variants }, i) => {
                      if (variants) {
                        const defaultVariant = variants[0];

                        return (
                          <li
                            key={`ingredient-product_${i}`}
                            className="ingredients-list__product-item"
                          >
                            <span>
                              {title}
                              <ProductAdd
                                productID={defaultVariant.id}
                                quantity={1}
                                className="btn is-primary btn--icon"
                              >
                                <Icon
                                  className="icon"
                                  name="Plus"
                                  id="add-to-cart-icon"
                                  title="Add to cart"
                                />
                                <span>Add To Cart</span>
                              </ProductAdd>
                            </span>
                          </li>
                        );
                      }
                      return <li key={`ingredient-text_${i}`}>{title}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
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
