import React from 'react';

import Layout from '@components/layout';
import { getStaticPage, modules } from '@lib/api';
import PageContent from '@components/page-content';

import { Module } from '@modules/index';

const Home = ({ data }) => {
  const { site, page } = data;

  return (
    <Layout site={site} page={page}>
      <PageContent>
        {page.modules?.map((module, key) => (
          <Module key={key} module={module} />
        ))}
      </PageContent>
    </Layout>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "homePage"] | order(_updatedAt desc)[0]{
      hasTransparentHeader,
      modules[]{
        ${modules}
      },
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
      data: pageData,
    },
    revalidate: 5,
  };
}

export default Home;
