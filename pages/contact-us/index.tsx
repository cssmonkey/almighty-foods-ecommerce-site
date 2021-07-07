import React from 'react';

import { getStaticPage } from '@lib/api';
import Layout from '@components/layout';
import Freeform from '@blocks/freeform';
import PageHeader from '@components/page-header';
import ContactForm from '@components/contact-form';
import PageContent from '@components/page-content';

const ContactUsPage = ({ data }) => {
  const { site, page } = data;

  return (
    <Layout site={site} page={page}>
      <PageHeader title={page.title} introText={page.introText} />

      <PageContent>
        {page.additionalText && (
          <div className="freeform-text freeform-text--intro">
            <Freeform data={page.additionalText} />
          </div>
        )}

        <ContactForm type="contactEnquiry" />
      </PageContent>
    </Layout>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "contactPage"] | order(_updatedAt desc)[0]{
      title,
      introText,
      additionalText,
      seo,
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

export default ContactUsPage;
