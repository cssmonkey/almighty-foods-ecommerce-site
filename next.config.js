const sanityClient = require('@sanity/client');
const client = sanityClient({
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
});

// see breakdown of code bloat
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// get redirects from Sanity for Vercel
async function fetchSanityRedirects() {
  const data = await client.fetch(
    `*[_type == "redirect"]{ from, to, isPermanent }`
  );

  const redirects = data.map((redirect) => {
    return {
      source: `/${redirect.from}`,
      destination: `/${redirect.to}`,
      permanent: redirect.isPermanent,
    };
  });

  return redirects;
}

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true,
  },
  env: {
    // Needed for Sanity powered data
    SANITY_PROJECT_DATASET: process.env.SANITY_PROJECT_DATASET,
    SANITY_STUDIO_API_DATASET: process.env.SANITY_STUDIO_API_DATASET,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_STUDIO_API_PROJECT_ID: process.env.SANITY_STUDIO_API_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,

    // Needed for Shopify product syncs
    SHOPIFY_STORE_ID: process.env.SHOPIFY_STORE_ID,
    SHOPIFY_API_TOKEN: process.env.SHOPIFY_API_TOKEN,
    SHOPIFY_API_PASSWORD: process.env.SHOPIFY_API_PASSWORD,
    SHOPIFY_WEBHOOK_INTEGRITY: process.env.SHOPIFY_WEBHOOK_INTEGRITY,
    // Needed for Mailchimp forms
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_SERVER: process.env.MAILCHIMP_SERVER,

    // Needed for Klaviyo forms
    KLAVIYO_API_KEY: process.env.KLAVIYO_API_KEY,

    // Needed for Yotpo reviews
    YOTPO_API_KEY: process.env.YOTPO_API_KEY,
    YOTPO_SECRET_KEY: process.env.YOTPO_SECRET_KEY,

    // Needed for SendGrid forms
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    PASSWORD: process.env.PASSWORD,
    PASSWORD_PROTECT: process.env.PASSWORD_PROTECT,

    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_TO_EMAIL: process.env.SENDGRID_TO_EMAIL,
    SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
    FORMSUBMIT_ID: process.env.FORMSUBMIT_ID,
  },
  async redirects() {
    const sanityRedirects = await fetchSanityRedirects();
    return sanityRedirects;
  },
});
