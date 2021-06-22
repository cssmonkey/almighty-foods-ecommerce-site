import React from 'react';
import { getStaticPage } from '@lib/api';
import Layout from '@components/layout';
import PageHeader from '@components/page-header';
import StockistList from '@modules/stockist-list';
import Map from '@modules/Map';

const REGIONS = {
  scotland: 'Scotland',
  england: 'England',
  wales: 'Wales',
  northerIreland: 'Northern Ireland',
  rest: 'Rest of the World',
};

const Stockists = ({ data }) => {
  const { site, page } = data;
  const stockistsList = page.stockistLocations || [];

  let scotlandStockists = [];
  let englandStockists = [];
  let walesStockists = [];
  let northerIrelandStockists = [];
  let restStockists = [];

  stockistsList.map((stockist, i) => {
    if (stockist.region === REGIONS.scotland) {
      scotlandStockists.push(stockist);
    }
    if (stockist.region === REGIONS.england) {
      englandStockists.push(stockist);
    }
    if (stockist.region === REGIONS.wales) {
      walesStockists.push(stockist);
    }
    if (stockist.region === REGIONS.northerIreland) {
      northerIrelandStockists.push(stockist);
    }
    if (stockist.region === REGIONS.rest) {
      restStockists.push(stockist);
    }
  });
  debugger;
  return (
    <Layout site={site} page={page}>
      <PageHeader title={page.title} introText={page.introText} />
      <Map />
      {scotlandStockists && scotlandStockists.length > 0 && (
        <StockistList title={REGIONS.scotland} listItems={scotlandStockists} />
      )}
      {englandStockists && englandStockists.length > 0 && (
        <StockistList title={REGIONS.england} listItems={englandStockists} />
      )}
      {walesStockists && walesStockists.length > 0 && (
        <StockistList title={REGIONS.wales} listItems={walesStockists} />
      )}
      {northerIrelandStockists && northerIrelandStockists.length > 0 && (
        <StockistList
          title={REGIONS.northerIreland}
          listItems={northerIrelandStockists}
        />
      )}
      {restStockists && restStockists.length > 0 && (
        <StockistList title={REGIONS.rest} listItems={restStockists} />
      )}
    </Layout>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "stockistsPage"] | order(_updatedAt desc)[0]{
      title,
      introText,
      stockistLocations[]{
        title,
        url,
        region,
        coordinates,
        location
      },
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

export default Stockists;
