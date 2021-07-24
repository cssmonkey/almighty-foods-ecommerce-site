import React from 'react';
import { useRouter } from 'next/router';
import Error from '@pages/404';
import Freeform from '@blocks/freeform';
import Photo from '@components/photo';
import Layout from '@components/layout';
import PageHeader from '@components/page-header';
import PageContent from '@components/page-content';
import { getAllDocSlugs, getPage } from '@lib/api';

import { Module } from '@modules/index';

const Page = ({ data }) => {
  const router = useRouter();

  if (!router.isFallback && !data) {
    return <Error statusCode={404} />;
  }

  const { site, page } = data;

  return (
    <>
      {!router.isFallback && (
        <Layout site={site} page={page}>
          <PageHeader title={page.title} subtitle={page.subtitle} />

          <PageContent>
            <Photo photo={page.image} className="page-content-image" />
            {page.introText && (
              <div className="freeform-text freeform-text--intro">
                <Freeform data={page.introText} />
              </div>
            )}
            {page.modules?.map((module, key) => (
              <Module key={key} module={module} />
            ))}
          </PageContent>
        </Layout>
      )}
    </>
  );
};

export async function getStaticProps({ params, preview, previewData }) {
  const pageData = await getPage(params.slug.join('/'), {
    active: preview,
    token: previewData?.token,
  });

  return {
    props: {
      data: pageData,
    },
  };
}

export async function getStaticPaths() {
  const allPages = await getAllDocSlugs('page');

  return {
    paths:
      allPages?.map((page) => {
        let slugs = page.slug.split('/').filter((e) => e);
        return {
          params: {
            slug: slugs,
          },
        };
      }) || [],
    fallback: false,
  };
}

export default Page;
