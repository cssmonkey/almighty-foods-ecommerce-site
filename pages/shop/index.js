import React from 'react';

import Layout from '@components/layout';
import { getStaticPage, modules, allProducts } from '@lib/api';

import { Module } from '@modules/index';
import ShopNavigation from '@components/shop-navigation';

const Shop = ({ data }) => {
  const { site, page } = data;

  return (
    <Layout site={site} page={page}>
      <ShopNavigation
        shopPageTitle={page.title}
        collections={page.collections}
      />
      {page.modules?.map((module, key) => (
        <Module
          key={key}
          module={module}
          collectionProducts={page.products}
          featuredProducts={page.featuredProducts}
        />
      ))}
    </Layout>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const shopData = await getStaticPage(
    `
    *[_type == "shopPage"] | order(_updatedAt desc)[0]{
      title,
      "collections": *[_type == "collection"] | order(_updatedAt desc){title, "slug": slug.current}, 
      modules[]{
        ${modules}
      },
      "products": ${allProducts(preview)},
      "featuredProducts": featuredProducts[]->productID,
      seo
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  );

  return {
    props: {
      data: shopData,
    },
    revalidate: 5,
  };
}

export default Shop;
